# CONTEXT — apps/toky (Toky)

Toky is the internal web app for proposing changes to `packages/tokens`' token files — a table-based editor that stages edits and opens a reviewable GitHub pull request, instead of hand-editing `*.tokens.json`.

## Language

**Working changes**:
The full set of in-progress edits held in the browser (via `use-undoable-state.ts`), covering every layer and brand, whether typed by hand or landed by a Pull (from Figma). Nothing here is real until Submit opens or updates a PR.
_Avoid_: draft, staged edits (reserve "staged" for the Staged Changes sidebar specifically)

**Submit**:
The action that turns working changes into a `TokenDiffEntry[]` diff and sends it to `/api/propose-change`, which opens or updates a GitHub PR on Toky's per-base working branch. Blocked while any Pull conflict is unresolved.
_Avoid_: propose, publish (the API route is named `propose-change` for historical reasons, but "Submit" is the user-facing term)

**Pull (from Figma)**:
Toky's own read of Figma Variables via a server-side route, diffed against the current token tree and landed into working changes as create/update/delete entries — reviewed and submitted exactly like a manual edit. Direction is Figma → GitHub, gated on a summary dialog (Apply/Cancel) before anything touches working changes. See [`apps/toky/docs/adr/0002-pull-from-figma-button.md`](docs/adr/0002-pull-from-figma-button.md).
_Avoid_: push, push (to Code) (see [`packages/tokens/CONTEXT.md`](../../packages/tokens/CONTEXT.md)'s Figma Sync glossary — "Pull" is reserved for this exact direction across both contexts, disambiguated by "(from Code)" vs "(from Figma)")

**Pull conflict**:
A token whose value changed both in working changes (an uncommitted manual edit) and in the latest Pull (from Figma) since that edit was made. Distinct from `packages/tokens/CONTEXT.md`'s "Conflict" (a 3-way baseline divergence used by the automated Pull-from-Code/Push-from-Figma sync domain) — a Pull conflict is purely "your uncommitted edit vs. what Figma has now," with no baseline involved. Surfaced for explicit resolution, not auto-resolved either direction; blocks Submit until every conflict is resolved.
_Avoid_: conflict (bare — always qualify as "Pull conflict" in this context to avoid collision with packages/tokens' term)

**Provenance**:
A tag on a working-change entry recording whether it came from a manual edit or a Pull (from Figma). Shown in the staged-changes sidebar and carried into the PR/changeset description.

**Brand**:
A named override tree layered on top of Base (e.g. `Tcs`), stored as its own sparse `*.tokens.json` file. Toky can create a new brand as part of a submit — see [ADR-0001](docs/adr/0001-auto-patch-brands-array-on-create.md).

**Live Preview**:
A sidebar tab (alongside Figma Pull/Brands/Problems/Staged Changes) embedding `packages/core`'s dev-server (`localhost:4000`) in an iframe, reflecting the _current_ working changes as `--ds-*` CSS custom property overrides — not the committed/built tokens. Mirrors the brand currently selected for editing (no independent brand selector). Mounts/unmounts with the tab (no state kept across switches); each mount re-sends the full working-vs-baseline diff, not an incremental delta. A page picker (`SearchSelect`, shared with the Reference picker) lets you switch which `*.visual.html` page the iframe shows, sourced from `packages/core`'s generated `/visual-pages.json` manifest (every visual page under `src/{blocks,templates,foundation,components}`) plus a static "Playground" option; switching pages reloads the iframe and re-runs the ready handshake. See [`docs/plans/toky-live-token-preview-plan.md`](../../docs/plans/toky-live-token-preview-plan.md) and [ADR-0021](../../docs/adr/0021-shared-css-naming-serialization-for-preview.md).
_Avoid_: preview (bare — this app has no other "preview" concept yet, but qualify as "Live Preview" to stay consistent with the plan doc)

Requires `packages/core`'s dev-server running locally alongside Toky's own (`pnpm --filter core start`, then `pnpm --filter toky dev`) — the Preview tab shows a "start it with `pnpm --filter core start`" hint if it isn't reachable within a few seconds. `NEXT_PUBLIC_DS_PREVIEW_URL` (see `.env.example`) overrides the default `localhost:4000` URL. Serving a deployed/Vercel-hosted preview instead of the dev-server is a later phase, not yet built.
