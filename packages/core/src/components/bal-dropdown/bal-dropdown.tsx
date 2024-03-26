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
import { isArrowDownKey, isArrowUpKey, isEnterKey, isEscapeKey, isSpaceKey } from '@baloise/web-app-utils'
import { BEM } from '../../utils/bem'
import { LogInstance, Loggable, Logger } from '../../utils/log'
import { ariaBooleanToString } from '../../utils/aria'
import { stopEventBubbling } from '../../utils/form-input'
import { Attributes, inheritAttributes } from '../../utils/attributes'
import {
  BalOption,
  DropdownEventsUtil,
  DropdownFormReset,
  DropdownFormResetUtil,
  DropdownIconUtil,
  DropdownPopupUtil,
  DropdownValueUtil,
  mapOption,
} from '../../utils/dropdown'
import { waitAfterFramePaint } from '../../utils/helpers'

@Component({
  tag: 'bal-dropdown',
  styleUrl: 'bal-dropdown.sass',
})
export class Dropdown implements ComponentInterface, Loggable, DropdownFormReset {
  private inheritedAttributes: Attributes = {}
  private id = `bal-dropdown-${balDropdownIds++}`

  @Element() el!: HTMLElement
  panelEl: HTMLDivElement | undefined
  listEl: HTMLBalOptionListElement | undefined
  nativeEl: HTMLSelectElement | undefined

  @State() rawOptions: BalOption[] = []
  @State() rawValue: string[] = []
  @State() hasFocus = false
  @State() isExpanded = false
  @State() inputValue = ''
  @State() inputContent?: FunctionalComponent | string

  @State() labelToFocus = ''
  private labelToFocusTimeout!: NodeJS.Timeout

  log!: LogInstance
  initialValue?: string | string[] = []
  panelCleanup?: () => void

  valueUtil = new DropdownValueUtil()
  formResetUtil = new DropdownFormResetUtil()
  iconUtil = new DropdownIconUtil()
  popupUtil = new DropdownPopupUtil()
  eventsUtil = new DropdownEventsUtil()

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
   * Steps can be passed as a property or through HTML markup.
   */
  @Prop() options: BalOption[] = []

  @Watch('options')
  protected async optionChanged() {
    this.rawOptions = this.options.map(mapOption)
    await waitAfterFramePaint()
    await this.valueUtil.updateInputContent()
  }

  /**
   * The value of the selected options.
   */
  @Prop() value?: string | string[] = []
  @Watch('value')
  valueChanged(newValue: string | string[] | undefined, oldValue: string | string[] | undefined) {
    this.valueUtil.valueChanged(newValue, oldValue)
  }

  /**
   * Emitted when a option got selected.
   */
  @Event() balChange!: EventEmitter<BalEvents.BalDropdownChangeDetail>

  /**
   * LIFECYCLE
   * ------------------------------------------------------
   */

  connectedCallback(): void {
    this.valueUtil.connectedCallback(this)
    this.eventsUtil.connectedCallback(this)
    this.popupUtil.connectedCallback(this)
    this.iconUtil.connectedCallback(this)
    this.formResetUtil.connectedCallback(this)

    this.optionChanged()
  }

  componentWillRender() {
    this.inheritedAttributes = inheritAttributes(this.el, ['tabindex'])
  }

  componentDidRender() {
    this.formResetUtil.componentDidRender()
  }

  componentDidLoad(): void {
    this.valueUtil.componentDidLoad()
  }

  /**
   * LISTENERS
   * ------------------------------------------------------
   */

  @Listen('balOptionChange')
  async listenToOptionChange(_ev: BalEvents.BalOptionChange) {
    const newSelectedValues = (await this.listEl?.getSelectedValues()) || []
    this.valueUtil.updateRawValueBySelection(newSelectedValues)
    if (!this.multiple) {
      this.popupUtil.collapseList()
    }
  }

  @Listen('click', { target: 'document' })
  listenOnClickOutside(ev: UIEvent) {
    this.eventsUtil.handleOutsideClick(ev)
  }

  @Listen('reset', { capture: true, target: 'document' })
  resetHandler(ev: UIEvent) {
    this.formResetUtil.handle(ev)
  }

  /**
   * GETTERS
   * ------------------------------------------------------
   */

  get isDisabled(): boolean {
    return this.disabled || this.readonly
  }

  get isFilled(): boolean {
    return this.rawValue && this.rawValue.length > 0
  }

  get hasPropOptions(): boolean {
    return this.options && this.options.length > 0
  }

  get values(): string[] {
    if (this.hasPropOptions) {
      return this.options
        .filter(o => !o.disabled && !o.hidden)
        .sort()
        .map(o => o.value)
    }
    return this.listEl.console.log(
      'values',
      this.options
        .filter(o => !o.disabled && !o.hidden)
        .sort()
        .map(o => o.value),
    )
  }

  get labels(): string[] {
    console.log(
      'labels',
      this.options
        .filter(o => !o.disabled && !o.hidden)
        .sort()
        .map(o => o.value),
    )
    return this.options
      .filter(o => !o.disabled && !o.hidden)
      .sort()
      .map(o => o.label)
  }

  /**
   * PUBLIC METHODS
   * ------------------------------------------------------
   */

  toggleList() {
    this.popupUtil.toggleList()
  }

  updateRawValueBySelection(newRawValue: string[] = []) {
    this.valueUtil.updateRawValueBySelection(newRawValue)
  }

  /**
   * PRIVATE METHODS
   * ------------------------------------------------------
   */

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
        this.popupUtil.collapseList()
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
        this.popupUtil.expandList()
      }
    }
  }

  /**
   * RENDER
   * ------------------------------------------------------
   */

  render() {
    const block = BEM.block('dropdown')

    return (
      <Host
        class={{
          ...block.class(),
        }}
        id={this.id}
        tabIndex={-1}
        data-value={this.values.join(',')}
        data-label={this.labels.join(',')}
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
          onClick={ev => this.eventsUtil.handleClick(ev)}
          onFocus={ev => this.eventsUtil.handleFocus(ev)}
          onBlur={ev => this.eventsUtil.handleBlur(ev)}
          onKeyDown={ev => this.handleKeyDown(ev)}
          {...this.inheritedAttributes}
        >
          <span
            class={{
              ...block.element('root').element('content').class(),
              ...block.element('root').element('content').modifier('disabled').class(this.isDisabled),
              ...block.element('root').element('content').modifier('placeholder').class(!this.isFilled),
            }}
          >
            {this.inputContent}
          </span>
          {this.iconUtil.render()}
        </div>
        {this.formResetUtil.render()}
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
            {this.hasPropOptions
              ? this.rawOptions.map(option => (
                  <bal-option
                    key={option.value}
                    value={option.value}
                    label={option.label}
                    disabled={option.disabled}
                    multiline={option.multiline}
                    invalid={option.invalid}
                    checkbox={option.checkbox}
                    hidden={option.hidden}
                    selected={option.selected}
                    focused={option.focused}
                  >
                    {option.label}
                  </bal-option>
                ))
              : ''}
          </bal-option-list>
        </div>
      </Host>
    )
  }
}

let balDropdownIds = 0
