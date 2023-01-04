```ts
 import { CommonModule } from '@angular/common'
 import { Component, CUSTOM_ELEMENTS_SCHEMA, ChangeDetectionStrategy } from '@angular/core'
 import { BalSelectModule, BalFieldModule } from '@baloise/design-system-components-angular'

 @Component({
   selector: 'app-example',
   templateUrl: 'example.component.html',
   standalone: true,
   schemas: [CUSTOM_ELEMENTS_SCHEMA],
   imports: [CommonModule, BalFieldModule, BalSelectModule],
   changeDetection: ChangeDetectionStrategy.OnPush,
 })
 export class ExampleComponent {
   accordionValue = true
 }
 ```