# Decompose box-shadow tokens into Figma-pushable scalar parts — Implementation Plan

## Context

Figma's Variables REST API only supports scalar types (COLOR/FLOAT/STRING/BOOLEAN) — there's no composite "shadow" value, and Effect Styles (which do support shadows) can't be created or bound via REST at all, only through the Plugin API running inside Figma (confirmed against Figma's docs this session). The practical path discussed: decompose each shadow into separate scalar tokens (X, Y, Blur, Spread, Color), push those as ordinary Variables through the existing sync, and a designer does a one-time manual binding of an Effect Style's fields to those variables inside Figma.

Investigation this session found `packages/tokens/tokens/Base.tokens.json` has **no existing DTCG `shadow` type** — shadows are today plain `$type: "string"` full CSS values under `🌐 Global.🗂️ Elevation.Shadow.{0..4}` (`0` = `"none"`, `1`-`4` = real box-shadows like `"0 2px 5px 1px rgba(0, 7, 57, 0.12)"`), referenced by path (`{🌐 Global.🗂️ Elevation.Shadow.3}`) from the Alias layer (`🔗 Alias.🌓 Shadow.Box.*`) and ~12 component-level tokens, and ultimately consumed by ~19 `box-shadow: var(--_x-shadow)` call sites in `packages/core`.

Turning `Shadow.N` itself into a group of 5 children isn't viable: a DTCG node can't be both a leaf (has `$value`) and a parent (has children) at once, and every existing reference to `Shadow.N` needs it to keep resolving as a leaf. Recomposing the combined value from parts at Style Dictionary *format* time doesn't fix this either — reference resolution happens earlier in the pipeline than custom formats run, so other tokens' `{...Shadow.N}` references wouldn't see a format-computed value.

**Decision (confirmed with user):** keep `Shadow.N` exactly as-is — untouched source of truth for CSS output and all existing references, zero changes to `packages/core` or the Alias/Component layers. Add a **parallel** `ShadowParts.N` group per shadow, existing solely so its 5 scalar values can round-trip as independent Figma Variables. A build-time check parses `Shadow.N`'s string and asserts it reconstructs from `ShadowParts.N`, so the two can't silently drift. Scope is the box-shadow family only (`🌐 Global.🗂️ Elevation.Shadow.1-4`) — `0` (`"none"`) has nothing to decompose, and `🌐 Global.🔤 Font.Shadow.*` (text-shadows, some multi-layer) is explicitly out of scope for this pass.

## Files to change

