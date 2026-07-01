import os
from openai import OpenAI
import pandas as pd
import numpy as np
import re
from pypinyin import lazy_pinyin
from rapidfuzz import fuzz
from mutagen.mp3 import MP3
import math
from uuid import uuid4 as uuid
from scipy.optimize import linear_sum_assignment
from dotenv import load_dotenv
from pydub import AudioSegment
import subprocess
load_dotenv(".env", override=True)

root = "/mnt/NextcloudSacmData/sacm.av/files/Recordings"
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
df = pd.read_pickle("song_embeddings_large_chunked.pkl")
embeddings = np.vstack(df["embedding"].values).astype(np.float32)
embeddings /= np.linalg.norm(embeddings, axis=1, keepdims=True)

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


def best_window_score(query_py, lyrics_py, size=100, step=20):
	lyric_tokens = lyrics_py.split()
	def windows(tokens):
		for i in range(0, max(1, len(tokens) - size + 1), step):
			yield " ".join(tokens[i:i+size])
	return log_score(max(fuzz.ratio(query_py, w) for w in windows(lyric_tokens)))


def weighted_avg(a, b, alpha=0.5, beta=0.5):
	return (a * alpha + b * beta) / 2


def match_zoom_to_sq(d):
	files = sorted(os.listdir(f"{root}/{d}"))
	zoom_files = {f: os.path.getsize(f"{root}/{d}/{f}") for f in files if f.startswith("ZOOM")}
	other_files = {f: os.path.getsize(f"{root}/{d}/{f}") for f in files if not f.startswith("ZOOM")}
	if not zoom_files:
		return {}
	zoom_items = list(zoom_files.items())
	other_items = list(other_files.items())
	cost = np.array([
		[abs(z_size - o_size) for _, o_size in other_items]
		for _, z_size in zoom_items
	])
	rows, cols = linear_sum_assignment(cost)
	matches = {
		zoom_items[r][0]: other_items[c][0]
		for r, c in zip(rows, cols)
	}
	return matches


def crop_to_limit(filepath, limit=26_214_400, margin=0.90):
	"""Return a path to an audio file <= `limit` bytes for Whisper's 25 MiB cap.

	If the file is already under the limit it's returned unchanged. Otherwise a
	centered segment (head/tail dropped evenly) is exported near the original
	bitrate so the result lands just under the cap.
	"""
	size = os.path.getsize(filepath)
	if size <= limit:
		return None

	audio = AudioSegment.from_file(filepath)
	dur_ms = len(audio)
	keep_ms = int(dur_ms * (limit / size) * margin)   # fraction of runtime that fits
	start = max(0, (dur_ms - keep_ms) // 2)			   # center the crop
	cropped = audio[start:start + keep_ms]

	bitrate_kbps = int(size * 8 / (dur_ms / 1000) / 1000)
	crop_path = f"tmp/{uuid()}.mp3"
	cropped.export(crop_path, format="mp3", bitrate=f"{bitrate_kbps}k")
	print(f"cropped {size:,} → {os.path.getsize(crop_path):,} bytes (limit {limit:,}) → {crop_path}")
	del cropped, audio
	return crop_path


def get_titles(filepath):
	print(f"Processing {filepath}")
	duration = MP3(filepath).info.length
	if duration < 60:  # probably noise
		return []
	if duration > 24 * 60:  # too long
		return []

	cropped = crop_to_limit(filepath)
	audio_file = open(cropped or filepath, "rb")
	transcription = client.audio.transcriptions.create(
		model="whisper-1", 
		file=audio_file,
		language="zh",	
	)
	lyrics = transcription.text
	titles = {}
	if cropped:
		os.remove(cropped)

	query_lyrics = re.sub(r"[，。！、\n]", " ", lyrics)

	chunk_size = 120
	for start in range(0, len(query_lyrics), chunk_size):
		chunk = query_lyrics[start:start + chunk_size]
		if len(chunk) < 50:
			continue
		query_embedding = get_embedding(chunk)
		query_embedding /= np.linalg.norm(query_embedding)
		scores = embeddings @ query_embedding
		scores = [weighted_avg(
			score, best_window_score(pinyin(chunk), df.pinyin[i], size=chunk_size, step=chunk_size//4),
			alpha=0.3, beta=0.7,
		) for i, score in enumerate(scores)]
		best_idx = np.argmax(scores)
		best_title = df.iloc[best_idx]["title"]
		best_score = scores[best_idx]
		# print(f"[{start}:{start+chunk_size}] {best_title=}, {best_score=}")
		if best_title in titles:
			titles[best_title] = max(titles[best_title], best_score) * 1.2
		else:
			titles[best_title] = best_score

	print(f"{titles=}")
	if duration > 5 * 60:
		final_titles = [title for title, score in titles.items() if score > 0.4]
	else:
		best_title = max(titles, key=titles.get)
		final_titles = [best_title] if titles[best_title] > 0.4 else []
	return final_titles


def main(prefix):
	for d in sorted(os.listdir(root)):
		if not d.startswith(prefix):
			continue
		files = sorted(os.listdir(f"{root}/{d}"))
		if any(bool(re.search(r'[\u4e00-\u9fff]', f)) for f in files):	# already renamed
			continue
		zoom_to_sq = match_zoom_to_sq(d)
		zoom_files = [f for f in files if f.startswith("ZOOM")]
		sq_files = [f for f in files if not f.startswith("ZOOM")]
		file_to_titles = {f: get_titles(f"{root}/{d}/{f}") for f in sq_files}
		for zoom_file in zoom_files:
			sq_file = zoom_to_sq.get(zoom_file)
			sq_titles = file_to_titles.get(sq_file, [])
			titles = sq_titles or get_titles(f"{root}/{d}/{zoom_file}")
			file_to_titles[zoom_file] = titles
			if not sq_titles and titles:
				file_to_titles[sq_file] = titles
		for f, title in file_to_titles.items():
			filename, ext = os.path.splitext(f)
			new_filepath = f"{filename}_{'_'.join(title)}{ext}" if title else f"{filename}{ext}"
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
