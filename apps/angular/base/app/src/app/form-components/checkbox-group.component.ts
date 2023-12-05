import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormGroup, ReactiveFormsModule } from '@angular/forms'
import { balImports } from '../../design-system'
import { UpdateControl } from '../app.component'

@Component({
  selector: 'app-checkbox-group',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ...balImports],
  template: `
    <bal-card [formGroup]="form">
      <bal-card-title>Checkbox Group</bal-card-title>
      <bal-card-content>
        <bal-field required>
          <bal-field-label>Checkbox Group Label</bal-field-label>
          <bal-field-control>
            <bal-checkbox-group control formControlName="checkboxGroup" data-test="checkboxGroup">
              <bal-checkbox value="Apple">Apple</bal-checkbox>
              <bal-checkbox value="Kiwi">Kiwi</bal-checkbox>
              <bal-checkbox value="Mango">Mango</bal-checkbox>
            </bal-checkbox-group>
          </bal-field-control>
          <bal-field-message>
            <bal-ng-error controlName="checkboxGroup" error="required">This field is required</bal-ng-error>
          </bal-field-message>
        </bal-field>
        <bal-button-group>
          <bal-button color="secondary" (click)="updateControl.emit({ name: 'checkboxGroup', value: ['Apple'] })">
            Update Checkbox Group
          </bal-button>
          <bal-button color="tertiary" (click)="form.get('checkboxGroup')?.enable()">Enable Checkbox Group</bal-button>
          <bal-button color="tertiary" (click)="form.get('checkboxGroup')?.disable()"
            >Disable Checkbox Group</bal-button
          >
        </bal-button-group>
      </bal-card-content>
    </bal-card>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckboxGroupComponent {
  @Input() form!: FormGroup

  @Output() updateControl = new EventEmitter<UpdateControl>()
}
