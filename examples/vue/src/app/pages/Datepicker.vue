<template>
  <BalCard class="has-margin-top">
    <BalCardTitle>Datepicker</BalCardTitle>
    <BalCardContent>
      <BalDatepicker placeholder="DD.MM.YYYY" v-model="value" />
      <p>{{ value }}</p>
    </BalCardContent>
  </BalCard>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { newDateString, now } from '@baloise/design-system-components'
import {
  BalDatepicker,
  BalCard,
  BalCardContent,
  BalCardTitle,
} from '@baloise/design-system-components-vue'

export default defineComponent({
  setup() {
    const value = ref(newDateString(now()))

    return {
      value,
    }
  },
  components: {
    BalDatepicker,
    BalCard,
    BalCardContent,
    BalCardTitle,
  },
})
</script>
