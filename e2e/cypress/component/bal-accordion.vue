<script setup lang="ts">
import {
  BalAccordion,
  BalAccordionDetails,
  BalAccordionSummary,
  BalAccordionTrigger,
  BalStack,
  BalContent,
  BalLabel,
} from '../support/utils'

defineProps({
  active: Boolean,
  summaryTrigger: Boolean,
})
</script>

<template>
  <BalAccordion :active="active">
    <BalAccordionSummary :trigger="summaryTrigger">
      <BalStack>
        <BalContent>
          <BalLabel>SUMMARY LABEL</BalLabel>
        </BalContent>
        <BalAccordionTrigger></BalAccordionTrigger>
      </BalStack>
    </BalAccordionSummary>
    <BalAccordionDetails> TEST CONTENT </BalAccordionDetails>
  </BalAccordion>
</template>
