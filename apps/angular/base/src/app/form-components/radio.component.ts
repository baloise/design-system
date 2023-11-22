import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core'
import { CommonModule } from '@angular/common'
import { BaloiseDesignSystemModule } from '@baloise/design-system-components-angular'
import { FormGroup, ReactiveFormsModule } from '@angular/forms'
import { UpdateControl } from '../app.component'

@Component({
  selector: 'app-radio',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, BaloiseDesignSystemModule],
  template: `
    <bal-card [formGroup]="form">
      <bal-card-title>Radio</bal-card-title>
      <bal-card-content>
        <bal-field required>
          <bal-field-label>Radio Label</bal-field-label>
          <bal-field-control>
            <bal-radio-group formControlName="radio" data-test="radio">
              <bal-radio value="Apple">Apple</bal-radio>
              <bal-radio value="Kiwi">Kiwi</bal-radio>
              <bal-radio value="Mango">Mango</bal-radio>
            </bal-radio-group>
          </bal-field-control>
          <bal-field-message>
            <bal-ng-error controlName="radio" error="required">This field is required</bal-ng-error>
          </bal-field-message>
        </bal-field>
        <bal-button-group>
          <bal-button color="secondary" (click)="updateControl.emit({ name: 'radio', value: 'Apple' })">
            Update Radio
          </bal-button>
          <bal-button color="tertiary" (click)="form.get('radio')?.enable()">Enable Radio</bal-button>
          <bal-button color="tertiary" (click)="form.get('radio')?.disable()">Disable Radio</bal-button>
        </bal-button-group>
      </bal-card-content>
    </bal-card>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RadioComponent {
  @Input() form!: FormGroup

  @Output() updateControl = new EventEmitter<UpdateControl>()
}
