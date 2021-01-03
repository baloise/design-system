import { Pipe, PipeTransform } from '@angular/core';
import { balBlobToUrl } from '@baloise/ui-library-utils'
import { balCapitalize } from '@baloise/ui-library-utils'
import { balClaimNumber } from '@baloise/ui-library-utils'
import { balCurrency } from '@baloise/ui-library-utils'
import { balDefaultString } from '@baloise/ui-library-utils'
import { balFileSize } from '@baloise/ui-library-utils'
import { balHighlight } from '@baloise/ui-library-utils'
import { balJoinArray } from '@baloise/ui-library-utils'
import { balLimit } from '@baloise/ui-library-utils'
import { balOfferNumber } from '@baloise/ui-library-utils'
import { balPhoneNumber } from '@baloise/ui-library-utils'

@Pipe({
  name: 'balBlobToUrl'
})
export class BalBlobToUrlPipe implements PipeTransform {
  transform = balBlobToUrl
}

@Pipe({
  name: 'balCapitalize'
})
export class BalCapitalizePipe implements PipeTransform {
  transform = balCapitalize
}

@Pipe({
  name: 'balClaimNumber'
})
export class BalClaimNumberPipe implements PipeTransform {
  transform = balClaimNumber
}

@Pipe({
  name: 'balCurrency'
})
export class BalCurrencyPipe implements PipeTransform {
  transform = balCurrency
}

@Pipe({
  name: 'balDefaultString'
})
export class BalDefaultStringPipe implements PipeTransform {
  transform = balDefaultString
}

@Pipe({
  name: 'balFileSize'
})
export class BalFileSizePipe implements PipeTransform {
  transform = balFileSize
}

@Pipe({
  name: 'balHighlight'
})
export class BalHighlightPipe implements PipeTransform {
  transform = balHighlight
}

@Pipe({
  name: 'balJoinArray'
})
export class BalJoinArrayPipe implements PipeTransform {
  transform = balJoinArray
}

@Pipe({
  name: 'balLimit'
})
export class BalLimitPipe implements PipeTransform {
  transform = balLimit
}

@Pipe({
  name: 'balOfferNumber'
})
export class BalOfferNumberPipe implements PipeTransform {
  transform = balOfferNumber
}

@Pipe({
  name: 'balPhoneNumber'
})
export class BalPhoneNumberPipe implements PipeTransform {
  transform = balPhoneNumber
}

export const FILTERS = [
  BalBlobToUrlPipe,
  BalCapitalizePipe,
  BalClaimNumberPipe,
  BalCurrencyPipe,
  BalDefaultStringPipe,
  BalFileSizePipe,
  BalHighlightPipe,
  BalJoinArrayPipe,
  BalLimitPipe,
  BalOfferNumberPipe,
  BalPhoneNumberPipe
]