# Token Usage Report

This document tracks recent token migration work in the SCSS sources of `packages/styles` and `packages/core` against `packages/tokens/dist/css/base.tokens.css`.

---

## 1. Color token migrations (summary)

Legacy primitive color tokens based on the `light-blue` palette were replaced by the new `sky` palette primitives defined in `base.tokens.css`.

- Old pattern: `--bal-color-light-blue-[1-6]`
- New pattern: `--bal-color-sky-[1-6]`

All remaining SCSS usages of `--bal-color-light-blue-*` in `packages/core` and `packages/styles` were migrated to the corresponding `--bal-color-sky-*` tokens in earlier work.

> Note: Many of these usages are still _primitive_ color tokens (e.g. background, border, text). Where appropriate, these can later be refactored to use semantic tokens such as `--bal-background-color-*`, `--bal-border-color-*`, or `--bal-text-color-*` once design decisions are made.

---

## 2. Spacing token migrations: legacy → t‑shirt scale

### 2.1 Canonical spacing tokens

The canonical spacing tokens are defined in `packages/tokens/dist/css/base.tokens.css` as:

- Global: `--bal-space-none`, `--bal-space-auto`, `--bal-space-2xs`, `--bal-space-xs`, `--bal-space-sm`, `--bal-space-base`, `--bal-space-md`, `--bal-space-lg`, `--bal-space-xl`, `--bal-space-2xl`, `--bal-space-3xl`, `--bal-space-4xl`
- Per-device: `--bal-space-<size>-mobile|tablet|desktop`
- Aggregated: `--bal-space-<size>-device`

### 2.2 Legacy → new spacing name mapping

Legacy spacing names found in SCSS were mapped to the new t‑shirt scale as follows:

| Legacy name   | New t‑shirt name          |
| ------------- | ------------------------- |
| `xx-small`    | `2xs`                     |
| `x-small`     | `xs`                      |
| `small`       | `sm`                      |
| `normal`      | `base`                    |
| `medium`      | `md`                      |
| `large`       | `lg`                      |
| `x-large`     | `xl`                      |
| `xx-large`    | `2xl`                     |
| `xxx-large`   | `3xl`                     |
| `xxxx-large`  | `4xl`                     |
| `xxxxx-large` | `4xl` (closest available) |

This mapping is applied consistently to:

- Global tokens, e.g. `var(--bal-space-normal)` → `var(--bal-space-base)`
- Device tokens, e.g. `var(--bal-space-large-desktop)` → `var(--bal-space-lg-desktop)`

### 2.3 Updated SCSS files

The following SCSS files were updated to use the new t‑shirt spacing tokens (while keeping component/theme semantics intact):

- [packages/styles/sass/themes/compact.scss](packages/styles/sass/themes/compact.scss)

  - Compact theme aliases now reference canonical device-specific spacing tokens:
    - `--bal-space-xx-small-tablet: var(--bal-space-2xs-tablet);`
    - `--bal-space-xx-small-desktop: var(--bal-space-2xs-desktop);`
    - `--bal-space-x-small-tablet: var(--bal-space-xs-tablet);`
    - `--bal-space-small-tablet: var(--bal-space-sm-tablet);`
    - `--bal-space-normal-tablet: var(--bal-space-base-tablet);`
    - `--bal-space-medium-tablet: var(--bal-space-md-tablet);`
    - `--bal-space-large-tablet: var(--bal-space-lg-tablet);`
    - `--bal-space-x-large-tablet: var(--bal-space-xl-tablet);`
    - `--bal-space-xx-large-tablet: var(--bal-space-2xl-tablet);`
    - `--bal-space-xxx-large-tablet: var(--bal-space-3xl-tablet);`
    - `--bal-space-xxxx-large-tablet: var(--bal-space-4xl-tablet);`
    - `--bal-space-xxxxx-large-tablet: var(--bal-space-4xl-tablet);` (collapsed to max)
    - And the corresponding `*-desktop` variants.

- [packages/styles/src/core/vars/list.vars.scss](packages/styles/src/core/vars/list.vars.scss)

  - `--bal-description-list-row-gap: var(--bal-space-xx-small);` → `var(--bal-space-2xs);`
  - `--bal-description-list-column-gap: var(--bal-space-normal);` → `var(--bal-space-base);`

