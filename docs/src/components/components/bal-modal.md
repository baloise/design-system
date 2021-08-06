---
sidebarDepth: 0
---

# bal-modal


<!-- START: human documentation top -->

A Modal is a dialog that appears on top of the app's body, and must be dismissed by
the app before interaction can resume.

<!-- END: human documentation top -->

:::: tabs :options="{ useUrlFragment: false }"

::: tab Examples

## Basic

<ClientOnly><docs-demo-bal-modal-70></docs-demo-bal-modal-70></ClientOnly>


## Customize width

<ClientOnly><docs-demo-bal-modal-71></docs-demo-bal-modal-71></ClientOnly>


## Modal card style

<ClientOnly><docs-demo-bal-modal-72></docs-demo-bal-modal-72></ClientOnly>


:::

::: tab Code

## Properties


| Attribute | Description                                                                                     | Type      | Default |
| :-------- | :---------------------------------------------------------------------------------------------- | :-------- | :------ |
| **card**  | Marks this modal as card-style modal, i.e. having visual lines separating head, body, and foot. | `boolean` | `false` |

## Methods


| Method      | Description       | Signature                  |
| :---------- | :---------------- | :------------------------- |
| **`close`** | Closes the modal. | `close() => Promise<void>` |
| **`open`**  | Opens the modal.  | `open() => Promise<void>`  |


:::

::: tab Usage

<!-- START: human documentation usage -->

<!-- END: human documentation usage -->

:::


::::

## Edit this page on Github

* [Documentation on Github](https://github.com/baloise/design-system/blob/master/docs/src/components/components/bal-modal.md)
* [Implementation on Github](https://github.com/baloise/design-system/blob/master/packages/components/src/components/bal-modal)

## Feedback

Help us improve this component by providing feedback, asking questions, and leaving any other comments on [GitHub](https://github.com/baloise/design-system/issues/new).


<ClientOnly>
  <docs-component-script tag="balModal"></docs-component-script>
</ClientOnly>
