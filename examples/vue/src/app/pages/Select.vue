<template>
  <BalCard class="has-margin-top">
    <BalCardTitle>Select</BalCardTitle>
    <BalCardContent>
      <BalSelect v-model="value" @bal-change="onChange($event)">
        <BalSelectOption
          v-for="opt in options"
          :key="opt.value"
          :label="opt.label"
          :value="opt.value"
        >
          {{ opt.label }}
        </BalSelectOption>
      </BalSelect>

      <p>{{ value }}</p>
      <BalButton @click="addYear()">Add Year</BalButton>
    </BalCardContent>
  </BalCard>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { NewBalOptionValue } from '@baloise/ui-library'

export default defineComponent({
  setup() {
    const value = ref(['v1997'])
    const options = ref([
      NewBalOptionValue('v1995', '1995'),
      NewBalOptionValue('v1996', '1996'),
      NewBalOptionValue('v1997', '1997'),
      NewBalOptionValue('v1998', '1998'),
      NewBalOptionValue('v1999', '1999'),
      NewBalOptionValue('v2000', '2000'),
    ])
    let year = 2001

    const onChange = (newValue: string[]) => {
      console.log('value', value.value)
      console.log('change', newValue)
    }

    const addYear = () => {
      options.value.push(NewBalOptionValue(`v${year}`, `${year}`))
      year = year + 1
    }

    return {
      value,
      options,
      addYear,
      onChange,
    }
  },
  // components: {
  //   BalSelect,
  //   BalSelectOption,
  //   BalCard,
  //   BalCardContent,
  //   BalCardTitle,
  //   BalButton,
  // },
})
</script>
