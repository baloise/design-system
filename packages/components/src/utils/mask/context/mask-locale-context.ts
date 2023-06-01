import { MaskContext } from './mask-context'
import { MaskContextEvent } from './mask-context-interfaces'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface MaskLocaleContextEvent extends MaskContextEvent {
  locale: string
}

export class MaskLocaleContext extends MaskContext<MaskLocaleContextEvent> {
  get locale() {
    return this._options.event.locale
  }
}
