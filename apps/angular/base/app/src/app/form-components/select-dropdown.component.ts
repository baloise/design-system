import { CUSTOM_ELEMENTS_SCHEMA, ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormGroup, ReactiveFormsModule } from '@angular/forms'
import { balImports } from '../../design-system'
import { UpdateControl } from '../app.component'

@Component({
  selector: 'app-dropdown',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ...balImports],
  template: `
    <bal-card [formGroup]="form">
      <bal-card-title>{{ label }}</bal-card-title>
      <bal-card-content>
        <bal-field required>
          <bal-field-label>{{ label }} Label</bal-field-label>
          <bal-field-control>
            <bal-select
              [attr.data-test]="control"
              placeholder="Chose a fruit"
              [formControlName]="control"
              [multiple]="multiple"
              [typeahead]="typeahead"
            >
              <bal-select-option *ngFor="let option of options" [label]="option" [value]="option">{{
                option
              }}</bal-select-option>
            </bal-select>
          </bal-field-control>
          <bal-field-message>
            <bal-ng-error [controlName]="control" error="required">This field is required</bal-ng-error>
          </bal-field-message>
        </bal-field>
        <bal-button-group>
          <bal-button color="secondary" (click)="updateControl.emit({ name: control, value: 'Apple' })">
            Update {{ label }}
          </bal-button>
          <bal-button color="tertiary" (click)="form.get(control)?.enable()">Enable {{ label }}</bal-button>
          <bal-button color="tertiary" (click)="form.get(control)?.disable()">Disable {{ label }}</bal-button>
        </bal-button-group>
      </bal-card-content>
    </bal-card>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DropdownComponent {
  @Input() form!: FormGroup
  @Input() multiple = false
  @Input() typeahead = false

  get label() {
    return this.multiple ? 'Dropdown Multiple' : this.typeahead ? 'Typeahead' : 'Dropdown'
  }

  get control() {
    return this.multiple ? 'dropdownMultiple' : this.typeahead ? 'typeahead' : 'dropdown'
  }

  @Output() updateControl = new EventEmitter<UpdateControl>()

  options = ['Apple', 'Banana', 'Orange', 'Mango', 'Strawberry', 'Pineapple', 'Grapes', 'Watermelon', 'Kiwi', 'Peach']
}
