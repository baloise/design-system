<script setup lang="ts">
import { BalRadioGroup, BalRadio } from '../support/utils'

defineProps({
  value: String,
})
</script>

<template>
  <BalRadioGroup :value="value">
    <BalRadio name="radio-test" value="1" label="Radio 1"></BalRadio>
    <BalRadio name="radio-test" value="2" label="Radio 2"></BalRadio>
    <BalRadio name="radio-test" value="3" label="Radio 3"></BalRadio>
  </BalRadioGroup>
</template>
