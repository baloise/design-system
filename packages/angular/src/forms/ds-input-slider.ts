import { ChangeDetectionStrategy, Component, forwardRef } from '@angular/core'
import { NG_VALUE_ACCESSOR } from '@angular/forms'
import { DsInputSliderInputs, DsInputSliderOutputs } from '../generated/meta'
import { DsInputSlider as DsInputSliderElement } from '../generated/proxies'
import { withValueAccessor } from './value-accessor'

/**
 * Wraps the generated `ds-input-slider` proxy with `ControlValueAccessor` support (value: `number`, change
 * event: `dsChange`) via the `withValueAccessor` mixin — see `value-accessor.ts` for what that wires up.
 * Consumers only ever import `DsInputSlider` to use `<ds-input-slider>` at all, so registering
 * `NG_VALUE_ACCESSOR` here — rather than on a separate directive — means `formControlName`/`ngModel` work
 * without any extra opt-in step.
 *
 * `null`/`undefined` (Angular calls `writeValue()` with either for a `FormControl` reset to no value) are
 * assigned straight through, like `DsInput`/`DsNumberInput` do for their own nullable value props:
 * `ds-input-slider`'s own `@Watch('value')` resolves any empty value (`null`/`undefined`/`NaN`) onto its
 * current `min` — see `input-slider.tsx`'s `value` prop doc — so this wrapper doesn't need to normalize
 * anything itself.
 *
 * `inputs`/`outputs` are re-declared rather than inherited: Angular's compiler resolves a component's inputs
 * and outputs statically from its own `@Component` decorator at build time. `DsInputSliderInputs`/
 * `DsInputSliderOutputs` are generated from `../generated/proxies.ts` (see
 * `packages/core/config/generate-angular-meta.mjs`), so this stays in sync automatically whenever
 * `ds-input-slider`'s props/events change — no manual list to maintain.
 */
@Component({
  selector: 'ds-input-slider',
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush,
  inputs: DsInputSliderInputs,
  outputs: DsInputSliderOutputs,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DsInputSlider),
      multi: true,
    },
  ],
})
export class DsInputSlider extends withValueAccessor<HTMLDsInputSliderElement, 'value'>({
  changeEvent: 'dsChange',
  blurEvent: 'dsBlur',
  valueProp: 'value',
})(DsInputSliderElement) {}
