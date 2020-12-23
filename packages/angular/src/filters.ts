import { Pipe, PipeTransform } from '@angular/core';
import { toClaimNumber } from '@baloise/ui-library-utils'

@Pipe({
  name: 'toClaimNumber'
})
export class BalToClaimNumberPipe implements PipeTransform {
  transform = toClaimNumber
}

export const FILTERS = [
  BalToClaimNumberPipe
]