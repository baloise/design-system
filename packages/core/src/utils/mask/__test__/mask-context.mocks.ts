import { MaskContext, MaskLocaleContextEvent } from '../context'

export class MaskLocaleContextMock extends MaskContext<MaskLocaleContextEvent> {
  get locale() {
    return this._options.event.locale
  }
}
