## Integration Vue

Snackbar can be created with the balSnackbarController. The default duration is 5000 milliseconds. The create method return the instance of the created snackbar, so there you can access all the props and methods of it.

```html
<script setup lang="ts">
  import { BalApp, BalButton } from '@baloise/design-system-components-vue'
  import { balSnackbarController } from '@baloise/design-system-components'

  let mySnackbar?: HTMLBalSnackbarElement>

  function createSnackbar() {
    mySnackbar = balSnackbarController.create({
      message: 'Message',
    })
  }

  async function closeSnackbar() {
    await mySnackbar.close()
  }
</script>

<template>
  <BalApp>
    <BalButton @click="createSnackbar()">Create Snackbar</BalButton>
  </BalApp>
</template>
```
