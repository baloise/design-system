import { ChangeDetectionStrategy, Component, forwardRef } from '@angular/core'
import { NG_VALUE_ACCESSOR } from '@angular/forms'
import { DsInputStepperInputs, DsInputStepperOutputs } from '../generated/meta'
import { DsInputStepper as DsInputStepperElement } from '../generated/proxies'
import { withValueAccessor } from './value-accessor'

/**
 * Wraps the generated `ds-input-stepper` proxy with `ControlValueAccessor` support (value: `number`, change
 * event: `dsChange`) via the `withValueAccessor` mixin — see `value-accessor.ts` for what that wires up.
 * Consumers only ever import `DsInputStepper` to use `<ds-input-stepper>` at all, so registering
 * `NG_VALUE_ACCESSOR` here — rather than on a separate directive — means `formControlName`/`ngModel` work
 * without any extra opt-in step.
 *
 * `null`/`undefined` (Angular calls `writeValue()` with either for a `FormControl` reset to no value) are
 * assigned straight through, like `DsInputSlider` does for its own non-nullable value prop:
 * `ds-input-stepper`'s own `@Watch('value')` resolves any empty value (`null`/`undefined`/`NaN`) onto its
 * current `min` and clamps an out-of-range one into `[min, max]` — see `input-stepper.tsx`'s `value` prop
 * doc — so this wrapper doesn't need to normalize anything itself.
 *
 * `inputs`/`outputs` are re-declared rather than inherited: Angular's compiler resolves a component's inputs
 * and outputs statically from its own `@Component` decorator at build time. `DsInputStepperInputs`/
 * `DsInputStepperOutputs` are generated from `../generated/proxies.ts` (see
 * `packages/core/config/generate-angular-meta.mjs`), so this stays in sync automatically whenever
 * `ds-input-stepper`'s props/events change — no manual list to maintain.
 */
@Component({
  selector: 'ds-input-stepper',
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush,
  inputs: DsInputStepperInputs,
  outputs: DsInputStepperOutputs,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DsInputStepper),
      multi: true,
    },
  ],
})
export class DsInputStepper extends withValueAccessor<HTMLDsInputStepperElement, 'value'>({
  changeEvent: 'dsChange',
  blurEvent: 'dsBlur',
  valueProp: 'value',
})(DsInputStepperElement) {}
