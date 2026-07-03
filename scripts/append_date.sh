#!/bin/bash
source /var/www/html/nextcloud_sacm/scripts/.bash_env

## Parse args
POSARGS=()
FILE=""
while [[ $# -gt 0 ]]; do
	case $1 in 
		-f|--file)
			FILE="$2"
			shift; shift;
		;;
		*)
			POSARGS+=("$1")
			shift
		;;
	esac
done
set -- "${POSARGS[@]}" # restore positional parameters

# called from Nextcloud
if [[ ! -n $FILE ]]; then 
	exec &>>$NCPATH/scripts/logs/append

# called from auto_normalize.sh
else
	echo -e "\n[INFO] Running append_date.sh..."
fi

## Constants
CURRFILE="$(get_file_from_id $1 $2)"
if [[ -d $CURRFILE ]]; then exit; fi
CURRFILENAME="${CURRFILE##*/}" # with extension
# TODAY=$(date -d '+8 hours' +'%Y-%m-%d')
DAY=$(date -d '+8 hours' +'%a')
DAY=${DAY^^}
echo "id=$1, owner=$2"
echo "CURRFILE=$CURRFILE"

## Move original WAV to tmp
if [[ -n $FILE ]]; then
	echo "> Moving original to tmp folder"
	cmd="mv \"$CURRFILE\" \"$NCDATAPATH/$TMPPATH/\""
	echo $cmd && eval $cmd
	php $NCPATH/occ files:scan --path "$TMPPATH"
fi

## Generate new filename
[[ "$CURRFILE" != *"Recordings"* ]] && echo "> CURRFILE=$CURRFILE" && exit 0

# filename doesn't contain date
if [[ "$CURRFILENAME" != *20[0-9][0-9]* ]] && [[ ! "$CURRFILENAME" =~ .*(Mon|Tue|Wed|Thu|Fri|Sat|Sun|MON|TUE|WED|THU|FRI|SAT|SUN).* ]]; then
	NEWFILENAME="${CURRFILE%/*}/($DAY) ${CURRFILENAME%.*}.mp3"
	[[ -f $NEWFILENAME ]] && NEWFILENAME="${NEWFILENAME%.*}_copy.${NEWFILENAME##*.}"
	echo "> Appending date..."

# filename given from auto_normalize script but date already in filename
elif [[ -n $FILE ]]; then
	NEWFILENAME="${CURRFILE%/*}/${CURRFILENAME%.*}.mp3"
	echo "> Renaming file..."

# filename doesn't need to be renamed
else
	NEWFILENAME=""
	echo "> File not renamed."
fi

## Rename, move WAV to tmp & OCC scan
if [[ -n $NEWFILENAME ]]; then
	[[ ! -n $FILE ]] && FILE=$CURRFILE
	cmd="mv \"$FILE\" \"$NEWFILENAME\""
	echo $cmd && eval $cmd
	echo "> Refreshing OCC..."
	SCANPATH="$(echo ${NEWFILENAME%/*} | grep -oP '(?<='$NCDATAPATH'/).*')"
	php $NCPATH/occ files:scan --path "$SCANPATH"
fi
