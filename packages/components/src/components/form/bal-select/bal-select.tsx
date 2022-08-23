import { Component, h, Host, State, Prop, Watch, EventEmitter, Event, Method, Element, Listen } from '@stencil/core'
import isNil from 'lodash.isnil'
import isArray from 'lodash.isarray'
import { findItemLabel } from '../../../helpers/helpers'
import {
  areArraysEqual,
  isArrowDownKey,
  isArrowUpKey,
  isEnterKey,
  isEscapeKey,
  isSpaceKey,
  isBackspaceKey,
} from '@baloise/web-app-utils'
import {
  addValue,
  findLabelByValue,
  findOptionByLabel,
  getValues,
  includes,
  length,
  preventDefault,
  removeValue,
  startsWith,
  validateAfterBlur,
} from './utils/utils'
import { watchForOptions } from './utils/watch-options'
import { BalOptionValue } from './utils/bal-option.type'
import { Props, Events } from '../../../types'
import { stopEventBubbling } from '../../../helpers/form-input.helpers'
import { BEM } from '../../../utils/bem'

export interface BalOptionController extends BalOptionValue {
  id: string
  textContent: string
  innerHTML: string
}

@Component({
  tag: 'bal-select',
})
export class Select {
  @Element() private el!: HTMLElement

  private inputElement!: HTMLInputElement
  private popoverElement!: HTMLBalPopoverElement
  private didInit = false
  private inputId = `bal-select-${selectIds++}`
  private clearScrollToValue!: NodeJS.Timeout
  private clearSelectValue!: NodeJS.Timeout
  private mutationO?: MutationObserver

  @State() hasFocus = false
  @State() inputValue = ''
  @State() focusIndex = 0
  @State() isPopoverOpen = false
  @State() options: Map<string, BalOptionController> = new Map<string, BalOptionController>()
  @State() labelToScrollTo = ''
  @State() labelToSelectTo = ''

  /**
   * The name of the control, which is submitted with the form data.
   */
  @Prop() name: string = this.inputId

  /**
   * If `true` the component gets a invalid style.
   */
  @Prop() invalid = false

  /**
   * If `true` the component gets a invalid style.
   */
  @Prop() filter: Props.BalSelectFilter = 'includes'

  /**
   * The tabindex of the control.
   */
  @Prop() balTabindex = 0

  /**
   * If `true` multiple option can be selected
   */
  @Prop() multiple = false

  /**
   * This label is shown if typeahead is active and all the options are filtered out.
   */
  @Prop() noDataLabel?: string

  /**
   * @deprecated  Removes the border of the input.
   */
  @Prop() noBorder = false

  /**
   * @deprecated Enables the slide in animation for the option items.
   */
  @Prop() hasMovement = false

  /**
   * If `true` the user can search by typing into the input field.
   */
  @Prop() typeahead = false

  /**
   * If `true` the options are a proposal and the user can also create his
   * own value. Can only be used with the typeahead property.
   */
  @Prop() selectionOptional = false

  /**
   * If `true`, the element is not mutable, focusable, or even submitted with the form. The user can neither edit nor focus on the control, nor its form control descendants.
   */
  @Prop() disabled = false

  /**
   * If `true` the element can not mutated, meaning the user can not edit the control.
   */
  @Prop() readonly = false

  /**
   * If `true`, the user must fill in a value before submitting a form.
   */
  @Prop() required = false

  /**
   * @deprecated  Set this to `true` when the component is placed on a dark background.
   * Set this to `true` when the component is placed on a dark background.
   */
  @Prop() inverted = false

  /**
   * The text to display when the select is empty.
   */
  @Prop() placeholder?: string

  /**
   * Defines the height of the popover list.
   */
  @Prop() scrollable = 250

  /**
   * Defines if the select is in a loading state.
   */
  @Prop() loading = false

  /**
   * If `true` the filtering is done outside the component.
   */
  @Prop() remote = false

  /**
   * Selected option values. Could also be passed as a string, which gets transformed.
   */
  @Prop({ mutable: true }) value?: string | string[] = []
  @State() rawValue: string[] | undefined = []

  @Watch('value')
  valueWatcher() {
    this.updateRawValue(false)
  }

