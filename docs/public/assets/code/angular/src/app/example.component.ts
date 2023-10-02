import { CommonModule } from '@angular/common'
import { Component, CUSTOM_ELEMENTS_SCHEMA, ChangeDetectionStrategy } from '@angular/core'
import { BaloiseDesignSystemModule } from '@baloise/design-system-components-angular'
/** PLACEHOLDER FOR DESIGN SYSTEM IMPORTS */

@Component({
  selector: 'app-example',
  templateUrl: 'example.component.html',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [CommonModule, BaloiseDesignSystemModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExampleComponent {}
