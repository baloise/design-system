# `dimension` design token type

## Context

[DTCG](https://www.designtokens.org/tr/drafts/format/#dimension) defines a `dimension` token `$type`: `$value` is an object `{ value: number, unit: "px" | "rem" }` — those are the *only* two legal units. Today this repo has no such type: every size-shaped value (spacing, radius, border width, font size, breakpoints, container widths — 437 tokens total) is `$type: "number"`, a bare number with no unit metadata. The unit is currently inferred at CSS-build time by a path-name heuristic in `packages/tokens/src/css-value.ts`'s `numberValueToCssSize`: divide by 16 for rem, unless the token's path matches `PIXEL_PATH_MARKERS` (Breakpoint, Container) or its value is the `9999` "fully rounded" sentinel, in which case it stays a raw px number.

This is the largest of the three token-type migrations so far (fontWeight ~45 tokens, fontFamily ~33, dimension ~400+) — see `docs/plans/font-weight-token-type-plan.md` and `docs/plans/font-family-token-type-plan.md` for the established pattern this one follows: a new DTCG `$type`, a Style Dictionary transform, a Figma push/pull mapping (reusing the `deriveValue`/`referenceToken`-hint mechanism built for those two), and a Toky editor affordance.

## Facts found while researching

```
python3: $type counts across Base.tokens.json
color 968, number 437, string 98, fontWeight 45, fontFamily 33
```

`NUMBER_ONLY_PATH_MARKERS` (css-value.ts) already encodes exactly which `number` categories must stay unitless: `LineHeight`, `Opacity`/`🌫️ Opacity`, `ZIndex`/`Z-Index`/`🗂️ ZIndex`/`🗂️ Z-Index`, `Interaction`/`✨ Interaction`. Everything else that's `$type: "number"` is a genuine size:

- `Global.📏 Size.{Border, Radius, Breakpoint, Container, Space}` — the raw scale primitives.
- `Alias.{▭ Border, 🔵 Radius, 📐 Breakpoint, 🗃️ Container, ↔️ Space, 🔤 Text.Size}` — references into the above, plus `Alias.🔤 Text.Size` (font sizes) which also gets rem-converted today (not in any marker list).
- ~28 Component `FontSize`/`Padding`/`Gap`/`Height`/`Width`/`BorderWidth`/etc. leaves, referencing Alias.

One exception found: `Global.📏 Size.Container.Full` is already `$type: "string"`, `$value: "100%"` — a percentage, which has no representation in DTCG's dimension unit set (`px`/`rem` only). Not touched by this migration, same reasoning as `fontFamily`'s `Link.Family` exclusion (this time, unlike that one, staying a percentage string is the only option — there's no dimension-shaped way to force it).

All current `Global.📏 Size.{Space,Radius,Border}` values divide by 16 cleanly (design grid is base-4/8) — e.g. `Space.24 → 1.5`, `Border.3 (value 4) → 0.25`. No rounding-precision concerns for the migration itself; 16 is a power of 2, so any integer px ÷ 16 terminates exactly in binary floating point.

`✨ Interaction.Focus.Size.{Inner,Outer,InnerInset,OuterInset}` (values 2/5/3/5) render today as bare unitless numbers in CSS (`--ds-alias-interaction-focus-size-inner: 2;`) — no usage was found in `packages/core`'s SCSS confirming whether these are consumed as px offsets elsewhere. Per the decision below, these stay `$type: "number"` (mirroring today's `NUMBER_ONLY_PATH_MARKERS` scope exactly) — revisit separately if they turn out to need a unit.

## Decisions locked in with the user

1. **Value semantics**: source `$value.value` holds the number *in its own unit* — a rem-destined token stores the rem number directly (`Space.24 → { value: 1.5, unit: "rem" }`), not a px number needing a build-time division. The CSS build transform becomes a trivial `${value}${unit}` passthrough; the real px⇄rem conversion work moves entirely into the Figma push/pull boundary (Figma has no rem concept at all).
2. **Scope boundary**: mirrors `NUMBER_ONLY_PATH_MARKERS` exactly. Everything **except** LineHeight/Opacity/ZIndex/Interaction becomes `$type: "dimension"`; those four categories stay `$type: "number"`, completely unchanged (value, behavior, everything).
3. **Unit assignment**: mirrors `PIXEL_PATH_MARKERS` + the `9999` sentinel exactly. `Breakpoint`/`Container`/the `Radius` token whose value is `9999` get `unit: "px"`, value unchanged. Everything else gets `unit: "rem"`, value = old ÷ 16. `Container.Full` (`"100%"`) is left as `$type: "string"`, untouched.
4. **Figma push**: `dimension` maps to Figma's `FLOAT` resolvedType — the same one plain `number` already uses (unlike `fontWeight`/`fontFamily`, `dimension` has a real native Figma analog: variables are always raw px floats). Value sent: `unit === 'rem' ? value * 16 : value`.
5. **Figma pull**: for an already-matched dimension token, convert Figma's px float back using the matched token's own unit: `unit === 'rem' ? figmaValue / 16 : figmaValue`. This extends the same `referenceToken`-hint mechanism `fontWeight`/`fontFamily` already added to `deriveValue` — `FLOAT` is now non-bijective too (`number` vs `dimension`), resolved the same way: trust the matched local token's `$type` (and now also its `unit`) instead of guessing. Brand-new/unmatched Figma FLOAT variables still default-guess plain `'number'` — same accepted edge case as the other two types.
6. **Toky editor**: a new compound cell for literal (non-reference) dimension tokens — a number input alongside a `<Select>` for unit (px/rem), analogous in spirit to color's hex+opacity pairing. Switching the unit **auto-converts** the number to preserve the token's physical size (×16 going rem→px, ÷16 going px→rem) — it's a representation change, never a silent resize.
7. **Cleanup**: delete the now-unreachable px/rem logic in `numberValueToCssSize` (`PIXEL_PATH_MARKERS`, the `9999` sentinel branch, the `value / 16` branch) once dimension tokens cover everything that used to reach it. What's left only needs to handle the "stay unitless, round to 1 decimal" case for the four categories still `$type: "number"`.

## 1. `packages/tokens/tokens/Base.tokens.json`

Mechanical migration script (mirrors the Python approach used for `fontWeight`/`fontFamily`):

- Walk every `$type: "number"` leaf.
- If its path contains a `NUMBER_ONLY_PATH_MARKERS` entry → leave untouched (still `$type: "number"`, same `$value`).
- Otherwise → `$type: "dimension"`, `$value` becomes:
  - `{ value: v, unit: "px" }` if path contains a `PIXEL_PATH_MARKERS` entry, or `v === 9999`.
  - `{ value: v / 16, unit: "rem" }` otherwise.
- `Global.📏 Size.Container.Full` (`$type: "string"`, `$value: "100%"`) is explicitly excluded — never visited as a `number` leaf, so nothing to do, but call it out in the migration script's own accounting so a `grep` audit confirms it wasn't silently skipped by accident vs. by design.

Verification: `grep -c '"\$type": "number"'` before vs. after should drop by exactly (437 − count of `NUMBER_ONLY_PATH_MARKERS`-matched leaves); every `dimension` leaf's `value` field, cross-checked against `old_value / 16` (rem) or `old_value` (px), should match exactly for every existing token (a value-preserving migration — build output diffing to zero is the acceptance bar, same as the `$extensions` stripping and prior two type migrations).

## 2. `packages/tokens/src/css-value.ts`

- Delete `PIXEL_PATH_MARKERS` and the `9999`-sentinel/`value / 16` branches from `numberValueToCssSize`. What remains:
  ```ts
  export const numberValueToCssSize = (value: number, path: string[]): number => {
    if (NUMBER_ONLY_PATH_MARKERS.some(marker => path.includes(marker))) {
      return Math.round(value * 10) / 10
    }
    return value
  }
  ```
  (The `${value}`.endsWith('px'/'rem') guard at the top was already dead — no `number`-typed value has ever been a string — safe to drop too, but flag it in the diff rather than silently folding it in, in case it was defensive for a case not yet understood.)
- New exported helper, mirroring `fontFamilyValueToCss`:
  ```ts
  export const dimensionValueToCss = (value: unknown): string | null => {
    if (typeof value !== 'object' || value === null || !('value' in value) || !('unit' in value)) return null
    const { value: num, unit } = value as { value: number; unit: string }
    if (typeof num !== 'number' || (unit !== 'px' && unit !== 'rem')) return null
    return `${num}${unit}`
  }
  ```
- `resolvedValueToCss`: add a `type === 'dimension'` branch calling `dimensionValueToCss`, before the `'string'` branch.

## 3. `packages/tokens/src/transformers.ts` + `config.base.ts`/`config.brand.ts`

New Style Dictionary value transform, alongside `ds/font-weight`/`ds/font-family`:

```ts
sd.registerTransform({
  type: `value`,
  transitive: true,
  name: `ds/dimension`,
  filter: token => token.$type === 'dimension',
  transform: token => dimensionValueToCss(token.$value ?? token.value),
})
```

**Superseded by the Addendum below** — this section originally predicted no competing Style Dictionary built-in for `dimension`. That was wrong: SD's built-in `size/px`/`size/rem` transforms key off `token.$type === 'dimension'` directly (not a repo-specific type name), so they *do* fire on our tokens, and one of them (`size/px`) fires *incorrectly*. See the Addendum for what actually shipped and why.

## 4. `scripts/figma-sync/lib/figma-value.mjs`

```js
const RESOLVED_TYPE_BY_DTCG_TYPE = {
  color: 'COLOR',
  number: 'FLOAT',
  string: 'STRING',
  boolean: 'BOOLEAN',
  fontWeight: 'STRING',
  fontFamily: 'STRING',
  dimension: 'FLOAT',
}
```

`figmaValueFor` gains a `dimension` case:

```js
case 'dimension': {
  const { value, unit } = literalValue
  if (typeof value !== 'number' || (unit !== 'px' && unit !== 'rem')) {
    throw new Error(`Unsupported dimension value "${JSON.stringify(literalValue)}" — expected {value, unit: 'px'|'rem'}.`)
  }
  return unit === 'rem' ? value * 16 : value
}
```

Update the file's top comment to mention `dimension` also maps to `FLOAT` (like plain `number` already does) — the first case of two DTCG types sharing `FLOAT`, mirroring `STRING`'s existing three-way share.

## 5. `apps/toky/src/tokens/figma-map.ts` + `figma-pull.ts`

- `figma-map.ts`: `DTCG_TYPE_BY_RESOLVED_TYPE`'s `FLOAT: 'number'` stays as the default for brand-new/unmatched variables (comment updated to note `FLOAT` is now non-bijective too, resolved the same way `STRING` is — via `deriveValue`'s `referenceToken` hint, not a lookup table).
- `figma-pull.ts`'s `deriveValue`: extend the existing `(expectedType === 'fontWeight' || expectedType === 'fontFamily') && dtcgType === 'string'` hint check to also cover `expectedType === 'dimension' && dtcgType === 'number'`. New branch:
  ```ts
  if (dtcgType === 'dimension') {
    const unit = isPlainObject(referenceToken?.rawValue) && (referenceToken!.rawValue as { unit?: string }).unit
    const num = typeof modeValue === 'number' ? modeValue : NaN
    if (Number.isNaN(num) || (unit !== 'px' && unit !== 'rem')) {
      return { kind: 'unsupported', reason: `Dimension value "${String(modeValue)}" or its local unit is invalid — skipped.` }
    }
    return { kind: 'literal', type: dtcgType, rawValue: { value: unit === 'rem' ? num / 16 : num, unit } }
  }
  ```
  (`isPlainObject` — reuse or inline a small check; `referenceToken.rawValue` for a dimension token is always `{value, unit}` once matched, same shape assumption `fontFamily`'s branch makes about arrays.)
- No call-site signature changes needed — `deriveValue` already takes `referenceToken` (the fontFamily work generalized it beyond fontWeight's original `expectedType: string`).

## 6. Toky editor — number + unit Select

`apps/toky/app/token-editor.tsx`:

- `TOKEN_TYPE_ICON.dimension = HashIcon` (reuse — still fundamentally a number).
- `DIMENSION_UNIT_OPTIONS: { value: 'px' | 'rem'; label: string }[]` — just the two DTCG-legal units, fixed, like `FONT_WEIGHT_OPTIONS`.
- `getEditableValueText`: for `type === 'dimension'`, return just the numeric part as text (`String(rawValue.value)`) — the unit renders in its own adjacent `<Select>`, not blended into the same text field.
- New draft-state concern, resolved as follows: the number half reuses the existing `valueDraftText`/`onValueChange`/`onValueBlur` → `commitValueText` → `parseEditableValue('dimension', text, previous)` pipeline unchanged — `previous` (the token's currently-committed `rawValue`) supplies the *current* unit, so typing a new number preserves whatever unit was already set (mirrors how color's `previous` supplies colorSpace/alpha). The unit `<Select>` is a genuinely separate action: a new `onDimensionUnitChange(id, unit)` handler / `commitDimensionUnit` function reads whatever number is currently live (an in-progress unblurred edit takes precedence over the last-committed value), converts it (×16/÷16, decision #6), and commits the whole `{value, unit}` object directly — bypassing `parseEditableValue` entirely, since a unit pick isn't text entry.
- Brand-override cell: same compound editor and the same `commitDimensionUnit`-shaped brand-scoped mirror (`commitBrandDimensionUnit`), matching how `fontWeight`'s `<Select>` was duplicated into the brand cell branch.
- `validate.ts`: no new rule needed — the unit `<Select>` structurally can't produce anything outside `px`/`rem`, same reasoning as `fontWeight`.

## Addendum — Style Dictionary's built-in size transforms fight ours, and one of them is wrong

Verifying the real `dist/` output (the lesson from `fontFamily`'s double-quoting bug — never trust a plan's prediction here without checking) turned up something worse than a redundant transform:

- SD's built-in `size/rem` transform (`filter: isDimension(token) || isFontSize(token)`, i.e. `token.$type === 'dimension'`) is part of the `css`/`scss`/`js` transformGroups. Its logic (`getTokenDimensionValue` → if the value has an explicit unit, return `${value}${unit}`) happens to be **exactly correct** for our `{value, unit}` shape — it preserves whichever unit we set, doesn't force one. So `css`, `scss`, and `javascript` platforms need **no `ds/dimension` registration at all** — adding it would double-process an already-correct value (the `fontFamily` trap again). Verified: `--ds-global-dimension-space-24: 1.5rem` and `--ds-global-dimension-radius-3: 9999px` are both correct straight out of the built-in.
- SD's built-in `size/px` transform is part of the `web` transformGroup (used by `config.base.ts`'s `web`/`docs` platforms) — and it's **wrong** for our data: it unconditionally appends `"px"` to the number **without converting it**. A `{value: 1.5, unit: 'rem'}` token came out `"1.5px"` — both the wrong unit label and, worse, physically 24× smaller than the actual 1.5rem it was supposed to represent. This is not "redundant but harmless" like `fontFamily`'s case — it's a silent correctness bug that would have shipped straight to `dist/web/base.tokens.json` and `dist/docs/base.tokens.json`.
- **First fix attempted and abandoned**: registering our own transform under the *same name* (`size/px`) to override Style Dictionary's built-in, scoped by `filter: token => token.$type === 'dimension'`. `Register.js`'s `registerTransform` does call `deleteExistingHook` before re-registering, so this should work in principle — but empirically it didn't take effect; the wrong `"1.5px"` output persisted. Most likely explanation: `new StyleDictionary(config)` re-establishes its own built-in transform registrations at instance-construction time, *after* this module's `registerCustomTransformers(StyleDictionary)` runs against the static class — but this wasn't traced to a definitive line in Style Dictionary's source, so treat it as an empirical finding, not a proven mechanism. Don't retry this approach without first confirming *why* it didn't work.
- **Fix that shipped**: `config.base.ts`'s `web`/`docs` platforms drop `transformGroup: 'web'` entirely and list their transforms explicitly — `attribute/cti`, `name/kebab`, `color/css` (the `web` transformGroup's other three members, copied verbatim so nothing else about these platforms' output changes) plus this repo's own transforms, with `size/px` simply omitted and `ds/dimension` added in its place. Confirmed no regression: `token.attributes.{category,type,item,subitem}` (which `attribute/cti` populates, and which `docs`'s full-metadata JSON format includes per-token) is still present; color/fontWeight/fontFamily output is byte-identical to before this change.
- `config.brand.ts`'s `css` platform has no `transformGroup` at all (explicit `transforms:` only, always did) — it always needed `ds/dimension` explicitly, unaffected by any of the above.

Net result: `ds/dimension` is registered in exactly two places — `config.base.ts`'s `web`/`docs` platforms, and `config.brand.ts`'s `css` platform. `css`/`scss`/`javascript` rely on Style Dictionary's own (correctly-behaving, for our shape) `size/rem`.

## 7. Tests to add/update

- `packages/tokens` / `apps/toky/src/tokens/css-preview.test.ts`: `dimensionValueToCss`/`resolvedValueToCss` cases for both units, and a case confirming `numberValueToCssSize` no longer special-cases px/9999 (a `LineHeight`-path number still rounds to 1 decimal; nothing else does anything but pass through).
- `scripts/figma-sync/test/write.test.ts`: `figmaValueFor('dimension', {value: 1.5, unit: 'rem'})` → `24`; `figmaValueFor('dimension', {value: 769, unit: 'px'})` → `769`; `resolvedTypeFor('dimension') === 'FLOAT'`.
- `apps/toky/src/tokens/figma-pull.test.ts`: the same three-test shape used for `fontWeight`/`fontFamily` — (a) a matched rem-unit dimension token round-trips cleanly when Figma's px value already matches (`1.5rem` vs Figma `24` → no false-positive update); (b) a changed Figma px value converts back to the correct rem number; (c) a matched px-unit dimension token (e.g. a Breakpoint) passes through with no /16 conversion.
- `apps/toky/src/tokens/validate.test.ts`: no new case required.
- Manual Toky smoke test: editing a Global dimension token's number, then switching its unit, produces the auto-converted value in the diff/preview.

## 8. Build verification

Given the scale (400+ tokens across 5 platforms), diffing `dist/` output before/after is the real acceptance test, not just unit tests on the helper functions — same lesson as the `fontFamily` double-quoting bug, which only a real `pnpm build` + `grep`/diff caught:

```bash
pnpm --filter @baloise/ds-tokens build
git diff packages/tokens/dist/  # should be empty if this migration is truly value-preserving
```

(`dist/` is gitignored — use a stashed pre-migration build or a manual side-by-side diff instead of relying on `git diff` directly; the point is: compare, don't assume.)

## Files touched

- `packages/tokens/tokens/Base.tokens.json` — 368 leaves retyped across Global/Alias/Component (69 stayed `number`; `Container.Full` stayed `string`)
- `packages/tokens/src/css-value.ts` — `dimensionValueToCss`, `resolvedValueToCss` branch, `numberValueToCssSize`/`PIXEL_PATH_MARKERS` cleanup
- `packages/tokens/src/transformers.ts` — new `ds/dimension` transform
- `packages/tokens/src/config.base.ts` — `web`/`docs` platforms restructured off `transformGroup: 'web'` (see Addendum); `css`/`scss` untouched (no `ds/dimension` needed)
- `packages/tokens/src/config.brand.ts` — `ds/dimension` added to the `css` platform's explicit transforms
- `scripts/figma-sync/lib/figma-value.mjs` — `RESOLVED_TYPE_BY_DTCG_TYPE` + `figmaValueFor` case + `PX_PER_REM`
- `apps/toky/src/tokens/figma-map.ts` — comment update (FLOAT is now non-bijective too)
- `apps/toky/src/tokens/figma-pull.ts` — `deriveValue`'s dimension branch, `PX_PER_REM`
- `apps/toky/app/token-editor.tsx` — `DimensionValue`/`isDimensionValue`, `TOKEN_TYPE_ICON`, `DIMENSION_UNIT_OPTIONS`, `convertDimensionUnit`, `getEditableValueText`/`parseEditableValue` plumbing, `commitDimensionUnit`/`commitBrandDimensionUnit`, base + brand-override cell render branches
- Test files per §7
