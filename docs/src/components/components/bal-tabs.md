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


TabsAccessor is a helper object for E-2-E testing.
It maps the tabs behaviour to the `bal-tabs` ui component.

```typescript
import { dataTestSelector, TabsAccessor } from '@baloise/design-system-components-testing'

describe('Tabs', () => {
  it('should ...', () => {
     const tabs = TabsAccessor(dataTestSelector('tabs-id')).get()
     tabs.select(1)
     tabs.assertVisible('value')
 })
})
```

### Methods

| Method                     | Description                                                                                                        | Arguments                                                |
| :------------------------- | :----------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------- |
| **assertVisible**          | Assert if tab is visible                                                                                           | `text: string`                                           |
| **select**                 | Selects tab                                                                                                        | `index: number`                                          |
| **click**                  | Triggers a clicks on the element                                                                                   | `options?: Partial<Cypress.ClickOptions>`                |
| **clickNth**               | Triggers n times a click on the element                                                                            | `index: number, options?: Partial<Cypress.ClickOptions>` |
| **contains**               | Verifies if the content of the element matches                                                                     | `content: string | number | RegExp`                      |
| **assertExists**           | Asserts that the element exists in the DOM                                                                         |                                                          |
| **assertNotExists**        | Asserts that the element does not exist in the DOM                                                                 |                                                          |
| **should**                 | Creates an assertion. Find more information here [link](https://docs.cypress.io/api/commands/should.html#Syntax)   | `chainers: string, attribute?: string, content?: string` |
| **assertIsDisabled**       | Asserts that the element is disabled                                                                               |                                                          |
| **assertIsEnabled**        | Asserts that the element is enabled and can be used                                                                |                                                          |
| **selectNth**              | Selects the option at the given index                                                                              | `index: number`                                          |
| **assertAttributeEquals**  | Asserting that the element has the attribute and the value.                                                        | `attribute: string, value: string`                       |
| **assertAttributeInclude** | Asserting that the element has the attribute and include the value.                                                | `attribute: string, value: string`                       |
| **assertFullUrl**          | Asserting if given url argument matches the url of the browser.                                                    | `url: string`                                            |
| **assertPartUrl**          | Asserting if the browser url contains the given url argument.                                                      | `url: string`                                            |
| **wait**                   | Wait for a number of milliseconds or wait for an aliased resource to resolve before moving on to the next command. | `time: number`                                           |

## Usage

<!-- START: human documentation usage -->

<!-- END: human documentation usage -->



## Edit this page on Github

* [Documentation on Github](https://github.com/baloise/design-system/blob/master/docs/src/components/components/bal-tabs.md)
* [Implementation on Github](https://github.com/baloise/design-system/blob/master/packages/components/src/components/bal-tabs)
* [Accessor on Github](https://github.com/baloise/design-system/blob/master/packages/testing/src/accessors/tabs.accessor.ts)

## Feedback

Help us improve this component by providing feedback, asking questions, and leaving any other comments on [GitHub](https://github.com/baloise/design-system/issues/new).

