import { Component, signal } from '@angular/core'
import { FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn } from '@angular/forms'
import { DsCounter } from '@baloise/ds-angular'

// `ds-counter` can never be "empty" (see its own `value` prop doc), and its `required` prop only drives
// the "optional" label suffix — so a `required`-style validator can never fail from user interaction. This
// minimum-threshold validator stands in for it instead, the same role it plays in the slider demo.
const minValueWithMessage = (min: number, message: string): ValidatorFn => {
  return (control): ValidationErrors | null => ((control.value ?? 0) >= min ? null : { min: message })
}

@Component({
  selector: 'app-counter-demo',
  imports: [DsCounter, ReactiveFormsModule],
  templateUrl: './counter-demo.html',
})
export class CounterDemo {
  protected readonly counterValue = signal(3)

  // Starts at 3 with a threshold of 2 so one decrease stays valid and two go invalid, while never reaching
  // `min` (0) — which would disable the decrease button and strand the test.
  protected readonly reactiveForm = new FormGroup({
    quantity: new FormControl<number>(3, {
      nonNullable: true,
      validators: minValueWithMessage(2, 'Value must be at least 2'),
    }),
  })

  // A deliberately *nullable* control, with no counterpart in the slider demo: `reset()` on a
  // `nonNullable` control returns the initial value, never `null`, so the form above can't exercise the
  // empty-value path at all. This one calls `writeValue(null)` for real, which is what proves
  // `ds-counter`'s own `@Watch('value')` resolves it onto `min` end-to-end through the value accessor.
  protected readonly nullableForm = new FormGroup({
    quantity: new FormControl<number | null>(3),
  })

  protected readonly autoInvalidOffForm = new FormGroup({
    quantity: new FormControl<number>(3, {
      nonNullable: true,
      validators: minValueWithMessage(2, 'Value must be at least 2'),
    }),
  })

  protected onChange(event: CustomEvent<number>) {
    this.counterValue.set(event.detail)
  }

  protected toggleReactiveFormDisabled() {
    const control = this.reactiveForm.controls.quantity
    if (control.disabled) {
      control.enable()
    } else {
      control.disable()
    }
  }

  protected setReactiveFormValue() {
    this.reactiveForm.controls.quantity.setValue(7)
  }

  protected resetReactiveForm() {
    this.reactiveForm.controls.quantity.reset()
  }

  protected resetNullableForm() {
    this.nullableForm.controls.quantity.reset()
  }
}
