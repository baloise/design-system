import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormGroup, ReactiveFormsModule } from '@angular/forms'
import { BaloiseDesignSystemModule } from '@baloise/design-system-components-angular'

import { UpdateControl } from '../app.component'

@Component({
  selector: 'app-datepicker',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, BaloiseDesignSystemModule],
  template: `
    <bal-card [formGroup]="form">
      <bal-card-title>Datepicker</bal-card-title>
      <bal-card-content>
        <bal-field
          required
          [disabled]="form.get('datepicker')?.disabled"
          [invalid]="form.get('datepicker')?.touched && form.get('datepicker')?.invalid"
        >
          <bal-field-label>Datepicker Label</bal-field-label>
          <bal-field-control>
            <bal-datepicker placeholder="Pick a date" formControlName="datepicker"></bal-datepicker>
          </bal-field-control>
          <bal-field-message>
            <bal-ng-error controlName="datepicker" error="required">This field is required</bal-ng-error>
          </bal-field-message>
        </bal-field>
        <bal-button-group>
          <bal-button color="secondary" (click)="updateControl.emit({ name: 'datepicker', value: '2023-10-21' })">
            Update Datepicker
          </bal-button>
          <bal-button color="tertiary" (click)="form.get('datepicker')?.enable()">Enable Datepicker</bal-button>
          <bal-button color="tertiary" (click)="form.get('datepicker')?.disable()">Disable Datepicker</bal-button>
        </bal-button-group>
      </bal-card-content>
    </bal-card>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatePickerComponent {
  @Input() form!: FormGroup

  @Output() updateControl = new EventEmitter<UpdateControl>()
}
