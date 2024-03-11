/* eslint-disable @angular-eslint/directive-class-suffix */
import { Directive } from '@angular/core'
import { BalAutoFocus as BalAutoFocusBase } from '@baloise/ds-angular-common'

@Directive({
  selector: '[balAutoFocus]',
})
export class BalAutoFocus extends BalAutoFocusBase {}
