import { Component, signal } from '@angular/core'
import { FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn } from '@angular/forms'
import { DsDate } from '@baloise/ds-angular'

const requiredWithMessage = (message: string): ValidatorFn => {
  return (control): ValidationErrors | null => (control.value ? null : { required: message })
}

@Component({
  selector: 'app-date-demo',
  imports: [DsDate, ReactiveFormsModule],
  templateUrl: './date-demo.html',
})
export class DateDemo {
  protected readonly dateValue = signal('')

  protected readonly reactiveForm = new FormGroup({
    date: new FormControl('2024-01-15', {
      validators: requiredWithMessage('This field is required'),
    }),
  })

  protected readonly autoInvalidOffForm = new FormGroup({
    date: new FormControl('2024-01-15', {
      validators: requiredWithMessage('This field is required'),
    }),
  })

  protected onInput(event: CustomEvent<string | null>) {
    this.dateValue.set(event.detail ?? '')
  }

  protected toggleReactiveFormDisabled() {
    const control = this.reactiveForm.controls.date
    if (control.disabled) {
      control.enable()
    } else {
      control.disable()
    }
  }

  protected setReactiveFormValue() {
    this.reactiveForm.controls.date.setValue('2024-03-20')
  }
}