**`packages/tokens/src/shadow-value.ts`** (new) — mirrors the existing `css-value.ts` pattern (which mirrors `ds/color/rgba`/`ds/size/rem` for Toky's live preview — see ADR-0021):
```ts
export interface ShadowParts { x: number; y: number; blur: number; spread: number; color: ColorValue }
export function parseBoxShadow(css: string): ShadowParts | null   // null for "none" or unparseable
export function boxShadowToCss(parts: ShadowParts): string        // inverse, used by the drift check
```
- Regex over `"<x> <y> <blur> <spread> <color>"` (numbers with optional `px` suffix — source data is inconsistent, e.g. `"0 2px 5px 1px rgba(...)"` has a bare `0`) and an `rgba(r, g, b, a)` or `#hex` color tail.
- Color parsing/formatting reuses the exact same rgba-string shape `colorValueToCss` in `css-value.ts:8-24` already produces, so `boxShadowToCss(parseBoxShadow(s)) === s` round-trips byte-for-byte for all 4 existing shadows — verify this before writing the migration values into JSON.

**`packages/tokens/tokens/Base.tokens.json`** — add, as a sibling of the existing `Shadow` group under `🌐 Global.🗂️ Elevation`:
```jsonc
"ShadowParts": {
  "1": { "X": {"$type":"number","$value":0}, "Y": {"$type":"number","$value":2}, "Blur": {"$type":"number","$value":5}, "Spread": {"$type":"number","$value":1}, "Color": {"$type":"color","$value": {...} } },
  "2": { ... }, "3": { ... }, "4": { ... }
}
```
- Compute the exact values by running `parseBoxShadow` against each of the 4 real `Shadow.N` strings (don't hand-transcribe — avoids arithmetic/rounding mistakes) — the current values from this session's inspection are `1: 0 2px 5px 1px rgba(0,7,57,0.12)`, `2: 0 4px 4px 0 rgba(0,7,57,0.15)`, `3: 0 0 10px 0 rgba(0,7,57,0.15)`, `4: 0 0 30px 0 rgba(0,7,57,0.15)`.
- No `$extensions` on the new leaves — they're brand-new tokens with no Figma variableId yet; the existing `.github/workflows/figma-sync.yml` run (Pull (from Code), per `packages/tokens/CONTEXT.md`'s glossary) creates the Variables and backfills the ids automatically on merge, same as any other newly-created token (ADR-0017), no manual step needed here.
- `X`/`Y`/`Blur`/`Spread` as plain `number` (unitless px, matching every other size token in this schema — `ds/size/rem`/`numberValueToCssSize` in `css-value.ts:56-70` already knows how to convert a bare number to rem/px, though these particular tokens are never fed through that path since nothing references them for CSS output).

**`packages/tokens/src/index.ts`** — add a drift check right after the banner (before `StyleDictionaryBase.buildAllPlatforms()`, `index.ts:22-23`): read `tokens/Base.tokens.json`, for each of `Shadow.1`-`Shadow.4` call `boxShadowToCss(parseBoxShadow(shadowValue))` (using the corresponding `ShadowParts.N`, not re-parsing) and throw a clear error (failing the build, which CI already gates on) if it doesn't match `Shadow.N`'s literal string exactly. No new test framework needed — `packages/tokens` has no vitest setup today (`build` is just `tsc && node dist/out-tsc`), so this rides the existing "the build must succeed" gate rather than introducing one.

**`docs/adr/0022-parallel-shadow-parts-for-figma-variables.md`** (new) — records the decision and why the "make parts authoritative" alternative was rejected (DTCG leaf/group exclusivity + reference-resolution timing), `Package: packages/tokens`, per this repo's single-sequential-log ADR convention (`CONTEXT-MAP.md`).

**`packages/tokens/CONTEXT.md`** — one short addition to the token-categories section noting `ShadowParts` exists purely for Figma Variable round-tripping, is not referenced by anything else in the tree, and must stay in sync with `Shadow.N` (enforced at build time, see ADR-0022).

## Explicitly not touched

- `packages/core` — zero changes; `Shadow.N`'s CSS output is byte-identical, `ShadowParts.N` isn't referenced by anything Style Dictionary emits for `packages/core` to consume.
- `apps/toky` — no code changes needed. `ShadowParts.N`'s children are ordinary `number`/`color` leaves, already fully handled by the existing Create dialog, value editors, `figma-map.ts`'s type mapping, and `figma-pull.ts`'s path-based layer classification (confirmed this session: layer classification only looks at `path[0]`, never at group names like `Elevation`/`ShadowParts`).
- `scripts/figma-sync` — no code changes needed; `figma-value.mjs` already supports `number`/`color`, the new leaves push through the existing pipeline unmodified.
- `🌐 Global.🔤 Font.Shadow.*` (text-shadow family) — out of scope per this session's decision; some entries are multi-layer and don't fit a single X/Y/Blur/Spread/Color set.

## Verification

- `pnpm --filter @baloise/ds-tokens build` (or the repo's equivalent turbo target) — the new drift check runs as part of this; confirm it passes with the migrated JSON, and confirm (by diffing `dist/css/base.tokens.css` before/after) that `--ds-global-elevation-shadow-1` through `-4` are byte-identical to before the change.
- Temporarily break one `ShadowParts.N` value and re-run the build to confirm the drift check actually fails loudly (proves the guard works, not just that it's present).
- `pnpm --filter toky dev` — open the token editor, confirm the new `ShadowParts` tokens show up under Global/Elevation as ordinary editable number/color rows, and that a manual "Pull from Figma" (once this PR is merged and a sync has run) doesn't propose them as duplicates on a second pull (reuses the existing figmaId-matching machinery from this session's earlier work — no new code path, but worth a real end-to-end look).
- `pnpm lint` / repo-root type-check for the new `shadow-value.ts` module.
