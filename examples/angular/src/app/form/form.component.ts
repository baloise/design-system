import { Component } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { balDateUtil } from '@baloise/ui-library'

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
})
export class FormComponent {
  nameChanged = ''

  form = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    age: new FormControl(null, [Validators.required]),
    dueDate: new FormControl(balDateUtil.newDateString(new Date()), [Validators.required]),
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
