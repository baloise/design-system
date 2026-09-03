import { Component, signal } from '@angular/core'
import { FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn } from '@angular/forms'
import { DsButton, DsCheckbox, DsInput } from '@baloise/ds-angular'

const requiredWithMessage = (message: string): ValidatorFn => {
  return (control): ValidationErrors | null => (control.value ? null : { required: message })
}

@Component({
  selector: 'app-root',
  imports: [DsButton, DsInput, DsCheckbox, ReactiveFormsModule],
  templateUrl: './app.html',
})
export class App {
  protected readonly clicks = signal(0)
  protected readonly inputValue = signal('')
  protected readonly checked = signal(false)

  protected readonly reactiveForm = new FormGroup({
    name: new FormControl('Alice', {
      validators: requiredWithMessage('This field is required'),
    }),
  })

  protected onClick() {
    this.clicks.update(count => count + 1)
  }

  protected onInput(event: CustomEvent<string | null>) {
    this.inputValue.set(event.detail ?? '')
  }

  protected onChange(event: CustomEvent<boolean>) {
    this.checked.set(event.detail)
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
