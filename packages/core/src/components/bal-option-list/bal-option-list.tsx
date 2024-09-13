import { Component, h, ComponentInterface, Host, Element, Prop, Watch, Method, Listen, State } from '@stencil/core'
import isNil from 'lodash.isnil'
import { Attributes, inheritAttributes } from '../../utils/attributes'
import { BEM } from '../../utils/bem'
import { raf, waitAfterFramePaint } from '../../utils/helpers'
import { Loggable, Logger, LogInstance } from '../../utils/log'
import { includes, startsWith } from '../bal-select/utils/utils'
import { BalAriaForm, defaultBalAriaForm } from '../../utils/form'
import { BalOption } from '../../utils/dropdown'

@Component({
  tag: 'bal-option-list',
  styleUrl: 'bal-option-list.sass',
  shadow: false,
})
export class OptionList implements ComponentInterface, Loggable {
  private inputId = `bal-option-list-${balOptionListIds++}`
  private inheritAttributes: Attributes = {}
  private focusRaf: number | undefined

  @Element() el!: HTMLElement

  log!: LogInstance

  @State() ariaForm: BalAriaForm = defaultBalAriaForm

  @Logger('bal-option-list')
  createLogger(log: LogInstance) {
    this.log = log
  }

  /**
   * PUBLIC PROPERTY API
   * ------------------------------------------------------
   */

  /**
   * If `true` the list supports multiple selections
   */
  @Prop() multiple = false

  /**
   * If `true`, the user cannot interact with the option.
   */
  @Prop() disabled = false

  /**
   * If `true`, the user must fill in a value before submitting a form.
   */
  @Prop() required = false

  /**
   * Defines the focused option with his index value
   */
  @Prop({ mutable: true }) focusIndex = -1

  /**
   * Id of the label element to describe this option list
   */
  @Prop() labelledby?: string

  /**
   * Defines the filter logic of the list
   */
  @Prop() filter: BalProps.BalOptionListFilter = 'includes'

  /**
   * Defines the max height of the list element
   */
  @Prop() contentHeight?: number = 262
  @Watch('contentHeight') contentHeightChanged(value?: number) {
    if (value === undefined) {
      this.el.style.removeProperty('--bal-option-list-max-height')
    } else {
      this.el.style.setProperty('--bal-option-list-max-height', `${value}px`)
    }
  }

  /**
   * LIFECYCLE
   * ------------------------------------------------------
   */

  componentDidLoad(): void {
    this.contentHeightChanged(this.contentHeight)
  }

  componentWillRender() {
    this.inheritAttributes = inheritAttributes(this.el, ['aria-multiselectable', 'aria-labelledby'])
  }

  /**
   * LISTENERS
   * ------------------------------------------------------
   */

  @Listen('balOptionFocus', { passive: true })
  listenToMouseEnter(ev: BalEvents.BalOptionFocus) {
    const options = this.options
    const indexToFocus = this.getOptionIndex(options, ev.detail.value)
    if (indexToFocus !== undefined) {
      this.updateFocus(options, indexToFocus)
    }
  }

  @Listen('balOptionChange', { passive: false })
  listenToOptionChange({ detail }: BalEvents.BalOptionFocus) {
    if (!this.multiple) {
      this.options.filter(option => option.value !== detail.value).forEach(option => (option.selected = false))
    }
  }

  /**
   * PUBLIC METHODS
   * ------------------------------------------------------
   */

  /**
   * Focus the selected visible option in the list, if no option is selected it selects the first one
   */
  @Method() async focusSelected(): Promise<number> {
    const options = this.options
    const indexToFocus = this.getSelectedOptionIndex(options)

    if (indexToFocus > 0) {
      this.updateFocus(options, indexToFocus)
      await waitAfterFramePaint()
      return indexToFocus
    } else {
      return await this.focusFirst()
    }
  }

  /**
   * Focus the first visible option in the list
   * @returns focusIndex
   */
  @Method() async focusFirst(): Promise<number> {
    const options = this.options
    const indexToFocus = this.getFirstOptionIndex(options)
    this.updateFocus(options, indexToFocus)

    const option = options[indexToFocus]
    this.updateScrollTopPosition(option)

    await waitAfterFramePaint()
    return indexToFocus
  }

  /**
   * Focus the last visible option in the list
   * @returns focusIndex
   */
  @Method() async focusLast(): Promise<number> {
    const options = this.options
    const indexToFocus = this.getLastOptionIndex(options)
    this.updateFocus(options, indexToFocus)

    const option = options[indexToFocus]
    this.updateScrollBottomPosition(option)

    await waitAfterFramePaint()
    return indexToFocus
  }

