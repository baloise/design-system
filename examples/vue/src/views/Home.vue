<template>
  <div>
    <BalButton>Bubu</BalButton>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { BalButton } from '@baloise/ui-library-vue'

export default Vue.extend({
  name: 'Home',
  components: {
    BalButton,
  },
})
</script>
