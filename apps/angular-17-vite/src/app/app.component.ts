import { CommonModule } from '@angular/common'
import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core'
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'

import {
  BalApp,
  BalTag,
  BalField,
  BalFieldLabel,
  BalFieldControl,
  BalFieldMessage,
  BalInput,
  BalButton,
  BalToastService,
  BaloiseDesignSystemFormModule,
} from '@baloise/design-system-components-angular/standalone'

// import { BaloiseDesignSystemModule, BalToastService } from '@baloise/design-system-components-angular/legacy'
// import { BaloiseDesignSystemModule, BalToastService } from '@baloise/design-system-components-angular'

@Component({
  selector: 'app-root',
  standalone: true,
  // imports: [CommonModule, ReactiveFormsModule, BaloiseDesignSystemModule], // module or legacy
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BaloiseDesignSystemFormModule,
    BalApp,
    BalTag,
    BalField,
    BalFieldLabel,
    BalFieldControl,
    BalFieldMessage,
    BalInput,
    BalButton,
  ], // standalone
  providers: [BalToastService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `<bal-app>
    <bal-tag closable color="red" (balCloseClick)="onBalCloseClick()">Hello World</bal-tag>
    <bal-tag>Hello World</bal-tag>
    <form class="is-flex fg-normal is-flex-direction-column" [formGroup]="myForm" (ngSubmit)="onSubmit()">
      <bal-field required>
        <bal-field-label>Input Label</bal-field-label>
        <bal-field-control>
          <bal-input placeholder="Enter text" formControlName="input"></bal-input>
        </bal-field-control>
        <bal-field-message>
          <bal-ng-error controlName="input" error="required">This field is required</bal-ng-error>
        </bal-field-message>
      </bal-field>
      <div>
        <p class="pt-medium">Complete the form to enable button.</p>
        <button type="submit" [disabled]="!myForm.valid">Submit</button>
      </div>

      <pre data-test="result">{{ myForm.value | json }}</pre>
    </form>

    <bal-button (click)="creteToast()">Toast me</bal-button>
  </bal-app>`,
})
export class AppComponent {
  constructor(private toast: BalToastService) {}

  onBalCloseClick() {
    console.log('=> onBalCloseClick')
  }

  myForm = new FormGroup({
    input: new FormControl('Init Value', [Validators.required]),
  })

  onSubmit() {
    console.warn('=> onSubmit', this.myForm.value)
  }

  creteToast() {
    this.toast.create({
      message: 'Gugus',
    })
  }
}
