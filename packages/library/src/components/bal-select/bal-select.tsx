import { Component, h, Host, Element, Prop, State, Method, EventEmitter, Event, Listen, Watch } from '@stencil/core'
import { findItemLabel } from '../../helpers/helpers'
import { isEnterKey, isEscapeKey, isArrowDownKey, isArrowUpKey } from '../../utils/balKeyUtil'
import { areArraysEqual } from '../../utils/balArrayUtil'
import { BalOptionValue } from '../bal-select-option/bal-select-option.type'

@Component({
  tag: 'bal-select',
  styleUrl: 'bal-select.scss',
  shadow: false,
  scoped: true,
})
export class Select {
  private inputElement!: HTMLBalInputElement
  private inputFilterElement!: HTMLInputElement
  private dropdownElement!: HTMLBalDropdownElement
  private clearScrollToValue!: NodeJS.Timeout
  private didInit = false
  private inputId = `bal-select-${selectIds++}`

  @Element() el!: HTMLElement

  @State() isDropdownOpen: boolean = false
  @State() labelToScrollTo: string = ''
  @State() focusIndex: number = 0

  /**
   * If `true` multiple option can be selected
   */
  @Prop() multiple = false

  /**
   * The name of the control, which is submitted with the form data.
   */
  @Prop() name: string = this.inputId

  /**
   * If `true` the filtering of the options is done outside of the component.
   */
  @Prop() noFilter = false

  /**
   * The tabindex of the control.
   */
  @Prop() balTabindex: number = 0

  /**
   * If `true` the component uses the whole width.
   */
  @Prop() expanded = false

  /**
   * Set this to `true` when the component is placed on a dark background.
   */
  @Prop() inverted = false

  /**
   * If `true` the component is diabled.
   */
  @Prop() disabled = false

  /**
   * If `true` the user can search by typing into the input field.
   */
  @Prop() typeahead = false

  /**
   * If `true` the component shows a loading spinner and sets the input to readonly.
   */
  @Prop() loading = false

  /**
   * The text to display when the select is empty.
   */
  @Prop() placeholder?: string | null

  /**
   * Defines the placeholder of the input filter element.
   */
  @Prop() filterPlaceholder = ''

  /**
   * Defines the height of the dropdown list.
   */
  @Prop() scrollable: number = 250

  /**
   * Selected option values. Could also be passed as a string, which gets transformed.
   */
  @Prop({ mutable: true }) value: string[] = []

  @Watch('value')
  valueWatcher(newValue: string[], oldValue: string[]) {
    const areValueNotEqual = !areArraysEqual(newValue, oldValue)
    if (areValueNotEqual && this.didInit && this.inputElement) {
      const selectedOptions = this.childOptions.filter(option => option.value !== undefined).filter(option => this.value.indexOf(option.value as string) >= 0)
      this.inputElement.value = selectedOptions.map(o => o.value).join(', ')
      this.sync()
      this.balChange.emit(this.value)
    }
  }

  /**
   * Emitted when a option got selected.
   */
  @Event() balChange!: EventEmitter<string[]>

  /**
   * Emitted when a keyboard input occurred.
   */
  @Event() balInput!: EventEmitter<string>

  /**
   * Emitted when the input loses focus.
   */
  @Event() balBlur!: EventEmitter<FocusEvent>

  /**
   * Emitted when the input has focus.
   */
  @Event() balFocus!: EventEmitter<FocusEvent>

  /**
   * Emitted when the input got clicked.
   */
  @Event() balClick!: EventEmitter<MouseEvent>

  /**
   * Emitted when the input has focus and key from the keyboard go hit.
   */
  @Event() balKeyPress!: EventEmitter<KeyboardEvent>

  /**
   * Emitted when the user cancels the input.
   */
  @Event() balCancel!: EventEmitter<KeyboardEvent>

  @Listen('click', { capture: true, target: 'document' })
  listenOnClick(ev: UIEvent) {
    if (this.disabled && ev.target && ev.target === this.el) {
      ev.preventDefault()
      ev.stopPropagation()
    }
  }

  componentDidLoad() {
    this.didInit = true
  }

  /**
   * Opens the dropdown
   */
  @Method()
  async open(): Promise<void> {
    if (this.disabled) {
      return undefined
    }
    if (this.dropdownElement) {
      this.dropdownElement.open()
    }
  }

  /**
   * Closes the dropdown
   */
  @Method()
  async close(): Promise<void> {
    if (this.disabled) {
      return undefined
    }
    if (this.dropdownElement) {
      this.dropdownElement.close()
    }
  }

