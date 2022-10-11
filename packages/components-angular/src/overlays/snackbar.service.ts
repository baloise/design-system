import { Injectable } from '@angular/core'
import { balSnackbarController, BalSnackbarOptions, Components } from '@baloise/design-system-next-components'

@Injectable({
  providedIn: 'root',
})
export class BalSnackbarService {
  create(options: BalSnackbarOptions): Components.BalSnackbar {
    return balSnackbarController.create(options)
  }

  async dismissAll(): Promise<void> {
    return balSnackbarController.dismissAll()
  }
}
