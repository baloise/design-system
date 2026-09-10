# Implementation plan: `ds-input-phone`

Status: planned, not implemented. This document is the output of a
`/grill-with-docs` design session; the decisions below were confirmed with
the user before writing this plan. Vocabulary referenced throughout is
recorded in [`packages/core/CONTEXT.md`](../../packages/core/CONTEXT.md#phone-field-ds-input-phone).
Related ADRs:
[0023](../adr/0023-ds-input-phone-bespoke-country-picker.md),
[0024](../adr/0024-ds-input-phone-lazy-svg-flags.md).

The original planning session scoped automated tests and Storybook
documentation out. The implementation follow-up expands delivery to the
repository's standard new-component checklist: unit, interaction, visual,
accessibility, and Page Object coverage plus the complete Storybook
documentation set. `input-phone.visual.html` remains the manual-verification
fixture and visual-regression source.

## Decisions locked in (do not relitigate without discussion)

| Area | Decision |
|---|---|
| Component shape | Standalone: own `<input>` + own `Field` wrapper, sibling to `ds-input`/`ds-select`, not composing either |
| Canonical value | `value: string`, E.164 (e.g. `+41791234567`) |
| Available countries | `countries: string \| string[]` (comma string or array); `undefined` = all countries |
| Country mismatch | `country` outside `countries` → dev warning + fallback to `countries[0]` |
| Country props | `initialCountry` (uncontrolled seed) vs. `country` (live/controlled) |
| Country picker | Bespoke internal picker (button + `aria-haspopup="listbox"` popup), not an extension of `ds-select` |
| Flags | New SVG flag dependency, loaded per-country and lazily (no emoji, no sprite sheet) |
| Phone library | `libphonenumber-js/min` — `AsYouType`, `getCountries()`, `getCountryCallingCode()` only |
| Formatting timing | Live via `AsYouType` while typing, re-formatted again on blur |
| Number field input | `type="text"` + `inputmode="tel"` (not `type="tel"`) |
| Events | `dsChange`/`dsInput` payload `{ value, country, nationalNumber }`; dedicated `dsCountryChange` on picker selection |
| Picker ARIA | Button trigger + listbox popup with internal filter input (not editable `role="combobox"`) |
| Country names | `Intl.DisplayNames`, keyed off existing `language` prop — no shipped i18n dataset |
| Validation | None. No `isValidPhoneNumber`/`isPossiblePhoneNumber` anywhere in this component |

---

## Phase 0 — Repository investigation (recap; already done during grilling)

Findings that Phase 1+ build on — re-verify current line numbers before
editing, this doc reflects a point-in-time investigation:

- `packages/core/src/components/input/` (`ds-input`) — reference for file
  structure (`.tsx`, `.interfaces.ts`, `.host.scss`, `.style.scss`,
  `.mixin.scss`, `test/*.visual.html`), the `@Prop()`/`@Event()` naming
  convention (`dsBlur/dsFocus/dsInput/dsChange/dsClick/dsKeyPress`), and
  `description` (not `helperText`) as the helper-text prop name.
- `packages/core/src/components/input/field.util.tsx` — the shared `Field`
  functional component and `FieldInterface` type. Co-located per component,
  not a global util — `ds-input-phone` needs its **own** copy/variant
  (following `ds-select`'s and `ds-input-slider`'s precedent of each
  implementing `FieldInterface` on their own class), not an import from
  `input/field.util.tsx`. Confirm during Phase 4 whether the repo has since
  centralized this (check `ds-select`'s and `ds-input-slider`'s current
  imports first).
- `packages/core/src/components/select/` (`ds-select`) — reference for
  `SelectPickerController`-style controller separation
  (`select.picker.ts`: init in `componentDidLoad`, `destroy()` in
  `disconnectedCallback`, `setValue()`/`setDisabled()`/`focus()`), the
  `searchable` filter-input pattern, and `connectLabelToTrigger()` for
  wiring `aria-labelledby`/`aria-describedby` onto a non-native trigger
  element — directly reusable for the phone picker's button trigger.
- No existing flag assets, ISO-3166 data, or `libphonenumber-js` anywhere in
  the repo — greenfield.
- `packages/core/package.json` `dependencies` (not `devDependencies`)
  already include real bundled runtime libraries per-component
  (`slim-select`, `imask`, `air-datepicker`, `big.js`, `nouislider`,
  `@floating-ui/dom`, etc.) — precedent for adding `libphonenumber-js` and
  the chosen flag package the same way.
- `test/input.visual.html` / `test/select.visual.html` conventions: shared
  HTML shell, `<main class="container">`, one `<section data-testid="...">`
  per scenario with a `<span>Label</span>` heading and an `<!-- Basic Style
  -->`-style comment, `data-testid` mapping 1:1 to Playwright snapshot names
  (not relevant here since automated visual regression is out of scope, but
  keep the markup convention for manual-verification consistency).

## Phase 1 — API and architecture

**Component name**: `ds-input-phone`, in
`packages/core/src/components/input-phone/`.

**Props** (mirror `ds-input`'s `FieldInterface` surface plus phone-specific
additions):

- `value: string | null` — E.164, mutable, the canonical value.
- `name: string` — default `ds-input-phone-${id}`, matching `ds-input`'s
  pattern.
- `countries: string | string[]` — allow-list of ISO 3166-1 alpha-2 codes;
  `undefined`/empty = all countries from `getCountries()`.
- `initialCountry: string | undefined` — uncontrolled seed, read once in
  `componentWillLoad`.
- `country: string | undefined` — live/controlled selected country. Watched
  (`@Watch('country')`) for external changes; validated against `countries`
  on every relevant change (see Phase 3 validation logic).
- `label`, `description`, `invalid`, `invalidText`, `required`, `disabled`,
  `readonly`, `color`, `language` — same shape/defaults as `ds-input`/
  `ds-select`, passed straight through to `Field`.
- `placeholder: string | undefined` — applies to the national-number field
  only (never the picker).
- Explicitly **not** ported: `type`, `mask`, `pattern`, `multiple`, `accept`
  — not meaningful for this component's fixed input shape.

**Events**:

- `dsInput: EventEmitter<PhoneInputDetail>` — fires on every keystroke/paste
  in the number field, live-formatted value already applied.
- `dsChange: EventEmitter<PhoneChangeDetail>` — fires on blur/commit, after
  the final blur-time reformat.
- `dsCountryChange: EventEmitter<{ country: string }>` — fires only when the
  picker selection changes (distinct from digit edits).
- `dsFocus` / `dsBlur` — same shape as `ds-input`'s, fired from the number
  field.
- `PhoneInputDetail`/`PhoneChangeDetail` shape:
  `{ value: string; country: string; nationalNumber: string }`.

**Explicit open items to resolve in Phase 4** (implementation-detail level,
not re-opening grilled decisions):

- Exact `@Watch()` ordering between `countries` and `country` to avoid
  double-firing `dsCountryChange` when both change in the same render pass.
- Whether `value` or `country`+`nationalNumber` is the primary internal
  source of truth (recommend: `country` + raw national digits are the
  internal state; `value` is derived/computed for the public prop/event
  payload — avoids re-parsing E.164 on every keystroke).

## Phase 2 — Phone-number formatting

- Import from `libphonenumber-js/min` only: `AsYouType`, `getCountries`,
  `getCountryCallingCode`. Do not import the default/full entry point.
- Maintain one `AsYouType` instance per component instance, re-created
  whenever `country` changes (an `AsYouType` instance is bound to a country
  at construction time).
- **Typing**: on each `input` event, feed the raw input value through the
  current `AsYouType` instance's `.input(...)`, and set the field's
  displayed value to the formatted result. Track and restore cursor
  position across the reformat (the trickiest part — `ds-date`'s
  `imask`-based cursor handling in `input.mask.ts` is a reference point for
  the general problem shape, though the library differs).
- **Blur**: re-run formatting once more for a stable final form (guards
  against `AsYouType`'s incremental state leaving an odd intermediate
  format after a paste or rapid edit). Recompute `value` (E.164) and
  `nationalNumber` at this point and fire `dsChange`.
- **Country changes**: re-create the `AsYouType` instance for the new
  country and re-format whatever national-number digits are currently
  present against the new country's rules. Do not clear the number field on
  country change (a user picking the wrong country by mistake shouldn't
  lose their typed digits).
- **Pasted values**: if a pasted value includes a leading `+` and a
  different country's calling code than the currently selected country,
  detect this (`AsYouType` surfaces the parsed country via
  `.getNumber()?.country` once enough digits are present) and update
  `country` to match, rather than mis-formatting the paste against the
  wrong country. If the parsed country isn't in `countries`, apply the
  same mismatch fallback as Phase 1.
- **Empty value**: `value` is `null`/`''`, national field is empty,
  `AsYouType` instance is reset/idle. Does not error.
- **Existing/initial formatted values**: if `value` (E.164) is set on load,
  derive `country` from it (if not already set via `initialCountry`) and
  the initial national-number display via the library's parsing of that
  E.164 string, then format for display the same as any other value.

## Phase 3 — Country selector

- **Country data**: build once (module-level, not per-instance) from
  `getCountries()` (all ISO 3166-1 alpha-2 codes `libphonenumber-js/min`
  knows) crossed with `getCountryCallingCode(code)` for the prefix. Country
  display name is **not** precomputed — call `Intl.DisplayNames(language,
  { type: 'region' }).of(code)` lazily per render, keyed off the current
  `language` prop, so it stays correctly localized if `language` changes.
- **Filtering by `countries` prop**: parse `countries` (split comma-string
  or use array as-is) into a `Set<string>` once per change; the full country
  data list is filtered against it when building picker options. Empty/
  `undefined` `countries` skips filtering entirely (all countries shown).
- **Country mismatch validation**: whenever `countries` or `country`
  changes, check `country` is in the effective available set; if not, log
  `console.warn` (following whatever DS logging convention `Loggable`
  establishes — check `ds-select`/`ds-input` for the existing warning
  format before inventing a new one) and reset `country` to the first
  available entry.
- **Trigger**: a `<button type="button">` inside the field's `start` slot
  (same slot `ds-input` uses for prefix content), showing the selected
  flag + calling code (e.g. `🇨🇭 +41` visually, but per ADR 0024 the flag is
  an `aria-hidden` SVG, and the calling code plus an
  `aria-label`/`sr-only` country name carry the accessible information).
  `aria-haspopup="listbox"`, `aria-expanded` toggled on open/close.
- **Popup**: a listbox (`role="listbox"` on the list, `role="option"` per
  entry, `aria-selected` on the current one) with an internal filter
  `<input>` at the top, modeled on `ds-select`'s searchable dropdown
  interaction (arrow-key navigation, type-ahead, `Enter` to select, `Esc`
  to close and return focus to the trigger). Each option row: flag (
  `aria-hidden`) + localized country name (visible text, the accessible
  name via the option's text content) + calling code.
- **Keyboard interaction**: `Enter`/`Space` on trigger opens popup and
  focuses the filter input; typing filters the list; `↑`/`↓` moves the
  active option; `Enter` commits and closes; `Esc` closes without
  committing.
- **Disabled/readonly propagation**: `disabled` on the host disables both
  the trigger button and the number field. `readonly` disables the trigger
  (no country changes) but keeps the number field focusable/selectable
  per standard readonly-text-input semantics (matches `ds-input`'s
  `readonly` behavior).

## Phase 4 — Component implementation

Suggested build order (each step should be independently buildable/visually
checkable before moving on):

1. Scaffold `packages/core/src/components/input-phone/` files:
   `input-phone.tsx`, `input-phone.interfaces.ts`, `input-phone.host.scss`,
   `input-phone.style.scss` (as needed), `field.util.tsx` (own copy,
   implementing `FieldInterface`), `country-data.ts` (module-level country
   list builder from Phase 3), `test/input-phone.visual.html` (empty
   scaffold, filled in Phase 7).
2. Implement the national-number field + `Field` wrapper only, hardcoded to
   one country, no picker yet — validates the `Field`/a11y/props plumbing
   matches `ds-input`'s conventions before adding complexity.
3. Wire in `AsYouType` formatting (Phase 2) against the hardcoded country —
   validates typing/blur/paste formatting in isolation.
4. Add `countries`/`country`/`initialCountry` props and the mismatch
   validation logic (Phase 1/3), still without a visible picker UI —
   validates the country-state machine via a temporary prop-driven country
   switch (e.g. a plain `<select>` in the visual HTML, removed once the
   real picker lands).
5. Build the picker trigger + popup (Phase 3), wire flag loading (ADR 0024),
   replace the temporary country switch.
6. Wire `dsCountryChange` and finalize `dsInput`/`dsChange` payloads.
7. Register the component in the Stencil config / component index
   (check how `ds-select`/`ds-input-slider` were registered — likely an
   auto-discovered `components.d.ts` regeneration via `pnpm build`, confirm
   no manual index file needs updating).

## Phase 5 — Field integration

- Implement `FieldInterface` on the `InputPhone` class exactly as `ds-select`
  and `ds-input-slider` do (see Phase 0 notes — confirm current exact
  pattern before writing, as this plan's Phase 0 findings are a snapshot).
- Wrap the picker trigger + number field together as `Field`'s children;
  the picker trigger occupies the `start` slot, the number field is the
  main control content, matching the visual layout in the task doc
  (`🇨🇭 +41 | 79 123 45 67` as one bordered field, not two separate fields).
- `inputId` on `Field` should point at the number field (the field a screen
  reader lands on / label targets first), with the picker trigger having
  its own `aria-labelledby` wiring via `connectLabelToTrigger()` (Phase 0)
  pointing at both the field's label and a "country" sub-label, so a screen
  reader user understands the trigger is a country selector, not part of
  the number field.
- `description`/`invalidText` render exactly as `ds-input` does via `Field`
  — no phone-specific help-text handling needed.
- `required` only affects `Field`'s required-indicator rendering — it must
  **not** enable any validation logic (per the "no validation" rule).

## Phase 6 — Accessibility

- Flags are `aria-hidden="true"`; country identity is always carried by
  visible text (option row) or `aria-label` (trigger button), never the
  flag alone.
- Picker trigger: `aria-haspopup="listbox"`, `aria-expanded`, accessible
  name combining "Country" + current country name + calling code (not just
  the calling code — a screen reader user needs to hear "Switzerland +41",
  not just "+41").
- Popup: `role="listbox"`, `role="option"` per row, `aria-selected` on the
  current selection, `aria-activedescendant` on the listbox tracking
  keyboard focus (avoids moving real DOM focus per option, consistent with
  standard listbox pattern and `ds-select`'s approach).
- Filter input inside the popup: labeled (visually-hidden label, e.g.
  "Filter countries"), does not itself carry `aria-autocomplete` (this is
  the "select-only" listbox pattern per Decision 13, not an editable
  combobox — no autocomplete semantics).
- Number field: standard text-input a11y already handled by `Field`
  (`aria-describedby`, `aria-invalid`, label association) — no additional
  work beyond what `ds-input` already does, since the number field is a
  literal `Field`-wrapped native `<input>`.
- Automated axe coverage runs against the default, state, restricted-country,
  and open-picker variants. A manual screen-reader pass (NVDA/VoiceOver) is
  still required before considering Phase 6 done (see Phase 9).

## Phase 7 — Visual examples (`input-phone.visual.html`)

Located at `packages/core/src/components/input-phone/test/input-phone.visual.html`,
following the shared shell/`<section data-testid="...">` convention from
Phase 0. Sections required:

**Basic**
- Default (no props)
- With `initialCountry="CH"`
- With `placeholder`

**Countries**
- Switzerland (`initialCountry="CH"`)
- Germany (`initialCountry="DE"`)
- France (`initialCountry="FR"`)
- Italy (`initialCountry="IT"`)
- Multiple available (`countries="CH,DE,FR,IT"`, no `initialCountry` —
  demonstrates no-selection placeholder state per Decision 5)
- Restricted list where `country` is deliberately outside `countries` —
  demonstrates the dev-warning + fallback behavior (check console during
  manual verification)

**States**
- `disabled`
- `readonly`
- `required`
- `invalid` + `invalidText`
- `description` (help text)

**Interaction** (documented via static markup + a short inline comment
describing the expected manual interaction, since these are behavioral not
purely visual — e.g. "type 791234567, expect live reformat, then blur to
confirm final format")
- Empty state
- Mid-typing state (pre-filled partial `value` if the component supports
  displaying an in-progress value, otherwise documented as a manual-only
  step)
- Fully formatted value (`value="+41791234567"`)
- Country selection open (documented as a manual step — a static HTML file
  can't pre-open a shadow-DOM popup without a script)

**Formatting**
- CH, DE, FR, IT, and one non-European example (e.g. US or JP) side by side
  with pre-filled `value`s, to visually confirm each country's distinct
  national format renders correctly.

## Phase 7a — Automated tests and Storybook documentation

- Add Vitest coverage for country-list normalization/filtering, localized
  names, number formatting, country detection, and caret helpers.
- Add Playwright component coverage for E.164 event payloads, blur formatting,
  picker selection and keyboard behavior, pasted international numbers,
  allow-list fallback, disabled/readonly behavior, and form reset.
- Add axe accessibility coverage, including the open country picker, plus
  visual-regression coverage for all visual fixture sections.
- Add and export `DsInputPhone` from `packages/playwright`.
- Add the standard Storybook set under
  `apps/storybook/src/components/input-phone/`: stories, doc config, and six
  MDX pages (Overview, Usage, Variants, Styling, Accessibility, Testing).

## Phase 8 — Bundle-size review

- **Entry point**: `libphonenumber-js/min`. Imports used: `AsYouType`,
  `getCountries`, `getCountryCallingCode`. Explicitly not imported:
  `parsePhoneNumber`, `isValidPhoneNumber`, `isPossiblePhoneNumber`, and the
  default/full entry point's extended per-number-type validation metadata.
- **Metadata**: `min` metadata supports formatting for all countries;
  confirm during implementation that `AsYouType`'s accuracy with `min`
  metadata is acceptable for every target country's format (spot-check a
  handful of non-trivial formats — e.g. Argentina's mobile-number
  restructuring — against the full build's output to confirm no
  formatting regressions from using `min`).
- **Tree-shaking**: `libphonenumber-js/min` is a single metadata blob (not
  per-country tree-shakeable) — using it commits to shipping formatting
  data for all countries regardless of `countries` restriction. This is an
  accepted tradeoff (Decision 8): custom per-consumer metadata generation
  was explicitly rejected as adding build-pipeline complexity for marginal
  gain. Measure the actual `min` bundle size during implementation and
  report it in the PR description so it's visible to reviewers.
- **Flags**: per ADR 0024, flags are loaded per-country and lazily, so
  bundle impact scales with `countries` restriction (unlike the phone
  metadata itself). Confirm the chosen flag package supports this loading
  model before finalizing the dependency choice — if it only ships a CSS
  sprite, either find an alternative package or extract individual SVGs
  from it at build time.
- **Dependency declaration**: add `libphonenumber-js` and the chosen flag
  package to `packages/core/package.json`'s `dependencies` (not
  `devDependencies`), following the existing `slim-select`/`imask`/
  `air-datepicker` precedent.

## Phase 9 — Manual verification checklist

Alongside the automated suite, verify manually against
`input-phone.visual.html` before considering the component done:

- [ ] Default/empty state renders with no console errors.
- [ ] Typing a national number reformats live per keystroke, cursor stays
      in a sane position (not jumping to the end after every character).
- [ ] Blur reformats to a stable final form.
- [ ] Pasting a full `+`-prefixed international number auto-switches
      `country` if it differs from the current selection.
- [ ] Pasting a number with spaces/formatting already applied is handled
      without duplicating separators.
- [ ] Switching country via the picker reformats the existing digits
      against the new country's rules without clearing them.
- [ ] `countries` restricts the picker's visible options to exactly the
      given list.
- [ ] `country` outside `countries` logs a console warning and falls back
      to `countries[0]`.
- [ ] `initialCountry` sets the starting country; changing `country`
      afterward updates the live selection.
- [ ] `disabled` disables both the picker trigger and the number field.
- [ ] `readonly` disables the picker trigger but leaves the number field
      focusable/selectable.
- [ ] `required`, `invalid`/`invalidText`, and `description` render
      identically in style/position to `ds-input`'s equivalents.
- [ ] Keyboard-only: open picker via `Enter`/`Space`, filter by typing,
      navigate with arrows, select with `Enter`, close with `Esc` and
      confirm focus returns to the trigger.
- [ ] Screen reader (VoiceOver or NVDA) pass: trigger announces country
      name + calling code, not just the calling code; flags are silent
      (not announced); filter input is labeled; selected option is
      announced as selected.
- [ ] No `isValidPhoneNumber`/`isPossiblePhoneNumber`/validation logic
      anywhere in the component — grep the final diff to confirm.
- [ ] `libphonenumber-js/min` is the only import path used from that
      package — grep the final diff to confirm no accidental full-build
      import.
