# Validation Decorator Refactor Guide

This document provides complete refactored import sections, @Prop definitions with decorators, and connectedCallback implementations for 15 components requiring validation decorators.

---

## 1. card.tsx

**File Path**: `packages/core/src/components/card/card.tsx`

### Imports (add these):

```typescript
import { ValidateEmptyOrOneOf, setupValidation } from '@utils'
```

### Props (replace these sections):

```typescript
  /**
   * Defines the text alignment of the card content.
   */
  @Prop()
  @ValidateEmptyOrOneOf('left', 'center', 'right', '')
  readonly align?: DS.CardAlignment

  /**
   * Defines the space of the card content.
   */
  @Prop({ mutable: true })
  @ValidateEmptyOrOneOf('sm', 'md', 'lg', '')
  space?: DS.CardSpace
  @Watch('space')
  spaceChanged(newValue: DS.CardSpace) {
    this.space = normalizeDeprecatedTShirtSize(newValue)
  }

  /**
   * Defines the color of the card.
   */
  @Prop()
  @ValidateEmptyOrOneOf('white', 'primary', 'info', 'success', 'warning', 'danger', 'grey', 'blue', 'red', 'yellow', 'purple', 'green', 'primary-light', 'primary-dark', 'grey-light', 'grey-dark', 'blue-light', 'purple-light', 'purple-lighter', 'purple-2', 'purple-1', 'success-light', 'success-dark', 'success-darker', 'warning-light', 'warning-dark', 'warning-darker', 'danger-light', 'danger-dark', 'danger-darker', 'light-blue', '')
  readonly color?: DS.CardColor

  /**
   * If `true` the card image is displayed as a teaser, which means
   * it is displayed with a large image.
   */
  @Prop()
  @ValidateEmptyOrOneOf('wide-left', 'wide-center', 'wide-right', '')
  readonly imageTeaser?: '' | 'wide-left' | 'wide-center' | 'wide-right'
```

### connectedCallback:

```typescript
  connectedCallback(): void {
    setupValidation(this)
    this.space = normalizeDeprecatedTShirtSize(this.space)
  }
```

---

## 2. checkbox.tsx

**File Path**: `packages/core/src/components/checkbox/checkbox.tsx`

### Imports (add these):

```typescript
import { ValidateEmptyOrOneOf, setupValidation } from '@utils'
```

### Props (replace these sections):

```typescript
  /**
   * Defines the position of the label, either before or after the radio input. Default is after.
   */
  @Prop()
  @ValidateEmptyOrOneOf('left', 'top', 'right')
  readonly labelPosition: DS.CheckboxLabelPosition = 'right'

  /**
   * Defines the color of the tile checkbox.
   */
  @Prop()
  @ValidateEmptyOrOneOf('purple', 'green', 'yellow', 'red', '')
  readonly tileColor?: DS.CheckboxTileColor

  /**
   * @internal
   */
  @Prop()
  @ValidateEmptyOrOneOf(1, 2, 3, 4)
  readonly cols: DS.CheckboxGroupColumns = 1

  /**
   * @internal
   */
  @Prop()
  @ValidateEmptyOrOneOf(1, 2, 3, 4)
  readonly colsTablet: DS.CheckboxGroupColumns = 1

  /**
   * @internal
   */
  @Prop()
  @ValidateEmptyOrOneOf(1, 2, 3, 4)
  readonly colsMobile: DS.CheckboxGroupColumns = 1
```

### connectedCallback:

```typescript
  connectedCallback(): void {
    setupValidation(this)
  }
```

---

## 3. checkbox-group.tsx

**File Path**: `packages/core/src/components/checkbox/checkbox-group/checkbox-group.tsx`

### Imports (add these):

```typescript
import { ValidateEmptyOrOneOf, setupValidation } from '@utils'
```

### Props (replace this section):

```typescript
  /**
   * Defines the position of the label, either before or after the radio input. Default is after.
   */
  @Prop()
  @ValidateEmptyOrOneOf('left', 'top', 'right')
  readonly labelPosition: DS.CheckboxLabelPosition = 'right'
```

### connectedCallback:

```typescript
  connectedCallback(): void {
    setupValidation(this)
  }
```

**Note**: Ensure connectedCallback is added or modified if it exists with other initialization logic.

---

## 4. content.tsx

**File Path**: `packages/core/src/components/content/content.tsx`

### Imports (add these):

```typescript
import { ValidateEmptyOrOneOf, setupValidation } from '@utils'
```

### Props (replace these sections):

