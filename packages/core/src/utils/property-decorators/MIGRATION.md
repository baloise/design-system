# Property Validation Decorator Migration

Migrating from the old metadata-based decorators (`property-checkers/` + `validate.decorator.ts`)
to the new accessor-based decorators (`property-decorators/`).

## Working agreement

- Execute **one phase at a time**. After each phase, run **`npm run build` only** (no lint / test /
  Playwright — the maintainer runs those).
- **Never commit.** The maintainer reviews, commits, and opens PRs, then green-lights the next phase.
- Migration is **per-component atomic**: migrate every decorator in a file, fix imports, then remove
  `setupValidation` in the same change.

## Background / key facts

- **Old model** (`property-checkers` + `validate.decorator.ts`): decorators stash metadata on the
  prototype; `setupValidation(this)` must be called manually in `connectedCallback` /
  `componentWillUpdate` to run them.
- **New model** (`property-decorators`): `createValidatorDecorator` installs property accessors
  (get/set) and patches `componentDidLoad`. Validation runs automatically on load and on every prop
  set — **no `setupValidation`, no lifecycle hook needed**. Mechanism is proven in another design
  system.
- **Semantic shift:** new validators skip empty values by default unless `validateEmptyValues` is set;
  `@Required` is the separate, **non-throwing** (`console.error`) blocking check.
- The new folder currently **does not compile** (imports a non-existent `@/` alias and utils that only
  live inside `property-checkers/`).
- Scope: ~512 decorator usages across ~60 components, 188 `setupValidation` lines.
- `validateProperty` and the generic `@Validate()` are **unused** in components.

## Decisions locked in

- Map `RequiredAnd*` and the required-implying plain variants to `@Required()` + `@<Check>`; accept
  non-throwing `console.error` (no preservation of the old `throw`).
- Use `@utils` / relative imports. **Do not** introduce a `@/` alias. Consolidate
  `PropertyType`/`PrimitiveType`/`ReferenceType` into one place.
- Delete the old code **last** (swap original steps 3 and 4).
- Hybrid codemod: bulk `EmptyOr*` renames automated; ~30 special cases by hand.
- Remove `setupValidation` only after a file has zero old decorators. Delete the whole lifecycle hook
  when validation was its only statement; otherwise remove just the line.
- Test the **pure utils only** — not decorators or components.
- Export new decorators through the **`@utils`** barrel (`packages/core/src/utils/index.ts`).
- Verify each phase with **`npm run build`** only.

---

## Phase 1 — Make the new folder compile & wire it up

No component files touched; old decorators keep working.

- [x] Move shared utils out of `property-checkers/` to the `@utils` root: `is-value-empty.ts`,
      `is-iso-date.ts`, `has-value.ts`. (`constants.ts` dropped — `EMPTY_VALUES` inlined into
      `is-value-empty.ts` to avoid a generic `constants.ts` at the utils root.)
- [x] Consolidate types: deleted `property-decorators/types.ts`; `property-types.ts` moved to the
      `@utils` root as the single source; `array-of.ts` and `type.ts` now import `../property-types`.
- [x] Fix new-decorator imports off the non-existent `@/` alias → relative (`../is-value-empty`,
      `../property-types`).
- [x] Repoint old `property-checkers` files to the moved utils (`../is-value-empty`,
      `../is-iso-date`, `../property-types`); also repointed `validate.decorator.ts`'s `PropertyType`
      import.
- [x] Repoint `utils/test/has-value.spec.ts` import to `../has-value`.
- [x] Add `export * from './property-decorators'` (plus the moved utils) to `@utils/index.ts`.
- [x] Gate: `npm run build` — green (7/7 tasks, Stencil core compiled).

## Phase 2 — Unit tests for the moved pure utils only

- [x] Function specs for `is-iso-date` (`test/is-iso-date.spec.ts`), mirroring existing style.
- [x] Function specs for `is-value-empty` (`test/is-value-empty.spec.ts`).
- [x] Function specs for `has-value` — existing `test/has-value.spec.ts` already covers it (import
      repointed in Phase 1).
