## Integration

Define the component for the content of the modal in a separate .vue file.

With the help of the `balModalController.dismiss()` we are able to close the modal.

**MyModal.vue**

```html
<script setup lang="ts">
  import { defineProps } from 'vue'
  import { balModalController, BalModalHeader, BalModalBody, BalButton } from '@baloise/design-system-components-vue'

  defineProps({
    firstName: { type: String },
    lastName: { type: String },
  })

  const closeModal = () => balModalController.dismiss()
</script>

<template>
  <BalModalHeader>Modal Title</BalModalHeader>
  <BalModalBody>
    <p>{{ firstName }} {{ lastName }}</p>
    <BalButtonGroup position="right" class="mt-medium">
      <BalButton color="link" @click="closeModal()">Cancel</BalButton>
      <BalButton color="primary" @click="closeModal()">Okay</BalButton>
    </BalButtonGroup>
  </BalModalBody>
</template>
```

From the main component we can easily create a modal with the `balModalController`.

**App.vue**

```html
<script setup lang="ts">
  import { balModalController, BalButton } from '@baloise/design-system-components-vue'
  import MyModal from '@/components/MyModal.vue'

  const openModal = async () => {
    const modal = await balModalController.create({
      component: MyModal,
      componentProps: {
        firstName: 'Peter',
        lastName: 'Parker',
      },
    })
    return modal.present()
  }
</script>

<template>
  <BalButton @click="openModal()">Open Modal</BalButton>
</template>
```
