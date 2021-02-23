<template>
  <div>
    <h1 class="title is-size-1">Toast</h1>
    <BalButton @click="createToast()">Create Toast</BalButton>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { BalButton } from '@baloise/ui-library-vue-2'

export default Vue.extend({
  methods: {
    createToast: function () {
      // this.$createToast({
      //   message: 'Message',
      // })
      // // this.$balToast.create({
      //   message: 'Message',
      // })
    },
  },
  components: {
    BalButton,
  },
})
</script>
