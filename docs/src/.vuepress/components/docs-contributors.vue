<template>
  <div class="features" style="border: none; margin-top: 0; padding-top: 0">
    <a class="feature" v-for="contributor in contributors" :key="contributor.name" :href="contributor.url">
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

.home .features {
  justify-content: flex-start !important;
  flex-direction: row;
}

.feature {
  flex-basis: 50% !important;
  max-width: 50% !important;
}

@media only screen and (min-width: 420px) {
  .feature {
    flex-basis: 20% !important;
    max-width: 20% !important;
  }
}
</style>
