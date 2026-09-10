import { ChangeDetectionStrategy, Component, forwardRef } from '@angular/core'
import { NG_VALUE_ACCESSOR } from '@angular/forms'
import { DsNumberInputInputs, DsNumberInputOutputs } from '../generated/meta'
import { DsNumberInput as DsNumberInputElement } from '../generated/proxies'
import { withValueAccessor } from './value-accessor'

/**
 * Wraps the generated `ds-number-input` proxy with `ControlValueAccessor` support (value: `number | null`,
 * change event: `dsChange`) via the `withValueAccessor` mixin — see `value-accessor.ts` for what that wires
 * up. Consumers only ever import `DsNumberInput` to use `<ds-number-input>` at all, so registering
 * `NG_VALUE_ACCESSOR` here — rather than on a separate directive — means `formControlName`/`ngModel` work
 * without any extra opt-in step.
 *
 * `inputs`/`outputs` are re-declared rather than inherited: Angular's compiler resolves a component's inputs
 * and outputs statically from its own `@Component` decorator at build time. `DsNumberInputInputs`/
 * `DsNumberInputOutputs` are generated from `../generated/proxies.ts` (see
 * `packages/core/config/generate-angular-meta.mjs`), so this stays in sync automatically whenever
 * `ds-number-input`'s props/events change — no manual list to maintain.
 */
@Component({
  selector: 'ds-number-input',
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush,
  inputs: DsNumberInputInputs,
  outputs: DsNumberInputOutputs,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DsNumberInput),
      multi: true,
    },
  ],
})
export class DsNumberInput extends withValueAccessor<HTMLDsNumberInputElement, 'value'>({
  changeEvent: 'dsChange',
  blurEvent: 'dsBlur',
  valueProp: 'value',
})(DsNumberInputElement) {}
