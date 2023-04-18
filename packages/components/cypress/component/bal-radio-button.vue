<script setup lang="ts">
import { BalRadioGroup, BalRadio, BalRadioButton, BalStack } from '../../.storybook/vue/generated/components'
</script>

<template>
  <BalRadioGroup>
    <BalRadioButton>
      <BalStack>
        <BalRadio name="radio-test" value="1" label="Radio 1"></BalRadio>
      </BalStack>
    </BalRadioButton>
    <BalRadioButton>
      <BalStack>
        <BalRadio name="radio-test" value="2" label="Radio 2"></BalRadio>
      </BalStack>
    </BalRadioButton>
    <BalRadioButton>
      <BalStack>
        <BalRadio name="radio-test" value="3" label="Radio 3"></BalRadio>
      </BalStack>
    </BalRadioButton>
  </BalRadioGroup>
</template>
