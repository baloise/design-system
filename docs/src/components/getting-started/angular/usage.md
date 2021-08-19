# Angular Usage

This section shows usage examples of the features from the Baloise Design System.

::: tip
More usage examples are in our Angular example app [Link](https://github.com/baloise/design-system/tree/master/examples/angular).
:::

## Component

Every Angular component that uses the components from the Baloise Design System must be declared in a ngModule with the schema `CUSTOM_ELEMENTS_SCHEMA`.

```xml
// app.component.html
<bal-button (click)="onButtonClick()">Button</bal-button>
```

```typescript
// app.component.ts
import { Component } from '@angular/core'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  onButtonClick() {
    console.log('onButtonClick')
  }
}
```

## Toast & Snackbar

The Baloise Design System has 2 services `BalToastService` and `BalSnackbarService` to create new notices.
Just import the service into the component.

```typescript
// app.component.ts
import { Component } from '@angular/core'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(public toast: BalToastService) {}

  onButtonClick() {
    this.toast.create({ message: 'Welcome' })
  }
}
```

## Pipes

The filter functions are defined as [Angular Pipes](https://angular.io/guide/pipes).

```html
<span>{{ 'baloise' | balCapitalize }}</span>
```

The can be used in the component typescript file aswell.

```typescript
import { Component } from '@angular/core'
import { balCapitalize } from '@baloise/design-system-components'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  capitalize(value: string) {
    return balCapitalize(value)
  }
}
```

## Form & Validation

The form elements support [Angular Reactive Forms](https://angular.io/guide/reactive-forms). Below is a basic example to use the reactive form together with the Design Stystem.

```html
<form [formGroup]="form" (ngSubmit)="onSubmit()" class="columns is-multiline mt-0">
  <bal-field class="column is-half py-0" expanded [disabled]="form.get('firstname')?.disabled">
    <bal-field-control>
      <bal-input formControlName="firstname"></bal-input>
    </bal-field-control>
    <bal-field-message
      color="danger"
      *ngIf="
            form.get('firstname')?.dirty && 
            form.get('firstname')?.errors && 
            form.get('firstname')?.hasError('required')
          "
    >
      Required Field
    </bal-field-message>
  </bal-field>
  <bal-field class="column is-half py-0" expanded>...</bal-field>
</form>
```

In the component class wen can define the validators for the form control.

::: tip
Go to [Validators](/components/tooling/validators.html) page to see our collection of available validators.
:::

```typescript
import { Component } from '@angular/core'
import { FormControl, FormGroup } from '@angular/forms'
import { BalValidators } from '@baloise/design-system-components-angular'

@Component({
  selector: 'app-form-page',
  templateUrl: './form-page.component.html',
})
export class FormPageComponent {
  form = new FormGroup({
    firstname: new FormControl(null, [BalValidators.isRequired]),
  })

  onSubmit() {
    alert('Form is submitted!')
  }
}
```
