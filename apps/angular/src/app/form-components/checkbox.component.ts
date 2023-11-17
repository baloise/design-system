import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormGroup, ReactiveFormsModule } from '@angular/forms'
import { BaloiseDesignSystemModule } from '@baloise/design-system-components-angular'

import { UpdateControl } from '../app.component'

@Component({
  selector: 'app-checkbox',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, BaloiseDesignSystemModule],
  template: `
    <bal-card [formGroup]="form">
      <bal-card-title>Checkbox</bal-card-title>
      <bal-card-content>
        <bal-field required>
          <bal-field-label>Checkbox Label</bal-field-label>
          <bal-field-control>
            <bal-checkbox formControlName="checkbox">My Checkbox</bal-checkbox>
          </bal-field-control>
          <bal-field-message>
            <bal-ng-error controlName="checkbox" error="required">This field is required</bal-ng-error>
          </bal-field-message>
        </bal-field>
        <bal-button-group>
          <bal-button color="secondary" (click)="updateControl.emit({ name: 'checkbox', value: false })">
            Update Checkbox
          </bal-button>
          <bal-button color="tertiary" (click)="form.get('checkbox')?.enable()">Enable Checkbox</bal-button>
          <bal-button color="tertiary" (click)="form.get('checkbox')?.disable()">Disable Checkbox</bal-button>
        </bal-button-group>
      </bal-card-content>
    </bal-card>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckboxComponent {
  @Input() form!: FormGroup

  @Output() updateControl = new EventEmitter<UpdateControl>()
}
