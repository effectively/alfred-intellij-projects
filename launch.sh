#!/usr/bin/env bash

app_name=$1
q=$2

echo $app_name
echo $q
if [ "$q" == "__reindex__" ]; then
	./reindex.sh
	exit 0
fi

app=`find /Applications /opt/homebrew-cask/Caskroom -name "${app_name}" -maxdepth 1|sort|tail -1`

# app=${app// /\\ }
open -a "${app}" "${q}"