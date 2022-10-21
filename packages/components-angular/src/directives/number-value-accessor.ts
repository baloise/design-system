import { Directive, ElementRef, forwardRef } from '@angular/core'
import { NG_VALUE_ACCESSOR } from '@angular/forms'

import { ValueAccessor } from './value-accessor'

@Directive({
  /* tslint:disable-next-line:directive-selector */
  selector: 'bal-number-input, bal-input-stepper',
  host: {
    '(balInput)': 'handleChangeEvent($event.detail)',
  },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NumericValueAccessor),
      multi: true,
    },
  ],
})
export class NumericValueAccessor extends ValueAccessor {
  constructor(el: ElementRef) {
    super(el)
  }
  registerOnChange(fn: (_: number | null) => void) {
    super.registerOnChange(value => {
      fn(value === '' ? null : parseFloat(value))
    })
  }
}
