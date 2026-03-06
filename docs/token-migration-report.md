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
    - Font sizes: `--bal-font-size-12/14/16/...` instead of semantic size names.
    - Spacing: `--bal-size-space-0/1/2/.../128` as raw values.
    - Elevation: `--bal-elevation-shadow-*`, `--bal-elevation-opacity-*`, `--bal-elevation-z-index-*`.
- New semantic layers
  - Text: `--bal-text-*` (size, family, weight, line-height, color).
  - Layout: `--bal-space-*` (t‑shirt scale), `--bal-radius-*`, `--bal-container-width-*`, `--bal-breakpoint-*`.
  - Color: `--bal-background-color-*`, `--bal-border-color-*`, `--bal-text-color-*`.
- Naming clean‑ups
  - Old prefixes like `--bal-color-background-*`, `--bal-color-border-*`, `--bal-color-text-*` are replaced by clearer `--bal-background-color-*`, `--bal-border-color-*`, `--bal-text-color-*`.
  - Old “light‑blue” palette is now called “sky”.

---

## 2. Color tokens

### 2.1 Palette rename: light‑blue → sky

Old primitive palette:

- `--bal-color-light-blue-1` … `--bal-color-light-blue-6`

New primitive palette (same values, new name):

- `--bal-color-sky-1` … `--bal-color-sky-6`

> **Migration:** wherever possible, replace `--bal-color-light-blue-*` with `--bal-color-sky-*`.

### 2.2 Semantic color prefixes

Old semantic tokens:

- Text: `--bal-color-text-*`
- Borders: `--bal-color-border-*`, `--bal-color-border`
- Backgrounds: `--bal-color-background-*`

New semantic tokens:

- Text: `--bal-text-color-*`
- Borders: `--bal-border-color-*`
- Backgrounds: `--bal-background-color-*`

**Examples:**

- `--bal-color-text-primary` → `--bal-text-color-primary`
- `--bal-color-text-primary-hovered` → `--bal-text-color-primary-hover`
- `--bal-color-text-primary-pressed` → `--bal-text-color-primary-active`
- `--bal-color-text-inverted` → `--bal-text-color-white`
- `--bal-color-text-grey(-light/-dark)` → `--bal-text-color-grey(-light/-dark)`
- `--bal-color-border-primary` → `--bal-border-color-primary`
- `--bal-color-border-grey(-light/-dark)` → `--bal-border-color-grey(-light/-dark)`
- `--bal-color-background-danger` → `--bal-background-color-danger`
- `--bal-color-background-warning` → `--bal-background-color-warning`
- `--bal-color-background-success` → `--bal-background-color-success`
- `--bal-color-background-info` → `--bal-background-color-info`
- `--bal-color-background-grey(-light)` → `--bal-background-color-grey(-light)`
- `--bal-color-background-white` → `--bal-background-color-white`

### 2.3 Focus and interaction colors

Old focus tokens:

- `--bal-color-shadow-focus-start`
- `--bal-color-shadow-focus-end`
- `--bal-color-shadow-focus-inverted-start`
- `--bal-color-shadow-focus-inverted-end`

New interaction tokens:

- `--bal-interaction-focus-color-start`
- `--bal-interaction-focus-color-end`
- `--bal-interaction-focus-color-inverted-start`
- `--bal-interaction-focus-color-inverted-end`

> **Migration:** replace `--bal-color-shadow-focus-*` with `--bal-interaction-focus-color-*`.

---

## 3. Spacing tokens (t‑shirt scale)

Old spacing names (global):

- `--bal-space-xx-small`
- `--bal-space-x-small`
- `--bal-space-small`
- `--bal-space-normal`
- `--bal-space-medium`
- `--bal-space-large`
- `--bal-space-x-large`
- `--bal-space-xx-large`
- `--bal-space-xxx-large`
- `--bal-space-xxxx-large`

Plus device variants like `--bal-space-large-tablet`, `--bal-space-normal-desktop`, etc.

New spacing tokens use a t‑shirt scale and device variants, built on `--bal-size-space-*` primitives:

- T‑shirt scale: `none`, `auto`, `2xs`, `xs`, `sm`, `base`, `md`, `lg`, `xl`, `2xl`, `3xl`, `4xl`.
- Device variants: `--bal-space-<size>-mobile/tablet/desktop`.

