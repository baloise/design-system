# Responsive `dimension` token — `$extensions`-based breakpoints

## Context

This codebase already has a responsive-token mechanism in active use today, documented in
`packages/tokens/CONTEXT.md` under "Responsive Tokens": three separate **sibling DTCG tokens**
(`Mobile`/`Tablet`/`Desktop`, e.g. `Component.Container.Space.Mobile/Tablet/Desktop` in
`Base.tokens.json:596-607`), each independently named and referenced. A build-time step in
`packages/tokens/src/formatter.ts` (`ds/css/variables-responsive`, `ds/css/variables-brand`)
synthesizes a fourth `-device` CSS variable by filtering `dictionary.allTokens` for names ending in
`-mobile`/`-tablet`/`-desktop`, cloning + renaming, and wrapping the tablet/desktop clones in
`@media (min-width: 769px)`/`@media (min-width: 1024px)` blocks.

This plan introduces a **second, distinct** mechanism for a **single** `$type: "dimension"` token
to carry 3 breakpoint values via DTCG's `$extensions` field, per DTCG's documented pattern for
tool-specific metadata:

```json
{
  "space-lg": {
    "$type": "dimension",
    "$value": { "value": 16, "unit": "px" },
    "$extensions": {
      "com.helvetia.responsive": {
        "mobile": { "value": 16, "unit": "px" },
        "tablet": { "value": 24, "unit": "px" },
        "desktop": { "value": 32, "unit": "px" }
      }
    }
  }
}
```

`$value` is the DTCG-spec fallback for tools that don't understand the extension; tools that do
(Toky, Style Dictionary, Figma sync) read the breakpoint map instead.

## Decisions locked in with the user

1. **Goes-forward mechanism, replacing the sibling-token pattern over time — but migration is out
   of scope for this pass.** No existing `Mobile`/`Tablet`/`Desktop` sibling tokens (Text size,
   Container.Space, etc.) are touched or migrated. This plan ships the new mechanism fully working
   end to end; a future plan decides how/when to migrate real tokens onto it. The two mechanisms
   coexist in the codebase until that migration happens.
2. **Stays `$type: "dimension"`.** No new `$type` (unlike `shadow`/`border`/`typography`, which
   each got their own). Detection is by presence of `$extensions.com.helvetia.responsive` on a
   `dimension` token. This preserves DTCG tool-degradation semantics — a tool that doesn't know the
   extension still sees a valid plain dimension via `$value` — which is the whole point of using
   `$extensions` over a new type.
3. **Each breakpoint value is literal-or-reference**, independently, exactly like `border`'s
   `width`/`color` and `typography`'s `fontSize`/`lineHeight`: either a literal `{value, unit}` or
   a `{reference}` string pointing at a `Global`/`Alias` dimension primitive. Consistent with how
   the sibling tokens being (eventually) replaced already reference `Global.Dimension` primitives
   today.
4. **`$value` auto-mirrors `mobile`.** Not independently editable — Toky/Style Dictionary keep it
   in lockstep with the mobile breakpoint value whenever mobile changes, so there is no drift path.
   The user only ever edits the 3 breakpoint fields.
