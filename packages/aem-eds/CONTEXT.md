# `@baloise/ds-aem-eds`

POC package: `decorate(block)` wrapper functions that render the Helvetia Design System
inside Adobe EDS (Edge Delivery Services) **blocks** — plain, build-free ES modules, the
model AEM/EDS projects author blocks in.

## Scope

Two real EDS blocks (each a thin adapter between EDS's authored table markup and the DS,
instrumented for Universal Editor via `moveInstrumentation`):

- `card` — DS CSS-only primitive (`.card`, no custom element, no `@baloise/ds-core`
  dependency). UE model: `apps/integration-aem/blocks/card/_card.json`.
- `datepicker` — the one block that instantiates a real `<ds-date>` Shadow DOM custom
  element (`document.createElement('ds-date')`). UE model:
  `apps/integration-aem/blocks/datepicker/_datepicker.json`.

`heading` and `button` are **not** blocks here — in real Universal Editor modeling they
map to atomic default-content components (`core/franklin/components/title/v1/title`,
`.../button/v1/button`) that render as a bare `<h2>`/`<a class="button">` directly
wherever authored, with no block wrapper div and no `decorate()` step at all. See
`apps/integration-aem/models/_title.json` and `_button.json`, and `index.html`, which
authors them as plain elements rather than `<div class="heading">`/`<div
class="button">` block markup.

## Design constraint: no imports of `@baloise/ds-core`/`@baloise/ds-react`

Blocks assume `ds-core`'s Stencil lazy-loader script and `ds-css`'s stylesheet are
already loaded globally on the page (see `apps/integration-aem/head.html`) — exactly
the CDN delivery model documented in `AEM-with-DS.md`. This package stays
dependency-free so it honestly represents what an EDS project would actually write:
no bundler, no npm import inside a block file, just DOM APIs against globally-defined
custom elements/classes.

## Consumption

`apps/integration-aem`'s `scripts/copy-blocks.mjs` copies this package's built
`dist/src/*.js` output into its own `blocks/<name>/<name>.js` files — see that app's
CONTEXT for the full pipeline. This package is never published; it is a reference
implementation, not a DS deliverable.
