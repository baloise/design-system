import {
  Component,
  h,
  Host,
  State,
  Prop,
  Watch,
  EventEmitter,
  Event,
  Method,
  Element,
  Listen,
  ComponentInterface,
} from '@stencil/core'
import isNil from 'lodash.isnil'
import { debounce, deepReady, isDescendant, rIC } from '../../utils/helpers'
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
import { stopEventBubbling } from '../../utils/form-input'
import { BEM } from '../../utils/bem'
import { Loggable, Logger, LogInstance } from '../../utils/log'
import { BalAriaForm, BalAriaFormLinking, defaultBalAriaForm } from '../../utils/form'

export interface BalOptionController extends BalOptionValue {
  id: string
  textContent: string
  innerHTML: string
}

const isHuman = true
const isNotHuman = false

@Component({
  tag: 'bal-select',
  styleUrls: {
    css: 'bal-select.sass',
  },
})
export class Select implements ComponentInterface, Loggable, BalAriaFormLinking {
  private inputElement!: HTMLInputElement
  private nativeSelectEl!: HTMLSelectElement
  private popoverElement!: HTMLBalPopoverElement
  private selectionEl!: HTMLDivElement
  private didInit = false
  private inputId = `bal-select-${selectIds++}`
  private clearScrollToValue!: NodeJS.Timeout
  private clearSelectValue!: NodeJS.Timeout
  private mutationO?: MutationObserver
  private initialValue?: string | string[] = []

  log!: LogInstance

  @Logger('bal-select')
  createLogger(log: LogInstance) {
    this.log = log
  }

  @Element() private el!: HTMLElement

  @State() hasFocus = false
  @State() inputValue = ''
  @State() focusIndex = -1
  @State() isPopoverOpen = false
  @State() options: Map<string, BalOptionController> = new Map<string, BalOptionController>()
  @State() labelToScrollTo = ''
  @State() labelToSelectTo = ''
  @State() ariaForm: BalAriaForm = defaultBalAriaForm

  /**
   * PUBLIC PROPERTY API
   * ------------------------------------------------------
   */

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
  @Prop() filter: BalProps.BalSelectFilter = 'includes'

  /**
   * The tabindex of the control.
   */
  @Prop() balTabindex = 0

  /**
   * If `true` there will be on trigger icon visible
   */
  @Prop() freeSolo = false

  /**
   * If `true` multiple option can be selected
   */
  @Prop() multiple = false

  /**
   * Defines the max length of the value.
   */
  @Prop() maxLength?: number

  /**
   * This label is shown if typeahead is active and all the options are filtered out.
   */
  @Prop() noDataLabel?: string

