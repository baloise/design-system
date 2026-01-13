import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core'
import { FormGroup, ReactiveFormsModule } from '@angular/forms'
import { balImports } from '../../design-system'
import { UpdateControl } from '../app.component'

@Component({
  selector: 'app-input',
  imports: [CommonModule, ReactiveFormsModule, ...balImports],
  template: `
    <bal-card [formGroup]="form">
      <bal-card-title>Input</bal-card-title>
      <bal-card-content>
        <bal-field required>
          <bal-field-label>Input Label</bal-field-label>
          <bal-field-control>
            <bal-input placeholder="Enter text" formControlName="input"></bal-input>
          </bal-field-control>
          <bal-field-message>
            <bal-ng-error controlName="input" error="required">This field is required</bal-ng-error>
          </bal-field-message>
        </bal-field>
        <div class="buttons">
          <button class="button is-secondary" (click)="updateControl.emit({ name: 'input', value: 'updated value' })">
            Update Input
          </button>
          <button class="button is-tertiary" (click)="form.get('input')?.enable()">Enable Input</button>
          <button class="button is-tertiary" (click)="form.get('input')?.disable()">Disable Input</button>
        </div>
      </bal-card-content>
    </bal-card>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputComponent {
  @Input() form!: FormGroup

  @Output() updateControl = new EventEmitter<UpdateControl>()
}