  /**
   * Selects an option
   */
  @Method()
  async select(option: BalOptionValue<any>) {
    if (this.inputElement && this.didInit && option !== undefined && option !== null) {
      this.focusIndex = this.childOptions.findIndex(el => el.value === option.value)

      if (this.multiple) {
        const list = []
        if (this.value.includes(option.value)) {
          for (var i = 0; i < this.value.length; i++) {
            if (this.value[i] !== option.value) {
              list.push(this.value[i])
            }
          }
          this.value = [...list]
        } else {
          this.value = [...this.value, option.value]
        }
        this.inputElement.value = this.childOptions
          .filter(option => option !== undefined)
          .filter(option => this.value.includes(option.value as string))
          .map(option => option.label)
          .join(', ')
      } else {
        this.value = [option.value]
        this.inputElement.value = option?.label
        await this.dropdownElement?.close()
      }
      this.updateOptionProps()
    }
  }

  /**
   * Sets the value to null and resets the value of the input.
   */
  @Method()
  async clear() {
    if (this.inputElement && this.didInit) {
      this.value = []
      this.inputElement.value = ''
      this.focusIndex = 0
      this.clearFocus()
      this.updateOptionProps()
    }
  }

  /**
   * Sets the focus on the input element
   */
  @Method()
  async setFocus() {
    if (this.inputElement) {
      this.inputElement.focus()
    }
  }

  /**
   * @internal - Used to update option changes
   */
  @Method()
  async sync() {
    this.updateOptionProps()
  }

  /**
   * Returns the native `<input>` element used under the hood.
   */
  @Method()
  getInputElement(): Promise<HTMLBalInputElement> {
    return Promise.resolve(this.inputElement)
  }

  /**
   * Returns the native `<input>` element used under the hood.
   */
  @Method()
  getFilterInputElement(): Promise<HTMLInputElement> {
    return Promise.resolve(this.inputFilterElement)
  }

  @Listen('keydown', { target: 'window' })
  keyDownHandler(event: KeyboardEvent) {
    if (this.isDropdownOpen && (isArrowDownKey(event) || isArrowUpKey(event))) {
      event.stopPropagation()
      event.preventDefault()
    }
  }

  private get childOptions(): HTMLBalSelectOptionElement[] {
    return Array.from(this.el.querySelectorAll('bal-select-option'))
  }

  private get hasChildren(): boolean {
    return this.childOptions.length > 0
  }

  private get inputElementValue(): string {
    if (!this.inputElement) {
      return ''
    }
    if (this.inputElement.value === null || this.inputElement.value === undefined) {
      return ''
    }
    return `${this.inputElement.value}`
  }

  private get inputFilterElementValue() {
    return this.inputFilterElement ? this.inputFilterElement.value : ''
  }

  private onInputClick = async (event: MouseEvent) => {
    if (this.disabled) {
      event.preventDefault()
      event.stopPropagation()
    } else {
      this.balClick.emit(event)
      if (!this.typeahead || this.multiple) {
        await this.dropdownElement?.toggle()
      }

      if (this.typeahead && this.multiple && this.isDropdownOpen) {
        setTimeout(() => this.inputFilterElement.focus(), 100)
      }
    }
  }

  private onDropdownChange = (event: CustomEvent<boolean>) => {
    this.isDropdownOpen = event.detail
    this.updateOptionProps()
    event.stopPropagation()
  }

  private onInput = (event: Event) => {
    const inputValue = (event.target as HTMLInputElement).value

    this.focusIndex = 0
    this.updateOptionProps()

    if (this.typeahead && !this.multiple && inputValue.length === 0) {
      this.dropdownElement.close()
    }
    if (this.typeahead && inputValue.length > 0) {
      this.dropdownElement.open()
    }
    event.preventDefault()
    event.stopPropagation()
    this.balInput.emit(inputValue)
  }

  private onInputBlur = (event: Event) => {
    event.preventDefault()
    event.stopPropagation()
    if (this.typeahead && !this.multiple) {
      const hasInputValueOptionLabel = this.childOptions.some(option => this.compareLabels(option.label || '', this.inputElementValue))
      if (!hasInputValueOptionLabel) {
        this.clear()
      }
    }

    this.balBlur.emit(event as any)
  }

  private onKeyUp = (event: KeyboardEvent) => {
    if (isEscapeKey(event)) {
      this.cancel()
    }
    if (this.hasChildren) {
      if (this.isDropdownOpen && (isArrowDownKey(event) || isArrowUpKey(event))) {
        event.preventDefault()
        event.stopPropagation()
        this.navigateWithArrowKey(event)
      }
    }
  }

