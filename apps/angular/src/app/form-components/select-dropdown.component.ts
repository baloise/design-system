import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core'
import { CommonModule } from '@angular/common'
import { BaloiseDesignSystemModule } from 'src/generated/src'
import { FormGroup, ReactiveFormsModule } from '@angular/forms'
import { UpdateControl } from '../app.component'

@Component({
  selector: 'app-dropdown',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, BaloiseDesignSystemModule],
  template: `
    <bal-card [formGroup]="form">
      <bal-card-title>Dropdown</bal-card-title>
      <bal-card-content>
        <bal-field
          required
          [disabled]="form.get('dropdown')?.disabled"
          [invalid]="form.get('dropdown')?.touched && form.get('dropdown')?.invalid"
        >
          <bal-field-label>Dropdown Label</bal-field-label>
          <bal-field-control>
            <bal-select placeholder="Chose a fruit" formControlName="dropdown">
              <bal-select-option *ngFor="let option of options" [label]="option" [value]="option">{{
                option
              }}</bal-select-option>
            </bal-select>
          </bal-field-control>
          <bal-field-message>
            <bal-ng-error controlName="dropdown" error="required">This field is required</bal-ng-error>
          </bal-field-message>
        </bal-field>
        <bal-button-group>
          <bal-button color="secondary" (click)="updateControl.emit({ name: 'dropdown', value: 'Apple' })">
            Update Dropdown
          </bal-button>
          <bal-button color="tertiary" (click)="form.get('dropdown')?.enable()">Enable Dropdown</bal-button>
          <bal-button color="tertiary" (click)="form.get('dropdown')?.disable()">Disable Dropdown</bal-button>
        </bal-button-group>
      </bal-card-content>
    </bal-card>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DropdownComponent {
  @Input() form!: FormGroup

  @Output() updateControl = new EventEmitter<UpdateControl>()

  options = ['Apple', 'Banana', 'Orange', 'Mango', 'Strawberry', 'Pineapple', 'Grapes', 'Watermelon', 'Kiwi', 'Peach']
}
