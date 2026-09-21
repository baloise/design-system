import { ChangeDetectionStrategy, Component, forwardRef } from '@angular/core'
import { NG_VALUE_ACCESSOR } from '@angular/forms'
import { DsInputInputs, DsInputOutputs } from '../generated/meta'
import { DsInput as DsInputElement } from '../generated/proxies'
import { withValueAccessor } from './value-accessor'

/**
 * Wraps the generated `ds-input` proxy with `ControlValueAccessor` support (value: `string | null`, change
 * event: `dsChange`) via the `withValueAccessor` mixin — see `value-accessor.ts` for what that wires up.
 * Consumers only ever import `DsInput` to use `<ds-input>` at all, so registering `NG_VALUE_ACCESSOR` here —
 * rather than on a separate directive — means `formControlName`/`ngModel` work without any extra opt-in step.
 *
 * `inputs`/`outputs` are re-declared rather than inherited: Angular's compiler resolves a component's inputs
 * and outputs statically from its own `@Component` decorator at build time. `DsInputInputs`/`DsInputOutputs`
 * are generated from `../generated/proxies.ts` (see `packages/core/config/generate-angular-meta.mjs`), so
 * this stays in sync automatically whenever `ds-input`'s props/events change — no manual list to maintain.
 */
@Component({
  selector: 'ds-input',
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush,
  inputs: DsInputInputs,
  outputs: DsInputOutputs,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DsInput),
      multi: true,
    },
  ],
})
export class DsInput extends withValueAccessor<HTMLDsInputElement, 'value'>({
  changeEvent: 'dsChange',
  blurEvent: 'dsBlur',
  valueProp: 'value',
})(DsInputElement) {}
