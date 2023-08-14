<script setup lang="ts">
import { BalCheckboxGroup, BalCheckbox } from '../support/utils'

defineProps({
  value: Array<String>,
})
</script>

<template>
  <BalCheckboxGroup control :value="value">
    <BalCheckbox name="checkbox-test" value="1" label="Checkbox 1"></BalCheckbox>
    <BalCheckbox name="checkbox-test" value="2" label="Checkbox 2"></BalCheckbox>
    <BalCheckbox name="checkbox-test" value="3" label="Checkbox 3"></BalCheckbox>
  </BalCheckboxGroup>
</template>
