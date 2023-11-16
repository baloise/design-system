import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormGroup, ReactiveFormsModule } from '@angular/forms'
import { UpdateControl } from '../app.component'
import { BalLayoutBundle, BalFormBundle, BalCardBundle } from '@baloise/design-system-components-angular/standalone'

@Component({
  selector: 'app-input-date',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ...BalLayoutBundle, ...BalFormBundle, ...BalCardBundle],
  template: `
    <bal-card [formGroup]="form">
      <bal-card-title>Input Date</bal-card-title>
      <bal-card-content>
        <bal-field
          required
          [disabled]="form.get('inputDate')?.disabled"
          [invalid]="form.get('inputDate')?.touched && form.get('inputDate')?.invalid"
        >
          <bal-field-label>Input Date Label</bal-field-label>
          <bal-field-control>
            <bal-input-date placeholder="Type a date" formControlName="inputDate"></bal-input-date>
          </bal-field-control>
          <bal-field-message>
            <bal-ng-error controlName="inputDate" error="required">This field is required</bal-ng-error>
          </bal-field-message>
        </bal-field>
        <bal-button-group>
          <bal-button color="secondary" (click)="updateControl.emit({ name: 'inputDate', value: '2023-10-21' })">
            Update Input Date
          </bal-button>
          <bal-button color="tertiary" (click)="form.get('inputDate')?.enable()">Enable Input Date</bal-button>
          <bal-button color="tertiary" (click)="form.get('inputDate')?.disable()">Disable Input Date</bal-button>
        </bal-button-group>
      </bal-card-content>
    </bal-card>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputDateComponent {
  @Input() form!: FormGroup

  @Output() updateControl = new EventEmitter<UpdateControl>()
}
