import { MaskBlock, MaskBlockList } from './blocks'
import {
  MaskClipboardContext,
  MaskContext,
  MaskFocusContext,
  MaskKeyboardContext,
  MaskLocaleContext,
  MaskMouseContext,
  MaskValueChangedContext,
} from './context'
import { Mask } from './mask-interfaces'

export abstract class AbstractMask implements Mask {
  public abstract maxLength: number
  public abstract minLength: number
  public inputMode: BalProps.BalInputInputMode = 'text'

  protected blocks!: MaskBlockList
  protected locale = 'de-CH'

  constructor(blocks: MaskBlock[] = []) {
    this.blocks = new MaskBlockList(blocks)
  }

  /**
   * ABSTRACT EVENT METHODS
   * ------------------------------------------------------
   */

  public onLocaleChange(context: MaskLocaleContext, _oldLocale: string, oldBlocks: MaskBlockList) {
    if (context.target) {
      const value = context.value
      const chars = value.split('')

      for (let index = 0; index < chars.length; index++) {
        const char = chars[index]
        const newBlock = this.blocks.findByIndex(index)
        const oldBlock = oldBlocks.findByIndex(index)
        if (newBlock && oldBlock) {
          if (newBlock.isSeparator) {
            chars[index] = newBlock.mask
          } else if (char === oldBlock.mask) {
            chars[index] = newBlock.mask
          }
        }
      }

      context.value = chars.join('')
    }
  }

  public onFocus(_context: MaskFocusContext) {
    // empty placeholder
  }

  public onBlur(context: MaskFocusContext) {
    context.submit('blur', this.onParseValue(context.value))
  }

  public onChange(context: MaskContext) {
    context.submit('change', this.onParseValue(context.value))
  }

  public onNavigationDown(_context: MaskKeyboardContext, _block: MaskBlock, _index: number): void {
    // empty placeholder
  }

  public onSelectAll(_context: MaskKeyboardContext, _block: MaskBlock, _index: number): void {
    // empty placeholder
  }

  public onPaste(context: MaskClipboardContext, _block: MaskBlock, _index: number): void {
    const value = context.clipboardData || ''
    context.value = value
    context.position.toEnd()
  }

  public onBlockChange(context: MaskKeyboardContext, block: MaskBlock, index: number) {
    context.setChar()
    context.position.next()

    const nextBlock = this.blocks.list[index + 1]
    if (context.position.value === block.to && nextBlock && nextBlock.isSeparator) {
      context.position.next()
    }
  }

  public onBackspaceDown(context: MaskKeyboardContext, block: MaskBlock, index: number): void {
    context.position.previous()
    if (!block.isSeparator) {
      context.setChar(block.mask)

      const previousBlock = this.blocks.list[index - 1]
      if (context.position.value === block.from && previousBlock && previousBlock.isSeparator) {
        context.position.previous()
      }
    }
  }

  public onDeleteDown(context: MaskKeyboardContext, block: MaskBlock, index: number): void {
    context.setChar(block.mask)
    context.position.next()

    const nextBlock = this.blocks.list[index + 1]
    if (context.position.value === block.to && nextBlock && nextBlock.isSeparator) {
      context.position.next()
    }
  }

  public onValueChanged(context: MaskValueChangedContext) {
    const formattedValue = this.onFormatValue(context.newValue)
    const inputValue = context.focused && formattedValue === '' ? this.blocks.getPlaceholderMask() : formattedValue
    context.value = inputValue
    context.position.toEnd()
  }

  public onParseValue(inputValue?: string) {
    if (inputValue) {
      return inputValue.trim()
    }
    return inputValue || ''
  }

  public onFormatValue(rawValue?: string) {
    if (rawValue) {
      return rawValue.trim()
    }
    return rawValue || ''
  }

  /**
   * FIRE EVENT METHODS
   * ------------------------------------------------------
   */

  fireI18nChange(context: MaskLocaleContext): void {
    const oldBlocks = this.blocks.clone()
    const oldLocale = `${context.locale}`
    this.locale = context.locale
    this.blocks.list.forEach(block => block.onI18nChange(context.locale))
    this.onLocaleChange(context, oldLocale, oldBlocks)
  }

  fireValueChanged(context: MaskValueChangedContext): void {
    if (context.didValueChange) {
      this.onValueChanged(context)
    }
  }