### 3.1 Recommended mapping

| Old spacing token        | New spacing token    |
| ------------------------ | -------------------- |
| `--bal-space-xx-small`   | `--bal-space-2xs-*`  |
| `--bal-space-x-small`    | `--bal-space-xs-*`   |
| `--bal-space-small`      | `--bal-space-sm-*`   |
| `--bal-space-normal`     | `--bal-space-base-*` |
| `--bal-space-medium`     | `--bal-space-md-*`   |
| `--bal-space-large`      | `--bal-space-lg-*`   |
| `--bal-space-x-large`    | `--bal-space-xl-*`   |
| `--bal-space-xx-large`   | `--bal-space-2xl-*`  |
| `--bal-space-xxx-large`  | `--bal-space-3xl-*`  |
| `--bal-space-xxxx-large` | `--bal-space-4xl-*`  |

Where `*` is either no suffix (if you used the base value) or the corresponding device suffix (`-mobile`, `-tablet`, `-desktop`).

Old device aliases like:

- `--bal-space-normal-desktop`, `--bal-space-normal-tablet`, etc.

…should be replaced with the corresponding new device variants:

- `--bal-space-base-desktop`, `--bal-space-base-tablet`, etc.

---

## 4. Text sizes (t‑shirt scale)

Old text size names:

- `--bal-text-size-x-small`, `--bal-text-size-small`, `--bal-text-size-normal`, `--bal-text-size-medium`, `--bal-text-size-large`, `--bal-text-size-x-large`, `--bal-text-size-xx-large`, `--bal-text-size-xxx-large`, `--bal-text-size-xxxx-large`, `--bal-text-size-xxxxx-large` (+ desktop/tablet variants).

New text size tokens:

- T‑shirt scale: `--bal-text-size-xs/sm/base/md/lg/xl/2xl/3xl/4xl/5xl` with `-mobile/-tablet/-desktop` variants.

### 4.1 Recommended mapping

Conceptually, the old names map to the new t‑shirt text sizes like this:

| Old text size                 | New text size token      |
| ----------------------------- | ------------------------ |
| `--bal-text-size-x-small`     | `--bal-text-size-xs-*`   |
| `--bal-text-size-small`       | `--bal-text-size-sm-*`   |
| `--bal-text-size-normal`      | `--bal-text-size-base-*` |
| `--bal-text-size-medium`      | `--bal-text-size-md-*`   |
| `--bal-text-size-large`       | `--bal-text-size-lg-*`   |
| `--bal-text-size-x-large`     | `--bal-text-size-xl-*`   |
| `--bal-text-size-xx-large`    | `--bal-text-size-2xl-*`  |
| `--bal-text-size-xxx-large`   | `--bal-text-size-3xl-*`  |
| `--bal-text-size-xxxx-large`  | `--bal-text-size-4xl-*`  |
| `--bal-text-size-xxxxx-large` | `--bal-text-size-5xl-*`  |

Again, `*` stands for the device suffix (`-mobile/-tablet/-desktop`).

> **Implementation detail:** in `base.tokens.css` these t‑shirt sizes are defined by composing the numeric font primitives (`--bal-font-size-12/14/...`), so the exact rem values remain consistent with the old system.

### 4.2 Line height and family/weight

Old tokens:

- `--bal-text-line-height-text` → new `--bal-text-line-height-body`
- `--bal-text-line-height-title` → new `--bal-text-line-height-heading`
- `--bal-font-family-text` → new `--bal-font-family-body` / `--bal-text-family-body`
- `--bal-font-family-title` → new `--bal-font-family-heading` / `--bal-text-family-heading`
- `--bal-font-weight-light/regular/bold` → new `--bal-text-weight-light/regular/bold`

---

## 5. Radius, borders, containers, breakpoints

### 5.1 Radius

Old radius tokens:

- `--bal-radius-normal`
- `--bal-radius-large`
- `--bal-radius-rounded`

New primitives:

- `--bal-size-radius-0/1/2/3`

New semantic tokens:

- `--bal-radius-none` (→ size-radius-0)
- `--bal-radius-base` (→ size-radius-1)
- `--bal-radius-lg` (→ size-radius-2)
- `--bal-radius-rounded` (→ size-radius-3)

