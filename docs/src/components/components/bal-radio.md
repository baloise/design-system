# bal-radio <Badge text="Two-way binding"/>

A radio input is normally displayed in a radio group. The user can only select one option from a number of choices.

## Basic

<ClientOnly>  <docs-demo-bal-radio-71></docs-demo-bal-radio-71></ClientOnly>

```html
<bal-radio-group value="2" id="radio-example">
  <bal-radio name="radio-example" value="1">Label 1</bal-radio>
  <bal-radio name="radio-example" value="2">Label 2</bal-radio>
  <bal-radio name="radio-example" value="3">Label 3</bal-radio>
  <bal-radio name="radio-example" value="4" disabled>Label Disabled</bal-radio>
</bal-radio-group>
<p class="help" id="radio-example-result"></p>
<bal-button id="radio-example-action">Go to 3</bal-button>
```

## Inverted

<ClientOnly>  <docs-demo-bal-radio-72></docs-demo-bal-radio-72></ClientOnly>

```html
<div class="has-background-blue has-padding">
  <bal-radio-group value="3" inverted>
    <bal-radio inverted name="radio-example-inverted" value="1">Label 1</bal-radio>
    <bal-radio inverted name="radio-example-inverted" value="2">Label 2</bal-radio>
    <bal-radio inverted name="radio-example-inverted" value="3">Label 3</bal-radio>
    <bal-radio inverted name="radio-example-inverted" value="4" disabled>Label Disabled</bal-radio>
  </bal-radio-group>
</div>
```

## With Links

<ClientOnly>  <docs-demo-bal-radio-73></docs-demo-bal-radio-73></ClientOnly>

```html
<bal-radio-group value="1">
  <bal-radio name="link-example" value="1">Random text with a <a class="is-link" target="_blank" href="http://baloise.ch">Link</a> in it</bal-radio>
  <bal-radio name="link-example" value="2">Label 2 without a link</bal-radio>
</bal-radio-group>
```

## Select Button

<ClientOnly>  <docs-demo-bal-radio-74></docs-demo-bal-radio-74></ClientOnly>

```html
<bal-radio-group value="1" interface="select-button" data-test-id="radio">
  <bal-radio name="select-button-example" value="1">Label 1</bal-radio>
  <bal-radio name="select-button-example" value="2">Label 2</bal-radio>
  <bal-radio name="select-button-example" value="3" disabled>Label Disabled</bal-radio>
</bal-radio-group>
```

### Inverted

<ClientOnly>  <docs-demo-bal-radio-75></docs-demo-bal-radio-75></ClientOnly>

```html
<div class="has-background-blue has-padding">
  <bal-radio-group value="yes" interface="select-button" inverted>
    <bal-radio name="select-button-example-2" value="yes">Yes</bal-radio>
    <bal-radio name="select-button-example-2" value="no">No</bal-radio>
  </bal-radio-group>
</div>
```


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

`bal-radio-group` is a child component of `bal-radio` that groups radio buttons together.

> Two-way binding with `v-model` or `ng-model` is available.

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
import { dataTestSelector, RadioAccessor } from '@baloise/ui-library-testing'

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




## Links

* [Component on Github](https://github.com/baloise/ui-library/blob/master/packages/library/src/components/bal-radio)
* [Accessor on Github](https://github.com/baloise/ui-library/blob/master/packages/testing/src/accessors/radio.accessor.ts)

<ClientOnly>
  <docs-component-script tag="balRadio"></docs-component-script>
</ClientOnly>
