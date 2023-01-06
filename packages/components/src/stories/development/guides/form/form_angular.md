## Angular integration

The form elements support [Angular Reactive Forms](https://angular.io/guide/reactive-forms).
More documentation is [here](https://github.com/baloise/web-app-utils/blob/master/packages/validators/README.md)

First we need to install the validators package.

```bash
npm install @baloise/web-app-validators-angular
```

Below is a basic example to use the reactive form together with the Design System.

Angular package offers `balAutoFocus` directive which brings focus to the element.
Usage can be seen in the following code in bal-field.
In order for it to work please import `BalSharedModule` in each Angular module that uses it.

```html
<form [formGroup]="form" (ngSubmit)="onSubmit()" class="columns is-multiline mt-none">
  <bal-field class="column is-full py-none" required [disabled]="form.get('email')?.disabled">
    <bal-field-label required>Email</bal-field-label>
    <bal-field-control>
      <bal-input name="email" placeholder="Enter your email" formControlName="email" balAutoFocus></bal-input>
    </bal-field-control>
    <bal-field-message color="danger">
      <bal-ng-error controlName="email" error="isRequired">This field is required</bal-ng-error>
      <bal-ng-error controlName="email" error="isMinLength">Min length is 4</bal-ng-error>
      <bal-ng-error controlName="email" error="isEmail">Not a valid email</bal-ng-error>
    </bal-field-message>
  </bal-field>
  <bal-field class="column is-half py-none">...</bal-field>
</form>
```

In the component class wen can define the validators for the form control.

```typescript
import { Component } from '@angular/core'
import { FormControl, FormGroup } from '@angular/forms'
import { BalValidators } from '@baloise/web-app-validators-angular'

@Component({
  selector: 'app-form-page',
  templateUrl: './form-page.component.html',
})
export class FormPageComponent {
  form = new FormGroup({
    email: new FormControl(null, [BalValidators.isRequired(), BalValidators.isMinLength(4), BalValidators.isEmail()]),
  })

  onSubmit() {
    alert('Form is submitted!')
  }
}
```