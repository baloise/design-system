# Plan: Contact form template

**Milestone:** 📄 Templates & Layout from Baloise (existing)
**Reference:** https://www.helvetia.com/ch/web/en/private-customers/pension/life-insurance.html#contact

## Context

This is the first template to live under `packages/core/src/templates/` — that
directory doesn't exist yet. (Storybook already has one precedent, `Templates/
ErrorPage` at `apps/storybook/src/templates/error-page/`, but it isn't backed by
a `packages/core` visual-test file the way this one will be.) This ticket
establishes that convention as well as delivering the contact-form template
itself.

The template is a **static composition, not a new component**: no new
`ds-*` component, no JS/validation/submit logic — "a stupid template," markup
and styles only. All fields needed already exist as DS components.

## Field set (matches the reference page exactly)

- Salutation — radio (Mr / Mrs / Ms)
- First name — text input
- Surname — text input
- Birthdate — date input (DD.MM.YYYY)
- Street — text input
- House number — text input
- ZIP code — text input
- City — text input
- Country — select/dropdown
- Email — text input
- Telephone — text input
- Comments — textarea (optional)
- File upload — existing insurance policy attachment
- Privacy policy checkbox (with linked text) — required
- Send button
- Heading ("Request an offer or consultation now") + description text above
  the form

Copy language: **English**, matching the reference page.

## CSS-only vs. web component per field

Preference order: use the CSS-only class-based markup for any field that has
one (e.g. `<button class="button">`, not `<ds-button>`); fall back to the real
Shadow DOM web component only where no CSS-only equivalent exists.

| Field | CSS-only class available? | Markup to use |
| --- | --- | --- |
| Salutation (radio) | yes (`radio.style.scss`) | `<input class="radio">` |
| Text inputs (name, address, email, phone) | yes (`input.style.scss`) | `<input class="input">` |
| Country (select) | yes (`select.style.scss`) | `<select class="select">` |
| Comments (textarea) | yes (`textarea.style.scss`) | `<textarea class="textarea">` |
| Privacy checkbox | yes (`checkbox.style.scss`) | `<input class="checkbox">` |
| Send button | yes (`button.style.scss`) | `<button class="button">` |
| Heading | yes (`heading.style.scss`) | classed heading element |
| **Birthdate** | **no** — `date` is Shadow-DOM-only (`date.tsx`, no `.style.scss`) | `<ds-date>` web component (exception) |
| **File upload** | **no** — `file-upload` is Shadow-DOM-only (`file-upload.tsx`, no `.style.scss`) | `<ds-file-upload>` web component (exception) |

Layout: the existing CSS-only `form` component (`form.style.scss` — 12-column
grid, `.field` grouping, responsive `is-*` width variants) provides the
structure; no new layout component needed.

## Scope / definition of done

- [ ] `packages/core/src/templates/contact-form.visual.html` — the template
      markup, following the field table above, wrapped in the `form` grid
      layout. Happy-path only (no invalid/error-state demonstration).
- [ ] `packages/core/src/templates/contact-form.visual.play.ts` — Playwright
      visual regression test, following the existing `*.visual.play.ts`
      pattern (e.g. `select.visual.play.ts`) using `@baloise/ds-playwright`
      helpers.
- [ ] `packages/core/src/templates/contact-form.a11y.play.ts` — accessibility
      test (WCAG 2.2 AA), following the existing component-checklist
      convention (`ARCHITECTURE.md`'s `*.a11y.play.ts` requirement) even
      though this is a template, not a component.
- [ ] Storybook story: `apps/storybook/src/templates/contact-form/
      contact-form.stories.ts`, title `Templates/ContactForm`, following the
      `error-page` precedent.
- [ ] `apps/storybook/.storybook/preview.ts`'s `storySort.order` gets a
      `'Templates'` entry added (currently absent — both `ErrorPage` and this
      new template would otherwise sort by accident/default order).
- [ ] Changeset entry (`pnpm changeset`) if required by the changeset
      criteria (template-only/docs changes may be exempt — confirm during
      review).

## Explicitly out of scope

- No new `ds-*` component or component logic.
- No real form validation, submit handling, or JS behavior.
- No invalid/error-state visual demonstration.
- No non-English copy.
