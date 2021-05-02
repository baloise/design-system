# bal-checkbox <Badge text="Two-way binding"/>

<!-- START: human documentation top -->

Checkboxes allow the selection of multiple options from a set of options. They appear as checked (ticked) when activated. Clicking on a checkbox will toggle the **checked** property. They can also be checked programmatically by setting the **checked** property.

<!-- END: human documentation top -->

## Basic

<ClientOnly>  <docs-demo-bal-checkbox-22></docs-demo-bal-checkbox-22></ClientOnly>

```html
<bal-checkbox data-test-id="checkbox-normal">Label</bal-checkbox>
<bal-checkbox checked>Checked</bal-checkbox>
<bal-checkbox disabled data-test-id="checkbox-disabled">Disabled</bal-checkbox>
```

## Switch

<ClientOnly>  <docs-demo-bal-checkbox-23></docs-demo-bal-checkbox-23></ClientOnly>

```html
<bal-checkbox interface="switch">Label</bal-checkbox>
<bal-checkbox checked interface="switch">Checked</bal-checkbox>
<bal-checkbox disabled interface="switch">Disabled</bal-checkbox>
```

## Inverted

<ClientOnly>  <docs-demo-bal-checkbox-24></docs-demo-bal-checkbox-24></ClientOnly>

```html
<div class="has-background-info has-padding">
  <bal-checkbox inverted>Label</bal-checkbox>
  <bal-checkbox inverted checked>Checked</bal-checkbox>
  <bal-checkbox inverted disabled>Disabled</bal-checkbox>
</div>
```

## With Links

<ClientOnly>  <docs-demo-bal-checkbox-25></docs-demo-bal-checkbox-25></ClientOnly>

```html
<bal-checkbox> Random text with a <a class="is-link" target="_blank" href="http://baloise.ch">Link</a> in it. </bal-checkbox>
```

## Events

### Listen on Changes

<ClientOnly>  <docs-demo-bal-checkbox-26></docs-demo-bal-checkbox-26></ClientOnly>

```html
<bal-checkbox id="cb-2">Listen on changes</bal-checkbox>
<p class="help" id="cb-2-result">false</p>
```

### Change value

<ClientOnly>  <docs-demo-bal-checkbox-27></docs-demo-bal-checkbox-27></ClientOnly>

```html
<bal-checkbox id="cb-3">Value</bal-checkbox>
<button id="cb-3-trigger-1">Set to true</button>
<button id="cb-3-trigger-2">Set to false</button>
```


## API

### bal-checkbox

#### Properties

| Attribute        | Description                                                     | Type                    | Default        |
| :--------------- | :-------------------------------------------------------------- | :---------------------- | :------------- |
| **bal-tabindex** | The tabindex of the control.                                    | `number`                | `0`            |
| **checked**      | If `true`, the checkbox is selected.                            | `boolean`               | `false`        |
| **disabled**     | If `true`, the user cannot interact with the checkbox.          | `boolean`               | `false`        |
| **interface**    | Defines the layout of the checkbox button                       | `"checkbox" , "switch"` | `'checkbox'`   |
| **inverted**     | If `true`, the control works on dark background.                | `boolean`               | `false`        |
| **name**         | The name of the control, which is submitted with the form data. | `string`                | `this.inputId` |
| **value**        | The value of the control.                                       | `string`                | `'on'`         |

#### Events

| Event         | Description                                    | Type         |
| :------------ | :--------------------------------------------- | :----------- |
| **balBlur**   | Emitted when the toggle loses focus.           | `FocusEvent` |
| **balChange** | Emitted when the checked property has changed. | `boolean`    |
| **balFocus**  | Emitted when the toggle has focus.             | `FocusEvent` |

#### Methods

| Method                | Description                                               | Signature                                        |
| :-------------------- | :-------------------------------------------------------- | :----------------------------------------------- |
| **`getInputElement`** | Returns the native `<input>` element used under the hood. | `getInputElement() => Promise<HTMLInputElement>` |
| **`setFocus`**        | Sets the focus on the checkbox input element.             | `setFocus() => Promise<void>`                    |

## Testing

### CheckboxAccessor

CheckboxAccessor is a helper object for E-2-E testing.
It maps the checkbox behaviour to the `bal-checkbox` ui component.

```typescript
import { dataTestSelector, CheckboxAccessor } from '@baloise/ui-library-testing'

describe('Checkbox', () => {
  it('should ...', () => {
     const checkbox = CheckboxAccessor(dataTestSelector('checkbox-id')).get()
     checkbox.click()
     checkbox.assertIsChecked()
     checkbox.contains('Label')
 })
})
```

#### Methods

| Method               | Description                                                                                                      | Arguments                                                |
| :------------------- | :--------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------- |
| **click**            | Clicks the checkbox and set checked to true                                                                      | `options?: Partial<Cypress.ClickOptions>`                |
| **check**            | Clicks the checkbox and set checked to true                                                                      | `options?: Partial<Cypress.CheckOptions>`                |
| **assertIsChecked**  | Assert if the checkbox is checked                                                                                | `shouldBeChecked: boolean = true`                        |
| **assertIsDisabled** | Assert if the checkbox is disabled                                                                               |                                                          |
| **assertIsEnabled**  | Assert if the checkbox is enabled and not disabled                                                               |                                                          |
| **contains**         | Check the content of the label element                                                                           | `content: string`                                        |
| **assertExists**     | Asserts that the element exists in the DOM                                                                       |                                                          |
| **assertNotExists**  | Asserts that the element does not exist in the DOM                                                               |                                                          |
| **assertVisible**    | Assert that the component is visible for the user                                                                |                                                          |
| **assertNotVisible** | Assert that the component is not visible for the user                                                            |                                                          |
| **selectNth**        | Selects the option at the given index                                                                            | `index: number`                                          |
| **should**           | Creates an assertion. Find more information here [link](https://docs.cypress.io/api/commands/should.html#Syntax) | `chainers: string, attribute?: string, content?: string` |

<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->


## Links

* [Documentation on Github](https://github.com/baloise/ui-library/blob/master/docs/src/components/components/bal-checkbox.md)
* [Implementation on Github](https://github.com/baloise/ui-library/blob/master/packages/library/src/components/bal-checkbox)
* [Accessor on Github](https://github.com/baloise/ui-library/blob/master/packages/testing/src/accessors/checkbox.accessor.ts)

<ClientOnly>
  <docs-component-script tag="balCheckbox"></docs-component-script>
</ClientOnly>
