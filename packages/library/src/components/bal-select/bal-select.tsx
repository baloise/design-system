import { Component, h, Host, State, Prop, Watch, EventEmitter, Event, Method, Element, Listen } from '@stencil/core'
import { isNil } from 'lodash'
import { findItemLabel } from '../../helpers/helpers'
import { areArraysEqual, isArrowDownKey, isArrowUpKey, isEnterKey, isEscapeKey, isSpaceKey } from '../../utils'
import { BalOptionController } from '../bal-select-option/bal-select-option'
import { addOption, findLabelByValue, removeOption, updateOption } from './option.utils'
import { addValue, removeValue, compareValueWithInput, validateAfterBlur } from './value.utils'

@Component({
  tag: 'bal-select',
  styleUrl: 'bal-select.scss',
  shadow: false,
  scoped: true,
})
export class Select {
  @Element() private el!: HTMLElement
  private inputElement!: HTMLInputElement
  private dropdownElement!: HTMLBalDropdownElement
  private itemCounter = 0
  private didInit = false
  private initialValue: string[] = []
  private inputId = `bal-select-${selectIds++}`
  private clearScrollToValue!: NodeJS.Timeout

  @State() focusIndex: number = 0
  @State() isDropdownOpen: boolean = false
  @State() options: Map<string, BalOptionController> = new Map<string, BalOptionController>()
  @State() labelToScrollTo: string = ''

  /**
   * The name of the control, which is submitted with the form data.
   */
  @Prop() name: string = this.inputId

  /**
   * The tabindex of the control.
   */
  @Prop() balTabindex: number = 0

  /**
   * If `true` multiple option can be selected
   */
  @Prop() multiple = false

  /**
   * This label is shown if typeahead is active and all the options are filtered out.
   */
  @Prop() noDataLabel: string | undefined

  /**
   * If `true` the user can search by typing into the input field.
   */
  @Prop() typeahead = false

  /**
   * If `true` the component is diabled.
   */
  @Prop() disabled = false

  /**
   * If `true` the component uses the whole width.
   */
  @Prop() expanded = false

  /**
   * Set this to `true` when the component is placed on a dark background.
   */
  @Prop() inverted = false

  /**
   * The text to display when the select is empty.
   */
  @Prop() placeholder?: string

  /**
   * Defines the height of the dropdown list.
   */
  @Prop() scrollable: number = 250

  @Prop() loading: boolean = false
  @Prop() searchInput?: (inputValue: string) => void = undefined

  /**
   * Selected option values. Could also be passed as a string, which gets transformed.
   */
  @Prop({ mutable: true }) value: string[] = []

  @Watch('value')
  valueWatcher(newValue: string[], oldValue: string[]) {
    if (!areArraysEqual(newValue, oldValue)) {
      if (!this.multiple && this.typeahead) {
        if (this.value.length > 0) {
          this.inputElement.value = findLabelByValue(this.options, newValue[0])
        }
        this.filterOptions(this.inputElement.value)
      }
      this.updateSelection()
      this.balChange.emit(this.value)
    }
  }

  /**
   * Emitted when a option got selected.
   */
  @Event() balChange!: EventEmitter<string[]>

  /**
   * Emitted when the input got clicked.
   */
  @Event() balClick!: EventEmitter<MouseEvent>

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
   * Emitted when the user cancels the input.
   */
  @Event() balCancel!: EventEmitter<KeyboardEvent>

  /**
   * Emitted when the input has focus and key from the keyboard go hit.
   */
  @Event() balKeyPress!: EventEmitter<KeyboardEvent>

  @Listen('click', { capture: true, target: 'document' })
  listenOnClick(ev: UIEvent) {
    if (this.disabled && ev.target && ev.target === this.el) {
      ev.preventDefault()
      ev.stopPropagation()
    }
  }

  @Listen('keydown', { target: 'window' })
  handleKeyDown(event: KeyboardEvent) {
    if (this.isDropdownOpen) {
      if (isArrowDownKey(event) || isArrowUpKey(event)) {
        event.preventDefault()
        event.stopPropagation()
        this.navigateWithArrowKey(event)
        this.updateFocus()
      }
      if (isEnterKey(event)) {
        this.selectedFocusedOption()
        event.preventDefault()
        event.stopPropagation()
      }
      if (isEscapeKey(event)) {
        this.cancel()
      }
      if (!this.typeahead && event.key.length === 1) {
        this.focusOptionByLabel(event.key)
      }
    }
  }

