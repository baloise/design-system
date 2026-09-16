import { Component, signal } from '@angular/core'
import { FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn } from '@angular/forms'
import { DsCheckbox, DsCheckboxGroup } from '@baloise/ds-angular'

// `ds-checkbox-group`'s `value` is an array, so "empty" is a zero-length array rather than `null`/`undefined`
// — the same role `requiredWithMessage`/`minValueWithMessage` play in the other demos' reactive forms.
const requireAtLeastOneWithMessage = (message: string): ValidatorFn => {
  return (control): ValidationErrors | null => ((control.value ?? []).length > 0 ? null : { required: message })
}

@Component({
  selector: 'app-checkbox-group-demo',
  imports: [DsCheckbox, DsCheckboxGroup, ReactiveFormsModule],
  templateUrl: './checkbox-group-demo.html',
})
export class CheckboxGroupDemo {
  protected readonly checkboxGroupValue = signal<string[]>(['apple'])

  protected readonly reactiveForm = new FormGroup({
    fruits: new FormControl<string[]>(['apple'], {
      nonNullable: true,
      validators: requireAtLeastOneWithMessage('Select at least one fruit'),
    }),
  })

  protected readonly autoInvalidOffForm = new FormGroup({
    fruits: new FormControl<string[]>(['apple'], {
      nonNullable: true,
      validators: requireAtLeastOneWithMessage('Select at least one fruit'),
    }),
  })

  protected onChange(event: CustomEvent<string[]>) {
    this.checkboxGroupValue.set(event.detail)
  }

  protected toggleReactiveFormDisabled() {
    const control = this.reactiveForm.controls.fruits
    if (control.disabled) {
      control.enable()
    } else {
      control.disable()
    }
  }

  protected setReactiveFormValue() {
    this.reactiveForm.controls.fruits.setValue(['banana', 'cherry'])
  }
}
