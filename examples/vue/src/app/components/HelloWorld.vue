<template>
  <h2 class="title is-size-2">{{ title }}</h2>
  <p>{{ message }}</p>
  <BalButton @click="onClick($event)">Click Me</BalButton>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { BalButton } from '@baloise/design-system-components-vue'

export type onConfirm = (value: string) => void

type HelloWorldEmitters = {
  onConfirm: onConfirm
}

export default defineComponent({
  props: {
    message: {
      type: String,
      required: true,
    },
  },
  emits: {
    onConfirm: () => true,
  } as HelloWorldEmitters,
  setup(props, { emit }) {
    const title = computed(() => 'Hello ' + props.message)

    const onClick = () => {
      emit('onConfirm', props.message)
    }

    return { title, onClick }
  },
  components: { BalButton },
})
</script>
