<template>
  <div>
    <h1>Select</h1>
    <BalSelect :value="value" typeahead placeholder @balChange="valueChanged($event)">
      <BalSelectOption label="Label 1" value="1">Label 1</BalSelectOption>
      <BalSelectOption label="Label 2" value="2">Label 2</BalSelectOption>
      <BalSelectOption label="Label 3" value="3">Label 3</BalSelectOption>
      <BalSelectOption label="Label 4" value="4">Label 4</BalSelectOption>
    </BalSelect>
    <p>{{ value }}</p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { BalSelect, BalSelectOption } from '@baloise/ui-library-vue'

export default Vue.extend({
  data: () => {
    const value = ['1']
    return { value }
  },
  methods: {
    valueChanged: function(val: any) {
      this.value = val
    },
  },
  watch: {
    value: (value: Date) => {
      console.log('BalSelect has changed', value)
    },
  },
  components: {
    BalSelect,
    BalSelectOption,
  },
})
</script>
