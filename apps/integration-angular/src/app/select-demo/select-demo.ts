import { Component, signal } from '@angular/core'
import { FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn } from '@angular/forms'
import { DsSelect } from '@helvetia-design/angular'

const COUNTRY_OPTIONS = [
  { label: 'Switzerland', value: 'ch' },
  { label: 'Germany', value: 'de' },
  { label: 'Austria', value: 'at' },
]

const requiredWithMessage = (message: string): ValidatorFn => {
  return (control): ValidationErrors | null => (control.value !== null ? null : { required: message })
}

// `ds-select`'s `multiple`-mode `value` is an array, so "empty" is a zero-length array rather than `null`
// — same role `requiredWithMessage` plays for the single-mode form below.
const requireAtLeastOneWithMessage = (message: string): ValidatorFn => {
  return (control): ValidationErrors | null => ((control.value ?? []).length > 0 ? null : { required: message })
}

@Component({
  selector: 'app-select-demo',
  imports: [DsSelect, ReactiveFormsModule],
  templateUrl: './select-demo.html',
})
export class SelectDemo {
  protected readonly options = COUNTRY_OPTIONS

  protected readonly selectValue = signal<string | null>('ch')

  protected readonly reactiveForm = new FormGroup({
    country: new FormControl<string | null>('ch', {
      validators: requiredWithMessage('This field is required'),
    }),
  })

  protected readonly reactiveMultipleForm = new FormGroup({
    countries: new FormControl<string[]>(['ch'], {
      nonNullable: true,
      validators: requireAtLeastOneWithMessage('This field is required'),
    }),
  })

  protected readonly autoInvalidOffForm = new FormGroup({
    country: new FormControl<string | null>('ch', {
      validators: requiredWithMessage('This field is required'),
    }),
  })

  protected onChange(event: CustomEvent<string | string[] | null>) {
    this.selectValue.set(event.detail as string | null)
  }

  protected toggleReactiveFormDisabled() {
    const control = this.reactiveForm.controls.country
    if (control.disabled) {
      control.enable()
    } else {
      control.disable()
    }
  }

  protected setReactiveFormValue() {
    this.reactiveForm.controls.country.setValue('de')
  }

  protected toggleReactiveMultipleFormDisabled() {
    const control = this.reactiveMultipleForm.controls.countries
    if (control.disabled) {
      control.enable()
    } else {
      control.disable()
    }
  }

  protected setReactiveMultipleFormValue() {
    this.reactiveMultipleForm.controls.countries.setValue(['de', 'at'])
  }
}
