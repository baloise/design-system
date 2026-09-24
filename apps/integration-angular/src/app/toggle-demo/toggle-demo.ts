import { Component, signal } from '@angular/core'
import { FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn } from '@angular/forms'
import { DsToggle } from '@helvetia-design/angular'

const requiredWithMessage = (message: string): ValidatorFn => {
  return (control): ValidationErrors | null => (control.value === true ? null : { required: message })
}

@Component({
  selector: 'app-toggle-demo',
  imports: [DsToggle, ReactiveFormsModule],
  templateUrl: './toggle-demo.html',
})
export class ToggleDemo {
  protected readonly toggleValue = signal(false)

  protected readonly reactiveForm = new FormGroup({
    accepted: new FormControl<boolean>(true, {
      nonNullable: true,
      validators: requiredWithMessage('This field is required'),
    }),
  })

  protected readonly autoInvalidOffForm = new FormGroup({
    accepted: new FormControl<boolean>(true, {
      nonNullable: true,
      validators: requiredWithMessage('This field is required'),
    }),
  })

  protected onChange(event: CustomEvent<boolean>) {
    this.toggleValue.set(event.detail)
  }

  protected toggleReactiveFormDisabled() {
    const control = this.reactiveForm.controls.accepted
    if (control.disabled) {
      control.enable()
    } else {
      control.disable()
    }
  }

  protected setReactiveFormValue() {
    this.reactiveForm.controls.accepted.setValue(false)
  }
}
