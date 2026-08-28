# `fontFamily` design token type

## Context

[DTCG](https://www.designtokens.org/tr/drafts/format/#font-family) defines a `fontFamily` token `$type` whose value is either a single font-name string or an array of font names "ordered from most to least preferred" — the array maps directly onto CSS's comma-separated `font-family` fallback stack. Today this repo doesn't implement that type: every Family/FontFamily token in `packages/tokens/tokens/Base.tokens.json` is `$type: "string"`, and `Global.🔤 Font.Family.Heading`/`.Body` each hold the *entire pre-formatted CSS string* by hand, e.g. `$value: "\"BaloiseCreateHeadline\", \"Arial\", \"sans-serif\""` — quotes and commas baked into one string, not an actual list.

This plan (1) splits that baked string into a real DTCG array, (2) moves quoting/joining into the build transform, (3) wires Figma push/pull (mirroring the `fontWeight` token-type work — see `docs/plans/font-weight-token-type-plan.md` — including its Pull-side "matched token's own $type as a hint" fix), and (4) lets Toky edit an array-valued token for the first time.

## Facts found while researching

- 29 Family/FontFamily leaves under `🧩 Component`, all `$type: "string"`, 28 of them referencing `{🔗 Alias.🔤 Text.Family.Heading}` or `.Body}` (2 of those — `FileUpload.Control`/`FileUpload.Description` — reference another Component token instead of Alias directly). One exception: `Component.Link.Family` (line ~1100) holds the literal `"inherit"` — a CSS keyword, not a font stack.
- `Global.🔤 Font.Family` (line ~8412): `Heading` → `"BaloiseCreateHeadline", "Arial", "sans-serif"`, `Body` → `"BaloiseCreateText", "Arial", "sans-serif"`.
- `Alias.🔤 Text.Family` (line ~883): `Heading`/`Body`, each `$value: "{🌐 Global.🔤 Font.Family.Heading}"` / `.Body}` — pure references, never touch a literal array.
- The current hand-written value quotes every entry, including `"sans-serif"` — a latent CSS bug (quoting a generic family keyword makes the browser look for a font literally named "sans-serif" instead of falling back to the real generic family).
- No precedent in Toky for editing an array-valued token (`grep` for `Array.isArray`/`string[]` in `token-editor.tsx` and `src/tokens/*.ts` turns up nothing token-value-related).

## Decisions locked in with the user

1. `$type: "fontFamily"` applies to Global, Alias, and all 29 Component leaves — including `Link.Family`, whose `$value` becomes `["inherit"]` rather than staying `$type: "string"`.
2. `Global.🔤 Font.Family.*`'s `$value` becomes a plain JSON array of unquoted font-name strings: `["BaloiseCreateHeadline", "Arial", "sans-serif"]`. No CSS-formatting baked into the strings themselves.
3. The CSS build transform quotes only entries that need it (contain whitespace/special characters); known CSS generic keywords (`serif`, `sans-serif`, `monospace`, `inherit`, `system-ui`, etc.) and simple identifiers stay bare. This both fixes the sans-serif quoting bug and is required for `Link.Family` to render as bare `inherit`, not `"inherit"`.
4. Figma push: `figmaValueFor('fontFamily', array)` sends only `array[0]` as a plain string (Figma has no array/stack concept). Throws loudly on an empty array. `resolvedTypeFor('fontFamily')` → `STRING` — the third DTCG type sharing that one Figma resolvedType, alongside `string` and `fontWeight`.
5. Figma pull, matched token: a changed Figma value replaces **only index 0** of the local array, preserving the rest of the fallback stack (Figma is authoritative for the primary font only, never the whole stack). Brand-new/unmatched variables keep falling back to guessing `'string'` (same accepted edge case as `fontWeight`).
6. Toky editor: literal (non-reference) fontFamily cells reuse the existing plain `<Input>` — no new component. The array displays/edits as a comma-joined string (`"BaloiseCreateHeadline, Arial, sans-serif"`); splitting/trimming on commit turns it back into an array. This is how "add multiple font families" is satisfied — typed directly, not via per-row add/remove buttons.

## 1. `packages/tokens/tokens/Base.tokens.json`

- **Global** (`🌐 Global.🔤 Font.Family`, line ~8412): `Heading`/`Body` become `$type: "fontFamily"`, `$value` an array, e.g. `["BaloiseCreateHeadline", "Arial", "sans-serif"]`. Preserve existing `$extensions.com.figma.variableId` if present (none currently — the prior task stripped all `$extensions` from the file; see `docs/plans/font-weight-token-type-plan.md`'s follow-up conversation).
- **Alias** (`🔗 Alias.🔤 Text.Family`, line ~883): `Heading`/`Body` become `$type: "fontFamily"`, `$value` unchanged (`"{🌐 Global.🔤 Font.Family.Heading}"` etc. — still a reference string, not an array).
- **Component**: all 29 Family/FontFamily leaves become `$type: "fontFamily"`. 28 keep their existing reference `$value` unchanged. `Link.Family` (line ~1100) changes `$value` from `"inherit"` to `["inherit"]`.

  ```
  grep -n '"Family": {\|"FontFamily": {' packages/tokens/tokens/Base.tokens.json
  ```

  Do this mechanically (script, mirroring the fontWeight retyping approach), then diff against the grep output to confirm every occurrence was caught and nothing else was touched.

## 2. `packages/tokens/src/css-value.ts` — shared quoting/join logic

New exported helpers, consumed by both the Style Dictionary transform (§3) and the live-preview `resolvedValueToCss` (§4) — mirrors how `colorValueToCss`/`numberValueToCssSize` already serve both:

```ts
const CSS_GENERIC_FONT_KEYWORDS = new Set([
  'inherit', 'initial', 'unset', 'revert', 'revert-layer',
  'serif', 'sans-serif', 'monospace', 'cursive', 'fantasy',
  'system-ui', 'ui-serif', 'ui-sans-serif', 'ui-monospace', 'ui-rounded',
  'math', 'emoji', 'fangsong',
])

/** Quote iff the name isn't a bare CSS identifier and isn't a generic keyword. */
const needsFontNameQuoting = (name: string): boolean =>
  !CSS_GENERIC_FONT_KEYWORDS.has(name.toLowerCase()) && /[^a-zA-Z0-9-]/.test(name)

export const fontFamilyValueToCss = (value: unknown): string => {
  const names = Array.isArray(value) ? value : [value]
  return names.map(name => (needsFontNameQuoting(String(name)) ? `"${name}"` : String(name))).join(', ')
}
```

## 3. `packages/tokens/src/transformers.ts` + `config.base.ts`/`config.brand.ts` — CSS build

New Style Dictionary value transform, alongside `ds/font-weight`:

```ts
sd.registerTransform({
  type: `value`,
  transitive: true,
  name: `ds/font-family`,
  filter: token => token.$type === 'fontFamily',
  transform: token => fontFamilyValueToCss(token.$value ?? token.value),
})
```

**Superseded — see Addendum below**: `ds/font-family` is only registered on the `web`, `docs`, and `javascript` platforms in `config.base.ts`, plus the css platform in `config.brand.ts`. It is deliberately *not* added to `config.base.ts`'s `css`/`scss` platforms.

## 4. `packages/tokens/src/css-value.ts` — live preview

Add a branch to `resolvedValueToCss`, before the `'string'` branch:

```ts
if (type === 'fontFamily') {
  return fontFamilyValueToCss(value)
}
```

## 5. `scripts/figma-sync/lib/figma-value.mjs` — Push

```js
const RESOLVED_TYPE_BY_DTCG_TYPE = {
  color: 'COLOR',
  number: 'FLOAT',
  string: 'STRING',
  boolean: 'BOOLEAN',
  fontWeight: 'STRING',
  fontFamily: 'STRING',
}
```

`figmaValueFor` gains a `fontFamily` case:

```js
case 'fontFamily': {
  if (!Array.isArray(literalValue) || literalValue.length === 0) {
    throw new Error(`Unsupported fontFamily value "${JSON.stringify(literalValue)}" — expected a non-empty array.`)
  }
  return String(literalValue[0])
}
```

Update the file's top comment to mention `fontFamily` also projects onto `STRING`, and that only the first array entry is ever sent (Figma has no font-stack concept).

## 6. `apps/toky/src/tokens/figma-map.ts` + `figma-pull.ts` — Pull

No new inverse lookup needed here (unlike `fontWeight`'s keyword↔number table) — Figma's string *is* the DTCG font name directly, no encoding to reverse. What's needed is the same "matched token's own type as a hint" mechanism `fontWeight` added, extended to also carry the matched token's **value** (for the index-0-merge), since `fontFamily`'s pull behavior isn't a pure function of the Figma value alone.

- `deriveValue`'s signature changes from `(variable, modeValue, baseIndex, expectedType?: string)` to `(variable, modeValue, baseIndex, referenceToken?: FlatToken)`. Internally: `const expectedType = referenceToken?.type`. The existing `fontWeight` branch reads `expectedType` as before.
- New `fontFamily` branch:
  ```ts
  if (expectedType === 'fontFamily' && dtcgType === 'string') {
    dtcgType = 'fontFamily'
  }
  // ...
  if (dtcgType === 'fontFamily') {
    const existing = Array.isArray(referenceToken?.rawValue) ? (referenceToken!.rawValue as unknown[]) : []
    const merged = [modeValue, ...existing.slice(1)]
    return { kind: 'literal', type: dtcgType, rawValue: merged }
  }
  ```
- **Call sites**: `buildBasePullPlan` already computes `matched` before calling `deriveValue` (from the `fontWeight` fix) — pass `matched` itself instead of `matched?.type`. `buildBrandPullPlan` passes `override ?? matched` (the brand's own override if one exists, else the inherited Base token) — the correct array to preserve fallbacks from is whatever's currently effective for that brand, not always Base's.
- No "unknown keyword" skip case needed here (unlike `fontWeight`) — any non-empty string from Figma is a valid font name, nothing to validate against a fixed set.

## 7. Toky editor — comma-separated text, no new component

`apps/toky/app/token-editor.tsx`:

- `TOKEN_TYPE_ICON.fontFamily = TypeIcon` (reuse the existing `string` icon — still fundamentally text).
- `getEditableValueText`: add `if (token.type === 'fontFamily') return Array.isArray(token.rawValue) ? token.rawValue.join(', ') : ''`.
- `parseEditableValue`: add a `fontFamily` branch:
  ```ts
  if (type === 'fontFamily') {
    const names = text.split(',').map(s => s.trim()).filter(s => s.length > 0)
    return { ok: true, value: names.length > 0 ? names : '' }
  }
  ```
  (Empty text → `''`, not `[]`, so the existing `isEmptyValue` check in `validate.ts` still catches it — no `validate.ts` change needed.)
- **No render-branch change needed** — fontFamily falls straight through to the existing plain `<Input>` in both the base value cell and the brand-override cell (the same `else` branch `fontWeight` bypasses with its `<Select>`), since `getEditableValueText`/`parseEditableValue` already do the array↔text conversion transparently.

## Addendum — Style Dictionary already has a native `fontFamily` transform

Discovered while verifying the build: Style Dictionary v4 ships a **built-in** `fontFamily/css` transform, and it's already part of the `css`, `scss`, and `less` built-in `transformGroup`s (not `web`/`js`). Since a platform's `transforms:` array is *appended* to its `transformGroup`'s transforms (`transformConfig` in Style Dictionary's source: `transforms = transforms.concat(to_ret.transforms)`), registering our own `ds/font-family` on the `css`/`scss` platforms meant **both** transforms ran, in sequence:

1. SD's built-in `fontFamily/css` ran first (via `transformGroup: 'css'`/`'scss'`), correctly turning the array into `BaloiseCreateHeadline, Arial, sans-serif`.
2. Our `ds/font-family` then ran *again* on that already-joined string, treated it as a single value (not an array), saw it contained commas/needed quoting under our rule, and wrapped the **entire already-correct string** in quotes.

Result: `--ds-global-font-family-heading: "BaloiseCreateHeadline, Arial, sans-serif";` — a single quoted string, which CSS parses as *one* font name containing commas (matching no real font, silently falling back to the browser default) rather than three fallback font names. Caught by inspecting the actual build output, not by a test (no test had been written yet for the real `dist/css/base.tokens.css` shape).

**Fix**: `ds/font-family` is only registered where Style Dictionary's own `fontFamily/css` is *not* already part of the platform's `transformGroup`:
- `config.base.ts`'s `css`/`scss` platforms (`transformGroup: 'css'`/`'scss'`) — **removed** `ds/font-family` from their explicit `transforms:` list; SD's built-in one already runs and produces correct output (single-quotes-only-if-whitespace, same substantive rule we'd chosen — generic keywords like `sans-serif`/`inherit` never contain whitespace, so both approaches agree on every real value in this token set).
- `config.base.ts`'s `web`/`docs`/`javascript` platforms (`transformGroup: 'web'`/`'js'`, neither includes `fontFamily/css`) — **kept** `ds/font-family`, otherwise those outputs would carry the raw untransformed array.
- `config.brand.ts`'s `css` platform has no `transformGroup` at all (explicit `transforms:` only) — **kept** `ds/font-family`, since nothing else would join the array there.

This only affects `fontFamily`, not `fontWeight` — none of the built-in transformGroups have a competing built-in `fontWeight` transform (Style Dictionary has no native handling for an arbitrary custom `$type` like ours).

## 8. Tests to add/update

- `packages/tokens` (or wherever `css-value.ts` gets direct coverage) / `apps/toky/src/tokens/css-preview.test.ts`: `fontFamilyValueToCss`/`resolvedValueToCss` cases — unquoted generic keyword (`sans-serif`), unquoted simple name (`Arial`), quoted name with a space (`Comic Sans MS`), single-entry `inherit`.
- `scripts/figma-sync/test/write.test.ts`: `figmaValueFor('fontFamily', [...])` returns only the first entry; throws on `[]`/non-array. `resolvedTypeFor('fontFamily') === 'STRING'`.
- `apps/toky/src/tokens/figma-pull.test.ts`: a matched fontFamily token round-trips cleanly when Figma's value matches local's first entry (no false-positive update, mirroring the `fontWeight` regression test); a changed Figma value updates only index 0, preserving the rest of the array; a brand override's own array (not Base's) is what a brand pull preserves fallbacks from.
- `apps/toky/src/tokens/validate.test.ts`: no new case required.
- Manual Toky smoke test: editing `Global.Font.Family.Heading`'s comma-separated text and committing produces the right array in the diff/preview.

## Files touched

- `packages/tokens/tokens/Base.tokens.json` — Global (2 entries), Alias (2), 29 Component leaves
- `packages/tokens/src/css-value.ts` — `fontFamilyValueToCss` + `resolvedValueToCss` branch
- `packages/tokens/src/transformers.ts` — new `ds/font-family` transform
- `packages/tokens/src/config.base.ts` / `config.brand.ts` — register the new transform
- `scripts/figma-sync/lib/figma-value.mjs` — `RESOLVED_TYPE_BY_DTCG_TYPE` + `figmaValueFor` case
- `apps/toky/src/tokens/figma-pull.ts` — `deriveValue` signature change (`referenceToken` instead of `expectedType`), both call sites
- `apps/toky/app/token-editor.tsx` — `TOKEN_TYPE_ICON`, `getEditableValueText`, `parseEditableValue`
- Test files per §8
