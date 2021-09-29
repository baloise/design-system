import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup } from '@angular/forms'
import { BalValidators } from '@baloise/design-system-components-angular'

@Component({
  selector: 'lib-angular-shared-lib',
  template: `<bal-card>
    <bal-card-content [formGroup]="form">
      <bal-field expanded>
        <bal-field-label required>Label</bal-field-label>
        <bal-field-control>
          <bal-datepicker expanded formControlName="birthdate"></bal-datepicker>
        </bal-field-control>
        <bal-field-message color="danger">
          <bal-ng-error controlName="birthdate" error="isRequired">This field is required</bal-ng-error>
        </bal-field-message>
      </bal-field>
    </bal-card-content>
  </bal-card> `,
  styles: [],
})
export class AngularSharedLibComponent implements OnInit {
  form = new FormGroup({
    birthdate: new FormControl(null, [BalValidators.isRequired()]),
  })

  constructor() {}

  ngOnInit(): void {}
}
