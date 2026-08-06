# CONTEXT — packages/tokens (Design Tokens)

This document captures domain language, architectural patterns, and key concepts specific to the design tokens package.

## Overview

**packages/tokens** is the source of truth for all design values (colors, spacing, fonts, shadows, etc.) in the system. It uses **Style Dictionary** to compile human-readable token definitions into multiple output formats:

- CSS variables (`dist/css/base.tokens.css`)
- SCSS functions/variables (`dist/scss/_tokens.scss`)
- JavaScript/JSON (`dist/json/tokens.json`)
- TypeScript types

## What are Design Tokens?

Design tokens are **named, reusable design decisions** stored as data rather than hard-coded values. Instead of writing `background-color: #005EFF` in your CSS, you write `background-color: var(--ds-button-primary-color-bg-base)`.

This approach provides:

- **Single source of truth** — designers and developers reference the same values
- **Easy rebranding** — change one token, update everywhere automatically
- **Consistency** — all components automatically stay aligned

## Core Concepts

### Token Definition

A **token** is a named design value that represents a single, reusable design decision. Examples:

- `space-lg` → `1.5rem` (spacing token)
- `color-primary` → `#0066CC` (color token)
- `text-size-base` → `1rem` (typography token)
- `shadow-box-default` → `0 2px 8px rgba(0,0,0,0.1)` (shadow token)

### Three-Layer Architecture

Tokens are organized into three layers:

| Layer         | JSON Key       | Purpose                               | Consumer Access                            |
| ------------- | -------------- | ------------------------------------- | ------------------------------------------ |
| **Global**    | `🌐 Global`    | Raw values (color scales, base sizes) | ❌ Rarely; only when no Alias fits         |
| **Alias**     | `🔗 Alias`     | Meaningful abstractions for consumers | ✅ **Primary layer** for component/app use |
| **Component** | `🧩 Component` | Per-component token overrides         | ✅ When styling a specific DS component    |

**Flow:** Components reference Alias tokens → resolved to Global values → values come from Figma

### Naming Convention

