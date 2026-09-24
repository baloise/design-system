import { Component } from '@angular/core'
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { DsTextarea, DsTextareaValueAccessor } from '@baloise/ds-angular'

@Component({
  selector: 'app-textarea-form-section',
  imports: [DsTextarea, DsTextareaValueAccessor, ReactiveFormsModule],
  templateUrl: './textarea-form-section.html',
})
export class TextareaFormSection {
  protected readonly form = new FormGroup({
    bio: new FormControl('', Validators.required),
  })

  protected setExternalValue() {
    this.form.controls.bio.setValue('external bio')
  }

  protected toggleDisabled() {
    const control = this.form.controls.bio
    control.disabled ? control.enable() : control.disable()
  }

  protected touch() {
    this.form.controls.bio.markAsTouched()
  }
}
