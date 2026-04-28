# Design Token Mapping: `bal-*` to `ds-*`

Comprehensive mapping of legacy component variables (`--bal-*`) to modern design system tokens (`--ds-*`).

## 1. Colors

### Brand Colors

| Old (`bal-*`)              | New (`ds-*`)                    | Primitive              | Value   |
| -------------------------- | ------------------------------- | ---------------------- | ------- |
| `--bal-color-white`        | `--ds-color-white`              | `--ds-color-white`     | #FFFFFF |
| `--bal-color-grey`         | `--ds-background-color-grey`    | `--ds-color-grey-3`    | #E8E8E8 |
| `--bal-color-grey-1..6`    | `--ds-color-grey-1..6`          | Primitives             | Scale   |
| `--bal-color-primary`      | `--ds-background-color-primary` | `--ds-color-primary-5` | #000D6E |
| `--bal-color-primary-1..6` | `--ds-color-primary-1..6`       | Primitives             | Scale   |

### Status Colors

| Old (`bal-*`)         | New (`ds-*`)                    | Primitive              | Value   |
| --------------------- | ------------------------------- | ---------------------- | ------- |
| `--bal-color-danger`  | `--ds-background-color-danger`  | `--ds-color-danger-3`  | #F05D4D |
| `--bal-color-warning` | `--ds-background-color-warning` | `--ds-color-warning-3` | #FFD25E |
| `--bal-color-success` | `--ds-background-color-success` | `--ds-color-success-3` | #5BAB7A |
| `--bal-color-info`    | `--ds-background-color-info`    | `--ds-color-info-3`    | #60A0E0 |

### Text Colors

| Old (`bal-*`)              | New (`ds-*`)              | Primitive              | Value   |
| -------------------------- | ------------------------- | ---------------------- | ------- |
| `--bal-text-color-white`   | `--ds-text-color-white`   | `--ds-color-white`     | #FFFFFF |
| `--bal-text-color-grey`    | `--ds-text-color-grey`    | `--ds-color-grey-5`    | #747474 |
| `--bal-text-color-primary` | `--ds-text-color-primary` | `--ds-color-primary-5` | #000D6E |
| `--bal-text-color-info`    | `--ds-text-color-info`    | `--ds-color-info-4`    | #1C77D2 |
| `--bal-text-color-success` | `--ds-text-color-success` | `--ds-color-success-4` | #168741 |
| `--bal-text-color-warning` | `--ds-text-color-warning` | `--ds-color-yellow-6`  | #B24A00 |
| `--bal-text-color-danger`  | `--ds-text-color-danger`  | `--ds-color-danger-4`  | #EA1800 |

### Border Colors

| Old (`bal-*`)                | New (`ds-*`)                | Primitive              | Value   |
| ---------------------------- | --------------------------- | ---------------------- | ------- |
| `--bal-border-color-primary` | `--ds-border-color-primary` | `--ds-color-primary-5` | #000D6E |
| `--bal-border-color-grey`    | `--ds-border-color-grey`    | `--ds-color-grey-3`    | #E8E8E8 |
| `--bal-border-color-white`   | `--ds-border-color-white`   | `--ds-color-white`     | #FFFFFF |

---

## 2. Radius

### Border Radius

| Old (`bal-*`)          | New (`ds-*`)          | Primitive            | Value   |
| ---------------------- | --------------------- | -------------------- | ------- |
| `--bal-radius-normal`  | `--ds-radius-base`    | `--ds-size-radius-1` | 0.25rem |
| `--bal-radius-large`   | `--ds-radius-lg`      | `--ds-size-radius-2` | 0.75rem |
| `--bal-radius-rounded` | `--ds-radius-rounded` | `--ds-size-radius-3` | 9999px  |
| `--bal-radius-none`    | `--ds-radius-none`    | `--ds-size-radius-0` | 0       |

---

## 3. Shadow

### Box Shadows

