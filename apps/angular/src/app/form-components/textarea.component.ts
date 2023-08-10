import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core'
import { CommonModule } from '@angular/common'
import { BaloiseDesignSystemModule } from 'src/generated/src'
import { FormGroup, ReactiveFormsModule } from '@angular/forms'
import { UpdateControl } from '../app.component'

@Component({
  selector: 'app-textarea',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, BaloiseDesignSystemModule],
  template: `
    <bal-card [formGroup]="form">
      <bal-card-title>Textarea</bal-card-title>
      <bal-card-content>
        <bal-field
          required
          [disabled]="form.get('textarea')?.disabled"
          [invalid]="form.get('textarea')?.touched && form.get('textarea')?.invalid"
        >
          <bal-field-label>Textarea Label</bal-field-label>
          <bal-field-control>
            <bal-textarea placeholder="Enter comment" formControlName="textarea"></bal-textarea>
          </bal-field-control>
          <bal-field-message>
            <bal-ng-error controlName="textarea" error="required">This field is required</bal-ng-error>
          </bal-field-message>
        </bal-field>
        <bal-button-group>
          <bal-button color="secondary" (click)="updateControl.emit({ name: 'textarea', value: 'updated value' })">
            Update Textarea
          </bal-button>
          <bal-button color="tertiary" (click)="form.get('textarea')?.enable()">Enable Textarea</bal-button>
          <bal-button color="tertiary" (click)="form.get('textarea')?.disable()">Disable Textarea</bal-button>
        </bal-button-group>
      </bal-card-content>
    </bal-card>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextareaComponent {
  @Input() form!: FormGroup

  @Output() updateControl = new EventEmitter<UpdateControl>()
}
