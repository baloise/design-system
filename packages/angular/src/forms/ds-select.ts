import { ChangeDetectionStrategy, Component, forwardRef } from '@angular/core'
import { NG_VALUE_ACCESSOR } from '@angular/forms'
import { DsSelectInputs, DsSelectOutputs } from '../generated/meta'
import { DsSelect as DsSelectElement } from '../generated/proxies'
import { withValueAccessor } from './value-accessor'

/**
 * Wraps the generated `ds-select` proxy with `ControlValueAccessor` support (value: `string | string[] | null`,
 * change event: `dsChange`) via the `withValueAccessor` mixin — see `value-accessor.ts` for what that wires up.
 * `Element[K]` already resolves to `HTMLDsSelectElement['value']`, i.e. `string | string[] | null`, so — same as
 * `ds-checkbox-group`'s array value and `ds-radio-group`'s `any` value — no accessor-level override is needed to
 * pass single- vs. multiple-mode values through unmodified; `writeValue`/`registerOnChange` already assign/read
 * `element.value` verbatim, whatever shape it currently holds.
 *
 * Consumers only ever import `DsSelect` to use `<ds-select>` at all, so registering `NG_VALUE_ACCESSOR` here —
 * rather than on a separate directive — means `formControlName`/`ngModel` work without any extra opt-in step.
 *
 * `inputs`/`outputs` are re-declared rather than inherited: Angular's compiler resolves a component's inputs
 * and outputs statically from its own `@Component` decorator at build time. `DsSelectInputs`/`DsSelectOutputs`
 * are generated from `../generated/proxies.ts` (see `packages/core/config/generate-angular-meta.mjs`), so this
 * stays in sync automatically whenever `ds-select`'s props/events change — no manual list to maintain.
 */
@Component({
  selector: 'ds-select',
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush,
  inputs: DsSelectInputs,
  outputs: DsSelectOutputs,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DsSelect),
      multi: true,
    },
  ],
})
export class DsSelect extends withValueAccessor<HTMLDsSelectElement, 'value'>({
  changeEvent: 'dsChange',
  blurEvent: 'dsBlur',
  valueProp: 'value',
})(DsSelectElement) {}
