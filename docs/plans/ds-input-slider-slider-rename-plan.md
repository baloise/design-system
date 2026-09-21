# Rename `ds-input-slider` → `ds-slider`

## Context

`ds-input-slider` renders a noUiSlider-backed slider — like `ds-input-stepper` (now `ds-counter`), it has no native `<input>` element at all; it's a `<div part="slider">` progressively enhanced by noUiSlider. Every major design system (MUI, Chakra, Ant Design, Carbon, Radix) names this pattern just `Slider`, dropping "Input" entirely — there's no existing `ds-slider` naming collision in this repo, so the fix is a straight drop of the "Input" prefix: **`ds-input-slider` → `ds-slider`**.

This is a pure mechanical rename (tag, class, file, and identifier names only) with **no behavior change** and **no backwards-compat shim** — same stance as the `ds-counter` rename: no deprecation alias, no dual export, just a `major` changeset documenting the break.

Scope decisions confirmed for this rename (differs slightly from the `ds-counter` precedent in a few places):

| Artifact | Treatment | Why |
|---|---|---|
| `CHANGELOG.md` (published, released entry re: PR #1665) | **Leave untouched** | Frozen release history — rewriting it to a name that didn't exist at the time would misrepresent history, same principle as leaving `docs/agents/component-audit.md`'s legacy `bal-input-stepper` mention alone. |
| ADRs 0007, 0010 (`ds-input-slider-nouislider`, `ds-input-slider-change-commit`) | **Rename files + update body text** | Same treatment as ADRs 0016/0017 in the `ds-counter` rename. |
| `packages/core/CONTEXT.md` "Input Slider" section | **Fully update** (heading, prose, all identifiers) | Living documentation, not a frozen record — CLAUDE.md treats `CONTEXT.md` as current-state domain docs. |
| `docs/plans/ds-input-phone-plan.md`, `docs/plans/angular-forms-docs-plan.md` (stray `ds-input-slider` name-checks in prose, as a precedent example) | **Update too** | Explicitly requested, despite being tangential to those plans' actual subject. |
| Pending `.changeset/*.md` files mentioning `input-slider` | **Update** | Still unreleased — same as `ds-counter`. |
| Publish | **Write plan doc to `docs/plans/`, then file one GitHub issue** (`ready-for-agent`, milestone `🚀 Release Helvetia Design System v0.0`) | Same process as the `ds-counter` rename. |

## Renaming pattern

| Old | New |
|---|---|
| `ds-input-slider` (tag) | `ds-slider` |
| `InputSlider` (class/type prefix) | `Slider` |
| `input-slider` (file/dir names, kebab id) | `slider` |
| `inputSlider` (camelCase, e.g. `inputSliderId`) | `slider` |
| `INPUTSLIDER` (storybook doc-config constants) | `SLIDER` |
| `INPUT_SLIDER_BRAND_COLORS` / `InputSliderBrandColor` | `SLIDER_BRAND_COLORS` / `SliderBrandColor` |
| `InputSliderPickerController` / `InputSliderPickerConfig` | `SliderPickerController` / `SliderPickerConfig` |
| `--input-slider-*` (local SCSS custom props) | `--slider-*` |
| Storybook title `InputSlider` | `Slider` |

Note: `part="slider"` and `id="slider"` in `input-slider.tsx`'s render already match the target name — **no change needed there** (unlike the `ds-counter` rename, which had to rename `part="stepper"` → `part="counter"`). Likewise there's no `cspell.json` entry specific to `input-slider` to touch, and no `packages/tokens` design-token entries exist for it (confirmed via grep — this component has no `Base.tokens.json` presence, only local SCSS custom properties).

Do **not** touch `CHANGELOG.md`'s historical PR #1665 entry (see table above).

## Files to change

### 1. Core component (`packages/core/src/components/input-slider/` → `.../slider/`)

Rename the directory and every file inside it, applying the substitution table to contents:

- `input-slider.tsx` → `slider.tsx` — class `InputSlider` → `Slider`, `@Component({ tag: 'ds-input-slider', ... })` → `ds-slider`, `inputSliderId`/`InputSliderIds` → `sliderId`/`SliderIds`, `@Logger('input-slider')` → `@Logger('slider')`, imports from renamed sibling files, JSDoc comment. `part`/`id="slider"` stay as-is.
- `input-slider.interfaces.ts` → `slider.interfaces.ts` — `INPUT_SLIDER_BRAND_COLORS` → `SLIDER_BRAND_COLORS`, `InputSliderBrandColor` → `SliderBrandColor`, `InputSliderCustomEvent`, `InputSlider{Change,Input,Blur,Focus,Click}Detail/Event` → `Slider...`, `HTMLDsInputSliderElement` → `HTMLDsSliderElement`.
- `input-slider.utils.ts` → `slider.utils.ts` — no internal renames needed (generic function names, e.g. `clampValue`, `resolveInitialValue`, `decimalsFromStep`), just the file move + import path updates.
- `input-slider.utils.spec.ts` → `slider.utils.spec.ts` — update import path.
- `input-slider.picker.ts` → `slider.picker.ts` — `InputSliderPickerConfig` → `SliderPickerConfig`, `InputSliderPickerController` → `SliderPickerController`, import path to `slider.utils.ts`.
- `input-slider.host.scss` → `slider.host.scss` — rename all `@prop --input-slider-*` doc comments and `@include vars.local(input-slider-*, ...)` / `var(--_input-slider-*)` refs to `slider-*`.
- `test/input-slider.a11y.play.ts` → `test/slider.a11y.play.ts`
- `test/input-slider.component.play.ts` → `test/slider.component.play.ts`
- `test/input-slider.visual.play.ts` → `test/slider.visual.play.ts`
- `test/input-slider.visual.html` → `test/slider.visual.html`

Grep each renamed file afterward to confirm no leftover `input-slider`/`InputSlider` strings.

### 2. Generated files — do NOT hand-edit, regenerate via build

- `packages/core/src/components.d.ts`, `packages/core/src/interfaces.d.ts`
- `packages/angular/src/generated/proxies.ts`, `packages/angular/src/generated/meta.ts`
- `packages/react/src/generated/components.ts`, `components.server.ts`
- `apps/toky/src/tokens/code-usage.generated.json`

Run `pnpm --filter @baloise/ds-core build`, `pnpm --filter @baloise/ds-angular build`, `pnpm --filter @baloise/ds-react build` after the source rename to regenerate these.

### 3. Hand-authored wrapper/registration files

- `packages/core/src/global/constants/tags.constant.ts` — `"ds-input-slider"` → `"ds-slider"` (keep array sorted if alphabetized).
- `packages/angular/src/forms/ds-input-slider.ts` → `ds-slider.ts` — `DsInputSlider` class/selector → `DsSlider`, `ds-input-slider` selector → `ds-slider`, update JSDoc prose and references (`DsInputSliderInputs/Outputs` → `DsSliderInputs/Outputs`, `HTMLDsInputSliderElement` → `HTMLDsSliderElement`, the `input-slider.tsx` doc-comment reference → `slider.tsx`).
- `packages/angular/src/index.ts` — `export { DsInputSlider } from './forms/ds-input-slider'` → `export { DsSlider } from './forms/ds-slider'`.
- `packages/react/src/wrappers.ts` and `packages/react/src/wrappers.server.ts` — `DsInputSlider` → `DsSlider` in the re-export list (keep alphabetical order).
- `packages/playwright/src/lib/components/input-slider.po.ts` → `slider.po.ts` — class `DsInputSlider` → `DsSlider`; internal comment referencing `input-slider.picker.ts` → `slider.picker.ts`. Locators (`[part="slider"]`) stay as-is.
- `packages/playwright/src/lib/components/index.ts` — `export * from './input-slider.po'` → `export * from './slider.po'`.

### 4. Storybook (`apps/storybook/src/components/input-slider/` → `.../slider/`)

- Rename the directory.
- `input-slider.doc-config.ts` → `slider.doc-config.ts` — `INPUTSLIDER_DOC_CONFIG`/`INPUTSLIDER_TAB_TITLES`/`getInputSliderTabs` → `SLIDER_DOC_CONFIG`/`SLIDER_TAB_TITLES`/`getSliderTabs`; `section: 'Components / Forms / InputSlider'` → `'Components / Forms / Slider'`; all `storyId` strings (`components-forms-inputslider-*`) → `components-forms-slider-*`.
- `input-slider.stories.ts` → `slider.stories.ts` — `title: 'Components/Forms/InputSlider/Variants'` → `'Components/Forms/Slider/Variants'`, `tag = 'ds-input-slider'` → `'ds-slider'`, `type Args = JSX.DsInputSlider` → `JSX.DsSlider`, all inline `<ds-input-slider>` markup → `<ds-slider>`.
- All six MDX files (`1-Overview.mdx` … `6-Testing.mdx`) — update prose, headings, and `<ds-input-slider>` example markup to `<ds-slider>` / "Slider".
- `apps/storybook/.storybook/story-paths.json` — update the 6 `components-input-slider-*` keys/paths to `components-slider-*` pointing at renamed MDX paths (confirm whether this file is hand-maintained or build-generated, same caveat as the `ds-counter` rename — if generated, regenerate instead).
- `apps/storybook/src/components/00-overview.mdx` — `<ds-input-slider label="Volume" ...>` example → `<ds-slider label="Volume" ...>`.

### 5. Integration app (`apps/integration-angular`)

- `src/app/input-slider-demo/input-slider-demo.ts` and `.html` → rename dir + files to `slider-demo/slider-demo.ts`/`.html`; class `InputSliderDemo` → `SliderDemo`; any `<ds-input-slider>` markup → `<ds-slider>`.
- `src/app/app.ts` — import path and `InputSliderDemo` → `SliderDemo`.
- `src/app/app.html` — `<app-input-slider-demo />` → `<app-slider-demo />`.
- `e2e/input-slider.spec.ts` → `e2e/slider.spec.ts` — update selectors/content.

### 6. Docs

- `docs/adr/0007-ds-input-slider-nouislider.md` → `docs/adr/0007-ds-slider-nouislider.md` — update title and body's `ds-input-slider`/`InputSlider` references to `ds-slider`/`Slider`.
- `docs/adr/0010-ds-input-slider-change-commit.md` → `docs/adr/0010-ds-slider-change-commit.md` — same.
- `packages/core/CONTEXT.md` — heading `## Input Slider (ds-input-slider)` → `## Slider (ds-slider)`; update every `ds-input-slider`/`InputSlider`/`bal-input-slider` (leave `bal-input-slider` legacy-origin mentions as historical context, only rename the *current* `ds-*` identifiers), `input-slider.*` file references, and the two ADR links to point at the renamed ADR filenames from the step above.
- `docs/agents/component-category-migration-plan.md` — `input-slider` in the Forms row → `slider` (resort alphabetically within that list).
- `docs/TODOS.md` — table row `input-slider` → `slider`.
- `docs/plans/ds-input-phone-plan.md` — update the `ds-input-slider` precedent mentions (lines ~52, 55, 229, 236) to `ds-slider`.
- `docs/plans/angular-forms-docs-plan.md` — update the `ds-input-slider` mention in the ticket-scope list to `ds-slider`.
- Leave `CHANGELOG.md` untouched (see Context table).

### 7. Misc

- `packages/core/src/components/form/form.mixin.scss` — comment referencing `ds-input-slider` as an example → `ds-slider`.
- `packages/angular/src/forms/ds-file-upload.ts` — comment referencing `ds-input-slider`'s number value → `ds-slider`.
- `scripts/create-changeset.mjs` — update the `input-slider` example in the header comment/docstring to `slider` (not a hardcoded enum — purely illustrative, but keep it accurate).
- `.changeset/new-guests-attend.md` — `**input-slider**: migrated component` → `**slider**: migrated component`.
- `.changeset/calm-mirrors-stop.md` — update its `input-slider` mention in the prose list to `slider`.
- Add one new changeset: `@baloise/ds-core`, `@baloise/ds-angular`, `@baloise/ds-react`: `major` bump — "Renamed `ds-input-slider` to `ds-slider` (tag, class, and all exported types) to match common design-system naming (no native `<input>` element) and drop the redundant 'Input' prefix." Use `pnpm changeset` / the `ds-changeset` skill.

## Verification

1. `pnpm --filter @baloise/ds-core build` — confirms the Stencil component compiles under the new tag/class and regenerates `components.d.ts`/`interfaces.d.ts`.
2. `pnpm --filter @baloise/ds-angular build` and `pnpm --filter @baloise/ds-react build` — regenerates framework proxies/wrappers against the new tag.
3. `grep -rn "input-slider\|InputSlider\|inputSlider\|INPUTSLIDER" --include="*.*" .` excluding `node_modules`, `dist`, `.next`, `.git` — should return **zero** hits except `CHANGELOG.md`'s intentionally-untouched historical entry.
4. `pnpm --filter @baloise/ds-core test` — run `slider.utils.spec.ts` and confirm it passes under the new file name.
5. `pnpm play -- --grep="slider"` — run the renamed Playwright a11y/component/visual specs.
6. `pnpm docs` — start Storybook, navigate to `Components/Forms/Slider`, confirm all six doc tabs render and the live component works (drag, keyboard, disabled/invalid states, brand colors).
7. `apps/integration-angular` — run/build and confirm `<app-slider-demo />` renders `<ds-slider>` correctly with `ngModel`/`formControlName` binding intact.
