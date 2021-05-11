<template>
  <div class="bal-app">
    <div class="columns is-multiline has-background-blue-light">
      <div class="column is-3 p-2" v-for="icon in icons" :key="icon">
        <div class="p-3 is-flex is-align-items-center is-flex-direction-column is-justify-content-center">
          <bal-icon :name="icon"></bal-icon>
          <span class="mt-1">{{ icon }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import icons from '../generated/icons.json'

export default {
  name: 'docs-icons',
  data() {
    return {
      icons,
    }
  },
}
</script>
