import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormGroup, ReactiveFormsModule } from '@angular/forms'
import { BaloiseDesignSystemModule } from '../../design-system'
import { UpdateControl } from '../app.component'

@Component({
  selector: 'app-checkbox-buttons',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, BaloiseDesignSystemModule],
  template: `
    <bal-card [formGroup]="form">
      <bal-card-title>Checkbox Buttons</bal-card-title>
      <bal-card-content>
        <bal-field required>
          <bal-field-label>Checkbox Buttons Label</bal-field-label>
          <bal-field-control>
            <bal-checkbox-group control formControlName="checkboxButtons" data-test="checkboxButtons">
              <bal-checkbox-button>
                <bal-stack>
                  <bal-content>
                    <bal-label>Apple</bal-label>
                  </bal-content>
                  <bal-checkbox label-hidden value="Apple"></bal-checkbox>
                </bal-stack>
              </bal-checkbox-button>
              <bal-checkbox-button>
                <bal-stack>
                  <bal-content>
                    <bal-label>Kiwi</bal-label>
                  </bal-content>
                  <bal-checkbox label-hidden value="Kiwi"></bal-checkbox>
                </bal-stack>
              </bal-checkbox-button>
              <bal-checkbox-button>
                <bal-stack>
                  <bal-content>
                    <bal-label>Mango</bal-label>
                  </bal-content>
                  <bal-checkbox label-hidden value="Mango"></bal-checkbox>
                </bal-stack>
              </bal-checkbox-button>
            </bal-checkbox-group>
          </bal-field-control>
          <bal-field-message>
            <bal-ng-error controlName="checkboxButtons" error="required">This field is required</bal-ng-error>
          </bal-field-message>
        </bal-field>
        <bal-button-group>
          <bal-button color="secondary" (click)="updateControl.emit({ name: 'checkboxButtons', value: ['Apple'] })">
            Update Checkbox Buttons
          </bal-button>
          <bal-button color="tertiary" (click)="form.get('checkboxButtons')?.enable()"
            >Enable Checkbox Buttons</bal-button
          >
          <bal-button color="tertiary" (click)="form.get('checkboxButtons')?.disable()"
            >Disable Checkbox Buttons</bal-button
          >
        </bal-button-group>
      </bal-card-content>
    </bal-card>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckboxButtonsComponent {
  @Input() form!: FormGroup

  @Output() updateControl = new EventEmitter<UpdateControl>()
}
