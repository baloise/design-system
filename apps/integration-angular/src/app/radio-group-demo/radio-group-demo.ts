import { Component } from '@angular/core'
import { FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn } from '@angular/forms'
import { DsRadio, DsRadioGroup } from '@baloise/ds-angular'

const requiredWithMessage = (message: string): ValidatorFn => {
  return (control): ValidationErrors | null => (control.value !== null ? null : { required: message })
}

@Component({
  selector: 'app-radio-group-demo',
  imports: [DsRadioGroup, DsRadio, ReactiveFormsModule],
  templateUrl: './radio-group-demo.html',
})
export class RadioGroupDemo {
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
