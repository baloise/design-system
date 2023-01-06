## Integration Angular

Use the `BalToastService` to create new notices. First import the `BalToastModule` and then use the service in the components.

```typescript
// app.component.ts
import { Component } from '@angular/core'
import { BalToastService } from '@baloise/design-system-components-angular'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  myToast?: HTMLBalToastElement

  constructor(public toast: BalToastService) {}

  onButtonClick() {
    this.myToast = this.toast.create({ message: 'Welcome' })
  }

  async onSecondButtonClick() {
    await this.myToast.close()
  }
}
```