5. **Toggleable at any time**, not fixed at creation. A plain dimension token can be converted to
   responsive (seeding `mobile`/`tablet`/`desktop` from the current `$value`) and back (dropping
   `$extensions`, keeping `$value`) — mirrors the existing value/reference mode toggle already on
   every other type (`typography` decision 10, `shadow`'s row/brand-cell popover).
6. **All 3 breakpoints are required.** No partial responsive tokens — Toky's Create/Edit UI gates
   saving as responsive on all 3 being filled. Matches the existing sibling pattern, where all 3
   siblings already exist for every current responsive token today.
7. **Brand-level override is in scope, whole-token-only** — same model as `typography` (decision
   9): a brand either fully inherits the responsive token from Base, or overrides all 3 breakpoint
   values together as one new composite value. No per-breakpoint partial brand override.
8. **Figma sync: 3 separate sibling variables** (`.../Mobile`, `.../Tablet`, `.../Desktop`), not
   Figma modes. Brand overrides already use Figma modes (ADR-0012); breakpoints instead reuse the
   composite-type sub-property fan-out machinery already built for `shadow`/`border`/`typography`
   (`SHADOW_SUB_PROPERTIES` etc. in `scripts/figma-sync/lib/figma-value.mjs:150,212,268`, the
   presence-of-key lookup in `write.mjs:321-323`). `$extensions.com.figma.variableId` becomes a
   `{mobile, tablet, desktop}` object of 3 variableId strings, mirroring typography's
   `{fontFamily, fontSize, fontWeight, lineHeight}` id object (`figma-map.ts:231`).
9. **Both push and pull are built**, matching every other composite type — no push-only precedent
   is introduced.
10. **Toky table row**: inline icon+value triplet using the existing `SmartphoneIcon`/
    `TabletIcon`/`MonitorIcon` from `apps/toky/app/preview-sidebar.tsx:4,39-42` (currently used for
    the device-preview panel, not token rows) — one row per token, e.g.
    `📱16px  📱24px  🖥️32px`, consistent with how `shadow`/`border`/`typography` composite rows
    already show multiple sub-values inline in one row rather than expanding into sub-rows.

## Open technical question to resolve first, during implementation

Style Dictionary's reference resolver only walks `$value` — it has no knowledge of `$extensions`
and will **not** resolve `{reference}` strings that live inside
`$extensions.com.helvetia.responsive.{mobile,tablet,desktop}` the way it resolves references
inside a token's own `$value` (which is how `typography`'s `fontFamily`/`fontWeight` references
already get resolved today, per the comment at `css-value.ts:221`: "reference already followed by
Style Dictionary/Toky before this runs"). Because decision 3 allows references inside the
extension map, **Phase 2 needs an explicit resolution step for extension-held references before
conversion to CSS** — most likely a pre-pass over `dictionary.tokens` (or the raw token JSON)
that walks `$extensions.com.helvetia.responsive` on every dimension token and substitutes resolved
values, run before `ds/dimension`'s transform or the new expansion formatter step (see Phase 2
below). Read how `border`/`typography`'s forced-reference fields get resolved before writing this
— don't assume SD does it for free the way it does for `$value`.

## Phase 1 — Toky (`apps/toky/`)

### `apps/toky/src/tokens/figma-map.ts`

- New `ResponsiveDimensionSubProperty = 'mobile' | 'tablet' | 'desktop'` type + `isResponsiveDimensionFigmaId` type guard, mirroring `TypographySubProperty`/`isTypographyFigmaId` (`figma-map.ts:229,231`).
- Extend the sub-property lookup at `figma-map.ts:242-252` (`subPropertiesFor`-equivalent) to include the responsive-dimension case alongside shadow/border/typography.
- `isLiteralValueEqual`-equivalent branch for comparing two responsive-dimension values field by field (mobile/tablet/desktop, each compared as a resolved dimension literal) — mirrors the `typography`/`border`/`shadow` branches at `figma-map.ts:138-172`.

### `apps/toky/src/tokens/figma-pull.ts`

