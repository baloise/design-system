# Rename `ds-input-stepper` → `ds-counter`

## Context

The design system has two numeric-looking components: `ds-number-input` (a real, typeable `<input>` with formatting/validation) and `ds-input-stepper` (a **read-only** `<span>` value flanked by decrease/increase buttons — no editable field at all). The "input" in `ds-input-stepper`'s name is misleading, and "stepper" is now doubly confusing because the repo also has `ds-steps`, a form-wizard step-nav component. After comparing naming in other systems (Apple's `Stepper`/`UIStepper`, Chakra's `NumberInputStepper` sub-part, e-commerce "quantity counter" patterns), we settled on **`ds-counter`** — it doesn't collide with `ds-steps` and matches the common "quantity counter" term for this exact non-editable increment/decrement pattern.

This is a pure mechanical rename (tag, class, file, and identifier names only) with **no behavior change**. Breaking changes are explicitly out of scope to worry about — no deprecation shim, no dual-export, no backwards-compat alias. History-preserving docs (ADRs) get updated per user decision, since they're being brought in line with the new name rather than left as-is.

## Renaming pattern

Throughout, apply this literal substitution consistently, longest-match first, case-preserving:

| Old | New |
|---|---|
| `ds-input-stepper` (tag) | `ds-counter` |
| `InputStepper` (class/type prefix) | `Counter` |
| `input-stepper` (file/dir names, kebab id) | `counter` |
| `inputStepper` (camelCase, e.g. `inputStepperId`) | `counter` |
| `INPUTSTEPPER` (storybook doc-config constants) | `COUNTER` |
| `i18nDsInputStepper` / `I18nDsInputStepper` | `i18nDsCounter` / `I18nDsCounter` |
| `#stepper` (element id in render/SCSS) | `#counter` |
| `part="stepper"` | `part="counter"` |
| `data-testid="ds-input-stepper-*"` | `data-testid="ds-counter-*"` |
| `--input-stepper-*` (local SCSS custom props) | `--counter-*` |
| `--mod-input-stepper-*` | `--mod-counter-*` |
| Storybook title `InputStepper` | `Counter` |

