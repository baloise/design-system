# Component Category Migration Plan

This file is the implementation plan for introducing a single, canonical usage-category
taxonomy for components — applied consistently to the physical folder structure and to
Storybook's docs navigation. It supersedes ad-hoc grouping (today only "Forms" exists as
a Storybook `title:` grouping, with no folder-level equivalent).

## Taxonomy

Seven categories, **alphabetical order everywhere** — category order in the Storybook
sidebar, and component order within each category:

**Actions, Forms, Indicators, Media, Navigation, Overlays, Structure**

Scope prefixes (`ds-app-*` today, future `ds-web-*`) remain a **naming convention only** —
they do not get their own folder tier. A component's category folder is determined by what
it does, not who consumes it (e.g. `app-navbar` lives under `navigation/`, not under an
`app/` tree).

### Component → category mapping

| Category   | Components                                                                                                                                              |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Actions    | button, close, link                                                                                                                                     |
| Forms      | checkbox, counter, date, file-upload, form, input, input-phone, label, number-input, radio, segment, select, slider, textarea, time-input, toggle       |
| Indicators | badge, hint, progress-bar, spinner, tag                                                                                                                 |
| Media      | brand-icon, icon, logo, picture, shape                                                                                                                  |
| Navigation | app-navbar, pagination, steps, tabs                                                                                                                     |
| Overlays   | alert, drawer, modal, notification, popup, sheet, tooltip                                                                                               |
| Structure  | accordion, app-footer, card, carousel, container, content, data, divider, grid, heading, list, root, stack, table, text                                 |

This mapping is the single source of truth. It must stay identical across
`packages/core/src/components/`, `apps/storybook/src/components/`, and both CONTEXT.md
files (see Phase 0).

## Structural changes

- Insert a lowercase-plural category folder between `components/` and each component's
  existing directory, e.g. `packages/core/src/components/forms/button/`.
- Apply the identical folder insertion to the mirrored Storybook tree:
  `apps/storybook/src/components/forms/button/`.
- Remove hardcoded Storybook `title:` strings from `*.stories.ts` files; derive the
  sidebar title from the category segment of the file's path instead (small helper in
  `.storybook/preview.ts` or a story-loader utility). This makes the folder path the only
  place the taxonomy is encoded — nothing to keep in sync by hand.
- Update the handful of explicit relative exports in `packages/core/src/index.ts`
  (e.g. `export * from './components/modal/modal.interfaces'`) to the new paths.
- Leave `packages/playwright/src/lib/components/*.po.ts` **flat, untouched** — page
  objects have no discovery/browsing use case, so moving them is pure churn.
- No action needed for visual regression snapshots — they live inside each component's
  own `test/*.visual.play.ts-snapshots/` folder and move automatically with `git mv`.
- No public API impact — confirmed that Stencil's component discovery globs recursively
  regardless of nesting, and the React/Angular wrappers key off the custom-element tag
  name, not the source folder path.

## Migration mechanics

Write a one-time Node/bash migration script (e.g. `scripts/migrate-component-category.mjs`,
deleted after the migration completes) that, given a category name and its component list:

1. `git mv packages/core/src/components/<name> packages/core/src/components/<category>/<name>`
2. `git mv apps/storybook/src/components/<name> apps/storybook/src/components/<category>/<name>`
3. Rewrites any relative imports inside the moved files that break due to the new nesting
   depth (e.g. `../../foo` → `../../../foo`).
4. Removes the hardcoded `title:` field from the moved `*.stories.ts` file(s), once the
   path-derived title helper (see Structural changes) is in place.

Run the script **once per category, as a separate PR**, in this order (alphabetical,
matching the taxonomy order): Actions → Forms → Indicators → Media → Navigation →
Overlays → Structure.

Each per-category PR:

- Runs the script for that category's component list.
- Updates the affected exports in `packages/core/src/index.ts`.
- Re-baselines visual regression snapshots for the moved components (`ds-update-screenshots`).
- Is reviewed and merged before the next category starts — the repo is intentionally in a
  "partially migrated" state between PRs (some categories flat still, some nested).

## Tooling and docs updates (do once, before or alongside Phase 1)

- **`ds-create-component` skill**: add a prompt for category selection (fixed list of the
  7 categories above) and scaffold new components directly into
  `components/<category>/<name>/` in both the core and storybook trees.
- **`packages/core/CONTEXT.md`**: add a section documenting the taxonomy, the full
  component → category mapping, the lowercase-plural folder convention, and the
  alphabetical-ordering rule (category order and within-category order).
- **`apps/storybook/CONTEXT.md`**: add the same taxonomy section, plus a note on how
  Storybook `title:` is now derived from folder path rather than hardcoded.

## Sequencing summary

1. Phase 0 — land tooling/docs updates (`ds-create-component`, both CONTEXT.md files,
   the title-derivation helper, the migration script) in one PR, with the script tested
   against a single component before running it at scale.
2. Phase 1–7 — one PR per category, in alphabetical order, each following the
   "Migration mechanics" steps above.
3. Delete the one-time migration script once Structure (the last category) lands.