Token names follow the [EightShapes naming guide](https://medium.com/eightshapes-llc/naming-tokens-in-design-systems-9e86c7444676): move from broad category to specific modifier.

**CSS variable prefix:** All CSS variables start with `--ds-` prefix.

Naming differs by layer:

#### Global Layer

Raw color scales with numbered intensity levels (1–5+):

- Pattern: `--ds-global-[category]-[name]-[number]`
- Examples:
  - `--ds-global-color-primary-1` through `--ds-global-color-primary-5` (lightest to darkest)
  - `--ds-global-color-danger-1` through `--ds-global-color-danger-4`
  - `--ds-global-color-grey-1` through `--ds-global-color-grey-5`

#### Alias Layer

Semantic abstractions for consumers (colors, spacing, typography, etc.):

- Pattern: `--ds-alias-[category]-[subcategory]-[name]`
- Examples:
  - `--ds-alias-background-color-sky` (references `--ds-global-color-sky-2`)
  - `--ds-alias-background-color-info` (references `--ds-global-color-info-3`)
  - `--ds-alias-space-lg` → `1.5rem`
  - `--ds-alias-text-size-base` → `1rem`
  - `--ds-alias-radius-base` → `0.25rem`

#### Component Layer

Per-component token overrides for specific use cases:

- Pattern: `--ds-[component]-[property]-[modifier]-[state]`
- Examples:
  - `--ds-button-color-primary-base-text` (button primary state text color)
  - `--ds-button-label-font-family` (button label typography)
  - `--ds-modal-header-border-color` (modal header styling)

### Figma Integration

Each token in `Base.tokens.json` carries a `$extensions.com.figma.variableId` (and, once synced at least once, `$extensions.com.figma.scopes`). **`Base.tokens.json` (and each brand's `*.tokens.json`) in GitHub is the sole source of truth.** Figma Variables are a generated projection of these files. A designer changing a variable in Figma has made a _proposal_, not a fact — it only becomes real once it lands in GitHub via a reviewed pull request. Figma itself never holds a value GitHub doesn't know about once sync has run. When referencing a token by name in Figma, the same name is used in CSS.

Two independent implementations keep this projection in sync, sharing the same vocabulary, `variableId` identity rule, and `.figma-sync-state.json` baseline below — see [ADR-0016](../../docs/adr/0016-github-action-supersedes-plugin-pull.md) for why the direction split this way:

- **The Figma Token Sync Plugin** (`packages/tokens/docs/figma-token-sync-plugin-plan.md`) — designer-driven, manual, in-Figma. Handles read-only diff status and Push (to Code) only.
- **The Figma Sync GitHub Action** (`.github/workflows/figma-sync.yml`, `figma-conflict-check.yml`) — automatic, server-to-server via the Figma REST API. Handles Pull (from Code) only, triggered whenever Toky's `toky/update-next` branch merges into `next`.

#### Figma Sync — Language

**Variable identity**:
The stable key used to match one token to one Figma Variable across syncs: `$extensions.com.figma.variableId` when present, falling back to name/path only for tokens that have never round-tripped through a sync.
_Avoid_: token name (as identity — names can change; a rename is not a delete+add)

**Pull (from Code)**:
Synchronization that reads `*.tokens.json` from GitHub and writes matching Figma Variables. Origin is GitHub; destination is Figma. Performed exclusively by the Figma Sync GitHub Action (see [ADR-0016](../../docs/adr/0016-github-action-supersedes-plugin-pull.md)). When Pull creates a Figma Variable for a token that had no `variableId` yet, the new id is written back to `next` as a direct bot commit, not a PR — the one deliberate exception to "GitHub writes are always PR-mediated" in this domain (see [ADR-0017](../../docs/adr/0017-direct-commit-variableid-backfill.md)).
_Avoid_: import, download, push (a Pull moves data INTO Figma — "push to Figma," though a natural-sounding phrase, names the wrong direction in this glossary)

**Push (to Code)**:
Synchronization that reads Figma Variables and opens a GitHub pull request with the resulting `*.tokens.json` changes. Origin is Figma; destination is GitHub, always via PR review, never a direct commit to `next`.
_Avoid_: export, publish, upload

**Sync baseline**:
The token state as of the last successful sync, committed to `.figma-sync-state.json` and keyed by variable identity. Used to tell a genuine conflict (both sides changed since baseline) apart from a one-sided change.
_Avoid_: snapshot, cache (it's specifically the last-agreed-state reference point for 3-way diffing, not a performance cache)

**Conflict**:
A token whose Figma value and GitHub value have both diverged from the sync baseline since the last sync — as opposed to a one-sided change, which is just a pending Pull or pending Push. On a Toky PR, a conflict is surfaced as a non-blocking PR comment, not a merge gate — see [ADR-0018](../../docs/adr/0018-non-blocking-conflict-check.md).
_Avoid_: diff, difference (a diff is any Figma/GitHub mismatch; a conflict is specifically one where the baseline shows both sides moved)

**Brand mode**:
A Figma Variable Collection mode representing one brand (Base, Tcs, future brands). A brand's token override is a different mode-value on the same variable, not a separate variable.
_Avoid_: theme, variant (component variants are a distinct concept in this system)

## Key Concepts

### Responsive Tokens

Typography and spacing tokens come in **three responsive variants** plus one auto-responsive form:

| Form        | Example                           | Behavior                     |
| ----------- | --------------------------------- | ---------------------------- |
| **Mobile**  | `--ds-alias-font-size-xl-mobile`  | Always mobile value          |
| **Tablet**  | `--ds-alias-font-size-xl-tablet`  | Always tablet value          |
| **Desktop** | `--ds-alias-font-size-xl-desktop` | Always desktop value         |
| **Device**  | `--ds-alias-font-size-xl-device`  | Auto-switches at breakpoints |

**Always prefer `-device`** in component code. The fixed variants exist only for special cases where you need to force a specific breakpoint value.

#### How `-device` Works

The `-device` variant automatically switches values at media breakpoints:

```css
:root {
  --ds-font-size-xl-device: var(--ds-font-size-28); /* mobile: 1.75rem */
}

@media (min-width: 769px) {
  :root {
    --ds-font-size-xl-device: var(--ds-font-size-40); /* tablet: 2.5rem */
  }
}

@media (min-width: 1024px) {
  :root {
    --ds-font-size-xl-device: var(--ds-font-size-40); /* desktop: 2.5rem */
  }
}
```

### Token Categories

Common categories in the Alias layer:

- **Space** (2XS–4XL, plus responsive variants)
- **Color** (backgrounds, borders, text, with light/dark variants)
- **Border** (width, color, radius)
- **Text** (size, color, family, weight, line-height, shadow)
- **Opacity** (hidden, half, disabled, backdrop, full)
- **Z-Index** (deep, masked, sticky, navigation, popup, modal, toast, tooltip)
- **Shadow** (box, text)
- **Breakpoint** (tablet, desktop, desktop-lg, etc.)

### JSON Structure

Component tokens are nested under `"🧩 Component" > "<ComponentName>"`:

```json
{
  "🧩 Component": {
    "Button": {
      "Color": {
        "Primary": {
          "Base": {
            "Text": {
              "$type": "color",
              "$value": "{🔗 Alias.Color.Text.White}",
              "$extensions": { "com.figma.variableId": "..." }
            }
          }
        }
      }
    }
  }
}
```

This maps to CSS variable: `--ds-button-color-primary-base-text`

## Token Naming Anatomy

Token names are composed of ordered segments that narrow scope:

```
--ds  -  component  -  variant  -  element  -  category  -  property  -  state
```

**Example: Button Primary Color**

```
--ds-button-primary-color-bg-base
  │    │       │       │     │  │
  │    │       │       │     │  └─ state (base, hover, active, disabled)
  │    │       │       │     └─ property (bg = background, text = color, border)
  │    │       │       └─ category (color, font, space)
  │    │       └─ variant (primary, secondary, ghost)
  │    └─ component (button, input, tag)
  └─ namespace (--ds)
```

### Naming Rules

**Typography tokens** use `font-` prefix:

- ✅ `--ds-button-font-size` (not `--ds-button-size`)
- ✅ `--ds-button-font-weight` (not `--ds-button-weight`)

**Color order** — variant comes before category:

- ✅ `--ds-button-primary-color-text`
- ❌ `--ds-button-color-primary-text` (wrong order)

**State is required** for colors:

- ✅ `--ds-button-primary-color-bg-base`
- ❌ `--ds-button-primary-color-bg` (missing state)

## Notable Patterns

### Building Tokens

Rebuild compiled outputs whenever `Base.tokens.json` changes:

```bash
pnpm tokens
```

This regenerates:

- `dist/css/base.tokens.css`
- `dist/scss/_tokens.scss`
- `dist/json/tokens.json`

### Token Lookup Guide

When a developer asks "what token should I use for X?":

1. Read `Base.tokens.json` — find the token in the Alias layer (prefer Alias; fall back to Global only if needed)
2. Read `dist/css/base.tokens.css` — find the exact CSS variable and resolved value
3. Return: `Token: space-lg → CSS: var(--ds-space-lg) → 1.5rem`

## Using Tokens in Components

### In Shadow DOM (Web Components)

Web components use a four-layer CSS cascade for each token:

```scss
@include vars.local(button-color, var(--ds-button-primary-color-text-base));

// Generates:
// --_button-color: var(--button-color, var(--mod-button-color, var(--ds-button-primary-color-text-base)))
```

This allows:

1. **Private** (`--_button-color`) — computed locally
2. **Public** (`--button-color`) — consumers can override
3. **Modifier** (`--mod-button-color`) — variant classes set this
4. **Design token** (`--ds-button-...`) — system default

### In Global CSS

Outside Shadow DOM, use tokens directly:

```css
.my-card {
  background: var(--ds-alias-background-color-primary);
  padding: var(--ds-alias-space-16);
  border-radius: var(--ds-alias-radius-base);
}
```

## Key Constraints

- **Alias tokens are primary** — Don't encourage direct Global reference
- **GitHub is the sole source of truth** — Design decisions flow from `*.tokens.json` → Figma Variables → components. Figma is a synchronized mirror, not an origin.
- **Figma changes are proposals** — A designer editing a Figma Variable does not change the token. It becomes a token change only once pushed through a pull request and merged.
- **Naming is immutable** — Renaming a token is a breaking change for consumers

## Architectural Decisions

Decisions specific to this package (Figma Variable identity, brand modes, sync baseline, Git Data API writes) live alongside every other package's in the repo-wide ADR log at [`docs/adr/`](../../docs/adr/), tagged `Package: packages/tokens`:

- [ADR-0011](../../docs/adr/0011-figma-variable-identity-key.md) — Figma Variable identity is `variableId`, not name/path
- [ADR-0012](../../docs/adr/0012-brand-modes-not-collections.md) — Brands map to Figma modes, not separate collections
- [ADR-0013](../../docs/adr/0013-native-variable-aliasing.md) — Token references become native Figma variable aliases
- [ADR-0014](../../docs/adr/0014-git-data-api-atomic-commits.md) — GitHub writes use the Git Data API for atomic commits
- [ADR-0015](../../docs/adr/0015-git-committed-sync-baseline.md) — Sync baseline is a git-committed file
- [ADR-0016](../../docs/adr/0016-github-action-supersedes-plugin-pull.md) — A GitHub Action, not the plugin, owns Pull (from Code)
- [ADR-0017](../../docs/adr/0017-direct-commit-variableid-backfill.md) — VariableId backfill is a direct commit to `next`, not a PR
- [ADR-0018](../../docs/adr/0018-non-blocking-conflict-check.md) — Conflict check comments, it doesn't block the merge
- [ADR-0019](../../docs/adr/0019-pull-auto-deletes-figma-variables.md) — Pull deletes the Figma Variable when a token is removed
- [ADR-0020](../../docs/adr/0020-figma-sync-action-standalone-script.md) — The Figma Sync Action's code stays standalone, not shared with apps/toky

## Related Contexts

See [CONTEXT-MAP.md](../../CONTEXT-MAP.md) for:

- [[packages/core|packages/core/CONTEXT.md]] — Component consumption of tokens
- [[packages/css|packages/css/CONTEXT.md]] — Utility class generation from tokens
- [[root|CONTEXT.md]] — Repository-level concepts
