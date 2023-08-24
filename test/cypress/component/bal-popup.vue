<script setup lang="ts">
import { BalPopup, BalButton } from '../../.storybook/vue/generated/components'

defineProps({
  active: Boolean,
  summaryTrigger: Boolean,
})

const emit = defineEmits(['balChange'])
</script>

<template>
  <div>
    <BalButton id="trigger" bal-popup="popup-test">Button</BalButton>
    <BalPopup id="popup-test" label="My Title" closable @bal-change="emit('balChange')">TEST CONTENT</BalPopup>
  </div>
</template>
