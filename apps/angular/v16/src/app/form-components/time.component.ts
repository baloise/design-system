import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core'
import { CommonModule } from '@angular/common'
import { BaloiseDesignSystemModule } from 'v16/src/generated/src'
import { FormGroup, ReactiveFormsModule } from '@angular/forms'
import { UpdateControl } from '../app.component'

@Component({
  selector: 'app-time',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, BaloiseDesignSystemModule],
  template: `
    <bal-card [formGroup]="form">
      <bal-card-title>Time</bal-card-title>
      <bal-card-content>
        <bal-field required>
          <bal-field-label>Time Label</bal-field-label>
          <bal-field-control>
            <bal-time-input placeholder="Enter time" formControlName="time"></bal-time-input>
          </bal-field-control>
          <bal-field-message>
            <bal-ng-error controlName="time" error="required">This field is required</bal-ng-error>
          </bal-field-message>
        </bal-field>
        <bal-button-group>
          <bal-button color="secondary" (click)="updateControl.emit({ name: 'time', value: '09:30' })">
            Update Time
          </bal-button>
          <bal-button color="tertiary" (click)="form.get('time')?.enable()">Enable Time</bal-button>
          <bal-button color="tertiary" (click)="form.get('time')?.disable()">Disable Time</bal-button>
        </bal-button-group>
      </bal-card-content>
    </bal-card>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimeComponent {
  @Input() form!: FormGroup

  @Output() updateControl = new EventEmitter<UpdateControl>()
}