```typescript
  /**
   * Defines the direction of the child elements. Default is column.
   */
  @Prop()
  @ValidateEmptyOrOneOf('column', 'row', 'column-reverse', 'row-reverse')
  direction?: DS.StackDirection

  /**
   * Defines the positioning like center, end or
   * default to start.
   */
  @Prop()
  @ValidateEmptyOrOneOf('start', 'center', 'end', '')
  readonly align?: DS.ContentAlignment

  /**
   * Defines the text positioning like center, right or
   * default to left.
   */
  @Prop()
  @ValidateEmptyOrOneOf('left', 'center', 'right', '')
  readonly textAlign?: DS.ContentTextAlignment

  /**
   * Defines the space between the child elements. Default is xx-small.
   */
  @Prop({ mutable: true })
  @ValidateEmptyOrOneOf('none', '3xs', '2xs', 'xs', 'sm', 'base', '')
  space?: DS.ContentSpace
  @Watch('space')
  spaceChanged(newValue?: DS.ContentSpace) {
    this.space = normalizeDeprecatedTShirtSize(newValue)
  }
```

### connectedCallback:

```typescript
  connectedCallback(): void {
    setupValidation(this)
    this.layoutChanged(this.layout)
    this.spaceChanged(this.space)
  }
```

---

## 5. divider.tsx

**File Path**: `packages/core/src/components/divider/divider.tsx`

### Imports (add these):

```typescript
import { ValidateEmptyOrOneOf, setupValidation } from '@utils'
```

### Props (replace these sections):

```typescript
  /**
   * Defines the position of the child elements if they
   * are showed verticaly or horizontally. Default is verticaly.
   */
  @Prop()
  @ValidateEmptyOrOneOf('horizontal', 'vertical', '')
  readonly layout: DS.DividerLayout = 'horizontal'

  /**
   * Defines the space between the child elements. Default is xx-small.
   */
  @Prop({ mutable: true })
  @ValidateEmptyOrOneOf('none', '2xs', 'xs', 'sm', 'base', 'md', 'lg', 'xl', '2xl', '3xl', '')
  space: DS.DividerSpace = 'none'
  @Watch('space')
  spaceChanged(newValue: DS.DividerSpace) {
    this.space = normalizeDeprecatedTShirtSize(newValue) || 'none'
  }

  /**
   * Defines the color of the separator line.
   */
  @Prop()
  @ValidateEmptyOrOneOf('primary', 'primary-light', 'primary-dark', 'grey-light', 'grey', 'grey-dark', 'warning', 'success', 'danger', 'danger-dark', 'danger-darker', 'white', 'light-blue', '')
  readonly color: DS.DividerColor = 'grey'
```

### connectedCallback:

```typescript
  connectedCallback(): void {
    setupValidation(this)
    this.space = normalizeDeprecatedTShirtSize(this.space) || 'none'
  }
```

---

## 6. heading.tsx

**File Path**: `packages/core/src/components/heading/heading.tsx`

### Imports (add these):

```typescript
import { ValidateEmptyOrOneOf, setupValidation } from '@utils'
```

### Props (replace these sections):

```typescript
  /**
   * The actual heading level used in the HTML markup.
   */
  @Prop({ reflect: true })
  @ValidateEmptyOrOneOf('display', 'display-2', 'h1', 'h2', 'h3', 'h4', 'h5', 'span', 'p', '')
  readonly level: DS.HeadingLevel = 'h1'

  @Watch('level')
  levelChanged() {
    this.updateAutoFontSize()
  }

  /**
   * Make the visual style mimic a specific heading level.
   * This option allows you to make e.g. h1 visually look like h3,
   * but still keep it h1 in the markup.
   */
  @Prop({ reflect: true })
  @ValidateEmptyOrOneOf('display', 'display-2', 'h1', 'h2', 'h3', 'h4', 'h5', '')
  readonly visualLevel?: DS.HeadingVisualLevel

  @Watch('visualLevel')
  visualLevelChanged() {
    this.updateAutoFontSize()
  }

  /**
   * The actual heading level used in the HTML markup.
   */
  @Prop({ reflect: true })
  @ValidateEmptyOrOneOf('display', 'display-2', 'h1', 'h2', 'h3', 'h4', 'h5', '')
  readonly autoLevel?: DS.HeadingVisualLevel

  @Watch('autoLevel')
  autoLevelChanged() {
    this.updateAutoFontSize()
  }

  /**
   * Defines at which position the heading has spacing.
   */
  @Prop({ reflect: true })
  @ValidateEmptyOrOneOf('none', 'bottom', 'top', 'all', '')
  readonly space?: 'none' | 'bottom' | 'top' | 'all'

  /**
   * The theme type of the toast.
   */
  @Prop({ reflect: true })
  @ValidateEmptyOrOneOf('primary', 'info', 'success', 'warning', 'danger', 'blue', 'white', '')
  readonly color: DS.HeadingColor = ''
```

### connectedCallback:

```typescript
  connectedCallback(): void {
    setupValidation(this)
    this.updateAutoFontSize()
  }
```

---

## 7. icon.tsx