  /**
   * Indicates whether the value of the control can be automatically completed by the browser.
   */
  @Prop() autocomplete: BalProps.BalInputAutocomplete = 'off'

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
   * @internal
   * Set this to `true` when the component is placed on a dark background.
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
    this.syncRawValue(false)
  }

  updateRawValue(newValue: string[], isHuman = true) {
    if (!areArraysEqual(newValue, this.rawValue || [])) {
      this.rawValue = [...newValue]
      this.syncNativeInput()
      if (this.didInit && isHuman === true) {
        if (this.multiple) {
          if (isNil(this.rawValue)) {
            this.emitChangeEvent([])
          } else {
            this.emitChangeEvent([...(this.rawValue as string[])])
          }
        } else {
          if (isNil(this.rawValue) || length(this.rawValue) === 0) {
            this.emitChangeEvent(undefined)
          } else {
            this.emitChangeEvent(this.rawValue[0])
          }
        }
      }
    }
  }

  private emitChangeEvent(detail: BalEvents.BalSelectChangeDetail) {
    this.balChange.emit(detail)
  }

  /**
   * Emitted when a option got selected.
   */
  @Event() balChange!: EventEmitter<BalEvents.BalSelectChangeDetail>

  /**
   * Emitted when the input got clicked.
   */
  @Event() balInputClick!: EventEmitter<BalEvents.BalSelectInputClickDetail>

  /**
   * Emitted when a keyboard input occurred.
   */
  @Event() balInput!: EventEmitter<BalEvents.BalSelectInputDetail>

  /**
   * Emitted when the input loses focus.
   */
  @Event() balBlur!: EventEmitter<BalEvents.BalSelectBlurDetail>

  /**
   * Emitted when the input has focus.
   */
  @Event() balFocus!: EventEmitter<BalEvents.BalSelectFocusDetail>

  /**
   * Emitted when the user cancels the input.
   */
  @Event() balCancel!: EventEmitter<BalEvents.BalSelectCancelDetail>

  /**
   * Emitted when the input has focus and key from the keyboard go hit.
   */
  @Event() balKeyPress!: EventEmitter<BalEvents.BalSelectKeyPressDetail>

  /**
   * LIFECYCLE
   * ------------------------------------------------------
   */

  connectedCallback() {
    const debounceUpdateOptions = debounce(() => this.updateOptions(), 0)

    this.initialValue = this.value

    debounceUpdateOptions()

    this.mutationO = watchForOptions<HTMLBalSelectOptionElement>(this.el, 'bal-select-option', () => {
      debounceUpdateOptions()
    })
  }

  componentWillLoad() {
    this.waitForOptionsAndThenUpdateRawValues()
    this.isInsideOfFooter()

    if (!isNil(this.rawValue) && this.options.size > 0 && length(this.rawValue) === 1) {
      const firstOption = this.options.get(this.rawValue[0])
      if (!isNil(firstOption)) {
        this.inputValue = firstOption.label
      }
    }
  }

  componentDidLoad() {
    this.syncRawValue(false)

    if (!this.multiple) {
      this.inputElement.value = this.inputValue
    }
    this.didInit = true
  }

  disconnectedCallback() {
    if (this.mutationO) {
      this.mutationO.disconnect()
      this.mutationO = undefined
    }
  }

  /**
   * LISTENERS
   * ------------------------------------------------------
   */

  @Listen('click', { capture: true, target: 'document' })
  listenOnClick(ev: UIEvent) {
    if (this.disabled && ev.target && ev.target === this.el) {
      preventDefault(ev)
    }
  }

  private resetHandlerTimer?: NodeJS.Timer

  @Listen('reset', { capture: true, target: 'document' })
  resetHandler(ev: UIEvent) {
    const formElement = ev.target as HTMLElement
    if (formElement?.contains(this.el)) {
      if (this.resetHandlerTimer) {
        clearTimeout(this.resetHandlerTimer)
      }

      this.resetHandlerTimer = setTimeout(() => {
        this.value = this.initialValue
        this.syncRawValue(false)
        this.syncNativeInput()

        if (this.nativeSelectEl) {
          const options = Array.from(this.nativeSelectEl.options)
          options.forEach(o => (o.selected = true))
        }
      }, 0)
    }
  }

  @Listen('keydown', { target: 'window' })
  async handleKeyDown(ev: KeyboardEvent) {
    if (this.isPopoverOpen) {
      if (isArrowDownKey(ev) || isArrowUpKey(ev)) {
        preventDefault(ev)
        this.navigateWithArrowKey(ev)
        this.updateFocus()
      }
      if (isEnterKey(ev)) {
        preventDefault(ev)
        this.selectedFocusedOption()
      }
      if (isEscapeKey(ev)) {
        this.cancel()
      }
      if (isBackspaceKey(ev) && this.typeahead && this.multiple) {
        if (this.inputElement.value === '' && length(this.rawValue) > 0) {
          const valuesArray = getValues(this.rawValue)
          this.removeValue(valuesArray[length(this.rawValue) - 1])
        }
      }
      if (!this.typeahead && ev.key.length === 1) {
        this.focusOptionByLabel(ev.key)
      }
      if (isSpaceKey(ev) && !this.typeahead) {
        preventDefault(ev)
      }
    } else {
      if (this.hasFocus) {
        if (isArrowDownKey(ev) || isArrowUpKey(ev)) {
          preventDefault(ev)
          await this.open()
        }
        if (!this.typeahead && ev.key.length === 1) {
          this.selectOptionByLabel(ev.key)
        }
      }
    }
  }

  /**
   * PUBLIC METHODS
   * ------------------------------------------------------
   */

  /**
   * Sets the focus on the input element
   */
  @Method()
  async setFocus() {
    clearTimeout(this.setFocusTimer)
    this.setFocusTimer = setTimeout(() => {
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
    this.focusIndex = -1
    if (this.inputElement) {
      this.updateInputValue('')
      this.updateRawValue([], isHuman)
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

  /**
   * @internal
   */
  @Method()
  async setAriaForm(ariaForm: BalAriaForm): Promise<void> {
    this.ariaForm = { ...ariaForm }
  }

  /**
   * PRIVATE METHODS
   * ------------------------------------------------------
   */

  private waitForOptionsAndThenUpdateRawValuesTimer?: NodeJS.Timer
  private async waitForOptionsAndThenUpdateRawValues() {
    clearTimeout(this.waitForOptionsAndThenUpdateRawValuesTimer)
    await deepReady(this.el)
    const hasOptions = this.options.size > 0

    if (hasOptions) {
      if (!this.remote) {
        this.syncRawValue(isNotHuman)
      }
    } else {
      this.waitForOptionsAndThenUpdateRawValuesTimer = setTimeout(() => this.waitForOptionsAndThenUpdateRawValues(), 10)
    }
  }

  private async updateOptions() {
    const optionElements = this.getChildOpts()
    const options = new Map()
    for (let index = 0; index < optionElements.length; index++) {
      const element = optionElements[index]
      options.set(element.value, {
        value: element.value,
        label: element.label,
        disabled: element.disabled,
        id: element.for,
        textContent: element.textContent,
        innerHTML: element.innerHTML,
      })
    }
    if (!this.selectionOptional && Array.isArray(this.rawValue)) {
      for (let index = 0; index < this.rawValue.length; index++) {
        const val = this.rawValue[index]
        if (!options.has(val)) {
          const newRawValue = removeValue(this.rawValue, val)
          this.updateRawValue(newRawValue, isNotHuman)
        }
      }
    }
    this.options = new Map(options)
    if (!this.typeahead) {
      await this.syncNativeInput()
    }
    if (this.didInit && !this.remote) {
      this.validateAfterBlur()
    }
  }

  private setFocusTimer?: NodeJS.Timer

  /**
   * GETTERS
   * ------------------------------------------------------
   */

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
    return this.popoverElement.querySelector('.bal-popover__content__inner')
  }

  /********************************************************
   * FOCUS
   ********************************************************/
  private updateFocusTimer?: NodeJS.Timer
  private updateFocus() {
    if (this.focusIndex < -1) {
      this.focusIndex = -1
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
          clearTimeout(this.updateFocusTimer)
          this.updateFocusTimer = setTimeout(() => {
            this.scrollToFocusedOption(focusedElement)
          }, 0)
        }
      }
    } else {
      this.focusIndex = -1
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
      if (focusedOption) {
        this.optionSelected(focusedOption)
      }
    }
  }

  private navigateWithArrowKey(ev: KeyboardEvent) {
    if (isArrowDownKey(ev)) {
      this.focusIndex = this.focusIndex + 1
    } else {
      if (isArrowUpKey(ev)) {
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

  private syncRawValue(isHuman = true) {
    let newValue: string[] = []

    if (!isNil(this.value) && this.value !== '') {
      if (Array.isArray(this.value)) {
        newValue = [...this.value.filter(v => !isNil(v))]
      } else {
        if (this.value.split('').includes(',')) {
          newValue = [
            ...this.value
              .split(',')
              .filter(v => v)
              .map(v => v.trim()),
          ]
        } else {
          newValue = [this.value]
        }
      }
    }
    // trigger the raw value change
    this.updateRawValue(newValue, isHuman)
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
        this.updateRawValue(addValue(this.rawValue, newValue, this.multiple), isHuman)
      } else {
        this.updateRawValue(removeValue(this.rawValue, newValue), isHuman)
      }
    } else {
      this.updateRawValue(addValue(this.rawValue, newValue, this.multiple), isHuman)
      if (this.rawValue && this.rawValue.length > 0) {
        this.updateInputValue(findLabelByValue(this.options, this.rawValue[0]))
      }
    }
  }

  private removeValue = (value: string) => {
    if (!this.disabled) {
      this.updateRawValue(removeValue(this.rawValue, value), isHuman)
      if (this.multiple && this.typeahead) {
        this.setFocus()
      }

      this.fireBlur()
    }
  }

  private validateAfterBlur(isHuman = isNotHuman) {
    let newRawValue = this.rawValue
    if (this.didInit && !this.multiple) {
      if (this.typeahead && (this.selectionOptional || this.remote)) {
        const typedOption = findOptionByLabel(this.options, this.inputElement.value)
        if (typedOption) {
          newRawValue = [typedOption.value]
        } else {
          newRawValue = [this.inputElement.value]
        }
      } else {
        newRawValue = validateAfterBlur(this.rawValue, this.options, this.inputElement.value)
      }

      this.updateRawValue(newRawValue, isHuman)
    }
  }

  private syncNativeInput(): Promise<void> {
    if (!this.multiple) {
      if (length(this.rawValue) > 0) {
        const valuesArray = getValues(this.rawValue)
        let label = findLabelByValue(this.options, valuesArray[0])
        if (!this.multiple && this.typeahead && this.selectionOptional && label === '') {
          label = valuesArray.join(', ')
        }
        return this.updateInputValue(label)
      }
    }
    return Promise.resolve()
  }

  private updateInputValueTimer?: NodeJS.Timer
  private updateInputValue(value: string): Promise<void> {
    return new Promise(resolve => {
      if (this.updateInputValueTimer) {
        clearTimeout(this.updateInputValueTimer)
      }
      this.updateInputValueTimer = setTimeout(() => {
        if (!isNil(this.inputElement)) {
          this.inputElement.value = value
          this.inputValue = value
          resolve()
        }
      }, 0)
    })
  }

  /**
   * EVENT BINDING
   * ------------------------------------------------------
   */

  private fireBlur = (ev: Event = new CustomEvent('blur')) => {
    if (!this.isPopoverOpen && !this.hasFocus) {
      rIC(() => this.balBlur.emit(ev as any))
    }
  }

  private handleClick = (ev: MouseEvent) => {
    if (this.disabled || this.readonly) {
      preventDefault(ev)
    }
  }

  private handlePopoverChange = (ev: CustomEvent<boolean>) => {
    ev.stopPropagation()
    if (this.isPopoverOpen !== ev.detail) {
      this.isPopoverOpen = ev.detail
      if (this.isPopoverOpen) {
        this.updateFocus()
      } else {
        this.focusIndex = -1
        if (this.multiple && this.typeahead) {
          this.updateInputValue('')
        }
        this.fireBlur(ev)
      }
    }
  }

  private handleInputBlur = (ev: FocusEvent) => {
    preventDefault(ev)
    const target = ev.relatedTarget as null | HTMLElement
    if (
      target === null ||
      (target &&
        target.nodeName &&
        (target.nodeName === 'BAL-MODAL' || target.nodeName === 'INPUT' || target.nodeName === 'BUTTON'))
    ) {
      this.validateAfterBlur(isHuman)
    }
    this.hasFocus = false
    this.fireBlur(ev)
  }

  private handleInputFocus = (ev: FocusEvent) => {
    this.balFocus.emit(ev)
    this.hasFocus = true
  }

  private isChipClicked(ev: MouseEvent) {
    let isChipClicked = false
    if (this.multiple) {
      const chips = this.selectionEl.querySelectorAll('bal-tag')
      const target = ev.target as HTMLElement
      chips.forEach(chip => {
        const isChip = isDescendant(chip, target) || chip === target
        if (isChip) {
          isChipClicked = isChip
        }
      })
    }
    return isChipClicked
  }

  private handleInputClick = async (ev: MouseEvent, isIconClick = false) => {
    stopEventBubbling(ev)

    if (this.isChipClicked(ev)) {
      return
    }

    if (this.disabled || this.readonly) {
      preventDefault(ev)
    } else {
      this.focusIndex = -1
      this.balInputClick.emit(ev)

      if (this.typeahead) {
        if (this.isPopoverOpen && isIconClick) {
          await this.popoverElement?.dismiss()
        } else {
          await this.popoverElement?.present()
        }
      } else {
        if (this.isPopoverOpen) {
          await this.popoverElement?.dismiss()
        } else {
          await this.popoverElement?.present()
        }
      }
    }
  }

  private handleKeyPress = async (ev: KeyboardEvent) => {
    if (!this.isPopoverOpen && isSpaceKey(ev)) {
      preventDefault(ev)
      await this.open()
    }
    this.balKeyPress.emit(ev)
  }

  private handleInputChange = (ev: Event) => {
    if (!this.disabled && !this.readonly) {
      this.inputValue = (ev.target as HTMLInputElement).value
    }
  }

  private handleInput = async (ev: Event) => {
    if (!this.disabled && !this.readonly) {
      this.inputValue = (ev.target as HTMLInputElement).value

      if (!this.isPopoverOpen) {
        this.popoverElement.present()
      }

      this.focusIndex = -1
      this.updateFocus()
      preventDefault(ev)

      this.balInput.emit(this.inputValue)
    }
  }

  private handleOptionMouseEnter = (index: number) => {
    this.focusIndex = index
  }

  private isInsideOfFooter() {
    this.inverted = this.el.closest('bal-footer') !== null
  }

  /**
   * RENDER
   * ------------------------------------------------------
   */

  render() {
    const Chip = (props: { value: string }) => (
      <bal-tag
        size=""
        closable={!this.disabled}
        disabled={this.disabled}
        invalid={this.invalid}
        tabindex={-1}
        onBalCloseClick={_ => this.removeValue(props.value)}
        data-testid="bal-select-chip"
      >
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
          ...block.modifier('inverted-footer').class(this.inverted),
        }}
      >
        <select
          class={{ ...nativeEl.class() }}
          name={this.name}
          multiple={this.multiple}
          required={this.required}
          tabindex={-1}
          ref={el => (this.nativeSelectEl = el as HTMLSelectElement)}
        >
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
              ...controlEl.modifier('inverted-footer').class(this.inverted),
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
              ref={el => (this.selectionEl = el as HTMLDivElement)}
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
                  'is-danger': this.invalid,
                  'is-disabled': this.disabled || this.readonly,
                  'is-clickable': !this.isPopoverOpen && !this.disabled && !this.readonly,
                  'data-test-select-input': true,
                }}
                id={this.ariaForm.controlId || this.inputId}
                aria-labelledby={this.ariaForm.labelId}
                aria-describedby={this.ariaForm.messageId}
                aria-invalid={this.invalid === true ? 'true' : 'false'}
                aria-disabled={this.disabled ? 'true' : null}
                data-testid="bal-select-input"
                autocomplete={this.autocomplete}
                placeholder={this.inputPlaceholder}
                readonly={!this.typeahead || this.disabled || this.readonly}
                contentEditable={this.typeahead}
                disabled={this.disabled}
                maxLength={this.maxLength}
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
            {!this.freeSolo && !this.loading ? (
              <bal-icon
                class={{
                  ...controlIconEl.class(),
                  ...controlIconEl.modifier('loading').class(this.loading),
                  ...controlIconEl.modifier('clickable').class(!this.disabled && !this.readonly),
                }}
                name={!this.inverted ? 'caret-down' : 'caret-up'}
                color={
                  this.disabled || this.readonly
                    ? 'grey-light'
                    : this.inverted
                    ? 'white'
                    : this.invalid
                    ? 'danger'
                    : 'primary'
                }
                turn={this.isPopoverOpen}
                onClick={ev => this.handleInputClick(ev, true)}
                size={!this.inverted ? '' : 'x-small'}
              ></bal-icon>
            ) : (
              ''
            )}
          </div>
          <bal-popover-content class={{ ...popoverContentEl.class() }} scrollable={this.scrollable} spaceless expanded>
            {this.optionArray.map((option: BalOptionController, index: number) => (
              <button
                type="button"
                role="option"
                id={option.id}
                data-value={option.value}
                data-label={option.label}
                class={{
                  ...optionEl.class(),
                  ...optionEl
                    .modifier('selected')
                    .class(valuesArray.includes(option.value) && !(this.typeahead && !this.multiple)),
                  ...optionEl.modifier('focused').class(this.focusIndex === index),
                  ...optionEl.modifier('checkbox').class(this.multiple),
                  ...optionEl.modifier('disabled').class(option.disabled === true),
                }}
                data-testid="bal-select-option"
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
