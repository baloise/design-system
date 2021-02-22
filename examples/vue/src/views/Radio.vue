<template>
  <div>
    <h1 class="title is-size-1">Radio</h1>
    <BalRadioGroup v-model="value">
      <BalRadio label="Label 1" name="radio-example" value="1"></BalRadio>
      <BalRadio label="Label 2" name="radio-example" value="2"></BalRadio>
      <BalRadio label="Label 3" name="radio-example" value="3"></BalRadio>
      <BalRadio label="Label Disabled" name="radio-example" value="4" disabled></BalRadio>
    </BalRadioGroup>
    <p>{{ value }}</p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { BalRadio, BalRadioGroup } from '@baloise/ui-library-vue-2'

export default Vue.extend({
  data: () => {
    const value = 2
    return { value }
  },
  watch: {
    value: (value: boolean) => {
      console.log('BalRadioGroup has changed', value)
    },
  },
  components: {
    BalRadioGroup,
    BalRadio,
  },
})
</script>
