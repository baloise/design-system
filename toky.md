# Toky — Design Token Editor & Sync (IDEA)

A fresh-start brainstorm for a token editor/sync tool, ignoring prior ADRs. This document captures requirements and architectural direction only — no implementation yet.

## Goals

- **Simple to maintain and extend.** This is the top priority driving every architectural choice below.
- **Own tooling, built on our own DS.** A homegrown editor lets us dogfood the design system while building it.
- **Usable by designers, not just developers.** A ux/designer should be comfortable creating and editing tokens without touching JSON or Git directly.
- **A light version of Token Studio, scoped to our needs.** We're not rebuilding Token Studio's full feature set (themes, multi-file sets, style/variable duality, plugin marketplace, etc.) — just the slice we actually use: DTCG token editing, our Global → Alias → Component structure, and a two-way Figma sync. Everywhere Token Studio's design answers a question we'd otherwise have to answer from scratch, prefer matching its shape over inventing our own — it's a well-worn mental model for anyone (designer or dev) who's used it before.

## Requirements

- Token files must follow the [W3C Design Tokens Format](https://www.designtokens.org/tr/drafts/format/) (DTCG).
- Must preserve our existing **Global → Alias → Component** structure.
- **GitHub is the single source of truth.** Nothing is real until it's merged.
- Renames can be breaking changes for consumers. We need visual regression tests to catch this, plus a (separately scoped) CI script verifying every `--ds-*` CSS variable maps to a design token.
- Two-way relationship with Figma: token changes sync to Figma, and Figma changes can be proposed back — via the **Figma REST API**, server-to-server. A Figma plugin is explicitly **out of scope for now** (see Roles & permissions and Direction below) — it adds a codebase to build/maintain and a second thing for designers to learn, for value the REST API can deliver without it.
- **Multi-brand support**, matching the existing `Base.tokens.json` + per-brand override file structure and [ADR-0002](packages/tokens/docs/adr/0002-brand-modes-not-collections.md): a brand (e.g. `Tcs`) is a **Figma mode** on the same Variable Collection, not a separate collection — the editor and sync need to carry that same model, not invent a new one.
- An editor to **create / rename / move / delete** tokens, **search** them, and view a **graph** of usage and inheritance.
- Each token carries metadata: Figma id, last Figma sync timestamp, last update timestamp.

## Roles & permissions

Three roles, each scoped to one side of the code ↔ Toky ↔ Figma loop. "Push" and "pull" below are named from the user's point of view (what they're moving, not which system technically initiates the sync):

| Role | Push | Pull | Toky web app access |
|---|---|---|---|
| **Developer** | Code → Toky: proposes token changes (via the editor, or a normal code PR that Toky picks up once merged) | Toky → code: consumes the built/resolved tokens (CSS vars, package) in their code | Full |
| **Designer** (internal) | Figma → Toky: edits Figma Variables directly in Figma's native UI, clicks **Publish** when ready — no plugin, no extra step. Picked up by the `LIBRARY_PUBLISH`-triggered sync (see Flow B) | Toky → Figma: pulls the latest merged tokens into Figma Variables (merge-triggered sync) | Full |
| **External / agency** | Figma → Toky: same as Designer — edits Figma Variables natively, picked up the same way when a library Publish fires the sync | Toky → Figma: same as Designer | **None** — no login to the Toky web app/editor |

- Every push, from any role, still goes through the same gate: PR, CI, human review (see Why PR-mediated, not direct writes below). Role only controls *entry surface*, never whether a change needs review — an external agency's Figma edit gets exactly the same scrutiny as a developer's code PR.
- **Without a plugin, Toky has no login step on the Figma side**, so it can't tell *which* Figma user made a given edit — the trust boundary for "who's allowed to push from Figma" is delegated entirely to **Figma's own file/project permissions**: only grant Figma edit access to people you're comfortable having their variable edits picked up by the automated sync and turned into a PR. This is a real simplification (no separate Designer-vs-External identity check to build or maintain on the Figma side, unlike the two-tier scheme a plugin would have needed) at a real cost (see the attribution trade-off in Auth & permissions below).
- The External/agency row's only Toky-enforced distinction is **web app access** (Full vs. None), via the GitHub-org-membership check in Auth & permissions — that's the one place Toky still draws a role boundary itself, since it's the one place it still has a login to check.

## Architectural questions

