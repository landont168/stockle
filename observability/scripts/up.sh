#!/usr/bin/env bash

source "$(dirname "$0")/common.sh"

require_command docker
require_command curl

if [[ ! -f "$PROJECT_ROOT/backend/.env" ]]; then
  cat >&2 <<EOF
backend/.env is missing.

Create it before starting the course:
  cp backend/.env.example backend/.env
  openssl rand -hex 32

Then add your MongoDB URI and the generated value as SECRET.
EOF
  exit 1
fi

if ! docker info >/dev/null 2>&1; then
  echo "Docker Desktop is not running." >&2
  exit 1
fi

"${COMPOSE[@]}" up --build --detach --wait --wait-timeout 120
"$SCRIPT_DIR/health-check.sh"

cat <<'EOF'

Stockle: http://localhost:5173
Grafana: http://localhost:3000 (admin / admin)
Alloy:   http://localhost:12345/graph
EOF