  @Watch('rawValue')
  rawValueWatcher(newValue: string[], oldValue: string[] | undefined, isHuman = true) {
    this.rawValue = newValue
    if (!areArraysEqual(newValue, oldValue || [])) {
      this.syncNativeInput()
      if (this.didInit && isHuman) {
        if (this.multiple) {
          if (isNil(this.rawValue)) {
            this.balChange.emit([])
          } else {
            this.balChange.emit([...(this.rawValue as string[])])
          }
        } else {
          if (isNil(this.rawValue) || length(this.rawValue) === 0) {
            this.balChange.emit(undefined)
          } else {
            this.balChange.emit(this.rawValue[0])
          }
        }
      }
    }
  }

  /**
   * Emitted when a option got selected.
   */
  @Event() balChange!: EventEmitter<Events.BalSelectChangeDetail>

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
  listenOnClick(event: UIEvent) {
    if (this.disabled && event.target && event.target === this.el) {
      preventDefault(event)
    }
  }

  @Listen('reset', { capture: true, target: 'document' })
  resetHandler(event: UIEvent) {
    const formElement = event.target as HTMLElement
    if (formElement?.contains(this.el)) {
      this.value = undefined
      this.rawValue = []
    }
  }

  @Listen('keydown', { target: 'window' })
  async handleKeyDown(event: KeyboardEvent) {
    if (this.isPopoverOpen) {
      if (isArrowDownKey(event) || isArrowUpKey(event)) {
        preventDefault(event)
        this.navigateWithArrowKey(event)
        this.updateFocus()
      }
      if (isEnterKey(event)) {
        preventDefault(event)
        this.selectedFocusedOption()
      }
      if (isEscapeKey(event)) {
        this.cancel()
      }
      if (isBackspaceKey(event) && this.typeahead && this.multiple) {
        if (this.inputElement.value === '' && length(this.rawValue) > 0) {
          const valuesArray = getValues(this.rawValue)
          this.removeValue(valuesArray[length(this.rawValue) - 1])
        }
      }
      if (!this.typeahead && event.key.length === 1) {
        this.focusOptionByLabel(event.key)
      }
      if (isSpaceKey(event) && !this.typeahead) {
        preventDefault(event)
      }
    } else {
      if (this.hasFocus) {
        if (isArrowDownKey(event) || isArrowUpKey(event)) {
          preventDefault(event)
          await this.open()
        }
        if (!this.typeahead && event.key.length === 1) {
          this.selectOptionByLabel(event.key)
        }
      }
    }
  }

  connectedCallback() {
    this.updateOptions()

    this.mutationO = watchForOptions<HTMLBalSelectOptionElement>(this.el, 'bal-select-option', () => {
      this.updateOptions()
    })
  }

  disconnectedCallback() {
    if (this.mutationO) {
      this.mutationO.disconnect()
      this.mutationO = undefined
    }
  }

  componentWillLoad() {
    this.updateRawValue(false)

    if (!isNil(this.rawValue) && this.options.size > 0 && length(this.rawValue) === 1) {
      const firstOption = this.options.get(this.rawValue[0])
      if (!isNil(firstOption)) {
        this.inputValue = firstOption.label
      }
    }
  }

  componentDidLoad() {
    this.inputElement.value = this.inputValue
    this.didInit = true
  }

  private updateOptions() {
    const optionElements = this.getChildOpts()
    const options = new Map()
    for (let index = 0; index < optionElements.length; index++) {
      const element = optionElements[index]
      options.set(element.value, {
        value: element.value,
        label: element.label,
        disabled: element.disabled,
        id: element.id,
        textContent: element.textContent,
        innerHTML: element.innerHTML,
      })
    }
    if (!this.selectionOptional && Array.isArray(this.rawValue)) {
      for (let index = 0; index < this.rawValue.length; index++) {
        const val = this.rawValue[index]
        if (!options.has(val)) {
          this.rawValue = removeValue(this.rawValue, val)
        }
      }
    }
    this.options = new Map(options)
    if (!this.remote) {
      this.syncNativeInput()
      if (this.didInit) {
        this.validateAfterBlur()
      }
    }
  }

