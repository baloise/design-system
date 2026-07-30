#!/bin/bash
set -euo pipefail

# Links the locally built @baloise/ds-react, @baloise/ds-core and @baloise/ds-css
# into this app via pnpm's link: protocol, simulating an npm-installed consumer
# instead of pnpm workspace resolution. See docs/adr/0004-react-smoke-test-app-outside-workspace.md.
#
# @baloise/ds-core and @baloise/ds-css both depend on @baloise/ds-assets and
# @baloise/ds-tokens. This app is its own isolated pnpm workspace (see the ADR
# above), not a member of the monorepo workspace, so those transitive deps
# can't resolve through packages/core's or packages/css's node_modules -
# pnpm would instead try to fetch them from the npm registry at whatever
# version is in the linked package.json, which doesn't exist there yet
# during the version-bump PR window before a release is published. Link
# them too so resolution stays entirely local.

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR/.."

pnpm link ../../../packages/assets
pnpm link ../../../packages/tokens
pnpm link ../../../packages/core
pnpm link ../../../packages/react
pnpm link ../../../packages/css

echo "=> Linked @baloise/ds-assets, @baloise/ds-tokens, @baloise/ds-core, @baloise/ds-react and @baloise/ds-css into $(pwd)"