  private onKeyPress = (event: KeyboardEvent) => {
    this.balKeyPress.emit(event)
    if (!this.typeahead && event.key.length === 1) {
      this.focusOptionByLabel(event.key)
    }
    if (isEnterKey(event)) {
      if (!this.isDropdownOpen) {
        this.open()
      } else {
        this.selectFocused()
      }
    }
  }

  private preventEvent = (ev: Event) => {
    ev.preventDefault()
    ev.stopPropagation()
  }

  private handleClick = (event: MouseEvent) => {
    if (this.disabled) {
      event.preventDefault()
      event.stopPropagation()
    }
  }

  render() {
    const labelId = this.inputId + '-lbl'
    const label = findItemLabel(this.el)
    if (label) {
      label.id = labelId
      label.htmlFor = this.inputId
    }

    return (
      <Host
        role="listbox"
        onClick={this.handleClick}
        aria-disabled={this.disabled ? 'true' : null}
        class={{
          'is-disabled': this.disabled,
        }}
      >
        <bal-dropdown expanded={this.expanded} scrollable={this.scrollable} onBalCollapse={this.onDropdownChange} ref={el => (this.dropdownElement = el as HTMLBalDropdownElement)}>
          <bal-dropdown-trigger>
            <bal-input
              ref={el => (this.inputElement = el as HTMLBalInputElement)}
              autoComplete={false}
              readonly={!(this.typeahead && !this.multiple)}
              disabled={this.disabled}
              placeholder={this.placeholder}
              inverted={this.inverted}
              clickable={true}
              hasIconRight={true}
              balTabindex={this.balTabindex}
              onBalInput={this.preventEvent}
              onBalChange={this.preventEvent}
              onBalClick={this.preventEvent}
              onBalKeyPress={this.preventEvent}
              onBalBlur={this.onInputBlur}
              onInput={this.onInput}
              onClick={this.onInputClick}
              onKeyPress={this.onKeyPress}
              onKeyUp={this.onKeyUp}
              onFocus={e => this.balFocus.emit(e)}
            ></bal-input>
            <bal-icon
              class={{ 'is-hidden': this.loading, 'is-right': true }}
              color="info"
              turn={!this.typeahead && this.isDropdownOpen}
              inverted={this.inverted}
              name={this.typeahead && !this.multiple ? 'search' : 'caret-down'}
              size={this.typeahead && !this.multiple ? 'small' : 'xsmall'}
            />
          </bal-dropdown-trigger>
          <bal-dropdown-menu>
            {this.renderFilter()}
            <slot></slot>
          </bal-dropdown-menu>
        </bal-dropdown>
      </Host>
    )
  }

  renderFilter() {
    if (!this.multiple || !this.typeahead) {
      return ''
    }

    return (
      <div class="multiple-typeahead">
        <div class="control has-icons-right">
          <input
            class="input"
            autoComplete="off"
            placeholder={this.filterPlaceholder}
            onInput={this.onInput}
            onKeyPress={this.onKeyPress}
            onKeyUp={this.onKeyUp}
            onBlur={e => this.balBlur.emit(e)}
            onFocus={e => this.balFocus.emit(e)}
            ref={el => (this.inputFilterElement = el as HTMLInputElement)}
          />
          <bal-icon class={{ 'is-hidden': this.loading }} turn={!this.loading && !this.typeahead && this.isDropdownOpen} size="small" color="info" name="search" />
        </div>
      </div>
    )
  }

  private async updateOptionProps() {
    const inputValue = this.multiple && this.typeahead ? this.inputFilterElementValue : this.inputElementValue
    this.clearFocus()
    this.childOptions.forEach((option, index) => {
      if (!this.noFilter && this.typeahead) {
        const didMatch = this.compareForFiltering(`${option.label}` || '', `${inputValue}`)
        option.setAttribute('hidden', `${!didMatch}`)
      } else {
        option.setAttribute('hidden', `${!this.isDropdownOpen}`)
      }

      const isSelected = !!this.value && this.value.includes(option.value as string)
      option.setAttribute('selected', `${isSelected}`)

      const isFocused = this.focusIndex === index
      option.setAttribute('focused', `${isFocused}`)
    })

    const visibleOptions = this.childOptions.filter(o => !o.hidden)
    if (visibleOptions.length === 1) {
      this.clearFocus()
      visibleOptions[0].setAttribute('focused', `${true}`)
    }

    this.scrollToFocusedOption()
  }

  private compareLabels(text: string, input: string): boolean {
    text = text.toLocaleLowerCase()
    input = input.toLocaleLowerCase()
    return text === input
  }

