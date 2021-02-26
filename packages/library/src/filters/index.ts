// generated file by .scripts/filters.index.js

export { balBlobToUrl } from './balBlobToUrl'
export { balCapitalize } from './balCapitalize'
export { balClaimNumber } from './balClaimNumber'
export { balCurrency } from './balCurrency'
export { balDefaultString } from './balDefaultString'
export { balFileSize } from './balFileSize'
export { balHighlight } from './balHighlight'
export { balJoinArray } from './balJoinArray'
export { balLimit } from './balLimit'
export { balOfferNumber } from './balOfferNumber'
export { balPhoneNumber } from './balPhoneNumber'

export interface BalFiltersStatic {
  balBlobToUrl: (value: Blob) => string
  balCapitalize: (value: string | null | undefined) => string
  balClaimNumber: (value: string | undefined | null | number) => string
  balCurrency: (value: number | null, currencySign: string, showZero: boolean, decimalLength: number) => string
  balDefaultString: (value: string | undefined | null, defaultString: string) => string
  balFileSize: (value: number) => string
  balHighlight: (value: string, search: string, cssClass: string) => string
  balJoinArray: (value: string[] | undefined | null, delimiter: string) => string
  balLimit: (value: string | undefined | null, limit: number) => string
  balOfferNumber: (value: string | null | undefined, varianteNr: string) => string
  balPhoneNumber: (value: string | PhoneNumber | null | undefined) => string
}