| Old (`bal-*`)         | New (`ds-*`)               | Primitive                 | Value                            |
| --------------------- | -------------------------- | ------------------------- | -------------------------------- |
| `--bal-shadow-small`  | `--ds-shadow-box-header`   | `--ds-elevation-shadow-2` | 0 4px 4px 0 rgba(0, 7, 57, 0.15) |
| `--bal-shadow-normal` | `--ds-shadow-box-base`     | `--ds-elevation-shadow-3` | 0 0 10px 0 rgba(0, 7, 57, 0.15)  |
| `--bal-shadow-large`  | `--ds-shadow-box-elevated` | `--ds-elevation-shadow-4` | 0 0 30px 0 rgba(0, 7, 57, 0.15)  |

### Text Shadows

| Old (`bal-*`)              | New (`ds-*`)       | Primitive            | Value                                                                                              |
| -------------------------- | ------------------ | -------------------- | -------------------------------------------------------------------------------------------------- |
| `--bal-text-shadow-normal` | `--ds-shadow-text` | `--ds-font-shadow-1` | 0px 0px 4px rgba(0, 0, 0, 0.15), 0px 4px 12px rgba(0, 0, 0, 0.25), 0px 0px 80px rgba(0, 0, 0, 0.5) |

---

## 4. Font Weight

### Text Weight

| Old (`bal-*`)               | New (`ds-*`)               | Primitive              | Value |
| --------------------------- | -------------------------- | ---------------------- | ----- |
| `--bal-font-weight-light`   | `--ds-text-weight-light`   | `--ds-font-weight-300` | 300   |
| `--bal-font-weight-regular` | `--ds-text-weight-regular` | `--ds-font-weight-400` | 400   |
| `--bal-font-weight-bold`    | `--ds-text-weight-bold`    | `--ds-font-weight-700` | 700   |

---

## 5. Z-Index

### Stacking Context

| Old (`bal-*`)              | New (`ds-*`)              | Primitive                           | Value (rem) |
| -------------------------- | ------------------------- | ----------------------------------- | ----------- |
| `--bal-z-index-deep`       | `--ds-z-index-deep`       | `--ds-elevation-z-index-behind-all` | -62499.9375 |
| `--bal-z-index-masked`     | `--ds-z-index-masked`     | `--ds-elevation-z-index-100`        | 6.25        |
| `--bal-z-index-mask`       | `--ds-z-index-mask`       | `--ds-elevation-z-index-200`        | 12.5        |
| `--bal-z-index-sticky`     | `--ds-z-index-sticky`     | `--ds-elevation-z-index-300`        | 18.75       |
| `--bal-z-index-navigation` | `--ds-z-index-navigation` | `--ds-elevation-z-index-400`        | 25          |
| `--bal-z-index-popup`      | `--ds-z-index-popup`      | `--ds-elevation-z-index-1000`       | 62.5        |
| `--bal-z-index-modal`      | `--ds-z-index-modal`      | `--ds-elevation-z-index-1100`       | 68.75       |
| `--bal-z-index-toast`      | `--ds-z-index-toast`      | `--ds-elevation-z-index-1200`       | 75          |
| `--bal-z-index-tooltip`    | `--ds-z-index-tooltip`    | `--ds-elevation-z-index-1300`       | 81.25       |

---

## 6. Text Properties

### Font Sizes (Semantic Scale)

| Old (`bal-*`)              | New (`ds-*`)            | Primitive           | Value    |
| -------------------------- | ----------------------- | ------------------- | -------- |
| `--bal-text-size-x-small`  | `--ds-text-size-xs-*`   | `--ds-font-size-12` | 0.75rem  |
| `--bal-text-size-small`    | `--ds-text-size-sm-*`   | `--ds-font-size-14` | 0.875rem |
| `--bal-text-size-normal`   | `--ds-text-size-base-*` | `--ds-font-size-16` | 1rem     |
| `--bal-text-size-medium`   | `--ds-text-size-md-*`   | `--ds-font-size-18` | 1.125rem |
| `--bal-text-size-large`    | `--ds-text-size-lg-*`   | `--ds-font-size-18` | 1.125rem |
| `--bal-text-size-x-large`  | `--ds-text-size-xl-*`   | `--ds-font-size-20` | 1.25rem  |
| `--bal-text-size-xx-large` | `--ds-text-size-2xl-*`  | `--ds-font-size-24` | 1.5rem   |

