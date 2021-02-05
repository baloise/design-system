<template>
  <div>
    <h1 class="title is-size-1">Modal</h1>
    <BalButton @click="openModal()">Open Modal</BalButton>

    <BalModal ref="modal">
      <BalModalHeader>Modal Title</BalModalHeader>
      <BalModalBody>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat.
        </p>
      </BalModalBody>
      <BalModalFooter>
        <BalModalActions>
          <BalButton type="link" @click="closeModal()">Cancel</BalButton>
          <BalButton type="primary" @click="closeModal()">Okay</BalButton>
        </BalModalActions>
      </BalModalFooter>
    </BalModal>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {
  BalButton,
  BalModal,
  BalModalBody,
  BalModalFooter,
  BalModalHeader,
  BalModalActions,
} from '@baloise/ui-library-vue'

export default Vue.extend({
  methods: {
    openModal: function() {
      const modal = this.$refs.modal as HTMLBalModalElement
      modal.open()
    },
    closeModal: function() {
      const modal = this.$refs.modal as HTMLBalModalElement
      modal.close()
    },
  },
  components: {
    BalButton,
    BalModal,
    BalModalBody,
    BalModalFooter,
    BalModalHeader,
    BalModalActions,
  },
})
</script>
