import { Directive, ElementRef, Inject, Injector, forwardRef } from '@angular/core'
import { NG_VALUE_ACCESSOR, NgControl } from '@angular/forms'
import { BalConfigToken, BaloiseDesignSystemAngularConfig } from '../index'
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
      useExisting: forwardRef(() => SelectValueAccessor),
      multi: true,
    },
  ],
})
export class SelectValueAccessor extends ValueAccessor {
  constructor(el: ElementRef, @Inject(Injector) protected injector: Injector) {
    super(el)
  }

  override ngOnInit(): void {
    super.control = this.injector.get(NgControl, undefined, { optional: true }) as any
    super.config = this.injector.get(BalConfigToken, {}, { optional: true }) as BaloiseDesignSystemAngularConfig
    super.ngOnInit()
  }
}
