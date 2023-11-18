import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core'
import { CommonModule } from '@angular/common'
import { BaloiseDesignSystemModule } from '@baloise/design-system-components-angular'
import { FormGroup, ReactiveFormsModule } from '@angular/forms'
import { UpdateControl } from '../app.component'

@Component({
  selector: 'app-date',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, BaloiseDesignSystemModule],
  template: `
    <bal-card [formGroup]="form">
      <bal-card-title>Date</bal-card-title>
      <bal-card-content>
        <bal-field required>
          <bal-field-label>Date Label</bal-field-label>
          <bal-field-control>
            <bal-date placeholder="Enter a date" formControlName="date"></bal-date>
          </bal-field-control>
          <bal-field-message>
            <bal-ng-error controlName="date" error="required">This field is required</bal-ng-error>
          </bal-field-message>
        </bal-field>
        <bal-button-group>
          <bal-button color="secondary" (click)="updateControl.emit({ name: 'date', value: '2023-10-21' })">
            Update Date
          </bal-button>
          <bal-button color="tertiary" (click)="form.get('date')?.enable()">Enable Date</bal-button>
          <bal-button color="tertiary" (click)="form.get('date')?.disable()">Disable Date</bal-button>
        </bal-button-group>
      </bal-card-content>
    </bal-card>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DateComponent {
  @Input() form!: FormGroup

  @Output() updateControl = new EventEmitter<UpdateControl>()
}
