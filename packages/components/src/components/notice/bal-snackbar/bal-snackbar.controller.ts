import { BalNoticeController, BalNoticeOptions } from '../../../helpers/notice.controller'
import { Components } from '../../../types'

export interface BalSnackbarOptions extends BalNoticeOptions {
  icon: string
  subject: string
  action?: string
  actionHandler?: () => void
}

export class BalSnackbarController extends BalNoticeController {
  constructor() {
    super({
      tag: 'bal-snackbar',
    })
  }

  create(options: BalSnackbarOptions): Components.BalSnackbar {
    return super.create(options)
  }
}

export const balSnackbarController = new BalSnackbarController()
