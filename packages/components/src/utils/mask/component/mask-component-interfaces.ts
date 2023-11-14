import type { EventEmitter } from '@stencil/core'
import { BalConfigState } from '../../config'

export interface MaskAttributes {
  maxLength: number
  minLength: number
  inputMode: BalProps.BalInputInputMode
  type: string
  autoCapitalize: string
  autoCorrect: string
  spellcheck: boolean
}

export interface MaskComponentAdapterType {
  attributes: MaskAttributes
  bindComponent(component: MaskComponent): void
  bindComponentDidLoad(): void
  bindConfigChanged(config: BalConfigState): void
  bindKeyDown(event: KeyboardEvent): void
  bindFocus(event: FocusEvent): void
  bindBlur(event: FocusEvent): void
  bindPaste(event: ClipboardEvent): void
  bindValueChanged(newValue?: string, oldValue?: string): void
  bindFormReset(event: UIEvent): void
  bindClick(event: MouseEvent): void
  bindHostClick(event: MouseEvent): void
  bindGlobalClick(event: MouseEvent): void
}

export interface MaskComponent {
  value: string | undefined
  inputValue: string | undefined
  initialValue: string
  focused: boolean
  disabled: boolean
  readonly: boolean
  el: HTMLElement
  nativeInput: HTMLInputElement
  valueChanged(newValue: string | undefined, oldValue: string | undefined): void
  balKeyPress: EventEmitter<KeyboardEvent>
  balChange: EventEmitter<string | undefined>
  balInput: EventEmitter<string | undefined>
  balFocus: EventEmitter<FocusEvent>
  balBlur: EventEmitter<FocusEvent>
}
