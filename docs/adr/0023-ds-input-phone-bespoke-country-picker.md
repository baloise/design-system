# 23. ds-input-phone uses a bespoke country picker instead of extending ds-select

Package: `packages/core`

Date: 2026-08-28

## Status

Accepted

## Context

`ds-input-phone` needs a country selector showing a flag, localized country
name, and calling code per option, filterable across ~240 ISO-3166 countries.
The only existing dropdown-family component is `ds-select`
(`packages/core/src/components/select/`), built on `slim-select`, with a
`searchable` prop that already renders a filter input inside its popup.

`ds-select`'s options, however, are authored as child `<ds-select-option>`
elements (`SelectOption = { label, value, disabled? }`,
`select.interfaces.ts:4-8`) with no icon/flag slot
(`select-option.tsx` exposes only a default `<slot>` for text). Making
`ds-select` fit would mean either generating ~240 child elements per
`ds-input-phone` instance (unclear DOM/perf cost, and those elements would
be internal implementation detail masquerading as `ds-select`'s public API),
or adding an icon slot to `ds-select-option` — a public, independently used
component — solely to satisfy one consumer.

Considered alternatives:

- Extend `ds-select-option` with an icon slot and drive the picker via
  generated child elements — reuses `slim-select`'s tested keyboard/search
  behavior, but couples a shared public component's API to a single
  consumer's needs and generates a large, non-obvious child-element tree.
- Wrap `ds-input-phone`'s number field inside `ds-input` and bolt the picker
  on via slots — rejected separately (see the "standalone vs. composite"
  decision recorded in `CONTEXT.md`'s Phone Field section).

## Decision

Build a small, internal (not separately published) country picker inside
`ds-input-phone`: a `<button>` trigger showing the selected flag + calling
code, with `aria-haspopup="listbox"` opening a popup listbox with an internal
filter input. It is data-driven off a country array (ISO code, calling code,
flag, localized name), not child elements. Interaction/keyboard/ARIA
conventions are modeled on `ds-select`'s searchable dropdown and
`SelectPickerController` (`select.picker.ts`) for consistency, but the code
is not shared — `ds-select`'s public contract is untouched.

## Consequences

- `ds-select`'s API and `SelectOption` type stay unchanged; no new public
  surface is added to a shared component for one consumer's needs.
- `ds-input-phone` owns and maintains its own picker implementation
  (rendering, keyboard nav, filtering, ARIA), rather than inheriting fixes
  and behavior changes from `ds-select` automatically. Divergence in
  interaction pattern between the two pickers is a risk to watch for in
  future accessibility audits.
- If a future component needs the same "icon + label" option shape,
  reconsider whether `ds-select-option` should grow an icon slot at that
  point (two real consumers, not a hypothetical one).
