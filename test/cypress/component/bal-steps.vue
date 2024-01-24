<script setup lang="ts">
import { BalSteps, BalStepItem } from '../support/utils'
</script>
<template>
  <BalSteps>
    <BalStepItem value="tab-a" label="Tab A" done>Content of Tab A</BalStepItem>
    <BalStepItem value="tab-b" label="Tab B" failed>Content of Tab B</BalStepItem>
    <BalStepItem value="tab-c" label="Tab C" active>Content of Tab C</BalStepItem>
    <BalStepItem value="tab-d" label="Tab D" invisible>Hidden Content of Tab D</BalStepItem>
    <BalStepItem value="tab-e" label="Tab E" disabled>Content of Tab E</BalStepItem>
  </BalSteps>
</template>
