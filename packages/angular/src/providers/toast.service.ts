import { Inject, Injectable } from '@angular/core'

import type { BalToastController, BalToastOptions, Components } from '@baloise/ds-core/components'

import { defineCustomElement as defineNoticeElement } from '@baloise/ds-core/components/bal-notices'
import { defineCustomElement } from '@baloise/ds-core/components/bal-toast'
import { BalTokenToast } from '@baloise/ds-angular-common'

@Injectable({
  providedIn: 'root',
})
export class BalToastService {
  constructor(@Inject(BalTokenToast) private ctrl: BalToastController) {
    defineNoticeElement()
    defineCustomElement()
  }

  create(options: BalToastOptions): Components.BalToast {
    return this.ctrl.create(options)
  }

  async dismissAll(): Promise<void> {
    return this.ctrl.dismissAll()
  }
}
