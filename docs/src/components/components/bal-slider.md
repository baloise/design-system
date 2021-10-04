---
sidebarDepth: 0
---

# Slider


<!-- START: human documentation top -->

The slider component lets users select from a range of values by moving the slider thumb.

<!-- END: human documentation top -->

<ClientOnly><docs-component-tabs></docs-component-tabs></ClientOnly>


## Examples

### Basic

<ClientOnly><docs-demo-bal-slider-93></docs-demo-bal-slider-93></ClientOnly>


### With Steps

<ClientOnly><docs-demo-bal-slider-94></docs-demo-bal-slider-94></ClientOnly>


### With Field

<ClientOnly><docs-demo-bal-slider-95></docs-demo-bal-slider-95></ClientOnly>



## Code



### Properties


| Attribute       | Description                                                                                                                                                             | Type                                     | Default                   |
| :-------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------- | :------------------------ |
| **balTabindex** | The tabindex of the control.                                                                                                                                            | <code>number</code>                      | <code>0</code>            |
| **debounce**    | Set the amount of time, in milliseconds, to wait to trigger the `balChange` event after each keystroke. This also impacts form bindings such as `ngModel` or `v-model`. | <code>number</code>                      | <code>0</code>            |
| **disabled**    | If `true` the input is disabled                                                                                                                                         | <code>boolean</code>                     | <code>false</code>        |
| **hasTicks**    | If `true`, small ticks for the steps are shown.                                                                                                                         | <code>boolean</code>                     | <code>false</code>        |
| **max**         | Max value of the model.                                                                                                                                                 | <code>number</code>                      | <code>100</code>          |
| **min**         | Min value of the model.                                                                                                                                                 | <code>number</code>                      | <code>0</code>            |
| **name**        | The name of the control, which is submitted with the form data.                                                                                                         | <code>string</code>                      | <code>this.inputId</code> |
| **readonly**    | If `true`, the user cannot modify the value.                                                                                                                            | <code>boolean</code>                     | <code>false</code>        |
| **required**    | If `true`, the user must fill in a value before submitting a form.                                                                                                      | <code>boolean</code>                     | <code>false</code>        |
| **step**        | The step size. 0 means no steps.                                                                                                                                        | <code>number</code>                      | <code>0</code>            |
| **value**       | The value of the input.                                                                                                                                                 | <code>number , string , undefined</code> | <code>''</code>           |

### Events


| Event           | Description                               | Type                                              |
| :-------------- | :---------------------------------------- | :------------------------------------------------ |
| **balBlur**     | Emitted when a keyboard input occurred.   | <code>FocusEvent</code>                           |
| **balChange**   | Emitted when the input value has changed. | <code>null  &#124;  number  &#124;  string</code> |
| **balClick**    | Emitted when the input has clicked.       | <code>MouseEvent</code>                           |
| **balFocus**    | Emitted when the input has focus.         | <code>FocusEvent</code>                           |
| **balInput**    | Emitted when a keyboard input occurred.   | <code>null  &#124;  number  &#124;  string</code> |
| **balKeyPress** | Emitted when a keyboard key has pressed.  | <code>KeyboardEvent</code>                        |

### Methods


| Method              | Description                                                                                             | Signature                                                               |
| :------------------ | :------------------------------------------------------------------------------------------------------ | :---------------------------------------------------------------------- |
| **getInputElement** | Returns the native `<input>` element used under the hood.                                               | <code>getInputElement() =&#62; Promise&#60;HTMLInputElement&#62;</code> |
| **setFocus**        | Sets focus on the native `input` in `bal-input`. Use this method instead of the global
`input.focus()`. | <code>setFocus() =&#62; Promise&#60;void&#62;</code>                    |

## Testing

The Baloise Design System provides a collection of custom cypress commands for our components. Moreover, some basic cypress commands like `should` or `click` have been overriden to work with our components.

- [More information about the installation and usage](/components/tooling/testing.html)

<!-- START: human documentation testing -->

```typescript
import { dataTestSelector } from '@baloise/design-system-testing'

describe('Slider', () => {
  const slider = dataTestSelector('my-slider') // [data-test-id="my-slider"]
  it('should ...', () => {
    cy.get(slider)
      .type('30')
      .should('have.value', '30')
  })
})
```

<!-- END: human documentation testing -->



## Usage

<!-- START: human documentation usage -->

<!-- END: human documentation usage -->



## Edit this page on Github

* [Documentation on Github](https://github.com/baloise/design-system/blob/master/docs/src/components/components/bal-slider.md)
* [Implementation on Github](https://github.com/baloise/design-system/blob/master/packages/components/src/components/bal-slider)

## Feedback

Help us improve this component by providing feedback, asking questions, and leaving any other comments on [GitHub](https://github.com/baloise/design-system/issues/new).