Do **not** touch: `bal-input-stepper` references in `docs/agents/component-audit.md` (that's the *old*, unrelated legacy BAL component name — different codebase, not ours) — leave that file alone.

## Files to change

### 1. Core component (`packages/core/src/components/input-stepper/` → `.../counter/`)

Rename the directory and every file inside it, then apply the substitution table to file contents:

- `input-stepper.tsx` → `counter.tsx` — class `InputStepper` → `Counter`, `@Component({ tag: 'ds-input-stepper', ... })` → `ds-counter`, `inputStepperId`/`InputStepperIds` → `counterId`/`CounterIds`, `@Logger('input-stepper')` → `@Logger('counter')`, console warning tag `[ds-input-stepper]` → `[ds-counter]`, `part="stepper"` → `part="counter"`, `id="stepper"` → `id="counter"`, all `data-testid="ds-input-stepper-*"` → `ds-counter-*`, JSDoc comment updated, imports from renamed sibling files.
- `input-stepper.interfaces.ts` → `counter.interfaces.ts` — `InputStepperCustomEvent`, `InputStepper{Change,Input,Increase,Decrease,Focus,Blur}Detail/Event` → `Counter...`, `HTMLDsInputStepperElement` → `HTMLDsCounterElement`.
- `input-stepper.i18n.ts` → `counter.i18n.ts` — `I18nDsInputStepper` → `I18nDsCounter`, `i18nDsInputStepper` → `i18nDsCounter` (translations unchanged).
- `input-stepper.utils.ts` → `counter.utils.ts` — no internal renames needed (generic function names), just the file move + import path updates elsewhere.
- `input-stepper.utils.spec.ts` → `counter.utils.spec.ts` — update import path.
- `input-stepper.host.scss` → `counter.host.scss` — rename all `@prop --input-stepper-*` doc comments and `@include vars.local(input-stepper-*, ...)` / `var(--_input-stepper-*)` refs to `counter-*`; `#stepper` selector → `#counter`.
- `test/input-stepper.a11y.play.ts` → `test/counter.a11y.play.ts`
- `test/input-stepper.component.play.ts` → `test/counter.component.play.ts`
- `test/input-stepper.visual.play.ts` → `test/counter.visual.play.ts`
- `test/input-stepper.visual.html` → `test/counter.visual.html`

All of these need their internal tag/selector/testid references updated too (grep each after rename to confirm no leftover `input-stepper` strings).

### 2. Generated files — do NOT hand-edit, regenerate via build

- `packages/core/src/components.d.ts`, `packages/core/src/interfaces.d.ts`
- `packages/angular/src/generated/proxies.ts`, `packages/angular/src/generated/meta.ts`
- `packages/react/src/generated/components.ts`, `components.server.ts`
- `apps/toky/src/tokens/code-usage.generated.json`

Run `pnpm build` (or targeted `pnpm --filter @baloise/ds-core build`, `pnpm --filter @baloise/ds-angular build`, `pnpm --filter @baloise/ds-react build`) after the source rename to regenerate these.

### 3. Hand-authored wrapper/registration files

- `packages/core/src/global/constants/tags.constant.ts` — `"ds-input-stepper"` → `"ds-counter"` (keep array sorted if it's alphabetized).
- `packages/angular/src/forms/ds-input-stepper.ts` → `ds-counter.ts` — `DsInputStepper` class/selector → `DsCounter`, `ds-input-stepper` selector → `ds-counter`, update the JSDoc block's prose and references (`DsInputStepperInputs/Outputs` → `DsCounterInputs/Outputs`, `HTMLDsInputStepperElement` → `HTMLDsCounterElement`).
- `packages/angular/src/index.ts` — `export { DsInputStepper } from './forms/ds-input-stepper'` → `export { DsCounter } from './forms/ds-counter'`.
- `packages/react/src/wrappers.ts` and `packages/react/src/wrappers.server.ts` — `DsInputStepper` → `DsCounter` in the re-export list (keep alphabetical order).
- `packages/playwright/src/lib/components/input-stepper.po.ts` → `counter.po.ts` — class `DsInputStepper` → `DsCounter`, locator `part="stepper"` → `part="counter"` (matches the SCSS/tsx part rename above).
- `packages/playwright/src/lib/components/index.ts` — `export * from './input-stepper.po'` → `export * from './counter.po'`.

### 4. Storybook (`apps/storybook/src/components/input-stepper/` → `.../counter/`)

- Rename the directory.
- `input-stepper.doc-config.ts` → `counter.doc-config.ts` — `INPUTSTEPPER_DOC_CONFIG`/`INPUTSTEPPER_TAB_TITLES`/`getInputStepperTabs` → `COUNTER_DOC_CONFIG`/`COUNTER_TAB_TITLES`/`getCounterTabs`; `section: 'Components / Forms / InputStepper'` → `'Components / Forms / Counter'`; all `storyId` strings (`components-forms-inputstepper-*`) → `components-forms-counter-*`.
- `input-stepper.stories.ts` → `counter.stories.ts` — `title: 'Components/Forms/InputStepper/Variants'` → `'Components/Forms/Counter/Variants'`, `tag = 'ds-input-stepper'` → `'ds-counter'`, all inline `<ds-input-stepper>` markup → `<ds-counter>`.
- All six MDX files (`1-Overview.mdx` … `6-Testing.mdx`) — update prose, headings, and any `<ds-input-stepper>` example markup to `<ds-counter>` / "Counter".
- `apps/storybook/.storybook/story-paths.json` — this looks hand-maintained/checked-in; update the 6 `components-input-stepper-*` keys/paths to `components-counter-*` pointing at the renamed MDX paths (confirm whether this file is actually build-generated — if so, regenerate instead of hand-editing).
- `apps/storybook/src/components/00-overview.mdx` — `<ds-input-stepper></ds-input-stepper>` example → `<ds-counter></ds-counter>`.

### 5. Integration app (`apps/integration-angular`)

- `src/app/input-stepper-demo/input-stepper-demo.ts` and `.html` → rename dir + files to `counter-demo/counter-demo.ts`/`.html`; class `InputStepperDemo` → `CounterDemo`; any `<ds-input-stepper>` markup → `<ds-counter>`.
- `src/app/app.ts` — import path and `InputStepperDemo` → `CounterDemo`.
- `src/app/app.html` — `<app-input-stepper-demo />` → `<app-counter-demo />`.
- `e2e/input-stepper.spec.ts` → `e2e/counter.spec.ts` — update selectors/content.

### 6. Docs

- `docs/adr/0016-ds-input-stepper-no-form-control.md` → `docs/adr/0016-ds-counter-no-form-control.md` — update title and body's `ds-input-stepper` references to `ds-counter`.
- `docs/adr/0017-ds-input-stepper-big-js-decimal-arithmetic.md` → `docs/adr/0017-ds-counter-big-js-decimal-arithmetic.md` — same.
- `docs/adr/0025-a11y-title-tooltip-integration.md` — line referencing `input-stepper already pass` → `counter already pass`.
- `docs/agents/component-category-migration-plan.md` — `input-stepper` in the Forms row → `counter` (keep alphabetical position if the list is sorted — "counter" sorts earlier than "date", so it'll need to move near the front of that Forms list).
- `docs/TODOS.md` — table row `input-stepper` → `counter`.
- Leave `docs/agents/component-audit.md` untouched (refers to legacy `bal-input-stepper`, unrelated).

### 7. Misc

- `cspell.json` — update the `input-stepper`/`inputstepper`-related dictionary entry to `counter` terms if one exists (or drop it if `counter` needs no special-casing).
- `.changeset/large-pugs-count.md` and `.changeset/calm-mirrors-stop.md` — update prose (`ds-input-stepper`, `core/input-stepper`, `input-stepper`) to the `ds-counter`/`core/counter` equivalents; these are still-pending (unreleased) changesets.
- `.changeset/tall-carpets-deny.md` — same (`core/input-stepper: migrated component` → `core/counter: migrated component`).
- Add one new changeset documenting the rename itself, e.g. `@baloise/ds-core`, `@baloise/ds-angular`, `@baloise/ds-react`: `major` bump — "Renamed `ds-input-stepper` to `ds-counter` (tag, class, and all exported types) for clearer naming and to avoid confusion with `ds-steps`." Use the `ds-changeset` skill/CLI (`pnpm changeset`) rather than hand-writing, so the format matches repo conventions.

## Verification

1. `pnpm --filter @baloise/ds-core build` — confirms the Stencil component compiles under the new tag/class and regenerates `components.d.ts`/`interfaces.d.ts`.
2. `pnpm --filter @baloise/ds-angular build` and `pnpm --filter @baloise/ds-react build` — regenerates the framework proxies/wrappers against the new tag.
3. `grep -rn "input-stepper\|InputStepper\|inputStepper\|INPUTSTEPPER" --include="*.*" .` excluding `node_modules`, `dist`, `.next`, `.git` — should return **zero** hits outside `docs/agents/component-audit.md` (intentionally untouched legacy reference).
4. `pnpm --filter @baloise/ds-core test` — run the component's unit/spec tests (`counter.utils.spec.ts`) and confirm they still pass under the new file name.
5. `pnpm play -- --grep="counter"` — run the renamed Playwright a11y/component/visual specs.
6. `pnpm docs` — start Storybook, navigate to `Components/Forms/Counter`, confirm all six doc tabs (Overview/Usage/Variants/Styling/Accessibility/Testing) render and the live component works (increase/decrease buttons, disabled/invalid states).
7. `pnpm --filter integration-angular` app — run/build the integration app and confirm `<app-counter-demo />` renders `<ds-counter>` correctly with `ngModel`/`formControlName` binding intact.
