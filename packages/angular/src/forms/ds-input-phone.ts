import { ChangeDetectionStrategy, Component, forwardRef } from '@angular/core'
import { NG_VALUE_ACCESSOR } from '@angular/forms'
import { DsInputPhoneInputs, DsInputPhoneOutputs } from '../generated/meta'
import { DsInputPhone as DsInputPhoneElement } from '../generated/proxies'
import { withValueAccessor } from './value-accessor'

/**
 * Wraps the generated `ds-input-phone` proxy with `ControlValueAccessor` support (value: `string | null`,
 * change event: `dsChange`) via the `withValueAccessor` mixin — see `value-accessor.ts` for what that
 * wires up. `ds-input-phone` itself (not this wrapper) is responsible for firing `dsChange` whenever
 * `value` changes, including when picking a country re-formats an already-typed national number — see
 * `applyCountry()` in `input-phone.tsx` — so a single `changeEvent` is enough here, same as every other
 * wrapped component.
 *
 * `extractValue` reads `value` off the element directly rather than the default (the change event's own
 * `detail`): `dsChange`'s detail is `{ value, country, nationalNumber }`, not the bare value
 * `DsValueAccessor` otherwise expects. The component always commits `value` before dispatching the event.
 */
@Component({
  selector: 'ds-input-phone',
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush,
  inputs: DsInputPhoneInputs,
  outputs: DsInputPhoneOutputs,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DsInputPhone),
      multi: true,
    },
  ],
})
export class DsInputPhone extends withValueAccessor<HTMLDsInputPhoneElement, 'value'>({
  changeEvent: 'dsChange',
  blurEvent: 'dsBlur',
  valueProp: 'value',
  extractValue: (_event, element) => element.value,
})(DsInputPhoneElement) {}