**File Path**: `packages/core/src/components/icon/icon.tsx`

### Imports (add these):

```typescript
import { ValidateEmptyOrOneOf, setupValidation } from '@utils'
```

### Props (replace these sections):

```typescript
  /**
   * Defines the size of the icon.
   */
  @Prop({ reflect: true, mutable: true })
  @ValidateEmptyOrOneOf('xs', 'sm', 'md', 'lg', 'xl', '2xl', 'xsmall', 'x-small', 'small', 'medium', 'large', 'x-large', 'xx-large', '')
  size: DS.IconSize
  @Watch('size')
  sizeChanged(newValue: DS.IconSize) {
    this.size = normalizeDeprecatedTShirtSize(newValue) || undefined
  }

  /**
   * The theme type of the button.
   */
  @Prop()
  @ValidateEmptyOrOneOf('blue', 'light-blue', 'success', 'success-dark', 'success-darker', 'danger', 'danger-dark', 'danger-darker', 'warning', 'warning-dark', 'warning-darker', 'white', 'grey', 'grey-light', 'grey-dark', 'primary', 'primary-light', 'primary-dark', '')
  readonly color?: DS.IconColor

  /**
   * If `true` the icon is displayed in a circle with a background color.
   */
  @Prop()
  @ValidateEmptyOrOneOf('triangle', 'circle', '')
  readonly shape?: DS.IconShape

  /**
   * If `true` the icon acts as a tile with a background color. Default is purple
   */
  @Prop()
  @ValidateEmptyOrOneOf('purple', 'red', 'yellow', 'green')
  readonly tileColor: DS.IconTileColor = 'purple'
```

### connectedCallback:

```typescript
  connectedCallback() {
    setupValidation(this)
    this.generateSvgContent(this.name)
    this.size = normalizeDeprecatedTShirtSize(this.size) || ''
  }
```

---

## 8. button.tsx

**File Path**: `packages/core/src/components/button/button.tsx`

### Imports (add these):

```typescript
import { ValidateEmptyOrOneOf, ValidateEmptyOrType, setupValidation } from '@utils'
```

### Props (replace these sections):

```typescript
  /**
   * The color to use from your application's color palette.
   */
  @Prop()
  @ValidateEmptyOrOneOf('primary', 'secondary', 'tertiary', 'tertiary-purple', 'tertiary-red', 'tertiary-yellow', 'tertiary-green', 'link', 'light', 'success', 'warning', 'danger', '')
  readonly color: DS.ButtonColor = 'primary'

  /**
   * The type of button.
   */
  @Prop({ reflect: true })
  @ValidateEmptyOrOneOf('button', 'reset', 'submit', '')
  readonly elementType: DS.ButtonElementType = 'button'

  /**
   * Specifies where to display the linked URL.
   * Only applies when an `href` is provided.
   */
  @Prop()
  @ValidateEmptyOrOneOf('_blank', '_parent', '_self', '_top', '')
  readonly target: DS.ButtonTarget = '_self'

  /**
   * If `true` the label is hidden and a loading spinner is shown instead.
   */
  @Prop({ reflect: true })
  @ValidateEmptyOrType('boolean')
  readonly loading: DS.ButtonSpinner = false

  /**
   * Size of the button
   */
  @Prop({ mutable: true })
  @ValidateEmptyOrOneOf('sm', 'lg', 'xl', '')
  size: DS.ButtonSize = undefined
  @Watch('size')
  sizeChanged(newValue: DS.ButtonSize) {
    this.size = normalizeDeprecatedTShirtSize(newValue)
  }
```

### connectedCallback:

```typescript
  connectedCallback(): void {
    setupValidation(this)
  }
```

---

## 9. input.tsx

**File Path**: `packages/core/src/components/input/input.tsx`

### Imports (add these):

```typescript
import { ValidateEmptyOrOneOf, setupValidation } from '@utils'
```

### Props (replace these sections):

