#!/bin/bash
set -euo pipefail

# Links the locally built @baloise/ds-react, @baloise/ds-core and @baloise/ds-css
# into this app via pnpm's link: protocol, simulating an npm-installed consumer
# instead of pnpm workspace resolution. See docs/adr/0004-react-smoke-test-app-outside-workspace.md.
#
# @baloise/ds-css's own dependencies (@baloise/ds-assets, @baloise/ds-tokens) don't
# need linking here - they resolve through packages/css's own node_modules inside
# the monorepo, since it's a real workspace member there.

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR/.."

pnpm link ../../../packages/core
pnpm link ../../../packages/react
pnpm link ../../../packages/css

echo "=> Linked @baloise/ds-core, @baloise/ds-react and @baloise/ds-css into $(pwd)"
