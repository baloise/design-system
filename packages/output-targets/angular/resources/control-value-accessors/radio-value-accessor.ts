import { Directive, ElementRef, Injector, forwardRef } from '@angular/core'
import { NG_VALUE_ACCESSOR } from '@angular/forms'

import { ValueAccessor } from './value-accessor'

@Directive({
  /* tslint:disable-next-line:directive-selector */
  selector: '<VALUE_ACCESSOR_SELECTORS>',
  host: {
    '(<VALUE_ACCESSOR_EVENT>)': 'handleChangeEvent($event)',
  },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RadioValueAccessor),
      multi: true,
    },
  ],
})
export class RadioValueAccessor extends ValueAccessor {
  constructor(injector: Injector, el: ElementRef) {
    super(injector, el)
  }
}
