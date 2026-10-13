import { Injectable } from '@angular/core'
import { dsSnackbarController } from '@helvetia-design/core'
import { toAlert, type DsAlertOptions } from './alert-options'

@Injectable({
  providedIn: 'root',
})
export class DsSnackbarService {
  /**
   * Shows a snackbar and resolves with its id. Resolves with an empty string when an identical snackbar is
   * already visible.
   */
  async create(options: DsAlertOptions): Promise<string | undefined> {
    return dsSnackbarController.create(toAlert(options))
  }

  async dismiss(id: string | undefined): Promise<void> {
    if (!id) return
    await dsSnackbarController.remove(id)
  }

  async dismissAll(): Promise<void> {
    await dsSnackbarController.removeAll()
  }
}
