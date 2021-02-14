import { Component } from '@angular/core';
import { SnackbarService, ToastService } from '@baloise/ui-library-angular';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
})
export class ServicesComponent {
  constructor(public toast: ToastService, public snackbar: SnackbarService) {}

  createToast() {
    this.toast.create({ message: 'I am a nice Toast!' });
  }

  createSnackbar() {
    this.snackbar.create({
      icon: 'github',
      subject: 'Snackbar Title',
      message: 'I am the body of a nice snackbar',
    });
  }
}
