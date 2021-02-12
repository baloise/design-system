// generated file by .scripts/index.script.js

export * from './utils/index'

export { balBlobToUrl } from './filters/balBlobToUrl'
export { balCapitalize } from './filters/balCapitalize'
export { balClaimNumber } from './filters/balClaimNumber'
export { balCurrency } from './filters/balCurrency'
export { balDefaultString } from './filters/balDefaultString'
export { balFileSize } from './filters/balFileSize'
export { balHighlight } from './filters/balHighlight'
export { balJoinArray } from './filters/balJoinArray'
export { balLimit } from './filters/balLimit'
export { balOfferNumber } from './filters/balOfferNumber'
export { balPhoneNumber } from './filters/balPhoneNumber'

export interface BalUtilsStatic {
  balBlobToUrl: (value: Blob) => string
  balCapitalize: (value: string) => string
  balClaimNumber: (value: string) => string
  balCurrency: (value: number, currencySign: string, showZero: boolean, decimalLength: number) => string
  balDefaultString: (value: undefined, defaultString: string) => string
  balFileSize: (value: number) => string
  balHighlight: (value: string, search: string, cssClass: string) => string
  balJoinArray: (value: any[], delimiter: string) => string
  balLimit: (value: string, limit: number) => string
  balOfferNumber: (value: string, varianteNr: string) => string
  balPhoneNumber: (value: undefined) => string
}
