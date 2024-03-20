import {
  Component,
  h,
  ComponentInterface,
  Host,
  Element,
  Prop,
  State,
  Watch,
  Listen,
  Event,
  EventEmitter,
  FunctionalComponent,
} from '@stencil/core'
import isNil from 'lodash.isnil'
import { autoUpdate, computePosition, flip, shift } from '@floating-ui/dom'
import {
  areArraysEqual,
  isArrowDownKey,
  isArrowUpKey,
  isEnterKey,
  isEscapeKey,
  isSpaceKey,
} from '@baloise/web-app-utils'
import { BEM } from '../../utils/bem'
import { LogInstance, Loggable, Logger } from '../../utils/log'
import { ariaBooleanToString } from '../../utils/aria'
import { stopEventBubbling } from '../../utils/form-input'
import { Attributes, inheritAttributes } from '../../utils/attributes'
import { waitAfterIdleCallback } from '../../utils/helpers'
import { BalOption } from '../../interfaces'

@Component({
  tag: 'bal-dropdown',
  styleUrl: 'bal-dropdown.sass',
})
export class Dropdown implements ComponentInterface, Loggable {
  private inheritedAttributes: Attributes = {}
  private id = `bal-dropdown-${balDropdownIds++}`
  private panelEl: HTMLDivElement | undefined
  private listEl: HTMLBalOptionListElement | undefined
  private initialValue?: string | string[] = []
  private resetHandlerTimer?: NodeJS.Timer
  private panelCleanup?: () => void

  @Element() el!: HTMLElement

  @State() rawValue: string[] = []
  @State() hasFocus = false
  @State() isExpanded = false
  @State() inputValue = ''
  @State() inputContent?: FunctionalComponent | string

  @State() labelToFocus = ''
  private labelToFocusTimeout!: NodeJS.Timeout

  log!: LogInstance

  @Logger('bal-dropdown')
  createLogger(log: LogInstance) {
    this.log = log
  }

  /**
   * PUBLIC PROPERTY API
   * ------------------------------------------------------
   */

  /**
   * The name of the control, which is submitted with the form data.
   */
  @Prop() name: string = this.id

  /**
   * Defines the placeholder of the component. Only shown when the value is empty
   */
  @Prop() placeholder = ''

  /**
   * If `true` there will be on trigger icon visible
   */
  @Prop() icon = 'caret-down'

  /**
   * The value of the selected options.
   */
  @Prop() value?: string | string[] = []
  @Watch('value')
  valueChanged(newValue: string | string[] | undefined, oldValue: string | string[] | undefined) {
    const newValueType = typeof newValue
    const oldValueType = typeof oldValue

    if (newValueType !== oldValueType) {
      this.updateRawValueByValueProp(newValue)
    }

    if (newValueType === 'string' && newValue !== oldValue) {
      this.updateRawValueByValueProp(newValue)
    }

    if (Array.isArray(newValue) && Array.isArray(oldValue) && !areArraysEqual(newValue, oldValue)) {
      this.updateRawValueByValueProp(newValue)
    }
  }

  /**
   * If `true`, the user cannot interact with the option.
   */
  @Prop() disabled = false

  /**
   * If `true` the element can not mutated, meaning the user can not edit the control.
   */
  @Prop() readonly = false

  /**
   * If `true`, the user can select multiple options.
   */
  @Prop() multiple = false

  /**
   * If `true`, the selected options are shown as chips
   */
  @Prop() chips = false

  /**
   * If `true`, a cross at the end is visible to clear the selection
   */
  @Prop() clearable = false

  /**
   * If `true`, the component will be shown as invalid
   */
  @Prop() invalid = false

  /**
   * If `true`, the user must fill in a value before submitting a form.
   */
  @Prop() required = false

  /**
   * Defines if the select is in a loading state.
   */
  @Prop() loading = false

  /**
   * Defines the filter logic of the list
   */
  @Prop() filter: BalProps.BalOptionListFilter = 'includes'

  /**
   * Defines the max height of the list element
   */
  @Prop() contentHeight?: number = 262

  /**
   * @internal
   * Set this to `true` when the component is placed on a dark background.
   */
  @Prop() inverted = false

  /**
   * Emitted when a option got selected.
   */
  @Event() balChange!: EventEmitter<BalEvents.BalDropdownChangeDetail>

  /**
   * LIFECYCLE
   * ------------------------------------------------------
   */

  connectedCallback(): void {
    this.initialValue = this.value
  }

  componentWillRender() {
    this.inheritedAttributes = inheritAttributes(this.el, ['tabindex'])
  }

  componentDidLoad(): void {
    setTimeout(() => this.valueChanged(this.value, undefined), 0)
  }

  /**
   * LISTENERS
   * ------------------------------------------------------
   */

  @Listen('balOptionChange')
  async listenToOptionChange(_ev: BalEvents.BalOptionChange) {
    const newSelectedValues = (await this.listEl?.getSelectedValues()) || []
    this.updateRawValueBySelection(newSelectedValues)
    if (!this.multiple) {
      this.collapseList()
    }
  }

