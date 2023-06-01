import { MaskContext } from './mask-context'
import { MaskContextEvent } from './mask-context-interfaces'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface MaskKeyboardContextEvent extends MaskContextEvent {
  key: string
  metaKey?: boolean
  ctrlKey?: boolean
}

export class MaskKeyboardContext extends MaskContext<MaskKeyboardContextEvent> {
  private static NUMBER_KEYS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']

  private static NAVIGATION_KEYS = [
    'Home',
    'End',
    'ArrowLeft',
    'Left',
    'ArrowRight',
    'Right',
    'Tab',
    'Enter',
    'Esc',
    'Escape',
  ]

  get key(): string {
    return this._options.event.key
  }

  get isCtrlOrCommandKey() {
    return this._options.event.metaKey || this._options.event.ctrlKey
  }

  get isBackspaceKey() {
    return this._options.event.key === 'Backspace'
  }

  get isDeleteKey() {
    return this._options.event.key === 'Delete' || this._options.event.key === 'Del'
  }

  get isNumberKey() {
    return MaskKeyboardContext.NUMBER_KEYS.includes(this._options.event.key)
  }

  get isNavigationKey() {
    return MaskKeyboardContext.NAVIGATION_KEYS.includes(this._options.event.key)
  }

  get isSelectAllCommand() {
    return (this._options.event.ctrlKey || this._options.event.metaKey) && this.key === 'a'
  }

  get isCopyCommand() {
    return (this._options.event.ctrlKey || this._options.event.metaKey) && this.key === 'c'
  }

  get isPasteCommand() {
    return (this._options.event.ctrlKey || this._options.event.metaKey) && this.key === 'v'
  }

  public getCharAt(position = this.position.value): string {
    return this.value.charAt(position)
  }

  public getCharAtBackspacePosition(): string {
    return this.getCharAt(this.position.value - 1)
  }

  public setChar(char = this._options.event.key, position = this.position.value): void {
    this.value = this.value.substring(0, position) + char + this.value.substring(position + 1)
  }
}
