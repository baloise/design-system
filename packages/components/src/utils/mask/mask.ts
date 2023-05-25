import {
  MaskClipboardContext,
  MaskClipboardContextEvent,
  MaskContext,
  MaskFocusContext,
  MaskFocusContextEvent,
  MaskKeyboardContext,
  MaskKeyboardContextEvent,
  MaskLocaleContext,
  MaskLocaleContextEvent,
  MaskMouseContext,
  MaskMouseContextEvent,
} from './context'
import { MaskBlock } from './mask-block'
import { BalConfigState } from '../config'
import { MaskComponent, MaskEvents, MaskedComponent, MaskedTest } from './mask-interfaces'

export abstract class AbstractMask implements MaskEvents, MaskedComponent, MaskedTest {
  protected nativeInputElement?: HTMLInputElement
  protected blocks: MaskBlock[] = []
  protected locale = 'de-CH'
  protected component!: MaskComponent
  private resetHandlerTimer?: NodeJS.Timer

  public abstract maxLength: number
  public abstract minLength: number
  public inputMode: BalProps.BalInputInputMode = 'text'

  constructor(blocks: MaskBlock[] = []) {
    this.blocks = blocks
  }

  /**
   * GETTERS
   * ------------------------------------------------------
   */

  public get attributes() {
    return {
      inputMode: this.inputMode,
      maxLength: this.maxLength,
      minLength: this.minLength,
      type: 'text',
      autoCapitalize: 'off',
      autoCorrect: 'off',
      spellcheck: false,
    }
  }

  /**
   * LISTENERS
   * ------------------------------------------------------
   */

  public bindFormReset = (event: UIEvent) => {
    const formElement = event.target as HTMLElement
    if (formElement && formElement.contains(this.component.el)) {
      this.fireFormReset()
    }
  }

  public bindComponent = (component: MaskComponent) => {
    this.component = component
    this.component.initialValue = this.component.value || ''
    this.bindValueChanged(this.component.value, undefined)
  }

  public bindComponentDidLoad = (): void => {
    if (this.component && this.component.nativeInput) {
      this.component.nativeInput.value = this.component.value || ''
    }
  }

  public bindValueChanged = (newValue: string | undefined, oldValue: string | undefined) => {
    if (newValue !== oldValue) {
      this.component.value = newValue
      return this.fireValueChanged(newValue)
    }
  }

  public bindRender = () => {
    return this.fireRender()
  }

  public bindConfigChanged = (config: BalConfigState) => {
    this.fireI18nChange({
      locale: `${config.language}-${config.region}`,
      target: this.component?.nativeInput || null,
    })
  }

  public bindKeyDown = (event: KeyboardEvent) => {
    this.fireKeyDown(event as MaskKeyboardContextEvent)
    if (this.isComponentAccessible) {
      this.component.balKeyPress.emit(event)
    }
  }

  public bindClick = (event: MouseEvent) => {
    this.fireClick(event as MaskMouseContextEvent)
  }

  public bindHostClick = (event: MouseEvent) => {
    if (!this.isComponentAccessible) {
      event.preventDefault()
      event.stopPropagation()
    }
  }

  public bindGlobalClick = (event: UIEvent) => {
    if (!this.isComponentAccessible) {
      if (event.target && event.target === this.component.el) {
        event.preventDefault()
        event.stopPropagation()
      }
    }
  }

  public bindBlur = (event: FocusEvent) => {
    this.fireBlur(event as MaskFocusContextEvent)
    if (this.isComponentAccessible) {
      this.component.balBlur.emit(event)
    }
  }

  public bindFocus = (event: FocusEvent) => {
    this.fireFocus(event as MaskFocusContextEvent)

    if (this.isComponentAccessible) {
      this.component.balFocus.emit(event)
    }
  }

  public bindPaste = (event: ClipboardEvent) => {
    this.firePaste(event as MaskClipboardContextEvent)
  }

  /**
   * ABSTRACT EVENT METHODS
   * ------------------------------------------------------
   */

