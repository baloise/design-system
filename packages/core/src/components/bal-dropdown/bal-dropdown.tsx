import {
  Component,
  ComponentInterface,
  Element,
  Event,
  EventEmitter,
  Host,
  Method,
  Prop,
  State,
  Watch,
  h,
} from '@stencil/core'
import { HTMLStencilElement } from '@stencil/core/internal'
import { Attributes, inheritAttributes } from '../../utils/attributes'
import { BEM } from '../../utils/bem'
import { balBrowser } from '../../utils/browser'
import {
  BalConfigObserver,
  BalConfigState,
  BalLanguage,
  BalRegion,
  ListenToConfig,
  defaultConfig,
} from '../../utils/config'
import {
  BalOption,
  DropdownAutoFillUtil,
  DropdownEventsUtil,
  DropdownFocus,
  DropdownFocusUtil,
  DropdownFormSubmit,
  DropdownFormSubmitUtil,
  DropdownIcon,
  DropdownInput,
  DropdownNativeSelect,
  DropdownOptionList,
  DropdownOptionUtil,
  DropdownPopupUtil,
  DropdownValue,
  DropdownValueUtil,
} from '../../utils/dropdown'
import { BalAriaForm, BalAriaFormLinking, defaultBalAriaForm } from '../../utils/form'
import { stopEventBubbling } from '../../utils/form-input'
import { addEventListener, removeEventListener, waitAfterIdleCallback } from '../../utils/helpers'
import { isArrowDownKey, isArrowUpKey, isEnterKey, isEscapeKey, isSpaceKey } from '../../utils/keyboard'
import { LogInstance, Loggable, Logger } from '../../utils/log'