Considered: a Figma plugin, an Electron app, or a React/web app in the DS repo — see the Direction below for the chosen shape and reasoning. A companion Figma plugin (mirroring the web app's editing UI inside Figma) was also considered for the Figma-side of the sync and explicitly **dropped for now** — see Flow B below.

## Direction: Web App (Vercel) + Figma REST sync, PR-mediated

Chosen shape: the **web app** is the primary and *only* editor (create/rename/move/delete, search, graph), hosted on Vercel, built from the DS's own components. Figma-side changes aren't made through any Toky UI at all — designers edit Figma Variables natively, and a scheduled backend job detects and proposes those changes back. Neither surface writes tokens directly to `main`; everything lands as a PR. GitHub stays the single point of truth by construction, because nothing is "real" until it's merged.

### Why PR-mediated, not direct writes

- Removes the conflict question entirely — there's never a moment where the web app and the Figma sync job race to write the same file, because neither writes the file, they both propose diffs.
- Every change — rename, move, delete, new token, or a Figma-side edit — goes through the same gate: CI (Style Dictionary build, the future `--ds-*` coverage script, visual regression tests for renames) and human review.
- Matches the existing mental model from the Figma Token Sync Plugin docs: "a designer changing a variable in Figma has made a _proposal_, not a fact" — that principle survives even without a plugin in the picture, since it's a property of the PR gate, not of who/what calls it.

### Editor UI — inline-editable table

The core editing surface is the same table used for browsing (name, layer, value/preview, reference target), made **inline-editable** rather than a separate create/rename form — this is the fast path for the bulk of real edits (renaming a token, tweaking a value, re-pointing an alias reference) and mirrors the spreadsheet-like editing Token Studio users already expect:

- Each cell (name, value, reference target) is an `<input>` (or `<select>` for reference target, constrained to existing token names) that activates on click or keyboard focus — no separate "edit mode" toggle per row.
- **New token:** a persistent empty row at the top or bottom of the table (or a keyboard shortcut, e.g. `Cmd/Ctrl+Enter`) — typing into it and committing creates the token, keeping "create" and "edit" the same interaction instead of a separate modal/form.
- **Keyboard support is a requirement, not a nice-to-have** (WCAG 2.2 AA + designer/power-user speed): arrow keys move focus cell-to-cell like a spreadsheet, `Tab`/`Shift+Tab` moves horizontally, `Enter` commits the current cell and moves down, `Esc` reverts the cell's in-progress edit and returns focus without saving, `Delete`/`Backspace` on a selected (non-editing) row prompts row deletion. Every action must also be reachable without a mouse — this is what makes the table usable for fast bulk renames instead of one-token-at-a-time forms.
- Inline validation on commit (duplicate name, invalid reference target, empty value) blocks the edit and shows the error on the cell itself rather than losing the in-progress input.
- All of this still produces the same diff-against-`main` object described below — the table is just the input surface; nothing is written until "Submit" opens the PR (see Flow A below).

### Flow A — Editing in the web app

1. User (dev or designer) edits tokens in the web app UI via the inline-editable table above (rename/move/delete/create), working against a fetched copy of `*.tokens.json` from GitHub (via GitHub API/GraphQL, read with a normal token; the app itself never holds write credentials in the browser).
2. App computes the diff against the current `main` state of the token files.
3. On "Submit", the Next.js backend (API route/Server Action) does the actual write: creates a branch, commits the diff, opens a PR — using the GitHub bot user's repo-scoped PAT (see Auth & permissions below), never a credential held client-side.
4. CI runs on the PR: Style Dictionary build, the `--ds-*` coverage check, visual regression tests (this is where renames get flagged as breaking — a snapshot diff shows exactly which components/CSS vars are affected).
5. Human reviews and merges. Only then do the new token values exist in `main`.
6. Figma sync: a GitHub webhook fires on merge to `main`, and the Next.js backend calls the **Figma REST API (Variables API)** server-to-server to update Figma Variables to match — same "pull from code" direction the current sync plugin already uses, just triggered immediately on merge rather than requiring anyone to have Figma/the plugin open.
7. **Figma id backfill, for tokens that reached `main` without one.** A token created via a dev editing JSON directly (a normal code PR, no Toky involved) has no `$extensions.com.figma.variableId` yet — there's no Figma Variable to link to until one is created. As part of the same merge-triggered sync, the backend finds any merged token still missing that id, creates the corresponding Figma Variable via the REST API, and writes the returned id back into `main` via a small bot-authored PR that auto-merges (metadata-only — no value change, no human judgment involved, so no review gate — but still a PR, not a direct push, so it stays visible in Git history same as every other bot-authored change). This closes the loop for every creation path (web app or raw JSON) without requiring devs to obtain a Figma id before they're allowed to add a token.

**UX note:** the web app never surfaces Git vocabulary ("PR," "merge," "branch") to the designer. It shows review-state language instead — e.g. "Submitted for review" / "Approved and live" — even though a real GitHub PR is what's happening underneath. This keeps the "usable by designers, not just developers" goal intact despite the PR-mediated flow.

### Flow B — Figma → GitHub sync (webhook-triggered, no plugin)

**Decision: no Figma plugin.** Figma's Variables REST API supports both reads and writes, so nothing about the Figma→GitHub direction actually requires code running inside Figma — a backend job can read the same data a plugin would. Dropping the plugin removes an entire codebase (a Figma-sandboxed frontend, its own build/release process, its own bug surface) and removes a second interface designers would otherwise need to learn on top of just... editing variables in Figma, which they already know how to do.

**Decision: trigger on the `LIBRARY_PUBLISH` webhook, not a poll.** Figma's Webhooks V2 API has seven event types; two were considered:

- `FILE_UPDATE` — fires on *any* file change, debounced ~30 minutes after editing stops, and its payload doesn't say *what* changed, just that the file did. Would force a full read-and-diff of every variable on every fire, and doesn't tell you when a designer is actually "done."
- **`LIBRARY_PUBLISH`** (chosen) — fires when someone explicitly clicks **Publish** in Figma's Assets panel, and its payload already contains `created_variables` / `modified_variables` / `deleted_variables` (plus the same for styles/components) — a targeted list of exactly what changed, not "go read everything." This is also a better fit for the "explicit and reviewable, not silent background sync" principle than a timer ever was: clicking Publish *is* the designer's deliberate push action, the same way clicking "Submit" is in the web app — nobody's waiting on a schedule for their change to be noticed.
- **Dependency to confirm:** this only works if the token file is set up as a Figma **team library** (the thing that has a Publish button at all) — flagged here as a provisioning check, the same way the GitHub bot user was, not an assumed-existing fact.

1. Designer (or an external/agency collaborator) changes Figma Variables directly in Figma's native Variables UI, then clicks **Publish** when ready — no plugin, nothing else to open.
2. Figma calls Toky's webhook endpoint (signed with the passcode set at webhook registration, verified on receipt) with the `LIBRARY_PUBLISH` payload's `created_variables`/`modified_variables`/`deleted_variables` lists. The backend fetches full current values for just those variables via the REST API and diffs them against the last-known-synced snapshot — matched by `$extensions.com.figma.variableId`, not by name, same identity rule used everywhere else ("a rename is a rename, not a delete+add").
3. Detected changes (including brand-new variables — see the id-backfill logic in Flow A step 7, which applies symmetrically here since a Figma-created variable already has an id, it just needs a token entry) are built into a DTCG diff and passed straight into the same `propose-change` logic the web app calls — an **internal** call within the same backend, not a second authenticated external caller, since there's no plugin session to authenticate.
4. Same CI gate, same human review, same merge-then-sync-to-Figma loop as Flow A.

**Safety net, not the primary mechanism:** webhook delivery isn't guaranteed (Figma can fail to deliver, the endpoint can be briefly down), so a much lower-frequency reconciliation job (e.g. weekly, or a manual "resync" trigger a dev can run) does a full read-and-diff of every variable, purely to catch drift the webhook missed — not to carry the main flow, which stays webhook-driven.

**Trade-off, stated plainly:** without a plugin there's no login step on the Figma side, so Toky can't attribute a detected change to the specific person who made it in Figma — the PR the sync job opens says "detected via Figma library publish," not a person's name (contrast with Flow A, where the signed-in web app user's identity goes in the PR body). Anyone with Figma edit access to the file can publish, and that's what triggers a PR; per Roles & permissions above, that's an accepted trade — Figma's own file permissions are the access-control boundary for this direction, not a Toky-side check.

