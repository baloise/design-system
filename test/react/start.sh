#!/bin/bash
set -euo pipefail

# Starts the dev server for a previously scaffolded app. Usage: bash start.sh v19

if [ $# -ne 1 ]; then
  echo "Usage: $0 <version, e.g. v19>" >&2
  exit 1
fi

APP_DIR="$1"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

if [ ! -d "$APP_DIR" ]; then
  echo "$APP_DIR has not been built yet. Run: bash build.sh $APP_DIR" >&2
  exit 1
fi

pushd "$APP_DIR" > /dev/null
pnpm start
popd > /dev/null
