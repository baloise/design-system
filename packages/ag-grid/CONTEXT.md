# CONTEXT — packages/ag-grid (AG Grid Theme)

This document captures domain language, architectural patterns, and key concepts specific to the AG Grid theme package.

## Overview

**packages/ag-grid** (`@baloise/ds-ag-grid`) is a thin, published binding layer that exposes `designSystemGridTheme`, a token-bound theme for [AG Grid](https://www.ag-grid.com/)'s v33+ [Theming API](https://www.ag-grid.com/javascript-data-grid/theming/). It is not a Stencil web component — there is no markup, no Shadow DOM, and no `ComponentInterface`/`Loggable` contract. It is a plain TypeScript config-object package, structurally closest to [[packages/react|packages/react/CONTEXT.md]] (thin wrapper, `tsc`-only build).

## Core Concepts

### Theme params vs. resolved values

AG Grid's Theming API builds a `Theme` object from a base theme (`themeQuartz`) plus a set of **params** — named style properties (`accentColor`, `cellFontFamily`, `headerFontFamily`, etc.) that AG Grid resolves into CSS internally. This package's params are not static values (e.g. `'#005EFF'`); they are `var(--ds-alias-*)` **strings** referencing the live `@baloise/ds-tokens` CSS custom property cascade. This is the entire point of the package: the grid re-themes itself whenever the cascade changes (brand override, dark mode, `data-theme="tcs"`) — no theme rebuild, no new package version needed.

### `designSystemGridThemeParams` vs. `designSystemGridTheme`

`src/index.ts` exports both:

- `designSystemGridThemeParams` — the plain object of `var(...)` strings passed to `withParams()`. Exported specifically so the unit test can assert against it directly, without reaching into AG Grid's internal (and explicitly unstable — see below) theme-resolution APIs.
- `designSystemGridTheme` — `themeQuartz.withParams(designSystemGridThemeParams)`, the actual theme object consumers pass to `createGrid()`.

### Why not test AG Grid's resolved theme output

AG Grid's public `Theme<TParams>` type (from the `ag-stack` dependency) only exposes `withPart`/`withoutPart`/`withParams` — no public getter for resolved param values. The only param-inspection surface (`ThemeImpl._getModeParams()`/`_getParamsCss()`) is marked `@internal AG_GRID_INTERNAL — Not for public use. Can change / be removed at any time.` Testing against that surface would couple this package's test suite to an API AG Grid explicitly reserves the right to break. Testing `designSystemGridThemeParams` (our own input, not AG Grid's internal output) verifies the same binding correctness without that coupling.

## Key Constraints

- **Community edition only** — no Enterprise-only widgets are referenced or tested here. The theme itself works unchanged for Enterprise (it shares the same theming layer), but this package's scope stops at Community.
- **`ag-grid-community` is a peer dependency** — consumers supply their own AG Grid v33+ version; it's a `devDependency` here only for local type-checking and testing.
- **`@baloise/ds-tokens` is a regular dependency**, not a peer — the `--ds-alias-*` names it exports are an internal contract with this package, not a bring-your-own-version situation.
- **No brand-specific code** — multi-brand support (e.g. TCS) comes entirely from the existing `[data-theme="tcs"]` token-cascade mechanism plus `var()` binding; nothing in this package's source changes per brand.
- **Consumers must load `@baloise/ds-tokens` CSS themselves** — the theme's params reference custom properties, so if the token stylesheet isn't on the page, they resolve to nothing.

## Related Contexts

See [CONTEXT-MAP.md](../../CONTEXT-MAP.md) for:

- [[packages/tokens|packages/tokens/CONTEXT.md]] — owns the `--ds-alias-*` custom properties this package binds to
- [[packages/react|packages/react/CONTEXT.md]] — closest structural precedent (thin published wrapper, `tsc`-only build, no generated code)
- [[root|CONTEXT.md]] — repository-level concepts
