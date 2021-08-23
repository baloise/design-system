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

<ClientOnly><docs-demo-bal-modal-70></docs-demo-bal-modal-70></ClientOnly>


### Customize width

<ClientOnly><docs-demo-bal-modal-71></docs-demo-bal-modal-71></ClientOnly>


### Modal card style

<ClientOnly><docs-demo-bal-modal-72></docs-demo-bal-modal-72></ClientOnly>



## Code

<!-- START: human documentation code -->

::: danger <img src="https://angular.io/assets/images/logos/angular/angular.svg" data-origin="https://angular.io/assets/images/logos/angular/angular.svg" alt="angular" style="width: 32px">Angular

Simply define the modal layout in your custom component and add the element reference with `#modal` to the model element.

```html{3}
<bal-button (click)="openModal()">Open Modal</bal-button>

<bal-modal #modal>
  <bal-modal-header>Modal Title</bal-modal-header>
  <bal-modal-body>
    <p>...</p>
  </bal-modal-body>
  <bal-modal-footer>
    <bal-modal-actions>
      <bal-button color="link" (click)="closeModal()">Cancel</bal-button>
      <bal-button color="primary" (click)="closeModal()">Okay</bal-button>
    </bal-modal-actions>
  </bal-modal-footer>
</bal-modal>
```

In your component register the element reference with `@ViewChild('modal')`. With that reference you are able to access the methods of the modal component.

```typescript{1,2,9,12,16}
import { Component, ViewChild } from '@angular/core'
import type { Components } from '@baloise/design-system-components'

@Component({
  selector: 'app-modal',
  templateUrl: './modal-page.component.html',
})
export class ModalPageComponent {
  @ViewChild('modal') modal!: Components.BalModal

  openModal() {
    this.modal.open()
  }

  closeModal() {
    this.modal.close()
  }
}

```

:::

::: tip <img src="https://vuejs.org/images/logo.png" data-origin="https://vuejs.org/images/logo.png" alt="angular" style="width: 32px">Vue

Simply define the modal layout in your custom component and add the element reference with `ref="modalRef"` to the model element.
In your component register the element reference with `const modalRef = ref<{ $el: Components.BalModal }>()`. With that reference you are able to access the methods of the modal component.

```vue{4,20,25,28,32,36}
<template>
  <BalButton @click="openModal()">Open Modal</BalButton>

  <BalModal ref="modalRef">
    <BalModalHeader>Modal Title</BalModalHeader>
    <BalModalBody>
      <p>...</p>
    </BalModalBody>
    <BalModalBooter>
      <BalModalActions>
        <BalButton color="link" @click="closeModal()">Cancel</BalButton>
        <BalButton color="primary" @click="closeModal()">Okay</BalButton>
      </BalModalActions>
    </BalModalBooter>
  </BalModal>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { Components } from '@baloise/design-system-components'

export default defineComponent({
  components: { ... },
  setup() {
    const modalRef = ref<{ $el: Components.BalModal }>()

    function openModal() {
      modalRef.value?.$el.open()
    }

    function closeModal() {
      modalRef.value?.$el.close()
    }

    return {
      modalRef,
      openModal,
      closeModal,
    }
  },
})
</script>
```

:::

<!-- END: human documentation code -->

### Properties


| Attribute      | Description                                                                                     | Type      | Default |
| :------------- | :---------------------------------------------------------------------------------------------- | :-------- | :------ |
| **card**       | Marks this modal as card-style modal, i.e. having visual lines separating head, body, and foot. | `boolean` | `false` |
| **no-overlay** | If `true` the modal does not run with a background overlay.                                     | `boolean` | `false` |

### Methods


| Method      | Description       | Signature                  |
| :---------- | :---------------- | :------------------------- |
| **`close`** | Closes the modal. | `close() => Promise<void>` |
| **`open`**  | Opens the modal.  | `open() => Promise<void>`  |


## Usage

<!-- START: human documentation usage -->

<!-- END: human documentation usage -->



## Edit this page on Github

* [Documentation on Github](https://github.com/baloise/design-system/blob/master/docs/src/components/components/bal-modal.md)
* [Implementation on Github](https://github.com/baloise/design-system/blob/master/packages/components/src/components/bal-modal)

## Feedback

Help us improve this component by providing feedback, asking questions, and leaving any other comments on [GitHub](https://github.com/baloise/design-system/issues/new).


<ClientOnly>
  <docs-component-script tag="balModal"></docs-component-script>
</ClientOnly>