- [packages/styles/sass/structure.scss](packages/styles/sass/structure.scss)

  - Paragraph spacing updated from `var(--bal-space-normal)` to `var(--bal-space-base)`.

- [packages/core/src/components/bal-stage/bal-stage.scss](packages/core/src/components/bal-stage/bal-stage.scss)

  - Hero/stage vertical padding now uses `4xl/3xl/2xl` instead of `xxxx-large/xxx-large/xx-large`, including tablet/desktop overrides.

- [packages/core/src/components/bal-footer/bal-footer.scss](packages/core/src/components/bal-footer/bal-footer.scss)

  - All usages of `x-small`, `normal`, `medium-*`, and `large-*` spacing replaced with `xs`, `base`, `md-*`, and `lg-*` equivalents (including `*-desktop`).

- [packages/core/src/components/bal-tabs/bal-tabs.scss](packages/core/src/components/bal-tabs/bal-tabs.scss)

  - Vertical layout gaps updated: `x-large` → `xl`, `normal` → `base`.

- [packages/core/src/components/bal-option/bal-option.vars.scss](packages/core/src/components/bal-option/bal-option.vars.scss)

  - `--bal-option-padding-x: var(--bal-space-small);` → `var(--bal-space-sm);`.

- [packages/core/src/components/bal-popover/bal-popover.scss](packages/core/src/components/bal-popover/bal-popover.scss)

  - Tooltip inner padding updated from `x-small` → `xs`.

- [packages/core/src/components/bal-dropdown/bal-dropdown.scss](packages/core/src/components/bal-dropdown/bal-dropdown.scss)

  - Chip list gap and vertical padding updated from `xx-small`/`x-small` → `2xs`/`xs`.

- [packages/core/src/components/bal-radio/bal-radio.scss](packages/core/src/components/bal-radio/bal-radio.scss)

  - Button gap: `x-small` → `xs`.
  - Grid layout calculations now use `var(--bal-space-base)` instead of `var(--bal-space-normal)`.

- [packages/core/src/components/bal-radio/bal-radio-group/bal-radio-group.scss](packages/core/src/components/bal-radio/bal-radio-group/bal-radio-group.scss)

  - Group gaps: `normal` → `base`, `x-small` → `xs`.

- [packages/core/src/components/bal-checkbox/bal-checkbox.scss](packages/core/src/components/bal-checkbox/bal-checkbox.scss)

  - Button gap: `x-small` → `xs`.
  - Grid layout calculations updated from `normal` → `base`.

- [packages/core/src/components/bal-checkbox/bal-checkbox-group/bal-checkbox-group.scss](packages/core/src/components/bal-checkbox/bal-checkbox-group/bal-checkbox-group.scss)

  - Group gaps: `normal` → `base`, `x-small` → `xs`.

- [packages/core/src/components/bal-tooltip/bal-tooltip.scss](packages/core/src/components/bal-tooltip/bal-tooltip.scss)

  - Tooltip container padding: `x-small` → `xs`.

- [packages/core/src/components/bal-file-upload/bal-file-upload.scss](packages/core/src/components/bal-file-upload/bal-file-upload.scss)
  - Card margin-top: `normal` → `base`.

### 2.4 Remaining legacy names

After these changes:

- All `var(--bal-space-*)` usages in `packages/styles` and `packages/core` refer to canonical t‑shirt tokens (`2xs`, `xs`, `sm`, `base`, `md`, `lg`, `xl`, `2xl`, `3xl`, `4xl`) or their device variants.
- The only remaining occurrences of legacy words like `xx-small`, `normal`, `large`, etc. are in **custom property names** inside the compact theme (e.g. `--bal-space-xx-small-tablet`), which now correctly reference canonical tokens on the right-hand side.

If you want to fully align naming, these compact theme alias variables can later be renamed (e.g. `--bal-space-xx-small-tablet` → `--bal-space-2xs-tablet`), but this would be a breaking change for any consumers that reference those CSS custom properties directly.

---

## 3. Ambiguities and follow-ups

- There is no `5xl` spacing token in `base.tokens.css`. The legacy `xxxxx-large` alias is therefore mapped to `4xl` (largest available) in the compact theme.
- Component-level spacing is now backed by the canonical spacing scale, so future adjustments can be made centrally in `base.tokens.css` without touching component SCSS.
- Next potential step: audit remaining primitive color usages (now on the `sky` palette) and gradually introduce semantic spacing/space-\* tokens where design semantics are clear.
