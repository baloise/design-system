import { MaskContext } from './mask-context'
import { MaskContextEvent } from './mask-context-interfaces'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface MaskValueChangedContextEvent extends MaskContextEvent {
  newValue?: string | undefined
  oldValue?: string | undefined
}

export class MaskValueChangedContext extends MaskContext<MaskValueChangedContextEvent> {
  get newValue(): string | undefined {
    return this._options.event.newValue
  }

  get oldValue(): string | undefined {
    return this._options.event.oldValue
  }

  get didValueChange(): boolean {
    return this.newValue !== this.oldValue
  }
}
