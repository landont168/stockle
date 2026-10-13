#!/usr/bin/env bash

set -euo pipefail

BASE_URL="${STOCKLE_API_URL:-http://localhost:4000}"
ROUNDS="${1:-5}"

if ! [[ "$ROUNDS" =~ ^[1-9][0-9]*$ ]]; then
  echo "Usage: $0 [positive-number-of-rounds]" >&2
  exit 1
fi

echo "Generating $ROUNDS rounds of mixed traffic against $BASE_URL"

for ((round = 1; round <= ROUNDS; round += 1)); do
  curl --silent --output /dev/null "$BASE_URL/"
  curl --silent --output /dev/null "$BASE_URL/api/stocks"
  curl --silent --output /dev/null "$BASE_URL/api/stocks/not-a-valid-id"
  curl --silent --output /dev/null "$BASE_URL/api/diagnostics/slow?delayMs=250"
  curl --silent --output /dev/null "$BASE_URL/api/diagnostics/slow?delayMs=1000"
  curl --silent --output /dev/null "$BASE_URL/api/diagnostics/error"
  printf 'Completed round %s/%s\n' "$round" "$ROUNDS"
done
