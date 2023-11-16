import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterOutlet } from '@angular/router'
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { BalApp, BalButton } from '@baloise/design-system-components-angular/standalone'

import { InputComponent } from './form-components/input.component'
import { TextareaComponent } from './form-components/textarea.component'
import { NumberInputComponent } from './form-components/number-input.component'
import { DatePickerComponent } from './form-components/datepicker.component'
import { TimeComponent } from './form-components/time.component'
import { InputStepperComponent } from './form-components/input-stepper.component'
import { SliderComponent } from './form-components/input-slider.component'
import { DropdownComponent } from './form-components/select-dropdown.component'
import { CheckboxComponent } from './form-components/checkbox.component'
import { CheckboxGroupComponent } from './form-components/checkbox-group.component'
import { CheckboxButtonsComponent } from './form-components/checkbox-buttons.component'
import { RadioComponent } from './form-components/radio.component'
import { RadioButtonsComponent } from './form-components/radio-buttons.component'
import { DateComponent } from './form-components/date.component'
import { InputDateComponent } from './form-components/input-date.component'

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
    BalApp,
    BalButton,
    InputComponent,
    TextareaComponent,
    NumberInputComponent,
    DatePickerComponent,
    TimeComponent,
    InputStepperComponent,
    SliderComponent,
    DropdownComponent,
    CheckboxComponent,
    CheckboxGroupComponent,
    CheckboxButtonsComponent,
    RadioComponent,
    RadioButtonsComponent,
    DateComponent,
    InputDateComponent,
  ],
  template: `
    <bal-app class="has-sticky-footer">
      <main class="container py-normal">
        <form class="is-flex fg-normal is-flex-direction-column" [formGroup]="myForm" (ngSubmit)="onSubmit()">
          <app-input [form]="myForm" (updateControl)="updateValue($event)"></app-input>
          <app-textarea [form]="myForm" (updateControl)="updateValue($event)"></app-textarea>
          <app-number-input [form]="myForm" (updateControl)="updateValue($event)"></app-number-input>
          <app-datepicker [form]="myForm" (updateControl)="updateValue($event)"></app-datepicker>
          <app-date [form]="myForm" (updateControl)="updateValue($event)"></app-date>
          <app-input-date [form]="myForm" (updateControl)="updateValue($event)"></app-input-date>
          <app-time [form]="myForm" (updateControl)="updateValue($event)"></app-time>
          <app-input-stepper [form]="myForm" (updateControl)="updateValue($event)"></app-input-stepper>
          <app-slider [form]="myForm" (updateControl)="updateValue($event)"></app-slider>
          <app-dropdown [form]="myForm" (updateControl)="updateValue($event)"></app-dropdown>
          <app-dropdown [multiple]="true" [form]="myForm" (updateControl)="updateValue($event)"></app-dropdown>
          <app-dropdown [typeahead]="true" [form]="myForm" (updateControl)="updateValue($event)"></app-dropdown>
          <app-checkbox [form]="myForm" (updateControl)="updateValue($event)"></app-checkbox>
          <app-checkbox-group [form]="myForm" (updateControl)="updateValue($event)"></app-checkbox-group>
          <app-checkbox-buttons [form]="myForm" (updateControl)="updateValue($event)"></app-checkbox-buttons>
          <app-radio [form]="myForm" (updateControl)="updateValue($event)"></app-radio>
          <app-radio-buttons [form]="myForm" (updateControl)="updateValue($event)"></app-radio-buttons>
          <div>
            <p class="pt-medium">Complete the form to enable button.</p>
            <bal-button elementType="submit" [disabled]="!myForm.valid">Submit</bal-button>
          </div>
          <pre data-test="result">{{ myForm.value | json }}</pre>
        </form>
      </main>
    </bal-app>
  `,
})
export class AppComponent {
  myForm = new FormGroup({
    input: new FormControl('Init Value', [Validators.required]),
    textarea: new FormControl('Init Value', [Validators.required]),
    numberInput: new FormControl(null, [Validators.required]),
    inputDate: new FormControl('2023-09-09', [Validators.required]),
    datepicker: new FormControl('2023-09-09', [Validators.required]),
    date: new FormControl('2023-09-09', [Validators.required]),
    time: new FormControl(null, [Validators.required]),
    inputStepper: new FormControl(0, [Validators.min(2)]),
    slider: new FormControl(30, [Validators.min(10)]),
    dropdown: new FormControl('Kiwi', [Validators.required]),
    dropdownMultiple: new FormControl(['Kiwi'], [Validators.required]),
    typeahead: new FormControl('Kiwi', [Validators.required]),
    checkbox: new FormControl(false, [Validators.requiredTrue]),
    checkboxGroup: new FormControl(['Kiwi'], [Validators.required]),
    checkboxButtons: new FormControl(['Kiwi'], [Validators.required]),
    radio: new FormControl('Kiwi', [Validators.required]),
    radioButtons: new FormControl('Kiwi', [Validators.required]),
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
