// generated file by .scripts/filters.script.js

import { PluginFunction } from 'vue'
import {
  balBlobToUrl,
  balCapitalize,
  balClaimNumber,
  balCurrency,
  balDefaultString,
  balFileSize,
  balHighlight,
  balJoinArray,
  balLimit,
  balOfferNumber,
  balPhoneNumber
} from '@baloise/ui-library'

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
