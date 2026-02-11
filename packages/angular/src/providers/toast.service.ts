import { Inject, Injectable } from '@angular/core'

import type { NotificationController, Notification } from '@baloise/ds-core'
import { defineCustomElement as defineContainerElement } from '@baloise/ds-core/components/bal-notification-container'
import { defineCustomElement } from '@baloise/ds-core/components/bal-notification'
import { BalTokenToast } from '../utils/token'

@Injectable({
  providedIn: 'root',
})
export class BalToastService {
  constructor(@Inject(BalTokenToast) private ctrl: NotificationController) {
    defineContainerElement()
    defineCustomElement()
  }

  async create(options: Notification): Promise<string | undefined> {
    return this.ctrl.create(options)
  }

  async dismissAll(): Promise<void> {
    return this.ctrl.dismissAll()
  }
}
