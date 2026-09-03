# `fontWeight` design token type

## Context

[DTCG](https://www.designtokens.org/tr/drafts/format/#font-weight) defines a dedicated `fontWeight` token `$type`: a value that's either an integer 1–1000 or one of a fixed set of keyword aliases (thin, extra-light, light, normal/regular/book, medium, semi-bold, demi-bold, bold, extra-bold, black/heavy, extra-black). Today this repo doesn't implement that type at all — every `FontWeight` token in `packages/tokens/tokens/Base.tokens.json` (Global, Alias, and every Component leaf) is `$type: "string"` with values like `"300"`/`"700"`, and `Global.🔤 Font.Weight` only defines 3 of the 10 canonical weights (300, 400, 700).

CSS needs the raw number (`font-weight: 700`, not `"700"`). Figma Variables have no native font-weight type, so a `fontWeight` token has to project onto Figma's `STRING` type — the same way it already does today, just formalized under its own `$type`. Toky's editor should stop the Global layer from being able to hold an out-of-spec weight, by presenting a fixed 10-option select instead of a free-text field.

Interestingly, `packages/tokens/src/css-value.ts`'s `NUMBER_ONLY_PATH_MARKERS` already lists `'FontWeight'` — dead weight today since no FontWeight token is `$type: "number"`, but it signals this migration was anticipated. This plan supersedes that marker with an explicit `$type` check.

## Decisions locked in with the user

1. `$type: "fontWeight"` applies uniformly across Global, Alias, and Component layers — not just where the literal value lives.
2. `Global.🔤 Font.Weight` expands from 3 entries to all 10 DTCG weights (100, 200, 300, 400, 500, 600, 700, 800, 900, 950), keyed numerically (matching the existing `"300"`/`"400"`/`"700"` key style), `$value` as a plain number.
3. `Alias.🔤 Text.Weight` stays exactly `Light` / `Regular` / `Bold`, referencing Global 300/400/700 — retyped only, not restructured.
4. Where DTCG lists multiple keyword synonyms per weight, use the first-listed one: Thin, Extra-Light, Light, Regular, Medium, Semi-Bold, Bold, Extra-Bold, Black, Extra-Black.
5. CSS/preview output: a new dedicated transform/branch keyed off `$type === 'fontWeight'`, not folded into the existing number-type logic.
6. Figma push: `fontWeight` → Figma `STRING` resolvedType. **Superseded (see Addendum below):** the value is *not* the stringified number — Figma has no native font-weight type and expects the font's named style, so `700` maps to the keyword `"Bold"` via a fixed number→keyword lookup, not `String(700)`.
7. Figma pull: no disambiguation heuristic added for *brand-new* Figma variables — `STRING` keeps defaulting to DTCG `'string'` when there's no local counterpart to inherit a type from. Known, accepted edge case. **Addendum:** this does *not* apply to already-matched variables — see below.
8. Toky editor: Global font-weight tokens (literal values) get a fixed `<Select>` of the 10 DTCG-legal weights, e.g. "700 — Bold". Alias/Component tokens are references and keep using the existing reference-picker (`SearchSelect`), untouched.
9. Scope is `Base.tokens.json` only — `Tcs.tokens.json` has no `FontWeight` entries to touch.

## 1. `packages/tokens/tokens/Base.tokens.json`

- **Global** (`🌐 Global.🔤 Font.Weight`, currently at line ~17698): replace the 3 existing entries and add the missing 7, all `$type: "fontWeight"`, `$value` as a bare number:

  | Key   | Value | Label       |
  | ----- | ----- | ----------- |
  | `100` | `100` | Thin        |
  | `200` | `200` | Extra-Light |
  | `300` | `300` | Light       |
  | `400` | `400` | Regular     |
  | `500` | `500` | Medium      |
  | `600` | `600` | Semi-Bold   |
  | `700` | `700` | Bold        |
  | `800` | `800` | Extra-Bold  |
  | `900` | `900` | Black       |
  | `950` | `950` | Extra-Black |

  Existing `300`/`400`/`700` keep their `$extensions.com.figma.variableId` (identity must survive the type/value change — see ADR-0011). The 7 new entries have no `variableId` yet; they get one on next Figma sync, same as any new token.

- **Alias** (`🔗 Alias.🔤 Text.Weight`, line ~2141): `Light`/`Regular`/`Bold` each become `$type: "fontWeight"`, keeping their existing `$value` references (`{🌐 Global.🔤 Font.Weight.300}` etc.) and `variableId`s unchanged.

- **Component**: every `FontWeight`/`Weight`/`WeightSelected` leaf that currently reads `$type: "string"` with a `{🔗 Alias.🔤 Text.Weight.*}` reference (~30 occurrences per the grep below) becomes `$type: "fontWeight"`. Value stays the same reference string — only `$type` changes.

  ```
  grep -n '"Weight": {\|"FontWeight": {\|"WeightSelected": {' packages/tokens/tokens/Base.tokens.json
  ```

  Do this mechanically (script or careful multi-replace), then diff against the grep output above to confirm every occurrence was caught and nothing else was touched.

## 2. `packages/tokens/src/transformers.ts` — CSS build

Add a new Style Dictionary value transform, alongside the existing `ds/size/rem`/`ds/size/round`:

```ts
sd.registerTransform({
  type: `value`,
  transitive: true,
  name: `ds/font-weight`,
  filter: token => token.$type === 'fontWeight',
  transform: token => Number(token.$value ?? token.value),
})
```

Register it in the base/brand transform group configs (`config.base.ts`/`config.brand.ts`) wherever `ds/size/rem`/`ds/size/round` are currently listed, so it runs for the same platforms (CSS/SCSS/JS).

Remove `'FontWeight'` from `NUMBER_ONLY_PATH_MARKERS` in `css-value.ts` (§3) once the dedicated type check replaces it — leaving it in would be dead code now that no `FontWeight` token is `$type: "number"`.

## 3. `packages/tokens/src/css-value.ts` — live preview

Add a branch to `resolvedValueToCss` (used by Toky's live preview, mirroring the build transform per ADR-0021):

```ts
if (type === 'fontWeight' && (typeof value === 'number' || typeof value === 'string')) {
  return `${Number(value)}`
}
```

Placed before the generic `type === 'string'` branch. Remove `'FontWeight'` from `NUMBER_ONLY_PATH_MARKERS` (§2) since this branch now handles it explicitly regardless of path.

Update `packages/tokens/CONTEXT.md`'s `dist/out-tsc/css-value.js`... actually no doc change needed there; just note in `apps/toky/src/tokens/css-preview.test.ts` and `packages/tokens` test coverage (see §7).

## 4. `scripts/figma-sync/lib/figma-value.mjs` — Pull (from Code)

**Superseded by the Addendum below** — `figmaValueFor('fontWeight', ...)` maps the number to a keyword string via `FONT_WEIGHT_KEYWORD_BY_NUMBER`, not `String(literalValue)`. `resolvedTypeFor`'s `fontWeight: 'STRING'` entry is unchanged from what's written here.

## 5. `apps/toky/src/tokens/figma-map.ts` — Pull (from Figma)

**Superseded by the Addendum below** — this turned out to need a real functional change, not just a comment: `figma-pull.ts`'s `deriveValue` was inferring `$type` purely from Figma's `resolvedType`, which broke Pull for every already-matched `fontWeight` token (permanent false-positive "changed"), independent of whether the Figma value was a stringified number or a keyword.

## Addendum — Figma needs the font's named style, not a number

`figma-value.mjs`'s original `fontWeight` case (`String(literalValue)`) was wrong: Figma's variable-to-"Font Weight"-property binding expects the font's actual named style (e.g. `"Bold"`), not a numeric string like `"700"`. Corrected mapping, plus a bug this surfaced in Pull:

- **Push** (`figma-value.mjs`): added `FONT_WEIGHT_KEYWORD_BY_NUMBER`, the generic DTCG first-listed keyword per weight (Title Case, hyphenated — Thin, Extra-Light, Light, Regular, Medium, Semi-Bold, Bold, Extra-Bold, Black, Extra-Black), same convention as Toky's `FONT_WEIGHT_OPTIONS` labels. `figmaValueFor('fontWeight', 700)` → `"Bold"`; throws loudly for a number outside the 10 known weights. This is a **best-effort default** — the real style names `BaloiseCreateHeadline`/`BaloiseCreateText` expose in Figma haven't been verified and may differ; check against the live Figma file and adjust the lookup table if so.
- **Pull bug found while implementing this**: `figma-pull.ts`'s `deriveValue` determined a Figma variable's DTCG `$type` solely from `dtcgTypeFor(variable.resolvedType)` — never from the locally-matched token's own `$type`, even when one exists. Since `STRING` always maps to `'string'`, every already-linked `fontWeight` token would permanently compare as `'fontWeight'` (local) vs `'string'` (derived) — a type mismatch that never resolves, showing every fontWeight token as changed/conflicting on every single Pull, forever.
  - **Fix**: `deriveValue` now takes an optional `expectedType` parameter — the matched local token's `$type`, passed by both `buildBasePullPlan` and `buildBrandPullPlan` when a match exists (`undefined` for brand-new/unmatched variables, which still fall back to guessing from `resolvedType` — decision #7 is preserved for that case only).
  - **Pull value conversion**: `figma-map.ts` gained `fontWeightNumberFromKeyword`, the inverse lookup (`"Bold"` → `700`), used by `deriveValue` when `expectedType === 'fontWeight'`. Exact-case match only (recognizes only what our own push side generates); an unrecognized string on a matched fontWeight variable returns `{ kind: 'unsupported', reason: ... }` (skipped with a clear reason) rather than silently mismatching or guessing, matching this codebase's existing "fail loudly" pattern.
  - Alias-kind (reference) tokens were never affected by this bug — `snapshotEqual` only compares `referenceTarget` when either side has one, ignoring `type` entirely for that path. The bug only bit literal-valued tokens, i.e. `Global.🔤 Font.Weight.*`.

## 6. Toky editor — fixed select for Global font-weight values

`apps/toky/app/token-editor.tsx`:

- Add `fontWeight` to `TOKEN_TYPE_ICON` (reuse `HashIcon`, same as `number` — it's still fundamentally a number to the reader).
- Add a `FONT_WEIGHT_OPTIONS` constant (module scope, near `TOKEN_TYPE_ICON`):
  ```ts
  const FONT_WEIGHT_OPTIONS: { value: number; label: string }[] = [
    { value: 100, label: '100 — Thin' },
    { value: 200, label: '200 — Extra-Light' },
    { value: 300, label: '300 — Light' },
    { value: 400, label: '400 — Regular' },
    { value: 500, label: '500 — Medium' },
    { value: 600, label: '600 — Semi-Bold' },
    { value: 700, label: '700 — Bold' },
    { value: 800, label: '800 — Extra-Bold' },
    { value: 900, label: '900 — Black' },
    { value: 950, label: '950 — Extra-Black' },
  ]
  ```
- `parseEditableValue`: add a `fontWeight` branch parallel to the `number` one (`Number(text)`, `NaN` → `{ ok: false }`) — the select's own `value` prop will always hand back a valid option, but keeping parsing symmetric with `number` costs nothing and covers the (rare) case a value arrives some other way.
- Wherever the value cell renders an `<Input>` keyed by `token.type` (the same spot color gets a swatch/popover — see `token.type === 'color' ? ... : ...` around line 3195/3340), add a branch: `token.type === 'fontWeight' && !token.referenceTarget` renders `<Select>` (from `@/components/ui/select`) populated from `FONT_WEIGHT_OPTIONS`, `value={String(draft.value)}`, `onValueChange` writing the parsed number into the same draft-update path the text input currently uses. This only fires for literal (non-reference) tokens — i.e. Global — since Alias/Component values are edited via the existing reference `SearchSelect`, not this cell.
- No `validate.ts` change needed: the select can't produce an out-of-spec value, so there's nothing new to validate beyond the existing emptiness check.

## 7. Tests to add/update

- `scripts/figma-sync/test/write.test.ts`: `figmaValueFor('fontWeight', 700) === 'Bold'` (and other weights), throws for an out-of-spec number; `resolvedTypeFor('fontWeight') === 'STRING'`.
- `apps/toky/src/tokens/figma-map.test.ts`: `fontWeightNumberFromKeyword` — round-trips all 10 keywords, exact-case only (`'bold'`/`'SemiBold'` → `undefined`), unrecognized/non-string → `undefined`.
- `apps/toky/src/tokens/figma-pull.test.ts` — the regression coverage for the Pull bug: a matched fontWeight token with an unchanged Figma keyword produces zero updates/conflicts; a changed keyword converts back to the right number; an unrecognized keyword on a matched variable is skipped with a reason.
- `apps/toky/src/tokens/css-preview.test.ts`: `resolvedValueToCss(700, 'fontWeight', [...])` returns `'700'`, not `'43.75rem'` or `'700px'`.
- `apps/toky/src/tokens/validate.test.ts`: no new case required (no new validation rule).
- Manual Toky smoke test still outstanding: editing a Global font-weight token shows the 10-option select, not a text field.

## 8. Build verification

After the JSON + transformer changes:

```bash
pnpm tokens
```

Then diff `packages/tokens/dist/css/base.tokens.css` for every `--ds-*-font-weight*`/`--ds-*-weight*` custom property — each should render as a bare integer (e.g. `700`), not a quoted string or rem value. Also check `dist/js/base.tokens.js` and `dist/sass/base.tokens.scss` output shapes didn't regress for any of the ~30 Component FontWeight tokens found in §1.

## Files touched

- `packages/tokens/tokens/Base.tokens.json` — Global (10 entries), Alias (3), ~30 Component leaves
- `packages/tokens/src/transformers.ts` — new `ds/font-weight` transform
- `packages/tokens/src/config.base.ts` / `config.brand.ts` — register the new transform
- `packages/tokens/src/css-value.ts` — `resolvedValueToCss` branch, drop `'FontWeight'` from `NUMBER_ONLY_PATH_MARKERS`
- `scripts/figma-sync/lib/figma-value.mjs` — `RESOLVED_TYPE_BY_DTCG_TYPE`, `FONT_WEIGHT_KEYWORD_BY_NUMBER`, `figmaValueFor` case
- `apps/toky/src/tokens/figma-map.ts` — `FONT_WEIGHT_NUMBER_BY_KEYWORD` + `fontWeightNumberFromKeyword`
- `apps/toky/src/tokens/figma-pull.ts` — `deriveValue`'s `expectedType` parameter, both call sites, fontWeight value conversion
- `apps/toky/app/token-editor.tsx` — `TOKEN_TYPE_ICON`, `FONT_WEIGHT_OPTIONS`, `parseEditableValue`, value-cell render branch (base + brand-override cell), `onLiteralValueSelect` handler
- Test files per §7
