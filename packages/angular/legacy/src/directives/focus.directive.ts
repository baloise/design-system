import { Directive } from '@angular/core'
import { BalAutoFocus as BalAutoFocusBase } from '@baloise/design-system-components-angular/common'

@Directive({
  selector: '[balAutoFocus]',
})
export class BalAutoFocus extends BalAutoFocusBase {}
