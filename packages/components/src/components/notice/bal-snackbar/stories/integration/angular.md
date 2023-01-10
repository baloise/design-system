## Integration Angular

Use the `BalSnackbarService` to create new notices. First import the `BalSnackbarModule` and then use the service in the components.

```typescript
// app.component.ts
import { Component } from '@angular/core'
import { BalSnackbarService } from '@baloise/design-system-components-angular'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  mySnackbar?: HTMLBalSnackbarElement

  constructor(public snackbar: BalSnackbarService) {}

  onButtonClick() {
    this.mySnackbar = this.snackbar.create({
      subject: 'Subject',
      message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
      icon: 'info-circle',
    })
  }

  async onSecondButtonClick() {
    await this.mySnackbar.close()
  }
}
```
