<template>
  <div>
    <h1 class="title is-size-1">Datepicker</h1>
    <BalDatepicker placeholder="DD.MM.YYYY" v-model="value" />
    <p>{{ value }}</p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { balDateUtil } from '@baloise/ui-library'
import { BalDatepicker } from '@baloise/ui-library-vue-2'

export default Vue.extend({
  data: () => {
    const value = balDateUtil.newDateString(balDateUtil.now())
    return { value }
  },
  watch: {
    value: (value: string) => {
      console.log('BalDatepicker has changed', value)
    },
  },
  components: {
    BalDatepicker,
  },
})
</script>
