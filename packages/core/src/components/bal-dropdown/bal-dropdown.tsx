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
  Method,
} from '@stencil/core'
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
import {
  BalOption,
  DropdownEventsUtil,
  DropdownFormReset,
  DropdownFormResetUtil,
  DropdownIconUtil,
  DropdownOptionUtil,
  DropdownPopupUtil,
  DropdownValueUtil,
  i18nBalDropdown,
} from '../../utils/dropdown'
import {
  BalConfigObserver,
  BalConfigState,
  BalLanguage,
  BalRegion,
  ListenToConfig,
  defaultConfig,
} from '../../utils/config'
import { BalAriaForm, BalAriaFormLinking, defaultBalAriaForm } from '../../utils/form'
import { DropdownFocus, DropdownFocusUtil } from '../../utils/dropdown/focus'

@Component({
  tag: 'bal-dropdown',
  styleUrl: 'bal-dropdown.sass',
})
export class Dropdown
  implements ComponentInterface, Loggable, BalConfigObserver, BalAriaFormLinking, DropdownFormReset, DropdownFocus
{
  private inheritedAttributes: Attributes = {}
  private inputId = `bal-dropdown-${balDropdownIds++}`

  @Element() el!: HTMLElement
  panelEl: HTMLDivElement | undefined
  listEl: HTMLBalOptionListElement | undefined
  nativeEl: HTMLSelectElement | HTMLInputElement | undefined

  initialValue?: string | string[] = []
  nativeOptions: string[] = []

  @State() rawOptions: BalOption[] = []
  @State() rawValue: string[] = []
  @State() hasFocus = false
  @State() isExpanded = false
  @State() isAutoFilled = false
  @State() inputLabel = ''
  @State() inputContent?: FunctionalComponent | string
  @State() ariaForm: BalAriaForm = defaultBalAriaForm
  @State() language: BalLanguage = defaultConfig.language
  @State() region: BalRegion = defaultConfig.region
  @State() labelToFocus = ''

  valueUtil = new DropdownValueUtil()
  eventsUtil = new DropdownEventsUtil()
  popupUtil = new DropdownPopupUtil()
  optionUtil = new DropdownOptionUtil()
  formResetUtil = new DropdownFormResetUtil()
  iconUtil = new DropdownIconUtil()
  focusUtil = new DropdownFocusUtil()

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
   * LIFECYCLE
   * ------------------------------------------------------
   */

  connectedCallback(): void {
    this.valueUtil.connectedCallback(this)
    this.eventsUtil.connectedCallback(this)
    this.popupUtil.connectedCallback(this)
    this.optionUtil.connectedCallback(this)
    this.iconUtil.connectedCallback(this)
    this.formResetUtil.connectedCallback(this)
    this.focusUtil.connectedCallback(this)
  }

  async componentWillRender() {
    this.inheritedAttributes = inheritAttributes(this.el, ['tabindex'])
    await this.optionUtil.componentWillRender()
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

  /**
   * @internal define config for the component
   */
  @Method()
  @ListenToConfig()
  async configChanged(state: BalConfigState): Promise<void> {
    this.language = state.language
    this.region = state.region
  }

  @Listen('balOptionChange')
  async listenToOptionChange(ev: BalEvents.BalOptionChange) {
    this.optionUtil.listenToOptionChange(ev)
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
   * PUBLIC METHODS
   * ------------------------------------------------------
   */

  /**
   * @internal
   */
  @Method()
  async setAriaForm(ariaForm: BalAriaForm): Promise<void> {
    this.ariaForm = { ...ariaForm }
  }

  toggleList() {
    this.popupUtil.toggleList()
  }

  updateRawValueBySelection(newRawValue: string[] = []) {
    this.valueUtil.updateRawValueBySelection(newRawValue)
  }

  /**
   * EVENT BINDING
   * ------------------------------------------------------
   */
  handleAutoFill = (ev: Event) => {
    stopEventBubbling(ev)
    if (!this.multiple) {
      const newValue = [this.nativeEl.value]
      if (!areArraysEqual(newValue, this.rawValue)) {
        this.updateRawValueBySelection(newValue)
        this.isAutoFilled = true
      }
    }
  }

  private handleKeyDown = (ev: KeyboardEvent) => {
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

    return (
      <Host class={{ ...block.class() }} tabindex="-1" id={`${this.inputId}`}>
        <div
          class={{
            ...block.element('root').class(),
            ...block.element('root').modifier('focused').class(this.hasFocus),
            ...block.element('root').modifier('invalid').class(this.invalid),
            ...block.element('root').modifier('disabled').class(this.valueUtil.isDisabled()),
            ...block.element('root').modifier('autofill').class(this.isAutoFilled),
          }}
          data-test="bal-dropdown-trigger"
          onClick={ev => this.eventsUtil.handleClick(ev)}
        >
          <span
            class={{
              ...block.element('root').element('content').class(),
              ...block.element('root').element('content').modifier('disabled').class(this.valueUtil.isDisabled()),
              ...block.element('root').element('content').modifier('placeholder').class(!this.valueUtil.isFilled()),
            }}
          >
            {this.inputContent}
          </span>
          {this.renderNativeInput(block)}
          {this.iconUtil.render(this.language)}
        </div>
        {this.renderOptionList(block)}
      </Host>
    )
  }

  renderNativeInput(block) {
    return (
      <input
        id={this.ariaForm.controlId || `${this.inputId}-ctrl`}
        class={{
          ...block.element('root').element('input').class(),
        }}
        size={1}
        inputmode="none"
        type="text"
        tabindex="0"
        name={this.name}
        value={this.rawValue.join(',')}
        autoComplete={this.autocomplete}
        required={this.required}
        disabled={this.disabled}
        readonly={this.readonly}
        placeholder={this.placeholder}
        title={this.isExpanded ? i18nBalDropdown[this.language].close : i18nBalDropdown[this.language].open}
        aria-label={this.isExpanded ? i18nBalDropdown[this.language].close : i18nBalDropdown[this.language].open}
        aria-owns={`${this.inputId}-menu`}
        aria-invalid={ariaBooleanToString(this.invalid)}
        aria-disabled={ariaBooleanToString(this.valueUtil.isDisabled())}
        aria-labelledby={this.ariaForm.labelId}
        aria-describedby={this.ariaForm.messageId}
        aria-haspopup={'listbox'}
        data-native
        data-label={this.inputLabel}
        data-value={this.rawValue.join(',')}
        ref={nativeEl => (this.nativeEl = nativeEl)}
        onChange={ev => this.handleAutoFill(ev)}
        onFocus={ev => this.eventsUtil.handleFocus(ev)}
        onBlur={ev => this.eventsUtil.handleBlur(ev)}
        onKeyDown={ev => this.handleKeyDown(ev)}
        {...this.inheritedAttributes}
      />
    )
  }

  renderOptionList(block) {
    return (
      <div
        id={`${this.inputId}-menu`}
        class={{
          ...block.element('list').class(),
          ...block.element('list').modifier('expanded').class(this.isExpanded),
        }}
        ref={panelEl => (this.panelEl = panelEl)}
      >
        <bal-option-list
          multiple={this.multiple}
          disabled={this.valueUtil.isDisabled()}
          filter={this.filter}
          required={this.required}
          contentHeight={this.contentHeight}
          ref={listEl => (this.listEl = listEl)}
        >
          <slot />
          {this.optionUtil.hasPropOptions()
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
    )
  }
}

let balDropdownIds = 0
