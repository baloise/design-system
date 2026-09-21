import { ChangeDetectionStrategy, Component, forwardRef } from '@angular/core'
import { NG_VALUE_ACCESSOR } from '@angular/forms'
import { DsSegmentInputs, DsSegmentOutputs } from '../generated/meta'
import { DsSegment as DsSegmentElement } from '../generated/proxies'
import { withValueAccessor } from './value-accessor'

/**
 * Wraps the generated `ds-segment` proxy with `ControlValueAccessor` support (value: `any | null`, change
 * event: `dsChange`) via the `withValueAccessor` mixin — see `value-accessor.ts` for what that wires up.
 * Consumers only ever import `DsSegment` to use `<ds-segment>` at all, so registering `NG_VALUE_ACCESSOR` here —
 * rather than on a separate directive — means `formControlName`/`ngModel` work without any extra opt-in step.
 *
 * `inputs`/`outputs` are re-declared rather than inherited: Angular's compiler resolves a component's inputs
 * and outputs statically from its own `@Component` decorator at build time. `DsSegmentInputs`/
 * `DsSegmentOutputs` are generated from `../generated/proxies.ts` (see
 * `packages/core/config/generate-angular-meta.mjs`), so this stays in sync automatically whenever
 * `ds-segment`'s props/events change — no manual list to maintain.
 */
@Component({
  selector: 'ds-segment',
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush,
  inputs: DsSegmentInputs,
  outputs: DsSegmentOutputs,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DsSegment),
      multi: true,
    },
  ],
})
export class DsSegment extends withValueAccessor<HTMLDsSegmentElement, 'value'>({
  changeEvent: 'dsChange',
  blurEvent: 'dsBlur',
  valueProp: 'value',
})(DsSegmentElement) {}
