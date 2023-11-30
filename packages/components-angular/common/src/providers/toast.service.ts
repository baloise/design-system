import { Inject, Injectable } from '@angular/core'

import type { BalToastController, BalToastOptions, Components } from '@baloise/design-system-components/components'
import { BalTokenToast } from '../token'

@Injectable({
  providedIn: 'root',
})
export class BalToastService {
  constructor(@Inject(BalTokenToast) private ctrl: BalToastController) {}

  create(options: BalToastOptions): Components.BalToast {
    return this.ctrl.create(options)
  }

  async dismissAll(): Promise<void> {
    return this.ctrl.dismissAll()
  }
}