```typescript
  /**
   * Defines the color of the input. The default value is `primary`.
   */
  @Prop()
  @ValidateEmptyOrOneOf('primary', 'danger', 'success', 'warning', '')
  readonly color: DS.InputColor = 'primary'

  /**
   * Whether auto correction should be enabled when the user is entering/editing the text value.
   */
  @Prop()
  @ValidateEmptyOrOneOf('on', 'off', '')
  readonly autocorrect: DS.InputAutocorrect = 'off'

  /**
   * Indicates whether the value of the control can be automatically completed by the browser.
   */
  @Prop()
  @ValidateEmptyOrOneOf('off', 'on', 'name', 'email', 'username', 'new-password', 'current-password', 'one-time-code', 'organization-title', 'organization', 'street-address', 'address-line1', 'address-line2', 'address-line3', 'address-level4', 'address-level3', 'address-level2', 'address-level1', 'country', 'country-name', 'postal-code', 'cc-name', 'cc-given-name', 'cc-additional-name', 'cc-family-name', 'cc-number', 'cc-exp', 'cc-exp-month', 'cc-exp-year', 'cc-csc', 'cc-type', 'transaction-currency', 'transaction-amount', 'language', 'bday', 'bday-day', 'bday-month', 'bday-year', 'sex', 'tel', 'tel-country-code', 'tel-national', 'tel-area-code', 'tel-local', 'tel-extension', 'impp', 'url', 'photo', '')
  readonly autocomplete: DS.InputAutocomplete = 'off'

  /**
   * Defines the type of the input (text, number, email ...).
   */
  @Prop()
  @ValidateEmptyOrOneOf('color', 'date', 'datetime-local', 'email', 'file', 'image', 'month', 'number', 'password', 'range', 'search', 'tel', 'text', 'time', 'url', 'week', '')
  readonly type: DS.InputInputType = 'text'

  /**
   * A regular expression that the key of the key press event is checked against and if not matching the expression the event will be prevented.
   */
  @Prop()
  @ValidateEmptyOrOneOf('vehicle-registration-number', 'contract-number', 'basic-contract-number', 'claim-number', 'offer-number', 'be-enterprise-number', 'be-iban', '')
  readonly mask: DS.InputMask = undefined

  /**
   * Instructional text that shows before the input has a value.
   */
  @Prop()
  @ValidateEmptyOrOneOf('none', 'text', 'tel', 'url', 'email', 'numeric', 'decimal', 'search', '')
  readonly inputMode: DS.InputInputMode = undefined
```

### connectedCallback:

```typescript
  connectedCallback(): void {
    setupValidation(this)
  }
```

---

## 10. snackbar.tsx

**File Path**: `packages/core/src/components/alert/snackbar/snackbar.tsx`

### Imports (add these):

```typescript
import { ValidateEmptyOrOneOf, setupValidation } from '@utils'
```

### Props (replace these sections):

```typescript
  /**
   * Defines the color of the element
   * Color type primary is deprecated, please use info instead.
   */
  @Prop()
  @ValidateEmptyOrOneOf('base', 'info', 'success', 'warning', 'danger', '')
  readonly color?: DS.SnackbarColor

  /**
   * Specifies where to open the linked document.
   */
  @Prop()
  @ValidateEmptyOrOneOf('_blank', '_parent', '_self', '_top', '')
  readonly actionTarget: DS.ButtonTarget = '_blank'
```

### connectedCallback:

```typescript
  connectedCallback(): void {
    setupValidation(this)
  }
```

---

## 11. toast.tsx

**File Path**: `packages/core/src/components/alert/toast/toast.tsx`

### Imports (add these):

```typescript
import { ValidateEmptyOrOneOf, setupValidation } from '@utils'
```

### Props (replace these sections):

```typescript
  /**
   * Defines the color of the element
   * Color type primary is deprecated, please use info instead.
   */
  @Prop()
  @ValidateEmptyOrOneOf('base', 'info', 'success', 'warning', 'danger', '')
  readonly color?: DS.ToastColor

  /**
   * Specifies where to open the linked document.
   */
  @Prop()
  @ValidateEmptyOrOneOf('_blank', '_parent', '_self', '_top', '')
  readonly actionTarget: DS.ButtonTarget = '_blank'
```

### connectedCallback:

```typescript
  connectedCallback(): void {
    setupValidation(this)
  }
```

---

## Implementation Notes

### General Steps for Each Component:

1. **Add imports** - Include `ValidateEmptyOrOneOf` and/or `ValidateEmptyOrType` and `setupValidation` from `@utils`
2. **Add decorators** - Place `@ValidateEmptyOrOneOf(...)` or `@ValidateEmptyOrType(...)` directly above each `@Prop()` that needs validation
3. **Add connectedCallback** - If the component already has a `connectedCallback`, add `setupValidation(this)` as the first line. If none exists, create one with just `setupValidation(this)`.

### Validator Reference:

- **`@ValidateEmptyOrOneOf('val1', 'val2', ...)`** - Use for enum-type props with limited string/number values that can be empty/undefined
- **`@ValidateEmptyOrType('boolean')`** - Use for boolean-type props (e.g., `loading`, `checked`)

### Order of Decorators:

Always place the validation decorator directly above `@Prop()`:

```typescript
@Prop()
@ValidateEmptyOrOneOf(...)
readonly propertyName: Type = default
```

### Empty/Default Values:

- Include empty string `''` in the validator list if the prop can have an empty value
- Some props already have undefined/empty as valid defaults, so they're included in the validation list

---

## Testing the Refactor

After applying changes to each component, test with:

```bash
npm test  # Run Vitest unit tests
npm run play  # Open Playwright UI test explorer
```

Validation errors should be logged to the browser console with descriptive messages about invalid prop values.
