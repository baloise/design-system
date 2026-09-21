import { Component } from '@angular/core'
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { DsInput, DsInputValueAccessor } from '@baloise/ds-angular'

/**
 * Reference template for testing a form component's Angular value-accessor directive.
 * To add the next form component, copy this file pair (+ e2e/forms/<component>.spec.ts),
 * rename `input` -> `<component>`, and keep the same testid convention:
 * `<component>-form-control`, `-value`, `-disabled`, `-set-external-value`,
 * `-toggle-disabled`, `-touch`.
 */
@Component({
  selector: 'app-input-form-section',
  imports: [DsInput, DsInputValueAccessor, ReactiveFormsModule],
  templateUrl: './input-form-section.html',
})
export class InputFormSection {
  protected readonly form = new FormGroup({
    email: new FormControl('', Validators.required),
  })

  protected setExternalValue() {
    this.form.controls.email.setValue('external@example.com')
  }

  protected toggleDisabled() {
    const control = this.form.controls.email
    control.disabled ? control.enable() : control.disable()
  }

  protected touch() {
    this.form.controls.email.markAsTouched()
  }
}
