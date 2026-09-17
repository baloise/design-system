import { ChangeDetectionStrategy, Component, forwardRef } from '@angular/core'
import { NG_VALUE_ACCESSOR } from '@angular/forms'
import { DsFileUploadInputs, DsFileUploadOutputs } from '../generated/meta'
import { DsFileUpload as DsFileUploadElement } from '../generated/proxies'
import { withValueAccessor } from './value-accessor'

/**
 * Wraps the generated `ds-file-upload` proxy with `ControlValueAccessor` support (value: `File[]`, change
 * event: `dsChange`) via the `withValueAccessor` mixin — see `value-accessor.ts` for what that wires up.
 * `ds-file-upload` emits its full `File[]` directly as `dsChange`'s `event.detail` and accepts the same
 * shape back on its `value` prop, so — like `ds-date`'s ISO string or `ds-input-slider`'s number — no
 * accessor-level conversion is needed: this is a direct copy of `DsInput`'s config shape, just with a
 * `File[]` value type instead of `string`.
 *
 * `inputs`/`outputs` are re-declared rather than inherited — see `DsInput` for why.
 */
@Component({
  selector: 'ds-file-upload',
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush,
  inputs: DsFileUploadInputs,
  outputs: DsFileUploadOutputs,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DsFileUpload),
      multi: true,
    },
  ],
})
export class DsFileUpload extends withValueAccessor<HTMLDsFileUploadElement, 'value'>({
  changeEvent: 'dsChange',
  blurEvent: 'dsBlur',
  valueProp: 'value',
})(DsFileUploadElement) {}