### Shared backend surface (sketch only, not designed yet)

**Decision: Next.js, deployed on Vercel.** The web app's editor UI and its backend (API routes / Server Actions, plus the `LIBRARY_PUBLISH` webhook receiver and the low-frequency reconciliation job for Figma sync) live in one Next.js project — no separate service to run. Cold starts are acceptable for this workload (diff tokens, call GitHub API, open PR); heavier validation (Style Dictionary build, `--ds-*` coverage, visual regression) stays in GitHub Actions CI on the PR itself, not in the Next.js backend. GitHub App credentials live server-side as Vercel env vars, never reach the browser.

This backend exists only to open PRs — read access to tokens can go straight to GitHub from the client. With no plugin, the web app is the **only external caller** of the write path; the Figma sync job is an internal, scheduled caller of the same underlying logic, not a second frontend needing its own auth story. The service exposes something like:

- read current tokens (or the web app just fetches `*.tokens.json` from GitHub directly for reads — only writes need to be mediated)
- propose-change(diff, description) → opens branch + PR, returns PR URL
- optionally: PR status lookup, so the web app can show "your change is in PR #123, pending review"

This keeps GitHub write credentials in exactly one place.

### Conflict resolution

Because neither surface writes directly to `main` (see Why PR-mediated, not direct writes), the classic "two people editing the same file" conflict is mostly designed away already — the remaining case is two proposals touching the same token before either has merged. Handled entirely inside `propose-change`, so it's identical whether the caller is the web app or the Figma sync job (webhook- or reconciliation-triggered):

