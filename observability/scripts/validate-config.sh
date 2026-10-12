#!/usr/bin/env bash

source "$(dirname "$0")/common.sh"

require_command docker

"${COMPOSE[@]}" config --quiet
echo "PASS  Docker Compose configuration"

docker run --rm \
  --volume "$PROJECT_ROOT/observability/loki/config.yml:/etc/loki/config.yml:ro" \
  grafana/loki:3.7.8 \
  -config.file=/etc/loki/config.yml -verify-config=true >/dev/null
echo "PASS  Loki configuration"

docker run --rm \
  --volume "$PROJECT_ROOT/observability/mimir/config.yml:/etc/mimir/config.yml:ro" \
  grafana/mimir:3.2.1 \
  -config.file=/etc/mimir/config.yml -modules >/dev/null
echo "PASS  Mimir configuration"

docker run --rm \
  --volume "$PROJECT_ROOT/observability/alloy/config.alloy:/etc/alloy/config.alloy:ro" \
  grafana/alloy:v1.20.1 \
  fmt --test /etc/alloy/config.alloy
echo "PASS  Alloy configuration and formatting"

tempo_check_container="stockle-tempo-config-check-$$"
cleanup_tempo_check() {
  docker stop "$tempo_check_container" >/dev/null 2>&1 || true
  docker container rm "$tempo_check_container" >/dev/null 2>&1 || true
}
trap cleanup_tempo_check EXIT

docker run --detach \
  --name "$tempo_check_container" \
  --volume "$PROJECT_ROOT/observability/tempo/config.yml:/etc/tempo/config.yml:ro" \
  grafana/tempo:3.1.0 \
  -config.file=/etc/tempo/config.yml >/dev/null
sleep 2

if [[ "$(docker inspect --format '{{.State.Running}}' "$tempo_check_container")" != "true" ]]; then
  docker logs "$tempo_check_container" >&2
  exit 1
fi

cleanup_tempo_check
trap - EXIT
echo "PASS  Tempo configuration"
