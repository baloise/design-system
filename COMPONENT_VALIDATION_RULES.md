# Component Property Validation Rules

This document maps all components with their properties that have constrained enum types and the validators that should be applied via the `@Validate()` decorator pattern.

---

## Alert Container

**Path**: `packages/core/src/components/alert/alert-container.tsx`

| Property    | Type                 | Possible Values                                                  | Validator                                                                       |
| ----------- | -------------------- | ---------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| `type`      | `AlertType`          | `'toast'`, `'snackbar'`                                          | `checkEmptyOrOneOf('', 'toast', 'snackbar')`                                    |
| `container` | `AlertContainerSize` | `'fluid'`, `'detail-page'`, `'compact'`, `'blog-page'`, `'wide'` | `checkEmptyOrOneOf('', 'fluid', 'detail-page', 'compact', 'blog-page', 'wide')` |

---

## Snackbar

**Path**: `packages/core/src/components/alert/snackbar/snackbar.tsx`

| Property       | Type               | Possible Values                                          | Validator                                                               |
| -------------- | ------------------ | -------------------------------------------------------- | ----------------------------------------------------------------------- |
| `color`        | `DS.SnackbarColor` | `'base'`, `'info'`, `'success'`, `'warning'`, `'danger'` | `checkEmptyOrOneOf('', 'base', 'info', 'success', 'warning', 'danger')` |
| `actionTarget` | `DS.ButtonTarget`  | `'_blank'`, `'_parent'`, `'_self'`, `'_top'`             | `checkEmptyOrOneOf('', '_blank', '_parent', '_self', '_top')`           |

---

## Toast

**Path**: `packages/core/src/components/alert/toast/toast.tsx`

| Property       | Type              | Possible Values                                          | Validator                                                               |
| -------------- | ----------------- | -------------------------------------------------------- | ----------------------------------------------------------------------- |
| `color`        | `DS.ToastColor`   | `'base'`, `'info'`, `'success'`, `'warning'`, `'danger'` | `checkEmptyOrOneOf('', 'base', 'info', 'success', 'warning', 'danger')` |
| `actionTarget` | `DS.ButtonTarget` | `'_blank'`, `'_parent'`, `'_self'`, `'_top'`             | `checkEmptyOrOneOf('', '_blank', '_parent', '_self', '_top')`           |

---

## Badge

**Path**: `packages/core/src/components/badge/badge.tsx`

| Property   | Type               | Possible Values                                                                                  | Validator                                                                                           |
| ---------- | ------------------ | ------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------- |
| `size`     | `DS.BadgeSize`     | `'small'`, `'large'`, `''`                                                                       | `checkEmptyOrOneOf('', 'small', 'large')`                                                           |
| `color`    | `DS.BadgeColor`    | `'grey'`, `'danger'`, `'warning'`, `'success'`, `'red'`, `'yellow'`, `'green'`, `'purple'`, `''` | `checkEmptyOrOneOf('', 'grey', 'danger', 'warning', 'success', 'red', 'yellow', 'green', 'purple')` |
| `position` | `DS.BadgePosition` | `'card'`, `'button'`, `'tabs'`, `''`                                                             | `checkEmptyOrOneOf('', 'card', 'button', 'tabs')`                                                   |

---

## Button

**Path**: `packages/core/src/components/button/button.tsx`

| Property      | Type                   | Possible Values                                                                                                                                                                     | Validator                                                                                                                                                                        |
| ------------- | ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `color`       | `DS.ButtonColor`       | `'primary'`, `'secondary'`, `'tertiary'`, `'tertiary-purple'`, `'tertiary-red'`, `'tertiary-yellow'`, `'tertiary-green'`, `'link'`, `'light'`, `'success'`, `'warning'`, `'danger'` | `checkEmptyOrOneOf('primary', 'secondary', 'tertiary', 'tertiary-purple', 'tertiary-red', 'tertiary-yellow', 'tertiary-green', 'link', 'light', 'success', 'warning', 'danger')` |
| `elementType` | `DS.ButtonElementType` | `'button'`, `'reset'`, `'submit'`                                                                                                                                                   | `checkEmptyOrOneOf('button', 'reset', 'submit')`                                                                                                                                 |
| `target`      | `DS.ButtonTarget`      | `'_blank'`, `'_parent'`, `'_self'`, `'_top'`                                                                                                                                        | `checkEmptyOrOneOf('_self', '_blank', '_parent', '_top')`                                                                                                                        |
| `loading`     | `DS.ButtonSpinner`     | `'logo'`, `'circle'`, `true`, `false`, `undefined`, `''`                                                                                                                            | `checkEmptyOrType('boolean')`                                                                                                                                                    |
| `size`        | `DS.ButtonSize`        | `'sm'`, `'lg'`, `'xl'`, `''`                                                                                                                                                        | `checkEmptyOrOneOf('', 'sm', 'lg', 'xl')`                                                                                                                                        |

