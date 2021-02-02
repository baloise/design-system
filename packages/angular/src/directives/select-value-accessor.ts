import { Directive, ElementRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { ValueAccessor } from './value-accessor';

@Directive({
  /* tslint:disable-next-line:directive-selector */
  selector: 'bal-radio-group, bal-select, bal-datepicker, bal-timeinput',
  host: {
    '(balChange)': 'handleChangeEvent($event)'
  },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: SelectValueAccessor,
      multi: true
    }
  ]
})
export class SelectValueAccessor extends ValueAccessor {
  constructor(el: ElementRef) {
    super(el);
  }
}
