import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup } from '@angular/forms'
import { NewBalOptionValue, newDateString, now } from '@baloise/design-system-components'
import { BalValidators } from '@baloise/design-system-components-angular'

@Component({
  selector: 'app-form-page',
  templateUrl: './form-page.component.html',
})
export class FormPageComponent implements OnInit {
  ngOnInit(): void {
    this.form.get('canton')?.valueChanges.subscribe(a => {
      console.log('valueChanges', a)
    })
  }

  bubu(e: any) {
    console.log('balChange', e)
  }

  formControlName = 'gender'

  genders = [NewBalOptionValue('male', 'Male'), NewBalOptionValue('female', 'Female')]

  cantons = [
    NewBalOptionValue('AG', 'AG'),
    NewBalOptionValue('BS', 'BS'),
    NewBalOptionValue('BL', 'BL'),
    NewBalOptionValue('JU', 'JU'),
    NewBalOptionValue('SO', 'SO'),
  ]

  form = new FormGroup({
    gender: new FormControl(null, [BalValidators.isRequired()]),
    firstname: new FormControl(null, [BalValidators.isRequired()]),
    lastname: new FormControl(null, [BalValidators.isRequired()]),
    street: new FormControl(null, [BalValidators.isRequired()]),
    postalCode: new FormControl(null, [BalValidators.isRequired()]),
    city: new FormControl(null, [BalValidators.isRequired()]),
    birthdate: new FormControl(newDateString(now()), [BalValidators.isRequired()]),
    canton: new FormControl(['AG'], [BalValidators.isRequired()]),
    email: new FormControl(null, [BalValidators.isRequired(), BalValidators.isMinLength(4), BalValidators.isEmail()]),
    checkbox: new FormControl(true, [BalValidators.isRequiredTrue()]),
    comment: new FormControl(null, [BalValidators.isRequired()]),
  })

  setCommentDisabled() {
    this.form.get('comment')?.disable()
  }

  updateName() {
    this.form.patchValue({
      firstname: 'Nancy',
      lastname: 'Miller',
    })
  }

  onSubmit() {
    alert('Form is submitted!')
  }
}
