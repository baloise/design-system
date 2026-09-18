import { Component, signal } from '@angular/core'
import { FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn } from '@angular/forms'
import { DsInputPhone } from '@helvetia-design/angular'

const requiredWithMessage = (message: string): ValidatorFn => {
  return (control): ValidationErrors | null => (control.value ? null : { required: message })
}

@Component({
  selector: 'app-input-phone-demo',
  imports: [DsInputPhone, ReactiveFormsModule],
  templateUrl: './input-phone-demo.html',
})
export class InputPhoneDemo {
  protected readonly phoneValue = signal('')

  protected readonly reactiveForm = new FormGroup({
    phone: new FormControl('+41791234567', {
      validators: requiredWithMessage('This field is required'),
    }),
  })

  protected readonly autoInvalidOffForm = new FormGroup({
    phone: new FormControl('+41791234567', {
      validators: requiredWithMessage('This field is required'),
    }),
  })

  protected onInput(event: CustomEvent<{ value: string | null }>) {
    this.phoneValue.set(event.detail.value ?? '')
  }

  protected toggleReactiveFormDisabled() {
    const control = this.reactiveForm.controls.phone
    if (control.disabled) {
      control.enable()
    } else {
      control.disable()
    }
  }

  protected setReactiveFormValue() {
    this.reactiveForm.controls.phone.setValue('+41798765432')
  }
}
