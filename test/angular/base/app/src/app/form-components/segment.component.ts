import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormGroup, ReactiveFormsModule } from '@angular/forms'
import { balImports } from '../../design-system'
import { UpdateControl } from '../app.component'

@Component({
  selector: 'app-segment',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ...balImports],
  template: `
    <bal-card [formGroup]="form">
      <bal-card-title>Segment</bal-card-title>
      <bal-card-content>
        <bal-field required>
          <bal-field-label>Segment Label</bal-field-label>
          <bal-field-control>
            <bal-segment formControlName="segment" data-test="segment">
              <bal-segment-item value="Apple">Apple</bal-segment-item>
              <bal-segment-item value="Kiwi">Kiwi</bal-segment-item>
              <bal-segment-item value="Mango">Mango</bal-segment-item>
            </bal-segment>
          </bal-field-control>
          <bal-field-message>
            <bal-ng-error controlName="segment" error="required">This field is required</bal-ng-error>
          </bal-field-message>
        </bal-field>
        <bal-button-group>
          <bal-button color="secondary" (click)="updateControl.emit({ name: 'segment', value: 'Apple' })">
            Update Segment
          </bal-button>
          <bal-button color="tertiary" (click)="form.get('segment')?.enable()">Enable Segment</bal-button>
          <bal-button color="tertiary" (click)="form.get('segment')?.disable()">Disable Segment</bal-button>
        </bal-button-group>
      </bal-card-content>
    </bal-card>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SegmentComponent {
  @Input() form!: FormGroup

  @Output() updateControl = new EventEmitter<UpdateControl>()
}
