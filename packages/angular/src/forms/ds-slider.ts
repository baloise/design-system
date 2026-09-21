import { ChangeDetectionStrategy, Component, forwardRef } from '@angular/core'
import { NG_VALUE_ACCESSOR } from '@angular/forms'
import { DsSliderInputs, DsSliderOutputs } from '../generated/meta'
import { DsSlider as DsSliderElement } from '../generated/proxies'
import { withValueAccessor } from './value-accessor'

/**
 * Wraps the generated `ds-slider` proxy with `ControlValueAccessor` support (value: `number`, change
 * event: `dsChange`) via the `withValueAccessor` mixin — see `value-accessor.ts` for what that wires up.
 * Consumers only ever import `DsSlider` to use `<ds-slider>` at all, so registering
 * `NG_VALUE_ACCESSOR` here — rather than on a separate directive — means `formControlName`/`ngModel` work
 * without any extra opt-in step.
 *
 * `null`/`undefined` (Angular calls `writeValue()` with either for a `FormControl` reset to no value) are
 * assigned straight through, like `DsInput`/`DsNumberInput` do for their own nullable value props:
 * `ds-slider`'s own `@Watch('value')` resolves any empty value (`null`/`undefined`/`NaN`) onto its
 * current `min` — see `slider.tsx`'s `value` prop doc — so this wrapper doesn't need to normalize
 * anything itself.
 *
 * `inputs`/`outputs` are re-declared rather than inherited: Angular's compiler resolves a component's inputs
 * and outputs statically from its own `@Component` decorator at build time. `DsSliderInputs`/
 * `DsSliderOutputs` are generated from `../generated/proxies.ts` (see
 * `packages/core/config/generate-angular-meta.mjs`), so this stays in sync automatically whenever
 * `ds-slider`'s props/events change — no manual list to maintain.
 */
@Component({
  selector: 'ds-slider',
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush,
  inputs: DsSliderInputs,
  outputs: DsSliderOutputs,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DsSlider),
      multi: true,
    },
  ],
})
export class DsSlider extends withValueAccessor<HTMLDsSliderElement, 'value'>({
  changeEvent: 'dsChange',
  blurEvent: 'dsBlur',
  valueProp: 'value',
})(DsSliderElement) {}
