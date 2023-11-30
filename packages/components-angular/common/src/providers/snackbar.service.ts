import { Inject, Injectable } from '@angular/core'

import type {
  BalSnackbarController,
  BalSnackbarOptions,
  Components,
} from '@baloise/design-system-components/components'
import { BalTokenSnackbar } from '../token'

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
