# 26. Prefix navbar and footer with `ds-app-*`, one component per usage context

Package: `packages/core`, `apps/storybook`, `packages/playwright`, `packages/tokens`

Date: 2026-08-31

## Status

Accepted

## Context

`ds-navbar` and `ds-footer` were built for application (product) usage. The
old pre-rebrand `bal-navbar` had listed "multiple interface types (app,
website, etc.)" as an out-of-scope future enhancement (`packages/core/CONTEXT.md`),
implying these would eventually need to support both application and
marketing/website usage. Left unprefixed, `ds-navbar`/`ds-footer` read as
generic, context-agnostic components, which they are not — their structure
and behavior (native `<dialog>` mobile drawer, semantic `<a>`-based nav) were
designed for product/app shells, not marketing sites.

Considered alternatives:

- A `context="app" | "website"` prop on a single `ds-navbar` — smaller
  surface area, but conflates two visually and structurally distinct
  concerns behind one component, and would require branching internal
  markup/behavior on the prop value.
- Leaving the components unprefixed and documenting the app-only scope in
  prose only — cheaper, but the ambiguity keeps surfacing (as it did in the
  original `bal-navbar` backlog note) since the tag name gives no signal.

## Decision

Rename `ds-navbar` → `ds-app-navbar` and `ds-footer` → `ds-app-footer`. The
`ds-app-*` prefix denotes components built specifically for application
(product) usage context, as distinct from website/marketing usage — this is
unrelated to `ds-app`, the existing root wrapper component.

Usage contexts get **separate components**, not a variant prop: a future
website-context navbar is a new component (e.g. `ds-web-navbar`), not a prop
on `ds-app-navbar`. This is a hard rename — no deprecated alias is kept for
the old tags — shipped with a major changeset, and applied consistently
across the tag, folder/file names (`navbar/` → `app-navbar/`, matching the
repo's existing compound-name convention, e.g. `input-slider/input-slider.tsx`),
design tokens (`--ds-navbar-*` → `--ds-app-navbar-*`), Storybook docs, and
Playwright page objects/snapshots.

## Consequences

- Any future website-context nav/footer work starts from a clean naming
  slate (`ds-web-*`) instead of retrofitting a `context` prop onto
  `ds-app-navbar`/`ds-app-footer`.
- This is a breaking change for existing consumers of `ds-navbar`/`ds-footer`
  and their `--ds-navbar-*`/`--ds-footer-*` CSS variables — no compatibility
  shim ships with it.
