#!/usr/bin/env bash

source "$(dirname "$0")/common.sh"

echo "Removing the Stockle course containers and their local Grafana/Loki/Tempo/Mimir data."
"${COMPOSE[@]}" down --volumes --remove-orphans
