import { Component, signal } from '@angular/core'
import { FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn } from '@angular/forms'
import { DsInput } from '@baloise/ds-angular'

const requiredWithMessage = (message: string): ValidatorFn => {
  return (control): ValidationErrors | null => (control.value ? null : { required: message })
}

@Component({
  selector: 'app-input-demo',
  imports: [DsInput, ReactiveFormsModule],
  templateUrl: './input-demo.html',
})
export class InputDemo {
  protected readonly inputValue = signal('')

  protected readonly reactiveForm = new FormGroup({
    name: new FormControl('Alice', {
      validators: requiredWithMessage('This field is required'),
    }),
  })

  protected onInput(event: CustomEvent<string | null>) {
    this.inputValue.set(event.detail ?? '')
  }

  protected toggleReactiveFormDisabled() {
    const control = this.reactiveForm.controls.name
    if (control.disabled) {
      control.enable()
    } else {
      control.disable()
    }
  }

  protected setReactiveFormValue() {
    this.reactiveForm.controls.name.setValue('Carol')
  }
}
