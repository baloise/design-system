import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core'
import { FormGroup, ReactiveFormsModule } from '@angular/forms'
import { balImports } from '../../design-system'
import { UpdateControl } from '../app.component'

@Component({
  selector: 'app-checkbox-tiles',
  imports: [CommonModule, ReactiveFormsModule, ...balImports],
  template: `
    <bal-card [formGroup]="form">
      <bal-card-title>Checkbox Tiles</bal-card-title>
      <bal-card-content>
        <bal-field required>
          <bal-field-label>Checkbox Tile Label</bal-field-label>
          <bal-field-control>
            <bal-checkbox-group interface="tile" control formControlName="checkboxTiles" data-testid="checkboxTiles">
              <bal-checkbox value="Apple">
                <bal-stack>
                  <bal-content>
                    <bal-label>Apple</bal-label>
                  </bal-content>
                  <bal-check></bal-check>
                </bal-stack>
              </bal-checkbox>
              <bal-checkbox value="Kiwi">
                <bal-stack>
                  <bal-content>
                    <bal-label>Kiwi</bal-label>
                  </bal-content>
                  <bal-check></bal-check>
                </bal-stack>
              </bal-checkbox>
              <bal-checkbox value="Mango">
                <bal-stack>
                  <bal-content>
                    <bal-label>Mango</bal-label>
                  </bal-content>
                  <bal-check></bal-check>
                </bal-stack>
              </bal-checkbox>
            </bal-checkbox-group>
          </bal-field-control>
          <bal-field-message>
            <bal-ng-error controlName="checkboxTiles" error="required">This field is required</bal-ng-error>
          </bal-field-message>
        </bal-field>
        <bal-button-group>
          <bal-button color="secondary" (click)="updateControl.emit({ name: 'checkboxTiles', value: ['Apple'] })">
            Update Checkbox Buttons
          </bal-button>
          <bal-button color="tertiary" (click)="form.get('checkboxTiles')?.enable()"
            >Enable Checkbox Buttons</bal-button
          >
          <bal-button color="tertiary" (click)="form.get('checkboxTiles')?.disable()"
            >Disable Checkbox Buttons</bal-button
          >
        </bal-button-group>
      </bal-card-content>
    </bal-card>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckboxTilesComponent {
  @Input() form!: FormGroup

  @Output() updateControl = new EventEmitter<UpdateControl>()
}
