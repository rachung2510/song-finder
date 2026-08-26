#!/usr/bin/env bash

# Saturday 1:30 PM SGT (5:30 AM UTC)
# 30 5 * * 6 /var/www/html/nextcloud_sacm/apps/song_finder/python/weekly_scan.sh >> /tmp/song_finder_weekly.log 2>&1
# Saturday 9:30 PM SGT (1:30 PM UTC)
# 30 13 * * 6 /var/www/html/nextcloud_sacm/apps/song_finder/python/weekly_scan.sh >> /tmp/song_finder_weekly.log 2>&1
# Sunday 1:30 PM SGT (5:30 AM UTC)
# 30 5 * * 0 /var/www/html/nextcloud_sacm/apps/song_finder/python/weekly_scan.sh >> /tmp/song_finder_weekly.log 2>&1

cd /var/www/html/nextcloud_sacm/apps/song_finder/python
source .venv/bin/activate

prefixes=()
ROOT="/mnt/NextcloudSacmData/sacm.av/files/Recordings"

while IFS= read -r -d '' dir; do
    has_unrenamed=false

    # check if folder has at least one file without ascii (i.e. not renamed yet)
    while IFS= read -r -d '' file; do
        filename=$(basename "$file")
        if ! grep -qP '[\x00-\x7F]' <<< "$filename"; then
            has_unrenamed=true
            break
        fi
    done < <(find "$dir" -maxdepth 1 -type f -print0)

    echo "$dir: parse=$has_unrenamed"

    # only add to prefixes if there's at least one unrenamed file
    if $has_unrenamed; then
        prefixes+=("$(basename "$dir")")
    fi
done < <(
    # get only folders modified <=1h ago
    find "$ROOT" \
        -mindepth 1 \
        -maxdepth 1 \
        -type d \
        -mmin -60 \
        -print0
)

[ ${#prefixes[@]} -gt 0 ] && python main.py "${prefixes[@]}"
