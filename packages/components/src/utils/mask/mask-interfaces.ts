import { EventEmitter } from '@stencil/core'
import {
  MaskClipboardContext,
  MaskClipboardContextEvent,
  MaskFocusContext,
  MaskFocusContextEvent,
  MaskKeyboardContext,
  MaskKeyboardContextEvent,
  MaskLocaleContext,
  MaskLocaleContextEvent,
  MaskMouseContextEvent,
} from './context'
import { MaskBlock } from './mask-block'
import { BalConfigState } from '../config'

export type MaskAttributes = {
  maxLength: number
  minLength: number
  inputMode: BalProps.BalInputInputMode
  type: string
  autoCapitalize: string
  autoCorrect: string
  spellcheck: boolean
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

export interface OnBlockChange {
  onBlockChange(context: MaskKeyboardContext, block: MaskBlock, index: number): void
}

export interface OnNavigationDown {
  onNavigationDown(context: MaskKeyboardContext, block: MaskBlock, index: number): void
}

export interface OnDeleteDown {
  onDeleteDown(context: MaskKeyboardContext, block: MaskBlock, index: number): void
}

export interface OnBackspaceDown {
  onBackspaceDown(context: MaskKeyboardContext, block: MaskBlock, index: number): void
}

export interface OnSelectAll {
  onSelectAll(context: MaskKeyboardContext, block: MaskBlock, index: number): void
}

export interface OnPaste {
  onPaste(context: MaskClipboardContext, block: MaskBlock, index: number): void
}

export interface OnLocaleChange {
  onLocaleChange(context: MaskLocaleContext, oldLocale: string, oldBlocks: MaskBlock[]): void
}

export interface OnBlur {
  onBlur(context: MaskFocusContext): void
}

export interface OnFocus {
  onFocus(context: MaskFocusContext): void
}

export interface OnValueChanged {
  onValueChanged(value?: string): void
}

export interface OnInput {
  onInput(value?: string): void
}

export interface OnChange {
  onChange(value?: string): void
}

export interface OnFormatValue {
  onFormatValue(rawValue?: string): string
}

export interface OnParseValue {
  onParseValue(inputValue?: string): string
}

export interface OnFormReset {
  onFormReset(): void
}

export interface MaskEvents
  extends OnBlockChange,
    OnNavigationDown,
    OnBackspaceDown,
    OnDeleteDown,
    OnSelectAll,
    OnLocaleChange,
    OnFocus,
    OnBlur,
    OnFormatValue,
    OnParseValue,
    OnInput,
    OnChange,
    OnValueChanged,
    OnFormReset {
  maxLength: number
}

export interface MaskedComponent {
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

export interface MaskedTest {
  fireI18nChange(context: MaskLocaleContextEvent): void
  fireKeyDown(context: MaskKeyboardContextEvent): void
  fireFocus(context: MaskFocusContextEvent): void
  fireBlur(context: MaskFocusContextEvent): void
  firePaste(context: MaskClipboardContextEvent): void
  fireClick(context: MaskMouseContextEvent): void
  fireValueChanged(value?: string): void
}
