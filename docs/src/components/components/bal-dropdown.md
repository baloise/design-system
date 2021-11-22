---
sidebarDepth: 0
---

# Dropdown


<!-- START: human documentation top -->

A dropdown shows and hides content close to the trigger element.

:::tip
If you are looking for a dropdown with selectable list items go to the [bal-select](./bal-select.md).
:::

<!-- END: human documentation top -->

<ClientOnly><docs-component-tabs></docs-component-tabs></ClientOnly>


## Examples

### Basic

<ClientOnly><docs-demo-bal-dropdown-44></docs-demo-bal-dropdown-44></ClientOnly>


### Input

<ClientOnly><docs-demo-bal-dropdown-45></docs-demo-bal-dropdown-45></ClientOnly>



## Code



### Properties


| Attribute               | Description                                      | Type                 | Default            |
| :---------------------- | :----------------------------------------------- | :------------------- | :----------------- |
| **expanded**            | If `true` the field spans over the whole width.  | <code>boolean</code> | <code>false</code> |
| **fixed-content-width** | If `true` the dropdown content has a fixed width | <code>boolean</code> | <code>false</code> |
| **is-active**           | If `true` the dropdown content is open.          | <code>boolean</code> | <code>false</code> |

### Events


| Event           | Description                                                                     | Type                 |
| :-------------- | :------------------------------------------------------------------------------ | :------------------- |
| **balCollapse** | Listen when the dropdown opens or closes. Returns the current `isActive` value. | <code>boolean</code> |

### Methods


| Method                | Description                                         | Signature                                                                          |
| :-------------------- | :-------------------------------------------------- | :--------------------------------------------------------------------------------- |
| **close**             | Closes the dropdown menu.                           | <code>close() =&#62; Promise&#60;void&#62;</code>                                  |
| **getContentElement** | Returns the `HTMLDivElement` of the content element | <code>getContentElement() =&#62; Promise&#60;HTMLElement  &#124;  null&#62;</code> |
| **open**              | Open the dropdown menu.                             | <code>open() =&#62; Promise&#60;void&#62;</code>                                   |
| **toggle**            | Open or closes the dropdown.                        | <code>toggle() =&#62; Promise&#60;void&#62;</code>                                 |

## Testing

The Baloise Design System provides a collection of custom cypress commands for our components. Moreover, some basic cypress commands like `should` or `click` have been overriden to work with our components.

- [More information about the installation and usage](/components/tooling/testing.html)

<!-- START: human documentation testing -->

```typescript
import { dataTestSelector } from '@baloise/design-system-testing'

describe('Dropdown', () => {
  const dropdown = dataTestSelector('my-dropdown') // [data-test-id="my-dropdown"]
  it('should ...', () => {
    cy.get(dropdown)
      .balDropdownIsClosed()
      .balDropdownToggle()
      .balDropdownIsOpen()
      .balDropdownTriggerContains('Trigger button label')
      .balDropdownMenuContains('Body content')
  })
})
```

<!-- END: human documentation testing -->

### Custom Commands

A list of the custom commands for this specific component.

| Command                        | Description                                               | Signature                                                                                                                                                                                |
| :----------------------------- | :-------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **balDropdownToggle**          | Opens and closes the dropdown.                            | <code>(): Chainable&#60;JQuery&#62;</code>                                                                                                                                               |
| **balDropdownIsOpen**          | Asserts if the dropdown is open.                          | <code>(): Chainable&#60;JQuery&#62;</code>                                                                                                                                               |
| **balDropdownIsClosed**        | Asserts if the dropdown is closed.                        | <code>(): Chainable&#60;JQuery&#62;</code>                                                                                                                                               |
| **balDropdownTriggerContains** | Asserts if the trigger button contains the given content. | <code>(       content: string  &#124;  number  &#124;  RegExp,       options?: Partial&#60;Loggable & Timeoutable & CaseMatchable & Shadow&#62;,     ): Chainable&#60;JQuery&#62;</code> |
| **balDropdownMenuContains**    | Asserts if the dropdown menu contains the given content.  | <code>(       content: string  &#124;  number  &#124;  RegExp,       options?: Partial&#60;Loggable & Timeoutable & CaseMatchable & Shadow&#62;,     ): Chainable&#60;JQuery&#62;</code> |

## Usage

<!-- START: human documentation usage -->

<!-- END: human documentation usage -->



## Edit this page on Github

* [Documentation on Github](https://github.com/baloise/design-system/blob/master/docs/src/components/components/bal-dropdown.md)
* [Implementation on Github](https://github.com/baloise/design-system/blob/master/packages/components/src/components/bal-dropdown)
* [Cypress commands on Github](https://github.com/baloise/design-system/blob/master/packages/testing/src/commands)

## Feedback

Help us improve this component by providing feedback, asking questions, and leaving any other comments on [GitHub](https://github.com/baloise/design-system/issues/new).


<ClientOnly>
  <docs-component-script tag="balDropdown"></docs-component-script>
</ClientOnly>
