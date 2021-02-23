// generated file by .scripts/filters.script.js

import { App, inject } from 'vue'
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

  app.provide<typeof balBlobToUrl>('balBlobToUrl', balBlobToUrl)
  app.provide<typeof balCapitalize>('balCapitalize', balCapitalize)
  app.provide<typeof balClaimNumber>('balClaimNumber', balClaimNumber)
  app.provide<typeof balCurrency>('balCurrency', balCurrency)
  app.provide<typeof balDefaultString>('balDefaultString', balDefaultString)
  app.provide<typeof balFileSize>('balFileSize', balFileSize)
  app.provide<typeof balHighlight>('balHighlight', balHighlight)
  app.provide<typeof balJoinArray>('balJoinArray', balJoinArray)
  app.provide<typeof balLimit>('balLimit', balLimit)
  app.provide<typeof balOfferNumber>('balOfferNumber', balOfferNumber)
  app.provide<typeof balPhoneNumber>('balPhoneNumber', balPhoneNumber)
}

export const useBalBlobToUrl = (): typeof balBlobToUrl => inject<typeof balBlobToUrl>('balBlobToUrl', balBlobToUrl)
export const useBalCapitalize = (): typeof balCapitalize => inject<typeof balCapitalize>('balCapitalize', balCapitalize)
export const useBalClaimNumber = (): typeof balClaimNumber => inject<typeof balClaimNumber>('balClaimNumber', balClaimNumber)
export const useBalCurrency = (): typeof balCurrency => inject<typeof balCurrency>('balCurrency', balCurrency)
export const useBalDefaultString = (): typeof balDefaultString => inject<typeof balDefaultString>('balDefaultString', balDefaultString)
export const useBalFileSize = (): typeof balFileSize => inject<typeof balFileSize>('balFileSize', balFileSize)
export const useBalHighlight = (): typeof balHighlight => inject<typeof balHighlight>('balHighlight', balHighlight)
export const useBalJoinArray = (): typeof balJoinArray => inject<typeof balJoinArray>('balJoinArray', balJoinArray)
export const useBalLimit = (): typeof balLimit => inject<typeof balLimit>('balLimit', balLimit)
export const useBalOfferNumber = (): typeof balOfferNumber => inject<typeof balOfferNumber>('balOfferNumber', balOfferNumber)
export const useBalPhoneNumber = (): typeof balPhoneNumber => inject<typeof balPhoneNumber>('balPhoneNumber', balPhoneNumber)
