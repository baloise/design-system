import { Injectable } from '@angular/core'
import { balSnackbarController, BalSnackbarOptions } from '@baloise/ui-library'

@Injectable({
  providedIn: 'root',
})
export class BalSnackbarService {
  create(options: BalSnackbarOptions): HTMLBalSnackbarElement {
    return balSnackbarController.create(options)
  }
}