  /**
   * Focus the next visible option in the list
   * @returns focusIndex
   */
  @Method() async focusNext(): Promise<number> {
    const options = this.options
    const indexToFocus = this.getNextOptionIndex(options)
    this.updateFocus(options, indexToFocus)

    const option = options[indexToFocus]
    this.updateScrollBottomPosition(option)

    await waitAfterFramePaint()
    return indexToFocus
  }

  /**
   * Focus the previous visible option in the list
   * @returns focusIndex
   */
  @Method() async focusPrevious(): Promise<number> {
    const options = this.options
    const indexToFocus = this.getPreviousOptionIndex(options)
    this.updateFocus(options, indexToFocus)

    const option = options[indexToFocus]
    this.updateScrollTopPosition(option)

    await waitAfterFramePaint()
    return indexToFocus
  }

  /**
   * Focus the option with the label that starts with the search property
   * @returns focusIndex
   */
  @Method() async focusByLabel(search: string, config: Partial<{ select: boolean }>): Promise<number> {
    const options = this.options
    const indexToFocus = this.getOptionIndexByLabel(options, search)
    this.updateFocus(options, indexToFocus)

    const option = options[indexToFocus]
    this.updateScrollTopPosition(option)

    await waitAfterFramePaint()

    if (config.select) {
      await option.select()
    }

    return indexToFocus
  }

  /**
   * Filter the options by the given filter property and hides options
   * @returns focusIndex
   */
  @Method() async filterByContent(search: string): Promise<number> {
    const options = this.allOptions
    this.filterOptions(options, search)
    await waitAfterFramePaint()
    return this.focusFirst()
  }

  /**
   * Shows or hides all options
   */
  @Method() async resetHidden(hidden = false): Promise<void> {
    this.options.forEach(option => (option.hidden = hidden))
    await waitAfterFramePaint()
    this.resetFocus()
  }

  /**
   * Selects or deselects all options
   */
  @Method() async resetSelected(selected = false): Promise<void> {
    this.options.forEach(option => (option.selected = selected))
    await waitAfterFramePaint()
  }

  /**
   * Updates options
   */
  @Method() async updateSelected(values?: string[]): Promise<void> {
    this.options.forEach(option => (option.selected = values.includes(option.value)))
    await waitAfterFramePaint()
  }

  /**
   * Resets the focus index to pristine and scrolls to the top of the list
   */
  @Method() async resetFocus(): Promise<number> {
    const options = this.options
    const indexToFocus = -1
    this.updateFocus(options, indexToFocus)
    this.scrollTo(0)

    await waitAfterFramePaint()
    return indexToFocus
  }

  /**
   * Returns a list of option values
   */
  @Method() async getSelectedValues(): Promise<string[]> {
    const options = this.options
    return options.filter(option => option.selected).map(option => option.value)
  }

  /**
   * Returns a list of option labels
   */
  @Method() async getSelectedOptions(values?: string[]): Promise<BalOption[]> {
    const options = this.options
    if (values && values.length > 0) {
      return options.filter(option => values.includes(option.value)).map(option => option)
    }
    return options.filter(option => option.selected).map(option => option)
  }

  /**
   * Returns a list of options
   */
  @Method() async getValues(): Promise<string[]> {
    return this.options.map(option => option.value)
  }

  /**
   * Returns a list of options
   */
  @Method() async getLabels(): Promise<string[]> {
    return this.options.map(option => option.label)
  }

  /**
   * Returns a list of accessible options
   */
  @Method() async getOptions(): Promise<BalOption[]> {
    return this.options.filter(o => !o.disabled || !o.hidden)
  }

