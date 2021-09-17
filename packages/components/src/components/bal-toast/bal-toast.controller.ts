import { BalNoticeController, BalNoticeOptions } from '../../helpers/notice.controller'

export interface BalToastOptions extends BalNoticeOptions {}

export class BalToastController extends BalNoticeController {
  constructor() {
    super({
      tag: 'bal-toast',
    })
  }

  create(options: BalToastOptions): HTMLBalToastElement {
    return super.create(options)
  }
}

export const balToastController = new BalToastController()
