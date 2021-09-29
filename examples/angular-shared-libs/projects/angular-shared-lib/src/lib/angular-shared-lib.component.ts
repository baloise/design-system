import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup } from '@angular/forms'
import { BalValidators } from '@baloise/design-system-components-angular'

@Component({
  selector: 'lib-angular-shared-lib',
  template: `<form [formGroup]="form" (ngSubmit)="onSubmit()">
    <bal-datepicker formControlName="birthdate" placeholder="Placeholder"></bal-datepicker>
    <bal-ng-error controlName="birthdate" error="isRequired">This field is required</bal-ng-error>
  </form> `,
  styles: [],
})
export class AngularSharedLibComponent implements OnInit {
  form = new FormGroup({
    birthdate: new FormControl(null, [BalValidators.isRequired()]),
  })

  constructor() {}

  ngOnInit(): void {}

  onSubmit() {
    alert('Form is submitted!')
  }
}
