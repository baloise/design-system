<template>
  <BalCard class="has-large-margin-top">
    <BalCardTitle>Vue Starter Kit</BalCardTitle>
    <BalCardSubtitle data-test-id="count-message"> The button was called {{ count }} times! </BalCardSubtitle>
    <BalCardContent>
      Welcome to our Baloise Starter Kit for the Vue Framework.

      <hello-world :message="'Tony Stark'" @onConfirm="onConfirm($event)"></hello-world>
    </BalCardContent>
  </BalCard>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import HelloWorld, { onConfirm } from '../components/HelloWorld.vue'

export default defineComponent({
  components: { HelloWorld },
  setup() {
    const count = ref(0)

    const onConfirm: onConfirm = (value: string) => {
      console.log('onConfirm', value)
      count.value = count.value + 1
    }

    return {
      count,
      onConfirm,
    }
  },
})
</script>
