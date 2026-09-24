import { ChangeDetectionStrategy, Component, forwardRef } from '@angular/core'
import { NG_VALUE_ACCESSOR } from '@angular/forms'
import { DsToggleInputs, DsToggleOutputs } from '../generated/meta'
import { DsToggle as DsToggleElement } from '../generated/proxies'
import { withValueAccessor } from './value-accessor'

/**
 * Wraps the generated `ds-toggle` proxy with `ControlValueAccessor` support (value: `boolean`, change
 * event: `dsChange`) via the `withValueAccessor` mixin — see `value-accessor.ts` for what that wires up.
 * Consumers only ever import `DsToggle` to use `<ds-toggle>` at all, so registering `NG_VALUE_ACCESSOR`
 * here — rather than on a separate directive — means `formControlName`/`ngModel` work without any extra
 * opt-in step.
 *
 * `inputs`/`outputs` are re-declared rather than inherited: Angular's compiler resolves a component's inputs
 * and outputs statically from its own `@Component` decorator at build time. `DsToggleInputs`/`DsToggleOutputs`
 * are generated from `../generated/proxies.ts` (see `packages/core/config/generate-angular-meta.mjs`), so this
 * stays in sync automatically whenever `ds-toggle`'s props/events change — no manual list to maintain.
 */
@Component({
  selector: 'ds-toggle',
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush,
  inputs: DsToggleInputs,
  outputs: DsToggleOutputs,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DsToggle),
      multi: true,
    },
  ],
})
export class DsToggle extends withValueAccessor<HTMLDsToggleElement, 'checked'>({
  changeEvent: 'dsChange',
  blurEvent: 'dsBlur',
  valueProp: 'checked',
})(DsToggleElement) {}
