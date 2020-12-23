import { Pipe, PipeTransform } from '@angular/core';
import { toClaimNumber } from '@baloise/ui-library-utils'

@Pipe({
  name: 'toClaimNumber'
})
export class ToClaimNumberPipe implements PipeTransform {
  transform = toClaimNumber
}

export const FILTERS = [
  ToClaimNumberPipe
]