- [x] Gate: `npm run build` — green (7/7). Note: build does not run specs; maintainer runs `npm test`.

## Phase 3 — Migrate components (hybrid codemod, per-component atomic)

Mapping:

| Old                                                 | New                             |
| --------------------------------------------------- | ------------------------------- |
| `@ValidateEmptyOrOneOf(...X)` (136)                 | `@OneOf(X)`                     |
| `@ValidateEmptyOrType('t')` (346)                   | `@Type('t')`                    |
| `@ValidateEmptyOrPattern(p)` (1)                    | `@Pattern(p)`                   |
| `@ValidateEmptyOrUrl()` (1)                         | `@Url()`                        |
| `@ValidateEmptyOrArrayOf('t')` (1)                  | `@ArrayOf('t')`                 |
| `@ValidateEmptyOrDate()` (1)                        | `@DateValue()`                  |
| `@ValidateIsoDate()` (1)                            | `@IsoDate()`                    |
| `@ValidateRequiredAndOneOf(...X)` (8)               | `@Required()` + `@OneOf(X)`     |
| `@ValidateRequiredAndType('t')` (8)                 | `@Required()` + `@Type('t')`    |
| `@ValidateRequiredAndUrl()` (1)                     | `@Required()` + `@Url()`        |
| `@ValidateRequiredAndPattern(p)` (1)                | `@Required()` + `@Pattern(p)`   |
| `@ValidateRequiredAndArrayOf('t')` (1)              | `@Required()` + `@ArrayOf('t')` |
| plain `@ValidateOneOf(...X)` (1, required-implying) | `@Required()` + `@OneOf(X)`     |
| plain `@ValidateType('t')` (1, required-implying)   | `@Required()` + `@Type('t')`    |

Notes:

- **Spread → array** arg change for `OneOf` / `ArrayOf`.
- Per file: migrate all decorators → fix imports → remove `setupValidation` (delete whole hook if it
  was the only statement, else remove just the line).

- [x] Wrote ts-morph codemod (`scratchpad/migrate-decorators.cjs`): decorator rewrite via raw
      string-splice (precise indentation), `@utils` import merge/cleanup, `setupValidation` +
      empty-lifecycle removal, stale `setupValidation` comment stripping.
- [x] Ran codemod across all **59** components.
- [x] No hand-fixes needed: components only use 4 decorator types in reality
      (`EmptyOrType`→`Type`, `EmptyOrOneOf`→`OneOf`, `RequiredAndType`→`Required`+`Type`,
      `RequiredAndOneOf`→`Required`+`OneOf`). The "rare" decorators were only JSDoc examples. Bonus:
      3 non-spread `OneOf(ARRAY)` latent bugs fixed by the new array-arg signature.
- [x] Removed `setupValidation` calls + collapsed empty lifecycle hooks.
- [x] Merged duplicate `@utils` imports into one (4 files: data/data-item/data-label/badge) and
      removed now-unused old-decorator imports.
- [x] Removed 5 vestigial empty `validateProps()` no-op methods + their calls
      (`scratchpad/cleanup-validateprops.cjs`).
- [x] Gate: `npm run build` — green (7/7). Decorator totals match old: 352 `Type`, 142 `OneOf`,
      14 `Required`. 59 files, +696/−1101.
- [ ] NOTE for maintainer: a few orphaned divider comment blocks remain (e.g. badge's empty
      "PROPERTY VALIDATION" section) — cosmetic; `npm run format` / `ds-lint-component` will tidy.

## Phase 4 — Delete the old code

Only once Phase 3 leaves **zero** old decorator usages.

- [x] Verified zero external consumers of all old symbols (check*, Validate*, setupValidation,
      validateProperty, VALIDATE_METADATA, PropertyType-from-checkers).
- [x] Deleted `property-checkers/` (via `git rm`).
- [x] Deleted `validate.decorator.ts` (incl. unused `validateProperty` and generic `@Validate`).
- [x] Removed both `@utils` barrel exports (`./property-checkers/`, `./validate.decorator`).
- [x] Gate: `npm run build` — green (7/7).
