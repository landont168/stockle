#!/usr/bin/env bash

source "$(dirname "$0")/common.sh"

require_command curl
require_command python3

LAB="${1:-}"

if [[ ! "$LAB" =~ ^[1-6]$ ]]; then
  echo "Usage: $0 <lab-number-1-through-6>" >&2
  exit 1
fi

check_loki_has_logs() {
  local response
  response="$(curl --silent --show-error --fail --get \
    --data-urlencode 'query={service_name="stockle-backend"}' \
    --data-urlencode 'limit=20' \
    'http://localhost:3100/loki/api/v1/query_range')"
  RESPONSE="$response" python3 - <<'PY'
import json
import os
import sys

payload = json.loads(os.environ["RESPONSE"])
results = payload.get("data", {}).get("result", [])
if not any(stream.get("values") for stream in results):
    print("FAIL  Loki has no Stockle backend logs", file=sys.stderr)
    raise SystemExit(1)
print("PASS  Loki contains Stockle backend logs")
PY
}

check_structured_logs() {
  local marker="course-secret-do-not-log"
  local response

  curl --silent --output /dev/null \
    --header 'Content-Type: application/json' \
    --data "{\"username\":\"course-check-user\",\"password\":\"$marker\"}" \
    'http://localhost:4000/api/login'
  sleep 3

  response="$(curl --silent --show-error --fail --get \
    --data-urlencode 'query={service_name="stockle-backend"}' \
    --data-urlencode 'limit=100' \
    'http://localhost:3100/loki/api/v1/query_range')"

  RESPONSE="$response" MARKER="$marker" python3 - <<'PY'
import json
import os
import sys

payload = json.loads(os.environ["RESPONSE"])
lines = [value[1] for stream in payload.get("data", {}).get("result", []) for value in stream.get("values", [])]
if os.environ["MARKER"] in "\n".join(lines):
    print("FAIL  The test password appeared in Loki", file=sys.stderr)
    raise SystemExit(1)

required = {"level", "service", "request_id", "method", "path", "status", "duration_ms"}
for line in lines:
    try:
        parsed = json.loads(line)
    except json.JSONDecodeError:
        continue
    if required.issubset(parsed):
        print("PASS  Structured request log contains the required safe fields")
        break
else:
    print("FAIL  No JSON request log contained: " + ", ".join(sorted(required)), file=sys.stderr)
    raise SystemExit(1)
PY
}

check_metrics() {
  curl --silent --output /dev/null 'http://localhost:4000/'
  sleep 8

  for metric in stockle_http_requests_total stockle_http_request_duration_seconds_count; do
    local response
    response="$(curl --silent --show-error --fail --get \
      --data-urlencode "query=$metric" \
      'http://localhost:9009/prometheus/api/v1/query')"
    RESPONSE="$response" METRIC="$metric" python3 - <<'PY'
import json
import os
import sys

payload = json.loads(os.environ["RESPONSE"])
if not payload.get("data", {}).get("result"):
    print(f"FAIL  Mimir has no samples for {os.environ['METRIC']}", file=sys.stderr)
    raise SystemExit(1)
print(f"PASS  Mimir contains {os.environ['METRIC']}")
PY
  done
}

check_traces() {
  curl --silent --output /dev/null 'http://localhost:4000/api/stocks'
  sleep 5

  local response
  response="$(curl --silent --show-error --fail --get \
    --data-urlencode 'tags=service.name=stockle-backend' \
    --data-urlencode 'limit=20' \
    'http://localhost:3200/api/search')"
  RESPONSE="$response" python3 - <<'PY'
import json
import os
import sys

payload = json.loads(os.environ["RESPONSE"])
if not payload.get("traces"):
    print("FAIL  Tempo has no traces for stockle-backend", file=sys.stderr)
    raise SystemExit(1)
print("PASS  Tempo contains Stockle backend traces")
PY
}

check_correlations_and_dashboard() {
  local datasource_file="$PROJECT_ROOT/observability/grafana/provisioning/datasources/datasources.yml"
  for setting in tracesToLogsV2 derivedFields exemplarTraceIdDestinations; do
    if ! grep -q "$setting" "$datasource_file"; then
      echo "FAIL  Grafana provisioning does not contain $setting" >&2
      return 1
    fi
  done
  echo "PASS  Grafana data sources contain log, trace, and exemplar correlation settings"

  local response
  response="$(curl --silent --show-error --fail \
    --user admin:admin \
    --get --data-urlencode 'query=Stockle Service Overview' \
    'http://localhost:3000/api/search')"
  RESPONSE="$response" python3 - <<'PY'
import json
import os
import sys

if not json.loads(os.environ["RESPONSE"]):
    print("FAIL  Grafana has no 'Stockle Service Overview' dashboard", file=sys.stderr)
    raise SystemExit(1)
print("PASS  Grafana contains the Stockle Service Overview dashboard")
PY
}

case "$LAB" in
  1)
    "$SCRIPT_DIR/health-check.sh"
    curl --silent --output /dev/null 'http://localhost:4000/'
    sleep 3
    check_loki_has_logs
    ;;
  2)
    check_structured_logs
    ;;
  3)
    check_metrics
    ;;
  4)
    check_traces
    ;;
  5)
    check_correlations_and_dashboard
    ;;
  6)
    "$SCRIPT_DIR/generate-traffic.sh" 2
    check_loki_has_logs
    check_metrics
    check_traces
    if grep -q 'TODO' "$PROJECT_ROOT/docs/observability-course/incident-report.md"; then
      echo "FAIL  Complete the incident report and remove its TODO markers" >&2
      exit 1
    fi
    echo "PASS  Incident report has no remaining TODO markers"
    ;;
esac