---

## Button Group

**Path**: `packages/core/src/components/button/button-group/button-group.tsx`

| Property    | Type                      | Possible Values                 | Validator                                          |
| ----------- | ------------------------- | ------------------------------- | -------------------------------------------------- |
| `align`     | `DS.ButtonGroupAlignment` | `'right'`, `'center'`, `'left'` | `checkEmptyOrOneOf('', 'right', 'center', 'left')` |
| `direction` | `DS.ButtonGroupDirection` | `'auto'`, `'row'`, `'column'`   | `checkEmptyOrOneOf('auto', 'row', 'column')`       |

---

## Card

**Path**: `packages/core/src/components/card/card.tsx`

| Property      | Type                                                 | Possible Values                                                                                                                                                                                                                                                                                                                                                                              | Validator                                                                                                                                                                                                                                                                                                                                             |
| ------------- | ---------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `align`       | `DS.CardAlignment`                                   | `'right'`, `'center'`, `'left'`                                                                                                                                                                                                                                                                                                                                                              | `checkEmptyOrOneOf('', 'right', 'center', 'left')`                                                                                                                                                                                                                                                                                                    |
| `space`       | `DS.CardSpace`                                       | `'sm'`, `'md'`, `'lg'`, `''`                                                                                                                                                                                                                                                                                                                                                                 | `checkEmptyOrOneOf('', 'sm', 'md', 'lg')`                                                                                                                                                                                                                                                                                                             |
| `color`       | `DS.CardColor`                                       | `'white'`, `'primary'`, `'info'`, `'success'`, `'warning'`, `'danger'`, `'grey'`, `'blue'`, `'red'`, `'yellow'`, `'purple'`, `'green'`, `'red-light'`, `'yellow-light'`, `'purple-light'`, `'green-light'`, `'grey-light'`, `'purple-1'`, `'purple-2'`, `'purple-3'`, `'green-1'`, `'green-2'`, `'green-3'`, `'red-1'`, `'red-2'`, `'red-3'`, `'yellow-1'`, `'yellow-2'`, `'yellow-3'`, `''` | `checkEmptyOrOneOf('', 'white', 'primary', 'info', 'success', 'warning', 'danger', 'grey', 'blue', 'red', 'yellow', 'purple', 'green', 'red-light', 'yellow-light', 'purple-light', 'green-light', 'grey-light', 'purple-1', 'purple-2', 'purple-3', 'green-1', 'green-2', 'green-3', 'red-1', 'red-2', 'red-3', 'yellow-1', 'yellow-2', 'yellow-3')` |
| `imageTeaser` | `'' \| 'wide-left' \| 'wide-center' \| 'wide-right'` | `'wide-left'`, `'wide-center'`, `'wide-right'`, `''`                                                                                                                                                                                                                                                                                                                                         | `checkEmptyOrOneOf('', 'wide-left', 'wide-center', 'wide-right')`                                                                                                                                                                                                                                                                                     |

---

## Card Actions

**Path**: `packages/core/src/components/card/card-actions/card-actions.tsx`

| Property | Type                      | Possible Values                 | Validator                                          |
| -------- | ------------------------- | ------------------------------- | -------------------------------------------------- |
| `align`  | `DS.CardActionsAlignment` | `'right'`, `'center'`, `'left'` | `checkEmptyOrOneOf('', 'right', 'center', 'left')` |

---

## Card Content

**Path**: `packages/core/src/components/card/card-content/card-content.tsx`

| Property                    | Type | Possible Values | Validator |
| --------------------------- | ---- | --------------- | --------- |
| _No constrained properties_ | -    | -               | -         |

