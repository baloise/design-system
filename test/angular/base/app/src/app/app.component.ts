import { CommonModule } from '@angular/common'
import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core'
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { BalModalService, balImports } from '../design-system'
import { CheckboxGroupComponent } from './form-components/checkbox-group.component'
import { CheckboxTilesComponent } from './form-components/checkbox-tiles.component'
import { CheckboxComponent } from './form-components/checkbox.component'
import { DateComponent } from './form-components/date.component'
import { DropdownComponent } from './form-components/dropdown.component'
import { InputDateComponent } from './form-components/input-date.component'
import { SliderComponent } from './form-components/input-slider.component'
import { InputStepperComponent } from './form-components/input-stepper.component'
import { InputComponent } from './form-components/input.component'
import { NumberInputComponent } from './form-components/number-input.component'
import { RadioButtonsComponent } from './form-components/radio-buttons.component'
import { RadioComponent } from './form-components/radio.component'
import { SegmentComponent } from './form-components/segment.component'
import { SelectComponent } from './form-components/select.component'
import { TextareaComponent } from './form-components/textarea.component'
import { TimeComponent } from './form-components/time.component'
import { ModalComponent } from './modal.component'

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
    ReactiveFormsModule,
    ...balImports,
    InputComponent,
    TextareaComponent,
    NumberInputComponent,
    TimeComponent,
    InputStepperComponent,
    SliderComponent,
    DropdownComponent,
    SelectComponent,
    CheckboxComponent,
    CheckboxGroupComponent,
    CheckboxTilesComponent,
    RadioComponent,
    RadioButtonsComponent,
    DateComponent,
    InputDateComponent,
    SegmentComponent,
  ],
  template: `
    <bal-app class="has-sticky-footer">
      <main class="container py-normal">
        <form class="is-flex fg-normal is-flex-direction-column" [formGroup]="myForm" (ngSubmit)="onSubmit()">
          <app-input [form]="myForm" (updateControl)="updateValue($event)"></app-input>
          <app-textarea [form]="myForm" (updateControl)="updateValue($event)"></app-textarea>
          <app-number-input [form]="myForm" (updateControl)="updateValue($event)"></app-number-input>
          <app-date [form]="myForm" (updateControl)="updateValue($event)"></app-date>
          <app-input-date [form]="myForm" (updateControl)="updateValue($event)"></app-input-date>
          <app-time [form]="myForm" (updateControl)="updateValue($event)"></app-time>
          <app-input-stepper [form]="myForm" (updateControl)="updateValue($event)"></app-input-stepper>
          <app-slider [form]="myForm" (updateControl)="updateValue($event)"></app-slider>
          <app-dropdown [form]="myForm" (updateControl)="updateValue($event)"></app-dropdown>
          <app-dropdown [multiple]="true" [form]="myForm" (updateControl)="updateValue($event)"></app-dropdown>
          <app-select [form]="myForm" (updateControl)="updateValue($event)"></app-select>
          <app-select [multiple]="true" [form]="myForm" (updateControl)="updateValue($event)"></app-select>
          <app-select [typeahead]="true" [form]="myForm" (updateControl)="updateValue($event)"></app-select>
          <app-checkbox [form]="myForm" (updateControl)="updateValue($event)"></app-checkbox>
          <app-checkbox-group [form]="myForm" (updateControl)="updateValue($event)"></app-checkbox-group>
          <app-checkbox-tiles [form]="myForm" (updateControl)="updateValue($event)"></app-checkbox-tiles>
          <app-radio [form]="myForm" (updateControl)="updateValue($event)"></app-radio>
          <app-radio-buttons [form]="myForm" (updateControl)="updateValue($event)"></app-radio-buttons>
          <app-segment [form]="myForm" (updateControl)="updateValue($event)"></app-segment>

          <div>
            <p class="pt-medium">Complete the form to enable button.</p>
            <bal-button elementType="submit" [disabled]="!myForm.valid">Submit</bal-button>
          </div>

          <pre data-test="result">{{ myForm.value | json }}</pre>
          <pre data-test="result-modal">{{ modalData | json }}</pre>
        </form>
        <bal-button (click)="openModal()">Open Modal</bal-button>
      </main>
    </bal-app>
  `,
})
export class AppComponent {
  modalData!: any
  modal!: HTMLBalModalElement

  myForm = new FormGroup({
    input: new FormControl('Init Value', [Validators.required]),
    textarea: new FormControl('Init Value', [Validators.required]),
    numberInput: new FormControl(null, [Validators.required]),
    inputDate: new FormControl('2023-09-09', [Validators.required]),
    date: new FormControl('2023-09-09', [Validators.required]),
    time: new FormControl(null, [Validators.required]),
    inputStepper: new FormControl(0, [Validators.min(2)]),
    slider: new FormControl(30, [Validators.min(10)]),
    dropdown: new FormControl(null, [Validators.required]),
    dropdownMultiple: new FormControl(['Kiwi'], [Validators.required]),
    select: new FormControl('Kiwi', [Validators.required]),
    selectMultiple: new FormControl(['Kiwi'], [Validators.required]),
    typeahead: new FormControl('Kiwi', [Validators.required]),
    checkbox: new FormControl(false, [Validators.requiredTrue]),
    checkboxGroup: new FormControl(['Kiwi'], [Validators.required]),
    checkboxTiles: new FormControl(['Kiwi'], [Validators.required]),
    radio: new FormControl('Kiwi', [Validators.required]),
    radioButtons: new FormControl('Kiwi', [Validators.required]),
    segment: new FormControl('Kiwi', [Validators.required]),
  })

  constructor(private modalService: BalModalService) {}

  updateValue(option: UpdateControl) {
    const control = this.myForm.get(option.name)
    if (control) {
      control.setValue(option.value)
    }
  }

  onSubmit() {
    console.warn(this.myForm.value)
  }

  async openModal() {
    this.modal = await this.modalService.create({
      component: ModalComponent,
      componentProps: {
        firstName: 'Peter',
        lastName: 'Parker',
      },
    })
    await this.modal.present()

    // Collect the data from the modal through the dismiss event
    const { data } = await this.modal.onWillDismiss()
    this.modalData = data

    // React onDidDismiss
    await this.modal.onDidDismiss()
  }

  closeModal() {
    this.modal.dismiss()
  }
}
