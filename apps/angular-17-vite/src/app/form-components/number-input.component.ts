import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormGroup, ReactiveFormsModule } from '@angular/forms'
import { UpdateControl } from '../app.component'
import { BalCardBundle, BalFormBundle, BalLayoutBundle } from '@baloise/design-system-components-angular/standalone'

@Component({
  selector: 'app-number-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ...BalLayoutBundle, ...BalFormBundle, ...BalCardBundle],
  template: `
    <bal-card [formGroup]="form">
      <bal-card-title>Number Input</bal-card-title>
      <bal-card-content>
        <bal-field required>
          <bal-field-label>Number Input Label</bal-field-label>
          <bal-field-control>
            <bal-number-input
              placeholder="Enter a number"
              formControlName="numberInput"
              decimal="2"
              suffix="CHF"
            ></bal-number-input>
          </bal-field-control>
          <bal-field-message>
            <bal-ng-error controlName="numberInput" error="required">This field is required</bal-ng-error>
          </bal-field-message>
        </bal-field>
        <bal-button-group>
          <bal-button color="secondary" (click)="updateControl.emit({ name: 'numberInput', value: 42.15 })">
            Update Number Input
          </bal-button>
          <bal-button color="tertiary" (click)="form.get('numberInput')?.enable()">Enable Number Input</bal-button>
          <bal-button color="tertiary" (click)="form.get('numberInput')?.disable()">Disable Number Input</bal-button>
        </bal-button-group>
      </bal-card-content>
    </bal-card>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NumberInputComponent {
  @Input() form!: FormGroup

  @Output() updateControl = new EventEmitter<UpdateControl>()
}
