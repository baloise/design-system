# Figma Token Sync — Pull MVP Implementation Plan

Status: proposed · Owner: packages/tokens · Related: [ADR 0001](adr/0001-brand-tokens-as-figma-modes.md), [ADR 0002](adr/0002-variable-id-diffing.md), [CONTEXT.md § Figma Token Sync (Pull)](../CONTEXT.md#figma-token-sync-pull)

## 1. Purpose

Automate what is today a manual step: someone opens Figma's variable panel, uses
**Export variables as JSON**, and hand-trims the result into
`packages/tokens/tokens/Base.tokens.json` and `Tcs.tokens.json`. A GitHub Actions
workflow will do this instead, via the Figma Variables REST API, and open a pull
request whenever the pulled data differs from what's committed. It never commits
directly to any branch.

This supersedes the earlier bidirectional plugin plan (deleted from this branch
in commit `a501c127a`). Push-to-Figma, a Figma plugin UI, and 3-way conflict
resolution are explicitly out of scope — see [§7 Out of scope](#7-out-of-scope).

## 2. Governing decisions

| Decision            | Resolution                                                                                 |
| -------------------- | -------------------------------------------------------------------------------------------- |
| Figma → file mapping | One Figma file, one Variable Collection, one mode per brand ([ADR 0001](adr/0001-brand-tokens-as-figma-modes.md)) |
| Trigger              | Manual `workflow_dispatch` only                                                              |
| Figma file key       | Repo variable `vars.FIGMA_FILE_KEY`, not a per-run input                                     |
| Auth                 | Dedicated Figma service-account PAT, `secrets.FIGMA_TOKEN`, Variables read-only scope        |
| Modes pulled         | Hardcoded list (`Base`, `Tcs`) mirroring `packages/tokens/src/index.ts`'s `brands` array      |
| Brand-mode diffing   | Match by `variableId`, name-path fallback ([ADR 0002](adr/0002-variable-id-diffing.md))       |
| PR base branch       | `workflow_dispatch` input, default `next`, overridable to any branch (e.g. a feature branch)  |
| PR branch naming     | `figma-token-sync/<base-branch>` — one persistent sync PR per base branch                     |
| PR contents          | `packages/tokens/tokens/*.tokens.json` only — no rebuilt `dist/`                              |
| Pre-PR validation    | None — existing `continuous` CI workflow validates the PR after it opens                       |
| Script location      | `packages/tokens/scripts/figma-sync/`, run via `node --import tsx/esm` (matches `packages/css`)|
| Tests                | Vitest unit tests on the transform/diff functions, with fixture API responses                |

## 3. Figma REST API

Endpoint: `GET https://api.figma.com/v1/files/{file_key}/variables/local`
(Enterprise-only; requires the PAT to have the "Variables" read scope, or the
`file_variables:read` scope on a scoped token.)

Response shape (relevant parts):

```jsonc
{
  "meta": {
    "variableCollections": {
      "<collectionId>": {
        "name": "...",
        "modes": [{ "modeId": "1:0", "name": "Base" }, { "modeId": "1:1", "name": "Tcs" }],
      },
    },
    "variables": {
      "<variableId>": {
        "name": "🌐 Global/🌈 Color/White", // "/" separates group path
        "resolvedType": "COLOR", // COLOR | FLOAT | STRING | BOOLEAN
        "variableCollectionId": "<collectionId>",
        "scopes": ["ALL_SCOPES"],
        "description": "",
        "valuesByMode": {
          "1:0": { "r": 1, "g": 1, "b": 1, "a": 1 }, // literal color
          "1:1": { "type": "VARIABLE_ALIAS", "id": "<otherVariableId>" }, // alias
        },
      },
    },
  },
}
```

There is exactly one Variable Collection in scope (per ADR 0001) — if the
response ever contains more than one, the script should fail loudly rather
than guess which collection to use.

## 4. Transform: API response → `<Mode>.tokens.json`

For a given mode (e.g. `"Base"`), build the nested token tree:

1. **Resolve the mode's `modeId`** from `variableCollections[collectionId].modes`.
2. **For each variable** in that collection:
   - Split `variable.name` on `"/"` to get the group path (segments keep emoji
     and spaces as-is, e.g. `["🌐 Global", "🌈 Color", "White"]`).
   - Look up `valuesByMode[modeId]`. If absent, skip the variable for this mode.
   - Map `resolvedType` → `$type`: `COLOR → color`, `FLOAT → number`,
     `STRING → string`, `BOOLEAN → boolean`.
   - **Value conversion**:
     - `COLOR`: convert `{r,g,b,a}` (0–1 floats) → `{colorSpace: "srgb", components: [r,g,b], alpha: a, hex: "#RRGGBB"}`.
     - `VARIABLE_ALIAS`: resolve `id` to the aliased variable's name, convert
       its `/`-path to a `.`-path, and emit `"{<dotted.path>}"` (e.g.
       `"{🔗 Alias.Color.Text.White}"`). The aliased variable does not need
       to be re-resolved recursively — Style Dictionary resolves the
       reference at build time.
     - `FLOAT` / `STRING` / `BOOLEAN`: pass the primitive through.
   - Set `$extensions`: `{ "com.figma.variableId": variable.id, "com.figma.scopes": variable.scopes }`.
     Add `$description` when `variable.description` is non-empty.
   - Insert into the nested tree at the group path, with the leaf holding
     `$type`/`$value`/`$extensions`.
3. **Top-level `$extensions`**: `{ "com.figma.modeName": "<Mode>" }` (already
   present on `Base.tokens.json` today).

This produces the *full* per-mode tree — correct as-is for `Base.tokens.json`.

## 5. Brand-mode diff (Tcs and future brands)

`Tcs.tokens.json` must contain only tokens whose Tcs-mode value differs from
Base. After building the full trees for both modes (§4):

1. Walk the Base tree and the brand tree in parallel by **`variableId`** (build
   an id → node lookup for each tree first; ADR 0002). Path is only used as a
   fallback if a brand-mode node has no `com.figma.variableId` — not expected
   from a fresh pull, since both trees come from the same API response.
2. Keep a brand node only if its `$value` differs (deep-equal) from the Base
   node's `$value` at the same `variableId`.
3. Rebuild the minimal nested tree from the surviving nodes, preserving group
   structure (a group with no surviving descendants is dropped entirely).
4. Set the brand file's top-level `$extensions.com.figma.modeName` to the
   brand name.

**Deliberate deviation from the currently committed `Tcs.tokens.json`:** the
generated file will include `$extensions.com.figma.variableId` /
`com.figma.scopes` on brand tokens too (today's hand-trimmed file omits them).
This is a strict improvement — it's what makes future id-based diffing
possible — and should be called out in the first sync PR's description so
reviewers aren't surprised by the extra metadata on otherwise-unchanged lines.

## 6. Script structure

```
packages/tokens/scripts/figma-sync/
  pull.ts              # entry point: fetch → transform → diff → write files
  figma-client.ts       # thin fetch wrapper for the REST endpoint + typed response
  transform.ts          # §4: API response + modeId → nested token tree
  diff.ts                # §5: base tree + brand tree → minimal override tree
  color.ts               # RGBA float → {colorSpace, components, alpha, hex}
  transform.test.ts
  diff.test.ts
  color.test.ts
  fixtures/
    variables-local-response.json   # trimmed real-shaped fixture (Base + Tcs modes, incl. an alias and an unchanged-vs-changed pair)
```

`pull.ts` responsibilities:

- Read `FIGMA_FILE_KEY` and `FIGMA_TOKEN` from env.
- Fetch `/v1/files/{file_key}/variables/local`.
- Assert exactly one variable collection; fail with a clear message otherwise.
- For `Base`: write `packages/tokens/tokens/Base.tokens.json` (full tree).
- For each brand in a local `brands = ['Tcs']` list (kept in sync with
  `packages/tokens/src/index.ts` by convention, not by import — see §7):
  write `packages/tokens/tokens/<Brand>.tokens.json` (diffed tree from §5).
- Exit non-zero on any Figma API error (non-200, missing collection, missing
  mode) so the workflow step — and thus the job — fails visibly instead of
  silently writing empty/partial files.

### package.json additions (`packages/tokens/package.json`)

```jsonc
"scripts": {
  "figma:pull": "node --import tsx/esm scripts/figma-sync/pull.ts",
  "test": "vitest --run"
},
"devDependencies": {
  "tsx": "catalog:",
  "vitest": "catalog:"
}
```

New `packages/tokens/vitest.config.ts`, matching `packages/playwright`'s:

```ts
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    passWithNoTests: true,
    globals: true,
    environment: 'node',
    include: ['scripts/**/*.{test,spec}.ts'],
    reporters: ['default'],
  },
})
```

(`include` points at `scripts/`, not `src/`, since that's the only place tests
exist in this package for now.)

## 7. GitHub Actions workflow

New file: `.github/workflows/figma-token-sync.yml`

```yaml
name: Figma Token Sync

on:
  workflow_dispatch:
    inputs:
      base_branch:
        description: 'Branch to open the sync PR against'
        required: false
        default: next

jobs:
  pull-tokens:
    runs-on: ubuntu-latest
    permissions:
      contents: write
      pull-requests: write
    steps:
      - name: Clone repo
        uses: actions/checkout@v5
        with:
          ref: ${{ inputs.base_branch }}

      - name: Setup Environment
        uses: ./.github/workflows/actions/setup-environment

      - name: Install dependencies
        run: pnpm install --frozen-lockfile

      - name: Pull tokens from Figma
        run: pnpm --filter @baloise/ds-tokens figma:pull
        env:
          FIGMA_FILE_KEY: ${{ vars.FIGMA_FILE_KEY }}
          FIGMA_TOKEN: ${{ secrets.FIGMA_TOKEN }}

      - name: Create Pull Request
        uses: peter-evans/create-pull-request@v6
        with:
          commit-message: 'chore: sync tokens from Figma'
          title: 'chore: sync tokens from Figma'
          body: |
            Automated pull from the Figma Variables REST API.
            Target branch: `${{ inputs.base_branch }}`

            Review the diff in `packages/tokens/tokens/*.tokens.json` before merging.
          branch: figma-token-sync/${{ inputs.base_branch }}
          base: ${{ inputs.base_branch }}
          add-paths: packages/tokens/tokens/*.tokens.json
```

Notes:

- `add-paths` restricts the PR to the tokens JSON files even though the
  checkout is a full repo clone — belt-and-suspenders alongside the script
  only ever writing those two files.
- `peter-evans/create-pull-request` already no-ops (just updates the branch,
  no new PR) when a PR for `branch` is already open against `base` — this is
  what gives us "one persistent sync PR per base branch" for free, no custom
  dedupe logic needed.
- This repo already uses `peter-evans/create-pull-request` in
  `screenshots.yml` / `snapshot.yml`, and the `setup-environment` composite
  action for Node/pnpm — both reused as-is here, no new patterns introduced.

### One-time setup (not part of this code change — flagging for you)

- Create the dedicated Figma service-account, add it to the Enterprise org,
  generate a PAT with Variables read-only scope.
- Add `FIGMA_TOKEN` as a repository secret and `FIGMA_FILE_KEY` as a
  repository variable.

## 8. Out of scope (MVP)

- **Push to Figma** (tokens → Figma direction). No workflow, no write-scope
  PAT.
- **Automatic mode discovery.** Adding a brand requires updating both
  `packages/tokens/src/index.ts`'s `brands` array and `pull.ts`'s brand list
  by hand.
- **Rebuilding `dist/`** as part of the sync PR.
- **Pre-PR build validation** (`pnpm tokens` dry run) — deferred; rely on
  existing CI.
- **Scheduled/cron runs** — manual dispatch only for now.

## 9. Rollout / verification

1. Land this code on a throwaway branch; do **not** point `FIGMA_FILE_KEY` /
   `FIGMA_TOKEN` at production secrets yet.
2. Run `pnpm --filter @baloise/ds-tokens test` locally against the fixture
   response to validate transform/diff logic before ever calling the real API.
3. Dispatch the workflow once with `base_branch` set to a scratch branch (not
   `next`) and confirm: the PR opens, contains only the two tokens files, and
   the JSON is a no-op diff (assuming nothing changed in Figma since the last
   manual export) or a sensible diff (if something did).
4. Once verified, document the manual one-time setup (§7) in
   `packages/tokens/CONTEXT.md` or `CONTRIBUTING.md` and hand the "Run
   workflow" step off to whoever owns Figma changes going forward.
