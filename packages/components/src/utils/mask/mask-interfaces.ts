import { MaskClipboardContext, MaskFocusContext, MaskKeyboardContext } from './context'
import { MaskLocaleContext } from './context/mask-locale-context'
import { MaskBlock } from './mask-block'

export interface OnBlockChange {
  onBlockChange(context: MaskKeyboardContext, block: MaskBlock, index: number): void
}

export interface OnNavigationDown {
  onNavigationDown(context: MaskKeyboardContext, block: MaskBlock, index: number): void
}

export interface OnDeleteDown {
  onDeleteDown(context: MaskKeyboardContext, block: MaskBlock, index: number): void
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

export interface OnFormatValue {
  onFormatValue(context: MaskFocusContext): void
}
