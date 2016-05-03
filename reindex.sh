#!/usr/bin/env bash

if [ "${1}" == "f" ]; then
    rm -rf "${alfred_workflow_cache}/*"
fi

if [ ! -d "${alfred_workflow_cache}" ]; then
    mkdir -p "${alfred_workflow_cache}"
fi

if [ -e "${alfred_workflow_cache}/cache.lock" ]; then
	exit 0
fi

touch "${alfred_workflow_cache}/cache.lock"

echo '---- starting to update cache'

find ~ -type d -name '.idea' > "${alfred_workflow_cache}/intellij-projects.cache"

echo '---- cache updated successfully'

rm "${alfred_workflow_cache}/cache.lock"