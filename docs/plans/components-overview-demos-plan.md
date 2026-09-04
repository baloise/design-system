# Plan: Complete Components Overview page with missing component demos

## Context

`apps/storybook/src/components/00-overview.mdx` (the [Components Overview](https://helvetia-design.vercel.app/?path=/docs/components-overview--documentation) page) shows every component as a `<GridComponent>` card with a label, description, and small illustrative demo, grouped by category (Containment, Date Display, Feedback, Form, Layout, Navigation, Typography).

Diffing the components with their own Storybook doc folder (`apps/storybook/src/components/*`) against the components actually shown on the Overview page surfaces six with docs but no card:

- `brand-icon`
- `container`
- `drawer`
- `link`
- `select` (only appears nested inside the "Input Group" demo, never as its own card)
- `toggle`

Every other component folder has a matching `pageTitle="Components/…"` card already.

## Plan

Create a GitHub issue in `baloise/design-system`:

- **Milestone**: none (general docs completeness, not tied to an active milestone)
- **Labels**: `ready-for-agent`
- **Title**: `Storybook: complete Components Overview page with missing component demos`
- **Body** (What to build / Acceptance criteria):
  - **What to build**: Add a `<GridComponent>` entry for each of `brand-icon`, `container`, `drawer`, `link`, `select`, and `toggle` to the appropriate category section in `apps/storybook/src/components/00-overview.mdx`, following the existing pattern (see e.g. the `Toast`/`Badge` entries): `label`, `pageTitle="Components/<Name>"`, a one-sentence `description`, and a small illustrative demo using the component (mirroring the "Apple pie" placeholder-content style already used throughout the page). Pick the category section that best matches each component (e.g. `drawer` → Feedback or Containment near `Modal`/`Sheet`; `toggle` → Form near `Checkbox`/`Radio`; `link`/`brand-icon`/`container` → Layout or Navigation as fits existing groupings).
  - **Acceptance criteria**:
    - [ ] `brand-icon` has a `GridComponent` card with a working demo
    - [ ] `container` has a `GridComponent` card with a working demo
    - [ ] `drawer` has a `GridComponent` card with a working demo
    - [ ] `link` has a `GridComponent` card with a working demo
    - [ ] `select` has its own `GridComponent` card (distinct from its nested appearance inside "Input Group")
    - [ ] `toggle` has a `GridComponent` card with a working demo
    - [ ] Each new card's `pageTitle` links to that component's existing docs page and each has a real (non-placeholder) `description`
    - [ ] Page still renders correctly in Storybook (`pnpm docs`) with no MDX/build errors, in both the default and `?globals=framework:angular` (and `:react`) views
    - [ ] No existing cards/content changed beyond adding the new entries

## Verification

- `gh issue view <new-number>` to confirm label and body rendered as expected.
- Confirm the issue appears in `gh issue list --search "Components Overview"`.
