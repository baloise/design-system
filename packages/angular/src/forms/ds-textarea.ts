import { ChangeDetectionStrategy, Component, forwardRef } from '@angular/core'
import { NG_VALUE_ACCESSOR } from '@angular/forms'
import { DsTextareaInputs, DsTextareaOutputs } from '../generated/meta'
import { DsTextarea as DsTextareaElement } from '../generated/proxies'
import { withValueAccessor } from './value-accessor'

@Component({
  selector: 'ds-textarea',
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush,
  inputs: DsTextareaInputs,
  outputs: DsTextareaOutputs,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DsTextarea),
      multi: true,
    },
  ],
})
export class DsTextarea extends withValueAccessor<HTMLDsTextareaElement, 'value'>({
  changeEvent: 'dsChange',
  blurEvent: 'dsBlur',
  valueProp: 'value'
})(DsTextareaElement) {}
