---
'@baloise/ds-tokens': major
'@baloise/ds-core': major
---

**tokens/toast**: Remove the redundant `base` suffix from the toast color tokens (e.g. `toast.danger.color.background.base` is now `toast.danger.color.background`). This changes the generated CSS custom property names (e.g. `--ds-toast-danger-color-background-base` → `--ds-toast-danger-color-background`) for the `background`, `text`, `progress-bar` and `progress-background` tokens across all toast variants.

**tokens/toast**: Move `toast.<variant>.color.border` to `toast.<variant>.border` and change it from a `color` token to a `border` composition token referencing new `alias.border.composite.surface-*-light` tokens. The generated CSS custom property changes from `--ds-toast-danger-color-border` (a color) to `--ds-toast-danger-border` (a full border shorthand: width, style and color) for all toast variants.

**tokens/toast**: Add `toast.heading` (referencing `component.heading.level.5`) and `toast.body` (referencing `component.text.typo.small`) typography composition tokens, shared across all toast variants — flattened directly under `toast` rather than duplicated per variant (the font styles were identical for every variant). `ds-toast`'s heading/body font styles are now sourced from `--ds-toast-heading-*` / `--ds-toast-body-*` instead of per-variant CSS custom properties.

**tokens/toast**: Add `toast.<variant>.color.heading` (using the variant's `5` color step, e.g. `global.color.danger.5`) and `toast.<variant>.color.body` (using `alias.text.color.primary`) for all toast variants. New `--toast-heading-color` and `--toast-content-color` CSS custom properties were added to `ds-toast`, applied to the heading and message text respectively, and driven by these tokens.

**core/toast**: The toast icon now uses the same color as the heading (`--toast-icon-color` now defaults to `--toast-heading-color`, so it follows the variant's `5` color step) instead of an unused/broken `color-icon-base` token reference.

**tokens/toast**: Add `toast.gap` (`global.dimension.space.2`) and `toast.padding` (`alias.space.base`) tokens. `ds-toast`'s `--toast-gap` and `--toast-p` custom properties are now sourced from `--ds-toast-gap` / `--ds-toast-padding` instead of hardcoded `0.125rem` / `1rem` values (same resolved values, now tokenized).

**tokens/toast**: Remove `toast.<variant>.color.text`, which was a duplicate of `toast.<variant>.color.body` (identical values in every variant). `ds-toast`'s general text color (`--toast-color`) is now sourced from `--ds-toast-<variant>-color-body` instead.

**tokens/toast**: Move `toast.<variant>.color.progress-bar` / `toast.<variant>.color.progress-background` out of `color` to `toast.<variant>.progress.bar` / `toast.<variant>.progress.background`. The generated CSS custom properties change from `--ds-toast-danger-color-progress-bar` / `--ds-toast-danger-color-progress-background` to `--ds-toast-danger-progress-bar` / `--ds-toast-danger-progress-background` for all toast variants.

**core/toast**: The `toast.<variant>.border` token is now actually applied to `ds-toast`. Added a new `--toast-border` CSS custom property (sourced from `--ds-toast-<variant>-border`) and applied it via `border: var(--_toast-border)` on the host — previously the border token/CSS variable existed but was never consumed, so no border was rendered.
