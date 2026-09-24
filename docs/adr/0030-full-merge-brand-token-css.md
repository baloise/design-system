# 30. Brand token CSS is fully merged, split into a `:host, :root` file and a scoped `data-theme` override file

Package: `packages/tokens`

Date: 2026-09-14

Status: Accepted

## Context

`createBrandConfig` (`packages/tokens/src/config.brand.ts`) built each
brand's CSS as a **diff only**: `computeTokenDiff` walked Base's and the
brand's `*.tokens.json` and kept just the tokens whose `$value` differed,
scoped under `[data-theme="<brand>"]`. `OrangeVacations.tokens.css` ended up ~56 lines
against Base's ~2341 — correctness for every un-overridden token depended on
the brand's `[data-theme]` block winning the cascade over `:root`'s Base
declarations, i.e. on load order and selector specificity rather than on the
brand file being self-sufficient. This produced real override bugs.

Separately, `packages/styles` (ds-styles) depended on `@helvetia-design/tokens` and
prepended the full `base.tokens.css` declarations into its own
`utilities.css`/`design-system.css`/`design-system.local.css`/`base.css`
bundles, so a consumer of ds-styles got Base's tokens whether it wanted them or
not, with no way to substitute a brand's tokens instead.

## Decision

- Every brand (OrangeVacations, future brands) now builds two **full, independently
  self-sufficient** CSS files instead of one diff file — each contains every
  token (Base's value merged with the brand's overrides), not a diff:
  - `<brand>.tokens.css` — `:host, :root` selector. For an app that commits
    to one brand at import/build time and never switches at runtime; it
    loads only this file, never Base's.
  - `<brand>.override.css` — `[data-theme="<brand>"], :host([data-theme="<brand>"])`
    selector (a plain attribute selector, not `:root`-scoped — it must match
    an arbitrary element like `<div data-theme="orange-vacations">`, not just the document
    root), same full token set as the `.tokens.css` sibling. For scoping
    a brand to one element/subtree without touching the rest of the page —
    today this is Storybook's per-story theme switcher, wrapping a story in
    `<div data-theme="orange-vacations">`.
- Base gets `base.override.css` too (full Base set,
  `[data-theme="base"], :host([data-theme="base"])`), purely so
  Storybook's switcher can offer "Helvetia/Base" as a scoped option
  symmetrically with the brands, even though Base has no overrides of its
  own.
- This full-merge treatment is CSS-only — the sass/web(json)/javascript/docs
  Style Dictionary platforms stay Base-only, unchanged.
- `ds-styles` no longer bundles literal `--ds-*` declarations into any output
  it ships. `@helvetia-design/tokens` moves from its `dependencies` to
  `devDependencies` — `packages/styles/src/build.ts` still reads
  `dist/docs/base.tokens.json` at build time to emit utility classes that
  reference `var(--ds-*)` names, it just never re-declares the values.
  Consumers of ds-styles must separately install and load a theme file from
  ds-tokens for those references to resolve.
  `packages/styles/src/scss/foundation.scss`'s
  `@use '@helvetia-design/tokens/dist/sass/base.tokens.scss'` (filtered to
  `Breakpoint` tokens only, feeding Sass `@media` mixins) is a distinct,
  narrower mechanism and is unaffected.
- `packages/tokens/package.json` gains explicit `exports` subpaths per file
  (`./css/base`, `./css/base-override`, `./css/orange-vacations`, `./css/orange-vacations-override`,
  …) as the public distribution
  mechanism, rather than relying on the implicit copy into
  `packages/core/www/assets/tokens/`.

## Consequences

- Every brand CSS file roughly quintuples in size (full token set instead of
  a diff), traded for eliminating cascade-order bugs: once a theme file is
  active, nothing is left implicitly inheriting from Base.
- Consuming apps that only need one brand no longer need Base's CSS on the
  page at all — they can drop `base.tokens.css` entirely and load just
  `<brand>.tokens.css`.
- `apps/storybook/.storybook/preview.ts` currently loads
  `/assets/tokens/${theme}.tokens.css` globally while wrapping the story in
  a `data-theme="${theme}"` div — that only worked because the old diff file
  happened to already be scoped by `[data-theme="orange-vacations"]`. It must switch to
  loading `${theme}.override.css` instead, or an unscoped `:host, :root`
  file will repaint the whole Storybook page instead of just the wrapped
  div.
- Any app that was relying on ds-styles to supply Base's tokens implicitly
  (via the old bundled `utilities.css`/`design-system.css`) breaks until it
  adds an explicit `@helvetia-design/tokens` dependency and loads the right theme
  file itself.
