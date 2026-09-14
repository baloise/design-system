import { ChangeDetectionStrategy, Component, forwardRef } from '@angular/core'
import { NG_VALUE_ACCESSOR } from '@angular/forms'
import { DsCheckboxGroupInputs, DsCheckboxGroupOutputs } from '../generated/meta'
import { DsCheckboxGroup as DsCheckboxGroupElement } from '../generated/proxies'
import { withValueAccessor } from './value-accessor'

/**
 * Wraps the generated `ds-checkbox-group` proxy with `ControlValueAccessor` support (value: `any[]`, change event:
 * `dsChange`) via the `withValueAccessor` mixin — see `value-accessor.ts` for what that wires up. Consumers only
 * ever import `DsCheckboxGroup` to use `<ds-checkbox-group>` at all, so registering `NG_VALUE_ACCESSOR` here —
 * rather than on a separate directive — means `formControlName`/`ngModel` work without any extra opt-in step.
 *
 * `ds-checkbox-group`'s `value` is `any[]` rather than a plain scalar, but that needs no accessor-level
 * conversion: `DsValueAccessor<Element, K>`'s `Element[K]` generic just resolves to `HTMLDsCheckboxGroupElement`'s
 * own `value: any[]` type, so `writeValue`/`handleChange` already pass the array straight through unmodified —
 * the same `config` shape (`changeEvent`/`blurEvent`/`valueProp`) as `ds-input` carries over unchanged.
 *
 * `inputs`/`outputs` are re-declared rather than inherited: Angular's compiler resolves a component's inputs
 * and outputs statically from its own `@Component` decorator at build time. `DsCheckboxGroupInputs`/
 * `DsCheckboxGroupOutputs` are generated from `../generated/proxies.ts` (see
 * `packages/core/config/generate-angular-meta.mjs`), so this stays in sync automatically whenever
 * `ds-checkbox-group`'s props/events change — no manual list to maintain.
 */
@Component({
  selector: 'ds-checkbox-group',
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush,
  inputs: DsCheckboxGroupInputs,
  outputs: DsCheckboxGroupOutputs,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DsCheckboxGroup),
      multi: true,
    },
  ],
})
export class DsCheckboxGroup extends withValueAccessor<HTMLDsCheckboxGroupElement, 'value'>({
  changeEvent: 'dsChange',
  blurEvent: 'dsBlur',
  valueProp: 'value',
})(DsCheckboxGroupElement) {}