- New `deriveResponsiveDimensionPullEntries(params)`, parallel to `deriveTypographyPullEntries` (`figma-pull.ts:813`) and its brand-layer counterpart (`figma-pull.ts:1084`):
  1. Reverse-index every local responsive-dimension token's 3 stored variableIds → `{tokenPath, subProperty}`.
  2. Group fetched Figma variables by `tokenPath`; "fully matched" once all 3 sub-ids are found (same `allFound`/`missing` pattern as `deriveShadowPullEntries`, `figma-pull.ts:335`).
  3. Reconstruct `{mobile, tablet, desktop}`, resolving each fetched Figma `FLOAT` back to a literal `{value, unit}` (unit inferred the same way the existing dimension-pull logic already infers rem-vs-px, per `figma-map.ts:269-291`'s `dimension()` helper) or, if decision 3's reference form applies, matched back against a known `Global`/`Alias` dimension primitive value (same "match against known set, flag unmatched rather than silently coerce" discipline as `border`'s `style` pull).
  4. Wire into `buildBasePullPlan` (`figma-pull.ts:910`) **and** the brand pull path (decision 7 — not Global-only), alongside the existing `shadowEntries`/`typographyEntries` calls (`figma-pull.ts:1062,1074`).

### `apps/toky/app/token-editor.tsx`

- No new `TOKEN_TYPE_ICON` entry — this is still `type === 'dimension'`, not a new type (decision 2). Instead, the dimension row-render branch (`token-editor.tsx:1755`) and brand-cell branch (`token-editor.tsx:2219`) each need an inner conditional: plain dimension (today's single-value rendering) vs responsive dimension (new triplet rendering, decision 10).
- `Draft`/`EditDraftState`/`EditBrandDraft`: add a `responsiveValue: { mobile: DimensionFieldValue; tablet: DimensionFieldValue; desktop: DimensionFieldValue }` field, where `DimensionFieldValue` is a value-or-reference pair (mirrors how `Draft.value`/`Draft.referenceTarget` already pairs at the top level, and how `typography`'s `fontSize`/`lineHeight` needed their own per-field mode per the typography plan's Draft design, `docs/plans/typography-token-type-plan.md` §7).
- New toggle (decision 5) on the dimension row/edit dialog: "Fixed" / "Responsive" — converting to Responsive seeds all 3 fields from the current `draft.value`; converting back drops `responsiveValue` and keeps `draft.value` as-is (mirrors the existing `shadow` row/brand-cell mode-toggle popover pattern, `token-editor.tsx` shadow branch).
- Reuse `HexagonEditor`/`renderReferenceSearch` (`token-editor.tsx:1008-1028`) for each breakpoint field's literal-or-reference toggle — same trigger already used for plain dimension/number reference cells and for `typography`'s `fontSize`/`lineHeight`. No new popover component needed.
- `onBrandResponsiveDimensionChange` handler, parallel to `onBrandTypographyChange`/`onBrandShadowChange` (`token-editor.tsx:1334,4451`) — whole-token swap only (decision 7).
- Commit logic at `token-editor.tsx:3156` (`draft.type === 'dimension'` branch) and the brand equivalent at `3468`: branch on whether `responsiveValue` is set to decide whether `rawValue` becomes a plain `{value, unit}` or a `{value, unit}` `$value` + `$extensions.com.helvetia.responsive` pair.
- `validate.ts`: gate Create/Save on all 3 breakpoint fields being non-empty when responsive mode is active (decision 6) — same laxness elsewhere (Create button only gates on the name field for other sub-fields, per the typography plan's own precedent), but breakpoint completeness is an explicit new rule per decision 6, not left lax.

## Phase 2 — Style Dictionary (`packages/tokens/`)

### `packages/tokens/src/css-value.ts`

- Add `responsiveDimensionValueToCss(value: unknown): { mobile: string; tablet: string; desktop: string } | null`, alongside `typographyValueToCss` (`css-value.ts:230`) — reads `$extensions.com.helvetia.responsive`, resolves each of `mobile`/`tablet`/`desktop` via `dimensionValueToCss` (`css-value.ts:107`), returns `null` if any sub-value is unresolvable (same "don't half-render" discipline as `typographyValueToCss`).
- This is a **new value shape distinct from `$value`** — the transform (below) needs both the plain `$value` (unaffected, stays the mobile-mirrored fallback per decision 4) and this 3-value breakpoint map.

### `packages/tokens/src/transformers.ts`

- `ds/dimension` (`transformers.ts:144`) stays untouched — it already handles `$value` correctly (decision 4 keeps `$value` a plain resolved dimension, so every existing non-responsive-aware consumer of `ds/dimension` output is unaffected).
- The 3-breakpoint expansion does **not** belong in a `value`-type transform (Style Dictionary transforms return one value per token) — it belongs in the **formatter** layer, mirroring how `typography`'s 4-way expansion was solved (see below), not the transformer layer.

### `packages/tokens/src/formatter.ts`

- New `expandResponsiveDimensionTokens(tokens)`, structured like `expandTypographyTokens` (`formatter.ts:30-54`), but instead of suffixing with fixed field names, it must produce clones named `${token.name}-mobile`, `${token.name}-tablet`, `${token.name}-desktop` for every `$type: "dimension"` token carrying `$extensions.com.helvetia.responsive`.
- **This is the key design win**: the existing `-mobile`/`-tablet`/`-desktop` → `-device` media-query splitting logic in `ds/css/variables-responsive`/`ds/css/variables-brand` (`formatter.ts:68-119`, `235-261`) already operates purely on **name suffixes**, filtering `dictionary.allTokens` for names ending in `-mobile`/`-tablet`/`-desktop` — it has no idea whether those names came from the old sibling-token tree or a new expansion pass. Running `expandResponsiveDimensionTokens` **before** that existing filtering step (same position `expandTypographyTokens` runs at, `formatter.ts:66,229,326`) means the device/media-query wiring needs **zero changes** — decision on CSS output (4 suffixed vars, no bare var, matching today's output exactly) falls out for free once the expansion step exists.
- Must run the `$extensions`-reference-resolution step (see "Open technical question" above) before or inside this expansion — `dimensionValueToCss`/`responsiveDimensionValueToCss` expect already-resolved literals, same precondition `typographyValueToCss` has for `fontFamily`/`fontWeight`.
- Add the same expansion call to `ds/scss/variables` (`formatter.ts:322-342`), alongside the existing `expandTypographyTokens` call — scss output needs the same 4-variant fan-out.

### `packages/tokens/src/config.base.ts` + `config.brand.ts`

- No new transform-list entries needed (Phase 2 lives entirely in the formatter layer, not a new `ds/*` transform) — but verify the `javascript`/`json` platforms' formatters (which don't go through `ds/css/variables-responsive` at all) get a deliberate decision: do they emit the 3-breakpoint map as a nested JS object, or skip responsive dimensions until a follow-up? **Decide this during implementation by checking how the existing sibling-pattern tokens currently render in JS/JSON output first** — don't guess.
- Verify actual `dist/` output for every touched platform with one temporary test token (see Phase-4 tests below), same lesson every prior composite-type plan has hit.

## Phase 3 — Figma sync (`scripts/figma-sync/`)

### `scripts/figma-sync/lib/figma-value.mjs`

- New `figmaResponsiveDimensionSubValuesFor(literalValue)`, parallel to `figmaTypographySubValuesFor`-equivalent (comment block at `figma-value.mjs:231-260`, actual implementation ~`258-262`) — reads `{mobile, tablet, desktop}`, returns `{mobile: figmaValueFor('dimension', mobile), tablet: figmaValueFor('dimension', tablet), desktop: figmaValueFor('dimension', desktop)}`.
- New `RESPONSIVE_DIMENSION_SUB_PROPERTIES = ['mobile', 'tablet', 'desktop']` constant, alongside `SHADOW_SUB_PROPERTIES`/`BORDER_SUB_PROPERTIES`/`TYPOGRAPHY_SUB_PROPERTIES` (`figma-value.mjs:150,212,268`), suffix table `Mobile`/`Tablet`/`Desktop`, resolved-type table all `FLOAT`.
- New `isSyncableResponsiveDimensionToken(token)` — checks `token.type === 'dimension'` **and** presence of the responsive extension (unlike the other composite types, this can't just check `token.type` alone, since plain dimension tokens share the same `$type`).
- `write.mjs`'s presence-of-key lookup (`write.mjs:321-323`, already refactored from a binary ternary to a 3-way lookup by the typography pass) needs a 4th branch: `if ('mobile' in variableId) return RESPONSIVE_DIMENSION_SUB_PROPERTIES`. Verify no existing sub-property object shape collides with `{mobile, tablet, desktop}` keys before adding this branch.

### `scripts/figma-sync/lib/write.mjs`

- Extend every `for (const sub of X_SUB_PROPERTIES)` fan-out site that currently enumerates shadow/border/typography (`write.mjs:164,181,198,247,256,265,307,323,338`) with the responsive-dimension case. Given 4 composite types now share this fan-out shape, consider (during implementation, not pre-decided here) whether these sites should be generalized into one parametrized loop over a `COMPOSITE_TYPES` table instead of a 4th copy-pasted block — flag this as a real simplification opportunity given the typography plan already found the binary-ternary version unsustainable at 3 types.

## Phase 4 — Tests

- `css-value.test.ts`: `responsiveDimensionValueToCss` — correct 3-value output; `null` for malformed/missing breakpoint values.
- `formatter` tests (wherever `expandTypographyTokens`-equivalent behavior is currently verified, likely via `pnpm tokens` + inspecting `dist/`): `expandResponsiveDimensionTokens` produces exactly the same `-mobile`/`-tablet`/`-desktop`/`-device` output shape as today's sibling-token pattern for an equivalent value set.
- `figma-sync` tests: `figmaResponsiveDimensionSubValuesFor` — correct 3 sub-values; `null` for malformed input. Extend the `write.mjs` fan-out tests to cover 4 composite types instead of 3.
- `figma-pull.test.ts`: `deriveResponsiveDimensionPullEntries`-shaped tests, mirroring the real `deriveTypographyPullEntries`/`deriveShadowPullEntries` test cases — full match no-op, single-breakpoint change merges correctly, incomplete match (fewer than 3 ids present) doesn't half-apply.
- **Manual verification**: temporarily add one `Global`-layer and one brand-override responsive dimension token to `Base.tokens.json`/a brand file during implementation, run the full `css`/`scss`/`web`/`docs`/`javascript` builds, inspect real `dist/` output against the equivalent existing sibling-token output, exercise Toky's create/edit/toggle/brand-override UI, run a real Figma push+pull round trip — then **remove the temporary token** before merging (decision 1 — no real tokens migrated this pass).

## Files touched

- `packages/tokens/src/css-value.ts` — `responsiveDimensionValueToCss`
- `packages/tokens/src/formatter.ts` — `expandResponsiveDimensionTokens`, wired into `ds/css/variables-responsive`, `ds/css/variables-brand`, `ds/scss/variables`
- `packages/tokens/src/transformers.ts` — no new transform; verify `ds/dimension` needs no change
- `packages/tokens/src/config.base.ts` / `config.brand.ts` — verify JS/JSON platform behavior (open question above), no new transform-list entries expected
- `scripts/figma-sync/lib/figma-value.mjs` — `figmaResponsiveDimensionSubValuesFor`, `isSyncableResponsiveDimensionToken`, `RESPONSIVE_DIMENSION_SUB_PROPERTIES` + suffix/resolved-type tables
- `scripts/figma-sync/lib/write.mjs` — 4th fan-out branch across all `X_SUB_PROPERTIES` sites; consider generalizing to a `COMPOSITE_TYPES` table
- `apps/toky/src/tokens/figma-map.ts` — `ResponsiveDimensionSubProperty`, `isResponsiveDimensionFigmaId`, sub-property lookup, value-equality branch
- `apps/toky/src/tokens/figma-pull.ts` — `deriveResponsiveDimensionPullEntries`, wired into both Base and brand pull plans
- `apps/toky/app/token-editor.tsx` — dimension row/brand-cell inner branch for responsive rendering, `Draft`/`EditDraftState`/`EditBrandDraft` `responsiveValue` field, Fixed/Responsive toggle, `onBrandResponsiveDimensionChange`, commit-logic branches, `validate.ts` all-3-required rule
- Test files per Phase 4
- `packages/tokens/CONTEXT.md` — short addition documenting the new `$extensions.com.helvetia.responsive` mechanism, its relationship to the existing sibling-token "Responsive Tokens" section, and that migration is a separate future pass

## Explicitly out of scope for this pass

- Migrating any existing `Mobile`/`Tablet`/`Desktop` sibling token (Text size, Container.Space, etc.) onto the new mechanism (decision 1).
- Any real `dimension` token in `Base.tokens.json`/a brand file permanently carrying the responsive extension — pilot tokens are temporary, added and removed during manual verification only (Phase 4).
- Per-breakpoint partial brand override (decision 7) — brand override is whole-token only.
- JS/JSON platform output shape for responsive dimensions until the open question in Phase 2 is resolved during implementation.
