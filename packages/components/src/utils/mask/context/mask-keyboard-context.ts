import { MaskEvents } from '../mask-interfaces'
import { MaskContext, MaskContextEvent } from './mask-context'
import { MaskPosition } from './mask-position'

export interface MaskKeyboardContextEvent extends MaskContextEvent {
  key: string
  metaKey: boolean
  ctrlKey: boolean
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

  public position!: MaskPosition

  constructor(event: MaskKeyboardContextEvent, mask: MaskEvents) {
    super(event, mask)
    this.position = new MaskPosition(event.target, event.key === 'Backspace')
  }

  get key(): string {
    return this.event.key
  }

  get isCtrlOrCommandKey() {
    return this.event.metaKey || this.event.ctrlKey
  }

  get isBackspaceKey() {
    return this.event.key === 'Backspace'
  }

  get isDeleteKey() {
    return this.event.key === 'Delete' || this.event.key === 'Del'
  }

  get isNumberKey() {
    return MaskKeyboardContext.NUMBER_KEYS.includes(this.event.key)
  }

  get isNavigationKey() {
    return MaskKeyboardContext.NAVIGATION_KEYS.includes(this.event.key)
  }

  get isSelectAllCommand() {
    return (this.event.ctrlKey || this.event.metaKey) && this.key === 'a'
  }

  get isCopyCommand() {
    return (this.event.ctrlKey || this.event.metaKey) && this.key === 'c'
  }

  get isPasteCommand() {
    return (this.event.ctrlKey || this.event.metaKey) && this.key === 'v'
  }

  public getCharAt(position = this.position.value): string {
    return this.value.charAt(position)
  }

  public getCharAtBackspacePosition(): string {
    return this.getCharAt(this.position.value - 1)
  }

  public setChar(char = this.event.key, position = this.position.value): void {
    this.value = this.value.substring(0, position) + char + this.value.substring(position + 1)
  }
}
