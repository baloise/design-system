# bal-tabs

Tabs are used to structure the information in sub section on the same page.

<!-- START: human documentation top -->

Tabs are used to structure the information in sub section on the same page.

<!-- END: human documentation top -->

:::: tabs :options="{ useUrlFragment: false }"

::: tab Examples

## Main Navigation

<ClientOnly><docs-demo-bal-tabs-100></docs-demo-bal-tabs-100></ClientOnly>


## Sub Navigation

<ClientOnly><docs-demo-bal-tabs-101></docs-demo-bal-tabs-101></ClientOnly>


## Expanded

<ClientOnly><docs-demo-bal-tabs-102></docs-demo-bal-tabs-102></ClientOnly>


## Steps

<ClientOnly><docs-demo-bal-tabs-103></docs-demo-bal-tabs-103></ClientOnly>


## O-Steps

<ClientOnly><docs-demo-bal-tabs-104></docs-demo-bal-tabs-104></ClientOnly>


:::

::: tab Code

## Properties

| Attribute        | Description                                       | Type                           | Default  |
| :--------------- | :------------------------------------------------ | :----------------------------- | :------- |
| **action**       | If `true` a acation button is added to the right  | `boolean`                      | `false`  |
| **action-label** | Label for the action button                       | `string`                       | `''`     |
| **clickable**    | If `true` the tabs or steps can be clicked.       | `boolean`                      | `true`   |
| **expanded**     | If `true` the field expands over the whole width. | `boolean`                      | `false`  |
| **interface**    | Defines the layout of the tabs.                   | `"o-steps" , "steps" , "tabs"` | `'tabs'` |
| **rounded**      | If you want the rounded tab style.                | `boolean`                      | `false`  |

## Events

| Event              | Description                                | Type           |
| :----------------- | :----------------------------------------- | :------------- |
| **balActionClick** | Emitted when the action button has clicked | `MouseEvent`   |
| **balTabChange**   | Emitted when the changes has finished.     | `BalTabOption` |

## Methods

| Method       | Description                                               | Signature                                    |
| :----------- | :-------------------------------------------------------- | :------------------------------------------- |
| **`select`** | Go to tab with the given value                            | `select(tab: BalTabOption) => Promise<void>` |
| **`sync`**   | *Internal* - Rerenders the tabs with their given settings | `sync() => Promise<void>`                    |

## bal-tab-item


# bal-tab-item

`bal-tab-item` is a child component of `bal-tabs`.

### Properties

| Attribute    | Description                                             | Type      | Default |
| :----------- | :------------------------------------------------------ | :-------- | :------ |
| **active**   | Tell's if the tab is active and the content is visible. | `boolean` | `false` |
| **bubble**   | If `true` a small red bubble is added to the tab.       | `boolean` | `false` |
| **disabled** | If `true` the tab is disabled.                          | `boolean` | `false` |
| **done**     | If `true` the step is marked as done.                   | `boolean` | `false` |
| **failed**   | If `true` the step is marked as failed.                 | `boolean` | `false` |
| **href**     | Link to path.                                           | `string`  | `''`    |
| **label**    | Label for the tab.                                      | `string`  | `''`    |
| **prevent**  | Tell's if the linking is done by a router.              | `boolean` | `false` |
| **value**    | This is the key of the tab.                             | `string`  | `''`    |

### Events

| Event           | Description                               | Type         |
| :-------------- | :---------------------------------------- | :----------- |
| **balNavigate** | Emitted when the link element has clicked | `MouseEvent` |

### Methods

| Method           | Description                               | Signature                                     |
| :--------------- | :---------------------------------------- | :-------------------------------------------- |
| **`getOptions`** | Options of the tab like label, value etc. | `getOptions() => Promise<BalTabOption>`       |
| **`setActive`**  | Sets the tab active.                      | `setActive(active: boolean) => Promise<void>` |

:::

::: tab Testing

## TabsAccessor

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

:::

::: tab Usage

<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->

:::

::::

## Links

* [Documentation on Github](https://github.com/baloise/design-system/blob/master/docs/src/components/components/bal-tabs.md)
* [Implementation on Github](https://github.com/baloise/design-system/blob/master/packages/components/src/components/bal-tabs)
* [Accessor on Github](https://github.com/baloise/design-system/blob/master/packages/testing/src/accessors/tabs.accessor.ts)
