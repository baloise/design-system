<template>
  <BalCard class="has-margin-top">
    <BalCardTitle>Radio</BalCardTitle>
    <BalCardContent>
      <BalRadioGroup v-model="value">
        <BalRadio name="radio-example" value="1">Label 1</BalRadio>
        <BalRadio name="radio-example" value="2">Label 2</BalRadio>
        <BalRadio name="radio-example" value="3">Label 3</BalRadio>
        <BalRadio name="radio-example" value="4" disabled>
          Label Disabled
        </BalRadio>
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
} from '@baloise/design-system-components-vue'

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
