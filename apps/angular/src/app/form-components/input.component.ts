import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core'
import { CommonModule } from '@angular/common'
import { BaloiseDesignSystemModule } from 'src/generated/src'
import { FormGroup, ReactiveFormsModule } from '@angular/forms'
import { UpdateControl } from '../app.component'

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, BaloiseDesignSystemModule],
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
        <bal-button-group>
          <bal-button color="secondary" (click)="updateControl.emit({ name: 'input', value: 'updated value' })">
            Update Input
          </bal-button>
          <bal-button color="tertiary" (click)="form.get('input')?.enable()">Enable Input</bal-button>
          <bal-button color="tertiary" (click)="form.get('input')?.disable()">Disable Input</bal-button>
        </bal-button-group>
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
