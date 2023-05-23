import { MaskContext, MaskContextEvent } from './mask-context'

export interface MaskClipboardContextEvent extends MaskContextEvent {
  readonly clipboardData: {
    getData(format: string): string
  } | null
}

export class MaskClipboardContext extends MaskContext<MaskClipboardContextEvent> {
  get clipboardData() {
    return this.event.clipboardData?.getData('text')
  }
}
