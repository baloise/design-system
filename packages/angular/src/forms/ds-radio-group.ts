import { ChangeDetectionStrategy, Component, forwardRef } from '@angular/core'
import { NG_VALUE_ACCESSOR } from '@angular/forms'
import { DsRadioGroupInputs, DsRadioGroupOutputs } from '../generated/meta'
import { DsRadioGroup as DsRadioGroupElement } from '../generated/proxies'
import { withValueAccessor } from './value-accessor'

/**
 * Wraps the generated `ds-radio-group` proxy with `ControlValueAccessor` support (value: `any | null`, change
 * event: `dsChange`) via the `withValueAccessor` mixin — see `value-accessor.ts` for what that wires up.
 * Consumers only ever import `DsRadioGroup` to use `<ds-radio-group>` at all, so registering
 * `NG_VALUE_ACCESSOR` here — rather than on a separate directive — means `formControlName`/`ngModel` work
 * without any extra opt-in step.
 *
 * `inputs`/`outputs` are re-declared rather than inherited: Angular's compiler resolves a component's inputs
 * and outputs statically from its own `@Component` decorator at build time. `DsRadioGroupInputs`/
 * `DsRadioGroupOutputs` are generated from `../generated/proxies.ts` (see
 * `packages/core/config/generate-angular-meta.mjs`), so this stays in sync automatically whenever
 * `ds-radio-group`'s props/events change — no manual list to maintain.
 */
@Component({
  selector: 'ds-radio-group',
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush,
  inputs: DsRadioGroupInputs,
  outputs: DsRadioGroupOutputs,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DsRadioGroup),
      multi: true,
    },
  ],
})
export class DsRadioGroup extends withValueAccessor<HTMLDsRadioGroupElement, 'value'>({
  changeEvent: 'dsChange',
  blurEvent: 'dsBlur',
  valueProp: 'value',
})(DsRadioGroupElement) {}
