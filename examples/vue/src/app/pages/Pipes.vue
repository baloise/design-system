<template>
  <bal-card class="mt-6">
    <bal-card-content>
      <bal-heading space="bottom">Pipes / Filters</bal-heading>

      <p>
        balCapitalize('baloise') => <b>{{ capitalizedTitle }}</b>
      </p>

      <p>
        balClaimNumber('73001217169') =>
        <b>{{ formatedClaimNumber }}</b>
      </p>

      <p>
        balCurrency(1234567.89) => <b>{{ formatedAmount }}</b>
      </p>
    </bal-card-content>
  </bal-card>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { balCapitalize, balClaimNumber, balCurrency } from '@baloise/design-system-components'

export default defineComponent({
  components: {},
  setup() {
    const title = ref('baloise')
    const claimNumber = ref('73001217169')
    const amount = ref(1234567.89)

    const capitalizedTitle = computed(() => balCapitalize(title.value))
    const formatedClaimNumber = computed(() => balClaimNumber(claimNumber.value))
    const formatedAmount = computed(() => balCurrency(amount.value))

    return {
      title,
      capitalizedTitle,
      claimNumber,
      formatedClaimNumber,
      amount,
      formatedAmount,
    }
  },
})
</script>
