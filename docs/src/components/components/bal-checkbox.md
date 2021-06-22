# bal-checkbox <Badge text="Two-way binding"/>

<!-- START: human documentation top -->

Checkboxes allow users to select one or more items from a set. Checkboxes can turn one or more option(s) on or off.

<!-- END: human documentation top -->

:::: tabs :options="{ useUrlFragment: false }"

::: tab Examples

## Basic

Checkboxes allow the selection of multiple options from a set of options. They appear as checked (ticked) when activated, or unchecked (unticked) when deactivated. Checkboxes can be selected as checked by setting the property.

<ClientOnly><docs-demo-bal-checkbox-23></docs-demo-bal-checkbox-23></ClientOnly>


## Switch

Switches are used to toggle between exactly two states (like on and off).

<ClientOnly><docs-demo-bal-checkbox-24></docs-demo-bal-checkbox-24></ClientOnly>


## Inverted

<ClientOnly><docs-demo-bal-checkbox-25></docs-demo-bal-checkbox-25></ClientOnly>


## With Links

<ClientOnly><docs-demo-bal-checkbox-26></docs-demo-bal-checkbox-26></ClientOnly>


## Events

### Listen on Changes

<ClientOnly><docs-demo-bal-checkbox-27></docs-demo-bal-checkbox-27></ClientOnly>


### Change value

<ClientOnly><docs-demo-bal-checkbox-28></docs-demo-bal-checkbox-28></ClientOnly>


## Checkbox Boxes

<ClientOnly><docs-demo-bal-checkbox-29></docs-demo-bal-checkbox-29></ClientOnly>


:::

::: tab Code

## Properties

| Attribute        | Description                                                     | Type                    | Default        |
| :--------------- | :-------------------------------------------------------------- | :---------------------- | :------------- |
| **bal-tabindex** | The tabindex of the control.                                    | `number`                | `0`            |
| **checked**      | If `true`, the checkbox is selected.                            | `boolean`               | `false`        |
| **disabled**     | If `true`, the user cannot interact with the checkbox.          | `boolean`               | `false`        |
| **interface**    | Defines the layout of the checkbox button                       | `"checkbox" , "switch"` | `'checkbox'`   |
| **inverted**     | If `true`, the control works on dark background.                | `boolean`               | `false`        |
| **name**         | The name of the control, which is submitted with the form data. | `string`                | `this.inputId` |
| **value**        | The value of the control.                                       | `string`                | `'on'`         |

## Events

| Event         | Description                                    | Type         |
| :------------ | :--------------------------------------------- | :----------- |
| **balBlur**   | Emitted when the toggle loses focus.           | `FocusEvent` |
| **balChange** | Emitted when the checked property has changed. | `boolean`    |
| **balFocus**  | Emitted when the toggle has focus.             | `FocusEvent` |

## Methods

| Method                | Description                                               | Signature                                        |
| :-------------------- | :-------------------------------------------------------- | :----------------------------------------------- |
| **`getInputElement`** | Returns the native `<input>` element used under the hood. | `getInputElement() => Promise<HTMLInputElement>` |
| **`setFocus`**        | Sets the focus on the checkbox input element.             | `setFocus() => Promise<void>`                    |

:::

::: tab Testing

## CheckboxAccessor

CheckboxAccessor is a helper object for E-2-E testing.
It maps the checkbox behaviour to the `bal-checkbox` ui component.

```typescript
import { dataTestSelector, CheckboxAccessor } from '@baloise/design-system-components-testing'

describe('Checkbox', () => {
  it('should ...', () => {
     const checkbox = CheckboxAccessor(dataTestSelector('checkbox-id')).get()
     checkbox.click()
     checkbox.assertIsChecked()
     checkbox.contains('Label')
 })
})
```

### Methods

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

:::

::: tab Usage

<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->

:::

::::

## Links

* [Documentation on Github](https://github.com/baloise/design-system/blob/master/docs/src/components/components/bal-checkbox.md)
* [Implementation on Github](https://github.com/baloise/design-system/blob/master/packages/components/src/components/bal-checkbox)
* [Accessor on Github](https://github.com/baloise/design-system/blob/master/packages/testing/src/accessors/checkbox.accessor.ts)

<ClientOnly>
  <docs-component-script tag="balCheckbox"></docs-component-script>
</ClientOnly>
