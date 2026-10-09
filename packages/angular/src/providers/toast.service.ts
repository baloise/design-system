import { Injectable } from '@angular/core'
import { dsToastController } from '@helvetia-design/core'
import { toAlert, type DsAlertOptions } from './alert-options'

@Injectable({
  providedIn: 'root',
})
export class DsToastService {
  /**
   * Shows a toast and resolves with its id. Resolves with an empty string when an identical toast is
   * already visible.
   */
  async create(options: DsAlertOptions): Promise<string | undefined> {
    return dsToastController.create(toAlert(options))
  }

  async dismiss(id: string | undefined): Promise<void> {
    if (!id) return
    await dsToastController.remove(id)
  }

  async dismissAll(): Promise<void> {
    await dsToastController.removeAll()
  }
}
