import { Directive, ElementRef, Inject, InjectFlags, Injector, forwardRef } from '@angular/core'
import { NG_VALUE_ACCESSOR, NgControl } from '@angular/forms'

import { ValueAccessor } from './value-accessor'
import { BalConfigToken, BaloiseDesignSystemAngularConfig } from '../index'

@Directive({
  /* tslint:disable-next-line:directive-selector */
  selector: '<VALUE_ACCESSOR_SELECTORS>',
  host: {
    '(<VALUE_ACCESSOR_EVENT>)': 'handleChangeEvent($event)',
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
  constructor(el: ElementRef, @Inject(Injector) protected injector: Injector) {
    super(el)
  }

  override ngOnInit(): void {
    super.control = this.injector.get(NgControl, undefined, InjectFlags.Optional) as any
    super.config = this.injector.get(BalConfigToken, {}, InjectFlags.Optional) as BaloiseDesignSystemAngularConfig
    super.ngOnInit()
  }

  override registerOnChange(fn: (_: number | null) => void) {
    super.registerOnChange(value => {
      fn(value === '' ? null : parseFloat(value))
    })
  }
}
