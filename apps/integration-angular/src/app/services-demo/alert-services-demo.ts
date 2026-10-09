import { Component, inject, signal } from '@angular/core'
import { DsButton, DsSnackbarService, DsToastService } from '@helvetia-design/angular'

@Component({
  selector: 'app-alert-services-demo',
  imports: [DsButton],
  templateUrl: './alert-services-demo.html',
})
export class AlertServicesDemo {
  private readonly toastService = inject(DsToastService)
  private readonly snackbarService = inject(DsSnackbarService)
  private lastToastId: string | undefined
  private lastSnackbarId: string | undefined
  protected readonly closed = signal(0)

  protected async openToast() {
    this.lastToastId = await this.toastService.create({
      heading: 'Toast heading',
      message: 'Hello from DsToastService',
      duration: 'infinite',
      closable: true,
      closeHandler: () => this.closed.update(count => count + 1),
    })
  }

  protected async openSnackbar() {
    this.lastSnackbarId = await this.snackbarService.create({
      heading: 'Snackbar heading',
      message: 'Hello from DsSnackbarService',
      duration: 'infinite',
    })
  }

  protected dismissToast() {
    return this.toastService.dismiss(this.lastToastId)
  }

  protected dismissSnackbar() {
    return this.snackbarService.dismiss(this.lastSnackbarId)
  }

  protected async dismissAll() {
    await Promise.all([this.toastService.dismissAll(), this.snackbarService.dismissAll()])
  }
}
