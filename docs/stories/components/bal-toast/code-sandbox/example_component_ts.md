```ts
import { CommonModule } from '@angular/common'
import { Component, CUSTOM_ELEMENTS_SCHEMA, ChangeDetectionStrategy } from '@angular/core'
import { BalToastService } from '@baloise/design-system-components-angular'

@Component({
  selector: 'app-example',
  templateUrl: 'example.component.html',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExampleComponent {
  constructor(public balToastService: BalToastService) {}

  open() {
    this.balToastService.create({ message: 'Welcome', color: 'success' })
  }
}
```
