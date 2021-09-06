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

<ClientOnly><docs-demo-bal-dropdown-41></docs-demo-bal-dropdown-41></ClientOnly>


### Input

<ClientOnly><docs-demo-bal-dropdown-42></docs-demo-bal-dropdown-42></ClientOnly>



## Code



### Properties


| Attribute               | Description                                      | Type      | Default |
| :---------------------- | :----------------------------------------------- | :-------- | :------ |
| **expanded**            | If `true` the field spans over the whole width.  | `boolean` | `false` |
| **fixed-content-width** | If `true` the dropdown content has a fixed width | `boolean` | `false` |
| **is-active**           | If `true` the dropdown content is open.          | `boolean` | `false` |

### Events


| Event                  | Description                                                                     | Type      |
| :--------------------- | :------------------------------------------------------------------------------ | :-------- |
| **balCollapse**        | Listen when the dropdown opens or closes. Returns the current `isActive` value. | `boolean` |
| **balDropdownPrepare** | *Internal* - Use this to close unuesed dropdowns.                               | `string`  |

### Methods


| Method                  | Description                                         | Signature                                            |
| :---------------------- | :-------------------------------------------------- | :--------------------------------------------------- |
| **`close`**             | Closes the dropdown menu.                           | `close() => Promise<void>`                           |
| **`getContentElement`** | Returns the `HTMLDivElement` of the content element | `getContentElement() => Promise<HTMLElement | null>` |
| **`open`**              | Open the dropdown menu.                             | `open() => Promise<void>`                            |
| **`toggle`**            | Open or closes the dropdown.                        | `toggle() => Promise<void>`                          |

### Testing



#### Commands

| Command                        | Description                                                                               | Signature                                                                                                                                       |
| :----------------------------- | :---------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------- |
| **balDropdownToggle**          | Custom command to select DOM element by data-cy attribute. @example cy.dataCy('greeting') | `(): Chainable<JQuery>`                                                                                                                         |
| **balDropdownIsOpen**          | Custom command to select DOM element by data-cy attribute. @example cy.dataCy('greeting') | `(): Chainable<JQuery>`                                                                                                                         |
| **balDropdownIsClosed**        | Custom command to select DOM element by data-cy attribute. @example cy.dataCy('greeting') | `(): Chainable<JQuery>`                                                                                                                         |
| **balDropdownTriggerContains** | Custom command to select DOM element by data-cy attribute. @example cy.dataCy('greeting') | `(
      content: string | number | RegExp,
      options?: Partial<Loggable & Timeoutable & CaseMatchable & Shadow>,
    ): Chainable<JQuery>` |
| **balDropdownMenuContains**    | Custom command to select DOM element by data-cy attribute. @example cy.dataCy('greeting') | `(
      content: string | number | RegExp,
      options?: Partial<Loggable & Timeoutable & CaseMatchable & Shadow>,
    ): Chainable<JQuery>` |

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