  public onLocaleChange(context: MaskLocaleContext, _oldLocale: string, oldBlocks: MaskBlock[]) {
    if (context.target) {
      const value = context.target.value
      const chars = value.split('')

      for (let index = 0; index < chars.length; index++) {
        const char = chars[index]
        const newBlock = this.findBlockByIndex(index)
        const oldBlock = this.findBlockByIndex(index, oldBlocks)
        if (newBlock && oldBlock) {
          if (newBlock.isSeparator) {
            chars[index] = newBlock.mask
          } else if (char === oldBlock.mask) {
            chars[index] = newBlock.mask
          }
        }
      }

      context.target.value = chars.join('')
    }
  }

  public onFocus(_context: MaskFocusContext) {
    // empty placeholder
  }

  public onBlur(_context: MaskFocusContext) {
    // empty placeholder
  }

  public onInput(value?: string) {
    if (this.component) {
      this.component.inputValue = value
      this.component.balInput.emit(this.getRawValueWithoutMask(value) as any)
    }
  }

  public onChange(inputValue?: string) {
    const oldValue = this.component.value || ''
    const newValue = this.onParseValue(inputValue)
    const valueHasChanged = newValue !== oldValue
    if (valueHasChanged) {
      this.component.valueChanged(newValue, oldValue)
      this.component.balChange.emit(newValue)
    }
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
    context.position.syncToInputElement()
  }