---

## Card Subtitle

**Path**: `packages/core/src/components/card/card-subtitle/card-subtitle.tsx`

| Property | Type              | Possible Values                                                                        | Validator                                                                                   |
| -------- | ----------------- | -------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| `color`  | `DS.HeadingColor` | `'primary'`, `'info'`, `'success'`, `'warning'`, `'danger'`, `'blue'`, `'white'`, `''` | `checkEmptyOrOneOf('', 'primary', 'info', 'success', 'warning', 'danger', 'blue', 'white')` |

---

## Checkbox

**Path**: `packages/core/src/components/checkbox/checkbox.tsx`

| Property        | Type                       | Possible Values                                  | Validator                                                   |
| --------------- | -------------------------- | ------------------------------------------------ | ----------------------------------------------------------- |
| `labelPosition` | `DS.CheckboxLabelPosition` | `'left'`, `'top'`, `'right'`                     | `checkEmptyOrOneOf('right', 'left', 'top')`                 |
| `tileColor`     | `DS.CheckboxTileColor`     | `''`, `'purple'`, `'green'`, `'yellow'`, `'red'` | `checkEmptyOrOneOf('', 'purple', 'green', 'yellow', 'red')` |
| `cols`          | `DS.CheckboxGroupColumns`  | `1`, `2`, `3`, `4`                               | `checkEmptyOrOneOf(1, 2, 3, 4)`                             |
| `colsTablet`    | `DS.CheckboxGroupColumns`  | `1`, `2`, `3`, `4`                               | `checkEmptyOrOneOf(1, 2, 3, 4)`                             |
| `colsMobile`    | `DS.CheckboxGroupColumns`  | `1`, `2`, `3`, `4`                               | `checkEmptyOrOneOf(1, 2, 3, 4)`                             |

---

## Checkbox Group

**Path**: `packages/core/src/components/checkbox/checkbox-group/checkbox-group.tsx`

| Property        | Type                       | Possible Values              | Validator                                   |
| --------------- | -------------------------- | ---------------------------- | ------------------------------------------- |
| `labelPosition` | `DS.CheckboxLabelPosition` | `'left'`, `'top'`, `'right'` | `checkEmptyOrOneOf('right', 'left', 'top')` |

---

## Close

**Path**: `packages/core/src/components/close/close.tsx`

| Property      | Type             | Possible Values                       | Validator                                              |
| ------------- | ---------------- | ------------------------------------- | ------------------------------------------------------ |
| `size`        | `DS.CloseSize`   | `'sm'`, `'md'`, `'small'`, `'medium'` | `checkEmptyOrOneOf('', 'sm', 'md', 'small', 'medium')` |
| `buttonColor` | `DS.ButtonColor` | (inherited from button)               | `checkEmptyOrOneOf('primary', 'secondary', ...)`       |

---

## Content

**Path**: `packages/core/src/components/content/content.tsx`

| Property    | Type                      | Possible Values                                          | Validator                                                                 |
| ----------- | ------------------------- | -------------------------------------------------------- | ------------------------------------------------------------------------- |
| `align`     | `DS.ContentAlignment`     | `'start'`, `'center'`, `'end'`                           | `checkEmptyOrOneOf('', 'start', 'center', 'end')`                         |
| `textAlign` | `DS.ContentTextAlignment` | `'left'`, `'center'`, `'right'`                          | `checkEmptyOrOneOf('', 'left', 'center', 'right')`                        |
| `space`     | `DS.ContentSpace`         | `'none'`, `'3xs'`, `'2xs'`, `'xs'`, `'sm'`, `'base'`     | `checkEmptyOrOneOf('', 'none', '3xs', '2xs', 'xs', 'sm', 'base')`         |
| `direction` | `DS.StackDirection`       | `'column'`, `'row'`, `'column-reverse'`, `'row-reverse'` | `checkEmptyOrOneOf('', 'column', 'row', 'column-reverse', 'row-reverse')` |

---

## Divider

**Path**: `packages/core/src/components/divider/divider.tsx`

