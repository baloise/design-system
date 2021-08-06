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

:::: tabs :options="{ useUrlFragment: false }"

::: tab Examples

## Basic

<ClientOnly><docs-demo-bal-dropdown-41></docs-demo-bal-dropdown-41></ClientOnly>


## Input

<ClientOnly><docs-demo-bal-dropdown-42></docs-demo-bal-dropdown-42></ClientOnly>


:::

::: tab Code

## Properties


| Attribute               | Description                                      | Type      | Default |
| :---------------------- | :----------------------------------------------- | :-------- | :------ |
| **expanded**            | If `true` the field spans over the whole width.  | `boolean` | `false` |
| **fixed-content-width** | If `true` the dropdown content has a fixed width | `boolean` | `false` |
| **is-active**           | If `true` the dropdown content is open.          | `boolean` | `false` |

## Events


| Event                  | Description                                                                     | Type      |
| :--------------------- | :------------------------------------------------------------------------------ | :-------- |
| **balCollapse**        | Listen when the dropdown opens or closes. Returns the current `isActive` value. | `boolean` |
| **balDropdownPrepare** | *Internal* - Use this to close unuesed dropdowns.                               | `string`  |

## Methods


| Method                  | Description                                         | Signature                                            |
| :---------------------- | :-------------------------------------------------- | :--------------------------------------------------- |
| **`close`**             | Closes the dropdown menu.                           | `close() => Promise<void>`                           |
| **`getContentElement`** | Returns the `HTMLDivElement` of the content element | `getContentElement() => Promise<HTMLElement | null>` |
| **`open`**              | Open the dropdown menu.                             | `open() => Promise<void>`                            |
| **`toggle`**            | Open or closes the dropdown.                        | `toggle() => Promise<void>`                          |

## Testing


DropdownAccessor is a helper object for E-2-E testing.
It maps the dropdown behaviour to the `bal-dropdown` ui component.

```typescript
import { dataTestSelector, DropdownAccessor } from '@baloise/design-system-components-testing'

describe('Dropdown', () => {
  it('should ...', () => {
     const dropdown = DropdownAccessor(dataTestSelector('dropdown-id')).get()
     dropdown.click()
 })
})
```

### Methods

| Method    | Description         | Arguments                                 |
| :-------- | :------------------ | :---------------------------------------- |
| **click** | Clicks the dropdown | `options?: Partial<Cypress.ClickOptions>` |

:::

::: tab Usage

<!-- START: human documentation usage -->

<!-- END: human documentation usage -->

:::


::::

## Edit this page on Github

* [Documentation on Github](https://github.com/baloise/design-system/blob/master/docs/src/components/components/bal-dropdown.md)
* [Implementation on Github](https://github.com/baloise/design-system/blob/master/packages/components/src/components/bal-dropdown)
* [Accessor on Github](https://github.com/baloise/design-system/blob/master/packages/testing/src/accessors/dropdown.accessor.ts)

## Feedback

Help us improve this component by providing feedback, asking questions, and leaving any other comments on [GitHub](https://github.com/baloise/design-system/issues/new).


<ClientOnly>
  <docs-component-script tag="balDropdown"></docs-component-script>
</ClientOnly>
