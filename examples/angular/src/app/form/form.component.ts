import { Component } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { NewBalOptionValue, newDateString, now } from '@baloise/design-system-components'
import { BalValidators } from '@baloise/design-system-components-angular'

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
})
export class FormComponent {
  nameChanged = ''

  years = [
    NewBalOptionValue('1995', '1995'),
    NewBalOptionValue('1996', '1996'),
    NewBalOptionValue('1997', '1997'),
    NewBalOptionValue('1998', '1998'),
    NewBalOptionValue('1999', '1999'),
    NewBalOptionValue('2000', '2000'),
  ]

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
    this.form.get('age')?.disable()
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