  @Listen('click', { capture: true, target: 'document' })
  listenOnClick(ev: UIEvent) {
    if (ev.target) {
      if (this.disabled && ev.target === this.el) {
        stopEventBubbling(ev)
      }
    }
  }

  @Listen('click', { target: 'document' })
  async listenOnClickOutside(ev: UIEvent) {
    if (this.isExpanded) {
      if (!this.el.contains(ev.target as Node)) {
        this.isExpanded = false
        this.listEl?.resetFocus()
      }
    }
  }

  @Listen('reset', { capture: true, target: 'document' })
  resetHandler(ev: UIEvent) {
    const formElement = ev.target as HTMLElement
    if (formElement?.contains(this.el)) {
      if (this.resetHandlerTimer) {
        clearTimeout(this.resetHandlerTimer)
      }

      this.resetHandlerTimer = setTimeout(() => {
        this.value = this.initialValue
        this.valueChanged(this.initialValue, [])
      }, 0)
    }
  }

  /**
   * GETTERS
   * ------------------------------------------------------
   */

  private get isDisabled(): boolean {
    return this.disabled || this.readonly
  }

  /**
   * PRIVATE METHODS
   * ------------------------------------------------------
   */

  private updateRawValueByValueProp(newValue: string | string[] = []) {
    let newRawValue: string[] = []

    if (!isNil(newValue) && newValue !== '') {
      if (Array.isArray(newValue)) {
        newRawValue = [...newValue.filter(v => !isNil(v))]
      } else {
        if (newValue.split('').includes(',')) {
          newRawValue = [
            ...newValue
              .split(',')
              .filter(v => v)
              .map(v => v.trim()),
          ]
        } else {
          newRawValue = [newValue]
        }
      }
    }
    this.updateRawValue(newRawValue)
  }

  private updateRawValueBySelection(newRawValue: string[] = []) {
    this.updateRawValue(newRawValue)
    if (this.multiple) {
      this.balChange.emit(this.rawValue)
    } else {
      this.balChange.emit(this.rawValue[0])
    }
  }

  private async updateRawValue(newRawValue: string[] = []) {
    this.rawValue = newRawValue

    if (this.listEl) {
      await this.listEl.updateSelected(this.rawValue)
      await this.updateInputContent()
    }
  }

  private async updateInputContent() {
    const options = await this.listEl.getSelectedOptions(this.rawValue)
    this.inputValue = options.map(option => option.label).join(', ')

    if (this.rawValue.length === 0) {
      this.inputContent = undefined
    } else {
      if (this.chips) {
        const block = BEM.block('dropdown').element('root').element('content').element('chips')
        this.inputContent = (
          <div class={{ ...block.class() }}>
            {options.map(option => (
              <bal-tag size="small" closable onBalCloseClick={() => this.removeOption(option)}>
                {option.label}
              </bal-tag>
            ))}
          </div>
        )
      } else {
        this.inputContent = options.map(option => option.label).join(', ')
      }
    }
  }

  private removeOption(option: BalOption) {
    const newRawValue = this.rawValue.filter(value => value !== option.value)
    this.updateRawValue(newRawValue)
  }

  private focusOptionByLabel(key: string) {
    this.labelToFocus = (this.labelToFocus + key).trim()
    if (this.labelToFocus.length > 0) {
      clearTimeout(this.labelToFocusTimeout)
      this.labelToFocusTimeout = setTimeout(async () => {
        await this.listEl?.focusByLabel(this.labelToFocus)
        this.labelToFocus = ''
      }, 600)
    }
  }

  /**
   * EVENT BINDING
   * ------------------------------------------------------
   */

  private handleHostClick = (ev: MouseEvent) => {
    if (this.disabled) {
      stopEventBubbling(ev)
    }
  }

  private handleFocus = (_ev: FocusEvent) => {
    this.hasFocus = true
  }

  private handleBlur = (_ev: FocusEvent) => {
    this.hasFocus = false
  }

  private handleClick = (ev: MouseEvent) => {
    if (this.chips) {
      const targetEl = ev.target as HTMLElement
      const closeEl = targetEl.closest('bal-close')
      if (closeEl) {
        return
      }
    }

    if (this.clearable) {
      const targetEl = ev.target as HTMLElement
      const clearEl = targetEl.closest('.bal-dropdown__clear')
      if (clearEl) {
        this.updateRawValueBySelection([])
        return
      }
    }

    if (!this.isDisabled) {
      if (this.isExpanded) {
        this.collapseList()
      } else {
        this.expandList()
      }
    }
  }

  private updatePanelPosition = (referenceEl: HTMLElement, floatingEl: HTMLElement) => () => {
    computePosition(referenceEl, floatingEl, {
      placement: 'bottom-start',
      middleware: [flip(), shift()],
    }).then(({ x, y }) => {
      Object.assign(floatingEl.style, {
        left: `${x}px`,
        top: `${y}px`,
      })
    })
  }

