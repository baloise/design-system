import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterOutlet } from '@angular/router'
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { BaloiseDesignSystemModule } from 'src/generated/src'
import { InputComponent } from './form-components/input.component'

export interface UpdateControl {
  name: string
  value: string
}

@Component({
  selector: 'app-root',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [CommonModule, RouterOutlet, ReactiveFormsModule, BaloiseDesignSystemModule, InputComponent],
  template: `
    <bal-app class="has-sticky-footer">
      <main class="container py-normal">
        <form class="is-flex fg-normal is-flex-direction-column" [formGroup]="myForm" (ngSubmit)="onSubmit()">
          <app-input [form]="myForm" (updateControl)="updateValue($event)"></app-input>

          <!-- <bal-card>
            <bal-card-title>Textarea</bal-card-title>
            <bal-card-content>
              <bal-field>
                <bal-field-label>Textarea Input</bal-field-label>
                <bal-field-control>
                  <bal-textarea placeholder="Enter text"></bal-textarea>
                </bal-field-control>
              </bal-field>
            </bal-card-content>
          </bal-card>

          <bal-card>
            <bal-card-title>Checkbox</bal-card-title>
            <bal-card-content>
              <bal-field>
                <bal-field-label>Checkbox</bal-field-label>
                <bal-field-control>
                  <bal-checkbox>My Checkbox</bal-checkbox>
                </bal-field-control>
              </bal-field>

              <bal-field>
                <bal-field-label>Checkbox Group</bal-field-label>
                <bal-field-control>
                  <bal-checkbox-group control>
                    <bal-checkbox value="1">My Checkbox 1</bal-checkbox>
                    <bal-checkbox value="2">My Checkbox 2</bal-checkbox>
                    <bal-checkbox value="3">My Checkbox 3</bal-checkbox>
                  </bal-checkbox-group>
                </bal-field-control>
              </bal-field>
            </bal-card-content>
          </bal-card>

          <bal-card>
            <bal-card-title>Radio</bal-card-title>
            <bal-card-content>
              <bal-field>
                <bal-field-label>Radio</bal-field-label>
                <bal-field-control>
                  <bal-radio-group>
                    <bal-radio name="radio-example" value="1">My radio 1</bal-radio>
                    <bal-radio name="radio-example" value="2">My radio 2</bal-radio>
                    <bal-radio name="radio-example" value="3">My radio 3</bal-radio>
                  </bal-radio-group>
                </bal-field-control>
              </bal-field>
            </bal-card-content>
          </bal-card>

          <bal-card>
            <bal-card-title>Select</bal-card-title>
            <bal-card-content>
              <bal-field>
                <bal-field-label>Select</bal-field-label>
                <bal-field-control>
                  <bal-select placeholder="Select an option">
                    <bal-select-option value="1" label="My option 1">My option 1</bal-select-option>
                    <bal-select-option value="2" label="My option 2">My option 2</bal-select-option>
                    <bal-select-option value="3" label="My option 3">My option 3</bal-select-option>
                  </bal-select>
                </bal-field-control>
              </bal-field>
              <bal-field>
                <bal-field-label>Select Multiple</bal-field-label>
                <bal-field-control>
                  <bal-select placeholder="Select an option" multiple>
                    <bal-select-option value="1" label="My option 1">My option 1</bal-select-option>
                    <bal-select-option value="2" label="My option 2">My option 2</bal-select-option>
                    <bal-select-option value="3" label="My option 3">My option 3</bal-select-option>
                  </bal-select>
                </bal-field-control>
              </bal-field>
            </bal-card-content>
          </bal-card>

          <bal-card>
            <bal-card-title>Datepicker</bal-card-title>
            <bal-card-content>
              <bal-field>
                <bal-field-label>Datepicker</bal-field-label>
                <bal-field-control>
                  <bal-datepicker placeholder="Pick a date"></bal-datepicker>
                </bal-field-control>
              </bal-field>
            </bal-card-content>
          </bal-card> -->

          <div>
            <p class="pt-medium">Complete the form to enable button.</p>
            <bal-button elementType="submit" [disabled]="!myForm.valid">Submit</bal-button>
          </div>

          {{ myForm.value | json }}

          <router-outlet></router-outlet>
        </form>
      </main>
    </bal-app>
  `,
})
export class AppComponent {
  myForm = new FormGroup({
    textInput: new FormControl('', [Validators.required]),
  })

  updateValue(option: UpdateControl) {
    console.log('updateValue', option)
    const control = this.myForm.get(option.name)
    if (control) {
      control.setValue(option.value)
    }
  }

  onSubmit() {
    console.warn(this.myForm.value)
  }
}
