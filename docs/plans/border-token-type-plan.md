# `border` design token type

## Context

[DTCG](https://www.designtokens.org/tr/drafts/format/#border) defines a `border` token `$type`: `$value` is an object with `color` (a DTCG color value/reference), `width` (a DTCG dimension value/reference), and `style` (a string — `solid`, `dashed`, `dotted`, `double`, `groove`, `ridge`, `inset`, `outset`, `none`, or a DTCG `strokeStyle` reference for dash-array line styles, which this plan does not use).

Unlike the `shadow` migration (`docs/plans/shadow-token-type-plan.md` — the direct template for this plan), border does **not** start life as a hand-authored shorthand string. Today `🌐 Global.▭ Border` already holds two separate primitive groups, each individually referenced from Alias/Component layers:

- `▭ Border.Color.*` — ~35 colors (`White`, `Base`, `Inverted`, `Disabled`, `Primary`/`PrimaryHover`/`PrimaryActive`, per-status variants for `Info`/`Success`/`Warning`/`Danger`, per-hue variants for `Green`/`Purple`/`Red`/`Yellow`, …), each `$type: "color"`.
- `▭ Border.Width.*` — `None` (0), `Base`, `MD`, each `$type: "dimension"`.
- No `style` token exists anywhere — border-style is presumably hardcoded `solid` in component SCSS today.
- Hundreds of Alias/Component leaves reference `Border.Color.*` (a "Border" leaf) and, in some places, a separate `Width`-suffixed leaf referencing `Border.Width.*`, but color and width are always two independent tokens, never bundled.

This plan is scoped to introducing the `$type: "border"` composite type itself, alongside these untouched primitives — **not** migrating any component to use it. That's explicit follow-up work, done component by component later (per the user's own scoping).

## Decisions locked in with the user

