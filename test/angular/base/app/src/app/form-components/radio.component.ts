import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core'
import { FormGroup, ReactiveFormsModule } from '@angular/forms'
import { balImports } from '../../design-system'
import { UpdateControl } from '../app.component'

@Component({
  selector: 'app-radio',
  imports: [CommonModule, ReactiveFormsModule, ...balImports],
  template: `
    <bal-card [formGroup]="form">
      <bal-card-title>Radio</bal-card-title>
      <bal-card-content>
        <bal-field required>
          <bal-field-label>Radio Label</bal-field-label>
          <bal-field-control>
            <bal-radio-group formControlName="radio" data-testid="radio">
              <bal-radio value="Apple">Apple</bal-radio>
              <bal-radio value="Kiwi">Kiwi</bal-radio>
              <bal-radio value="Mango">Mango</bal-radio>
            </bal-radio-group>
          </bal-field-control>
          <bal-field-message>
            <bal-ng-error controlName="radio" error="required">This field is required</bal-ng-error>
          </bal-field-message>
        </bal-field>
        <div class="buttons">
          <button class="button is-secondary" (click)="updateControl.emit({ name: 'radio', value: 'Apple' })">
            Update Radio
          </button>
          <button class="button is-tertiary" (click)="form.get('radio')?.enable()">Enable Radio</button>
          <button class="button is-tertiary" (click)="form.get('radio')?.disable()">Disable Radio</button>
        </div>
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
