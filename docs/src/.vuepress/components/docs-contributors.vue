<template>
  <div class="features" style="border: none; margin-top: 0; padding-top: 0">
    <a
      class="feature"
      style="flex-basis: 20%; max-width: 20%"
      v-for="contributor in contributors"
      :key="contributor.name"
      :href="contributor.url"
    >
      <h2>
        <img style="width: 64px" :src="contributor.avatar" :alt="contributor.name" />
      </h2>
      <h4>{{ contributor.name }}</h4>
    </a>
  </div>
</template>

<script>
import { contributors } from '../generated/contributors'

export default {
  name: 'docs-component-script',
  data() {
    return {
      contributors,
    }
  },
}
</script>

<style scoped>
h2,
h4 {
  text-align: center;
  color: #2c3e50 !important;
}
img {
  border-radius: 100%;
}
</style>
