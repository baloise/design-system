import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core'
import { FormGroup, ReactiveFormsModule } from '@angular/forms'
import { balImports } from '../../design-system'
import { UpdateControl } from '../app.component'

@Component({
  selector: 'app-radio-buttons',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ...balImports],
  template: `
    <bal-card [formGroup]="form">
      <bal-card-title>Radio Buttons</bal-card-title>
      <bal-card-content>
        <bal-field required>
          <bal-field-label>Radio Buttons Label</bal-field-label>
          <bal-field-control>
            <bal-radio-group formControlName="radioButtons" data-test="radioButtons" interface="tile">
              <bal-radio value="Apple">
                <bal-stack>
                  <bal-content>
                    <bal-label>Apple</bal-label>
                  </bal-content>
                  <bal-radio-icon></bal-radio-icon>
                </bal-stack>
              </bal-radio>
              <bal-radio value="Kiwi">
                <bal-stack>
                  <bal-content>
                    <bal-label>Kiwi</bal-label>
                  </bal-content>
                  <bal-radio-icon></bal-radio-icon>
                </bal-stack>
              </bal-radio>
              <bal-radio value="Mango">
                <bal-stack>
                  <bal-content>
                    <bal-label>Mango</bal-label>
                  </bal-content>
                  <bal-radio-icon></bal-radio-icon>
                </bal-stack>
              </bal-radio>
            </bal-radio-group>
          </bal-field-control>
          <bal-field-message>
            <bal-ng-error controlName="radioButtons" error="required">This field is required</bal-ng-error>
          </bal-field-message>
        </bal-field>
        <bal-button-group>
          <bal-button color="secondary" (click)="updateControl.emit({ name: 'radioButtons', value: 'Apple' })">
            Update Radio Buttons
          </bal-button>
          <bal-button color="tertiary" (click)="form.get('radioButtons')?.enable()">Enable Radio Buttons</bal-button>
          <bal-button color="tertiary" (click)="form.get('radioButtons')?.disable()">Disable Radio Buttons</bal-button>
        </bal-button-group>
      </bal-card-content>
    </bal-card>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RadioButtonsComponent {
  @Input() form!: FormGroup

  @Output() updateControl = new EventEmitter<UpdateControl>()
}
