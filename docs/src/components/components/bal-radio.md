# bal-radio <Badge text="Two-way binding"/>

<!-- START: human documentation top -->

A radio input is normally displayed in a radio group. The user can only select one option from a number of choices.

<!-- END: human documentation top -->

## Basic

<ClientOnly><docs-demo-bal-radio-75></docs-demo-bal-radio-75></ClientOnly>


## Inverted

<ClientOnly><docs-demo-bal-radio-76></docs-demo-bal-radio-76></ClientOnly>


## With Links

<ClientOnly><docs-demo-bal-radio-77></docs-demo-bal-radio-77></ClientOnly>


## Radio Boxes

<ClientOnly><docs-demo-bal-radio-78></docs-demo-bal-radio-78></ClientOnly>


## Radio List

<ClientOnly><docs-demo-bal-radio-79></docs-demo-bal-radio-79></ClientOnly>


## Select Button

<ClientOnly><docs-demo-bal-radio-80></docs-demo-bal-radio-80></ClientOnly>


### Inverted

<ClientOnly><docs-demo-bal-radio-81></docs-demo-bal-radio-81></ClientOnly>



## API

### bal-radio

#### Properties

| Attribute        | Description                                                     | Type                        | Default        |
| :--------------- | :-------------------------------------------------------------- | :-------------------------- | :------------- |
| **bal-tabindex** | The tabindex of the control.                                    | `number`                    | `0`            |
| **checked**      | If `true`, the radio is selected.                               | `boolean`                   | `false`        |
| **disabled**     | If `true`, the user cannot interact with the checkbox.          | `boolean`                   | `false`        |
| **interface**    | Defines the layout of the radio button                          | `"radio" , "select-button"` | `'radio'`      |
| **inverted**     | If `true`, the control works on dark background.                | `boolean`                   | `false`        |
| **name**         | The name of the control, which is submitted with the form data. | `string`                    | `this.inputId` |
| **value**        | The value of the control.                                       | `string`                    | `''`           |

#### Events

| Event        | Description                          | Type         |
| :----------- | :----------------------------------- | :----------- |
| **balBlur**  | Emitted when the toggle loses focus. | `FocusEvent` |
| **balFocus** | Emitted when the toggle has focus.   | `FocusEvent` |

#### Methods

| Method         | Description                          | Signature                     |
| :------------- | :----------------------------------- | :---------------------------- |
| **`setFocus`** | Sets the focus on the input element. | `setFocus() => Promise<void>` |

### bal-radio-group


# bal-radio-group

#### Properties

| Attribute     | Description                                                     | Type                        | Default        |
| :------------ | :-------------------------------------------------------------- | :-------------------------- | :------------- |
| **interface** | Defines the layout of the radio button                          | `"radio" , "select-button"` | `'radio'`      |
| **inverted**  | If `true` the component can be used on dark background          | `boolean`                   | `false`        |
| **name**      | The name of the control, which is submitted with the form data. | `string`                    | `this.inputId` |
| **value**     | The value of the control.                                       | `string`                    | `''`           |

#### Events

| Event         | Description                                    | Type     |
| :------------ | :--------------------------------------------- | :------- |
| **balChange** | Emitted when the checked property has changed. | `string` |

## Testing

### RadioAccessor

RadioAccessor is a helper object for E-2-E testing.
It maps the radio behaviour to the `bal-radio` ui component.

```typescript
import { dataTestSelector, RadioAccessor } from '@baloise/design-system-components-testing'

describe('Radio', () => {
  it('should ...', () => {
     const radio = RadioAccessor(dataTestSelector('radio-id')).get()
     radio.select(1)
 })
})
```

#### Methods

| Method                     | Description                                                                                                        | Arguments                                                |
| :------------------------- | :----------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------- |
| **select**                 | Selects option                                                                                                     | `indexes: number | number[]`                             |
| **check**                  | Check element                                                                                                      | `options?: Partial<Cypress.CheckOptions>`                |
| **assertIsChecked**        | Assert if the the element is checked                                                                               | `shouldBeChecked?: boolean`                              |
| **click**                  | Triggers a clicks on the element                                                                                   | `options?: Partial<Cypress.ClickOptions>`                |
| **clickNth**               | Triggers n times a click on the element                                                                            | `index: number, options?: Partial<Cypress.ClickOptions>` |
| **contains**               | Verifies if the content of the element matches                                                                     | `content: string | number | RegExp`                      |
| **assertExists**           | Asserts that the element exists in the DOM                                                                         |                                                          |
| **assertNotExists**        | Asserts that the element does not exist in the DOM                                                                 |                                                          |
| **assertIsDisabled**       | Asserts that the element is disabled                                                                               |                                                          |
| **assertIsEnabled**        | Asserts that the element is enabled and can be used                                                                |                                                          |
| **should**                 | Creates an assertion. Find more information here [link](https://docs.cypress.io/api/commands/should.html#Syntax)   | `chainers: string, attribute?: string, content?: string` |
| **assertVisible**          | Assert that the component is visible for the user                                                                  |                                                          |
| **assertNotVisible**       | Assert that the component is not visible for the user                                                              |                                                          |
| **selectNth**              | Selects the option at the given index                                                                              | `index: number`                                          |
| **assertAttributeEquals**  | Asserting that the element has the attribute and the value.                                                        | `attribute: string, value: string`                       |
| **assertAttributeInclude** | Asserting that the element has the attribute and include the value.                                                | `attribute: string, value: string`                       |
| **assertFullUrl**          | Asserting if given url argument matches the url of the browser.                                                    | `url: string`                                            |
| **assertPartUrl**          | Asserting if the browser url contains the given url argument.                                                      | `url: string`                                            |
| **wait**                   | Wait for a number of milliseconds or wait for an aliased resource to resolve before moving on to the next command. | `time: number`                                           |

<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->


## Links

* [Documentation on Github](https://github.com/baloise/design-system/blob/master/docs/src/components/components/bal-radio.md)
* [Implementation on Github](https://github.com/baloise/design-system/blob/master/packages/components/src/components/bal-radio)
* [Accessor on Github](https://github.com/baloise/design-system/blob/master/packages/testing/src/accessors/radio.accessor.ts)

<ClientOnly>
  <docs-component-script tag="balRadio"></docs-component-script>
</ClientOnly>
