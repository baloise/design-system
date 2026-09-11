import { Component, signal } from '@angular/core'
import { FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn } from '@angular/forms'
import { DsInputSlider } from '@baloise/ds-angular'

// `ds-input-slider` can never be "empty" (see its own `value` prop doc), so a `required`-style validator can
// never fail from user interaction — this repo's minimum-threshold validator stands in for it instead, the
// same role `requiredWithMessage` plays in the number-input/input demos.
const minValueWithMessage = (min: number, message: string): ValidatorFn => {
  return (control): ValidationErrors | null => ((control.value ?? 0) >= min ? null : { min: message })
}

@Component({
  selector: 'app-input-slider-demo',
  imports: [DsInputSlider, ReactiveFormsModule],
  templateUrl: './input-slider-demo.html',
})
export class InputSliderDemo {
  protected readonly inputSliderValue = signal(20)

  protected readonly reactiveForm = new FormGroup({
    amount: new FormControl<number>(60, {
      nonNullable: true,
      validators: minValueWithMessage(50, 'Value must be at least 50'),
    }),
  })

  protected readonly autoInvalidOffForm = new FormGroup({
    amount: new FormControl<number>(60, {
      nonNullable: true,
      validators: minValueWithMessage(50, 'Value must be at least 50'),
    }),
  })

  protected onInput(event: CustomEvent<number>) {
    this.inputSliderValue.set(event.detail)
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
    this.reactiveForm.controls.amount.setValue(75)
  }
}