  private expandList() {
    if (this.panelEl) {
      this.panelCleanup = autoUpdate(this.el, this.panelEl, this.updatePanelPosition(this.el, this.panelEl))
    }
    this.isExpanded = true
    this.listEl?.focusFirst()
  }

  private collapseList() {
    this.isExpanded = false
    this.listEl?.resetFocus()
    if (this.panelCleanup) {
      this.panelCleanup()
    }
  }

  private handleKeyDown = (ev: KeyboardEvent) => {
    if (this.isExpanded) {
      /**
       * ⬇️ Arrow up key
       */
      if (isArrowDownKey(ev)) {
        stopEventBubbling(ev)
        this.listEl?.focusNext()
        /**
         * ⬆️ Arrow up key
         */
      } else if (isArrowUpKey(ev)) {
        stopEventBubbling(ev)
        this.listEl?.focusPrevious()
        /**
         * Go to top of the list
         */
      } else if (ev.key === 'Home' || ev.key === 'PageUp') {
        stopEventBubbling(ev)
        this.listEl?.focusFirst()
        /**
         * Go to bottom of the list
         */
      } else if (ev.key === 'End' || ev.key === 'PageDown') {
        stopEventBubbling(ev)
        this.listEl?.focusLast()
        /**
         * Select focused option
         */
      } else if (isEnterKey(ev)) {
        stopEventBubbling(ev)
        this.listEl?.selectByFocus()
        /**
         * Close list
         */
      } else if (ev.key === 'Tab' || isEscapeKey(ev)) {
        this.collapseList()
        /**
         * Focus on label
         */
      } else if (ev.key.length === 1) {
        this.focusOptionByLabel(ev.key)
      }
    } else {
      /**
       * Open list
       */
      if (isEnterKey(ev) || isSpaceKey(ev)) {
        stopEventBubbling(ev)
        this.expandList()
      }
    }
  }

  /**
   * RENDER
   * ------------------------------------------------------
   */

  render() {
    const block = BEM.block('dropdown')
    const inputContent = this.inputContent ? this.inputContent : this.placeholder

    const isFilled = this.rawValue && this.rawValue.length > 0

    const icon = this.loading ? (
      <bal-spinner small variation="circle"></bal-spinner>
    ) : this.clearable && isFilled && !this.isDisabled ? (
      <button
        class={{
          ...block.element('clear').class(),
          ...block.element('clear').modifier('invalid').class(this.invalid),
        }}
      >
        <bal-icon name={'close-circle'} size="" color={'grey'}></bal-icon>
      </button>
    ) : (
      <bal-icon
        name={this.icon}
        turn={this.isExpanded}
        color={this.isDisabled ? 'grey' : this.invalid ? 'danger' : 'primary'}
      ></bal-icon>
    )

    return (
      <Host
        class={{
          ...block.class(),
        }}
        id={this.id}
        tabIndex={-1}
        onClick={this.handleHostClick}
      >
        <div
          class={{
            ...block.element('root').class(),
            ...block.element('root').modifier('focused').class(this.hasFocus),
            ...block.element('root').modifier('invalid').class(this.invalid),
            ...block.element('root').modifier('disabled').class(this.isDisabled),
          }}
          tabindex="0"
          role="button"
          aria-expanded={ariaBooleanToString(this.isExpanded)}
          aria-disabled={ariaBooleanToString(this.isDisabled)}
          aria-haspopup="listbox"
          onClick={ev => this.handleClick(ev)}
          onFocus={ev => this.handleFocus(ev)}
          onBlur={ev => this.handleBlur(ev)}
          onKeyDown={ev => this.handleKeyDown(ev)}
          {...this.inheritedAttributes}
        >
          <span
            class={{
              ...block.element('root').element('content').class(),
              ...block.element('root').element('content').modifier('disabled').class(this.isDisabled),
              ...block.element('root').element('content').modifier('placeholder').class(!this.inputContent),
            }}
          >
            {inputContent}
          </span>
          {icon}
        </div>
        <input
          class={{
            ...block.element('native').class(),
          }}
          name={this.name}
          aria-invalid={ariaBooleanToString(this.invalid)}
          aria-hidden="true"
          disabled={this.disabled}
          readonly={this.readonly}
          required={this.required}
          tabindex="-1"
          value={this.inputValue}
        />
        <div
          class={{
            ...block.element('list').class(),
            ...block.element('list').modifier('expanded').class(this.isExpanded),
          }}
          ref={panelEl => (this.panelEl = panelEl)}
        >
          <bal-option-list
            multiple={this.multiple}
            filter={this.filter}
            contentHeight={this.contentHeight}
            ref={listEl => (this.listEl = listEl)}
          >
            <slot></slot>
          </bal-option-list>
        </div>
      </Host>
    )
  }
}

let balDropdownIds = 0
