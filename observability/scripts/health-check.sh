#!/usr/bin/env bash

source "$(dirname "$0")/common.sh"

require_command curl

failed=0
check_url "Stockle liveness" "http://localhost:4000/health/live" || failed=1
check_url "Stockle readiness (includes MongoDB)" "http://localhost:4000/health/ready" || failed=1
check_url "Grafana" "http://localhost:3000/api/health" || failed=1
check_url "Loki" "http://localhost:3100/ready" || failed=1
check_url "Tempo" "http://localhost:3200/ready" || failed=1
check_url "Mimir" "http://localhost:9009/ready" || failed=1
check_url "Alloy" "http://localhost:12345/-/ready" || failed=1

exit "$failed"
