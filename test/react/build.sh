#!/bin/bash
set -euo pipefail

# Scaffolds a throwaway React app (outside the pnpm workspace) to smoke-test
# @baloise/ds-react against a real React version. Usage: bash build.sh v19
#
# See docs/adr/0004-react-smoke-test-app-outside-workspace.md for why this
# app deliberately isn't a pnpm workspace member.

if [ $# -ne 1 ]; then
  echo "Usage: $0 <version, e.g. v19>" >&2
  exit 1
fi

APP_DIR="$1"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

if [ ! -d "base/$APP_DIR" ]; then
  echo "No base/$APP_DIR overlay found." >&2
  exit 1
fi

echo "=> Building @baloise/ds-core, @baloise/ds-react and @baloise/ds-css"
pushd ../.. > /dev/null
pnpm exec turbo run build --filter=@baloise/ds-core --filter=@baloise/ds-react --filter=@baloise/ds-css
popd > /dev/null

echo "=> Scaffolding $APP_DIR from base/app + base/$APP_DIR"
rm -rf "$APP_DIR"
mkdir -p "$APP_DIR"
cp -R base/app/. "$APP_DIR"
cp -R "base/$APP_DIR/." "$APP_DIR"

pushd "$APP_DIR" > /dev/null
pnpm install
bash scripts/link.sh
pnpm exec playwright install chromium
popd > /dev/null

echo "=> $APP_DIR ready"
