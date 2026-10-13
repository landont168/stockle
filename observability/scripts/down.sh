#!/usr/bin/env bash

source "$(dirname "$0")/common.sh"

"${COMPOSE[@]}" down --remove-orphans
