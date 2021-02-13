import { Injectable } from '@angular/core'
import { balToastController, BalToastOptions } from '@baloise/ui-library'

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  create(options: BalToastOptions): HTMLBalToastElement {
    return balToastController.create(options)
  }
}