**Mapping:**

- `--bal-radius-normal` → `--bal-radius-base`
- `--bal-radius-large` → `--bal-radius-lg`
- `--bal-radius-rounded` → `--bal-radius-rounded` (same name, now via primitives)

### 5.2 Border width

Old tokens:

- `--bal-border-width-small`
- `--bal-border-width-normal`
- `--bal-border-width-large`

New primitives:

- `--bal-size-border-0/1/2/3`

New semantic tokens:

- `--bal-border-width-none` → `--bal-size-border-0`
- `--bal-border-width-base` → `--bal-size-border-2`

> **Note:** there are no direct new `small`/`large` named border width tokens; see the "Missing tokens" section.

### 5.3 Containers

Old tokens:

- `--bal-container-size-fluid` (100%)
- `--bal-container-size-normal` (1496px)
- `--bal-container-size-compact` (896px)
- `--bal-container-size-detail-page` (744px)

New primitives:

- `--bal-size-container-1..5`, `--bal-size-container-full`

New semantic tokens:

- `--bal-container-width-fluid` → `--bal-size-container-full`
- `--bal-container-width-base` → `--bal-size-container-5`
- `--bal-container-width-compact` → `--bal-size-container-4`
- `--bal-container-width-modal` → `--bal-size-container-3`

**Mapping:**

- `--bal-container-size-fluid` → `--bal-container-width-fluid`
- `--bal-container-size-normal` → `--bal-container-width-base`
- `--bal-container-size-compact` → `--bal-container-width-compact`
- `--bal-container-size-detail-page` → **no direct replacement** (see "Missing tokens").

### 5.4 Breakpoints

Old tokens:

- `--bal-breakpoint-tablet` (769px)
- `--bal-breakpoint-desktop` (1024px)
- `--bal-breakpoint-high-definition` (1280px)
- `--bal-breakpoint-widescreen` (1440px)
- `--bal-breakpoint-fullhd` (1920px)

New primitives:

- `--bal-size-breakpoint-1..5`

New semantic tokens:

- `--bal-breakpoint-tablet` → size-breakpoint-1
- `--bal-breakpoint-desktop` → size-breakpoint-2
- `--bal-breakpoint-desktop-lg` → size-breakpoint-3
- `--bal-breakpoint-desktop-xl` → size-breakpoint-4
- `--bal-breakpoint-desktop-2xl` → size-breakpoint-5

**Mapping:**

- `--bal-breakpoint-tablet` → `--bal-breakpoint-tablet` (same name, different implementation)
- `--bal-breakpoint-desktop` → `--bal-breakpoint-desktop`
- `--bal-breakpoint-high-definition` → `--bal-breakpoint-desktop-lg`
- `--bal-breakpoint-widescreen` → `--bal-breakpoint-desktop-xl`
- `--bal-breakpoint-fullhd` → `--bal-breakpoint-desktop-2xl`

---

## 6. Elevation, shadows, opacity, z‑index

### 6.1 Shadows

Old tokens:

- `--bal-text-shadow-normal`
- `--bal-shadow-small`
- `--bal-shadow-normal`
- `--bal-shadow-large`
- `--bal-shadow-header`

New primitives:

- `--bal-font-shadow-0/1`
- `--bal-elevation-shadow-0..4`

New semantic tokens:

- `--bal-text-shadow` (→ font-shadow-1)
- `--bal-shadow-box-none` (→ elevation-shadow-0)
- `--bal-shadow-box-header` (→ elevation-shadow-2)
- `--bal-shadow-box-base` (→ elevation-shadow-3)
- `--bal-shadow-box-elevated` (→ elevation-shadow-4)

**Mapping examples:**

- `--bal-text-shadow-normal` → `--bal-text-shadow`
- `--bal-shadow-header` → `--bal-shadow-box-header`
- `--bal-shadow-normal` → `--bal-shadow-box-base`
- `--bal-shadow-large` → `--bal-shadow-box-elevated`
- `--bal-shadow-small` → (closest primitive: `--bal-elevation-shadow-1`)

### 6.2 Opacity

Old primitives:

- `--bal-opacity-100/80/60/50/40/30/0`

New primitives:

