import { Inject, Injectable } from '@angular/core'

import type { BalSnackbarController, BalSnackbarOptions, Components } from '@baloise/ds-core'
import { BalTokenSnackbar } from '../utils/token'

@Injectable({
  providedIn: 'root',
})
export class BalSnackbarService {
  constructor(@Inject(BalTokenSnackbar) private ctrl: BalSnackbarController) {}

  create(options: BalSnackbarOptions): Components.BalSnackbar {
    return this.ctrl.create(options)
  }

  async dismissAll(): Promise<void> {
    return this.ctrl.dismissAll()
  }
}
