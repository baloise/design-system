import { Directive, forwardRef } from '@angular/core'
import { NG_VALUE_ACCESSOR } from '@angular/forms'
import { DsValueAccessor } from './value-accessor'

/**
 * `ControlValueAccessor` for text-shaped form components (value: `string | null`, change event: `dsChange`).
 */
@Directive({
  selector: 'ds-input',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextValueAccessor),
      multi: true,
    },
  ],
})
export class TextValueAccessor extends DsValueAccessor<string | null> {
  protected readonly changeEvent = 'dsChange'
  protected readonly valueProp = 'value'
}