  firePaste(context: MaskClipboardContext): void {
    const index = this.blocks.getBlockIndexFromPosition(context.position.value)
    if (index !== undefined) {
      const currentBlock = this.blocks.list[index]
      this.onPaste(context, currentBlock, index)
      this.onChange(context)
    }
  }

  fireClick(context: MaskMouseContext): void {
    const maskPlaceholder = this.blocks.getPlaceholderMask()
    if (maskPlaceholder === context.value) {
      context.position.toStart()
    }
  }

  fireFocus(context: MaskFocusContext): void {
    if (context.target && context.isValueEmpty()) {
      this.resetInputValueWithMask(context)
    }
    this.onFocus(context)
  }

  fireBlur(context: MaskFocusContext): void {
    if (context.target) {
      if (this.isValueEmptyMask(context)) {
        this.emptyInputValue(context)
      } else {
        this.onBlur(context)
      }
    }
  }

  fireKeyDown(context: MaskKeyboardContext): void {
    const position = context.isBackspaceKey ? Math.max(0, context.position.value - 1) : context.position.value
    const index = this.blocks.getBlockIndexFromPosition(position)

    // prevent of adding more chars than possible
    if (position >= this.blocks.lastPosition && !context.isNavigationKey && !context.isSelectAllCommand) {
      context.preventDefault()
      context.stopPropagation()
      return
    }

    if (index !== undefined && !context.position.isRangeSelection) {
      const currentBlock = this.blocks.list[index]
      //
      // Navigation keys like arrows and tabs
      if (context.isNavigationKey) {
        this.onNavigationDown(context, currentBlock, index)
        //
        // Select the whole value of the input
      } else if (context.isSelectAllCommand) {
        this.onSelectAll(context, currentBlock, index)
        //
        // On copy a the value
      } else if (context.isCopyCommand) {
        // this.onCopy(context, currentBlock, index)
        //
        // On paste a new value into
      } else if (context.isPasteCommand) {
        //
        // On backspace to remove a previous char
      } else if (context.isBackspaceKey) {
        context.preventDefault()
        this.onBackspaceDown(context, currentBlock, index)
        //
        // On delete to remove a next char
      } else if (context.isDeleteKey) {
        context.preventDefault()
        this.onDeleteDown(context, currentBlock, index)
        //
        // On double space key hit only happens on mac
      } else if (context.isWhiteSpaceKey) {
        context.preventDefault()
        const lastWrittenChar = context.value[context.position.value]
        if (lastWrittenChar === '.') {
          context.stopPropagation()
          const value = context.value
          context.value = value.substring(0, context.position.value) + '_' + value.substring(context.position.value + 1)
        }
        //
        // On a normal key down with the allowed key hits
      } else if (currentBlock.verifyAllowedKeyHits(context.key)) {
        context.preventDefault()
        this.onBlockChange(context, currentBlock, index)
        //
        // if the user hits the next separator we jump to the next user block
      } else if (this.blocks.verifyCallOfNextSeparator(context.key, index)) {
        context.preventDefault()
        const activeBlock = this.blocks.list[index]

        if (context.position.value > activeBlock.from) {
          const nextBlock = this.blocks.list[index + 1]
          const value = context.value
          const blockValue = currentBlock.getValueOfTheBlock(value)
          const newBlockValue = currentBlock.format(blockValue)

          context.value = value.substring(0, currentBlock.from) + newBlockValue + value.substring(currentBlock.to)
          context.position.value = nextBlock.to
        }
      }

      //
      // format all blocks where the cursor is not active
      const newIndex = this.blocks.getBlockIndexFromPosition(context.position.value)
      if (newIndex && !context.isBackspaceKey) {
        const newFormattedValue = this.blocks.formatBlocks(context.value, newIndex)
        const position = context.position.value
        context.value = newFormattedValue
        context.position.value = position
      }

      //
      // hit a range of chars
    } else {
      if (context.isBackspaceKey || context.isDeleteKey) {
        context.preventDefault()
        this.resetInputValueWithMask(context)
      }
    }
  }

  /**
   * PROTECTED HELPER METHODS
   * ------------------------------------------------------
   */

  protected resetInputValueWithMask(context: MaskContext) {
    context.value = this.blocks.getPlaceholderMask()
    context.position.toStart()
  }

  protected isValueEmptyMask(context: MaskContext): boolean {
    const placeholder = this.blocks.getPlaceholderMask()
    return placeholder === context.value
  }

  protected emptyInputValue(context: MaskContext) {
    context.value = ''
    context.submit('blur')
  }
}
