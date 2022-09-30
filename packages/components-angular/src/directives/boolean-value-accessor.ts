import { Directive, ElementRef, forwardRef } from '@angular/core'
import { NG_VALUE_ACCESSOR } from '@angular/forms'

import { ValueAccessor } from './value-accessor'

@Directive({
  /* tslint:disable-next-line:directive-selector */
  selector: 'bal-popover, bal-accordion',
  host: {
    '(balChange)': 'handleChangeEvent($event.detail)',
    '(balBlur)': 'handleBlurEvent($event.detail)',
    '(focusout)': 'onTouched()',
  },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => BooleanValueAccessor),
      multi: true,
    },
  ],
})
export class BooleanValueAccessor extends ValueAccessor {
  constructor(el: ElementRef) {
    super(el)
  }
  writeValue(value: any) {
    this.el.nativeElement.value = this.lastValue = value == null ? false : value
  }
}
