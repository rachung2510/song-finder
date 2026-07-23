#!/usr/bin/env bash
cd /var/www/html/nextcloud_sacm/apps/song_finder/python
source .venv/bin/activate

prefixes=()
ROOT="/mnt/NextcloudSacmData/sacm.av/files/Recordings"
for d in $(ls -r "$ROOT"); do
    [ -d "$ROOT/$d" ] || continue
    files=$(ls "$ROOT/$d")
    [ -n "$files" ] && ! grep -qP '[\x{4e00}-\x{9fff}]' <<< "$files" && prefixes+=("$d")
done

[ ${#prefixes[@]} -gt 0 ] && python main.py "${prefixes[@]}"