  /**
   * Sets the focus on the input element
   */
  @Method()
  async setFocus() {
    setTimeout(() => {
      if (this.inputElement && !this.disabled) {
        this.inputElement.focus()
      }
    })
  }

  /**
   * Sets the focus on the input element
   */
  @Method()
  async getValue() {
    return this.rawValue
  }

  /**
   * Sets the value to `[]`, the input value to ´''´ and the focus index to ´0´.
   */
  @Method()
  async clear() {
    this.focusIndex = 0
    if (this.inputElement) {
      this.updateInputValue('')
      this.rawValue = []
      this.value = this.multiple ? [] : ''
    }
  }

  /**
   * Opens the popover
   */
  @Method()
  async open(): Promise<void> {
    if (!this.disabled && !this.readonly && !isNil(this.popoverElement)) {
      await this.popoverElement.present()
    }
  }

  /**
   * Closes the popover
   */
  @Method()
  async close(): Promise<void> {
    if (!this.disabled && !this.readonly && !isNil(this.popoverElement)) {
      this.blurSelect()
    }
  }

  /**
   * Cancel the popover
   */
  @Method()
  async cancel(): Promise<void> {
    this.labelToScrollTo = ''
    this.close()
    this.scrollTo(0)
    this.balCancel.emit()
  }

  /**
   * Select option by passed value
   */
  @Method()
  async select(value: string): Promise<void> {
    const option = this.options.get(value)
    if (!isNil(option)) {
      this.optionSelected(option)
    }
  }

  /********************************************************
   * GETTERS
   ********************************************************/

  private get optionArray() {
    const options = Array.from(this.options, ([_, value]) => value)
    if (!this.typeahead || this.remote) {
      return options
    }

    return options.filter(option =>
      this.filter === 'includes'
        ? includes(option.textContent, this.inputValue)
        : startsWith(option.textContent, this.inputValue),
    )
  }

  private hasOptions() {
    return this.optionArray.length > 0
  }

  private get inputPlaceholder(): string | undefined {
    if (this.multiple) {
      if (length(this.rawValue) < 1) {
        return this.placeholder
      }
      return undefined
    } else {
      if (!isNil(this.rawValue) && length(this.rawValue) > 0) {
        return undefined
      }
    }

    return this.placeholder
  }

  private getChildOpts() {
    return Array.from(this.el.querySelectorAll('bal-select-option'))
  }

  private getPopoverContent() {
    return this.popoverElement.querySelector('.popover-content .inner')
  }

  /********************************************************
   * FOCUS
   ********************************************************/

  private updateFocus() {
    if (this.focusIndex < 0) {
      this.focusIndex = 0
    }

    const visibleOptions = this.optionArray
    if (visibleOptions.length > 0) {
      if (visibleOptions.length <= this.focusIndex) {
        this.focusIndex = visibleOptions.length - 1
      }

      const option = visibleOptions[this.focusIndex]
      if (option && option.id) {
        const focusedElement = this.el.querySelector<HTMLElement>(`button#${option.id}`)
        if (focusedElement) {
          setTimeout(() => {
            this.scrollToFocusedOption(focusedElement)
          }, 0)
        }
      }
    } else {
      this.focusIndex = 0
    }
  }

  private scrollToFocusedOption(focusedElement?: HTMLElement) {
    if (focusedElement && this.popoverElement) {
      const popoverContentElement = this.getPopoverContent()

      if (popoverContentElement) {
        // up
        const topOfOption = focusedElement.offsetTop
        const topOfPopoverContent = popoverContentElement.scrollTop
        if (topOfOption < topOfPopoverContent) {
          popoverContentElement.scrollTop = topOfOption
        }

        // down
        const bottomOfOption = focusedElement.offsetTop + focusedElement.clientHeight
        const bottomOfPopoverContent = popoverContentElement.scrollTop + popoverContentElement.clientHeight
        if (bottomOfOption > bottomOfPopoverContent) {
          popoverContentElement.scrollTop = popoverContentElement.scrollTop + focusedElement.clientHeight
        }
      }
    }
  }