  private compareForFiltering(text: string, input: string): boolean {
    text = text.toLocaleLowerCase()
    input = input.toLocaleLowerCase()
    return text.indexOf(input) >= 0
  }

  private startsWithForFilter(text: string, input: string): boolean {
    text = text.toLocaleLowerCase()
    input = input.toLocaleLowerCase()
    return text.startsWith(input)
  }

  private clearFocus() {
    this.childOptions.forEach(el => (el.focused = false))
  }

  private async cancel() {
    this.balCancel.emit()
    this.close()
    this.labelToScrollTo = ''
    this.unfocusAllOptions()
    await this.scrollTo(0)
  }

  private navigateOneOptionDown(indexOfFocusedElement: number) {
    const lastIndex = this.childOptions.length - 1
    const nextIndex = this.nextOptionIndex(indexOfFocusedElement + 1, lastIndex)
    this.focusIndex = nextIndex <= lastIndex ? nextIndex : indexOfFocusedElement
    this.updateOptionProps()
  }

  private navigateOneOptionUp(indexOfFocusedElement: number) {
    const nextIndex = this.previousOptionIndex(indexOfFocusedElement - 1)
    this.focusIndex = nextIndex >= 0 ? nextIndex : indexOfFocusedElement
    this.updateOptionProps()
  }

  private async selectFocused() {
    const focusedElement: HTMLBalSelectOptionElement | undefined = this.childOptions.find(o => o.focused)
    if (focusedElement) {
      const option = await focusedElement.getOption()
      this.select(option)
    }
  }

  private focusOptionByLabel(key: string) {
    this.labelToScrollTo = this.labelToScrollTo + key
    clearTimeout(this.clearScrollToValue)
    this.clearScrollToValue = setTimeout(() => {
      this.scrollToLabel(this.labelToScrollTo)
    }, 600)
  }

  private async scrollToLabel(label: string) {
    const optionElement = this.childOptions.find(o => this.startsWithForFilter(o.label as string, label))
    if (optionElement) {
      this.focusOptionElement(optionElement)
      await this.scrollTo(optionElement.offsetTop)
    }
    this.labelToScrollTo = ''
  }

  private async scrollTo(scrollTop: number) {
    const dropdownContentElement = await this.dropdownElement.getContentElement()
    if (dropdownContentElement) {
      dropdownContentElement.scrollTop = scrollTop
    }
  }

  private unfocusAllOptions() {
    this.childOptions.forEach(o => (o.focused = false))
  }

  private focusOptionElement(optionElement: HTMLBalSelectOptionElement) {
    this.unfocusAllOptions()
    optionElement.focused = true
  }

  private nextOptionIndex(index: number, lastIndex: number): number {
    if (index >= lastIndex) {
      return lastIndex
    }
    const nextOption = this.childOptions[index]
    if (nextOption.hidden) {
      return this.nextOptionIndex(index + 1, lastIndex)
    } else {
      return index
    }
  }

  private previousOptionIndex(index: number): number {
    if (index <= 0) {
      return 0
    }
    const previousOption = this.childOptions[index]
    if (previousOption.hidden) {
      return this.previousOptionIndex(index - 1)
    } else {
      return index
    }
  }

  private navigateWithArrowKey(event: KeyboardEvent) {
    const indexOfFocusedElement = this.childOptions.findIndex(el => el.focused)
    if (indexOfFocusedElement < 0) {
      this.childOptions[0].focused = true
    } else {
      if (isArrowDownKey(event)) {
        this.navigateOneOptionDown(indexOfFocusedElement)
      } else {
        this.navigateOneOptionUp(indexOfFocusedElement)
      }
    }
  }

  private async scrollToFocusedOption() {
    const focusedElement = this.childOptions.find(el => el.focused)
    if (focusedElement && this.dropdownElement) {
      const dropdownContentElement = await this.dropdownElement.getContentElement()

      if (dropdownContentElement) {
        // up
        const topOfOption = focusedElement.offsetTop
        const topOfDropdownContent = dropdownContentElement.scrollTop
        if (topOfOption < topOfDropdownContent) {
          dropdownContentElement.scrollTop = topOfOption
        }

        // down
        const bottomOfOption = focusedElement.offsetTop + focusedElement.clientHeight
        const bottomOfDropdownContent = dropdownContentElement.scrollTop + dropdownContentElement.clientHeight
        if (bottomOfOption > bottomOfDropdownContent) {
          dropdownContentElement.scrollTop = dropdownContentElement.scrollTop + focusedElement.clientHeight
        }
      }
    }
  }
}

let selectIds = 0
