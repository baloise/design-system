<template>
  <bal-card class="mt-6">
    <bal-card-content>
      <bal-heading space="bottom">Modal</bal-heading>

      <bal-button @click="openModal()">Open Modal</bal-button>

      <bal-modal ref="modalRef">
        <bal-modal-header>Modal Title</bal-modal-header>
        <bal-modal-body>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat.
          </p>
        </bal-modal-body>
        <bal-modal-footer>
          <bal-modal-actions>
            <bal-button color="link" @click="closeModal()">Cancel</bal-button>
            <bal-button color="primary" @click="closeModal()">Okay</bal-button>
          </bal-modal-actions>
        </bal-modal-footer>
      </bal-modal>
    </bal-card-content>
  </bal-card>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { Components } from '@baloise/design-system-components'

export default defineComponent({
  components: {},
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
