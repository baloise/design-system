import { PluginFunction } from 'vue'
import { toClaimNumber } from '@baloise/ui-library-utils'

export const addFilters: PluginFunction<any> = (_Vue): void => {
  _Vue.filter('toClaimNumber', toClaimNumber)
}
