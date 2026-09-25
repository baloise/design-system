import { ChangeDetectionStrategy, Component, forwardRef } from '@angular/core'
import { NG_VALUE_ACCESSOR } from '@angular/forms'
import { DsPhoneInputInputs, DsPhoneInputOutputs } from '../generated/meta'
import { DsPhoneInput as DsPhoneInputElement } from '../generated/proxies'
import { withValueAccessor } from './value-accessor'

/**
 * Wraps the generated `ds-phone-input` proxy with `ControlValueAccessor` support (value: `string | null`,
 * change event: `dsChange`) via the `withValueAccessor` mixin — see `value-accessor.ts` for what that
 * wires up. `ds-phone-input` itself (not this wrapper) is responsible for firing `dsChange` whenever
 * `value` changes, including when picking a country re-formats an already-typed national number — see
 * `applyCountry()` in `phone-input.tsx` — so a single `changeEvent` is enough here, same as every other
 * wrapped component.
 *
 * `extractValue` reads `value` off the element directly rather than the default (the change event's own
 * `detail`): `dsChange`'s detail is `{ value, country, nationalNumber }`, not the bare value
 * `DsValueAccessor` otherwise expects. The component always commits `value` before dispatching the event.
 */
@Component({
  selector: 'ds-phone-input',
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush,
  inputs: DsPhoneInputInputs,
  outputs: DsPhoneInputOutputs,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DsPhoneInput),
      multi: true,
    },
  ],
})
export class DsPhoneInput extends withValueAccessor<HTMLDsPhoneInputElement, 'value'>({
  changeEvent: 'dsChange',
  blurEvent: 'dsBlur',
  valueProp: 'value',
  extractValue: (_event, element) => element.value,
})(DsPhoneInputElement) {}