  private scrollTo(scrollTop: number) {
    const popoverContentElement = this.getPopoverContent()
    if (popoverContentElement) {
      popoverContentElement.scrollTop = scrollTop
    }
  }

  private selectedFocusedOption() {
    const visibleOptions = this.optionArray
    if (visibleOptions.length > this.focusIndex) {
      const focusedOption = visibleOptions[this.focusIndex]
      this.optionSelected(focusedOption)
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

  private selectOptionByLabel(key: string) {
    this.labelToSelectTo = this.labelToSelectTo + key
    clearTimeout(this.clearSelectValue)
    this.clearSelectValue = setTimeout(() => {
      this.selectLabel(this.labelToSelectTo)
      this.labelToSelectTo = ''
    }, 600)
  }

  private async selectLabel(label: string) {
    if (label !== ' ') {
      const option = this.optionArray.find(o => startsWith(o.label || '', label))
      if (!isNil(option) && option.id) {
        const optionElement = this.el.querySelector<HTMLButtonElement>(`button#${option.id}`)
        if (!isNil(optionElement)) {
          const index = this.optionArray.indexOf(option)
          this.focusIndex = index
          this.select(option.value)
        }
      }
      this.labelToScrollTo = ''
    }
  }

  private async scrollToLabel(label: string) {
    if (label !== ' ') {
      const option = this.optionArray.find(o => startsWith(o.label || '', label))
      if (!isNil(option) && option.id) {
        const optionElement = this.el.querySelector<HTMLButtonElement>(`button#${option.id}`)
        if (!isNil(optionElement)) {
          const index = this.optionArray.indexOf(option)
          this.focusIndex = index
          this.scrollTo(optionElement.offsetTop)
        }
      }
      this.labelToScrollTo = ''
    }
  }

  /********************************************************
   * VALUE & FILTER & SELECTION
   ********************************************************/

  private updateRawValue(isHuman = true) {
    let newValue: string[] = []
    if (!isNil(this.value)) {
      if (isArray(this.value)) {
        newValue = [...this.value.filter(v => !isNil(v))]
      } else {
        newValue = [this.value]
      }
    }

    this.rawValueWatcher(newValue, this.rawValue, isHuman)
  }

  private blurSelect() {
    this.popoverElement.dismiss()
  }

  private optionSelected(selectedOption: BalOptionController) {
    const valuesArray = getValues(this.rawValue)
    const isAlreadySelected = valuesArray.some(v => v === selectedOption.value)
    this.updateValue(selectedOption.value, !isAlreadySelected)

    if (!this.multiple) {
      this.blurSelect()
    } else {
      if (this.typeahead) {
        this.setFocus()
      }
    }
  }

  private updateValue(newValue: string, isSelected = true) {
    if (this.multiple) {
      if (isSelected) {
        this.rawValue = addValue(this.rawValue, newValue, this.multiple)
      } else {
        this.rawValue = removeValue(this.rawValue, newValue)
      }
    } else {
      this.rawValue = addValue(this.rawValue, newValue, this.multiple)
      this.updateInputValue(findLabelByValue(this.options, this.rawValue[0]))
    }
  }

  private removeValue = (value: string) => {
    if (!this.disabled) {
      this.rawValue = removeValue(this.rawValue, value)
      if (this.multiple && this.typeahead) {
        this.setFocus()
      }
    }
  }

  private validateAfterBlur() {
    if (this.didInit && !this.multiple) {
      if (this.selectionOptional && this.typeahead) {
        const typedOption = findOptionByLabel(this.options, this.inputElement.value)
        if (typedOption) {
          this.rawValue = [typedOption.value]
        } else {
          this.rawValue = [this.inputElement.value]
        }
      } else {
        this.rawValue = validateAfterBlur(this.rawValue, this.options, this.inputElement.value)
      }
    }
  }

  private updateInputValue(value: string) {
    if (!isNil(this.inputElement)) {
      this.inputElement.value = value
      this.inputValue = value
    }
  }

  private syncNativeInput() {
    if (!this.multiple && !this.remote) {
      if (length(this.rawValue) > 0) {
        const valuesArray = getValues(this.rawValue)
        let label = findLabelByValue(this.options, valuesArray[0])
        if (!this.multiple && this.typeahead && this.selectionOptional && label === '') {
          label = valuesArray.join(', ')
        }
        this.updateInputValue(label)
      }
    }
  }

  /********************************************************
   * EVENT HANDLERS
   ********************************************************/

  private handleClick = (event: MouseEvent) => {
    if (this.disabled || this.readonly) {
      preventDefault(event)
    }
  }

  private handlePopoverChange = (event: CustomEvent<boolean>) => {
    this.isPopoverOpen = event.detail
    if (this.isPopoverOpen) {
      this.updateFocus()
    } else {
      this.focusIndex = 0
      if (this.multiple && this.typeahead) {
        this.updateInputValue('')
      }
      this.balBlur.emit()
    }
    event.stopPropagation()
  }

  private handleInputBlur = (event: FocusEvent) => {
    preventDefault(event)
    this.validateAfterBlur()
    this.hasFocus = false
  }

  private handleInputFocus = (event: FocusEvent) => {
    this.balFocus.emit(event)
    this.hasFocus = true
  }

  private handleInputClick = async (event: MouseEvent) => {
    stopEventBubbling(event)

    if (this.disabled || this.readonly) {
      preventDefault(event)
    } else {
      this.focusIndex = 0
      this.balClick.emit(event)

      if (this.typeahead) {
        await this.popoverElement?.present()
      } else {
        if (this.isPopoverOpen) {
          await this.popoverElement?.dismiss()
        } else {
          await this.popoverElement?.present()
        }
      }
    }
  }

  private handleKeyPress = async (event: KeyboardEvent) => {
    if (!this.isPopoverOpen && isSpaceKey(event)) {
      preventDefault(event)
      await this.open()
    }
    this.balKeyPress.emit(event)
  }

  private handleInputChange = (event: Event) => {
    if (!this.disabled && !this.readonly) {
      this.inputValue = (event.target as HTMLInputElement).value
    }
  }

  private handleInput = async (event: Event) => {
    if (!this.disabled && !this.readonly) {
      this.inputValue = (event.target as HTMLInputElement).value

      if (!this.isPopoverOpen) {
        this.popoverElement.present()
      }

      this.focusIndex = 0
      this.updateFocus()
      preventDefault(event)

      this.balInput.emit(this.inputValue)
    }
  }

  private handleOptionMouseEnter = (index: number) => {
    this.focusIndex = index
  }

  render() {
    const labelId = this.inputId + '-lbl'
    const label = findItemLabel(this.el)
    if (label) {
      label.id = labelId
      label.htmlFor = this.inputId
    }

    const Chip = (props: { value: string }) => (
      <bal-tag size="small" closable={!this.disabled} onBalCloseClick={_ => this.removeValue(props.value)}>
        {findLabelByValue(this.options, props.value) || props.value}
      </bal-tag>
    )

    const valuesArray = getValues(this.rawValue)

    const block = BEM.block('select')
    const nativeEl = block.element('native')
    const controlEl = block.element('control')
    const controlIconEl = controlEl.element('icon')
    const controlSelectionsEl = controlEl.element('selections')
    const controlInputEl = controlEl.element('input')
    const popoverContentEl = block.element('popover')
    const popoverContentEmptyEl = popoverContentEl.element('empty')
    const optionEl = block.element('option')
    const optionContentEl = optionEl.element('content')
    const optionContentCheckboxEl = optionContentEl.element('checkbox')
    const optionContentLabelEl = optionContentEl.element('label')

    return (
      <Host
        role="listbox"
        onClick={this.handleClick}
        aria-disabled={this.disabled ? 'true' : null}
        data-value={this.rawValue?.map(v => findLabelByValue(this.options, v)).join(',')}
        class={{
          ...block.class(),
          ...block.modifier('disabled').class(this.disabled || this.readonly),
          ...block.modifier('inverted').class(this.inverted),
        }}
      >
        <select class={{ ...nativeEl.class() }} name={this.name} multiple={this.multiple} required={this.required}>
          {valuesArray.map((value: string) => (
            <option value={value} selected>
              {value}
            </option>
          ))}
        </select>
        <bal-popover
          onBalChange={this.handlePopoverChange}
          ref={el => (this.popoverElement = el as HTMLBalPopoverElement)}
        >
          <div
            bal-popover-trigger
            class={{
              ...controlEl.class(),
              ...controlEl.modifier('invalid').class(this.invalid),
              ...controlEl.modifier('disabled').class(this.disabled || this.readonly),
              ...controlEl.modifier('focused').class(this.isPopoverOpen),
            }}
          >
            <div
              class={{
                ...controlSelectionsEl.class(),
                ...controlSelectionsEl
                  .modifier('clickable')
                  .class(!this.isPopoverOpen && !this.disabled && !this.readonly),
              }}
              onClick={this.handleInputClick}
            >
              {valuesArray
                .filter(_ => this.multiple)
                .map((value: string) => (
                  <Chip value={value}></Chip>
                ))}
              <input
                type="text"
                class={{
                  ...controlInputEl.class(),
                  'input': true,
                  'is-inverted': this.inverted,
                  'is-hidden': this.multiple && !this.typeahead,
                  'is-danger': this.invalid,
                  'is-disabled': this.disabled || this.readonly,
                  'is-clickable': !this.isPopoverOpen && !this.disabled && !this.readonly,
                  'data-test-select-input': true,
                }}
                autocomplete={'off'}
                placeholder={this.inputPlaceholder}
                readonly={!this.typeahead || this.disabled || this.readonly}
                contentEditable={this.typeahead}
                disabled={this.disabled}
                tabindex={this.balTabindex}
                onInput={this.handleInput}
                onClick={this.handleInputClick}
                onChange={this.handleInputChange}
                onFocus={this.handleInputFocus}
                onBlur={this.handleInputBlur}
                onKeyPress={this.handleKeyPress}
                ref={el => (this.inputElement = el as HTMLInputElement)}
              />
            </div>
            <bal-icon
              class={{
                ...controlIconEl.class(),
                ...controlIconEl.modifier('loading').class(this.loading),
                ...controlIconEl.modifier('clickable').class(!this.disabled && !this.readonly),
              }}
              name="caret-down"
              size="xsmall"
              color={this.disabled || this.readonly ? 'grey' : this.invalid ? 'danger' : 'primary'}
              turn={this.isPopoverOpen}
              onClick={this.handleInputClick}
            ></bal-icon>
          </div>
          <bal-popover-content class={{ ...popoverContentEl.class() }} scrollable={this.scrollable} expanded>
            {this.optionArray.map((option: BalOptionController, index: number) => (
              <button
                type="button"
                role="option"
                id={option.id}
                data-value={option.value}
                data-label={option.label}
                class={{
                  ...optionEl.class(),
                  ...optionEl.modifier('selected').class(valuesArray.includes(option.value)),
                  ...optionEl.modifier('focused').class(this.focusIndex === index),
                  ...optionEl.modifier('checkbox').class(this.multiple),
                  ...optionEl.modifier('disabled').class(option.disabled === true),
                  'popover-item': true, // Todo: what is that ?
                }}
                disabled={option.disabled}
                tabIndex={-1}
                onMouseEnter={() => this.handleOptionMouseEnter(index)}
                onClick={() => this.optionSelected(option)}
              >
                <div class={{ ...optionContentEl.class() }}>
                  <span
                    class={{ ...optionContentCheckboxEl.class() }}
                    style={{ display: this.multiple ? 'flex' : 'none' }}
                  >
                    <bal-checkbox
                      checked={valuesArray.includes(option.value)}
                      tabindex={-1}
                      hidden
                      flat
                      onBalChange={preventDefault}
                    ></bal-checkbox>
                  </span>
                  <span class={{ ...optionContentLabelEl.class() }} innerHTML={option.innerHTML}></span>
                </div>
              </button>
            ))}
            <div
              class={{
                ...popoverContentEmptyEl.class(),
                ...popoverContentEmptyEl
                  .modifier('hidden')
                  .class(
                    this.noDataLabel === undefined || this.hasOptions() || !this.typeahead || this.selectionOptional,
                  ),
              }}
            >
              {this.noDataLabel}
            </div>
          </bal-popover-content>
        </bal-popover>
      </Host>
    )
  }
}

let selectIds = 0
