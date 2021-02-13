// generated file by .scripts/filters.script.js

import { PluginFunction } from 'vue'
import { balBlobToUrl } from '@baloise/ui-library'
import { balCapitalize } from '@baloise/ui-library'
import { balClaimNumber } from '@baloise/ui-library'
import { balCurrency } from '@baloise/ui-library'
import { balDefaultString } from '@baloise/ui-library'
import { balFileSize } from '@baloise/ui-library'
import { balHighlight } from '@baloise/ui-library'
import { balJoinArray } from '@baloise/ui-library'
import { balLimit } from '@baloise/ui-library'
import { balOfferNumber } from '@baloise/ui-library'
import { balPhoneNumber } from '@baloise/ui-library'

export const addFilters: PluginFunction<any> = (_Vue): void => {
  _Vue.filter('balBlobToUrl', balBlobToUrl)
  _Vue.filter('balCapitalize', balCapitalize)
  _Vue.filter('balClaimNumber', balClaimNumber)
  _Vue.filter('balCurrency', balCurrency)
  _Vue.filter('balDefaultString', balDefaultString)
  _Vue.filter('balFileSize', balFileSize)
  _Vue.filter('balHighlight', balHighlight)
  _Vue.filter('balJoinArray', balJoinArray)
  _Vue.filter('balLimit', balLimit)
  _Vue.filter('balOfferNumber', balOfferNumber)
  _Vue.filter('balPhoneNumber', balPhoneNumber)
}
