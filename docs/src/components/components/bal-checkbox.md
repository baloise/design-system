---
sidebarDepth: 0
---

# Checkbox <Badge text="Two-way binding"/>


<!-- START: human documentation top -->

Checkboxes allow users to select one or more items from a set. Checkboxes can turn one or more option(s) on or off.

- [Form Documentation](/components/foundation/form.html)
- [Form Template with a contact form](/components/templates/contact-form.html)
- [Form Usage Angular](/components/getting-started/angular/usage.html#form-validation)
- [Form Usage Vue](/components/getting-started/vue/usage.html#form-validation)

<!-- END: human documentation top -->

<ClientOnly><docs-component-tabs></docs-component-tabs></ClientOnly>


## Examples

### Basic

Checkboxes allow the selection of multiple options from a set of options. They appear as checked (ticked) when activated, or unchecked (unticked) when deactivated.
        Checkboxes can be selected as checked by setting the property.

<ClientOnly><docs-demo-bal-checkbox-26></docs-demo-bal-checkbox-26></ClientOnly>


### Switch

Switches are used to toggle between exactly two states (like on and off).

<ClientOnly><docs-demo-bal-checkbox-27></docs-demo-bal-checkbox-27></ClientOnly>


### Inverted

<ClientOnly><docs-demo-bal-checkbox-28></docs-demo-bal-checkbox-28></ClientOnly>


### With Links

<ClientOnly><docs-demo-bal-checkbox-29></docs-demo-bal-checkbox-29></ClientOnly>


### Events

#### Listen on Changes

<ClientOnly><docs-demo-bal-checkbox-30></docs-demo-bal-checkbox-30></ClientOnly>


#### Change value

<ClientOnly><docs-demo-bal-checkbox-31></docs-demo-bal-checkbox-31></ClientOnly>


### Checkbox Boxes

<ClientOnly><docs-demo-bal-checkbox-32></docs-demo-bal-checkbox-32></ClientOnly>



## Code



### Properties


| Attribute        | Description                                                     | Type                               | Default                   |
| :--------------- | :-------------------------------------------------------------- | :--------------------------------- | :------------------------ |
| **bal-tabindex** | The tabindex of the control.                                    | <code>number</code>                | <code>0</code>            |
| **checked**      | If `true`, the checkbox is selected.                            | <code>boolean</code>               | <code>false</code>        |
| **disabled**     | If `true`, the user cannot interact with the checkbox.          | <code>boolean</code>               | <code>false</code>        |
| **interface**    | Defines the layout of the checkbox button                       | <code>"checkbox" , "switch"</code> | <code>'checkbox'</code>   |
| **inverted**     | If `true`, the control works on dark background.                | <code>boolean</code>               | <code>false</code>        |
| **name**         | The name of the control, which is submitted with the form data. | <code>string</code>                | <code>this.inputId</code> |
| **value**        | The value of the control.                                       | <code>string</code>                | <code>'on'</code>         |

### Events


| Event         | Description                                    | Type                    |
| :------------ | :--------------------------------------------- | :---------------------- |
| **balBlur**   | Emitted when the toggle loses focus.           | <code>FocusEvent</code> |
| **balChange** | Emitted when the checked property has changed. | <code>boolean</code>    |
| **balFocus**  | Emitted when the toggle has focus.             | <code>FocusEvent</code> |

### Methods


| Method              | Description                                               | Signature                                                               |
| :------------------ | :-------------------------------------------------------- | :---------------------------------------------------------------------- |
| **getInputElement** | Returns the native `<input>` element used under the hood. | <code>getInputElement() =&#62; Promise&#60;HTMLInputElement&#62;</code> |
| **setFocus**        | Sets the focus on the checkbox input element.             | <code>setFocus() =&#62; Promise&#60;void&#62;</code>                    |

## Testing

The Baloise Design System provides a collection of custom cypress commands for our components. Moreover, some basic cypress commands like `should` or `click` have been overriden to work with our components.

- [More information about the installation and usage](/components/tooling/testing.html)

<!-- START: human documentation testing -->

```typescript
import { dataTestSelector } from '@baloise/design-system-testing'

describe('Checkbox', () => {
  const checkbox = dataTestSelector('my-checkbox') // [data-test-id="my-checkbox"]
  it('should ...', () => {
    cy.get(checkbox)
      .contains('Label')
      .check()
      .should('be.checked')
      .should('not.be.disabled')
  })
})
```

<!-- END: human documentation testing -->



## Usage

<!-- START: human documentation usage -->

<!-- END: human documentation usage -->



## Edit this page on Github

* [Documentation on Github](https://github.com/baloise/design-system/blob/master/docs/src/components/components/bal-checkbox.md)
* [Implementation on Github](https://github.com/baloise/design-system/blob/master/packages/components/src/components/bal-checkbox)

## Feedback

Help us improve this component by providing feedback, asking questions, and leaving any other comments on [GitHub](https://github.com/baloise/design-system/issues/new).


<ClientOnly>
  <docs-component-script tag="balCheckbox"></docs-component-script>
</ClientOnly>
