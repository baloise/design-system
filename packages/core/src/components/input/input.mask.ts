export interface InputMaskInterface {}

export class InputMaskUtil {
  private formatter?: InputMaskFormatterInterface

  constructor(private component: InputMaskInterface) {}

  setFormatter(formatter: InputMaskFormatterInterface | undefined) {
    if (formatter) {
      this.formatter = formatter
    }
  }

  format(value: string | null) {
    return this.formatter?.format(value)
  }

  onInput(ev: InputEvent) {
    return this.formatter?.onInput(ev)
  }

  onKeydown(ev: KeyboardEvent) {
    return this.formatter?.onKeydown(ev)
  }
}

export interface InputMaskFormatterInterface {
  name: DS.InputMask
  maxLength: number

  format(value: string | null): string | null

  onInput(ev: InputEvent): void

  onKeydown(ev: KeyboardEvent): void
}

export class InputMaskFormatter {}
