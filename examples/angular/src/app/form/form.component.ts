import { Component } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { newDateString, now } from '@baloise/ui-library'
import { BalValidators } from '@baloise/ui-library-angular'

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
})
export class FormComponent {
  nameChanged = ''

  form = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    age: new FormControl(['1999'], [Validators.required]),
    dueDate: new FormControl(newDateString(now()), [Validators.required, BalValidators.isAfter(now())]),
    gender: new FormControl(null, [Validators.required]),
    checkbox: new FormControl(true, [Validators.requiredTrue]),
    comment: new FormControl(null, [Validators.required]),
  })

  onNameChange(event: CustomEvent<string>) {
    this.nameChanged = event.detail
  }

  setCommentDisabled() {
    this.form.get('comment')?.disable()
  }

  updateName() {
    this.form.patchValue({
      name: 'Nancy',
    })
  }

  onSubmit() {
    alert('Form is submitted!')
  }
}
