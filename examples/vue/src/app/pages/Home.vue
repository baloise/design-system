<template>
  <BalCard class="has-large-margin-top">
    <BalCardTitle>Vue Starter Kit</BalCardTitle>
    <BalCardSubtitle data-test-id="count-message">
      The button was called {{ count }} times!
    </BalCardSubtitle>
    <BalCardContent>
      Welcome to our Baloise Starter Kit for the Vue Framework.

      <hello-world
        :message="'Tony Stark'"
        @onConfirm="onConfirm($event)"
      ></hello-world>
    </BalCardContent>
    <BalCardActions>
      <BalButton data-test-id="count-button" color="primary" @click="count++">
        Click me
      </BalButton>
    </BalCardActions>
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
      alert(value)
    }

    return {
      count,
      onConfirm,
    }
  },
})
</script>
