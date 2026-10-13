#!/usr/bin/env bash

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"
COMPOSE=(
  docker compose
  --project-directory "$PROJECT_ROOT"
  -f "$PROJECT_ROOT/docker-compose.yml"
  -f "$PROJECT_ROOT/observability/compose.yml"
)

require_command() {
  if ! command -v "$1" >/dev/null 2>&1; then
    echo "Missing required command: $1" >&2
    exit 1
  fi
}

check_url() {
  local name="$1"
  local url="$2"

  if curl --silent --show-error --fail "$url" >/dev/null; then
    printf 'PASS  %s\n' "$name"
  else
    printf 'FAIL  %s (%s)\n' "$name" "$url" >&2
    return 1
  fi
}

wait_for_url() {
  local name="$1"
  local url="$2"
  local attempts="${3:-30}"

  for ((attempt = 1; attempt <= attempts; attempt += 1)); do
    if curl --silent --fail "$url" >/dev/null 2>&1; then
      printf 'PASS  %s\n' "$name"
      return 0
    fi
    sleep 2
  done

  printf 'FAIL  %s did not become ready (%s)\n' "$name" "$url" >&2
  return 1
}
