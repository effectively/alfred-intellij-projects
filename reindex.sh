#!/usr/bin/env bash

if [ -f cache.lock ]; then
	exit 0
fi

touch cache.lock

echo '---- starting to update cache'

find ~ -type d -name '.idea' > intellij-projects.cache

echo '---- cache updated successfully'

rm cache.lock