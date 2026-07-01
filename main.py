import os
import math
from uuid import uuid4 as uuid
import subprocess
import re
from tqdm import tqdm

from openai import OpenAI
import pandas as pd
import numpy as np
from pypinyin import lazy_pinyin
from rapidfuzz import fuzz
from scipy.optimize import linear_sum_assignment
from dotenv import load_dotenv
load_dotenv(".env", override=True)

root = "/mnt/NextcloudSacmData/sacm.av/files/Recordings"
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
df = pd.read_csv("songs.csv")

def get_embedding(text):
	text = re.sub(r"[，。！？、“”：；\n]", " ", text)
	response = client.embeddings.create(
		model="text-embedding-3-large",
		input=text
	)
	return response.data[0].embedding


def pinyin(text):
	text = re.sub(r"[，。！？、“”：；\n]", " ", text)
	result = " ".join(lazy_pinyin(text))
	return re.sub(r"\s+", " ", result).strip()


def log_score(x, k=0.1):
	return math.log(1 + k*x) / math.log(1 + 100*k)


def strip_prefix(s):
	"""'(SUN) ZOOM0160.mp3' → 'ZOOM0160.mp3'."""
	return re.sub(r'^\([^)]*\)\s*', '', s)


def windows(tokens, size, step):
	if len(tokens) <= size:
		yield " ".join(tokens)
	else:
		for i in range(0, len(tokens) - size + 1, step):
			yield " ".join(tokens[i:i+size])


def best_window_score(query_py, lyrics_py, size=50, step=10):
	query_tokens = query_py.split()
	lyric_tokens = lyrics_py.split()
	score = max(
		fuzz.ratio(qw, lw)
		for qw in windows(query_tokens, size, step)
		for lw in windows(lyric_tokens, size, step)
	)
	return score / 100


def get_duration(filepath):
	duration = float(subprocess.check_output([
		"ffprobe",
		"-v", "error",
		"-show_entries", "format=duration",
		"-of", "default=noprint_wrappers=1:nokey=1",
		filepath,
	]).decode().strip())
	return duration


def match_zoom_to_sq(d, tol=10):
    files = sorted(os.listdir(f"{root}/{d}"))
    zoom_files = [f for f in files if strip_prefix(f).startswith("ZOOM")]
    sq_files = [f for f in files if not strip_prefix(f).startswith("ZOOM")]
    
    if not zoom_files or not sq_files:
        return {}

    durations = {f: int(get_duration(f"{root}/{d}/{f}")) for f in files}

    reduced_sq_files = []
    for f in sq_files:
        other_files = [x for x in reduced_sq_files if not strip_prefix(x).startswith("SQ")]
        if strip_prefix(f).startswith("SQ") or not any(durations[f] == durations[x] for x in other_files):
            reduced_sq_files.append(f)
    sq_files = reduced_sq_files

    # If same number of files, just pair in order
    if len(zoom_files) == len(sq_files):
        ordered_matches = dict(zip(zoom_files, sq_files))
        # Make sure the sizes match though
        if all(abs(durations[z] - durations[s]) < tol for z, s in ordered_matches.items()):
            return ordered_matches

    # Otherwise, take the largest filesize (P&W) pair as reference
    matches = {}

    def traverse(ref_zoom_idx, ref_sq_idx, zoom_list, sq_list):
        z_idx = ref_zoom_idx + 1
        s_idx = ref_sq_idx + 1
        while z_idx < len(zoom_list) and s_idx < len(sq_list):
            zoom_file = zoom_list[z_idx]
            for i, sq_file in enumerate(sq_list):
                if strip_prefix(sq_file).startswith("SQ") and i < s_idx:
                    continue
                if abs(durations[zoom_file] - durations[sq_file]) > tol:
                    continue
                matches[zoom_file] = sq_file
                if strip_prefix(sq_file).startswith("SQ"):
                    s_idx = i + 1
                break
            z_idx += 1

    def prune_same_values(d):
        counts = {v: len([k for k in d if d[k] == v]) for v in d.values()}
        return {k: v for k, v in d.items() if counts[v] == 1}

    largest_zoom_file = max(zoom_files, key=lambda f: durations[f])
    largest_sq_file = max(sq_files, key=lambda f: durations[f])
    if not strip_prefix(largest_sq_file).startswith("SQ"):
        # since order can't be gleaned from filename, just traverse the whole list
        traverse(-1, -1, zoom_files, sq_files)
        return prune_same_values(matches)

    if abs(durations[largest_zoom_file] - durations[largest_sq_file]) <= tol:
        matches[largest_zoom_file] = largest_sq_file
        zoom_idx = zoom_files.index(largest_zoom_file)
        sq_idx = sq_files.index(largest_sq_file)
    else:
        cost = np.array([
            [abs(durations[z] - durations[s]) for s in sq_files]
            for z in zoom_files
        ])
        zoom_idx, sq_idx = np.unravel_index(np.argmin(cost), cost.shape)
        matches[zoom_files[zoom_idx]] = sq_files[sq_idx]

    traverse(zoom_idx, sq_idx, zoom_files, sq_files)
    traverse(len(zoom_files) - zoom_idx - 1, len(sq_files) - sq_idx - 1, zoom_files[::-1], sq_files[::-1])

    return prune_same_values(matches)


