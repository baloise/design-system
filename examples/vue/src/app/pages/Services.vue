<template>
  <bal-card class="mt-6">
    <bal-card-content>
      <bal-heading space="bottom">Services</bal-heading>

      <bal-heading level="h2" space="top">Toast</bal-heading>
      <bal-button @click="createToast()">Create Toast</bal-button>

      <bal-heading level="h2" space="top">Snackbar</bal-heading>
      <bal-button @click="createSnackbar()">Create Snackbar</bal-button>
    </bal-card-content>
  </bal-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { balSnackbarController, balToastController } from '@baloise/design-system-components'

export default defineComponent({
  components: {},
  setup() {
    function createToast() {
      balToastController.create({ message: 'I am a nice Toast!' })
    }

    function createSnackbar() {
      balSnackbarController.create({
        icon: 'github',
        subject: 'Snackbar Title',
        message: 'I am the body of a nice snackbar',
      })
    }

    return {
      createToast,
      createSnackbar,
    }
  },
})
</script>
