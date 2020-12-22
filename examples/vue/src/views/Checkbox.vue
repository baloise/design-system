<template>
  <div>
    <h1>Checkbox</h1>
    <BalCheckbox v-model="checked" />
    <p>{{ checked }}</p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { BalCheckbox } from '@baloise/ui-library-vue'

export default Vue.extend({
  data: () => {
    const checked = true
    return { checked }
  },
  watch: {
    checked: (checked: boolean) => {
      console.log('BalCheckbox has changed', checked)
    }
  },
  components: {
    BalCheckbox,
  },
})
</script>
