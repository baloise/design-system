# Token Migration Report: `old.tokens.css` → `base.tokens.css`

_Source files_

- Old tokens: `packages/tokens/dist/css/old.tokens.css`
- New tokens: `packages/tokens/dist/css/base.tokens.css`

This document summarizes how to migrate from the old token set to the new one. It focuses on:

- Renamed / restructured token families
- Recommended mappings (where there is a clear 1:1 or pattern)
- Old tokens that no longer exist in the new set ("missing" tokens) so we can decide whether to re‑add them or define new equivalents.

---

## 1. High‑level changes

- Flattened primitives
  - New primitives for typography, spacing, elevation, etc. use numeric suffixes:
    - Font sizes: `--ds-font-size-12/14/16/...` instead of semantic size names.
    - Spacing: `--ds-size-space-0/1/2/.../128` as raw values.
    - Elevation: `--ds-elevation-shadow-*`, `--ds-elevation-opacity-*`, `--ds-elevation-z-index-*`.
- New semantic layers
  - Text: `--ds-text-*` (size, family, weight, line-height, color).
  - Layout: `--ds-space-*` (t‑shirt scale), `--ds-radius-*`, `--ds-container-width-*`, `--ds-breakpoint-*`.
  - Color: `--ds-background-color-*`, `--ds-border-color-*`, `--ds-text-color-*`.
- Naming clean‑ups
  - Old prefixes like `--ds-color-background-*`, `--ds-color-border-*`, `--ds-color-text-*` are replaced by clearer `--ds-background-color-*`, `--ds-border-color-*`, `--ds-text-color-*`.
  - Old “light‑blue” palette is now called “sky”.

---

## 2. Color tokens

### 2.1 Palette rename: light‑blue → sky

Old primitive palette:

- `--ds-color-light-blue-1` … `--ds-color-light-blue-6`

New primitive palette (same values, new name):

- `--ds-color-sky-1` … `--ds-color-sky-6`

> **Migration:** wherever possible, replace `--ds-color-light-blue-*` with `--ds-color-sky-*`.

### 2.2 Semantic color prefixes

Old semantic tokens:

- Text: `--ds-color-text-*`
- Borders: `--ds-color-border-*`, `--ds-color-border`
- Backgrounds: `--ds-color-background-*`

New semantic tokens:

- Text: `--ds-text-color-*`
- Borders: `--ds-border-color-*`
- Backgrounds: `--ds-background-color-*`

**Examples:**

- `--ds-color-text-primary` → `--ds-text-color-primary`
- `--ds-color-text-primary-hovered` → `--ds-text-color-primary-hover`
- `--ds-color-text-primary-pressed` → `--ds-text-color-primary-active`
- `--ds-color-text-inverted` → `--ds-text-color-white`
- `--ds-color-text-grey(-light/-dark)` → `--ds-text-color-grey(-light/-dark)`
- `--ds-color-border-primary` → `--ds-border-color-primary`
- `--ds-color-border-grey(-light/-dark)` → `--ds-border-color-grey(-light/-dark)`
- `--ds-color-background-danger` → `--ds-background-color-danger`
- `--ds-color-background-warning` → `--ds-background-color-warning`
- `--ds-color-background-success` → `--ds-background-color-success`
- `--ds-color-background-info` → `--ds-background-color-info`
- `--ds-color-background-grey(-light)` → `--ds-background-color-grey(-light)`
- `--ds-color-background-white` → `--ds-background-color-white`

### 2.3 Focus and interaction colors

Old focus tokens:

- `--ds-color-shadow-focus-start`
- `--ds-color-shadow-focus-end`
- `--ds-color-shadow-focus-inverted-start`
- `--ds-color-shadow-focus-inverted-end`

New interaction tokens:

- `--ds-interaction-focus-color-start`
- `--ds-interaction-focus-color-end`
- `--ds-interaction-focus-color-inverted-start`
- `--ds-interaction-focus-color-inverted-end`

> **Migration:** replace `--ds-color-shadow-focus-*` with `--ds-interaction-focus-color-*`.

---

## 3. Spacing tokens (t‑shirt scale)

Old spacing names (global):

- `--ds-space-xx-small`
- `--ds-space-x-small`
- `--ds-space-small`
- `--ds-space-normal`
- `--ds-space-medium`
- `--ds-space-large`
- `--ds-space-x-large`
- `--ds-space-xx-large`
- `--ds-space-xxx-large`
- `--ds-space-xxxx-large`