@Component({
  tag: 'bal-dropdown',
  styleUrl: 'bal-dropdown.sass',
})
export class Dropdown
  implements ComponentInterface, Loggable, BalConfigObserver, BalAriaFormLinking, DropdownFormSubmit, DropdownFocus
{
  @Element() el!: HTMLStencilElement
  panelEl: HTMLDivElement | undefined
  listEl: HTMLBalOptionListElement | undefined
  nativeEl: HTMLInputElement | undefined
  selectEl: HTMLSelectElement | undefined

  inputId = `bal-dropdown-${balDropdownIds++}`
  inheritedAttributes: Attributes = {}
  initialValue?: string | string[] = []
  nativeOptions: string[] = []

  @State() rawOptions: BalOption[] = []
  @State() choices: BalOption[] = []
  @State() rawValue: string[] = []
  @State() hasFocus = false
  @State() isExpanded = false
  @State() isAutoFilled = false
  @State() isKeyboardMode = false
  @State() inputLabel = ''
  @State() ariaForm: BalAriaForm = defaultBalAriaForm
  @State() language: BalLanguage = defaultConfig.language
  @State() region: BalRegion = defaultConfig.region
  @State() httpFormSubmit: boolean = defaultConfig.httpFormSubmit
  @State() labelToFocus = ''

  valueUtil = new DropdownValueUtil()
  eventsUtil = new DropdownEventsUtil()
  popupUtil = new DropdownPopupUtil()
  optionUtil = new DropdownOptionUtil()
  formSubmitUtil = new DropdownFormSubmitUtil()
  focusUtil = new DropdownFocusUtil()
  autoFillUtil = new DropdownAutoFillUtil()

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
   * Indicates whether the value of the control can be automatically completed by the browser.
   */
  @Prop() autocomplete: BalProps.BalInputAutocomplete = 'off'

  /**
   * The name of the control, which is submitted with the form data.
   */
  @Prop() name: string = this.inputId

  /**
   * Defines the placeholder of the component. Only shown when the value is empty
   */
  @Prop() placeholder = ''

  /**
   * Defines a inline label to be shown before the value
   */
  @Prop() inlineLabel = ''

  /**
   * If `true` there will be on trigger icon visible
   */
  @Prop() icon = 'caret-down'

  /**
   * Defines the size of the control.
   */
  @Prop() size: BalProps.BalDropdownSize = ''

  /**
   * Defines the color style of the control
   */
  @Prop() theme: BalProps.BalDropdownTheme = ''

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
  @Prop() contentHeight = 262

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
    this.optionUtil.optionChanged()
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
   * Emitted when the input has focus.
   */
  @Event() balFocus!: EventEmitter<BalEvents.BalDropdownFocusDetail>

  /**
   * Emitted when the input loses focus.
   */
  @Event() balBlur!: EventEmitter<BalEvents.BalDropdownBlurDetail>

  /**
   * LIFECYCLE
   * ------------------------------------------------------
   */
  hasConnected = false
  connectedCallback(): void {
    if (!this.hasConnected) {
      this.eventsUtil.connectedCallback(this)
      this.valueUtil.connectedCallback(this)
      this.popupUtil.connectedCallback(this)
      this.optionUtil.connectedCallback(this)
      this.formSubmitUtil.connectedCallback(this)
      this.focusUtil.connectedCallback(this)
      this.autoFillUtil.connectedCallback(this)
    }

    addEventListener(this.el, 'balOptionChange', this.listenToOptionChange)

    if (balBrowser.hasDocument) {
      addEventListener(document, 'keydown', this.eventsUtil.handleKeydown)
      addEventListener(document, 'touchstart', this.eventsUtil.handlePointerDown)
      addEventListener(document, 'mousedown', this.eventsUtil.handlePointerDown)
      addEventListener(document, 'click', this.listenOnClickOutside)
      addEventListener(document, 'reset', this.resetHandler, {
        capture: true,
      })
    }

    this.hasConnected = true
  }

  disconnectedCallback(): void {
    removeEventListener(this.el, 'balOptionChange', this.listenToOptionChange)

    if (balBrowser.hasDocument) {
      removeEventListener(document, 'keydown', this.eventsUtil.handleKeydown)
      removeEventListener(document, 'touchstart', this.eventsUtil.handlePointerDown)
      removeEventListener(document, 'mousedown', this.eventsUtil.handlePointerDown)
      removeEventListener(document, 'click', this.listenOnClickOutside)
      removeEventListener(document, 'reset', this.resetHandler, {
        capture: true,
      })
    }
  }

  async componentWillRender() {
    this.inheritedAttributes = inheritAttributes(this.el, ['tabindex', 'data-hj-allow'])
    await this.optionUtil.componentWillRender()
  }

  componentDidRender() {
    this.formSubmitUtil.componentDidRender()
  }

  componentDidLoad(): void {
    this.valueUtil.componentDidLoad()
  }

  /**
   * LISTENERS
   * ------------------------------------------------------
   */

  /**
   * @internal define config for the component
   */
  @Method()
  @ListenToConfig()
  async configChanged(state: BalConfigState): Promise<void> {
    this.language = state.language
    this.region = state.region
    this.httpFormSubmit = state.httpFormSubmit
  }

  listenToOptionChange = (ev: BalEvents.BalOptionChange) => {
    this.optionUtil.listenToOptionChange(ev)
  }

  listenOnClickOutside = (ev: UIEvent) => {
    this.eventsUtil.handleOutsideClick(ev)
  }

  resetHandler = (ev: UIEvent) => {
    this.formSubmitUtil.handle(ev)
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
    if (this.nativeEl && !this.valueUtil.isDisabled()) {
      await waitAfterIdleCallback()
      this.nativeEl.focus()
    }
  }

  /**
   * Returns the value of the component
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
    this.valueUtil.updateRawValueBySelection([])
  }

  /**
   * Opens the popup with option list
   */
  @Method()
  async open(): Promise<void> {
    if (!this.valueUtil.isDisabled() && this.panelEl) {
      await this.popupUtil.expandList()
    }
  }

  /**
   * Closes the popup with option list
   */
  @Method()
  async close(): Promise<void> {
    if (!this.valueUtil.isDisabled() && this.panelEl) {
      await this.popupUtil.collapseList()
    }
  }

  /**
   * Select option by passed value
   */
  @Method()
  async select(newValue: string | string[]): Promise<void> {
    const parsedNewValue = this.valueUtil.parseValueString(newValue)
    this.valueUtil.updateRawValueBySelection(parsedNewValue)
  }

  /**
   * @internal
   */
  @Method()
  async setAriaForm(ariaForm: BalAriaForm): Promise<void> {
    this.ariaForm = { ...ariaForm }
  }

  /**
   * EVENT BINDING
   * ------------------------------------------------------
   */
  handleAutoFill = async (ev: Event) => {
    this.log('(handleAutoFill)', ev, this.nativeEl.value)
    this.autoFillUtil.handleAutoFill(ev)
  }

  handleKeyDown = (ev: KeyboardEvent) => {
    if (ev && ev.key) {
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
          this.focusUtil.focusOptionByLabel(ev.key)
        }
      } else {
        /**
         * Open list
         */
        if (isEnterKey(ev) || isSpaceKey(ev)) {
          stopEventBubbling(ev)
          this.popupUtil.expandList()
          /**
           * Focus on label
           */
        } else if (ev.key.length === 1) {
          this.focusUtil.focusOptionByLabel(ev.key, { select: true })
        }
      }
    } else {
      // Close the popup on autofill
      if (this.isExpanded) {
        this.popupUtil.collapseList()
      }
    }
  }

  /**
   * RENDER
   * ------------------------------------------------------
   */

  render() {
    const block = BEM.block('dropdown')

    const isFilled = this.valueUtil.isFilled()

    const hasSize = this.size !== ''
    const size = `size-${this.size}`

    const hasTheme = this.theme !== ''
    const theme = `theme-${this.theme}`

    const focused = this.theme === 'purple' ? this.hasFocus && this.isKeyboardMode : this.hasFocus

    return (
      <Host class={{ ...block.class() }} tabindex="-1" id={`${this.inputId}`}>
        <div
          class={{
            ...block.element('root').class(),
            ...block.element('root').modifier('focused').class(focused),
            ...block.element('root').modifier('invalid').class(this.invalid),
            ...block.element('root').modifier('disabled').class(this.valueUtil.isDisabled()),
            ...block.element('root').modifier('autofill').class(this.isAutoFilled),
            ...block.element('root').modifier(size).class(hasSize),
            ...block.element('root').modifier(theme).class(hasTheme),
            ...block
              .element('root')
              .modifier(theme + '-filled')
              .class(isFilled && hasTheme),
            ...block
              .element('root')
              .modifier(theme + '-expanded')
              .class(this.isExpanded && hasTheme),
          }}
          data-test="bal-dropdown-trigger"
          onClick={ev => this.eventsUtil.handleClick(ev)}
        >
          <span
            class={{
              ...block.element('root').element('content').class(),
              ...block.element('root').element('content').modifier('disabled').class(this.valueUtil.isDisabled()),
              ...block.element('root').element('content').modifier('placeholder').class(!this.valueUtil.isFilled()),
              ...block.element('root').element('content').modifier(size).class(hasSize),
            }}
          >
            <DropdownValue
              filled={this.valueUtil.isFilled()}
              inlineLabel={this.inlineLabel}
              chips={this.chips}
              placeholder={this.placeholder}
              choices={this.choices}
              invalid={this.invalid}
              disabled={this.disabled}
              readonly={this.readonly}
              onRemoveChip={option => this.valueUtil.removeOption(option)}
            ></DropdownValue>
          </span>
          <DropdownInput
            inputId={this.inputId}
            httpFormSubmit={this.httpFormSubmit}
            ariaForm={this.ariaForm}
            rawValue={this.rawValue}
            autocomplete={this.autocomplete}
            required={this.required}
            disabled={this.disabled}
            readonly={this.readonly}
            placeholder={this.placeholder}
            expanded={this.isExpanded}
            invalid={this.invalid}
            language={this.language}
            inputLabel={this.inputLabel}
            inheritedAttributes={this.inheritedAttributes}
            refInputEl={el => (this.nativeEl = el)}
            onChange={ev => this.handleAutoFill(ev)}
            onFocus={ev => this.eventsUtil.handleFocus(ev)}
            onBlur={ev => this.eventsUtil.handleBlur(ev)}
            onKeyDown={ev => this.handleKeyDown(ev)}
          ></DropdownInput>
          <DropdownNativeSelect
            name={this.name}
            httpFormSubmit={this.httpFormSubmit}
            multiple={this.multiple}
            required={this.required}
            disabled={this.valueUtil.isDisabled()}
            rawValue={this.rawValue}
            refSelectEl={el => (this.selectEl = el)}
          ></DropdownNativeSelect>
          <DropdownIcon
            icon={this.icon}
            size={this.size}
            theme={this.theme}
            language={this.language}
            loading={this.loading}
            clearable={this.clearable}
            invalid={this.invalid}
            expanded={this.isExpanded}
            filled={isFilled}
            disabled={this.valueUtil.isDisabled()}
          ></DropdownIcon>
        </div>
        <DropdownOptionList
          inputId={this.inputId}
          block={this.inputId}
          filter={this.filter}
          required={this.required}
          isExpanded={this.isExpanded}
          isDisabled={this.valueUtil.isDisabled()}
          hasPropOptions={this.optionUtil.hasPropOptions()}
          multiple={this.multiple}
          contentHeight={this.contentHeight}
          rawOptions={this.rawOptions}
          refPanelEl={el => (this.panelEl = el)}
          refListEl={el => (this.listEl = el)}
        >
          <slot></slot>
        </DropdownOptionList>
      </Host>
    )
  }
}

let balDropdownIds = 0
