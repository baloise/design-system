import { Component } from '@angular/core'
import { BalSnackbarService, BalToastService } from '@baloise/design-system-components-angular'

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
})
export class ServicesComponent {
  constructor(public toast: BalToastService, public snackbar: BalSnackbarService) {}

  createToast() {
    this.toast.create({ message: 'I am a nice Toast!' })
  }

  createSnackbar() {
    this.snackbar.create({
      icon: 'github',
      subject: 'Snackbar Title',
      message: 'I am the body of a nice snackbar',
    })
  }
}
