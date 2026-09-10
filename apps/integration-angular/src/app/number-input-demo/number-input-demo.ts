import { Component, signal } from '@angular/core'
import { FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn } from '@angular/forms'
import { DsNumberInput } from '@baloise/ds-angular'

const requiredWithMessage = (message: string): ValidatorFn => {
  return (control): ValidationErrors | null => (control.value !== null ? null : { required: message })
}

@Component({
  selector: 'app-number-input-demo',
  imports: [DsNumberInput, ReactiveFormsModule],
  templateUrl: './number-input-demo.html',
})
export class NumberInputDemo {
  protected readonly numberInputValue = signal<number | null>(null)

  protected readonly reactiveForm = new FormGroup({
    amount: new FormControl<number | null>(1, {
      validators: requiredWithMessage('This field is required'),
    }),
  })

  protected readonly autoInvalidOffForm = new FormGroup({
    amount: new FormControl<number | null>(1, {
      validators: requiredWithMessage('This field is required'),
    }),
  })

  protected onInput(event: CustomEvent<number | null>) {
    this.numberInputValue.set(event.detail ?? null)
  }

  protected toggleReactiveFormDisabled() {
    const control = this.reactiveForm.controls.amount
    if (control.disabled) {
      control.enable()
    } else {
      control.disable()
    }
  }

  protected setReactiveFormValue() {
    this.reactiveForm.controls.amount.setValue(3)
  }
}
