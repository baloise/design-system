# Device token layer — extracting responsive tokens out of Alias

## Context

Today, responsive values live *inside* the Alias layer via two mechanisms:

1. **Sibling tokens** (older): separate `Mobile`/`Tablet`/`Desktop` DTCG tokens.
2. **`$extensions.com.helvetia.responsive`** (newer, per
   `docs/plans/responsive-dimension-token-plan.md`): a single token (e.g. `Alias.↔️ Space.SM`)
   carries a `{mobile, tablet, desktop}` map in `$extensions`, with `$value` mirroring `mobile`.

Both mechanisms are consumed by the same build-time formatter step
(`packages/tokens/src/formatter.ts`), which expands each responsive token into 4 CSS custom
properties: a bare/mobile-mirrored var, `-mobile`, `-tablet`, `-desktop`, and an auto-switching
`-device` var wrapped in `@media` blocks.

Exactly three token groups carry the `$extensions.com.helvetia.responsive` map inside Alias today
— confirmed by grepping `Base.tokens.json` and cross-checked against the pre-existing
`DEVICE_ELIGIBLE_PATH_PREFIXES` allowlist already hardcoded in
`scripts/figma-sync/lib/figma-value.mjs:374-378`:

- `🔗 Alias.↔️ Space.*`
- `🔗 Alias.🔤 Text.Size.*`
- `🔗 Alias.🗃️ Container.Space` (its `Container.Width` sibling is *not* responsive and stays put)

This plan extracts exactly those into a new top-level **Device** layer, so Alias becomes
non-responsive-only. Figma infrastructure for a distinct responsive concept already exists (a
second "Design Responsive Tokens" variable collection, modes Mobile/Tablet/Desktop,
`scripts/figma-sync/lib/bootstrap.mjs:91-102`) — currently used only for the derived `-device`
variable, aliasing back to Mobile/Tablet/Desktop variables that live in the main "Design Tokens"
collection alongside everything else. This plan consolidates all 4 variants into that collection.

## Decisions locked in with the user

1. **Scope of this pass**: only the 3 Alias-layer responsive groups above move. Component-level
   tokens that carry their own independent responsive extension (`Component.Text.Space`,
   `Component.Logo.Size.Base/SM/LG`) are untouched — that's a separate future phase 2 (auditing
   whether components should reference Device instead of defining their own breakpoints).
