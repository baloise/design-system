import { MaskContext } from './mask-context'
import { MaskContextEvent } from './mask-context-interfaces'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface MaskClipboardContextEvent extends MaskContextEvent {
  clipboardData: {
    getData(format: string): string
  } | null
}

export class MaskClipboardContext extends MaskContext<MaskClipboardContextEvent> {
  get clipboardData() {
    return this._options.event.clipboardData?.getData('text')
  }
}
