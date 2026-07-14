# 1. ds-date uses external libraries (air-datepicker + imask) inside the shadow root

Date: 2026-07-13

## Status

Accepted

## Context

`ds-date` is a new form control: a masked, typeable text field that mirrors
`ds-input`'s look and field structure, with a calendar-icon trigger that opens a
date-picker popup.

The core package's `CONTEXT.md` lists **"No external dependencies — keep bundle
size minimal"** as a constraint. In practice this constraint is already soft:
`packages/core` ships `focus-trap`, `@floating-ui/dom`, `luxon`, `dompurify`,
`lottie-web`, `big.js`, and others as runtime dependencies.

For `ds-date` the brief mandates two specific libraries:

- **air-datepicker** — the calendar popup.
- **imask** — the input mask for the typeable field.

Neither is currently a dependency. Two facts make the integration non-trivial:

1. `ds-date` is a Shadow-DOM web component (`shadow: true`), but air-datepicker
   renders its own DOM and ships a global stylesheet. Global CSS does not cross
   the shadow boundary.
2. air-datepicker attaches a **document-level click listener** to close on
   outside-click. Under Shadow DOM, event retargeting makes clicks inside the
   popup appear to originate from the host element, so that listener misbehaves.

`ds-input` already has its own bespoke mask system (`input.mask.ts` + `masks/`),
so imask is a second, parallel masking mechanism in the codebase.

## Decision

1. Add **air-datepicker** and **imask** as `packages/core` runtime dependencies.
2. Render the calendar popup **inside the component's shadow root**, and adopt
   air-datepicker's stylesheet into the shadow root via
   `shadowRoot.adoptedStyleSheets` (a `CSSStyleSheet`). Encapsulation stays
   intact; no third-party CSS leaks into the global scope.
3. **Own the open/close and outside-click logic ourselves** (using the existing
   `focus-trap` dependency for the popup) instead of relying on air-datepicker's
   document-level listener.
4. Ship air-datepicker's **stock theme as-is** for the MVP (no new design tokens,
   per the brief); accept that the calendar is temporarily off-brand.
5. Use **imask** for the field mask (per the brief), separate from `ds-input`'s
   existing mask system. Model value is ISO `YYYY-MM-DD`; the display string is
   locale-driven; **luxon** (already a dependency) bridges the two.

## Consequences

**Positive**

- Fast delivery of a full-featured, keyboard-navigable calendar without building
  one from scratch.
- Shadow-DOM encapsulation is preserved; no global CSS pollution.

**Negative / risks**

- Bundle size grows (two new dependencies); formally an exception to the
  "no external dependencies" guideline — hence this ADR.
- Two masking systems now coexist in the codebase (`ds-input`'s custom masks and
  imask in `ds-date`).
- air-datepicker's stock theme is off-brand until a token-based override layer is
  added later (deliberately deferred).
- air-datepicker's a11y is thin (no grid/dialog semantics); `ds-date` layers its
  own WCAG 2.2 AA contract on top (role=dialog, focus-trap, arrow-key nav,
  Esc-to-close with focus restoration).
- Adopting a third-party stylesheet into the shadow root and driving open/close
  manually is more integration code than a "drop-in" library usage.

## Alternatives considered

- **imask only, build the popup natively** with our own token-styled grid —
  rejected: contradicts the brief's mandate to use air-datepicker.
- **Popup in light DOM (`<body>`) + global air-datepicker CSS** — rejected:
  breaks the repo's hard Shadow-DOM encapsulation constraint.
- **Reuse `ds-input`'s existing mask system instead of imask** — rejected:
  the brief mandates imask.
