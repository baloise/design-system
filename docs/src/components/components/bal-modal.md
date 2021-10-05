---
sidebarDepth: 0
---

# Modal


<!-- START: human documentation top -->

A Modal is a dialog that appears on top of the app's body, and must be dismissed by
the app before interaction can resume.

<!-- END: human documentation top -->

<ClientOnly><docs-component-tabs></docs-component-tabs></ClientOnly>


## Examples

### Basic

<ClientOnly><docs-demo-bal-modal-72></docs-demo-bal-modal-72></ClientOnly>



## Code

<!-- START: human documentation code -->

::: danger <img src="https://angular.io/assets/images/logos/angular/angular.svg" data-origin="https://angular.io/assets/images/logos/angular/angular.svg" alt="angular" style="width: 32px">Angular

Have a look at the [Angular usage documentation](/components/getting-started/angular/usage.html#modal-service).

:::

::: tip <img src="https://vuejs.org/images/logo.png" data-origin="https://vuejs.org/images/logo.png" alt="angular" style="width: 32px">Vue

Have a look at the [Vue usage documentation](/components/getting-started/vue/usage.html#modal).

:::

<!-- END: human documentation code -->

### Properties


| Attribute          | Description                                                                                                      | Type                                                | Default              |
| :----------------- | :--------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------- | :------------------- |
| **component**      | The component to display inside of the modal.                                                                    | <code>Function , HTMLElement , null , string</code> |                      |
| **componentProps** | The data to pass to the modal component.                                                                         | <code>undefined , { [key: string]: any; }</code>    |                      |
| **css-class**      | Additional classes to apply for custom CSS. If multiple classes are provided they should be separated by spaces. | <code>string , string[] , undefined</code>          |                      |
| **has-backdrop**   | If `true`, a backdrop will be displayed behind the modal.                                                        | <code>boolean</code>                                | <code>true</code>    |
| **interface**      | Defines the look of the modal. The card interface should be used for scrollable content in the modal.            | <code>"card" , "light"</code>                       | <code>'light'</code> |
| **is-closable**    | If `true`, the modal can be closed with the escape key or the little close button.                               | <code>boolean</code>                                | <code>true</code>    |
| **modal-width**    | Defines the width of the modal body                                                                              | <code>number</code>                                 | <code>640</code>     |

### Events


| Event                   | Description                             | Type                                         |
| :---------------------- | :-------------------------------------- | :------------------------------------------- |
| **balModalDidDismiss**  | Emitted after the modal has dismissed.  | <code>OverlayEventDetail&#60;any&#62;</code> |
| **balModalDidPresent**  | Emitted after the modal has presented.  | <code>void</code>                            |
| **balModalWillDismiss** | Emitted before the modal has dismissed. | <code>OverlayEventDetail&#60;any&#62;</code> |
| **balModalWillPresent** | Emitted before the modal has presented. | <code>void</code>                            |

### Methods


| Method            | Description                                                  | Signature                                                                                           |
| :---------------- | :----------------------------------------------------------- | :-------------------------------------------------------------------------------------------------- |
| **close**         | Closes the modal.                                            | <code>close() =&#62; Promise&#60;void&#62;</code>                                                   |
| **dismiss**       | Closes the presented modal with the modal controller         | <code>dismiss(data?: any, role?: string  &#124;  undefined) =&#62; Promise&#60;boolean&#62;</code>  |
| **onDidDismiss**  | Returns a promise that resolves when the modal did dismiss.  | <code>onDidDismiss&#60;T = any&#62;() =&#62; Promise&#60;OverlayEventDetail&#60;T&#62;&#62;</code>  |
| **onWillDismiss** | Returns a promise that resolves when the modal will dismiss. | <code>onWillDismiss&#60;T = any&#62;() =&#62; Promise&#60;OverlayEventDetail&#60;T&#62;&#62;</code> |
| **open**          | Opens the modal.                                             | <code>open() =&#62; Promise&#60;void&#62;</code>                                                    |
| **present**       | Presents the modal through the modal controller              | <code>present() =&#62; Promise&#60;void&#62;</code>                                                 |

## Testing

The Baloise Design System provides a collection of custom cypress commands for our components. Moreover, some basic cypress commands like `should` or `click` have been overriden to work with our components.

- [More information about the installation and usage](/components/tooling/testing.html)

<!-- START: human documentation testing -->

```typescript
import { dataTestSelector } from '@baloise/design-system-testing'

describe('Modal', () => {
  const modal = dataTestSelector('my-modal') // [data-test-id="my-modal"]
  const openModalButton = dataTestSelector('my-open-modal')
  const closeModalButton = dataTestSelector('my-close-modal')
  it('should ...', () => {
    cy.get(openModalButton).click()
    cy.get(modal).balModalIsOpen()
    cy.get(modal)
      .find('bal-modal-header')
      .contains('Modal Title')
  })
})
```

<!-- END: human documentation testing -->

### Custom Commands

A list of the custom commands for this specific component.

| Command              | Description                    | Signature                                  |
| :------------------- | :----------------------------- | :----------------------------------------- |
| **balModalIsOpen**   | Assert if the modal is open.   | <code>(): Chainable&#60;JQuery&#62;</code> |
| **balModalIsClosed** | Assert if the modal is closed. | <code>(): Chainable&#60;JQuery&#62;</code> |

## Usage

<!-- START: human documentation usage -->

<!-- END: human documentation usage -->



## Edit this page on Github

* [Documentation on Github](https://github.com/baloise/design-system/blob/master/docs/src/components/components/bal-modal.md)
* [Implementation on Github](https://github.com/baloise/design-system/blob/master/packages/components/src/components/bal-modal)
* [Cypress commands on Github](https://github.com/baloise/design-system/blob/master/packages/testing/src/commands)

## Feedback

Help us improve this component by providing feedback, asking questions, and leaving any other comments on [GitHub](https://github.com/baloise/design-system/issues/new).


<ClientOnly>
  <docs-component-script tag="balModal"></docs-component-script>
</ClientOnly>
