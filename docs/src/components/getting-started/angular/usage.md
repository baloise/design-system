# Angular Usage

This section shows usage examples of the features from the Baloise Design System.

::: tip
More usage examples are in our Angular example app [Link](https://github.com/baloise/design-system/tree/master/examples/angular).
:::

## Component

After adding the `BaloiseDesignSystemModule` module we can use all the components from the Baloise Design System.

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

**Components:**

- [Snackbar](/components/components/bal-snackbar.html)
- [Toast](/components/components/bal-toast.html)

```typescript
// app.component.ts
import { Component } from '@angular/core'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  myToast?: HTMLBalToastElement

  constructor(public toast: BalToastService) {}

  onButtonClick() {
    this.myToast = this.toast.create({ message: 'Welcome' })
  }

  async onSecondBttonClick() {
    await this.myToast.close()
  }
}
```

## Pipes

The filter functions are defined as [Angular Pipes](https://angular.io/guide/pipes).

::: tip
More pipes/filters are listet here [filters](/components/tooling/filters.html)
:::

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
  <bal-field class="column is-full py-0" expanded required [disabled]="form.get('email')?.disabled">
    <bal-field-label required>Email</bal-field-label>
    <bal-field-control>
      <bal-input name="email" placeholder="Enter your email" formControlName="email"></bal-input>
    </bal-field-control>
    <bal-field-message color="danger">
      <bal-ng-error controlName="email" error="isRequired">This field is required</bal-ng-error>
      <bal-ng-error controlName="email" error="isMinLength">Min length is 4</bal-ng-error>
      <bal-ng-error controlName="email" error="isEmail">Not a valid email</bal-ng-error>
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
    email: new FormControl(null, [BalValidators.isRequired(), BalValidators.isMinLength(4), BalValidators.isEmail()]),
  })

  onSubmit() {
    alert('Form is submitted!')
  }
}
```

## Modal Service

For the angular framework we provide a `ModalService` to create more easaly and dynamic.

### 1. Define the modal component

Create a html and a typscirpt file for your modal component like this.

```html
<bal-modal-header>Modal Title</bal-modal-header>
<bal-modal-body>
  <p>{{ firstName }}</p>
  <p>{{ lastName }}</p>
  <p>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
    aliqua.
  </p>
</bal-modal-body>
<bal-modal-footer>
  <bal-modal-actions>
    <bal-button color="link" (click)="closeModal()">Cancel</bal-button>
    <bal-button color="primary" (click)="closeModal()">Okay</bal-button>
  </bal-modal-actions>
</bal-modal-footer>
```

With the help of the `BalModalService` we are able to close the modal.

```typescript{2,9-11,13,16-20}
import { Component, Input } from '@angular/core'
import { BalModalService } from '@baloise/design-system-components-angular'

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
})
export class ModalComponent {
  // Data passed in by componentProps
  @Input() firstName!: string
  @Input() lastName!: string

  constructor(private modalService: BalModalService) {}

  closeModal() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalService.dismiss({
      dismissed: true,
    })
  }
}
```

### 2. Create the modal

From the main component we can easaly create a modal with the `BalModalService`.

```typescript
import { Component } from '@angular/core'
import { BalModalService } from '@baloise/design-system-components-angular'
import { ModalComponent } from './modal.component'

@Component({
  selector: 'app-modal-page',
  templateUrl: './modal-page.component.html',
})
export class ModalPageComponent {
  modal!: HTMLBalModalElement

  constructor(private modalService: BalModalService) {}

  async openModal() {
    this.modal = await this.modalService.create({
      component: ModalComponent,
      componentProps: {
        firstName: 'Peter',
        lastName: 'Parker',
      },
    })
    await this.modal.present()

    // Collect the data from the modal through the disiss event
    const { data } = await this.modal.onWillDismiss()
  }

  closeModal() {
    this.modal.dismiss()
  }
}
```

## Modal without the service

Simply define the modal layout in your custom component and add the element reference with `#modal` to the model element.

```html{3}
<bal-button (click)="openModal()">Open Modal</bal-button>

<bal-modal #modal>
  <bal-modal-header>Modal Title</bal-modal-header>
  <bal-modal-body>
    <p>...</p>
  </bal-modal-body>
  <bal-modal-footer>
    <bal-modal-actions>
      <bal-button color="link" (click)="closeModal()">Cancel</bal-button>
      <bal-button color="primary" (click)="closeModal()">Okay</bal-button>
    </bal-modal-actions>
  </bal-modal-footer>
</bal-modal>
```

In your component register the element reference with `@ViewChild('modal')`. With that reference you are able to access the methods of the modal component.

```typescript{1,2,9,12,16}
import { Component, ViewChild } from '@angular/core'
import type { Components } from '@baloise/design-system-components'

@Component({
  selector: 'app-modal',
  templateUrl: './modal-page.component.html',
})
export class ModalPageComponent {
  @ViewChild('modal') modal!: Components.BalModal

  openModal() {
    this.modal.open()
  }

  closeModal() {
    this.modal.close()
  }
}

```
