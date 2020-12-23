import { toClaimNumber } from '@baloise/ui-library-utils'
import { PluginFunction } from 'vue'

export const addFilters: PluginFunction<any> = (_Vue): void => {
  _Vue.filter('toClaimNumber', toClaimNumber)
}
