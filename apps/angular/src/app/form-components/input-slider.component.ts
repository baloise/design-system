import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core'
import { CommonModule } from '@angular/common'
import { BaloiseDesignSystemModule } from 'src/generated/src'
import { FormGroup, ReactiveFormsModule } from '@angular/forms'
import { UpdateControl } from '../app.component'

@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, BaloiseDesignSystemModule],
  template: `
    <bal-card [formGroup]="form">
      <bal-card-title>Slider</bal-card-title>
      <bal-card-content>
        <bal-field required>
          <bal-field-label>Slider Label</bal-field-label>
          <bal-field-control>
            <bal-input-slider min="0" max="100" step="10" formControlName="slider"></bal-input-slider>
          </bal-field-control>
          <bal-field-message>
            <bal-ng-error controlName="slider" error="min">Min is 10</bal-ng-error>
          </bal-field-message>
        </bal-field>
        <bal-button-group>
          <bal-button color="secondary" (click)="updateControl.emit({ name: 'slider', value: '09:30' })">
            Update Slider
          </bal-button>
          <bal-button color="tertiary" (click)="form.get('slider')?.enable()">Enable Slider</bal-button>
          <bal-button color="tertiary" (click)="form.get('slider')?.disable()">Disable Slider</bal-button>
        </bal-button-group>
      </bal-card-content>
    </bal-card>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SliderComponent {
  @Input() form!: FormGroup

  @Output() updateControl = new EventEmitter<UpdateControl>()
}