1. **Additive only — existing `Border.Color.*`/`Border.Width.*` primitives and every current Alias/Component reference to them stay completely untouched.** New composite `$type: "border"` tokens are added alongside them, not built by restructuring the primitive groups. Nothing existing is renamed, retyped, or rewired.
2. **A new `▭ Border.Style.*` primitive/alias group is introduced**, one token per CSS `border-style` keyword: `None`, `Solid`, `Dashed`, `Dotted`, `Double`, `Groove`, `Ridge`, `Inset`, `Outset` (each `$type: "string"`, `$value` the literal keyword). This exists specifically so composite border tokens have something to reference for `style` (decision 4) and so Toky's style picker (decision 6) has real tokens to enumerate.
3. **Composite border tokens are a minimal pilot set**, not a full cross-product. Only combinations of `Color`/`Width`/`Style` that already occur together at a real reference site in `Base.tokens.json` today get a composite token. Determining this set is an implementation-time audit, not a spec written by hand here — before writing the migration, script a scan of every Alias/Component subtree that has both a `Border`-suffixed leaf (referencing `Border.Color.*`) and a `Width`-suffixed sibling leaf (referencing `Border.Width.*`) in the same parent object, collect the distinct `(color, width)` pairs found, and pair each with `Style.Solid` (the only style value in observed use, per decision 1's "hardcoded solid" assumption — confirm this holds for every pilot pair found, and flag any exception for the user rather than guessing a different style). This mirrors the `shadow` plan's "compute exact values by running the parser against real strings — don't hand-transcribe" discipline.
4. **`$value.style` is a reference string**, not a resolved literal — e.g. `"style": "{🔗 Alias.▭ Border.Style.Solid}"`, consistent with how every other alias-layer field in this file references its primitive rather than inlining it. This differs from `shadow`'s sub-values (`color`/`offsetX`/etc.), which are always *resolved* objects/numbers, never reference strings — border's `style` is the first composite sub-value in this codebase to be a reference. Style Dictionary's reference resolution walks nested object values regardless of depth, so this is expected to resolve correctly at build time same as any other reference; **verify this explicitly** (see §6) since it's an untested path.
5. **Shape**: a composite border token's `$value` is always a single flat object `{color, width, style}` — no array/multi-layer case (border has no DTCG concept of "stacked borders" the way shadow does).
6. **CSS output**: a single shorthand custom property per composite token, e.g. `--ds-border-x: 0.125rem solid #d8d8d8;`, directly usable as `border: var(--ds-border-x);`. Style Dictionary ships a built-in `border/css/shorthand` transform, already present (currently inert) in `config.base.ts`'s `css`/`scss` explicit transform lists (`packages/tokens/src/config.base.ts:29,66`) — **verify its actual rendered output matches this repo's color/dimension conventions before relying on it** (the same check that revealed `shadow/css/shorthand`'s built-in didn't match, per `shadow-token-type-plan.md` decision 1). If the built-in's output diverges (e.g. different color format, or it can't resolve the nested `style` reference), write a custom `ds/border` transform mirroring `ds/shadow`, reusing `colorValueToCss`/`dimensionValueToCss` and resolving the `style` reference to its literal keyword.
7. **Location in `Base.tokens.json`**: new tokens live under `🌐 Global.▭ Border.Composite.*` (the composite pilot tokens) and `🌐 Global.▭ Border.Style.*` (the new style primitives) — siblings of the existing `Color`/`Width` groups in the same `▭ Border` parent, not a new top-level group.
8. **Global/Base layer only.** All pilot composite tokens are added at `Global` scope; none at brand-override (`Tcs.tokens.json`) level in this pass. `config.brand.ts` is **not** touched — only `config.base.ts` (`css`/`scss`/`web`/`docs`) and `config.base.ts`'s `javascript` platform gain the new transform (if a custom one is needed per decision 6).
9. **Toky editor**: a popup (mirrors shadow's, simpler — no layers), with a width field (reuses `ShadowDimensionField` verbatim — already generic over one `{value, unit}` field), a color field (reuses `ShadowColorField` verbatim — already generic over one color sub-value), and a **new** `<Select>` for `style` populated from the full CSS `border-style` keyword set (`none`/`solid`/`dashed`/`dotted`/`double`/`groove`/`ridge`/`inset`/`outset`) — every option always available regardless of which keywords the pilot set actually uses, since editing should let a designer pick any valid style even before a composite token for it exists.
10. **Figma sync — full real fan-out**, mirroring shadow's pattern but with 3 sub-properties instead of 5: each composite border token gets 3 Figma Variables — `.../BorderColor` (`COLOR`), `.../BorderWidth` (`FLOAT`), `.../BorderStyle` (`STRING`). `$extensions.com.figma.variableId` becomes an object `{color, width, style}` of 3 variableId strings, same convention as shadow's object-of-5. `style` syncs as a Figma `STRING` variable holding the literal keyword (`"solid"`, etc.) even though Figma's own canvas has no native way to *bind* a stroke's dash pattern to a variable — the variable still round-trips as data, same spirit as shadow's `inset` field being outside Figma's bindable-fields set but the rest of the shadow still syncing.
11. **Figma pull is Base-layer only**, no brand/Tcs override support — same scope limit as shadow's pull, and consistent with decision 8 (no brand-level composite tokens exist to pull anyway in this pass).

## 1. `packages/tokens/tokens/Base.tokens.json`

- Add `🌐 Global.▭ Border.Style.*`: one `$type: "string"` leaf per CSS `border-style` keyword (`None`, `Solid`, `Dashed`, `Dotted`, `Double`, `Groove`, `Ridge`, `Inset`, `Outset`), `$value` the lowercase CSS keyword.
- Run the audit script from decision 3 to enumerate the pilot `(color, width)` pairs currently used together.
- Add `🌐 Global.▭ Border.Composite.*`: one `$type: "border"` token per pilot pair, `$value`:
  ```json
  {
    "color": "{🌐 Global.▭ Border.Color.<X>}",
    "width": "{🌐 Global.▭ Border.Width.<Y>}",
    "style": "{🌐 Global.▭ Border.Style.Solid}"
  }
  ```
  Name each composite token after the color/width combination it represents (e.g. `Composite.Primary` for `Color.Primary` + `Width.Base`), following this file's existing naming convention for the group it's paired with.
- No existing tokens are edited — this is a pure addition.

## 2. `packages/tokens/src/css-value.ts`

Add, alongside `shadowValueToCss`:

```ts
interface DtcgBorderValue {
  color: unknown // DTCG color value
  width: unknown // DTCG dimension value
  style: unknown // resolved string keyword (reference already followed by Style Dictionary/Toky before this runs)
}

export const borderValueToCss = (value: unknown): string | null => {
  if (typeof value !== 'object' || value === null) return null
  const { color, width, style } = value as DtcgBorderValue
  const cssColor = colorValueToCss(color)
  const cssWidth = dimensionValueToCss(width)
  if (cssColor === null || cssWidth === null || typeof style !== 'string') return null
  return `${cssWidth} ${style} ${cssColor}`
}
```

Only write this if decision 6's verification shows the built-in `border/css/shorthand` transform doesn't already produce correct output. Add a `type === 'border'` branch to `resolvedValueToCss`, before the `'string'` branch (mirrors `shadow`), for Toky's live preview to use regardless of which transform path CSS build ends up using.

## 3. `packages/tokens/src/transformers.ts`

If a custom transform is needed (decision 6):

```ts
sd.registerTransform({
  type: `value`,
  transitive: true,
  name: `ds/border`,
  filter: token => token.$type === 'border',
  transform: token => borderValueToCss(token.$value ?? token.value),
})
```

## 4. `packages/tokens/src/config.base.ts`

- **`css`/`scss`**: `border/css/shorthand` is already in the explicit transform list (lines 29 and 66) — no change needed there. If decision 6's verification finds it produces wrong output, swap it for `ds/border` the same way `shadow/css/shorthand` was swapped for `ds/shadow`.
- **`web`/`docs`**: append `ds/border` to the explicit transform list (only if a custom transform is needed — these platforms have no built-in border transform to begin with, since they don't use `transformGroup`).
- **`javascript`**: append `ds/border` to the explicit `transforms` list (only if a custom transform is needed).
- **`config.brand.ts`**: **not touched** (decision 8).

**Verify the actual `dist/` output for every touched platform directly** before calling this done — build, then inspect the real `--ds-*-border-composite-*` custom properties (and the `web`/`docs`/`js` equivalents), not just the transform logic in isolation. This is the same lesson `shadow`, `fontFamily`, and `dimension` each hit.

## 5. `scripts/figma-sync/lib/figma-value.mjs` — Push

New function, parallel to `figmaShadowSubValuesFor` (`figma-value.mjs:131`):

```js
// Returns the 3 Figma-ready sub-values for a border token, or null if any sub-value is
// unresolvable. Unlike shadow, there is no array/multi-layer case to filter out first.
export function figmaBorderSubValuesFor(literalValue) {
  if (typeof literalValue !== 'object' || literalValue === null) return null
  const { color, width, style } = literalValue
  if (typeof style !== 'string') return null
  return {
    color: figmaValueFor('color', color),
    width: figmaValueFor('dimension', width),
    style: { type: 'STRING', value: style },
  }
}
```

- New sub-property suffix table, parallel to shadow's (`figma-value.mjs:145`): `BorderColor` (`COLOR`), `BorderWidth` (`FLOAT`), `BorderStyle` (`STRING`) — naming convention `🌐 Global/▭ Border/Composite/<Name>/BorderColor`, `.../BorderWidth`, `.../BorderStyle`.
- New `isSyncableBorderToken(token)` (parallel to `isSyncableShadowToken`, `figma-value.mjs:167`) — since border has no unsyncable shape (no multi-layer/`[]` case), this likely just checks `token.type === 'border'`.
- `write.mjs`: same fan-out treatment shadow required — `assignVariableIds`/`buildCreatePassPayload`/`buildAliasPassPayload` need a border-specific branch creating 3 named sub-variables instead of 1 per token, storing the 3 resulting ids back into `$extensions.com.figma.variableId` as a `{color, width, style}` object.

## 6. `apps/toky/src/tokens/figma-map.ts` + `figma-pull.ts` — Pull

- New `deriveBorderPullEntries(figmaMeta, baseIndex, baseModeId)`, parallel to shadow's `deriveShadowPullEntries` (`docs/plans/shadow-token-type-plan.md` §6):
  1. Build a reverse index: for every local `Global`-level border composite token with a `variableId` object, map each of its 3 stored ids → `{tokenPath, subProperty}`.
  2. Group fetched Figma variables by `tokenPath`; a token is "fully matched" once all 3 of its sub-ids are found.
  3. For each fully-matched group, reconstruct `{color, width, style}` (converting the width sub-value's px float back to rem, resolving `style`'s Figma `STRING` value back to a `{🔗 Alias.▭ Border.Style.<Keyword>}` reference by matching the string against the known `Style.*` keyword set) and diff against the local token.
  4. Any Figma variable matching the `BorderColor`/`BorderWidth`/`BorderStyle` suffix convention but absent from the reverse index is left for a human — no auto-create, same "new token definitions originate in code" precedent as shadow.
- Called as an additional step in `buildBasePullPlan`, **Base-layer only** (decision 11) — same restriction as shadow's pull.

## 7. Toky editor — border popup

`apps/toky/app/token-editor.tsx`:

- `TOKEN_TYPE_ICON.border` — new icon import (nothing existing fits; a border/square-dashed-style icon).
- Value cell for a literal border token: trigger button (mirrors color's/shadow's `PopoverTrigger` pattern) showing a short summary (e.g. `"0.125rem solid"`) that opens a `PopoverContent` containing the border editor.
- Border editor: a width field (reuse `ShadowDimensionField`), a color field (reuse `ShadowColorField`), and a new `<Select>` for `style` listing all 9 CSS `border-style` keywords (decision 9) — no add/remove-layer machinery, since border has exactly one flat value shape.
- Brand-override cell: **not implemented in this pass** — decision 8/11 scope pilot tokens to Global only, so there's nothing at brand level to edit yet. Skip the brand-cell branch shadow's editor duplicated for every prior type.
- `getEditableValueText`/`parseEditableValue`: no `'border'` branch, same reasoning as shadow — the popup manages its own draft state directly, no plain-text fallback makes sense for a nested object.
- `validate.ts`: no new rule beyond existing emptiness checks — the popup's own fields (Select for style, existing color/dimension validation) already constrain valid input.

## 8. Tests to add/update

- `css-value.test.ts`: `borderValueToCss` (if written) — correct `<width> <style> <color>` ordering, color rendering matches `rgba(...)`/hex convention, `null` for a malformed value (missing sub-value, non-string style).
- `figma-sync`: `figmaBorderSubValuesFor` — correct 3 sub-values; `null` for a malformed value.
- `figma-pull.test.ts`: `deriveBorderPullEntries`-shaped tests — full match with no changes (no false-positive update); a single sub-property changed (e.g. only color) merges correctly; an incomplete match (fewer than 3 of a token's ids present) doesn't half-apply; a Figma `STRING` value that doesn't match any known `Style.*` keyword is treated as unmatched/flagged, not silently coerced.
- Manual Toky smoke test: opening the popup for a pilot `Border.Composite.*` token, editing width and style, confirming the diff/preview shows the right CSS shorthand.

## Files touched

- `packages/tokens/tokens/Base.tokens.json` — new `▭ Border.Style.*` group + new `▭ Border.Composite.*` pilot tokens (additive only)
- `packages/tokens/src/css-value.ts` — `borderValueToCss` (if needed) + `resolvedValueToCss` branch
- `packages/tokens/src/transformers.ts` — new `ds/border` transform (if needed)
- `packages/tokens/src/config.base.ts` — `css`/`scss` verified/swapped if needed; `web`/`docs`/`javascript` gain `ds/border` if needed
- `scripts/figma-sync/lib/figma-value.mjs` — `figmaBorderSubValuesFor`, `isSyncableBorderToken`, sub-property suffix table
- `scripts/figma-sync/lib/write.mjs` — fan-out to 3 variables per border composite token
- `apps/toky/src/tokens/figma-pull.ts` — new `deriveBorderPullEntries`, wired into `buildBasePullPlan` (Base-only)
- `apps/toky/app/token-editor.tsx` — `TOKEN_TYPE_ICON`, border popup component, Global-only value cell render branch
- Test files per §8
- `packages/tokens/CONTEXT.md` — short addition documenting the new `border` type and its pilot scope

## Explicitly out of scope for this pass

- Migrating any component to actually reference a `Border.Composite.*` token instead of separate `Color`/`Width` leaves — component-by-component follow-up, per the user's own scoping.
- Any composite border token at brand/Tcs-override level.
- A full Color × Width × Style cross-product — only pairs already in real use get a composite token.
