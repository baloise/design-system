import { Component, signal } from '@angular/core'
import { FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn } from '@angular/forms'
import { DsSegment, DsSegmentItem } from '@baloise/ds-angular'

const requiredWithMessage = (message: string): ValidatorFn => {
  return (control): ValidationErrors | null => (control.value !== null ? null : { required: message })
}

@Component({
  selector: 'app-segment-demo',
  imports: [DsSegment, DsSegmentItem, ReactiveFormsModule],
  templateUrl: './segment-demo.html',
})
export class SegmentDemo {
  protected readonly segmentValue = signal<string | null>(null)

  protected readonly reactiveForm = new FormGroup({
    plan: new FormControl<string | null>('basic', {
      validators: requiredWithMessage('This field is required'),
    }),
  })

  protected readonly autoInvalidOffForm = new FormGroup({
    plan: new FormControl<string | null>('basic', {
      validators: requiredWithMessage('This field is required'),
    }),
  })

  protected onChange(event: CustomEvent<string | null | undefined>) {
    this.segmentValue.set(event.detail ?? null)
  }

  protected toggleReactiveFormDisabled() {
    const control = this.reactiveForm.controls.plan
    if (control.disabled) {
      control.enable()
    } else {
      control.disable()
    }
  }

  protected setReactiveFormValue() {
    this.reactiveForm.controls.plan.setValue('premium')
  }
}