  componentWillLoad() {
    this.initialValue = this.value
  }

  componentDidUpdate() {
    if (this.initialValue.length > 0) {
      this.inputElement.value = findLabelByValue(this.options, this.initialValue[0])
      this.initialValue = []
      this.filterOptions(this.inputElement.value)
      this.updateSelection()
    }
    this.didInit = true
  }

  /**
   * Sets the focus on the input element
   */
  @Method()
  async setFocus() {
    if (this.inputElement && !this.disabled) {
      this.inputElement.focus()
    }
  }

  /**
   * Sets the value to null and resets the value of the input.
   */
  @Method()
  async clear(force = false) {
    this.focusIndex = 0
    if (this.inputElement) {
      if (force === true) {
        this.inputElement.value = ''
      }
      this.value = []
    }
  }

  /**
   * Opens the dropdown
   */
  @Method()
  async open(): Promise<void> {
    if (!this.disabled && !isNil(this.dropdownElement)) {
      await this.dropdownElement.open()
    }
  }

  /**
   * Closes the dropdown
   */
  @Method()
  async close(): Promise<void> {
    if (!this.disabled && !isNil(this.dropdownElement)) {
      await this.dropdownElement.close()
    }
  }

  /**
   * Cancel the dropdown
   */
  @Method()
  async cancel(): Promise<void> {
    this.labelToScrollTo = ''
    this.close()
    this.scrollTo(0)
    this.balCancel.emit()
  }

  /**
   * @internal - Used to update option changes
   */
  @Method()
  async optionSelected(selectedOption: BalOptionController) {
    const isAlreadySelected = this.value.some(v => v === selectedOption.value)
    this.updateValue(selectedOption.value, !isAlreadySelected)

    if (!this.multiple) {
      if (this.typeahead) {
        this.filterOptions(selectedOption.label)
      }

      await this.dropdownElement.close()
    } else {
      if (this.typeahead) {
        await this.setFocus()
      }
    }
  }

  /**
   * @internal - Used to update option changes
   */
  @Method()
  async optionConnected(option: BalOptionController) {
    this.options = addOption(this.options, option)
    this.filterOptions(this.inputElement.value)
    this.validateAfterBlur()
    this.updateFocus()
  }

  /**
   * @internal - Used to update option changes
   */
  @Method()
  async optionWillUpdate(optionToUpdate: BalOptionController) {
    this.options = updateOption(this.options, optionToUpdate)
  }

  /**
   * @internal - Used to update option changes
   */
  @Method()
  async optionDisconnected(optionToDisconnect: BalOptionController) {
    this.value = removeValue(this.value, optionToDisconnect.value)
    this.options = removeOption(this.options, optionToDisconnect)
    this.filterOptions(this.inputElement.value)
  }

  /********************************************************
   * GETTERS
   ********************************************************/

  private get inputPlaceholder(): string | undefined {
    if (this.multiple) {
      if (this.value.length < 1) {
        return this.placeholder
      }
      return undefined
    } else {
      if (!isNil(this.value) && this.value.length > 0) {
        return undefined
      }
    }

    return this.placeholder
  }

  private getDropdownContent() {
    return this.dropdownElement.querySelector('.dropdown-content')
  }

  private findOptionById(id: string): HTMLBalSelectOptionElement | null {
    return this.el.querySelector(`#${id}`)
  }

  private getVisibleOptions(): HTMLBalSelectOptionElement[] {
    const nodes = this.el.querySelectorAll('bal-select-option')
    const list: HTMLBalSelectOptionElement[] = Array.prototype.slice.call(nodes)
    return list.filter(el => !el.hidden)
  }

  /********************************************************
   * FOCUS
   ********************************************************/

