---
sidebarDepth: 0
---

# Radio <Badge text="Two-way binding"/>


<!-- START: human documentation top -->

A radio input is normally displayed in a radio group. The user can only select one option from a number of choices.

- [Form Documentation](/components/foundation/form.html)
- [Form Template with a contact form](/components/templates/contact-form.html)
- [Form Usage Angular](/components/getting-started/angular/usage.html#form-validation)
- [Form Usage Vue](/components/getting-started/vue/usage.html#form-validation)

<!-- END: human documentation top -->

<ClientOnly><docs-component-tabs></docs-component-tabs></ClientOnly>


## Examples

### Basic

<ClientOnly><docs-demo-bal-radio-83></docs-demo-bal-radio-83></ClientOnly>


### Inverted

<ClientOnly><docs-demo-bal-radio-84></docs-demo-bal-radio-84></ClientOnly>


### With Links

<ClientOnly><docs-demo-bal-radio-85></docs-demo-bal-radio-85></ClientOnly>


### Radio Boxes

<ClientOnly><docs-demo-bal-radio-86></docs-demo-bal-radio-86></ClientOnly>


### Radio List

<ClientOnly><docs-demo-bal-radio-87></docs-demo-bal-radio-87></ClientOnly>


### Select Button

<ClientOnly><docs-demo-bal-radio-88></docs-demo-bal-radio-88></ClientOnly>


#### Inverted

<ClientOnly><docs-demo-bal-radio-89></docs-demo-bal-radio-89></ClientOnly>



## Code



### Properties


| Attribute        | Description                                                     | Type                                   | Default                   |
| :--------------- | :-------------------------------------------------------------- | :------------------------------------- | :------------------------ |
| **bal-tabindex** | The tabindex of the control.                                    | <code>number</code>                    | <code>0</code>            |
| **checked**      | If `true`, the radio is selected.                               | <code>boolean</code>                   | <code>false</code>        |
| **disabled**     | If `true`, the user cannot interact with the checkbox.          | <code>boolean</code>                   | <code>false</code>        |
| **interface**    | Defines the layout of the radio button                          | <code>"radio" , "select-button"</code> | <code>'radio'</code>      |
| **inverted**     | If `true`, the control works on dark background.                | <code>boolean</code>                   | <code>false</code>        |
| **is-empty**     | If `true` the radio has no label                                | <code>boolean</code>                   | <code>false</code>        |
| **name**         | The name of the control, which is submitted with the form data. | <code>string</code>                    | <code>this.inputId</code> |
| **value**        | The value of the control.                                       | <code>string</code>                    | <code>''</code>           |

### Events


| Event        | Description                          | Type                    |
| :----------- | :----------------------------------- | :---------------------- |
| **balBlur**  | Emitted when the toggle loses focus. | <code>FocusEvent</code> |
| **balFocus** | Emitted when the toggle has focus.   | <code>FocusEvent</code> |

### Methods


| Method       | Description                          | Signature                                            |
| :----------- | :----------------------------------- | :--------------------------------------------------- |
| **setFocus** | Sets the focus on the input element. | <code>setFocus() =&#62; Promise&#60;void&#62;</code> |

## Testing

The Baloise Design System provides a collection of custom cypress commands for our components. Moreover, some basic cypress commands like `should` or `click` have been overriden to work with our components.

- [More information about the installation and usage](/components/tooling/testing.html)

<!-- START: human documentation testing -->

```typescript
import { dataTestSelector } from '@baloise/design-system-testing'

describe('Radio', () => {
  const radioGroup = dataTestSelector('my-radio-group') // [data-test-id="my-radio-group"]
  it('should ...', () => {
    cy.get(radioGroup)
      .find('bal-radio')
      .first()
      .check()
      .should('be.checked')
  })
})
```

<!-- END: human documentation testing -->



## Usage

<!-- START: human documentation usage -->

<!-- END: human documentation usage -->



## Edit this page on Github

* [Documentation on Github](https://github.com/baloise/design-system/blob/master/docs/src/components/components/bal-radio.md)
* [Implementation on Github](https://github.com/baloise/design-system/blob/master/packages/components/src/components/bal-radio)

## Feedback

Help us improve this component by providing feedback, asking questions, and leaving any other comments on [GitHub](https://github.com/baloise/design-system/issues/new).


<ClientOnly>
  <docs-component-script tag="balRadio"></docs-component-script>
</ClientOnly>