def split_to_limit(filepath, limit=26_214_400, margin=0.90, out_dir="tmp"):
	size = os.path.getsize(filepath)
	if size <= limit:
		return [filepath]
	os.makedirs(out_dir, exist_ok=True)
	duration = get_duration(filepath)
	bitrate_kbps = 128
	chunk_seconds = max(1, int(limit * margin * 8 / (bitrate_kbps * 1000)))
	chunk_paths = []
	
	for start in range(0, math.ceil(duration), chunk_seconds):
		chunk_path = os.path.join(out_dir, f"{uuid()}.mp3")
		subprocess.run([
			"ffmpeg",
			"-y",
			"-ss", str(start),
			"-t", str(chunk_seconds),
			"-i", filepath,
			"-vn",
			"-c:a", "libmp3lame",
			"-b:a", f"{bitrate_kbps}k",
			chunk_path,
		], check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
		chunk_paths.append(chunk_path)
		print(
			f"chunk {len(chunk_paths)}: "
			f"{os.path.getsize(chunk_path):,} bytes "
			f"(limit {limit:,}) -> {chunk_path}"
		)
	return chunk_paths


def get_titles(filepath):
	duration = get_duration(filepath)
	mins, secs = int(duration // 60), int(duration % 60)
	print(f"Processing {filepath} ({mins:02d}:{secs:02d})")

	cropped_paths = split_to_limit(filepath)
	lyrics = ""
	for filepath in tqdm(cropped_paths):
		audio_file = open(filepath, "rb")
		transcription = client.audio.transcriptions.create(
			model="whisper-1", 
			file=audio_file,
			language="zh",
		)
		lyrics += transcription.text

	if not lyrics:
		return []

	titles = {}
	title_to_last_chunk_idx = {}

	query_lyrics = re.sub(r"[，。！、\n]", " ", lyrics)

	chunk_size = 120
	for i, start in enumerate(range(0, len(query_lyrics), chunk_size)):
		chunk = query_lyrics[start:start + chunk_size]
		if len(chunk) < 50:
			continue
		query_py = pinyin(chunk)
		scores = [best_window_score(query_py, lyric_py, size=min(len(chunk), 100), step=5) for lyric_py in df.pinyin]
		best_idx = np.argmax(scores)
		best_title = df.iloc[best_idx]["title"]
		best_score = scores[best_idx]
		if best_title in titles and (i - title_to_last_chunk_idx.get(best_title, -5)) <= 2:
			titles[best_title] = max(titles[best_title], best_score) * 1.2
		else:
			titles[best_title] = best_score
		title_to_last_chunk_idx[best_title] = i

	print(f"{titles=}")
	if duration > 3 * 60:
		final_titles = [title for title, score in titles.items() if score > 0.7]
	else:
		best_title = max(titles, key=titles.get)
		final_titles = [best_title] if titles[best_title] > 0.7 else []
	print(f"Songs: {'_'.join(final_titles)}")
	return final_titles


def main(prefix):
	for d in sorted(os.listdir(root)):
		if not d.startswith(prefix):
			continue
		print(f">>>>>>>>>> Processing {d}")
		files = sorted(os.listdir(f"{root}/{d}"))
		if any(bool(re.search(r'[\u4e00-\u9fff]', f)) for f in files):	# already renamed
			continue
		zoom_to_sq = match_zoom_to_sq(d)
		zoom_files = [f for f in files if strip_prefix(f).startswith("ZOOM")]
		sq_files = [f for f in files if not strip_prefix(f).startswith("ZOOM")]
		file_to_titles = {f: get_titles(f"{root}/{d}/{f}") for f in sq_files}
		for zoom_file in zoom_files:
			sq_file = zoom_to_sq.get(zoom_file)
			sq_titles = file_to_titles.get(sq_file, [])
			titles = sq_titles or get_titles(f"{root}/{d}/{zoom_file}")
			file_to_titles[zoom_file] = titles
			if sq_file and not sq_titles and titles:
				file_to_titles[sq_file] = titles
		for f, title in file_to_titles.items():
			filename, ext = os.path.splitext(f)
			new_filepath = f"{strip_prefix(filename)}_{'_'.join(title)}{ext}" if title else f"{filename}{ext}"
			print(f"{f}→{new_filepath}")
			if f != new_filepath:
				os.rename(f"{root}/{d}/{f}", f"{root}/{d}/{new_filepath}")
		cmd = [
			"sudo", "-u", "www-data",
			"php", "/var/www/html/nextcloud_sacm/occ", "files:scan",
			"--path", f"sacm.av/files/Recordings/{d}",
		]
		subprocess.run(cmd)


if __name__ == "__main__":
	import argparse
	parser = argparse.ArgumentParser()
	parser.add_argument("prefix", type=str, default="2026-05")
	args = parser.parse_args()
	main(args.prefix)
