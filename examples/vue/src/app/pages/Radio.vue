<template>
  <BalCard class="has-margin-top">
    <BalCardTitle>Radio</BalCardTitle>
    <BalCardContent>
      <BalRadioGroup v-model="value">
        <BalRadio label="Label 1" name="radio-example" value="1"></BalRadio>
        <BalRadio label="Label 2" name="radio-example" value="2"></BalRadio>
        <BalRadio label="Label 3" name="radio-example" value="3"></BalRadio>
        <BalRadio
          label="Label Disabled"
          name="radio-example"
          value="4"
          disabled
        ></BalRadio>
      </BalRadioGroup>
      <p>{{ value }}</p>
    </BalCardContent>
  </BalCard>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import {
  BalRadio,
  BalRadioGroup,
  BalCard,
  BalCardContent,
  BalCardTitle,
} from '@baloise/ui-library-vue'

export default defineComponent({
  setup() {
    const value = ref(2)

    return {
      value,
    }
  },
  components: {
    BalRadio,
    BalRadioGroup,
    BalCard,
    BalCardContent,
    BalCardTitle,
  },
})
</script>
