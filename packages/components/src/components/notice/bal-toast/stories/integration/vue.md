## Integration Vue

Toast can be created with the `balToastController`. The default duration is 5000 milliseconds.
The `create` method return the instance of the created toast, so there you can access all the props and methods of it.

```html
<script setup lang="ts">
  import { BalApp, BalButton } from '@baloise/design-system-components-vue'
  import { balToastController } from '@baloise/design-system-components'

  let myToast?: HTMLBalToastElement>

  function createToast() {
    myToast = balToastController.create({
      message: 'Message',
    })
  }

  async function closeToast() {
    await myToast.close()
  }
</script>

<template>
  <BalApp>
    <BalButton @click="createToast()">Create Toast</BalButton>
  </BalApp>
</template>
```
