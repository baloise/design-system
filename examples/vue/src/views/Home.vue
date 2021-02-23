<template>
  <div>
    <h1 class="title is-size-1">Filters</h1>
    <p>{{ '123' | balClaimNumber }}</p>
    <p>{{ '73001217169' | balClaimNumber }}</p>
    <p>{{ claimNumberFormatted }}</p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { balClaimNumber } from '@baloise/ui-library'

export default Vue.extend({
  name: 'Home',
  data: () => {
    return {
      claimNumber: '93001217169',
    }
  },
  computed: {
    claimNumberFormatted: function () {
      return balClaimNumber(this.claimNumber)
    },
  },
})
</script>
