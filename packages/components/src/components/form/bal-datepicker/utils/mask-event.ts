export interface IDateMaskKeyboardEvent {
  target: HTMLInputElement
  value: string
  key: string
  isBackspaceKey: boolean
  isNumberKey: boolean
  isCtrlOrCommandKey: boolean
  preventDefault(): void
  stopPropagation(): void
}

export class DateMaskKeyboardEvent implements IDateMaskKeyboardEvent {
  private static NUMBER_KEYS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']

  constructor(private event: KeyboardEvent) {}

  get target(): HTMLInputElement {
    return this.event.target as any
  }

  get key(): string {
    return this.event.key
  }

  get value(): string {
    return this.target.value
  }

  set value(newValue: string) {
    this.target.value = newValue
  }

  get isCtrlOrCommandKey() {
    return this.event.metaKey || this.event.ctrlKey
  }

  get isBackspaceKey() {
    return this.event.key === 'Backspace'
  }

  get isNumberKey() {
    return DateMaskKeyboardEvent.NUMBER_KEYS.includes(this.event.key)
  }

  preventDefault() {
    this.event.preventDefault()
  }

  stopPropagation() {
    this.preventDefault()
    this.event.stopPropagation()
  }
}