2. **New top-level JSON layer** `📱 Device` in `Base.tokens.json`, positioned
   `🌐 Global → 🔗 Alias → 📱 Device → 🧩 Component`. Device sits after Alias (conceptually "the
   responsive expansion of Alias") and before Component.
3. **Mechanical repointing, not new design**: the ~78 Component tokens whose `$value` is a
   `{🔗 Alias.↔️ Space.X}` / `{🔗 Alias.🔤 Text.Size.X}` reference get repointed to
   `{📱 Device.↔️ Space.X}` / `{📱 Device.🔤 Text.Size.X}` — required for the token graph to
   resolve at all once the source tokens move. This is plumbing, distinct from decision 1's
   deferred phase-2 work.
4. **Hard rename, no back-compat shim.** `--ds-alias-space-sm` → `--ds-device-space-sm`,
   `--ds-alias-container-space` → `--ds-device-container-space`, `--ds-alias-text-size-base` →
   `--ds-device-text-size-base`, etc. Every internal consumer (component SCSS in `packages/core`,
   `packages/css` utilities, Storybook docs/stories) gets codemodded in the same change:
   ```bash
   grep -rl -- '--ds-alias-space-\|--ds-alias-text-size-\|--ds-alias-container-space' packages/ apps/ \
     | xargs sed -i '' 's/--ds-alias-\(space\|text-size\|container-space\)/--ds-device-\1/g'
   ```
   (Verify the actual token-naming.ts output, e.g. `xl` vs `2xl` t-shirt-size edge cases, before
   trusting a blind sed — see `packages/tokens/src/css-naming.ts:18-21`.)
5. **Variant naming**: the bare `--ds-device-*` var **is** the auto-switching variant (today's
   `-device` suffix is retired — redundant once the layer itself is named "device"). Explicit
   `-mobile`/`-tablet`/`-desktop` suffixes remain, unchanged in meaning, for the rare forced-value
   case.
   ```
   --ds-device-space-sm          ← auto-switching (was --ds-alias-space-sm-device)
   --ds-device-space-sm-mobile   ← forced mobile   (was --ds-alias-space-sm-mobile)
   --ds-device-space-sm-tablet   ← forced tablet   (was --ds-alias-space-sm-tablet)
   --ds-device-space-sm-desktop  ← forced desktop  (was --ds-alias-space-sm-desktop)
   ```
   Net effect on `formatter.ts`'s `ds/css/variables-responsive`/`ds/css/variables-brand`: the
   "Base tokens" block (lines 333–345, 503–509 — strips `-mobile` to produce the
   mobile-mirrored bare fallback) is **deleted**; the "Device tokens" block (lines 347–378,
   510–529) is kept but its output is renamed from `${name}-device` to bare `${name}` — this is a
   simplification, not just a rename, since one whole block goes away.
6. **Full scope — Toky and figma-sync are part of this job**, not deferred:
   - `apps/toky/src/tokens/types.ts:1`'s `TokenLayer` union grows a 4th member: `'Device'`.
   - `apps/toky/app/token-editor.tsx:150-151`'s `LAYERS`/`LAYER_EMOJI` (and `LAYER_BG_TINT`,
     `TOKEN_ORIGIN_GROUPS`-equivalent groupings) get a `Device: '📱'` entry, inserted between
     Alias and Component to match decision 2's order.
   - `packages/tokens/src/formatter.ts:277-281`'s `TOKEN_ORIGIN_GROUPS` gets a 4th entry
     `{ pathSegment: '📱 Device', label: 'Device tokens' }`, inserted between Alias and Component.
7. **Figma collection consolidation**: all 4 variants (mobile/tablet/desktop/device) for these
   tokens move into the existing **"Design Responsive Tokens"** collection (modes
   Mobile/Tablet/Desktop). The main **"Design Tokens"** collection (modes Base + brands) no longer
   holds Space/Text.Size/Container.Space variables at all.
8. **VariableId discontinuity accepted.** Figma variables cannot move collections in place — the
   existing Space/Text.Size/Container.Space variables in "Design Tokens" are deleted there (per
   ADR-0019, pull already deletes on removal) and new ones are created fresh in "Design Responsive
   Tokens". `.figma-sync-state.json` baseline is regenerated for these tokens as part of this
   change, not hand-patched to fake continuity.

## Phase 1 — `packages/tokens/tokens/Base.tokens.json`

- Add top-level key `"📱 Device"`, positioned after `"🔗 Alias"` and before `"🧩 Component"`.
- Move `Alias.↔️ Space.*` → `Device.↔️ Space.*`, `Alias.🔤 Text.Size.*` → `Device.🔤 Text.Size.*`,
  `Alias.🗃️ Container.Space` → `Device.🗃️ Container.Space` (leaving `Alias.🗃️ Container.Width`
  behind — only `Container.Space` is responsive).
