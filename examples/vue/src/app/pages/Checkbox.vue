<template>
  <BalCard class="has-margin-top">
    <BalCardTitle>Checkbox</BalCardTitle>
    <BalCardContent>
      <BalCheckbox v-model="checked">Label</BalCheckbox>
      <p>{{ checked }}</p>
    </BalCardContent>
  </BalCard>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import {
  BalCheckbox,
  BalCard,
  BalCardContent,
  BalCardTitle,
} from '@baloise/design-system-components-vue'

export default defineComponent({
  setup() {
    const checked = ref(true)

    return {
      checked,
    }
  },
  components: {
    BalCheckbox,
    BalCard,
    BalCardContent,
    BalCardTitle,
  },
})
</script>
