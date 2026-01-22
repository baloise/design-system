import { Inject, Injectable } from '@angular/core'

import type { BalSnackbarController, BalSnackbarOptions, Components } from '@baloise/ds-core'

import { defineCustomElement as defineNoticeElement } from '@baloise/ds-core/components/bal-notices'
import { defineCustomElement } from '@baloise/ds-core/components/bal-snackbar'
import { BalTokenSnackbar } from '../utils/token'

@Injectable({
  providedIn: 'root',
})
export class BalSnackbarService {
  constructor(@Inject(BalTokenSnackbar) private ctrl: BalSnackbarController) {
    defineNoticeElement()
    defineCustomElement()
  }

  create(options: BalSnackbarOptions): Components.BalSnackbar {
    return this.ctrl.create(options)
  }

  async dismissAll(): Promise<void> {
    return this.ctrl.dismissAll()
  }
}