Plus device variants like `--ds-space-large-tablet`, `--ds-space-normal-desktop`, etc.

New spacing tokens use a t‑shirt scale and device variants, built on `--ds-size-space-*` primitives:

- T‑shirt scale: `none`, `auto`, `2xs`, `xs`, `sm`, `base`, `md`, `lg`, `xl`, `2xl`, `3xl`, `4xl`.
- Device variants: `--ds-space-<size>-mobile/tablet/desktop`.

### 3.1 Recommended mapping

| Old spacing token       | New spacing token   |
| ----------------------- | ------------------- |
| `--ds-space-xx-small`   | `--ds-space-2xs-*`  |
| `--ds-space-x-small`    | `--ds-space-xs-*`   |
| `--ds-space-small`      | `--ds-space-sm-*`   |
| `--ds-space-normal`     | `--ds-space-base-*` |
| `--ds-space-medium`     | `--ds-space-md-*`   |
| `--ds-space-large`      | `--ds-space-lg-*`   |
| `--ds-space-x-large`    | `--ds-space-xl-*`   |
| `--ds-space-xx-large`   | `--ds-space-2xl-*`  |
| `--ds-space-xxx-large`  | `--ds-space-3xl-*`  |
| `--ds-space-xxxx-large` | `--ds-space-4xl-*`  |

Where `*` is either no suffix (if you used the base value) or the corresponding device suffix (`-mobile`, `-tablet`, `-desktop`).

Old device aliases like:

- `--ds-space-normal-desktop`, `--ds-space-normal-tablet`, etc.

…should be replaced with the corresponding new device variants:

- `--ds-space-base-desktop`, `--ds-space-base-tablet`, etc.

---

## 4. Text sizes (t‑shirt scale)

Old text size names:

- `--ds-text-size-x-small`, `--ds-text-size-small`, `--ds-text-size-normal`, `--ds-text-size-medium`, `--ds-text-size-large`, `--ds-text-size-x-large`, `--ds-text-size-xx-large`, `--ds-text-size-xxx-large`, `--ds-text-size-xxxx-large`, `--ds-text-size-xxxxx-large` (+ desktop/tablet variants).

New text size tokens:

- T‑shirt scale: `--ds-text-size-xs/sm/base/md/lg/xl/2xl/3xl/4xl/5xl` with `-mobile/-tablet/-desktop` variants.

### 4.1 Recommended mapping

Conceptually, the old names map to the new t‑shirt text sizes like this:

| Old text size                | New text size token     |
| ---------------------------- | ----------------------- |
| `--ds-text-size-x-small`     | `--ds-text-size-xs-*`   |
| `--ds-text-size-small`       | `--ds-text-size-sm-*`   |
| `--ds-text-size-normal`      | `--ds-text-size-base-*` |
| `--ds-text-size-medium`      | `--ds-text-size-md-*`   |
| `--ds-text-size-large`       | `--ds-text-size-lg-*`   |
| `--ds-text-size-x-large`     | `--ds-text-size-xl-*`   |
| `--ds-text-size-xx-large`    | `--ds-text-size-2xl-*`  |
| `--ds-text-size-xxx-large`   | `--ds-text-size-3xl-*`  |
| `--ds-text-size-xxxx-large`  | `--ds-text-size-4xl-*`  |
| `--ds-text-size-xxxxx-large` | `--ds-text-size-5xl-*`  |

Again, `*` stands for the device suffix (`-mobile/-tablet/-desktop`).

> **Implementation detail:** in `base.tokens.css` these t‑shirt sizes are defined by composing the numeric font primitives (`--ds-font-size-12/14/...`), so the exact rem values remain consistent with the old system.

### 4.2 Line height and family/weight

Old tokens:

- `--ds-text-line-height-text` → new `--ds-text-line-height-body`
- `--ds-text-line-height-title` → new `--ds-text-line-height-heading`
- `--ds-font-family-text` → new `--ds-font-family-body` / `--ds-text-family-body`
- `--ds-font-family-title` → new `--ds-font-family-heading` / `--ds-text-family-heading`
- `--ds-font-weight-light/regular/bold` → new `--ds-text-weight-light/regular/bold`

---

## 5. Radius, borders, containers, breakpoints

### 5.1 Radius

Old radius tokens:

- `--ds-radius-normal`
- `--ds-radius-large`
- `--ds-radius-rounded`

