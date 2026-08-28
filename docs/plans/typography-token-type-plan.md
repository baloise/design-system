# `typography` design token type

## Context

[DTCG](https://www.designtokens.org/tr/drafts/format/#typography) defines a `typography` composite token `$type`: `$value` is a flat object with `fontFamily` (string or array of strings), `fontSize` (dimension), `fontWeight` (number or string alias), `lineHeight` (unitless number), and optionally `letterSpacing` (dimension). No array/multi-layer case exists (unlike `shadow`).

This codebase already has independent primitives for four of the five sub-properties: `🌐 Global.🔤 Font.{Size,Family,Weight,LineHeight}`, mirrored at `🔗 Alias.🔤 Text.{Size,Family,Weight,LineHeight}`. There is **no `letterSpacing` primitive or usage anywhere**. Unlike `border`'s `Color`/`Width`, which sit as literal siblings inside the same parent object at real reference sites (giving `border` a clean "audit existing co-occurring siblings" pilot set — see `border-token-type-plan.md` decision 3), typography's sub-properties don't co-occur as flat siblings anywhere today: `Component.Heading.{1..5}.Size` is **responsive** (separate `Mobile`/`Tablet`/`Desktop` dimension tokens per heading level), while `Font Family`/`Font Weight`/`LineHeight` are single values shared across all breakpoints and all 5 heading levels. DTCG's `fontSize` is a single dimension, not a 3-way breakpoint set — so there is no existing non-responsive pairing to compute a pilot set from the way `border` did.

This plan is scoped to introducing the `$type: "typography"` composite type itself — schema, Style Dictionary transform, Toky create/edit support (including brand overrides), and Figma sync (push + pull) — **without creating any actual `Typography.*` composite tokens in `Base.tokens.json`**, and **without migrating any component** (e.g. Heading) onto it. Both are explicit follow-up work once a real component migration decides how to handle the responsive-size question this plan deliberately leaves open.

## Decisions locked in with the user

1. **Purely additive.** Existing `Font.*`/`Text.*` primitives and every current reference to them stay completely untouched. Nothing existing is renamed, retyped, or rewired — same as `border` decision 1.
2. **4 required DTCG fields only — `letterSpacing` is dropped for this pass.** No `Font.LetterSpacing.*` primitive is invented; there's no existing usage to base default values on (unlike the other four fields, which already have real primitives with real values in use). The type's schema/validation/Toky UI should leave `letterSpacing` easy to add later without a breaking change, but no code paths handle it now.
3. **No pilot `Typography.*` composite tokens are created in `Base.tokens.json` this pass.** The type ships fully working (transform, Toky, Figma sync) but unused in the real token tree — mirrors `border`'s own explicit deferral of "which component actually adopts this." Whichever component migration goes first (most likely Heading) is the one that has to resolve the responsive-`fontSize` question described in Context; this plan doesn't pre-guess the answer.
4. **Field shape is split by field**, not uniform:
   - `fontFamily` and `fontWeight` are **forced-always-reference** — always a `{reference}` string pointing at `Font.Family.*`/`Font.Weight.*` (or `Text.Family.*`/`Text.Weight.*`), never a literal, because both are small/categorical primitive sets (`Font.Family` currently has 2 values; `Font.Weight` is a fixed 10-value keyword set already driving Toky's `FONT_WEIGHT_OPTIONS`) — the same reasoning as `border`'s always-reference `style`.
   - `fontSize` and `lineHeight` are **free literal-or-reference**, edited/detached exactly like `border`'s `width`/`color` — open-ended numeric values where a one-off literal is reasonable.
   - Because `fontFamily`/`fontWeight` reference small evolving sets (not a fixed CSS-spec enum like `border`'s 9 style keywords), Toky does **not** get a new hardcoded `<Select>` for them — they reuse the existing generic `renderReferenceSearch` popover already used for every other reference field in the editor.
5. **CSS output is 4 longhand custom properties per token**, not a `font` shorthand — e.g. `--ds-typography-<name>-font-family`, `--ds-typography-<name>-font-size`, `--ds-typography-<name>-font-weight`, `--ds-typography-<name>-line-height`. Matches how components already consume these individually (`heading.style.scss` sets `font-family`/`font-weight`/`font-size`/`line-height` as separate declarations, never the `font` shorthand, which resets `font-variant`/`font-stretch` and can't express `letter-spacing`).
6. **Figma sync stays simple, mirroring `border`'s fan-out**: each typography token gets 4 Figma Variables — `.../FontFamily` (`STRING`), `.../FontSize` (`FLOAT`), `.../FontWeight` (`STRING` — same DTCG-fontWeight→Figma-STRING projection `Font.Weight.*` primitives already use), `.../LineHeight` (`FLOAT`). `$extensions.com.figma.variableId` becomes a `{fontFamily, fontSize, fontWeight, lineHeight}` object of 4 variableId strings. Even though `fontFamily`/`fontWeight` are always references locally, Figma still gets the **resolved literal value** pushed per sub-variable (not a Figma-native variable alias to the primitive's own variable) — same precedent as `border`'s `style` field, which syncs as a literal `STRING` keyword despite always being a reference in `Base.tokens.json`.
7. **Both push and pull are built now**, not push-only. Pull (`deriveTypographyPullEntries`, mirroring the already-*implemented* `deriveShadowPullEntries` — a better real-code template than `border`'s pull, which is comparatively schematic) can't be exercised end-to-end without at least one real Global-layer typography token existing, so it ships verified primarily by unit tests against synthetic Figma variable payloads; manual end-to-end verification happens by temporarily adding one throwaway token during implementation (see §8), not by keeping a permanent pilot token (decision 3).
8. **Brand-level override is in scope**, not deferred like `border`'s Global-only restriction (`border` decision 8). `config.brand.ts`'s `css` platform gains `ds/typography` in its `transforms` list, alongside the `ds/shadow` entry already there (confirming `shadow` already supports brand overrides today — `border` is the outlier that doesn't, not the norm). This means Toky's editor needs a brand-override cell for typography (the `TokenRowBrandInfo`/`EditBrandDraft`/`onBrandTypographyChange` machinery already built for shadow/color/dimension), which `border` explicitly skipped — real additional phase-1 UI scope, not just a config change.
9. **Brand override grain is whole-token only**, matching every other type's brand-override model in this codebase (one `rawValue` swap per token — color/dimension/shadow all work this way already). A brand either fully inherits a typography token from Base or overrides all 4 fields together as one new composite value. No per-sub-field partial override, no 3-way merge model.
10. **No whole-token reference for the *base* typography token beyond what decision 9 already implies for brands** — i.e. like `shadow`, a typography token (Base or brand) *can* itself be a reference to another whole typography token (mode toggle: "Typography" / "Reference", exactly mirroring `shadow`'s row/brand-cell popover — see `token-editor.tsx:1697-1757` for the shadow brand-cell template). This is distinct from decision 4's *sub-field* references — decision 4 is about what `fontFamily`/`fontWeight` point to *inside* a literal typography value; this decision is about the token's own `referenceTarget`, same concept `shadow`/`color` already have at top level.

## 1. `packages/tokens/tokens/Base.tokens.json`

- **No changes.** No `Typography.*` group, no new primitives (per decisions 2 and 3). The 4 existing `Font.*`/`Text.*` primitive groups this type will reference are already in place.

## 2. `packages/tokens/src/css-value.ts`

Add, alongside `shadowValueToCss`/`borderValueToCss` (`css-value.ts:147,181`):

```ts
interface DtcgTypographyValue {
  fontFamily: unknown // resolved string[] (reference already followed by Style Dictionary/Toky before this runs)
  fontSize: unknown // resolved DTCG dimension value
  fontWeight: unknown // resolved number
  lineHeight: unknown // resolved number
}

// Unlike shadowValueToCss/borderValueToCss, this doesn't return one shorthand string — decision 5
// needs 4 separate custom properties. Returns null (not a partial object) if any field is
// unresolvable, so a malformed token doesn't half-render.
export const typographyValueToCss = (
  value: unknown,
): { fontFamily: string; fontSize: string; fontWeight: string; lineHeight: string } | null => {
  if (typeof value !== 'object' || value === null) return null
  const { fontFamily, fontSize, fontWeight, lineHeight } = value as DtcgTypographyValue
  const cssFontFamily = fontFamilyValueToCss(fontFamily) // reuse existing fontFamily formatter
  const cssFontSize = dimensionValueToCss(fontSize)
  if (cssFontFamily === null || cssFontSize === null || typeof fontWeight !== 'number' || typeof lineHeight !== 'number')
    return null
  return { fontFamily: cssFontFamily, fontSize: cssFontSize, fontWeight: String(fontWeight), lineHeight: String(lineHeight) }
}
```

- Check the exact name of the existing `fontFamily`-type CSS formatter (used today for standalone `Font.Family.*` tokens) and reuse it verbatim — do not hand-roll a second implementation.
- Add a `type === 'typography'` branch to `resolvedValueToCss` (`css-value.ts:197`) for Toky's live preview — but note `resolvedValueToCss` returns a single `string | null` today; typography needs to return 4 values, so either this function's return type has to widen (a breaking change for every other caller) or Toky's preview needs a dedicated `typographyValueToCss` call site instead of going through `resolvedValueToCss`. **Decide this during implementation by reading every `resolvedValueToCss` call site first** — don't guess.

## 3. `packages/tokens/src/transformers.ts`

```ts
sd.registerTransform({
  type: `value`,
  transitive: true,
  name: `ds/typography`,
  filter: token => token.$type === 'typography',
  transform: token => typographyValueToCss(token.$value ?? token.value),
})
```

Style Dictionary transforms return one value per token, not 4 — so unlike `ds/border`/`ds/shadow`, `ds/typography` likely needs to run as a token-splitting step (Style Dictionary's `filter`+custom formatter, not a value transform) or the transform needs to emit a single composite string that a custom **format** (not transform) explodes into 4 declarations at file-write time. **Resolve this by reading how the existing `css/variables` (or equivalent) format handles multi-value tokens, if any precedent exists in this config, before writing new formatter code** — this is new territory decision 5 introduces that neither `shadow` nor `border` needed (both emit exactly one CSS value per token).

## 4. `packages/tokens/src/config.base.ts` + `config.brand.ts`

- **`css`/`scss`/`web`/`docs`/`javascript`** (`config.base.ts`): append `ds/typography` to each explicit transform list, same positions as `ds/shadow`/`ds/border` (lines ~36-37, 73-74, 117-118, 145-146, 169-170).
- **`config.brand.ts`**: append `ds/typography` to the `css` platform's `transforms` list (currently has `ds/shadow` but not `ds/border` — confirms `border`'s Global-only choice was deliberate, not default behavior). This is the concrete manifestation of decision 8.
- **Verify actual `dist/` output** for every touched platform before calling this done, per the same lesson `shadow`/`border`/`fontFamily`/`dimension` each hit — build with one temporary test token (decision 7), inspect real output, then remove the test token per decision 3.

## 5. `scripts/figma-sync/lib/figma-value.mjs` — Push

New function, parallel to `figmaShadowSubValuesFor` (`figma-value.mjs:133`) and `figmaBorderSubValuesFor`:

```js
export function figmaTypographySubValuesFor(literalValue) {
  if (typeof literalValue !== 'object' || literalValue === null) return null
  const { fontFamily, fontSize, fontWeight, lineHeight } = literalValue
  if (typeof fontWeight !== 'number' && typeof fontWeight !== 'string') return null
  return {
    fontFamily: figmaValueFor('fontFamily', fontFamily),
    fontSize: figmaValueFor('dimension', fontSize),
    fontWeight: figmaValueFor('fontWeight', fontWeight),
    lineHeight: figmaValueFor('number', lineHeight),
  }
}
```

- New sub-property table, parallel to `SHADOW_SUB_PROPERTIES`/`BORDER_SUB_PROPERTIES` (`figma-value.mjs:150-151,158`): `TYPOGRAPHY_SUB_PROPERTIES = ['fontFamily', 'fontSize', 'fontWeight', 'lineHeight']`, suffix table `FontFamily`/`FontSize`/`FontWeight`/`LineHeight`, resolved-type table `STRING`/`FLOAT`/`STRING`/`FLOAT`.
- New `isSyncableTypographyToken(token)` — no unsyncable shape exists (no multi-layer/`[]` case, per Context), so this likely just checks `token.type === 'typography'`.
- `write.mjs`: the existing fan-out branch at `write.mjs:248,292` is a **binary ternary** (`'offsetX' in variableId ? SHADOW_SUB_PROPERTIES : BORDER_SUB_PROPERTIES`) — this breaks with a 3rd composite type. Both call sites need to become a proper lookup (e.g. keyed off which known sub-property name is present in the `variableId` object, or an explicit `type` tag stored alongside it) before typography's fan-out can be added. Fix this structurally, don't bolt on a 3-way ternary.

## 6. `apps/toky/src/tokens/figma-map.ts` + `figma-pull.ts` — Pull

- New `deriveTypographyPullEntries(params)`, parallel to the **implemented** `deriveShadowPullEntries` (`figma-pull.ts:333`, using `SHADOW_SUB_PROPERTIES` at lines 279/288/294/352/365) — closer template than border's (schematic-only) pull description:
  1. Reverse-index every local typography token's 4 stored variableIds → `{tokenPath, subProperty}`.
  2. Group fetched Figma variables by `tokenPath`; a token is "fully matched" once all 4 sub-ids are found (mirrors shadow's `allFound`/`missing` checks at `figma-pull.ts:365`).
  3. Reconstruct `{fontFamily, fontSize, fontWeight, lineHeight}` per decision 4's forced-reference rule for `fontFamily`/`fontWeight`: resolve each back to a `{reference}` string by matching the fetched Figma `STRING` value against the known `Font.Family.*`/`Font.Weight.*` primitive value set (same "match against known keyword set, flag unmatched rather than silently coerce" discipline as `border`'s `style` pull, decision 11's test list).
  4. Diff against the local token; called from `buildBasePullPlan` **and** whichever brand pull path already handles shadow brand pulls (decision 8 — this is not Global-only).
- Given decision 3 (no pilot tokens exist), this path has no real data to match against until a token exists — verified by unit tests against synthetic payloads plus the temporary token from §4/§8, same caveat as decision 7.

## 7. Toky editor — `apps/toky/app/token-editor.tsx`

- `TOKEN_TYPE_ICON.typography` — new icon, distinct from the one `string`/`fontFamily` already share (`TypeIcon`).
- `Draft` interface gains a `typographyValue: { fontFamily: string; fontSize: string; fontWeight: string; lineHeight: string }`-shaped field (2 reference strings + 2 literal-or-reference strings — actual shape depends on how `fontSize`/`lineHeight`'s literal-vs-reference toggle is represented; likely needs its own small `mode` per field, unlike `border`'s `BorderValue` which has no per-field mode). Design this struct to make decision 4's split explicit: `fontFamily`/`fontWeight` are bare reference strings; `fontSize`/`lineHeight` need a value **and** an optional reference, like the top-level `Draft.value`/`Draft.referenceTarget` pair already does.
- New `DraftTypographyEditor` component (mirrors the new `DraftBorderEditor` added for the border pass): 4 fields —
  - `fontFamily`: `renderReferenceSearch` only, no literal mode (decision 4).
  - `fontSize`: reuses `ShadowDimensionField` for the literal case, plus a way to switch to `renderReferenceSearch` (mirrors how the top-level dimension type already offers a reference popover via the hexagon-icon button next to plain dimension cells — see the non-color/shadow/border branch around `token-editor.tsx:4672-4714`).
  - `fontWeight`: `renderReferenceSearch` only, no literal mode.
  - `lineHeight`: plain numeric `Input` for the literal case, plus the same reference-popover pattern as `fontSize`.
- **Row rendering**: new `token.type === 'typography'` branch in `TokenRow`, mirroring the `shadow` branch (`token-editor.tsx:1205-1260`) exactly — including the value/reference mode toggle at the top level (decision 10), not the reference-only pattern `border` uses.
- **Brand cell**: new `brandToken.type === 'typography'` branch, mirroring the `shadow` brand-cell template at `token-editor.tsx:1697-1757` — whole-token value/reference toggle (decision 10), `onBrandTypographyChange` handler (parallel to `onBrandShadowChange`), whole-value swap only (decision 9, no per-field brand overrides).
- `EditDraftState`/`EditBrandDraft` gain the equivalent typography fields for the Edit-token dialog, mirroring how shadow's edit-dialog state already works.
- `getEditableValueText`/`parseEditableValue`: no `'typography'` branch, same reasoning as `shadow`/`border` — the popup manages its own draft state directly.
- `validate.ts`: no new rule beyond existing emptiness checks, consistent with `border`'s lax pattern (Create button only gates on the name field being valid, same laxness for shadow/border's own sub-fields today).

## 8. Tests to add/update

- `css-value.test.ts`: `typographyValueToCss` — correct 4-value output; `null` for a malformed value (missing sub-value, non-number `fontWeight`/`lineHeight`).
- `figma-sync`: `figmaTypographySubValuesFor` — correct 4 sub-values; `null` for malformed input. Update the `write.mjs` fan-out tests to cover 3 composite types instead of 2 (catches the ternary-to-lookup fix from §5).
- `figma-pull.test.ts`: `deriveTypographyPullEntries`-shaped tests, mirroring the real `deriveShadowPullEntries` test cases — full match no-op, single-sub-property change merges correctly, incomplete match (fewer than 4 ids present) doesn't half-apply, an unmatched `fontFamily`/`fontWeight` `STRING` value (doesn't match any known primitive) is flagged not silently coerced.
- **Manual verification** (per decision 7): temporarily add one `Global`-layer and one brand-override typography token to `Base.tokens.json`/a brand file during implementation, run the full `css`/`scss`/`web`/`docs`/`javascript` builds, inspect real `dist/` output, exercise Toky's create/edit/brand-override UI against it, run a real Figma push+pull round trip — then **remove the temporary token** before merging, per decision 3.

## Files touched

- `packages/tokens/src/css-value.ts` — `typographyValueToCss` + `resolvedValueToCss` handling (return-type question flagged in §2)
- `packages/tokens/src/transformers.ts` — new `ds/typography` transform (mechanism TBD per §3)
- `packages/tokens/src/config.base.ts` — `css`/`scss`/`web`/`docs`/`javascript` all gain `ds/typography`
- `packages/tokens/src/config.brand.ts` — `css` platform gains `ds/typography` (decision 8 — the one config file `border` explicitly left untouched)
- `scripts/figma-sync/lib/figma-value.mjs` — `figmaTypographySubValuesFor`, `isSyncableTypographyToken`, `TYPOGRAPHY_SUB_PROPERTIES` + suffix/resolved-type tables
- `scripts/figma-sync/lib/write.mjs` — fan-out to 4 variables per typography token; fix the binary shadow/border ternary to a proper 3-way lookup
- `apps/toky/src/tokens/figma-pull.ts` — new `deriveTypographyPullEntries`, wired into both Base and brand pull plans (decision 8)
- `apps/toky/app/token-editor.tsx` — `TOKEN_TYPE_ICON`, `Draft`/`EditDraftState`/`EditBrandDraft` typography fields, `DraftTypographyEditor`, row + brand-cell render branches, brand change handlers
- Test files per §8
- `packages/tokens/CONTEXT.md` — short addition documenting the new `typography` type and its no-pilot-tokens scope

## Explicitly out of scope for this pass

- Any `Typography.*` composite token actually committed to `Base.tokens.json` or a brand file (decision 3) — including migrating Heading or any other component onto the type.
- `letterSpacing` support anywhere in the pipeline (decision 2).
- Per-sub-field brand overrides (decision 9) — brand override is whole-token only.
- Resolving how a future responsive typography token would represent `fontSize` (Context) — left to whichever component migration goes first.
