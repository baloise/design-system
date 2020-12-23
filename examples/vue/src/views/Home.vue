<template>
  <div>
    <h1 class="title size-1">Filters</h1>
    <p>{{ '123' | toClaimNumber }}</p>
    <p>{{ '73001217169' | toClaimNumber }}</p>
    <p>{{ claimNumberFormatted }}</p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'Home',
  data: () => {
    return {
      claimNumber: '93001217169',
    }
  },
  computed: {
    claimNumberFormatted: function() {
      return this.$balUtils.toClaimNumber(this.claimNumber)
    }
  }
})
</script>
