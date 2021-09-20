import { BalNoticeController, BalNoticeOptions } from '../../helpers/notice.controller'

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

  create(options: BalSnackbarOptions): HTMLBalSnackbarElement {
    return super.create(options)
  }
}

export const balSnackbarController = new BalSnackbarController()
