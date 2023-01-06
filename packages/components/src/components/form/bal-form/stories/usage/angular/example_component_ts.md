```ts
import { CommonModule } from '@angular/common'
import { Component, CUSTOM_ELEMENTS_SCHEMA, ChangeDetectionStrategy, ViewChild } from '@angular/core'
import { Components } from '@baloise/design-system-components'
import {
  BalFormModule,
  BalFormGridModule,
  BalFieldModule,
  BalInputModule,
  BalButtonModule,
  ProxyComponent,
} from '@baloise/design-system-components-angular'

@Component({
  selector: 'app-example',
  templateUrl: 'example.component.html',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [CommonModule, BalFormModule, BalFormGridModule, BalFieldModule, BalInputModule, BalButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExampleComponent {
  @ViewChild('form') form!: ProxyComponent<Components.BalForm>

  submit() {
    if (this.form) {
      this.form.el.scrollToFirstInvalidField()
    }
  }
}
```