_Note: Append `-mobile`, `-tablet`, or `-desktop` for responsive variants._

### Font Family

| Old (`bal-*`)             | New (`ds-*`)               | Primitive                  | Value                                          |
| ------------------------- | -------------------------- | -------------------------- | ---------------------------------------------- |
| `--bal-font-family-text`  | `--ds-text-family-body`    | `--ds-font-family-body`    | "BaloiseCreateText", "Arial", "sans-serif"     |
| `--bal-font-family-title` | `--ds-text-family-heading` | `--ds-font-family-heading` | "BaloiseCreateHeadline", "Arial", "sans-serif" |

### Line Height

| Old (`bal-*`)                  | New (`ds-*`)                    | Primitive                 | Value |
| ------------------------------ | ------------------------------- | ------------------------- | ----- |
| `--bal-text-line-height-text`  | `--ds-text-line-height-body`    | `--ds-font-line-height-3` | 1.5   |
| `--bal-text-line-height-title` | `--ds-text-line-height-heading` | `--ds-font-line-height-2` | 1.3   |

---

## Component-Level Token Usage

Component tokens should follow this pattern:

```scss
// Old pattern
:root
  --bal-button-color-primary: var(--bal-color-primary)
  --bal-button-radius: var(--bal-radius-base)

// New pattern
:root
  --ds-button-color-primary-base-background: var(--ds-background-color-primary)
  --ds-button-radius-base: var(--ds-radius-base)
```

### Example: Button Component

| Category             | Old                                                         | New                                                                             |
| -------------------- | ----------------------------------------------------------- | ------------------------------------------------------------------------------- |
| Background (primary) | `--bal-button-background-primary: var(--bal-color-primary)` | `--ds-button-color-primary-base-background: var(--ds-background-color-primary)` |
| Text Color (primary) | `--bal-button-text-primary: var(--bal-text-color-white)`    | `--ds-button-color-primary-base-text: var(--ds-text-color-white)`               |
| Border Color         | `--bal-button-border-primary: var(--bal-color-primary)`     | `--ds-button-color-primary-base-border: var(--ds-border-color-primary)`         |
| Radius               | `--bal-button-radius: var(--bal-radius-base)`               | `--ds-button-radius-base: var(--ds-radius-base)`                                |
| Font Weight          | `--bal-button-font-weight: var(--bal-font-weight-bold)`     | `--ds-button-weight: var(--ds-text-weight-bold)`                                |

---

## Migration Strategy

1. **Direct 1:1 Replacements**: Use the semantic `--ds-*` tokens where clear mappings exist
2. **Component Tokens**: Wrap semantic tokens in component-specific variables (e.g., `--ds-<component>-<property>`)
3. **Primitives**: Use primitives only when no semantic token fits
4. **Responsive Variants**: Append `-mobile`, `-tablet`, `-desktop` to text/space tokens for responsive designs

### CSS Variable Cascade (New Pattern)

```scss
// Private variable (used in CSS rules)
--_button-color-text

// Public override variable
--button-color-text

// Modifier variable (set by .is-primary, .is-sm, etc.)
--mod-button-color-text

// Design token default (from Base.tokens.json)
--ds-button-color-primary-base-text
```

---

## Reference Files

- **Token Definition**: `packages/tokens/tokens/Base.tokens.json`
- **Compiled CSS**: `packages/tokens/dist/css/base.tokens.css`
- **Migration Guide**: `docs/token-migration-report.md`
- **Design System Docs**: `.claude/skills/design-tokens/SKILL.md`
