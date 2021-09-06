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


### Steps

<ClientOnly><docs-demo-bal-tabs-106></docs-demo-bal-tabs-106></ClientOnly>


### O-Steps

<ClientOnly><docs-demo-bal-tabs-107></docs-demo-bal-tabs-107></ClientOnly>



## Code



### Properties


| Attribute        | Description                                       | Type                           | Default  |
| :--------------- | :------------------------------------------------ | :----------------------------- | :------- |
| **action**       | If `true` a acation button is added to the right  | `boolean`                      | `false`  |
| **action-label** | Label for the action button                       | `string`                       | `''`     |
| **clickable**    | If `true` the tabs or steps can be clicked.       | `boolean`                      | `true`   |
| **expanded**     | If `true` the field expands over the whole width. | `boolean`                      | `false`  |
| **interface**    | Defines the layout of the tabs.                   | `"o-steps" , "steps" , "tabs"` | `'tabs'` |
| **rounded**      | If you want the rounded tab style.                | `boolean`                      | `false`  |

### Events


| Event              | Description                                | Type           |
| :----------------- | :----------------------------------------- | :------------- |
| **balActionClick** | Emitted when the action button has clicked | `MouseEvent`   |
| **balTabChange**   | Emitted when the changes has finished.     | `BalTabOption` |

### Methods


| Method       | Description                                               | Signature                                    |
| :----------- | :-------------------------------------------------------- | :------------------------------------------- |
| **`select`** | Go to tab with the given value                            | `select(tab: BalTabOption) => Promise<void>` |
| **`sync`**   | *Internal* - Rerenders the tabs with their given settings | `sync() => Promise<void>`                    |

### Testing



#### Commands

| Command                       | Description                                                                               | Signature                                                               |
| :---------------------------- | :---------------------------------------------------------------------------------------- | :---------------------------------------------------------------------- |
| **balTabsFindActionButton**   | Custom command to select DOM element by data-cy attribute. @example cy.dataCy('greeting') | `(): Chainable<JQuery>`                                                 |
| **balTabsFindItems**          | Custom command to select DOM element by data-cy attribute. @example cy.dataCy('greeting') | `(): Chainable<JQuery>`                                                 |
| **balTabsShouldHaveItems**    | Custom command to select DOM element by data-cy attribute. @example cy.dataCy('greeting') | `(labels: string[], dataType?: 'label' | 'value'): Chainable<JQuery>`   |
| **balTabItemShouldHaveState** | Custom command to select DOM element by data-cy attribute. @example cy.dataCy('greeting') | `(state: 'done' | 'failed' | 'active' | 'disabled'): Chainable<JQuery>` |

## Usage

<!-- START: human documentation usage -->

<!-- END: human documentation usage -->



## Edit this page on Github

* [Documentation on Github](https://github.com/baloise/design-system/blob/master/docs/src/components/components/bal-tabs.md)
* [Implementation on Github](https://github.com/baloise/design-system/blob/master/packages/components/src/components/bal-tabs)
* [Cypress commands on Github](https://github.com/baloise/design-system/blob/master/packages/testing/src/commands)

## Feedback

Help us improve this component by providing feedback, asking questions, and leaving any other comments on [GitHub](https://github.com/baloise/design-system/issues/new).

