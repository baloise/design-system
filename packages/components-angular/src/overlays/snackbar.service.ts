import { Injectable } from '@angular/core'
import { balSnackbarController, BalSnackbarOptions, Components } from '@baloise/design-system-components'

@Injectable({
  providedIn: 'root',
})
export class BalSnackbarService {
  create(options: BalSnackbarOptions): Components.BalSnackbar {
    return balSnackbarController.create(options)
  }
}
