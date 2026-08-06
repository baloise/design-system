# Figma Sync GitHub Action — Implementation Plan

Status: proposed · Owner: packages/tokens · Related: [ADR 0001](adr/0001-figma-variable-identity-key.md), [ADR 0002](adr/0002-brand-modes-not-collections.md), [ADR 0003](adr/0003-native-variable-aliasing.md), [ADR 0004](adr/0004-git-data-api-atomic-commits.md), [ADR 0005](adr/0005-git-committed-sync-baseline.md), [ADR 0006](adr/0006-github-action-supersedes-plugin-pull.md), [ADR 0007](adr/0007-direct-commit-variableid-backfill.md), [ADR 0008](adr/0008-non-blocking-conflict-check.md), [ADR 0009](adr/0009-pull-auto-deletes-figma-variables.md), [ADR 0010](adr/0010-figma-sync-action-standalone-script.md)

## 1. Purpose

Automate Pull (from Code) — see [packages/tokens/CONTEXT.md](../CONTEXT.md) —
so that merging a Toky-authored token change reaches Figma Variables
without a designer needing to open Figma or run the plugin. Triggered
exclusively by merges of Toky's `toky/update-next` branch
(`apps/toky/src/tokens/github.ts`'s `workingBranchFor('next')`), which is
the only branch Toky ever proposes changes on.

Two workflows, two concerns:

- **`figma-conflict-check.yml`** — runs while the PR is open. Non-blocking
  visibility into Conflicts (ADR-0008).
- **`figma-sync.yml`** — runs after merge. Does the actual Pull.

Reuses the sync domain established for the plugin ([figma-token-sync-plugin-plan.md](figma-token-sync-plugin-plan.md)):
`variableId` identity, brand-mode mapping, native aliasing, and the
`.figma-sync-state.json` baseline — same data model, different caller (see
ADR-0006).

## 2. Governing decisions

| Decision                  | Resolution                                                                                                                                                                                                                                                                                                                                                                                                                         |
| ------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Trigger                   | `figma-conflict-check.yml`: `pull_request` events where `head.ref == toky/update-next`. `figma-sync.yml`: `pull_request: closed` where `merged == true` and `head.ref == toky/update-next` — **not** `push` to `next` (this repo only allows squash merges, confirmed via `gh repo view`, so the merge commit has no second parent to walk; the closed-PR event carries `merged`/`head.ref` directly and needs no reconstruction). |
| Direction                 | Pull (from Code) only — GitHub → Figma. Push (Figma → GitHub) stays with the plugin.                                                                                                                                                                                                                                                                                                                                               |
| Brand scope               | All brands from day one — Base mode plus every `<Brand>.tokens.json`'s mode, in the same run (ADR-0002).                                                                                                                                                                                                                                                                                                                           |
| Metadata location         | Inline `$extensions.com.figma.{variableId,scopes}` on the token (existing convention, [ADR-0001](adr/0001-figma-variable-identity-key.md)) — not `.figma-sync-state.json`, which stays sync bookkeeping only ([ADR-0005](adr/0005-git-committed-sync-baseline.md)).                                                                                                                                                                |
| New-variableId write-back | Direct commit to `next`, bundled with the `.figma-sync-state.json` update, one atomic Git Data API commit ([ADR-0004](adr/0004-git-data-api-atomic-commits.md), [ADR-0007](adr/0007-direct-commit-variableid-backfill.md)).                                                                                                                                                                                                        |
| Token deletion            | Auto-delete the matching Figma Variable ([ADR-0009](adr/0009-pull-auto-deletes-figma-variables.md)).                                                                                                                                                                                                                                                                                                                               |
| Conflict handling         | Comment-only, non-blocking ([ADR-0008](adr/0008-non-blocking-conflict-check.md)).                                                                                                                                                                                                                                                                                                                                                  |
| Reference handling        | Native Figma variable aliases, not flattened literals ([ADR-0003](adr/0003-native-variable-aliasing.md)) — two-pass write (create all variables, then bind aliases), same ordering constraint the plugin plan identified.                                                                                                                                                                                                          |
| Code location             | Standalone script, not shared with `apps/toky` ([ADR-0010](adr/0010-figma-sync-action-standalone-script.md)).                                                                                                                                                                                                                                                                                                                      |
| Credentials               | `FIGMA_API_TOKEN` (Figma REST token, `file_variables:write` scope), `FIGMA_FILE_KEY` (target file key) — both new secrets, provisioned before this ships.                                                                                                                                                                                                                                                                          |
| GitHub write              | Same bot credential already used elsewhere in `.github/workflows` (`PRE_RELEASE_GITHUB_TOKEN` or equivalent) — needs branch-protection bypass on `next`, scoped to the id-backfill commit path (ADR-0007).                                                                                                                                                                                                                         |

## 3. Data model

Reuses the plugin plan's domain types
([figma-token-sync-plugin-plan.md §5](figma-token-sync-plugin-plan.md#5-data-model))
without modification:

```ts
interface Token {
  path: string[]
  type: string
  value: TokenValue
  variableId?: string // $extensions["com.figma.variableId"]
  figmaScopes?: string[] // $extensions["com.figma.scopes"]
}

interface SyncState {
  lastSyncedCommit: string
  lastSyncedAt: string
  entries: Record<
    string /* variableId */,
    {
      tokenPath: string[]
      resolvedValue: unknown
      lastModifiedSource: 'code' | 'figma'
      lastModifiedAt: string
    }
  >
}
```

`SyncState` lives at `packages/tokens/.figma-sync-state.json`, shared
between this Action and the plugin's Phase 1 diff view — one baseline, two
readers.

## 4. Workflow: `figma-conflict-check.yml`

```yaml
name: 🔍 Figma Conflict Check
on:
  pull_request:
    branches: [next]
    paths: ['packages/tokens/tokens/*.tokens.json']

jobs:
  check:
    if: github.head_ref == 'toky/update-next'
    runs-on: ubuntu-24.04
    steps:
      - uses: actions/checkout@v7
      - uses: ./.github/workflows/actions/setup-environment
      - name: Diff PR tokens against Figma + baseline
        env:
          FIGMA_API_TOKEN: ${{ secrets.FIGMA_API_TOKEN }}
          FIGMA_FILE_KEY: ${{ secrets.FIGMA_FILE_KEY }}
        run: node scripts/figma-sync/conflict-check.mjs
        # Reads .figma-sync-state.json (baseline) + current Figma Variables
        # (GET /v1/files/:key/variables/local) + the PR's changed tokens.
        # Emits a machine-readable conflict list; the job never fails.
      - name: Comment on PR
        uses: actions/github-script@v7
        # Find-or-update a single "Figma sync" comment (by a marker string)
        # rather than posting a new one on every push to the PR.
```

**Conflict definition** (ADR already ratified in CONTEXT.md): a touched
token whose current Figma value _and_ current GitHub value have both
diverged from `.figma-sync-state.json`'s recorded baseline for that
`variableId`. One-sided changes (only Figma moved, only GitHub moved) are
not conflicts and aren't listed — they're just what Pull is about to
resolve.

## 5. Workflow: `figma-sync.yml`

```yaml
name: 🔼 Figma Sync (Pull from Code)
on:
  pull_request:
    types: [closed]
    branches: [next]

concurrency: ${{ github.workflow }}

jobs:
  sync:
    if: github.event.pull_request.merged == true && github.event.pull_request.head.ref == 'toky/update-next'
    runs-on: ubuntu-24.04
    timeout-minutes: 15
    steps:
      - uses: actions/checkout@v7
        with:
          token: ${{ secrets.PRE_RELEASE_GITHUB_TOKEN }}
      - uses: ./.github/workflows/actions/setup-environment
      - name: Pull tokens to Figma
        env:
          FIGMA_API_TOKEN: ${{ secrets.FIGMA_API_TOKEN }}
          FIGMA_FILE_KEY: ${{ secrets.FIGMA_FILE_KEY }}
        run: node scripts/figma-sync/pull.mjs
        # 1. Load Base + every brand file, resolve per-brand trees
        #    (same recursive diff shape as config.brand.ts's computeTokenDiff).
        # 2. Load current Figma Variables + modes (GET .../variables/local).
        # 3. Two-pass write: create/update all variables and mode-values
        #    first (POST .../variables), then bind aliases.
        # 4. Delete Figma Variables for tokens no longer present (ADR-0009).
        # 5. Collect any newly-created variableIds.
      - name: Write back new variableIds + baseline (direct commit)
        if: steps.sync.outputs.new_ids != ''
        env:
          GITHUB_TOKEN: ${{ secrets.PRE_RELEASE_GITHUB_TOKEN }}
        run: node scripts/figma-sync/backfill-commit.mjs
        # One atomic Git Data API commit (blob/tree/commit/ref) touching
        # every changed *.tokens.json plus .figma-sync-state.json.
        # Direct to `next` — see ADR-0007. No PR opened.
```

## 6. Script layout

```
scripts/figma-sync/
├── conflict-check.mjs      # entrypoint for figma-conflict-check.yml
├── pull.mjs                # entrypoint for figma-sync.yml's sync job
├── backfill-commit.mjs     # entrypoint for the id/baseline write-back
├── lib/
│   ├── github.mjs          # Contents/Git Data API calls (re-derived per ADR-0010,
│   │                       #   not imported from apps/toky)
│   ├── figma.mjs           # Figma Variables REST client (read/create/update/delete)
│   ├── tokens.mjs          # Base+brand loading, resolution (mirrors config.brand.ts)
│   ├── diff.mjs            # 3-way diff against .figma-sync-state.json baseline
│   └── alias.mjs           # {Reference} string <-> Figma VARIABLE_ALIAS binding
└── test/
    ├── diff.test.ts
    ├── alias.test.ts
    └── fixtures/
```

`lib/` is pure/testable where possible (`diff.mjs`, `alias.mjs`'s binding
logic minus the actual API calls) — same "sync/ has zero dependency on
external APIs" boundary the plugin plan already established for its own
engine.

## 7. Phased implementation

### Phase 1 — Figma REST client + read-only Pull dry-run

- `lib/figma.mjs`: read local variables/collections/modes
  (`GET /v1/files/:key/variables/local`).
- `lib/tokens.mjs`: load + resolve Base/brand trees.
- `pull.mjs` runs in a dry-run mode (`workflow_dispatch` only, no writes)
  that logs the diff it _would_ apply — de-risks the resolution/mapping
  logic against the real ~1,585-token file before any write path exists.
- Vitest coverage: brand resolution matches `config.brand.ts`'s
  `computeTokenDiff` output exactly (shared fixture, same rigor the plugin
  plan uses for the same claim).

### Phase 2 — Write path: create/update variables + modes

- `lib/figma.mjs` gains `POST /v1/files/:key/variables` (bulk
  create/update/delete in one call — the REST API's batch shape is
  actually a better fit here than the plugin's per-call Plugin API).
- Two-pass alias binding (`lib/alias.mjs`), all brand modes populated per
  §6 of the plugin plan's multi-brand table (reused, not reinvented).
- `figma-sync.yml`'s `sync` job wired to actually call `pull.mjs` for
  real, on a test Figma file first.

### Phase 3 — VariableId backfill + baseline write-back

- `backfill-commit.mjs`: Git Data API atomic commit, id-only diffs plus
  `.figma-sync-state.json` (ADR-0004, ADR-0007).
- Confirm the bot token's branch-protection bypass actually works against
  `next`'s real protection rules (provisioning dependency called out in
  ADR-0007 — this is where it gets verified, not assumed).

### Phase 4 — Deletion handling

- Wire the auto-delete path (ADR-0009) with an explicit test: a token
  removed from `Base.tokens.json` in a Toky PR results in the matching
  Figma Variable being gone after sync, and the deletion is reflected in
  the same run's baseline update (not left dangling for the next sync to
  notice).

### Phase 5 — Conflict check

- `conflict-check.mjs` + `figma-conflict-check.yml`: 3-way diff reusing
  `lib/diff.mjs` from Phase 1/2, comment find-or-update logic
  (ADR-0008 — always passes).
- Test against a fixture where Figma and GitHub both moved the same
  `variableId` since baseline — confirm it's listed; a fixture where only
  one side moved — confirm it's _not_ listed.

### Phase 6 — Trigger wiring + end-to-end verification

- Confirm the `pull_request: closed` + `merged == true` +
  `head.ref == 'toky/update-next'` guard actually fires exactly once per
  real Toky merge (squash-only repo setting already confirmed via
  `gh repo view`, so this is testing the workflow config, not the premise).
- One real end-to-end run: a test token change on `toky/update-next`,
  merged, confirm it lands in a test Figma file with correct id/scopes,
  correct mode-values across brands, and a correct baseline commit.

## 8. Open questions / provisioning dependencies

- **Figma REST API access tier**: the Variables API is a paid-plan/Enterprise
  feature on some Figma plans — confirm the target Figma org's plan
  actually has REST Variables API access before Phase 1 starts, not
  after.
- **Bot branch-protection bypass** (ADR-0007): needs to be granted on
  `next` before Phase 3, scoped as tightly as the platform allows.