New primitives:

- `--ds-size-radius-0/1/2/3`

New semantic tokens:

- `--ds-radius-none` (→ size-radius-0)
- `--ds-radius-base` (→ size-radius-1)
- `--ds-radius-lg` (→ size-radius-2)
- `--ds-radius-rounded` (→ size-radius-3)

**Mapping:**

- `--ds-radius-normal` → `--ds-radius-base`
- `--ds-radius-large` → `--ds-radius-lg`
- `--ds-radius-rounded` → `--ds-radius-rounded` (same name, now via primitives)

### 5.2 Border width

Old tokens:

- `--ds-border-width-small`
- `--ds-border-width-normal`
- `--ds-border-width-large`

New primitives:

- `--ds-size-border-0/1/2/3`

New semantic tokens:

- `--ds-border-width-none` → `--ds-size-border-0`
- `--ds-border-width-base` → `--ds-size-border-2`

> **Note:** there are no direct new `small`/`large` named border width tokens; see the "Missing tokens" section.

### 5.3 Containers

Old tokens:

- `--ds-container-size-fluid` (100%)
- `--ds-container-size-normal` (1496px)
- `--ds-container-size-compact` (896px)
- `--ds-container-size-detail-page` (744px)

New primitives:

- `--ds-size-container-1..5`, `--ds-size-container-full`

New semantic tokens:

- `--ds-container-width-fluid` → `--ds-size-container-full`
- `--ds-container-width-base` → `--ds-size-container-5`
- `--ds-container-width-compact` → `--ds-size-container-4`
- `--ds-container-width-modal` → `--ds-size-container-3`

**Mapping:**

- `--ds-container-size-fluid` → `--ds-container-width-fluid`
- `--ds-container-size-normal` → `--ds-container-width-base`
- `--ds-container-size-compact` → `--ds-container-width-compact`
- `--ds-container-size-detail-page` → **no direct replacement** (see "Missing tokens").

### 5.4 Breakpoints

Old tokens:

- `--ds-breakpoint-tablet` (769px)
- `--ds-breakpoint-desktop` (1024px)
- `--ds-breakpoint-high-definition` (1280px)
- `--ds-breakpoint-widescreen` (1440px)
- `--ds-breakpoint-fullhd` (1920px)

New primitives:

- `--ds-size-breakpoint-1..5`

New semantic tokens:

- `--ds-breakpoint-tablet` → size-breakpoint-1
- `--ds-breakpoint-desktop` → size-breakpoint-2
- `--ds-breakpoint-desktop-lg` → size-breakpoint-3
- `--ds-breakpoint-desktop-xl` → size-breakpoint-4
- `--ds-breakpoint-desktop-2xl` → size-breakpoint-5

**Mapping:**

- `--ds-breakpoint-tablet` → `--ds-breakpoint-tablet` (same name, different implementation)
- `--ds-breakpoint-desktop` → `--ds-breakpoint-desktop`
- `--ds-breakpoint-high-definition` → `--ds-breakpoint-desktop-lg`
- `--ds-breakpoint-widescreen` → `--ds-breakpoint-desktop-xl`
- `--ds-breakpoint-fullhd` → `--ds-breakpoint-desktop-2xl`

---

## 6. Elevation, shadows, opacity, z‑index

### 6.1 Shadows

Old tokens:

- `--ds-text-shadow-normal`
- `--ds-shadow-small`
- `--ds-shadow-normal`
- `--ds-shadow-large`
- `--ds-shadow-header`

New primitives:

- `--ds-font-shadow-0/1`
- `--ds-elevation-shadow-0..4`

New semantic tokens:

- `--ds-text-shadow` (→ font-shadow-1)
- `--ds-shadow-box-none` (→ elevation-shadow-0)
- `--ds-shadow-box-header` (→ elevation-shadow-2)
- `--ds-shadow-box-base` (→ elevation-shadow-3)
- `--ds-shadow-box-elevated` (→ elevation-shadow-4)

**Mapping examples:**

- `--ds-text-shadow-normal` → `--ds-text-shadow`
- `--ds-shadow-header` → `--ds-shadow-box-header`
- `--ds-shadow-normal` → `--ds-shadow-box-base`
- `--ds-shadow-large` → `--ds-shadow-box-elevated`
- `--ds-shadow-small` → (closest primitive: `--ds-elevation-shadow-1`)

