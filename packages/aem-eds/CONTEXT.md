# `@baloise/ds-aem-eds`

POC package: the reusable Helvetia DS ↔ Adobe EDS (Edge Delivery Services) bridge code —
plain, build-free ES modules, the model AEM/EDS projects author code in. Two kinds of
exports, both consumed by `apps/integration-aem` via its own copy pipeline (see below):

## Block wrappers

`decorate(block)` functions for the two real EDS blocks (instrumented for Universal
Editor via `moveInstrumentation`):

- `card` — DS CSS-only primitive (`.card`). UE model:
  `apps/integration-aem/blocks/card/_card.json`.
- `datepicker` — the one block backed by a real `<ds-date>` Shadow DOM custom element.
  Self-registers it from `ds-core`'s `dist-custom-elements` output
  (`/libs/ds/components/ds-date.js`) rather than relying on a global lazy-loader script —
  see the file's own comment for why. UE model:
  `apps/integration-aem/blocks/datepicker/_datepicker.json`.

`heading` and `button` are **not** blocks — in real Universal Editor modeling they map to
atomic default-content components (`core/franklin/components/title/v1/title`,
`.../button/v1/button`) that render as a bare `<h1>`/a link in a paragraph directly
wherever authored, no block wrapper div, no `decorate()` step. See
`apps/integration-aem/models/_title.json`/`_button.json` and `index.html`.

## Site-wide DS mapping functions

`decorateButtons`/`decorateHeadings` — not tied to any one block, but still DS-adoption
logic any EDS project using this design system needs: mapping Adobe's own EDS
conventions (bare `primary`/`secondary` link-formatting classes, unclassed headings)
onto DS's actual classes (`is-primary`/`.heading`). Called once, site-wide, from the
consuming project's own `scripts.js` — see each file's own comment for the exact
Adobe convention it bridges.

## Design constraint: no bundler-only imports

Nothing in this package does a bare `import ... from '@baloise/ds-core'` — everything
either has zero dependencies (`decorate-buttons.ts`, `decorate-headings.ts`, `card.ts`)
or reaches `ds-core` via a plain browser `import()` of a URL the consuming app serves
(`datepicker.ts`). This keeps every file honestly representative of what an EDS project
would actually write: no bundler required to load any of it.

## Consumption

`apps/integration-aem`'s `scripts/copy-blocks.mjs` copies this package's built
`dist/src/*.js` output into its own `blocks/<name>/<name>.js` files (block wrappers) and
`scripts/decorate-*.js` files (site-wide mapping functions) — see that app's CONTEXT for
the full pipeline. This package is never published; it is a reference implementation,
not a DS deliverable.
