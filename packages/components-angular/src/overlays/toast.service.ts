import { Injectable } from '@angular/core'
import { balToastController, BalToastOptions, Components } from '@baloise/design-system-next-components'

@Injectable({
  providedIn: 'root',
})
export class BalToastService {
  create(options: BalToastOptions): Components.BalToast {
    return balToastController.create(options)
  }

  async dismissAll(): Promise<void> {
    return balToastController.dismissAll()
  }
}