  private updateFocus() {
    if (this.focusIndex < 0) {
      this.focusIndex = 0
    }

    const visibleOptions = this.getVisibleOptions()
    if (visibleOptions.length > 0) {
      if (visibleOptions.length <= this.focusIndex) {
        this.focusIndex = visibleOptions.length - 1
      }

      let focusedElement: HTMLBalSelectOptionElement | undefined
      for (let index = 0; index < visibleOptions.length; index++) {
        const element = visibleOptions[index]
        const isElementInFocus = index === this.focusIndex
        if (isElementInFocus) {
          focusedElement = element
        }
        element.setAttribute('focused', `${isElementInFocus}`)
      }
      this.scrollToFocusedOption(focusedElement)
    } else {
      this.focusIndex = 0
    }
  }

  private scrollToFocusedOption(focusedElement?: HTMLBalSelectOptionElement) {
    if (focusedElement && this.dropdownElement) {
      const dropdownContentElement = this.getDropdownContent()

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

  private scrollTo(scrollTop: number) {
    const dropdownContentElement = this.getDropdownContent()
    if (dropdownContentElement) {
      dropdownContentElement.scrollTop = scrollTop
    }
  }

  private selectedFocusedOption() {
    const visibleOptions = this.getVisibleOptions()
    if (visibleOptions.length > this.focusIndex) {
      const focusedOption = visibleOptions[this.focusIndex]
      if (!isNil(focusedOption)) {
        this.optionSelected({
          id: focusedOption.id,
          label: focusedOption.label || '',
          value: focusedOption.value || '',
        })
      }
    }
  }

  private navigateWithArrowKey(event: KeyboardEvent) {
    if (isArrowDownKey(event)) {
      this.focusIndex = this.focusIndex + 1
    } else {
      if (isArrowUpKey(event)) {
        this.focusIndex = this.focusIndex - 1
      }
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
    const visibleOptions = this.getVisibleOptions()
    const optionElement = visibleOptions.find(o => this.startsWithForFilter(o.label || '', label))
    if (optionElement) {
      this.focusOptionElement(optionElement)
      this.scrollTo(optionElement.offsetTop)
    }
    this.labelToScrollTo = ''
  }

  private focusOptionElement(optionElement: HTMLBalSelectOptionElement) {
    const visibleOptions = this.getVisibleOptions()
    for (let index = 0; index < visibleOptions.length; index++) {
      const element = visibleOptions[index]
      const isFocused = element.id === optionElement.id
      element.setAttribute('focused', `${isFocused}`)
      if (isFocused) {
        this.focusIndex = index
      }
    }
  }

  private startsWithForFilter(text: string, input: string): boolean {
    text = text.toLocaleLowerCase()
    input = input.toLocaleLowerCase()
    return text.startsWith(input)
  }

  /********************************************************
   * VALUE & FILTER & SELECTION
   ********************************************************/

  private updateValue(newValue: string, isSelected = true) {
    if (this.multiple) {
      if (isSelected) {
        this.value = addValue(this.value, newValue, this.multiple)
      } else {
        this.value = removeValue(this.value, newValue)
      }
    } else {
      this.value = addValue(this.value, newValue, this.multiple)
      this.inputElement.value = findLabelByValue(this.options, this.value[0])
    }

    this.updateSelection()
  }

  private removeValue = (value: string) => {
    this.value = removeValue(this.value, value)
    this.updateSelection()
    if (this.multiple && this.typeahead) {
      this.setFocus()
    }
  }

  private updateSelection() {
    this.options.forEach(option => {
      const optionEl = this.findOptionById(option.id)
      if (optionEl !== null) {
        optionEl.selected = this.value.includes(option.value)
      }
    })
  }

  private filterOptions(inputValue: string): void {
    if (this.typeahead) {
      this.itemCounter = 0
      this.options.forEach(option => {
        const optionElement = this.findOptionById(option.id)
        const didMatch = compareValueWithInput(`${option.label}` || '', `${inputValue}`)
        if (didMatch === true) {
          this.itemCounter = this.itemCounter + 1
        }
        if (optionElement !== null) {
          optionElement.setAttribute('hidden', `${!didMatch}`)
        }
      })
    }
  }

  private validateAfterBlur() {
    if (!this.multiple && this.didInit) {
      this.value = validateAfterBlur(this.value, this.options, this.inputElement.value)
    }
  }

  /********************************************************
   * EVENT HANDLERS
   ********************************************************/

  private handleClick = (event: MouseEvent) => {
    if (this.disabled) {
      event.preventDefault()
      event.stopPropagation()
    }
  }

  private handleDropdownChange = (event: CustomEvent<boolean>) => {
    this.isDropdownOpen = event.detail
    if (this.isDropdownOpen) {
      this.updateFocus()
    } else {
      this.focusIndex = 0
      if (this.multiple && this.typeahead) {
        this.inputElement.value = ''
        this.filterOptions(this.inputElement.value)
      }
    }
    event.stopPropagation()
  }

  private handleInputBlur = (event: FocusEvent) => {
    this.validateAfterBlur()
    this.balBlur.emit(event)
  }

  private handleInputClick = async (event: MouseEvent) => {
    if (this.disabled) {
      event.preventDefault()
      event.stopPropagation()
    } else {
      this.focusIndex = 0
      this.balClick.emit(event)
      await this.dropdownElement?.open()
    }
  }

  private handleKeyPress = async (event: KeyboardEvent) => {
    if (isSpaceKey(event)) {
      if (!this.isDropdownOpen) {
        await this.open()
      } else {
        if (!this.typeahead) {
          await this.close()
        }
      }
    }
    this.balKeyPress.emit(event)
  }

  private handleInput = async (event: Event) => {
    if (!this.disabled) {
      if (!this.isDropdownOpen) {
        this.dropdownElement.open()
      }
      this.focusIndex = 0

      const inputValue = (event.target as HTMLInputElement).value
      this.filterOptions(inputValue)
      this.updateFocus()

      event.preventDefault()
      event.stopPropagation()
      if (this.searchInput !== undefined) {
        this.searchInput(inputValue)
      }
      this.balInput.emit(inputValue)
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
          'is-inverted': this.inverted,
        }}
      >
        <bal-dropdown expanded={this.expanded} onBalCollapse={this.handleDropdownChange} ref={el => (this.dropdownElement = el as HTMLBalDropdownElement)}>
          <bal-dropdown-trigger>{this.renderTrigger()}</bal-dropdown-trigger>
          <bal-dropdown-menu scrollable={this.scrollable}>
            <slot></slot>
            <div
              class={{
                'bal-select__empty': true,
                'is-hidden': this.noDataLabel === undefined || this.itemCounter !== 0 || !this.typeahead,
              }}
            >
              {this.noDataLabel}
            </div>
          </bal-dropdown-menu>
        </bal-dropdown>
      </Host>
    )
  }

  renderTrigger() {
    return (
      <div
        class={{
          'bal-select__slot': true,
          'is-focused': this.isDropdownOpen,
        }}
      >
        <div class="bal-select__selections">
          {this.value.map((value: string) => this.renderValue(value))}
          <input
            type="text"
            class={{
              'input': true,
              'is-inverted': this.inverted,
              'is-clickable': !this.isDropdownOpen,
            }}
            autocomplete={'off'}
            placeholder={this.inputPlaceholder}
            readOnly={!this.typeahead}
            disabled={this.disabled}
            tabindex={this.balTabindex}
            onInput={this.handleInput}
            onClick={this.handleInputClick}
            onBlur={this.handleInputBlur}
            onFocus={this.balFocus.emit}
            onKeyPress={this.handleKeyPress}
            ref={el => (this.inputElement = el as HTMLInputElement)}
          />
        </div>
        <bal-icon
          class={{ 'is-hidden': this.loading }}
          name="caret-down"
          size="xsmall"
          inverted={this.inverted}
          turn={this.isDropdownOpen}
          style={{
            marginTop: this.isDropdownOpen ? '8px' : '0px',
          }}
        ></bal-icon>
      </div>
    )
  }

  renderValue(value: string) {
    return this.multiple ? (
      <bal-tag size="small" dense closable onBalCloseClick={_ => this.removeValue(value)}>
        {findLabelByValue(this.options, value)}
      </bal-tag>
    ) : (
      ''
    )
  }
}

let selectIds = 0
