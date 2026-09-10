# Plan: Login template

**Milestone:** 📄 Templates & Layout from Baloise (existing, #9)
**Reference:** BVGOnline IDP login screen (ForgeRock/OpenAM XUI — JS-rendered,
could not be inspected live; field set confirmed with the user instead of
scraped)

## Context

Second template under `packages/core/src/templates/`, following the
convention established by the contact-form template
(`docs/plans/contact-form-template-plan.md`): a static composition, not a new
component — no new `ds-*` component, no JS/validation/submit logic, markup and
styles only.

Preference order: CSS-only class-based markup wherever a `*.style.scss`
exists; fall back to the real Shadow DOM web component only where no CSS-only
equivalent exists.

## Field set (confirmed with user — standard username/password, no remember-me)

- Username / email — text input
- Password — text input (`type="password"`, natively supported per
  `input.interfaces.ts`; no show/hide-password toggle exists in `ds-input`,
  so none is included)
- "Forgot password?" link
- Login button
- Brand logo above the form

No remember-me checkbox, no registration/sign-up link.

## CSS-only vs. web component per element

| Element | CSS-only class available? | Markup to use |
| --- | --- | --- |
| Username input | yes (`input.style.scss`) | `<input class="input">` |
| Password input | yes (`input.style.scss`) | `<input class="input" type="password">` |
| Forgot-password link | yes (`link.style.scss`) | `<a class="link">` |
| Login button | yes (`button.style.scss`) | `<button class="button">` |
| Wrapping panel | yes (`card.style.scss`) | `<div class="card">` |
| **Brand logo** | **no** — `logo`/`brand-icon` are Shadow-DOM-only (`.tsx` + `.host.scss`, no `.style.scss`) | `<ds-logo>` web component (exception, same precedent as `date`/`file-upload` on the contact-form template) |

Wrapper: `card` (bounded box with its own padding/elevation styling — not
plain `container`) centers the form, matching a typical IDP login-panel look.

## Scope / definition of done

- [ ] `packages/core/src/templates/login.visual.html` — template markup per
      the field table above, wrapped in a `.card`. Happy-path only, no error
      states.
- [ ] `packages/core/src/templates/login.visual.play.ts` — Playwright visual
      regression test, following the existing `*.visual.play.ts` pattern.
- [ ] `packages/core/src/templates/login.a11y.play.ts` — accessibility test
      (WCAG 2.2 AA), same convention as the contact-form template.
- [ ] Storybook story: `apps/storybook/src/templates/login/login.stories.ts`,
      title `Templates/Login` (uses the `'Templates'` `storySort.order` entry
      already added for the contact-form template — no further sort-order
      change needed here).
- [ ] Changeset entry (`pnpm changeset`) if required by the changeset
      criteria.

## Explicitly out of scope

- No new `ds-*` component or component logic.
- No real authentication, validation, or submit handling.
- No remember-me checkbox, no registration/sign-up link, no password
  visibility toggle (doesn't exist in `ds-input` today).
- No error/invalid-state visual demonstration.