- Every `{🌐 Global...}` reference inside the moved tokens' `$value`/`$extensions.com.helvetia.
  responsive.{mobile,tablet,desktop}` is unaffected (Global doesn't move).
- Repoint the ~78 Component-layer references (decision 3) from `{🔗 Alias.↔️ Space.X}` /
  `{🔗 Alias.🔤 Text.Size.X}` to `{📱 Device.↔️ Space.X}` / `{📱 Device.🔤 Text.Size.X}`. Grep
  count to verify before/after: `grep -c 'Alias\.↔️ Space\|Alias\.🔤 Text\.Size' Base.tokens.json`
  should drop to 0 for these two prefixes once done (component tokens referencing non-responsive
  Alias groups are of course untouched).
- Leave `Component.Text.Space` and `Component.Logo.Size.*`'s own `$extensions.com.helvetia.
  responsive` maps untouched (decision 1 — phase 2).
- `Tcs.tokens.json` needs no change — confirmed it only overrides `🌐 Global`, no `Alias.Space`/
  `Text.Size` brand overrides exist today.

## Phase 2 — `packages/tokens/src` (Style Dictionary build)

### `src/formatter.ts`

- `TOKEN_ORIGIN_GROUPS` (line 277): insert `{ pathSegment: '📱 Device', label: 'Device tokens' }`
  between the Alias and Component entries.
- `computeResponsiveDimensionPaths` (line 122) and `expandResponsiveDimensionTokens` (line 222)
  key off `token.original.$extensions[RESPONSIVE_DIMENSION_EXTENSION_KEY]`, not the token's path
  prefix — moving the JSON location doesn't require touching this detection logic, only the
  `Base.tokens.json` move in Phase 1.
- `ds/css/variables-responsive` (line 311) and `ds/css/variables-brand` (line 482): per decision
  5, delete the "Base tokens" block (`baseTokensOriginal`/`baseTokens`/`baseDictionary`, lines
  328–345 and 503–509) entirely; rename the "Device tokens" block's output from `-device` suffix
  to bare name (lines 352–358, 510–511 — the `.replace('-mobile', '-device')` calls become
  `.replace('-mobile', '')`, i.e. what was `deviceBaseTokens` becomes what `baseTokens` used to be,
  and the separate mobile-mirrored fallback var disappears). Verify the commented-out dead code
  block (lines 380–423) — decide during implementation whether to delete it outright now that the
  live code is being restructured anyway, rather than carry it forward unchanged.
- `expandTypographyTokens`'s `-device` special-case (lines 33-44, 56-57) and
  `resolveResponsiveDimensionReferences` (line 148-165) both hardcode the `-device` suffix when
  rewriting a reference to a responsive dimension token — update both to emit the bare name
  instead, matching decision 5.
- `ds/javascript/es6`'s `-mobile`/`-tablet`/`-desktop` → `NameMobile`/`...` re-casing (line
  655-673) is unaffected — it never touched the bare/`-device` var, only the 3 explicit
  breakpoints, which keep their names.

### `src/css-value.ts`, `src/transformers.ts`, `src/config.base.ts`

- No changes expected — `RESPONSIVE_DIMENSION_EXTENSION_KEY`, `dimensionValueToCss`,
  `ds/dimension` all operate on token shape/extensions, not path. Verify during implementation
  (per the original responsive-dimension plan's own caution) rather than assume.
- `tokenNameToCssVar` (`src/css-naming.ts:11-29`) needs **no special-casing** for the new layer —
  unlike `🧩 Component` (which strips the segment, line 15-17), `📱 Device` should kebab-case
  through unchanged into `-device-`, the same way `🔗 Alias` becomes `-alias-` today. Confirm this
  with one real build rather than assuming the emoji strips cleanly.

## Phase 3 — Consumer codemod

- Run the sed from decision 4 across `packages/core`, `packages/css`, `apps/storybook`, and any
  other package referencing `--ds-alias-space-*`, `--ds-alias-text-size-*`,
  `--ds-alias-container-space*`.
- Grep for SCSS `$ds-alias-space-*` / `$ds-alias-text-size-*` variable usage too (the SCSS platform
  output) — the codemod needs both the CSS custom-property and SCSS variable forms.
- Rebuild (`pnpm tokens`) and diff `dist/css/base.tokens.css`, `dist/scss/_tokens.scss` before/
  after to confirm: no more `--ds-alias-space-*`/`--ds-alias-text-size-*`/
  `--ds-alias-container-space*` declarations; new `--ds-device-*` ones appear in the expected
  bare/`-mobile`/`-tablet`/`-desktop` shape (no more `-device` suffix); Component-layer
  declarations that referenced these still resolve (no broken `var()`/`$` references).
- `pnpm test` + `pnpm lint` across touched packages; visually spot-check a couple of components
  that use `Space`/`Text.Size` responsively (e.g. via Storybook) to confirm breakpoint switching
  still works.

## Phase 4 — `apps/toky`

### `apps/toky/src/tokens/types.ts`

- `TokenLayer` (line 1): `'Global' | 'Alias' | 'Device' | 'Component'`.

### `apps/toky/app/token-editor.tsx`

- `LAYERS` (line 150): `['Global', 'Alias', 'Device', 'Component']`.
- `LAYER_EMOJI` (line 151): add `Device: '📱'`.
- `LAYER_BG_TINT` (line 159) and any other `Record<TokenLayer, ...>` map: add a `Device` entry —
  grep `Record<TokenLayer` to find every map needing a 4th case (compile errors will catch missing
  ones once the type gains a member, but check for non-exhaustive object literals that TS won't
  flag).
- Line 850's `['Global', 'Alias']` layer-filter usage: check what this specific filter is scoping
  (context needed at implementation time — decide whether Device belongs in that filter's set).
- Any other `TokenLayer[]`-typed constant used for filtering/scoping (search
  `apps/toky/src/tokens` and `apps/toky/app` for `TokenLayer[]`) needs the same review.

### `apps/toky/src/tokens/figma-map.ts`, `figma-pull.ts`

- These already have responsive-dimension-specific logic (sub-property types, pull-entry
  derivation per the original responsive-dimension plan) scoped to whichever tokens carry the
  `$extensions` map — verify none of it assumes those tokens live under an `Alias` path segment
  specifically (should key off the extension's presence, not path, per Phase 2's note above).

## Phase 5 — `scripts/figma-sync`

### `lib/figma-value.mjs`

- `DEVICE_ELIGIBLE_PATH_PREFIXES` (line 374-378): update the 3 prefixes from
  `['🔗 Alias', ...]` to `['📱 Device', ...]`, matching Phase 1's JSON move.
- `figmaResponsiveDimensionDeviceVariableName` (line 399-401): currently builds
  `'🔗 Alias/↔️ Space/Lg/Device'` — per decision 7/5, this becomes just the token's own path (no
  `/Device` suffix needed if the variable now lives in a dedicated collection whose *name* already
  says "responsive" and whose bare value already means "auto-switching"). Decide the exact Figma
  variable naming scheme during implementation, consistent with decision 5's CSS bare-name
  convention.

### `lib/bootstrap.mjs`

- `buildResponsiveBootstrapPayload` (line 91-102) already creates the "Design Responsive Tokens"
  collection with Mobile/Tablet/Desktop modes — per decision 7, this collection now needs to hold
  full per-token values (not just a derived alias), since Mobile/Tablet/Desktop stop existing as
  separate variables in "Design Tokens". Review whether the mode-value model (one variable, 3
  modes) can represent what were previously 3 separate sibling variables plus 1 derived one — this
  is the main open design question for this phase (see below).

### `lib/write.mjs`, `lib/figma.mjs`, `pull.mjs`

- `findCollectionAndModes`/`findResponsiveCollectionAndModes` (`lib/figma.mjs:97,107`) and the
  write fan-out (`lib/write.mjs`, the `X_SUB_PROPERTIES` loop sites already flagged as needing
  generalization by the original responsive-dimension plan) need to route all 4
  mobile/tablet/desktop/device variants for Device-layer tokens through the responsive collection
  instead of splitting them across both collections as today.
- `.figma-sync-state.json`: decide during implementation whether affected entries are dropped and
  regenerated on next sync (decision 8), or explicitly rewritten as part of this change — confirm
  which keeps a real Figma round-trip clean immediately after merge rather than surfacing a wall of
  false "conflicts" on the first post-merge sync.

## Open design question to resolve during implementation

**How the "Design Responsive Tokens" collection represents a token once all 4 variants live
there.** Today it holds only 1 derived variable per token (the `-device` alias, 3 modes each
pointing at a sibling in the *other* collection). Post-consolidation there's no "other collection"
sibling to point at — Mobile/Tablet/Desktop become real, directly-authored values. Two shapes are
possible and should be decided against Figma's actual variable-mode semantics before writing code:

- **(a)** One Figma variable per token, 3 modes (Mobile/Tablet/Desktop) holding the 3 real values
  directly — matches how "Design Tokens" already uses Base/brand modes for the same variable. The
  CSS "bare = auto-switching" build-time behavior (decision 5) has no Figma-side equivalent (Figma
  doesn't run media queries) — the Figma "Device" concept is then purely "this variable is
  responsive," represented by which collection it's in, not by a distinct mode/variable.
- **(b)** Keep today's shape (mobile/tablet/desktop as 3 separate variables, device as a 4th
  derived one aliasing them) but all 4 now live in the responsive collection instead of split
  across two.

Whichever is chosen must stay round-trippable by both Pull (from Code) and Pull (from Figma) — read
`apps/toky/src/tokens/figma-pull.ts`'s existing `deriveResponsiveDimensionPullEntries` logic (see
`docs/plans/responsive-dimension-token-plan.md` Phase 1) before deciding, since it already assumes
a specific shape that this change must stay compatible with or deliberately migrate.

## Files touched

- `packages/tokens/tokens/Base.tokens.json` — new `📱 Device` layer, moved tokens, repointed
  Component references
- `packages/tokens/src/formatter.ts` — `TOKEN_ORIGIN_GROUPS`, `ds/css/variables-responsive`,
  `ds/css/variables-brand` (drop "Base tokens" block, rename "Device tokens" block to bare name),
  `expandTypographyTokens`/`resolveResponsiveDimensionReferences`'s `-device` suffix references
- `packages/tokens/src/css-naming.ts` — verify only, no expected change
- Every `packages/core`, `packages/css`, `apps/storybook` file referencing
  `--ds-alias-space-*`/`--ds-alias-text-size-*`/`--ds-alias-container-space*` or their SCSS
  variable forms — codemodded
- `apps/toky/src/tokens/types.ts` — `TokenLayer` union
- `apps/toky/app/token-editor.tsx` — `LAYERS`, `LAYER_EMOJI`, `LAYER_BG_TINT`, any other
  `Record<TokenLayer, ...>` / `TokenLayer[]` constant
- `apps/toky/src/tokens/figma-map.ts`, `figma-pull.ts` — verify only, no expected change
- `scripts/figma-sync/lib/figma-value.mjs` — `DEVICE_ELIGIBLE_PATH_PREFIXES`,
  `figmaResponsiveDimensionDeviceVariableName`
- `scripts/figma-sync/lib/bootstrap.mjs`, `lib/write.mjs`, `lib/figma.mjs`, `pull.mjs` — collection
  consolidation, per the open design question above
- `.figma-sync-state.json` — baseline regenerated for affected tokens
- `packages/tokens/CONTEXT.md` — update the "Responsive Tokens" section and "Three-Layer
  Architecture" table (now four) to document the Device layer, its naming convention, and its
  relationship to Alias

## Explicitly out of scope for this pass

- Migrating `Component.Text.Space` / `Component.Logo.Size.*` (or any other component's own
  responsive extension) to reference Device instead of defining their own breakpoints — the
  deferred phase 2 audit.
- Any brand-level (Tcs) override of Device tokens — none exist today; if one is needed later, it
  follows whatever pattern this plan establishes for Global brand overrides.
- Changing the `$extensions.com.helvetia.responsive` mechanism itself (decision 2-10 in the
  original responsive-dimension-token-plan) — this plan only relocates which layer holds tokens
  using that mechanism, not the mechanism.
