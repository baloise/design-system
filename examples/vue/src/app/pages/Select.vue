<template>
  <BalCard class="has-margin-top">
    <BalCardTitle>Select</BalCardTitle>
    <BalCardContent>
      <BalSelect v-model="value" @bal-change="onChange($event)">
        <BalSelectOption label="Label 1" value="1">Label 1</BalSelectOption>
        <BalSelectOption label="Label 2" value="2">Label 2</BalSelectOption>
        <BalSelectOption label="Label 3" value="3">Label 3</BalSelectOption>
        <BalSelectOption label="Label 4" value="4">Label 4</BalSelectOption>
      </BalSelect>
      <p>{{ value }}</p>
    </BalCardContent>
  </BalCard>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import {
  BalSelect,
  BalSelectOption,
  BalCard,
  BalCardContent,
  BalCardTitle,
} from '@baloise/ui-library-vue'

export default defineComponent({
  setup() {
    const value = ref(['2'])

    const onChange = (newValue: string[]) => {
      console.log('value', value.value)
      console.log('change', newValue)
    }

    return {
      value,
      onChange,
    }
  },
  components: {
    BalSelect,
    BalSelectOption,
    BalCard,
    BalCardContent,
    BalCardTitle,
  },
})
</script>
