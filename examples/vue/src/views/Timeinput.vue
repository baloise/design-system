<template>
  <div>
    <h1>Timeinput</h1>
    <BalTimeinput v-model="value"/>
    <p>{{ value }}</p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { BalTimeinput } from '@baloise/ui-library-next-vue'

export default Vue.extend({
  data: () => {
    const value = '08:00'
    return { value }
  },
  watch: {
    value: (value: Date) => {
      console.log('BalTimeinput has changed', value)
    },
  },
  components: {
    BalTimeinput,
  },
})
</script>
