import { BalNoticeController, BalNoticeOptions } from '../../../utils/overlays/notice.controller'
import { Components } from '../../../types'

export type BalToastOptions = BalNoticeOptions

export class BalToastController extends BalNoticeController {
  constructor() {
    super({
      tag: 'bal-toast',
    })
  }

  create(options: BalToastOptions): Components.BalToast {
    return super.create(options)
  }
}

export const balToastController = new BalToastController()
