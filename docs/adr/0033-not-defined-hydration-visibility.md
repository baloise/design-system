# 33. `:not(:defined)` gate replaces Stencil's default hydration-visibility CSS

Package: `packages/core`

Date: 2026-09-24

## Status

Accepted

## Context

Stencil's default lazy-loader bootstrap injects a single `<style data-styles>`
tag into `document.head` at runtime, generated from every registered
component tag:

```
${cmpTags.sort()}{visibility:hidden}.hydrated{visibility:inherit}
```

Visibility is gated **per DOM node instance**: a `ds-*` element stays
`visibility:hidden` until its own `connectedCallback` → render cycle
completes and adds the `.hydrated` class to that specific node. This is
Stencil's stock FOUC-prevention behavior and is unmodified in this repo
(no `hydratedFlag`/`invisiblePrehydration` override existed before this
ADR) — Ionic Framework ships the same unmodified default.

baloise/design-system#1870 reports `bal-*` components (this repo's
upstream) becoming permanently invisible after an HTMX fragment swap
replaces part of the DOM: a table row click swaps in a `<bal-card>` edit
form via `innerHTML`, and the freshly-inserted nodes never become visible,
even though the DOM structure is correct. The reporter confirmed via
DevTools that the elements are hidden purely by the injected
`visibility:hidden` CSS rule, not by a rendering failure. The mechanism is
identical in this repo: any consumer replacing a DOM subtree containing
`ds-*` elements outside Stencil's own reconciliation (HTMX, `innerHTML`,
jQuery `.html()`, etc.) is exposed to the same failure class, because a
freshly-parsed node's visibility depends on _that node_ individually
re-earning the `.hydrated` class, which is not guaranteed to happen
reliably outside Stencil-managed DOM mutations.

swisspost/design-system (`packages/components`) does not hit this bug.
Its `stencil.config.ts` sets `invisiblePrehydration: false`, disabling
Stencil's injected style entirely, and reimplements the hide-until-ready
behavior itself in `styles/utilities/not-defined.scss`:

```scss
:where(#{$component-names}) {
  &:not(:defined):not(.hydrated, [data-hydrated]) {
    visibility: hidden;

    @media (scripting: none) {
      visibility: visible;
    }
  }
}
```

The relevant difference is `:not(:defined)`: the native `:defined` CSS
pseudo-class becomes true the moment `customElements.define(tag)` runs —
once, globally, for the tag name, not per node. After a tag has been
defined once (effectively, after first page load), every later instance
of that tag — including ones inserted via raw DOM replacement — is
`:defined` immediately and therefore visible, regardless of whether that
specific node's own async hydration cycle has finished. The `.hydrated`
class check only matters during the narrow pre-definition window on
first paint.

This ADR adopts that gate, without adopting Post's other change (they
also switch `hydratedFlag` to an attribute, `data-hydrated`). This repo
already has several component styles keyed on the default class selector
(`datepicker.host.scss`, `slider.host.scss`, `tooltip.host.scss`,
`popup.host.scss`, `app-navbar.host.scss`, `accordion.host.scss`,
`accordion.style.scss`, all using `:not(.hydrated)`); keeping
`hydratedFlag` at its class-based default avoids touching any of them.

No local reproduction of the HTMX-swap failure was built before this
decision — this ADR is a deliberate mechanism-level port of a fix already
shipping in a sibling Stencil-based design system, not a verified fix for
an observed local repro.

## Decision

1. **`packages/core/stencil.config.ts`** gains `invisiblePrehydration:
false`, disabling Stencil's own runtime-injected hide-until-hydrated
   style. `hydratedFlag` is left at its default (class, `.hydrated`).

2. The existing tag-collection step in `rollupPlugins.before` →
   `watch-external` → `buildStart` (already extracts every component's
   `tag:` value to write `src/global/constants/tags.constant.ts` and
   `docs/tags.json`) is extended to also emit a generated SCSS partial,
   `src/global/constants/_component-names.scss`, listing the same tags as
   a Sass list — avoiding a second, parallel tag-collection mechanism.

3. A new global stylesheet, `src/global/_not-defined.scss` (imported from
   `src/global/global.scss`), replaces Stencil's injected rule with:

   ```scss
   @use './constants/component-names' as *;

   :where(#{$component-names}) {
     &:not(:defined):not(.hydrated) {
       visibility: hidden;

       @media (scripting: none) {
         visibility: visible;
       }
     }
   }
   ```

   The `@media (scripting: none)` branch is kept from Post's version:
   an environment that never executes JavaScript should never hide
   `ds-*` content waiting for hydration that will never happen.

## Consequences

- Visibility of a `ds-*` element no longer depends on that specific DOM
  node individually completing Stencil's render/hydrate cycle. It depends
  instead on whether the tag has ever been registered via
  `customElements.define`, which — once true — stays true for the rest of
  the page's lifetime. A subtree swapped in via `innerHTML`, HTMX, or any
  other non-Stencil-managed DOM mutation is visible immediately, closing
  the failure class reported in baloise/design-system#1870.
- Existing `:not(.hydrated)` selectors in component-level `.host.scss`
  files are unaffected — `hydratedFlag` was not changed.
- This was ported without a local reproduction of the original bug and
  without new automated test coverage. If the swisspost mechanism turns
  out not to address whatever the real underlying trigger is in a given
  consumer's setup, that will surface as a bug report rather than a
  caught regression.
- No changeset was created for this change.