| Property | Type               | Possible Values                                                                                                                                                                                | Validator                                                                                                                                                                                     |
| -------- | ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `layout` | `DS.DividerLayout` | `'horizontal'`, `'vertical'`, `''`                                                                                                                                                             | `checkEmptyOrOneOf('', 'horizontal', 'vertical')`                                                                                                                                             |
| `space`  | `DS.DividerSpace`  | `'none'`, `'2xs'`, `'xs'`, `'sm'`, `'base'`, `'md'`, `'lg'`, `'xl'`, `'2xl'`, `'3xl'`                                                                                                          | `checkEmptyOrOneOf('', 'none', '2xs', 'xs', 'sm', 'base', 'md', 'lg', 'xl', '2xl', '3xl')`                                                                                                    |
| `color`  | `DS.DividerColor`  | `'primary'`, `'primary-light'`, `'primary-dark'`, `'grey-light'`, `'grey'`, `'grey-dark'`, `'warning'`, `'success'`, `'danger'`, `'danger-dark'`, `'danger-darker'`, `'white'`, `'light-blue'` | `checkEmptyOrOneOf('', 'primary', 'primary-light', 'primary-dark', 'grey-light', 'grey', 'grey-dark', 'warning', 'success', 'danger', 'danger-dark', 'danger-darker', 'white', 'light-blue')` |

---

## Heading

**Path**: `packages/core/src/components/heading/heading.tsx`

| Property      | Type                                   | Possible Values                                                                                                                                           | Validator                                                                                                                                    |
| ------------- | -------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `level`       | `DS.HeadingLevel`                      | `'display'`, `'display-2'`, `'h1'`, `'h2'`, `'h3'`, `'h4'`, `'h5'`, `'span'`, `'p'`, `'5xl'`, `'4xl'`, `'3xl'`, `'2xl'`, `'xl'`, `'lg'`, `'md'`, `'base'` | `checkEmptyOrOneOf('h1', 'display', 'display-2', 'h2', 'h3', 'h4', 'h5', '5xl', '4xl', '3xl', '2xl', 'xl', 'lg', 'md', 'base', 'span', 'p')` |
| `visualLevel` | `DS.HeadingVisualLevel`                | (same as level types)                                                                                                                                     | `checkEmptyOrOneOf('display', 'display-2', 'h1', 'h2', 'h3', 'h4', 'h5', '5xl', '4xl', '3xl', '2xl', 'xl', 'lg', 'md', 'base')`              |
| `autoLevel`   | `DS.HeadingVisualLevel`                | (same as visualLevel)                                                                                                                                     | `checkEmptyOrOneOf('display', 'display-2', 'h1', 'h2', 'h3', 'h4', 'h5', '5xl', '4xl', '3xl', '2xl', 'xl', 'lg', 'md', 'base')`              |
| `space`       | `'none' \| 'bottom' \| 'top' \| 'all'` | `'none'`, `'bottom'`, `'top'`, `'all'`                                                                                                                    | `checkEmptyOrOneOf('', 'none', 'bottom', 'top', 'all')`                                                                                      |
| `color`       | `DS.HeadingColor`                      | `'primary'`, `'info'`, `'success'`, `'warning'`, `'danger'`, `'blue'`, `'white'`, `''`                                                                    | `checkEmptyOrOneOf('', 'primary', 'info', 'success', 'warning', 'danger', 'blue', 'white')`                                                  |

---

## Icon

**Path**: `packages/core/src/components/icon/icon.tsx`

