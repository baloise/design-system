import { dateSeparator } from '@baloise/web-app-utils'
import { NUMBER_KEYS } from '../../../../../utils/constants/keys.constant'
import { Mask, MaskBlock, MaskClipboardContext, MaskKeyboardContext } from '../mask'
import { BalDate } from './date'

export class DateMask extends Mask {
  constructor() {
    super([
      new MaskBlock({ from: 0, to: 2, allowedKeys: [...NUMBER_KEYS] }),
      new MaskBlock({ from: 2, to: 3, mask: locale => dateSeparator(locale), isSeparator: true }),
      new MaskBlock({ from: 3, to: 5, allowedKeys: [...NUMBER_KEYS] }),
      new MaskBlock({ from: 5, to: 6, mask: locale => dateSeparator(locale), isSeparator: true }),
      new MaskBlock({ from: 6, to: 10, allowedKeys: [...NUMBER_KEYS] }),
    ])
  }

  onInit(el: HTMLInputElement): void {
    console.log('-> onInit', el)
  }

  onSelectAll(context: MaskKeyboardContext, block: MaskBlock, index: number): void {
    console.log('-> onSelectAll', context, block, index)
  }

  onCopy(context: MaskKeyboardContext, block: MaskBlock, index: number): void {
    console.log('-> onCopy', context, block, index)
  }

  onPaste(context: MaskClipboardContext, block: MaskBlock, index: number): void {
    console.warn('-> onPaste', context, block, index)
    const value = context.clipboardData || ''

    const date = BalDate.fromAnyFormat(value)
    if (date.isValid) {
      context.value = date.toFormat()
      context.position.toEnd()
      context.position.syncToInputElement()
    }
  }

  onBlockChange(context: MaskKeyboardContext, block: MaskBlock, index: number) {
    console.log('-> onBlockChange', block, context.key, context.value)

    if (block.isSeparator) {
      context.position.next()
      context.position.syncToInputElement()
    } else {
      context.setChar()
      context.position.next()

      const nextBlock = this.blocks[index + 1]
      if (context.position.value === block.to && nextBlock && nextBlock.isSeparator) {
        context.position.next()
      }

      context.position.syncToInputElement()
    }
  }

  onBackspaceDown(context: MaskKeyboardContext, block: MaskBlock, index: number): void {
    console.error('-> onBackspaceDown', context, block, index)

    if (block.isSeparator) {
      context.position.previous()
      context.position.syncToInputElement()
    } else {
      context.setChar(block.mask)
      context.position.previous()

      const previousBlock = this.blocks[index - 1]
      if (context.position.value === block.from - 1 && previousBlock && previousBlock.isSeparator) {
        context.position.previous()
      }

      context.position.syncToInputElement()
    }
  }

  onDeleteDown(context: MaskKeyboardContext, block: MaskBlock, index: number): void {
    console.log('-> onDeleteDown', context, block, index)

    if (block.isSeparator) {
      context.position.next()
      context.position.syncToInputElement()
    } else {
      context.setChar(block.mask)
      context.position.next()

      const nextBlock = this.blocks[index + 1]
      if (context.position.value === block.to && nextBlock && nextBlock.isSeparator) {
        context.position.next()
      }

      context.position.syncToInputElement()
    }
  }

  onNavigationDown(context: MaskKeyboardContext, block: MaskBlock, index: number): void {
    console.log('-> onNavigationDown', context, block, index)
  }
}
