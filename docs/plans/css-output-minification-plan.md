# Plan: Real CSS minification for CMS (AEM) consumers

**Milestone:** 📦 CMS Optimizations (new)

## Context

Goal: reduce CSS payload size for CMS integrations (AEM and similar), where a page
typically loads the DS's CSS-only outputs (`base.css` / `components.css` /
`utilities.css` or the bundled `design-system.css`) directly, outside of the Stencil
web-component runtime.

Investigation of `packages/css/src/build.ts` found:

- The file-structure split this ticket originally considered (basics-only /
  all-components / utilities) **already exists** — `base.css`, `components.css`,
  and `utilities.css` are already separate outputs, and Storybook's docs already
  document linking them individually as an alternative to the bundled
  `design-system.css`. No rebuild needed here.
- **Minification is currently a no-op bug**: `design-system.local.min.css` is
  written as a plain copy of `design-system.local.css`, not run through any
  minifier. No `cssnano` (or equivalent) exists anywhere in the `packages/css`
  pipeline today — only PostCSS + Autoprefixer.
- Baseline sizes (unminified): `base.css` 12K, `components.css` 316K,
  `utilities.css` 384K, `design-system.css` 708K.

## Explicitly out of scope for this ticket

- **Web components** (`ds-*`, Shadow DOM/Stencil) — excluded entirely. They already
  load their own scoped CSS at runtime; this ticket only concerns the CSS-only
  (`*.style.scss`, global-class) delivery path used by AEM/CMS integrations.
- **Per-component CSS output** (one file per component) — deferred. Only revisit
  if minified sizes are still too large for CMS use after this MVP ships.
- **Utility purging / tree-shaking unused classes** — deferred to a future ticket.
  `utilities.css` is generated from the full token safelist, not scoped to actual
  usage; scoping it requires scanning consumer markup, a bigger problem than this
  ticket's scope.
- Cross-component CSS dependencies within the CSS-only tier (e.g.
  `table.style.scss` nesting a `.ds-button` selector) — out of scope, not
  addressed by this ticket.

## Scope (MVP)

Add real minification to every existing CSS output in `packages/css/src/build.ts`,
each getting a genuinely minified `*.min.css` sibling:

- `base.css` → `base.min.css`
- `base.local.css` → `base.local.min.css`
- `components.css` → `components.min.css`
- `utilities.css` → `utilities.min.css`
- `design-system.css` → `design-system.min.css`
- `design-system.local.css` → `design-system.local.min.css` (fix — currently a
  plain copy, not minified)

## Definition of done

- [ ] A real CSS minifier (e.g. `cssnano`, run through the existing PostCSS
      pipeline alongside Autoprefixer) is wired into `packages/css/src/build.ts`.
- [ ] Every output listed above has a genuinely minified counterpart; file size
      drops are visible and measured (before/after byte counts recorded in the PR).
- [ ] `design-system.local.min.css` no longer identical to `design-system.local.css`.
- [ ] `packages/css/package.json`'s exports map (`./css/all`, `./css/all.local`,
      etc.) is reconciled with what `build.ts` actually emits — fix or remove
      any advertised export that has no matching build output.
- [ ] No visual regressions: existing Playwright visual tests
      (`*.visual.play.ts`) still pass against the minified output where they
      load CSS from `dist/css`.
- [ ] Changeset entry (`pnpm changeset`) for the `packages/css` package.
- [ ] Follow-up note (in the PR description or a linked issue) flagging that a
      per-component split and utility purging remain open as future options if
      minified sizes are still too large for CMS use.