  /**
   * Selects the option with the current focus
   */
  @Method() async selectByFocus(): Promise<void> {
    const options = this.options
    const option = options[this.focusIndex]
    if (option) {
      if (this.multiple) {
        option.select(!option.selected)
      } else {
        option.select(true)
      }
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
   * GETTERS
   * ------------------------------------------------------
   */

  private get options(): HTMLBalOptionElement[] {
    return Array.from(this.el.querySelectorAll('bal-option')).filter(o => !o.hidden)
  }

  private get allOptions(): HTMLBalOptionElement[] {
    return Array.from(this.el.querySelectorAll('bal-option'))
  }

  /**
   * PRIVATE METHODS
   * ------------------------------------------------------
   */

  private filterOptions(options: HTMLBalOptionElement[], search: string): HTMLBalOptionElement[] {
    const filteredOptions: HTMLBalOptionElement[] = []

    const filter = this.filter === 'includes' ? includes : startsWith

    for (let index = 0; index < options.length; index++) {
      const option = options[index]
      const content = option.textContent || ''

      if (filter(content, search)) {
        filteredOptions.push(option)
        option.hidden = false
      } else {
        option.hidden = true
      }
    }

    return filteredOptions
  }

  private isOptionVisible(option: HTMLBalOptionElement): boolean {
    const visibleHeight = this.el.clientHeight
    const topPosition = this.el.scrollTop
    const bottomPosition = topPosition + visibleHeight
    const isVisible = topPosition <= option.offsetTop && option.offsetTop + option.clientHeight <= bottomPosition
    return isVisible
  }

  private updateScrollTopPosition(option: HTMLBalOptionElement) {
    if (option) {
      const isVisible = this.isOptionVisible(option)
      if (!isVisible) {
        this.scrollTo(this.getScrollTopForTopPosition(option))
      }
    }
  }

  private updateScrollBottomPosition(option: HTMLBalOptionElement) {
    if (option) {
      const isVisible = this.isOptionVisible(option)
      if (!isVisible) {
        this.scrollTo(this.getScrollTopForBottomPosition(option))
      }
    }
  }

  private getScrollTopForTopPosition(option: HTMLBalOptionElement): number {
    const topPosition = option.offsetTop
    const scrollTop = topPosition

    if (scrollTop < 0) {
      return 0
    }

    return scrollTop
  }

  private getScrollTopForBottomPosition(option: HTMLBalOptionElement): number {
    const visibleHeight = this.el.clientHeight
    const bottomPosition = option.offsetTop + option.clientHeight
    const scrollTop = bottomPosition - visibleHeight

    if (scrollTop < 0) {
      return 0
    }

    return scrollTop
  }

  private async scrollTo(scrollTop: number) {
    if (scrollTop !== undefined && scrollTop !== null) {
      if (this.focusRaf !== undefined) {
        cancelAnimationFrame(this.focusRaf)
      }

      this.focusRaf = raf(async () => {
        this.el.scrollTop = scrollTop
      })
    }
  }

  private updateFocus(options: HTMLBalOptionElement[], indexToFocus: number) {
    this.focusIndex = indexToFocus
    for (let index = 0; index < options.length; index++) {
      const option = options[index]
      option.focused = index === indexToFocus
    }
  }

  private getOptionIndex(options: HTMLBalOptionElement[], value: string): number | undefined {
    for (let index = 0; index < options.length; index++) {
      const option = options[index]
      if (option.value === value) {
        return index
      }
    }

    return undefined
  }

  private getSelectedOptionIndex(options: HTMLBalOptionElement[]): number {
    for (let index = 0; index < options.length; index++) {
      const option = options[index]
      if (option.selected && !option.hidden) {
        return index
      }
    }
    return this.focusIndex
  }

  private getFirstOptionIndex(options: HTMLBalOptionElement[]): number {
    for (let index = 0; index < options.length; index++) {
      const option = options[index]
      if (!option.disabled && !option.hidden) {
        return index
      }
    }
    return this.focusIndex
  }

  private getNextOptionIndex(options: HTMLBalOptionElement[], index = this.focusIndex): number {
    if (index < 0) {
      return this.getFirstOptionIndex(options)
    }

    const lastIndex = this.getLength(options)
    let newIndex = index
    if (index < lastIndex) {
      newIndex = index + 1
      if (options[newIndex].disabled) {
        return this.getNextOptionIndex(options, newIndex)
      }
    }

    return newIndex
  }

  private getPreviousOptionIndex(options: HTMLBalOptionElement[], index = this.focusIndex): number {
    const firstIndex = this.getFirstOptionIndex(options)
    if (index <= firstIndex) {
      return firstIndex
    }

    let newIndex = index
    newIndex = index - 1
    if (options[newIndex].disabled) {
      return this.getPreviousOptionIndex(options, newIndex)
    }

    return newIndex
  }

  private getLastOptionIndex(options: HTMLBalOptionElement[]): number {
    for (let index = options.length - 1; index >= 0; index--) {
      const option = options[index]
      if (!option.disabled) {
        return index
      }
    }
    return this.focusIndex
  }

  private getOptionIndexByLabel(options: HTMLBalOptionElement[], label: string): number {
    if (label === undefined || label === '') {
      return this.focusIndex
    }

    const option = options.find(o => startsWith(o.label || '', label))
    if (!isNil(option) && option.id) {
      return options.indexOf(option)
    }

    return this.focusIndex
  }

  private getLength(options: HTMLBalOptionElement[]): number {
    const indexes: number[] = options.map((option, index) => (option.disabled ? 0 : index))
    const length = Math.max(...indexes)
    return length
  }

  /**
   * RENDER
   * ------------------------------------------------------
   */

  render() {
    const block = BEM.block('option-list')
    const labelledby = this.labelledby || this.ariaForm.labelId

    return (
      <Host
        class={{
          ...block.class(),
        }}
        id={this.inputId}
      >
        <div
          role="listbox"
          aria-labelledby={labelledby}
          aria-disabled={this.disabled}
          class={{
            ...block.element('container').class(),
          }}
          {...this.inheritAttributes}
        >
          <slot />
        </div>
      </Host>
    )
  }
}

let balOptionListIds = 0