  public onBlockChange(context: MaskKeyboardContext, block: MaskBlock, index: number) {
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

  public onBackspaceDown(context: MaskKeyboardContext, block: MaskBlock, index: number): void {
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

  public onDeleteDown(context: MaskKeyboardContext, block: MaskBlock, index: number): void {
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

  public onRender() {
    // empty placeholder
  }

  public onValueChanged(rawValue: string | undefined) {
    if (this.component && this.component.nativeInput) {
      const formattedValue = this.onFormatValue(rawValue)
      this.component.inputValue = formattedValue
      this.component.nativeInput.value = this.component.inputValue
    }
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

  public onFormReset() {
    this.component.value = this.component.initialValue
    this.component.inputValue = this.component.initialValue
    clearTimeout(this.resetHandlerTimer)
    this.resetHandlerTimer = setTimeout(() => {
      if (this.component.nativeInput) {
        this.component.nativeInput.value = this.component.value || ''
      }
    })
  }

  /**
   * FIRE EVENT WITH CONTEXT
   * ------------------------------------------------------
   */

  public fireFormReset() {
    this.onFormReset()
  }

  public fireI18nChange(event: MaskLocaleContextEvent) {
    const context = new MaskLocaleContext(event, this)
    const oldBlocks = [...this.blocks]
    const oldLocale = `${context.locale}`
    this.locale = context.locale
    this.blocks.forEach(block => block.onI18nChange(context.locale))
    this.onLocaleChange(context, oldLocale, oldBlocks)
  }

  public fireRender() {
    return this.onRender()
  }

  public fireValueChanged(value: string | undefined) {
    return this.onValueChanged(value)
  }

  public fireClick(event: MaskMouseContextEvent): void {
    if (this.isComponentAccessible) {
      const context = new MaskMouseContext(event as MaskMouseContext, this)
      if (context.target && context.isValueEmpty()) {
        this.resetInputValueWithMask(context)
      }
    }
  }

  public async fireKeyDown(event: MaskKeyboardContextEvent) {
    if (this.isComponentAccessible) {
      const context = new MaskKeyboardContext(event, this)
      const index = this.getBlockIndexFromContext(context)

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
          //
          // if the user hits the next separator we jump to the next user block
        } else if (this.verifyCallOfNextSeparator(context, currentBlock, index)) {
          context.preventDefault()
        }

        //
        // format all blocks where the cursor is not active
        const newIndex = this.getBlockIndexFromContext(context)
        if (newIndex && !context.isBackspaceKey) {
          const newBlock = this.blocks[newIndex]
          this.formatInActiveBlocks(context, newBlock, newIndex)
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
  }

  public fireFocus(_event: MaskFocusContextEvent): void {
    if (this.isComponentAccessible) {
      this.component.focused = true
      const context = new MaskFocusContext(event as MaskFocusContextEvent, this)
      this.onFocus(context)
    }
  }

  public fireBlur(event: MaskFocusContextEvent): void {
    if (this.isComponentAccessible) {
      const context = new MaskFocusContext(event as MaskFocusContextEvent, this)
      if (context.target) {
        if (this.isValueEmptyMask(context)) {
          this.emptyInputValue(context)
        } else {
          this.onBlur(context)
        }
        this.onChange(context.target?.value)
      }

      this.component.focused = false
    }
  }

  public firePaste(event: MaskClipboardContextEvent) {
    if (this.isComponentAccessible) {
      const context = new MaskClipboardContext(event as MaskClipboardContextEvent, this)
      const index = this.getBlockIndexFromContext(context)
      if (index !== undefined) {
        const currentBlock = this.blocks[index]
        this.onPaste(context, currentBlock, index)
        this.onChange(context.target.value)
      }
    }
  }

  /**
   * PROTECTED HELPER METHODS
   * ------------------------------------------------------
   */

  protected resetInputValueWithMask(context: MaskContext) {
    context.value = this.createPlaceholderMask()
    context.position.toStart()
    context.position.syncToInputElement()
    this.onChange(context.value)
  }

  protected emptyInputValue(context: MaskContext) {
    context.value = ''
    context.position.toStart()
    context.position.syncToInputElement()
  }

  protected getRawValueWithoutMaskByContext(context: MaskContext): string {
    return this.getRawValueWithoutMask(context.target.value)
  }

  protected getRawValueWithoutMask(value?: string): string {
    if (value) {
      let rawValue: string[] = []
      const chars = value.split('')
      for (let index = 0; index < chars.length; index++) {
        const char = chars[index]
        const block = this.findBlockByIndex(index)
        if (block && !block.isSeparator) {
          rawValue.push(char.replace(block.mask, ''))
        } else {
          rawValue.push(char)
        }
      }
      rawValue = rawValue.filter(v => v)
      const amountSeparators = this.blocks.filter(block => block.isSeparator).length
      if (amountSeparators === rawValue.length) {
        return ''
      }
      return rawValue.join('')
    }
    return ''
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
    if (block.isSeparator && context.key === block.mask) {
      return true
    } else if (block.allowedKeys.indexOf(context.key) >= 0) {
      return true
    } else {
      context.stopPropagation()
      return false
    }
  }

  private verifyCallOfNextSeparator(context: MaskKeyboardContext, currentBlock: MaskBlock, index: number): boolean {
    if (this.blocks.length - 1 > index) {
      const nextBlock = this.blocks[index + 1]

      if (nextBlock.isSeparator && nextBlock.mask === context.key) {
        const value = context.target.value
        const blockValue = currentBlock.sliceFromValue(value)
        const newBlockValue = currentBlock.format(blockValue)
        context.target.value = value.substring(0, currentBlock.from) + newBlockValue + value.substring(currentBlock.to)
        context.position.value = nextBlock.to
        context.position.syncToInputElement()
      }
    }

    return false
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

  private findBlockByIndex(index: number, blocks = this.blocks): MaskBlock | undefined {
    return blocks.find(block => block.from <= index && index < block.to)
  }

  private formatInActiveBlocks(context: MaskKeyboardContext, _currentBlock: MaskBlock, blockIndex: number) {
    let value = context.target.value

    for (let index = 0; index < this.blocks.length; index++) {
      const block = this.blocks[index]
      if (blockIndex !== index && !block.isSeparator && block.isTouched(value)) {
        const blockValue = block.sliceFromValue(value)
        const newBlockValue = block.format(blockValue)
        value = value.substring(0, block.from) + newBlockValue + value.substring(block.to)
      }
    }

    const position = context.position.value
    context.target.value = value
    context.position.value = position
    context.position.syncToInputElement()
  }

  private get isComponentAccessible() {
    return !this.component.disabled && !this.component.readonly
  }
}
