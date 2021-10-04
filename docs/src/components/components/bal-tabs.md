---
sidebarDepth: 0
---

# Tabs


<!-- START: human documentation top -->

Tabs are used to structure the information in sub section on the same page.

<!-- END: human documentation top -->

<ClientOnly><docs-component-tabs></docs-component-tabs></ClientOnly>


## Examples

### Main Navigation

<ClientOnly><docs-demo-bal-tabs-103></docs-demo-bal-tabs-103></ClientOnly>


### Sub Navigation

<ClientOnly><docs-demo-bal-tabs-104></docs-demo-bal-tabs-104></ClientOnly>


### Expanded

<ClientOnly><docs-demo-bal-tabs-105></docs-demo-bal-tabs-105></ClientOnly>


### Steps (Stepper)

<ClientOnly><docs-demo-bal-tabs-106></docs-demo-bal-tabs-106></ClientOnly>


### O-Steps (Stepper)

<ClientOnly><docs-demo-bal-tabs-107></docs-demo-bal-tabs-107></ClientOnly>



## Code



### Properties


| Attribute       | Description                                       | Type                                      | Default             |
| :-------------- | :------------------------------------------------ | :---------------------------------------- | :------------------ |
| **action**      | If `true` a acation button is added to the right  | <code>boolean</code>                      | <code>false</code>  |
| **actionLabel** | Label for the action button                       | <code>string</code>                       | <code>''</code>     |
| **clickable**   | If `true` the tabs or steps can be clicked.       | <code>boolean</code>                      | <code>true</code>   |
| **expanded**    | If `true` the field expands over the whole width. | <code>boolean</code>                      | <code>false</code>  |
| **interface**   | Defines the layout of the tabs.                   | <code>"o-steps" , "steps" , "tabs"</code> | <code>'tabs'</code> |
| **rounded**     | If you want the rounded tab style.                | <code>boolean</code>                      | <code>false</code>  |

### Events


| Event              | Description                                | Type                      |
| :----------------- | :----------------------------------------- | :------------------------ |
| **balActionClick** | Emitted when the action button has clicked | <code>MouseEvent</code>   |
| **balTabChange**   | Emitted when the changes has finished.     | <code>BalTabOption</code> |

### Methods


| Method     | Description                    | Signature                                                           |
| :--------- | :----------------------------- | :------------------------------------------------------------------ |
| **select** | Go to tab with the given value | <code>select(tab: BalTabOption) =&#62; Promise&#60;void&#62;</code> |

## Testing

The Baloise Design System provides a collection of custom cypress commands for our components. Moreover, some basic cypress commands like `should` or `click` have been overriden to work with our components.

- [More information about the installation and usage](/components/tooling/testing.html)

<!-- START: human documentation testing -->

```typescript
import { dataTestSelector } from '@baloise/design-system-testing'

describe('Tabs', () => {
  const tabs = dataTestSelector('my-tabs') // [data-test-id="my-tabs"]
  const steps = dataTestSelector('my-steps') // [data-test-id="my-steps"]
  it('should ...', () => {
    cy.get(tabs)
      .select('Tab B')
      .should('have.value', 'Tab B')
    cy.get(tabs)
      .balTabsFindActionButton()
      .contains('Action')
    cy.get(steps)
      .balTabsFindItems()
      .first()
      .balTabItemShouldHaveState('done')
  })
})
```

<!-- END: human documentation testing -->

### Custom Commands

A list of the custom commands for this specific component.

| Command                       | Description                                    | Signature                                                                                                       |
| :---------------------------- | :--------------------------------------------- | :-------------------------------------------------------------------------------------------------------------- |
| **balTabsFindActionButton**   | Returns the action button element.             | <code>(): Chainable&#60;JQuery&#62;</code>                                                                      |
| **balTabsFindItems**          | Returns the tab items.                         | <code>(): Chainable&#60;JQuery&#62;</code>                                                                      |
| **balTabsShouldHaveItems**    | Assert that the tab has the given item.        | <code>(labels: string[], dataType?: 'label'  &#124;  'value'): Chainable&#60;JQuery&#62;</code>                 |
| **balTabItemShouldHaveState** | Assert that the tab item has the  given state. | <code>(state: 'done'  &#124;  'failed'  &#124;  'active'  &#124;  'disabled'): Chainable&#60;JQuery&#62;</code> |

## Usage

<!-- START: human documentation usage -->

<!-- END: human documentation usage -->



## Edit this page on Github

* [Documentation on Github](https://github.com/baloise/design-system/blob/master/docs/src/components/components/bal-tabs.md)
* [Implementation on Github](https://github.com/baloise/design-system/blob/master/packages/components/src/components/bal-tabs)
* [Cypress commands on Github](https://github.com/baloise/design-system/blob/master/packages/testing/src/commands)

## Feedback

Help us improve this component by providing feedback, asking questions, and leaving any other comments on [GitHub](https://github.com/baloise/design-system/issues/new).

