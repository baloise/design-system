import { Directive, ElementRef, forwardRef } from '@angular/core'
import { NG_VALUE_ACCESSOR } from '@angular/forms'

import { ValueAccessor } from './value-accessor'

@Directive({
  /* tslint:disable-next-line:directive-selector */
  selector: 'bal-input, bal-textarea, bal-input-slider',
  host: {
    '(balInput)': 'handleChangeEvent($event.detail)',
  },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextValueAccessor),
      multi: true,
    },
  ],
})
export class TextValueAccessor extends ValueAccessor {
  constructor(el: ElementRef) {
    super(el)
  }
}
