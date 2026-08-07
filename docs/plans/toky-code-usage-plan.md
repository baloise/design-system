# Toky Code-Usage Indicator — Implementation Plan

Status: proposed · Owner: apps/toky · Related: `apps/toky/src/tokens/graph.ts` (existing token-reference count)

## 1. Purpose

In the Toky token editor's table (base/non-brand view only), tokens already
show how many *other tokens* reference them (`countDirectReferences` in
`apps/toky/src/tokens/graph.ts`). That signal doesn't answer the real
question: is this token actually **used in shipped code** — as a CSS custom
property (`var(--ds-...)`) inside `packages/core`'s component styles or
`packages/css`? A token can be heavily aliased by other tokens yet never
reach real CSS, or vice versa. The goal is to surface a second, independent
signal so dead tokens (zero token-references **and** zero code usages) are
easy to spot.

## 2. Governing decisions

| Decision | Resolution |
| --- | --- |
| Code scope | **Compiled CSS, not `.scss` source.** `packages/core/dist/collection/**/*.css` (per-component, mirrors `src`'s structure) + `packages/css/dist/css/{base,components,utilities}.css` (pre-bundled; `design-system(.local)(.min).css` are the same three concatenated, so scanning them too would only duplicate locations). Source-scanning was tried first and undercounted badly — SCSS `@each`/`@for` loops generate variable names via interpolation, so the literal `var(--ds-...)` text often never appears in source at all, only in the compiled output once the loop is expanded. No TSX inline styles, no Storybook/docs/test files — only what actually ships. |
| Token scope | **Base tokens only** (Global/Alias/Component layers from `Base.tokens.json`), matching the fact that the "Used" column only renders in base (non-brand) view. Brand tokens are out of scope entirely. |
| Name mapping | Reuse style-dictionary's real transform output — read `packages/tokens/dist/docs/base.tokens.json`, which retains both the original `path` (matches Toky's `FlatToken.path`) and the transformed CSS var `name` per token. Do **not** reimplement the `ds/css/name` transform's edge cases (t-shirt-size fix, `-component` suffix strip, emoji stripping) in Toky. |
| Freshness | Computed offline, not live. A generator script rebuilds `packages/tokens`, `packages/core`, and `packages/css` itself first (so both the token→name mapping and the compiled CSS being scanned are never stale), then scans and writes a JSON artifact that's **committed to git**. Toky only ever reads this static file — no filesystem scanning, no build-triggering, at request time. |
| Artifact location | `apps/toky/src/tokens/code-usage.generated.json` — co-located with `graph.ts`/`edit.ts` (Toky's only consumer); `.generated.json` signals "don't hand-edit." |
| Artifact shape | Flat map keyed by `path.join('.')` (same key convention as `graph.ts`) → `{ count: number, locations: { package: 'core' \| 'css', file: string }[] }`. `count === locations.length` — distinct files the var appears in, not raw occurrence count. |
| Script location | Repo-root `scripts/generate-token-usage.mjs`, same tier as `scripts/build-docs.mjs`. New root pnpm script: `pnpm tokens:usage`. |
| Relationship to reference count | Two **separate** signals in the UI, not merged — a token-reference count and a code-usage count answer different questions and combining them would hide the exact "aliased but never shipped" case this feature exists to catch. |
| Missing data | Not applicable — since scope is Base tokens only and the script always rebuilds before scanning, every Base token in a freshly generated artifact has an entry (possibly `count: 0`). Stale-vs-live drift (a token renamed since the last commit of the artifact) is an accepted, undetected blind spot for now. |
| Dynamic references | SCSS interpolation (`var(--#{$name})`) is a known blind spot — literal-string matching only. No attempt to resolve computed variable names. |
| Responsive tokens | Mobile/Tablet/Desktop siblings (e.g. `Alias/Text/Size/3XL/{Mobile,Tablet,Desktop}`) get a custom style-dictionary format (`packages/tokens/src/formatter.ts`, `ds/css/variables-responsive`) that never emits a Tablet or Desktop token's own suffixed name in compiled CSS — it collapses all three into one shared `--ds-...-device` property, overridden per breakpoint. So the generator also searches each responsive token's `-device` variant; a single `-device` reference anywhere marks **all three** siblings as used, since that one variable is fed by all of them depending on viewport. |
| Out of scope (for now) | No staleness warning/banner, no CI check that the artifact is up to date, no auto-rebuild triggered from Toky's UI or server. |

## 3. Data model

`apps/toky/src/tokens/code-usage.generated.json`:

```json
{
  "🌐 Global.🌈 Color.White": {
    "count": 2,
    "locations": [
      { "package": "core", "file": "components/button/button.host.css" },
      { "package": "css", "file": "utilities.css" }
    ]
  },
  "🔗 Alias.Color.SurfaceDanger": {
    "count": 0,
    "locations": []
  }
}
```

## 4. Generator script (`scripts/generate-token-usage.mjs`)

1. Run `pnpm tokens`, `pnpm core`, and `pnpm css` (spawn, inherit stdio) to
   rebuild all three, guaranteeing `packages/tokens/dist/docs/base.tokens.json`
   and the compiled CSS being scanned are both current.
2. Recursively walk that JSON's `🌐 Global` / `🔗 Alias` / `🧩 Component`
   subtrees, collecting `{ path: string[], names: string[] }` for every leaf
   token (`path.join('.')` as the map key). Usually `names` is just the
   token's own transformed CSS var name (e.g. `ds-global-color-white`); for a
   token whose name ends `-mobile`/`-tablet`/`-desktop`, `names` also
   includes the shared `-device` variant (see "Responsive tokens" above).
3. Glob `packages/core/dist/collection/**/*.css` and
   `packages/css/dist/css/{base,components,utilities}.css`.
4. For each token name, scan every file for a literal
   `var(--<name>` occurrence (regex, tolerant of a trailing fallback:
   `,`/`)`); record every distinct file that matches as a `location`
   (`package` inferred from which glob root matched). Scanning compiled
   output means `@each`/`@for`-generated variable references are already
   expanded into literal text, unlike the `.scss` source.
5. Write the resulting map to
   `apps/toky/src/tokens/code-usage.generated.json` (stable key order,
   2-space indent, trailing newline — consistent with other generated
   JSON in the repo).
6. Add `pnpm tokens:usage` to root `package.json` scripts, invoking this
   script via `node scripts/generate-token-usage.mjs`.

## 5. Toky UI changes (`apps/toky/app/token-editor.tsx`)

1. Import `code-usage.generated.json` and build a lookup by
   `token.path.join('.')`, mirroring the existing `referenceCounts` memo
   pattern (`useMemo` isn't needed for a static import, but a `Map` built
   once at module scope keeps lookups O(1)).
2. In the existing "Used" column (`!selectedBrand` only), add a second
   badge next to the token-reference button:
   - Zero or missing code usage → render nothing (empty cell segment),
     matching the existing "no uses → empty" convention for the
     reference-count badge.
   - Nonzero → a small clickable badge (icon + count) that opens a
     `Popover` listing `locations` (`package` + `file`), sorted by
     package then path. No dialog, no graph — this is display-only.
3. A token reads as fully dead in the UI when **both** the
   reference-count badge and the code-usage badge are absent.

## 6. Testing

- Unit test the generator's pure logic (name→pattern matching, file
  classification into `core`/`css`) in isolation — extract the scan
  function so it's testable without spawning `pnpm tokens` or touching
  the real filesystem (accept an in-memory list of `{ path, content }`
  file stand-ins).
- No new Vitest coverage needed in `apps/toky` beyond a small test that
  the lookup/rendering helper treats a missing key the same as
  `{ count: 0 }`.

## 7. Rollout

- One-time: run `pnpm tokens:usage` and commit the resulting
  `code-usage.generated.json` alongside the UI change.
- Ongoing: whoever changes token names or `.scss` var usage re-runs
  `pnpm tokens:usage` and commits the diff — same manual-regeneration
  model as other generated artifacts in this repo, no automation added
  yet.
