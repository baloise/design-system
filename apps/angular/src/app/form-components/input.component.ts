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
        <bal-field>
          <bal-field-label>Text Input</bal-field-label>
          <bal-field-control>
            <bal-input placeholder="Enter text" formControlName="textInput"></bal-input>
          </bal-field-control>
        </bal-field>
        <bal-button color="secondary" (click)="updateControl.emit({ name: 'textInput', value: 'updated value' })">
          Update Value
        </bal-button>
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
