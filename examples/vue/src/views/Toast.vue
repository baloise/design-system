<template>
  <div>
    <h1 class="title is-size-1">Toast</h1>
    <BalButton @click="createToast()">Create Toast</BalButton>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { BalButton } from '@baloise/ui-library-vue'

export default Vue.extend({
  methods: {
    createToast: function () {
      this.$balToast.create({
        message: 'Message',
      })
    },
  },
  components: {
    BalButton,
  },
})
</script>
