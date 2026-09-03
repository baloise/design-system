---
'@baloise/ds-tokens': major
'@baloise/ds-core': major
---

**tokens/snackbar**: Restructure the snackbar tokens to match the toast tokens, and add missing spacing tokens:

- Remove the redundant `base` suffix from all color tokens (e.g. `snackbar.danger.color.background.base` is now `snackbar.danger.color.background`).
- Move `snackbar.<variant>.color.border` to `snackbar.<variant>.border` and change it from a `color` token to a `border` composition token referencing `alias.border.composite.surface-*-light`.
- Remove `snackbar.<variant>.color.text` (duplicate of body text color) and add `snackbar.<variant>.color.heading` (the variant's `5` color step, e.g. `global.color.danger.5`) and `snackbar.<variant>.color.body` (`alias.text.color.primary`).
- Move `snackbar.<variant>.color.progress-bar` / `progress-background` out of `color` to `snackbar.<variant>.progress.bar` / `progress.background`.
- Add shared `snackbar.heading` / `snackbar.body` typography composition tokens (same font styles for every variant, so no longer duplicated per variant).
- Add `snackbar.gap` and `snackbar.padding` tokens (`global.dimension.space.2` / `alias.space.base`).

**core/snackbar**: `ds-snackbar` now actually applies its border (`--snackbar-border`, new) and its icon color now matches the heading color — previously the border and icon color CSS custom properties referenced tokens that didn't exist and were never applied. New `--snackbar-heading-color` / `--snackbar-content-color` custom properties are applied to the heading and message text respectively, and `--snackbar-gap` / `--snackbar-p` are now sourced from `--ds-snackbar-gap` / `--ds-snackbar-padding` instead of hardcoded values.
