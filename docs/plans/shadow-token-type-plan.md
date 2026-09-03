# `shadow` design token type

## Context

[DTCG](https://www.designtokens.org/tr/drafts/format/#shadow) defines a `shadow` token `$type`: `$value` is either a single shadow object or an array of them (multiple stacked shadows, rendered CSS-side as a comma-joined `box-shadow` list). Each shadow object has `color` (a DTCG color value/reference), `offsetX`/`offsetY`/`blur`/`spread` (each a DTCG dimension value/reference — `{value, unit: "px"|"rem"}`), and an optional `inset` boolean for inner shadows.

Today this repo has no such type: every shadow-shaped value (`Global.🔤 Font.Shadow.{0,1}`, `Global.🗂️ Elevation.Shadow.{0,1,2,3,4}`, plus every Alias/Component reference to them) is `$type: "string"`, holding a hand-authored CSS shorthand string (`"0px 0px 4px rgba(0, 0, 0, 0.15), ..."`) or the literal `"none"`.

This follows the same overall pattern as `fontWeight`/`fontFamily`/`dimension` (see their plan docs), but is a bigger step up in two ways this plan addresses head-on: (1) Style Dictionary's own built-in shadow transform doesn't match this repo's color conventions, and (2) Figma has no native shadow-variable type, so syncing shadow means decomposing one DTCG token into several Figma variables — the first type where that's true.

## Facts found while researching

- Style Dictionary ships a built-in `shadow/css/shorthand` transform, already part of the `css`/`scss`/`less` transformGroups (same place `fontFamily/css` and `size/rem` already live — see `docs/plans/font-family-token-type-plan.md`'s addendum and `docs/plans/dimension-token-type-plan.md`'s addendum for the exact same trap hit twice already). It correctly reads `{value, unit}` dimension sub-values. **Verified by direct test** (a scratch Style Dictionary build): for the `color` sub-value it renders `rgb(0% 0% 0% / 0.25)` — colorjs.io's default CSS Color 4 percentage syntax — not this codebase's convention (`#ffffff` opaque / `rgba(0, 0, 0, 0.25)` translucent, what `colorValueToCss` produces everywhere else).
- Figma **does** support binding Number/Color variables to individual shadow effect properties (X, Y, Blur, Spread, Color) for both drop and inner shadows — confirmed via [Figma's Dec 2023 product update](https://forum.figma.com/t/variables-can-now-be-bound-to-new-fields-in-figma/59244). Figma's REST API can create the raw variables; actually wiring them onto a visual Effect Style's fields is a manual step a designer does in the Figma UI — no API for that binding exists to automate.
- Current shadow-shaped data, all `$type: "string"` today:
  - `Global.🔤 Font.Shadow.0` = `"none"`.
  - `Global.🔤 Font.Shadow.1` = `"0px 0px 4px rgba(0, 0, 0, 0.15), 0px 4px 12px rgba(0, 0, 0, 0.25), 0px 0px 80px rgba(0, 0, 0, 0.5)"` — **3 layers**, the only multi-layer shadow in the file.
  - `Global.🗂️ Elevation.Shadow.0` = `"none"`.
  - `Global.🗂️ Elevation.Shadow.{1,2,3,4}` = single-layer shorthands, e.g. `"0 2px 5px 1px rgba(0, 7, 57, 0.12)"`.
  - Referenced by: `Alias.🔤 Text.Shadow`, `Alias.🌓 Shadow.Text`, `Alias.🌓 Shadow.Box.{None,Header,Base,Elevated}`, and 9 Component leaves (`Heading.Shadow`, `Card.Shadow.{Flat,Base,Hover}`, `Date.Calendar.Shadow`, `Date.Popup.Shadow`, `Select.Content.Shadow`, `Navbar.Base.Layout.Shadow`, `Tooltip.Shadow`, `Popup.Shadow`) — all references, no additional literal values.
  - No `Tcs.tokens.json` overrides exist for any of these — Base-only, like every prior type migration.

## Decisions locked in with the user

1. **Skip Style Dictionary's built-in shadow transform.** Write our own `shadowValueToCss`, reusing the existing `colorValueToCss` + `dimensionValueToCss` per sub-value, so shadow color output stays byte-consistent with every other color-bearing token. `css`/`scss` platforms drop `transformGroup` for an explicit list (same fix pattern as `dimension`'s `web`/`docs`), keeping every other transformGroup member verbatim and swapping `shadow/css/shorthand` for our own `ds/shadow`.
2. **`"none"` tokens** (`Font.Shadow.0`, `Elevation.Shadow.0`) become `$type: "shadow"`, `$value: []` — an empty array is spec-legal ("zero layers") and our transform renders it as bare `none`.
3. **Shape**: a single-layer token's `$value` is a bare shadow object (no array wrapper); only the genuinely multi-layer `Font.Shadow.1` becomes an array of 3.
4. **Units**: every `offsetX`/`offsetY`/`blur`/`spread` converts from its current px number to rem (÷16), matching `dimension`'s storage convention — Figma push converts each sub-value back to px individually.
5. **Figma sync**: full bidirectional (push + pull), but **single-layer shadows only** — 6 of the 7 current tokens. `Font.Shadow.1` (multi-layer) stays fully supported in the DTCG type, CSS build, and Toky editor; it's simply not eligible for Figma sync (same as today, since nothing is synced yet).
   - `$extensions.com.figma.variableId` becomes an object `{offsetX, offsetY, blur, spread, color}` of 5 variableId strings, instead of the single string every other type uses.
   - Figma variable names get a sub-property suffix on the existing path-join convention: `🌐 Global/🗂️ Elevation/Shadow/1/OffsetX`, `.../OffsetY`, `.../Blur`, `.../Spread`, `.../Color`.
   - Pull reconciles a partial change (e.g. only the Color variable changed in Figma) by merging just that sub-value against the other 4 unchanged ones — the same "merge one changed piece, keep the rest" pattern already used for `fontFamily`'s array-index-0 merge and `dimension`'s unit-aware conversion.
6. **Toky editor**: a popup (per the mockup) with X/Y/Blur/Spread number inputs, **each paired with its own px/rem `<Select>`** (4 independent unit pickers, not one shared unit for the whole shadow), plus the existing color+opacity editor (hex + %, already used everywhere else) reused for the color field. Supports adding/removing layers for multi-layer shadows.
7. All Alias/Component references retype to `$type: "shadow"` too (values unchanged — still reference strings), matching the "all layers" precedent from every prior type.

## 1. `packages/tokens/tokens/Base.tokens.json`

Migration script (mirrors the Python approach used for the prior three types):

- Parse each existing shadow-shorthand string into its layers (split on top-level commas — none of the current values have commas inside `rgba()` that would need special handling beyond respecting parens, but write the split to be paren-aware regardless, since a `hex`-with-alpha color never contains a comma inside `rgba()`'s alpha but this codebase's colors are always `rgba(r, g, b, a)`/`#hex` with a comma inside `rgba()` itself — so the split **must** be paren-aware, not naive `.split(',')`).
- Per layer, parse the CSS `box-shadow` shorthand grammar: optional leading `inset`, then 2–4 length values (offsetX, offsetY, then optionally blur, then optionally spread — CSS defaults missing blur/spread to `0`), then a color (hex or `rgba(...)`).
- Each length → `{ value: px / 16, unit: "rem" }`.
- Color (hex or `rgba(...)`) → the same DTCG color object shape used everywhere else in this file (`{ colorSpace: "srgb", components: [...], alpha, hex }`) — reuse whatever parsing logic already exists for authoring color tokens (check `packages/tokens`' existing scripts/tests for a hex/rgba→DTCG-color helper before writing a new one).
- `"none"` → `$value: []`.
- `$type` becomes `"shadow"` for the literal Global tokens and every Alias/Component reference leaf listed in "Facts found" above (references keep their `$value` reference string unchanged, only `$type` changes).

Verification: rebuild and diff `dist/css/base.tokens.css` against a pre-migration snapshot for every `--ds-*-shadow*`/`--ds-*-box-shadow*`-ish custom property — this must be **value-preserving** (same rendered `box-shadow` CSS before and after), not just "produces valid CSS." This is the exact lesson from the `fontFamily`/`dimension` addenda: verify the real `dist/` output directly, don't trust the transform logic in isolation.

## 2. `packages/tokens/src/css-value.ts`

New exported helper:

```ts
interface DtcgShadowLayer {
  color: unknown // DTCG color value
  offsetX: unknown // DTCG dimension value
  offsetY: unknown
  blur: unknown
  spread: unknown
  inset?: boolean
}

function shadowLayerToCss(layer: DtcgShadowLayer): string | null {
  const color = colorValueToCss(layer.color)
  const offsetX = dimensionValueToCss(layer.offsetX)
  const offsetY = dimensionValueToCss(layer.offsetY)
  const blur = dimensionValueToCss(layer.blur)
  const spread = dimensionValueToCss(layer.spread)
  if (color === null || offsetX === null || offsetY === null || blur === null || spread === null) return null
  return `${layer.inset ? 'inset ' : ''}${offsetX} ${offsetY} ${blur} ${spread} ${color}`
}

export const shadowValueToCss = (value: unknown): string | null => {
  if (Array.isArray(value)) {
    if (value.length === 0) return 'none'
    const layers = value.map(shadowLayerToCss)
    return layers.every((l): l is string => l !== null) ? layers.join(', ') : null
  }
  if (typeof value === 'object' && value !== null) {
    return shadowLayerToCss(value as DtcgShadowLayer)
  }
  return null
}
```

Add a `type === 'shadow'` branch to `resolvedValueToCss`, before the `'string'` branch (mirrors `fontFamily`/`dimension`).

## 3. `packages/tokens/src/transformers.ts`

New Style Dictionary value transform, alongside `ds/dimension`:

```ts
sd.registerTransform({
  type: `value`,
  transitive: true,
  name: `ds/shadow`,
  filter: token => token.$type === 'shadow',
  transform: token => shadowValueToCss(token.$value ?? token.value),
})
```

## 4. `packages/tokens/src/config.base.ts` + `config.brand.ts`

- **`css`/`scss`** (`config.base.ts`): drop `transformGroup: 'css'`/`'scss'`, list transforms explicitly — copy the transformGroup's own member list verbatim (`attribute/cti`, `name/kebab`, `time/seconds`, `html/icon`, `size/rem`, `color/css`, `asset/url`, `fontFamily/css`, `cubicBezier/css`, `strokeStyle/css/shorthand`, `border/css/shorthand`, `typography/css/shorthand`, `transition/css/shorthand`) **minus** `shadow/css/shorthand`, plus every existing `ds/*` transform these platforms already use, plus the new `ds/shadow`. (The other exotic built-ins in that list — `cubicBezier/css`, `strokeStyle/css/shorthand`, etc. — are no-ops for this token set today since nothing uses those `$type`s; kept verbatim rather than pruned, same reasoning `web`/`docs` used for `dimension`.)
- **`web`/`docs`**: already explicit-list platforms (from the `dimension` fix) — just append `ds/shadow`.
- **`javascript`**: `transformGroup: 'js'` has no shadow-shaped built-in at all — append `ds/shadow` to its explicit `transforms` list.
- **`config.brand.ts`'s `css` platform**: no `transformGroup` (always explicit) — append `ds/shadow`.

**Verify the actual `dist/` output for all 5 platforms directly** before calling this done, per the `fontFamily`/`dimension` lesson.

## 5. `scripts/figma-sync/lib/figma-value.mjs` — Push

Shadow doesn't fit the existing `figmaValueFor(dtcgType, literalValue) → one Figma value` shape — it needs to produce **5 separate Figma values** (or throw/skip for a multi-layer shadow, since push is single-layer-only). New function, not a `switch` case:

```js
// Returns null for a multi-layer shadow (push doesn't support it — see
// docs/plans/shadow-token-type-plan.md) or an unsupported/empty shadow value;
// otherwise the 5 Figma-ready sub-values for a single-layer shadow.
export function figmaShadowSubValuesFor(literalValue) {
  if (Array.isArray(literalValue)) return null // multi-layer or empty ([] = "none") — not synced
  if (typeof literalValue !== 'object' || literalValue === null) return null
  const { color, offsetX, offsetY, blur, spread } = literalValue
  return {
    offsetX: figmaValueFor('dimension', offsetX),
    offsetY: figmaValueFor('dimension', offsetY),
    blur: figmaValueFor('dimension', blur),
    spread: figmaValueFor('dimension', spread),
    color: figmaValueFor('color', color),
  }
}
```

`resolvedTypeFor` needs a `dimension`/`color`-per-sub-value split too, not one `resolvedType` — the caller (`write.mjs`) creates 5 variables (`FLOAT` × 4, `COLOR` × 1) per shadow token instead of 1. This is the one place `write.mjs`'s `assignVariableIds`/`buildCreatePassPayload`/`buildAliasPassPayload` need real new logic (not just a new `$type` case) — they currently assume one token path → one variable. For a `$type: "shadow"` token (single-layer only — multi-layer tokens are filtered out before reaching this code, same as `[]`/`"none"`), each of these functions needs to fan out into 5 named sub-variables instead of 1, using the naming convention from decision #5 above and storing the resulting 5 ids back into `$extensions.com.figma.variableId` as an object instead of a string.

## 6. `apps/toky/src/tokens/figma-map.ts` + `figma-pull.ts` — Pull

- No single `dtcgTypeFor`/`fontWeightNumberFromKeyword`-style helper works here either — shadow pull needs to **group** Figma variables by which shadow token (and sub-property) they belong to, using the stored `variableId` object as a reverse index, before it can decide create/update/delete for one shadow token. This is a different loop shape from `deriveValue`'s existing one-Figma-variable-in, one-plan-entry-out structure.
- New, parallel function (not a branch inside the existing `deriveValue`): something like `deriveShadowPullEntries(figmaMeta, baseIndex, baseModeId)` that:
  1. Builds a reverse index: for every local shadow token with a `variableId` object, map each of its 5 stored ids → `{ tokenPath, subProperty }`.
  2. For every Figma variable whose id appears in that reverse index, group by `tokenPath`; a token is "fully matched" once all 5 of its sub-ids are found among the fetched variables (should always be true for anything previously pushed).
  3. For each fully-matched group, reconstruct the DTCG shadow value (`{color, offsetX, offsetY, blur, spread}`, converting each dimension sub-value's px float back to rem) and diff against the local token the same way `buildBasePullPlan`'s main loop already does (clean update / conflict / no-op).
  4. Any Figma variable whose name matches the `.../OffsetX` etc. suffix convention but isn't in the reverse index (no local shadow token references it yet) is left for a human — no auto-create from loose Figma-side variables, consistent with every other type's "new token definitions originate in code" precedent, and avoids the much harder problem of guessing which 5 stray variables belong together for a brand-new shadow.
- Called as an additional step in `buildBasePullPlan` (base only — brand shadow overrides are out of scope for this pass, since nothing in `Tcs.tokens.json` needs it today and brand-scoped shadow sync compounds the same complexity again); its results get merged into the returned `PullPlan` alongside the existing per-variable loop's.

## 7. Toky editor — shadow popup

`apps/toky/app/token-editor.tsx`:

- `TOKEN_TYPE_ICON.shadow` — pick an appropriate icon (nothing existing quite fits; a new lucide import, e.g. a drop-shadow/layers icon).
- Value cell for a literal (non-reference) shadow token: a trigger button (mirrors color's `PopoverTrigger` pattern) showing a short summary (e.g. `"3 layers"` or the layer count / `"None"` for `[]`) that opens a `PopoverContent` containing the shadow editor.
- Shadow editor, per layer: X/Y/Blur/Spread — each a number input + its own px/rem `<Select>` (4 independent unit pickers, decision #6) — plus the color field reusing the exact hex+opacity-% editor already built for `$type: "color"` (same component/markup, not a reimplementation). An "Add layer" button appends a new layer (sensible defaults: `0,0,0,0`, black at some opacity); each layer gets a remove button, hidden when only one layer remains unless the token is meant to allow reaching `[]` (removing the last layer → `$value: []`, i.e. "none").
- Brand-override cell: same popup, mirroring how every prior type's editor was duplicated into the brand cell branch.
- `getEditableValueText`/`parseEditableValue`: unlike every prior type, shadow's edit surface is exclusively the popup (no plain-text fallback makes sense for a nested object/array) — these two functions probably don't need a `'shadow'` branch at all if the popup manages its own draft state directly against `rawValue`, the way color's popover already works independently of the text-input commit path. Confirm this while implementing; if a text fallback path turns out to be needed (e.g. for the Create-token dialog), design it then rather than guessing now.
- `validate.ts`: no new rule needed beyond the existing emptiness check — the popup's own fields (Selects for unit, existing color validation) already constrain what's enterable.

## 8. Tests to add/update

- `css-value.test.ts`: `shadowValueToCss` — single layer, multi-layer (comma-joined), empty array → `'none'`, `inset` prefix, and a case confirming color renders as `rgba(...)`/hex (not `rgb(0% ...)`) to explicitly guard against the built-in-transform regression this plan avoids.
- `figma-sync`: `figmaShadowSubValuesFor` — single-layer → 5 correct sub-values with dimension px-conversion; multi-layer/empty → `null` (not synced).
- `figma-pull.test.ts`: the `deriveShadowPullEntries`-shaped tests — full match with no changes (no false-positive update, the now-familiar regression shape from every prior type); a single sub-property changed (e.g. only color) merges correctly; an incomplete match (fewer than 5 of a token's ids present) doesn't half-apply.
- Manual Toky smoke test: opening the popup for `Elevation.Shadow.2`, editing blur, and confirming the diff/preview shows the right CSS shadow string; adding a layer to `Font.Shadow.1` and confirming it renders as a 4th comma-joined shadow.

## Files touched

- `packages/tokens/tokens/Base.tokens.json` — 2 Global.Font.Shadow + 5 Global.Elevation.Shadow (7 literal) + ~15 Alias/Component reference leaves
- `packages/tokens/src/css-value.ts` — `shadowValueToCss` + `resolvedValueToCss` branch
- `packages/tokens/src/transformers.ts` — new `ds/shadow` transform
- `packages/tokens/src/config.base.ts` — `css`/`scss` restructured off `transformGroup` (see §4); `web`/`docs`/`javascript` gain `ds/shadow`
- `packages/tokens/src/config.brand.ts` — `ds/shadow` added to the `css` platform
- `scripts/figma-sync/lib/figma-value.mjs` — `figmaShadowSubValuesFor`
- `scripts/figma-sync/lib/write.mjs` — fan-out to 5 variables per shadow token (§5)
- `apps/toky/src/tokens/figma-pull.ts` — new `deriveShadowPullEntries`-shaped function, wired into `buildBasePullPlan`
- `apps/toky/app/token-editor.tsx` — `TOKEN_TYPE_ICON`, shadow popup component, base + brand-override cell render branch
- Test files per §8
