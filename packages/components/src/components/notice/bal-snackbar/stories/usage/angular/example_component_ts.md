```ts
import { CommonModule } from '@angular/common'
import { Component, CUSTOM_ELEMENTS_SCHEMA, ChangeDetectionStrategy } from '@angular/core'
import { BalSnackbarService } from '@baloise/design-system-components-angular'

@Component({
  selector: 'app-example',
  templateUrl: 'example.component.html',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExampleComponent {
  constructor(public balSnackbarService: BalSnackbarService) {}

  open() {
    this.balSnackbarService.create({
      subject: 'Subject',
      message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
      action: 'More',
      color: 'info',
      icon: 'info-circle',
    })
  }
}
```