- `--bal-elevation-opacity-0/30/40/50/60/80/100`

New semantic tokens:

- `--bal-opacity-hidden` → elevation-opacity-0
- `--bal-opacity-half` → elevation-opacity-50
- `--bal-opacity-disabled` → elevation-opacity-60
- `--bal-opacity-backdrop` → elevation-opacity-80
- `--bal-opacity-full` → elevation-opacity-100

**Mapping examples:**

- `--bal-opacity-100` → `--bal-opacity-full`
- `--bal-opacity-0` → `--bal-opacity-hidden`
- `--bal-opacity-50` → `--bal-opacity-half`
- `--bal-opacity-60` → `--bal-opacity-disabled`
- `--bal-opacity-80` → `--bal-opacity-backdrop`

### 6.3 Z‑index

Old tokens:

- `--bal-z-index-tooltip`, `--bal-z-index-toast`, `--bal-z-index-modal`, `--bal-z-index-popup`, `--bal-z-index-navigation`, `--bal-z-index-sticky`, `--bal-z-index-mask`, `--bal-z-index-masked`, `--bal-z-index-deep`, `--bal-z-index`

New primitives:

- `--bal-elevation-z-index-...`

New semantic tokens:

- `--bal-z-index-deep`
- `--bal-z-index-masked`
- `--bal-z-index-mask`
- `--bal-z-index-sticky`
- `--bal-z-index-navigation`
- `--bal-z-index-popup`
- `--bal-z-index-modal`
- `--bal-z-index-toast`
- `--bal-z-index-tooltip`

**Notes:**

- All named z‑index tokens except the plain `--bal-z-index` still exist, but now delegate to `--bal-elevation-z-index-*`.
- The generic `--bal-z-index` token does not exist anymore (see "Missing tokens").

---

## 7. Tokens that are missing in the new set

These tokens exist in `old.tokens.css` but have **no direct 1:1 counterpart** in `base.tokens.css` under the same or clearly corresponding name. We may want to either re‑add them or define explicit replacements in a future iteration.

### 7.1 Animation

- `--bal-animation-transition-easing`
- `--bal-animation-transition-duration`

### 7.2 Border widths

Semantic names no longer exist; only numeric primitives and `border-width-base/none` are present.

- `--bal-border-width-small`
- `--bal-border-width-normal` (covered indirectly by `--bal-border-width-base` → size‑border‑2, but the name itself is gone)
- `--bal-border-width-large`

### 7.3 Containers

- `--bal-container-size-detail-page`

### 7.4 Generic z‑index

- `--bal-z-index`

All specific z‑index roles (tooltip, toast, modal, etc.) still exist; only the generic catch‑all is missing.

### 7.5 Column layout

- `--bal-column-gap`

### 7.6 Numeric opacity aliases

The exact numeric names are gone; use semantic opacity tokens instead.

- `--bal-opacity-100`
- `--bal-opacity-80`
- `--bal-opacity-60`
- `--bal-opacity-50`
- `--bal-opacity-40`
- `--bal-opacity-30`
- `--bal-opacity-0`

### 7.7 Old semantic color aggregates

The single‑name aggregate tokens are no longer present; instead, use the more explicit background/border/text tokens.

- `--bal-color-danger`
- `--bal-color-warning`
- `--bal-color-success`
- `--bal-color-info`
- `--bal-color-red`
- `--bal-color-yellow`
- `--bal-color-green`
- `--bal-color-purple`
- `--bal-color-light-blue`
- `--bal-color-grey`
- `--bal-color-primary`
- `--bal-color-border`

For these, prefer:

- `--bal-background-color-*`
- `--bal-border-color-*`
- `--bal-text-color-*`

over a single aggregate color.

---

## 8. Open questions / TODOs

- Decide whether to reintroduce semantic border width tokens (small/large) on top of `--bal-size-border-*`.
- Decide whether we still need a generic `--bal-z-index` or if all usages should move to role‑based tokens (`tooltip`, `modal`, etc.).
- Decide on a replacement for `--bal-container-size-detail-page` (specific layout or reuse of `compact`/`modal`).
- If we want design‑level control over animation timings, introduce new tokens (e.g. `--bal-animation-duration-base`, `--bal-animation-easing-base`) into `base.tokens.css`.
