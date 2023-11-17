import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormGroup, ReactiveFormsModule } from '@angular/forms'
import { BaloiseDesignSystemModule } from '@baloise/design-system-components-angular'

import { UpdateControl } from '../app.component'

@Component({
  selector: 'app-input-stepper',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, BaloiseDesignSystemModule],
  template: `
    <bal-card [formGroup]="form">
      <bal-card-title>Input Stepper</bal-card-title>
      <bal-card-content>
        <bal-field required>
          <bal-field-label>Input Stepper Label</bal-field-label>
          <bal-field-control>
            <bal-input-stepper formControlName="inputStepper"></bal-input-stepper>
          </bal-field-control>
          <bal-field-message>
            <bal-ng-error controlName="inputStepper" error="min">Min is 2</bal-ng-error>
          </bal-field-message>
        </bal-field>
        <bal-button-group>
          <bal-button color="secondary" (click)="updateControl.emit({ name: 'inputStepper', value: 'updated value' })">
            Update Input Stepper
          </bal-button>
          <bal-button color="tertiary" (click)="form.get('inputStepper')?.enable()">Enable Input Stepper</bal-button>
          <bal-button color="tertiary" (click)="form.get('inputStepper')?.disable()">Disable Input Stepper</bal-button>
        </bal-button-group>
      </bal-card-content>
    </bal-card>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputStepperComponent {
  @Input() form!: FormGroup

  @Output() updateControl = new EventEmitter<UpdateControl>()
}
