# bal-modal

<!-- START: human documentation top -->

A Modal is a dialog that appears on top of the app's body, and must be dismissed by
the app before interaction can resume.

<!-- END: human documentation top -->

:::: tabs :options="{ useUrlFragment: false }"

::: tab Examples

## Basic

<ClientOnly><docs-demo-bal-modal-67></docs-demo-bal-modal-67></ClientOnly>


## Customize width

<ClientOnly><docs-demo-bal-modal-68></docs-demo-bal-modal-68></ClientOnly>


## Modal card style

<ClientOnly><docs-demo-bal-modal-69></docs-demo-bal-modal-69></ClientOnly>


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

## bal-modal-actions


# bal-modal-actions

`bal-modal-actions` is a child component of `bal-modal` that defines the area for the action button at the bottom of the modal.



## bal-modal-body


# bal-modal-body

`bal-modal-body` is a child component of `bal-modal` that contains the main content of the modal.



## bal-modal-footer


# bal-modal-footer

`bal-modal-footer` is a child component of `bal-modal` that normally contains some buttons for that please also use the `bal-modal-actions` component.


## bal-modal-header


# bal-modal-header

`bal-modal-header` is a child component of `bal-modal` that has the title of the modal.


:::

::: tab Usage

<!-- START: human documentation bottom -->

<!-- END: human documentation bottom -->

:::

::::

## Links

* [Documentation on Github](https://github.com/baloise/design-system/blob/master/docs/src/components/components/bal-modal.md)
* [Implementation on Github](https://github.com/baloise/design-system/blob/master/packages/components/src/components/bal-modal)

<ClientOnly>
  <docs-component-script tag="balModal"></docs-component-script>
</ClientOnly>