### 6.2 Opacity

Old primitives:

- `--ds-opacity-100/80/60/50/40/30/0`

New primitives:

- `--ds-elevation-opacity-0/30/40/50/60/80/100`

New semantic tokens:

- `--ds-opacity-hidden` → elevation-opacity-0
- `--ds-opacity-half` → elevation-opacity-50
- `--ds-opacity-disabled` → elevation-opacity-60
- `--ds-opacity-backdrop` → elevation-opacity-80
- `--ds-opacity-full` → elevation-opacity-100

**Mapping examples:**

- `--ds-opacity-100` → `--ds-opacity-full`
- `--ds-opacity-0` → `--ds-opacity-hidden`
- `--ds-opacity-50` → `--ds-opacity-half`
- `--ds-opacity-60` → `--ds-opacity-disabled`
- `--ds-opacity-80` → `--ds-opacity-backdrop`

### 6.3 Z‑index

Old tokens:

- `--ds-z-index-tooltip`, `--ds-z-index-toast`, `--ds-z-index-modal`, `--ds-z-index-popup`, `--ds-z-index-navigation`, `--ds-z-index-sticky`, `--ds-z-index-mask`, `--ds-z-index-masked`, `--ds-z-index-deep`, `--ds-z-index`

New primitives:

- `--ds-elevation-z-index-...`

New semantic tokens:

- `--ds-z-index-deep`
- `--ds-z-index-masked`
- `--ds-z-index-mask`
- `--ds-z-index-sticky`
- `--ds-z-index-navigation`
- `--ds-z-index-popup`
- `--ds-z-index-modal`
- `--ds-z-index-toast`
- `--ds-z-index-tooltip`

**Notes:**

- All named z‑index tokens except the plain `--ds-z-index` still exist, but now delegate to `--ds-elevation-z-index-*`.
- The generic `--ds-z-index` token does not exist anymore (see "Missing tokens").

---

## 7. Tokens that are missing in the new set

These tokens exist in `old.tokens.css` but have **no direct 1:1 counterpart** in `base.tokens.css` under the same or clearly corresponding name. We may want to either re‑add them or define explicit replacements in a future iteration.

### 7.1 Animation

- `--ds-animation-transition-easing`
- `--ds-animation-transition-duration`

### 7.2 Border widths

Semantic names no longer exist; only numeric primitives and `border-width-base/none` are present.

- `--ds-border-width-small`
- `--ds-border-width-normal` (covered indirectly by `--ds-border-width-base` → size‑border‑2, but the name itself is gone)
- `--ds-border-width-large`

### 7.3 Containers

- `--ds-container-size-detail-page`

### 7.4 Generic z‑index

- `--ds-z-index`

All specific z‑index roles (tooltip, toast, modal, etc.) still exist; only the generic catch‑all is missing.

### 7.5 Column layout

- `--ds-column-gap`

### 7.6 Numeric opacity aliases

The exact numeric names are gone; use semantic opacity tokens instead.

- `--ds-opacity-100`
- `--ds-opacity-80`
- `--ds-opacity-60`
- `--ds-opacity-50`
- `--ds-opacity-40`
- `--ds-opacity-30`
- `--ds-opacity-0`

### 7.7 Old semantic color aggregates

The single‑name aggregate tokens are no longer present; instead, use the more explicit background/border/text tokens.

- `--ds-color-danger`
- `--ds-color-warning`
- `--ds-color-success`
- `--ds-color-info`
- `--ds-color-red`
- `--ds-color-yellow`
- `--ds-color-green`
- `--ds-color-purple`
- `--ds-color-light-blue`
- `--ds-color-grey`
- `--ds-color-primary`
- `--ds-color-border`

For these, prefer:

- `--ds-background-color-*`
- `--ds-border-color-*`
- `--ds-text-color-*`

over a single aggregate color.

---

## 8. Open questions / TODOs

- Decide whether to reintroduce semantic border width tokens (small/large) on top of `--ds-size-border-*`.
- Decide whether we still need a generic `--ds-z-index` or if all usages should move to role‑based tokens (`tooltip`, `modal`, etc.).
- Decide on a replacement for `--ds-container-size-detail-page` (specific layout or reuse of `compact`/`modal`).
- If we want design‑level control over animation timings, introduce new tokens (e.g. `--ds-animation-duration-base`, `--ds-animation-easing-base`) into `base.tokens.css`.
