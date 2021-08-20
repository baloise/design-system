// generated file by .scripts/filters.index.js

import { PhoneNumber } from './balPhoneNumber'

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
export { balPhoneNumber, PhoneNumber } from './balPhoneNumber'

export interface BalFiltersStatic {
  balBlobToUrl: (value: Blob) => string
  balCapitalize: (value: string | any | undefined) => string
  balClaimNumber: (value: string | undefined | any | number) => string
  balCurrency: (value: number | any, currencySign: string, showZero: boolean, decimalLength: number) => string
  balDefaultString: (value: string | undefined | any, defaultString: string) => string
  balFileSize: (value: number) => string
  balHighlight: (value: string, search: string, cssClass: string) => string
  balJoinArray: (value: any | undefined | any, delimiter: string) => string
  balLimit: (value: string | undefined | any, limit: number) => string
  balOfferNumber: (value: string | any | undefined, varianteNr: string) => string
  balPhoneNumber: (value: string | PhoneNumber | any | undefined) => string
}