- **Optimistic concurrency at Submit time.** Right before opening a branch/commit/PR, the backend refetches the current `main` value of every token touched by the diff and compares it against the "before" value the caller's diff was computed from (the snapshot fetched when editing started). If any touched token has moved since, the request is rejected — no PR opens — with a "this changed since you started editing, refresh and try again" response, instead of silently opening a PR that would clobber an already-merged change.
- **New-token creation is the same check, just against absence.** A token created in Figma or in the web app produces a purely additive diff, so its "before" state is "doesn't exist on `main` yet." Two people independently creating a token of the same name hits the same value-comparison check — the second Submit sees the name already taken and is rejected, rather than opening a duplicate/conflicting PR.
- **Visibility, not locking, for still-open PRs.** Toky doesn't lock a token while a PR referencing it is pending — two open PRs touching the same token can coexist. Instead, the PR-status lookup already sketched above is surfaced per-token in both the web app table and the plugin as a "pending change" indicator, so a second editor sees "this token has PR #123 open" *before* they start editing and can coordinate instead of stacking a conflicting proposal blind. If they proceed anyway, the optimistic check is the actual backstop: it catches the second PR at whatever point it's re-diffed against `main`, or, if both somehow merge back-to-back without a re-check in between, it becomes a normal review-time conflict a human reviewer sees (two PRs on the same token), not a silent overwrite.
- **Brand sparse-diff edge case:** since editing a Base token can change what counts as an "override" in every brand file (see Multi-brand support), the optimistic check compares against the *resolved* value the diff's author actually saw (Base or brand-override, whichever was active) rather than just the raw on-disk brand file — otherwise a Base change merged in the interim could silently flip a pending brand-diff's meaning without tripping the check.
- **Figma-side reads get the equivalent check for free** (Flow B step 2 already diffs against the last-known-synced snapshot by `variableId` on every scheduled run) — if a code-side change merged since the last run, that shows up as part of the normal diff the next time the job fires, rather than the sync job blindly pushing over it.

This also closes the pending-PR visibility question raised earlier: it's now a decision (the per-token "pending change" indicator above), not an open question.

#### Auth & permissions

**Decision: create a dedicated GitHub bot user with a scoped PAT**, rather than standing up a new GitHub App. No such bot user exists yet — a shared mailbox address is available to register it, so this is a provisioning task, not an assumed-existing asset. Until it's set up, the backend uses a personal access token as an interim credential. Concretely:

