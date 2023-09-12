import {
  MaskClipboardContext,
  MaskFocusContext,
  MaskKeyboardContext,
  MaskLocaleContext,
  MaskMouseContext,
  MaskValueChangedContext,
} from './context'

export interface Mask {
  maxLength: number
  minLength: number
  inputMode: BalProps.BalInputInputMode
  fireI18nChange(context: MaskLocaleContext): void
  fireKeyDown(context: MaskKeyboardContext): void
  fireFocus(context: MaskFocusContext): void
  fireBlur(context: MaskFocusContext): void
  firePaste(context: MaskClipboardContext): void
  fireClick(context: MaskMouseContext): void
  fireValueChanged(context: MaskValueChangedContext): void
}
