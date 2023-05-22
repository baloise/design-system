import { MaskContext } from './mask-context'

export class MaskClipboardContext extends MaskContext<ClipboardEvent> {
  get clipboardData() {
    return this.event.clipboardData?.getData('text')
  }
}