- The bot user's fine-grained PAT is scoped to just this repo, with Contents (read/write) and Pull requests (write) permissions — no org-wide or other-repo access.
- The Next.js backend holds this PAT as a Vercel env var (server-side only, never reaches the browser).
- Because writes are always via PR (never direct pushes to `main`), the bot user doesn't need merge or branch-protection-bypass rights — normal branch protection + required reviews still apply to bot-opened PRs like any other.
- Tradeoff vs. a GitHub App: simpler to set up (one token, no App registration/installation), but the PAT is long-lived — needs rotation policy and secure storage discipline, and (unlike an App's auto-expiring installation tokens) a leaked PAT stays valid until manually revoked. Acceptable given it's already an existing, presumably managed credential rather than a new one we're introducing.
- The existing Figma bot user's token is used the same way for both directions on the Figma side — the "pull from code" write into Figma Variables after merge (Flow A step 6), and the scheduled read for the "push from Figma" sync (Flow B step 2) — same credential, held server-side, no separate Figma auth story since there's no plugin runtime to keep it out of.
- The bot's own commit identity won't say _who_ triggered a change — for web-app-originated changes, the PR title/description/body should still capture the signed-in user who submitted it, for review context. **For Figma-originated changes, there is no equivalent identity to capture** (see the attribution trade-off in Flow B) — the PR body says the change was detected via a Figma library publish, not who made it in Figma.
- **Decision: end-user auth (who's allowed to use the app / trigger `propose-change`) lives in the Next.js app itself, via Auth.js (NextAuth) with the built-in GitHub provider, deployed on Vercel** — no separate auth service, and no separate identity provider decision either. This fits the existing shape twice over: the web app is already a Next.js project on Vercel, and GitHub is already the system every user needs an account in (it's the source of truth these changes land in), so GitHub OAuth doesn't introduce a new identity system — it reuses the one this whole tool already revolves around.
  - **Authorization, not just authentication:** signing in with GitHub only proves *who* someone is — access still needs a check that they're allowed to propose changes here, e.g. verifying org membership or a specific team via the GitHub API (`GET /orgs/{org}/members/{username}` or a team-membership check) during/after sign-in, not just "any GitHub account may sign in." This runs server-side using the bot PAT (or a token with read access to org membership), not the user's own OAuth token.
  - Session/JWT checks gate both the editor UI routes and the `propose-change` API route itself (not just hiding the UI — the endpoint must reject an unauthenticated or unauthorized caller regardless of who's asking).
  - **No plugin means no separate Figma-side identity check to design or maintain** — the Figma sync job authenticates to Figma with the bot token (not a per-user credential) and to GitHub the same way the rest of the backend does; there's no external caller to authorize on that path at all, since it's internal to the same backend. The access-control question for that direction lives entirely in Figma's own file/project permissions, per Roles & permissions above, not in Auth.js.

### Graph view — token usage & inheritance

Web app view: each token renders as a **box** (name + swatch/value preview), with **lines/vectors** drawn between boxes to show relationships. Two edge types, from two different data sources:

- **Inheritance edges** (Global → Alias → Component): derived statically by parsing `$value` references (`{color.primary}` etc.) directly out of the token JSON — no extra tooling, this is exactly what DTCG already encodes.
- **Usage edges** (token → consuming component/CSS): derived by scanning compiled CSS/component source for `var(--ds-x)` — the same scan the planned `--ds-*` coverage CI script needs, so build it once and feed both.

Both graphs are generated as a build artifact (small JSON: nodes = tokens, edges = {from, to, type}) as part of the existing Style Dictionary build, not computed live in the browser — keeps the web app a thin renderer over data that's already correct as of the last merge to `main`. The web app fetches that JSON and lays it out with an existing lightweight DAG/graph-layout library (not hand-rolled) — clicking a box could filter to just its neighbors (direct parents/children or direct consumers) to keep the view usable once the token count gets large, rather than always rendering the full graph.

### Multi-brand support

Toky adopts the existing token-side model as-is rather than designing a new one — see [ADR-0002](packages/tokens/docs/adr/0002-brand-modes-not-collections.md) (brands are Figma **modes** on one Variable Collection, not separate collections) and the current `Base.tokens.json` + sparse `<Brand>.tokens.json` override file structure (e.g. `Tcs.tokens.json`) already used by the Style Dictionary build (`config.brand.ts`'s `computeTokenDiff`).

- **Storage stays sparse:** a brand file only contains tokens whose `$value` actually differs from `Base` — this is a build-time diff already, not something Toky introduces. The editor must preserve this: editing a token under a brand only writes to that brand's file if the value diverges from Base; if a designer sets it back to match Base, it drops out of the brand file again (mirrors `computeTokenDiff`'s comparison-by-value, not a stored "is this an override" flag).
- **Editor table:** a **brand selector** (not one column per brand — brand count is open-ended and most tokens don't override) scopes the whole table to one brand's resolved view at a time; a token overridden in the active brand is visually marked (e.g. a small badge/dot) so it's obvious at a glance which rows diverge from Base without showing every brand simultaneously. Editing while a brand is selected writes to that brand's override file; editing while "Base" is selected writes to `Base.tokens.json` (and, per the sparse-diff rule, potentially affects what still counts as an override in every brand).
- **Figma side:** one Variable Collection, one mode per brand (Base included) — the Figma sync job's read (Flow B step 2) reads all modes of a variable in one REST call, and its write path pushes only the modes that actually changed, using the same value-comparison-not-stored-flag approach as the code side, so the two "is this an override" computations (Figma mode vs. Base mode, brand file vs. Base file) stay in sync by construction rather than by convention.
- **Figma id metadata** (`$extensions.com.figma.variableId`) is per-token, not per-brand — a brand override is a different mode-value on the *same* Figma variable, so it reuses the base token's id rather than minting a new one.
- Adding a brand end-to-end = a new `<Brand>.tokens.json` file + a new Figma mode on the collection; no schema or collection restructuring on either side, consistent with the "adding a brand = adding a mode" consequence in ADR-0002.

### Meta fields — Figma id, sync timestamps, last update

These three don't all belong in the same place:

- **Figma id** (`$extensions.com.figma.variableId`) is committed in the token JSON — it's the identity key the whole sync design depends on (see Flow B), and it only changes on create/re-link, so it won't cause diff noise.
- **Last update** is not a stored field — it's just the commit/merge date of that token in Git history, read on demand via `git log`/GitHub API. Storing a duplicate value risks drift from the real history.
- **Last figma sync** lives outside GitHub entirely (e.g. a small KV store the Next.js backend writes to — the same store Flow B's scheduled job already needs for its last-known-synced snapshot), not in the committed token file. It's operational metadata about the sync process, not a design decision — if it lived in the token file, every routine sync would touch every token's file just to bump a timestamp, creating noisy diffs/commits with no real value change.

Tradeoff: "last update" and "last figma sync" now come from two different systems instead of one field, but GitHub's history stays meaningful — only real value/structure changes show up as commits.

## MVP

Smallest useful slice, deliberately read-only — proves the token data pipeline and gets something in front of people before tackling PR-mediated writes or the graph view. This slice is a sequencing choice (cheapest way to get something real in front of people and prove the data-parsing/rendering layer), not a risk-reduction one — it doesn't validate the riskier PR-write/bot-auth/Figma-sync path, which should be spiked separately if that needs de-risking before this MVP ships.

- **Location:** `apps/toky` — a Next.js app in the monorepo, next to `packages/*` and `libs/*`.
  - Note: `pnpm-workspace.yaml` currently only globs `packages/*`, `libs/*`, `docs` — needs `apps/*` added when this is scaffolded.
- **Hosting:** a separate Vercel project pointed at this same repo, Root Directory set to `apps/toky`, with its own build settings/env vars/domain. The existing root `vercel.json` (which deploys `docs/dist`, e.g. Storybook) stays untouched — this is not the same deployment.
- **Data source:** fetch `*.tokens.json` from GitHub via the GitHub API (not read off local disk), authenticated server-side with the bot PAT described in Auth & permissions (or the interim personal token, until the bot user exists) — needed even for reads, since unauthenticated GitHub API calls are rate-limited (60/hour per IP) and unsuitable for a deployed app. This is _not_ the "auth" listed as out of scope below — that refers to end-user auth (who's allowed to use the app), which stays deferred; this is just a server-held read credential.
- **UI stack:** plain vanilla HTML — no DS components, no DS CSS tokens/variables either. UI/visual polish (including dogfooding the DS) is a deliberate later pass; the MVP's job is to prove the data pipeline works, not to look good. WCAG 2.2 AA still applies even to this plain-HTML version (semantic `<table>`, `<th scope>`, labelled search `<input>`, visible focus states) — skipping the DS is a shortcut on component reuse/branding, not on accessibility.
- **Testing:** Vitest tests for the token-parsing/flattening logic only (Global/Alias/Component flattening, alias-reference resolution) — that's the part that can silently break. No Playwright/e2e or UI-level tests yet, since the table/search UI will be rebuilt in the later polish pass.
- **Scope:**
  - Read all tokens from `packages/tokens` (Global/Alias/Component), parsed into a flat list.
  - Table view: one row per token — name, layer (Global/Alias/Component), value/preview, and reference target if it's an alias.
  - Search/filter the table by name.
- **Explicitly out of scope for this slice:** editing (create/rename/move/delete), the PR-mediated write flow, Figma sync (REST-only, no plugin — see Direction), graph view, end-user auth, DS component/token usage. Those build on top of this once the read path is proven.

## MVP Implementation Plan

Phased so each phase ends in something runnable/verifiable, not a stack of dependent half-finished pieces.

### Phase 0 — Workspace scaffolding

- Add `apps/*` to the `pnpm-workspace.yaml` glob.
- Scaffold `apps/toky` as a minimal Next.js app (App Router), name it `toky` in `package.json`, wire it into root `pnpm build`/`pnpm lint`/`pnpm test` via Turbo the same way other packages are.
- No token logic yet — goal is `pnpm --filter toky dev` serves an empty page, and root `pnpm build`/`pnpm lint` pick it up without breaking.

### Phase 1 — Token data pipeline (parsing/flattening)

- Implement the GitHub API read: fetch `*.tokens.json` files from `packages/tokens` server-side, authenticated with the bot PAT (or interim personal token) held as an env var — never exposed to the client.
- Implement flattening logic: walk Global → Alias → Component, resolve `$value` alias references (`{color.primary}` etc.) to their target, and produce a flat list of `{ name, layer, value, resolvedValue, referenceTarget? }`.
- Vitest coverage for the flattening/resolution logic specifically — this is the part called out as able to silently break: correct layer tagging, correct alias-reference resolution, and behavior on a broken/missing reference.
- No UI yet — this phase is done when the pipeline is a tested pure function/module callable from a script or test, independent of any route.

### Phase 2 — Table view

- Server-rendered route that calls the Phase 1 pipeline and renders one row per token: name, layer, value/preview, reference target if alias.
- Plain HTML only — semantic `<table>`, `<th scope="col">`, no DS components/CSS variables.
- Manual check against a known slice of `packages/tokens` output to confirm rows match reality (no automated UI test yet, per the MVP's explicit test scope).

### Phase 3 — Search/filter by name

- Add a labelled `<input>` that filters the rendered table by token name.
- Decide client vs. server filtering (client-side filter over the already-fetched flat list is simplest given the dataset size; avoids a second GitHub API round-trip per keystroke).
- Verify keyboard operability and visible focus states (WCAG 2.2 AA) on both the input and any dynamically shown/hidden rows.

### Phase 4 — Deployment

- Create the separate Vercel project pointed at this repo, Root Directory `apps/toky`, its own env vars (bot PAT) and domain — confirm the existing root `vercel.json` (docs/Storybook) is untouched.
- Confirm the deployed app can read live GitHub API data (not a local checkout) and respects the unauthenticated rate-limit concern (i.e., the PAT is actually wired up in the Vercel env, not just locally).

### Phase 5 — Accessibility & hardening pass

- Full manual WCAG 2.2 AA pass on the shipped table + search: semantic structure, focus order, screen-reader labelling of the search input and table.
- Confirm behavior on pipeline edge cases surfaced in Phase 1 tests actually renders sanely in the UI (e.g., an unresolved alias reference doesn't crash the row, just shows something legible).
- Explicitly re-confirm out-of-scope items (editing, PR flow, Figma sync, graph, end-user auth, DS usage) are untouched — this phase closes out the MVP, it doesn't creep into them.

**Sequencing note:** Phases 0–1 could in principle run in parallel with someone else scaffolding Phase 4's Vercel project, but 2 and 3 are strictly sequential on 1, and 5 is strictly last. Phase 5 closes out the read-only MVP — Phases 6+ below build the editing/multi-brand/Figma layers on top of it, each shipped and verifiable on its own rather than as one big-bang release.

## Post-MVP Implementation Plan

Builds on the proven read path (Phases 0–5) in the order the design docs above depend on each other: writes need a PR-opening backend before the table can be made editable; multi-brand needs the editable table before a brand selector means anything; the Figma sync job needs the shared `propose-change` backend and multi-brand's brand-aware diffing already in place, since it must know which Figma mode maps to which token file from day one.

### Phase 6 — PR-write backend + inline-editable table

- **Auth prerequisites (both gate this phase):**
  - Provision the dedicated GitHub bot user + fine-grained PAT (Contents read/write, Pull requests write, scoped to this repo) per Auth & permissions above; until then, use an interim personal token server-side.
  - Wire up Auth.js (NextAuth) with the GitHub provider in the Next.js app per the Auth & permissions decision above, including the org/team-membership authorization check (not just "signed in with GitHub"), so both the editor UI routes and the `propose-change` route require an authenticated, authorized session — writes should never ship gated by UI-hiding alone.
- Backend: Next.js API route/Server Action implementing `propose-change(diff, description)` — creates a branch, commits the diff, opens a PR, returns the PR URL. This is the single write path; nothing else touches GitHub write credentials. The route checks the caller's session before doing anything else.
- **Conflict check:** before branching/committing, `propose-change` refetches each touched token's current `main` value and compares it to the diff's recorded "before" value (or "doesn't exist yet" for a new token); a mismatch rejects the request with no PR opened, per Conflict resolution above. Also implement the PR-status lookup and surface it as a per-token "pending change" indicator in the table.
- Table: make Phase 2's table inline-editable per the Editor UI section — per-cell `<input>`/`<select>`, a persistent new-token row, full keyboard support (arrow-key cell navigation, `Tab`/`Shift+Tab`, `Enter` to commit, `Esc` to cancel, `Delete` to remove a selected row), inline validation on commit (duplicate name, invalid reference target, empty value).
- "Submit" computes the diff against `main` and calls `propose-change`; UI shows review-state language ("Submitted for review"), never Git vocabulary, per the UX note in Flow A. A rejected (conflicting) submit surfaces as a clear "this changed, please refresh" message, not a generic error.
- Vitest: diff computation, validation rules, the conflict-check comparison (stale value, stale absence, brand-resolved-value case). Playwright: the keyboard-navigation paths specifically (arrow nav between cells, commit/cancel, new-row creation) — this is the point the MVP's "no UI test yet" deferral was waiting for.
- Manual WCAG check on the editable state: focus doesn't get lost when a cell swaps between static text and `<input>`, error messages on failed validation are announced.

### Phase 7 — Multi-brand support

- Extend the Phase 1 flattening pipeline to load `Base.tokens.json` plus every `<Brand>.tokens.json` override file, and to resolve a token's value for a given brand (Base value, or the brand's override if one exists) — mirrors `computeTokenDiff` in `packages/tokens/src/config.brand.ts`, reused or ported rather than reimplemented from scratch.
- Add the brand selector to the table (scopes the view to one brand's resolved values) and the per-row override badge for tokens that diverge from Base in the active brand, per the Multi-brand support section above.
- Editing while a brand is selected writes to that brand's override file only if the new value differs from Base's value for that token; setting it back to match Base removes it from the brand file (sparse-diff behavior, verified by test, not just by inspection).
- Vitest: brand resolution (Base vs. override), sparse-diff correctness on write (add/remove override), badge derivation.
- Manual check: creating a brand-new brand file end-to-end (new `<Brand>.tokens.json`) and confirming it shows up in the selector with no code changes beyond the file itself.

### Phase 8 — Figma webhook sync (no plugin)

Notably lighter than a plugin-based approach would have been: no Figma-sandboxed frontend to build, no plugin release/distribution process, and the diff/identity-matching logic is fully unit-testable server-side (nothing here needs Figma's plugin runtime, unlike a plugin UI would).

- **Prerequisite check:** confirm the token Figma file is (or can be) set up as a team library with Publish enabled — `LIBRARY_PUBLISH` doesn't fire otherwise. This gates the whole phase; if it's not feasible, fall back to the polling design (Flow B's rejected alternative) instead.
- Register the `LIBRARY_PUBLISH` webhook against the file/team, with a passcode Toky verifies on every incoming request.
- Next.js API route (webhook receiver): verify the passcode, read `created_variables`/`modified_variables`/`deleted_variables` from the payload, fetch full current values for just those variables via the Figma REST API with the bot token.
- Diff the result against the last-known-synced snapshot by `$extensions.com.figma.variableId`, brand-aware (a mode-value change is a brand-level change, not a whole-token change) — reuses the same identity/diff approach as Phase 7's brand resolution.
- Detected changes (including brand-new Figma variables with no matching token entry yet) are built into a DTCG diff and passed directly into the same `propose-change` logic from Phase 6 — an internal call, not a new authenticated endpoint, since there's no external plugin caller to accept requests from.
- Reuse Phase 6's conflict check unchanged — protects against a code-side change landing between the webhook firing and the PR being opened, or two publishes close together.
- **Reconciliation job:** a low-frequency (e.g. weekly) scheduled job doing a full variable read-and-diff against the same snapshot, as a safety net for missed webhook deliveries — not the primary path, so it can be simple and infrequent.
- PR body states the change was detected via a Figma library publish (no per-person attribution — see the trade-off called out in Flow B and Auth & permissions).
- After merge: extend the existing merge-triggered Figma sync (Flow A step 6) to push resolved values into every mode (Base + each brand), not just one — this is where multi-brand and the Figma sync job's write side actually meet.
- Testing: Vitest for the diff/identity-matching logic and webhook-payload parsing against fixture Figma API responses (fully testable, no Figma runtime involved); manual verification against a real Figma file — trigger a real Publish and confirm a PR opens — before relying on it in practice.

### Phase 9 — Graph view (usage & inheritance)

- Extend the Style Dictionary build to emit the graph JSON artifact (nodes = tokens, edges = `{from, to, type}`) described in the Graph view section above, rather than computing it live in the browser.
- **Inheritance edges:** derived by parsing `$value` references (`{color.primary}` etc.) out of the token JSON — reuse the alias-resolution logic already built and tested in Phase 1, rather than a second parser.
- **Usage edges:** scan compiled CSS/component source for `var(--ds-x)` — build this scan once and share it with the (separately scoped) `--ds-*` coverage CI script mentioned in Requirements, rather than two implementations of the same scan.
- **Brand note:** graph structure (which token references/uses which) doesn't vary by brand — only resolved *values* do — so the graph itself is brand-agnostic and doesn't need to wait on or integrate with Phase 7's brand selector; a token's node can still show the active brand's resolved value as a label if the table's brand selector state is passed through, but that's a display detail, not a structural dependency.
- Frontend: fetch the graph JSON and lay it out with an existing lightweight DAG/graph-layout library (not hand-rolled); clicking a node filters to its direct neighbors (parents/children or consumers) to keep the view usable as token count grows.
- Accessibility: a visual node-and-edge graph is inherently hard to make screen-reader- and keyboard-navigable — plan for a parallel accessible fallback (e.g. a keyboard-operable list/tree view of "this token's parents/children/consumers" alongside the visual graph) rather than treating the graph as the only way to see this data, to keep WCAG 2.2 AA intact.
- Vitest: edge-generation correctness (inheritance and usage) using known fixtures, same rigor as Phase 1's alias-resolution tests. Manual check of the rendered graph and neighbor-filter interaction, since layout/rendering itself isn't meaningfully unit-testable.

**Sequencing note (post-MVP):** 6 must land before 7 or 8, since both depend on the `propose-change` backend and its conflict check. 7 must land before 8, since the sync job's diffing needs to already be brand-aware before it can decide which Figma mode maps to which token file. 9 only depends on Phase 1's parsing/alias-resolution logic, so it can run in parallel with 6–8 rather than waiting behind them. End-user auth remains open/unscheduled — not phased here because it isn't blocking any of the above.
