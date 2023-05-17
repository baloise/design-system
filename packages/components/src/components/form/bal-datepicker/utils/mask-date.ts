import { IDateMaskKeyboardEvent } from './mask-event'
import { DateMaskPosition } from './mask-postion'

export class MaskDate {
  private static NUMBER_KEYS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']

  private static ACTION_KEYS = [
    'Home',
    'End',
    'Backspace',
    'Enter',
    'ArrowLeft',
    'Left',
    'ArrowRight',
    'Right',
    'Tab',
    'Esc',
    'Escape',
    'Del',
    'Delete',
  ]

  private position!: DateMaskPosition

  constructor(private event: IDateMaskKeyboardEvent, private separator: string) {
    this.position = new DateMaskPosition(this.event.target)
  }

  public mask() {
    this.numberKeyHit()
    this.backspaceHit()

    this.position.syncToInputElement()
  }

  public isKeyPressAllowed(): boolean {
    const allowedKeys = [...MaskDate.NUMBER_KEYS, this.separator, ...MaskDate.ACTION_KEYS]
    if (!this.event.isCtrlOrCommandKey && allowedKeys.indexOf(this.event.key) < 0) {
      this.event.stopPropagation()
      return false
    }
    return true
  }

  private numberKeyHit() {
    if (this.event.isNumberKey) {
      if (this.position.isNumber()) {
        const newPosition = this.setCharAt()
        if (this.position.isSeparator(newPosition)) {
          this.position.value = newPosition + 1
        } else {
          this.position.value = newPosition
        }
      } else {
        this.position.next()
      }
    }
  }

  private backspaceHit() {
    if (this.event.isBackspaceKey) {
    }
  }

  private setCharAt(): number {
    this.event.value =
      this.event.value.substring(0, this.position.value) +
      this.event.key +
      this.event.value.substring(this.position.value + 1)

    return this.position.value + 1
  }

  // private replaceAt(value: string, index: number, replacement: string) {
  //   return value.substring(0, index) + replacement + value.substring(index + replacement.length)
  // }
}
