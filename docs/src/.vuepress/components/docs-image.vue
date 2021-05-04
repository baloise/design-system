<template>
  <p style="text-align: center">
    <img :src="link" :alt="text" />
  </p>
</template>

<script>
export default {
  name: 'docs-image',
  props: {
    link: String,
    text: String,
  },
}
</script>
