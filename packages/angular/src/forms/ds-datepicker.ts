import { ChangeDetectionStrategy, Component, forwardRef } from '@angular/core'
import { NG_VALUE_ACCESSOR } from '@angular/forms'
import { DsDatepickerInputs, DsDatepickerOutputs } from '../generated/meta'
import { DsDatepicker as DsDatepickerElement } from '../generated/proxies'
import { withValueAccessor } from './value-accessor'

/**
 * Wraps the generated `ds-datepicker` proxy with `ControlValueAccessor` support (value: `string | null` ISO date,
 * change event: `dsChange`) via the `withValueAccessor` mixin — see `value-accessor.ts` for what that wires
 * up. Same config as `DsInput` (`ds-datepicker`'s value is a plain ISO string driven by `dsChange`, just like
 * `ds-input`'s), so this is a direct copy of that wrapper's shape rather than a new one.
 *
 * `inputs`/`outputs` are re-declared rather than inherited — see `DsInput` for why.
 */
@Component({
  selector: 'ds-datepicker',
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush,
  inputs: DsDatepickerInputs,
  outputs: DsDatepickerOutputs,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DsDatepicker),
      multi: true,
    },
  ],
})
export class DsDatepicker extends withValueAccessor<HTMLDsDatepickerElement, 'value'>({
  changeEvent: 'dsChange',
  blurEvent: 'dsBlur',
  valueProp: 'value',
})(DsDatepickerElement) {}
