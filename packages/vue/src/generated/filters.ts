// generated file by .scripts/filters.script.js

import { App } from 'vue'
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

export const applyFilters = (app: App) => {
  app.config.globalProperties.$balBlobToUrl = balBlobToUrl
  app.config.globalProperties.$balCapitalize = balCapitalize
  app.config.globalProperties.$balClaimNumber = balClaimNumber
  app.config.globalProperties.$balCurrency = balCurrency
  app.config.globalProperties.$balDefaultString = balDefaultString
  app.config.globalProperties.$balFileSize = balFileSize
  app.config.globalProperties.$balHighlight = balHighlight
  app.config.globalProperties.$balJoinArray = balJoinArray
  app.config.globalProperties.$balLimit = balLimit
  app.config.globalProperties.$balOfferNumber = balOfferNumber
  app.config.globalProperties.$balPhoneNumber = balPhoneNumber

}
