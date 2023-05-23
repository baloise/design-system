import { MaskContext, MaskContextEvent } from './mask-context'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface MaskLocaleContextEvent extends MaskContextEvent {
  locale: string
}

export class MaskLocaleContext extends MaskContext<MaskLocaleContextEvent> {
  get locale() {
    return this.event.locale
  }
}
