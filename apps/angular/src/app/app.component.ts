import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterOutlet } from '@angular/router'
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { BaloiseDesignSystemModule } from 'src/generated/src'
import { InputComponent } from './form-components/input.component'
import { TextareaComponent } from './form-components/textarea.component'
import { NumberInputComponent } from './form-components/number-input.component'
import { DateComponent } from './form-components/date.component'
import { TimeComponent } from './form-components/time.component'
import { InputStepperComponent } from './form-components/input-stepper.component'
import { SliderComponent } from './form-components/input-slider.component'
import { DropdownComponent } from './form-components/select-dropdown.component'

export interface UpdateControl {
  name: string
  value: any
}

@Component({
  selector: 'app-root',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    RouterOutlet,
    ReactiveFormsModule,
    BaloiseDesignSystemModule,
    InputComponent,
    TextareaComponent,
    NumberInputComponent,
    DateComponent,
    TimeComponent,
    InputStepperComponent,
    SliderComponent,
    DropdownComponent,
  ],
  template: `
    <bal-app class="has-sticky-footer">
      <main class="container py-normal">
        <form class="is-flex fg-normal is-flex-direction-column" [formGroup]="myForm" (ngSubmit)="onSubmit()">
          <app-input [form]="myForm" (updateControl)="updateValue($event)"></app-input>
          <app-textarea [form]="myForm" (updateControl)="updateValue($event)"></app-textarea>
          <app-number-input [form]="myForm" (updateControl)="updateValue($event)"></app-number-input>
          <app-date [form]="myForm" (updateControl)="updateValue($event)"></app-date>
          <app-time [form]="myForm" (updateControl)="updateValue($event)"></app-time>
          <app-input-stepper [form]="myForm" (updateControl)="updateValue($event)"></app-input-stepper>
          <app-slider [form]="myForm" (updateControl)="updateValue($event)"></app-slider>
          <app-dropdown [form]="myForm" (updateControl)="updateValue($event)"></app-dropdown>
          <app-dropdown [multiple]="true" [form]="myForm" (updateControl)="updateValue($event)"></app-dropdown>
          <app-dropdown [typeahead]="true" [form]="myForm" (updateControl)="updateValue($event)"></app-dropdown>

          <div>
            <p class="pt-medium">Complete the form to enable button.</p>
            <bal-button elementType="submit" [disabled]="!myForm.valid">Submit</bal-button>
          </div>

          <pre data-test="result">{{ myForm.value | json }}</pre>

          <router-outlet></router-outlet>
        </form>
      </main>
    </bal-app>
  `,
})
export class AppComponent {
  myForm = new FormGroup({
    input: new FormControl('', [Validators.required]),
    textarea: new FormControl('', [Validators.required]),
    numberInput: new FormControl('', [Validators.required]),
    date: new FormControl('', [Validators.required]),
    time: new FormControl('', [Validators.required]),
    inputStepper: new FormControl(0, [Validators.min(2)]),
    slider: new FormControl(0, [Validators.min(10)]),
    dropdown: new FormControl('', [Validators.required]),
    dropdownMultiple: new FormControl([], [Validators.required]),
    typeahead: new FormControl([], [Validators.required]),
  })

  updateValue(option: UpdateControl) {
    const control = this.myForm.get(option.name)
    if (control) {
      control.setValue(option.value)
    }
  }

  onSubmit() {
    console.warn(this.myForm.value)
  }
}
