import { MaskClipboardContext, MaskContext, MaskFocusContext, MaskKeyboardContext, MaskMouseContext } from './context'
import { MaskBlock } from './mask-block'

export abstract class Mask {
  protected nativeInputElement?: HTMLInputElement
  protected blocks: MaskBlock[] = []
  protected locale = 'de-CH'

  constructor(blocks: MaskBlock[] = []) {
    this.blocks = blocks
  }

  /**
   * ABSTRACT METHODS
   * ------------------------------------------------------
   */

  abstract onBlockChange(context: MaskKeyboardContext, block: MaskBlock, index: number): void

  abstract onNavigationDown(context: MaskKeyboardContext, block: MaskBlock, index: number): void

  abstract onBackspaceDown(context: MaskKeyboardContext, block: MaskBlock, index: number): void

  abstract onDeleteDown(context: MaskKeyboardContext, block: MaskBlock, index: number): void

  abstract onSelectAll(context: MaskKeyboardContext, block: MaskBlock, index: number): void

  abstract onCopy(context: MaskKeyboardContext, block: MaskBlock, index: number): void

  abstract onPaste(context: MaskClipboardContext, block: MaskBlock, index: number): void

  abstract onInit(el: HTMLInputElement): void

  /**
   * LISTENERS
   * ------------------------------------------------------
   */

  public bindComponentDidLoad(el: HTMLInputElement): void {
    this.nativeInputElement = el
    if (this.nativeInputElement) {
      this.onInit(this.nativeInputElement)
    }
  }

  public bindI18nChange(locale: string) {
    this.locale = locale
    this.blocks.forEach(block => block.onI18nChange(locale))
  }

  public async bindKeyDown(event: KeyboardEvent) {
    const context = new MaskKeyboardContext(event)
    const index = this.getBlockIndexFromContext(context)

    console.warn('onKeyDown', context.key, context.isSelectAllCommand)

    if (index !== undefined) {
      const currentBlock = this.blocks[index]
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
        // if (balBrowser.hasNavigator) {
        // const clipboardValue = await navigator.clipboard.readText()
        // this.onPaste(clipboardValue, context, currentBlock, index)
        // }
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
        // On a normal key down with the allowed key hits
      } else if (this.verifyAllowedKeyHits(context, currentBlock, index)) {
        context.preventDefault()
        this.onBlockChange(context, currentBlock, index)
      }
    } else {
      // hit a range of chars
      if (context.isBackspaceKey || context.isDeleteKey) {
        context.preventDefault()
        this.resetInputValueWithMask(context)
      }
    }
  }

  public bindInput(event: InputEvent) {
    console.log(event)
    console.log(event.data)
  }

  public bindClick(event: MouseEvent): void {
    const context = new MaskMouseContext(event)
    if (context.target && context.isValueEmpty()) {
      this.resetInputValueWithMask(context)
    }
  }

  public bindBlur(event: FocusEvent): void {
    const context = new MaskFocusContext(event)
    if (context.target && this.isValueEmptyMask(context)) {
      this.emptyInputValue(context)
    }
  }

  public bindPast(event: ClipboardEvent) {
    const context = new MaskClipboardContext(event)
    const index = this.getBlockIndexFromContext(context)
    if (index !== undefined) {
      const currentBlock = this.blocks[index]
      this.onPaste(context, currentBlock, index)
    }
  }

  /**
   * PUBLIC METHODS
   * ------------------------------------------------------
   */

  public resetInputValueWithMask(context: MaskContext) {
    context.value = this.createPlaceholderMask()
    context.position.toStart()
    context.position.syncToInputElement()
  }

  public emptyInputValue(context: MaskContext) {
    context.value = ''
    context.position.toStart()
    context.position.syncToInputElement()
  }

  /**
   * PRIVATE METHODS
   * ------------------------------------------------------
   */

  private isValueEmptyMask(context: MaskContext): boolean {
    const placeholder = this.createPlaceholderMask()
    return placeholder === context.value
  }

  private createPlaceholderMask(): string {
    const placeholder: string[] = []
    this.blocks.forEach(block => {
      const length = block.to - block.from
      for (let index = 0; index < length; index++) {
        placeholder.push(block.mask)
      }
    })
    return placeholder.join('')
  }

  private verifyAllowedKeyHits(context: MaskKeyboardContext, block: MaskBlock, _index: number): boolean {
    console.log('verifyAllowedKeyHits', context, block)
    if (block.isSeparator && context.key === block.mask) {
      return true
    } else if (block.allowedKeys.indexOf(context.key) >= 0) {
      return true
    } else {
      context.stopPropagation()
      return false
    }
  }

  private getBlockIndexFromContext(context: MaskContext): number | undefined {
    const position = context.position.value
    const length = this.blocks.reduce((acc, block) => acc + block.to - block.from, 0)
    const index = this.blocks.findIndex(block => block.from <= position && position < block.to)
    const currentBlock = this.blocks[index]

    // move to the next block when in front of a separator
    if (currentBlock && currentBlock.isSeparator && (context as MaskKeyboardContext).key) {
      const nextBlock = this.blocks[index + 1]
      if (nextBlock && nextBlock.allowedKeys.indexOf((context as MaskKeyboardContext).key) >= 0) {
        context.position.next()
        return Math.min(length, index + 1)
      }
    }

    return index < 0 ? undefined : Math.min(length, index)
  }
}
