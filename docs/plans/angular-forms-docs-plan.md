# Plan: Update Angular reactive-forms docs once forms integration lands

## Context

`apps/storybook/src/development/00-guides/02-form.mdx` (`<AngularFramework>` section, lines 91–147) documents the **old** reactive-forms pattern: a custom `ds-ng-error` component, a `dsAutoFocus` directive, and manual `FormGroup`/`Validators` wiring with no mention of automatic invalid-state handling.

Milestone **✏️ Angular Forms & Services** (#8) is replacing this with a proper `ControlValueAccessor`-based integration. The foundation ticket #2049 ("Angular forms foundation + ds-input reactive-forms support") establishes:
- A shared abstract base directive providing standard `ControlValueAccessor` plumbing (`writeValue`, `registerOnChange`, `registerOnTouched`, `setDisabledState`)
- Automatic invalid-state behavior driven by `NgControl.statusChanges` — when a control is touched and invalid, `invalid`/`invalidText` are set automatically from `FormControl.errors`, with an `autoInvalidOff` prop to opt out
- This pattern gets rolled out per-component across #2050–#2058 (`ds-textarea`, `ds-date`, `ds-number-input`, `ds-input-slider`, `ds-radio-group`, `ds-segment`, `ds-checkbox-group`, `ds-file-upload`, `ds-select`)

None of these tickets touch documentation. Once they land, the existing docs will describe a pattern that no longer exists (`ds-ng-error`, manual validator wiring) and won't mention the new automatic invalid-state behavior or `autoInvalidOff`, which consumers need to know about.

## Plan

Create a GitHub issue in `baloise/design-system`:

- **Milestone**: `✏️ Angular Forms & Services` (#8)
- **Labels**: `ready-for-agent`
- **Title**: `Storybook: update Angular reactive-forms docs for ControlValueAccessor integration`
- **Body** (What to build / Acceptance criteria, matching the pattern in #2222):
  - **What to build**: Rewrite the `<AngularFramework>` section of `apps/storybook/src/development/00-guides/02-form.mdx` to document the new `ControlValueAccessor`-based integration instead of the old `ds-ng-error`/`dsAutoFocus` pattern:
    - Show a working `formControlName` example per the new pattern (no `ds-ng-error`, no manual `dsAutoFocus` wiring unless still applicable)
    - Explain automatic invalid-state behavior: when a control is touched + invalid, `invalid`/`invalidText` are set automatically from `FormControl.errors`
    - Explain the `autoInvalidOff` prop and when a consumer would use it
    - Note which components support this (link out or list, based on which of #2050–#2058 have landed at ticket time)
  - **Acceptance criteria**:
    - [ ] `ds-ng-error` / old manual-wiring example removed or clearly marked legacy if still relevant to older versions
    - [ ] New reactive-forms example uses the `ControlValueAccessor` pattern from #2049
    - [ ] Automatic invalid-state behavior (touched + invalid → `invalid`/`invalidText`) is documented with a short explanation of how `invalidText` is derived from `FormControl.errors`
    - [ ] `autoInvalidOff` is documented
    - [ ] Docs list/link only the components that have landed reactive-forms support at ticket time (soft dependency on #2050–#2058 — include what's landed, skip the rest rather than blocking)
    - [ ] Page still renders correctly in Storybook (`pnpm docs`) with no MDX/build errors
  - **Blocked by**: #2049 (forms foundation) must land first; ideally most/all of #2050–#2058 have landed too so the docs reflect broad component coverage rather than just `ds-input`.

## Verification

- `gh issue view <new-number>` to confirm milestone, label, and body rendered as expected.
- Confirm the issue appears in `gh issue list --milestone "✏️ Angular Forms & Services"`.
