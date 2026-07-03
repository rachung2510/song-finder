#!/bin/bash
source /var/www/html/nextcloud_sacm/scripts/.bash_env
TODAY=$(date -d '+8 hours' +'%Y-%m-%d')

# $1=id
# $2=owner

# get filepath from id
echo "id=$1, owner=$2"
FILE="$(get_file_from_id $1 $2)" # sacm.av/files/.../file.wav

# exit if directory detected
if [[ -d $FILE ]]; then exit; fi

# skip if already mp3
EXT="${FILE#*.}"
if [[ $EXT = "mp3" ]]; then exit; fi

COPY="$FILE.TMP"
MP3COPY="${FILE%.*}.mp3"
LOG="${TODAY}_${FILE##*/}_$1.txt"
exec &>>$NCPATH/scripts/logs/$LOG
echo -e ">> $(date -d '+8 hours')\n"
echo "[INFO] Making copy..."
cmd="cp \"$FILE\" \"$COPY\""
echo $cmd
eval $cmd

# process copy
echo -e "\n[INFO] Normalizing copy..."
/usr/local/bin/normalize "$COPY"

echo -e "\n[INFO] Converting to mp3 $MP3COPY..."
ffmpeg -y -i "$COPY" -ar 44100 -ac 2 -b:a 256k "$MP3COPY"
rm "$COPY"

# append date before moving original WAV to tmp
# NOTE: disabled because annoying
# $NCPATH/scripts/append_date.sh -f "$MP3COPY" "$1" "$2"

echo -e "\n[INFO] Moving original to tmp folder"
cmd="mv \"$FILE\" \"$NCDATAPATH/$TMPPATH/\""
echo $cmd && eval $cmd
SCANPATH="$(echo ${MP3COPY%/*} | grep -oP '(?<='$NCDATAPATH'/).*')"
echo -e "\n[INFO] Scanning paths: $TMPPATH, $SCANPATH"
php $NCPATH/occ files:scan --path "$TMPPATH"
php $NCPATH/occ files:scan --path "$SCANPATH"