| Property    | Type               | Possible Values                                                                                                                                                                                                                                                                            | Validator                                                                                                                                                                                                                                                                 |
| ----------- | ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `size`      | `DS.IconSize`      | `'xs'`, `'sm'`, `'md'`, `'lg'`, `'xl'`, `'2xl'`, `'xsmall'`, `'x-small'`, `'small'`, `'medium'`, `'large'`, `'x-large'`, `'xx-large'`, `''`                                                                                                                                                | `checkEmptyOrOneOf('', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', 'xsmall', 'x-small', 'small', 'medium', 'large', 'x-large', 'xx-large')`                                                                                                                                      |
| `color`     | `DS.IconColor`     | `'blue'`, `'light-blue'`, `'success'`, `'success-dark'`, `'success-darker'`, `'danger'`, `'danger-dark'`, `'danger-darker'`, `'warning'`, `'warning-dark'`, `'warning-darker'`, `'white'`, `'grey'`, `'grey-light'`, `'grey-dark'`, `'primary'`, `'primary-light'`, `'primary-dark'`, `''` | `checkEmptyOrOneOf('', 'blue', 'light-blue', 'success', 'success-dark', 'success-darker', 'danger', 'danger-dark', 'danger-darker', 'warning', 'warning-dark', 'warning-darker', 'white', 'grey', 'grey-light', 'grey-dark', 'primary', 'primary-light', 'primary-dark')` |
| `shape`     | `DS.IconShape`     | `'triangle'`, `'circle'`                                                                                                                                                                                                                                                                   | `checkEmptyOrOneOf('', 'triangle', 'circle')`                                                                                                                                                                                                                             |
| `tileColor` | `DS.IconTileColor` | `'purple'`, `'red'`, `'yellow'`, `'green'`                                                                                                                                                                                                                                                 | `checkEmptyOrOneOf('purple', 'red', 'yellow', 'green')`                                                                                                                                                                                                                   |

---

## Input

**Path**: `packages/core/src/components/input/input.tsx`

| Property       | Type                   | Possible Values                                                                                                                                                                     | Validator                                                                                                                                                                |
| -------------- | ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `color`        | `DS.InputColor`        | `'primary'`, `'danger'`, `'success'`, `'warning'`                                                                                                                                   | `checkEmptyOrOneOf('primary', 'danger', 'success', 'warning')`                                                                                                           |
| `autocorrect`  | `DS.InputAutocorrect`  | `'on'`, `'off'`                                                                                                                                                                     | `checkEmptyOrOneOf('on', 'off')`                                                                                                                                         |
| `autocomplete` | `DS.InputAutocomplete` | (50+ standard HTML autocomplete values)                                                                                                                                             | `checkOneOf([...extensive list...])`                                                                                                                                     |
| `type`         | `DS.InputInputType`    | `'color'`, `'date'`, `'datetime-local'`, `'email'`, `'file'`, `'image'`, `'month'`, `'number'`, `'password'`, `'range'`, `'search'`, `'tel'`, `'text'`, `'time'`, `'url'`, `'week'` | `checkEmptyOrOneOf('text', 'color', 'date', 'datetime-local', 'email', 'file', 'image', 'month', 'number', 'password', 'range', 'search', 'tel', 'time', 'url', 'week')` |
| `mask`         | `DS.InputMask`         | `'vehicle-registration-number'`, `'contract-number'`, `'basic-contract-number'`, `'claim-number'`, `'offer-number'`, `'be-enterprise-number'`, `'be-iban'`                          | `checkEmptyOrOneOf('', 'vehicle-registration-number', 'contract-number', 'basic-contract-number', 'claim-number', 'offer-number', 'be-enterprise-number', 'be-iban')`    |
| `inputMode`    | `DS.InputInputMode`    | `'none'`, `'text'`, `'tel'`, `'url'`, `'email'`, `'numeric'`, `'decimal'`, `'search'`                                                                                               | `checkEmptyOrOneOf('', 'none', 'text', 'tel', 'url', 'email', 'numeric', 'decimal', 'search')`                                                                           |

---

## Summary Statistics

| Metric                           | Count                      |
| -------------------------------- | -------------------------- |
| **Total Components**             | 18                         |
| **Components with Validations**  | 17                         |
| **Total Validatable Properties** | 54                         |
| **Average Props per Component**  | 3.2                        |
| **Component with Most Props**    | `input.tsx` (6 properties) |
| **Components with No Props**     | `card-content.tsx`         |

---

## Usage Example

```typescript
import {
  checkEmptyOrOneOf,
  checkEmptyOrType,
  checkOneOf,
} from '@utils/property-checkers'
import { Validate } from '@utils/validate.decorator'
import { setupValidation } from '@utils'

@Component({...})
export class MyComponent implements ComponentInterface {
  @Prop()
  @Validate(checkEmptyOrOneOf(['option1', 'option2']))
  readonly myProp: string = ''

  connectedCallback(): void {
    setupValidation(this)
  }

  componentWillUpdate(): void {
    setupValidation(this)
  }
}
```

---

**Generated**: 2026-04-29  
**Format**: Markdown  
**Purpose**: Guide for implementing decorator-based property validation refactoring
