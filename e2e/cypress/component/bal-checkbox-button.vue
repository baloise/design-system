<script setup lang="ts">
import { BalCheckboxGroup, BalCheckboxButton, BalCheckbox, BalStack } from '../support/utils'

defineProps({
  value: Array<String>,
})
</script>

<template>
  <BalCheckboxGroup control :value="value">
    <BalCheckboxButton>
      <BalStack>
        <BalCheckbox name="checkbox-test" value="1" label="Checkbox 1"></BalCheckbox>
      </BalStack>
    </BalCheckboxButton>
    <BalCheckboxButton>
      <BalStack>
        <BalCheckbox name="checkbox-test" value="2" label="Checkbox 2"></BalCheckbox>
      </BalStack>
    </BalCheckboxButton>
    <BalCheckboxButton>
      <BalStack>
        <BalCheckbox name="checkbox-test" value="3" label="Checkbox 3"></BalCheckbox>
      </BalStack>
    </BalCheckboxButton>
  </BalCheckboxGroup>
</template>
