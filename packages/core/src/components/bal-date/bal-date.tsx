import { isEscapeKey } from '@baloise/web-app-utils'
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
import { ariaBooleanToString } from '../../utils/aria'
import { inheritAttributes } from '../../utils/attributes'
import { BEM } from '../../utils/bem'
import { balBrowser } from '../../utils/browser'
import { BalConfigState, BalLanguage, ListenToConfig, defaultConfig } from '../../utils/config'
import { BalDate } from '../../utils/date'
import { balFloatingUi } from '../../utils/floating-ui'
import { FOCUS_KEYS } from '../../utils/focus-visible'
import { BalAriaForm, BalAriaFormLinking, defaultBalAriaForm } from '../../utils/form'
import { stopEventBubbling } from '../../utils/form-input'
import { addEventListener, debounceEvent, rIC, removeEventListener, waitAfterIdleCallback } from '../../utils/helpers'
import { isSpaceKey } from '../../utils/keyboard'
import { LogInstance, Loggable, Logger } from '../../utils/log'
import { i18nBalDate } from './bal-date.i18n'

@Component({
  tag: 'bal-date',
  styleUrl: 'bal-date.scss',
})
export class Date implements ComponentInterface, Loggable, BalAriaFormLinking {
  private inputId = `bal-da-${dateIds++}`
  private inheritedAttributes: { [k: string]: any } = {}
  private popupCleanup?: () => void
  private referenceEl: HTMLStencilElement | undefined
  private floatingEl: HTMLDivElement | undefined
  private inputEl: HTMLBalInputDateElement | undefined

  @Element() el!: HTMLStencilElement

  @State() private isKeyboardMode = false
  @State() private hasFocus = false
  @State() private isExpanded = false
  @State() private language: BalLanguage = defaultConfig.language
  @State() private calendarValue: string | undefined
  @State() ariaForm: BalAriaForm = defaultBalAriaForm

  log!: LogInstance

  @Logger('bal-date')
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
  @Prop() name: string = this.inputId

  /**
   * If `true` the component gets a invalid style.
   */
  @Prop() invalid = false

  /**
   * If `true` the attribute required is added to the native input.
   */
  @Prop() required = false

  /**
   * If `true`, the element is not mutable, focusable, or even submitted with the form. The user can neither edit nor focus on the control, nor its form control descendants.
   */
  @Prop() disabled = false

  /**
   * If `true` the element can not mutated, meaning the user can not edit the control.
   */
  @Prop() readonly = false

  /**
   * If `true` there will be no trigger icon visible, so no UX indicator for a picker
   */
  @Prop() freeSolo = false

  /**
   * The text to display when the select is empty.
   */
  @Prop() placeholder?: string

  /**
   * If `true` the datepicker only open on click of the icon
   */
  @Prop() triggerIcon = false

  /**
   * Closes the datepicker popover after selection
   */
  @Prop() closeOnSelect = true

  /**
   * Indicates whether the value of the control can be automatically completed by the browser.
   */
  @Prop() autocomplete: BalProps.BalInputAutocomplete = 'off'

  /**
   * The value of the form field, which accepts ISO 8601 date strings (YYYY-MM-DD).
   */
  @Prop({ mutable: true }) value: string | undefined = undefined

  @Watch('value')
  protected valueChanged() {
    this.calendarValue = this.value
  }

  /**
   * The minimum datetime allowed. Value must be a date string
   * following the
   * [ISO 8601 datetime format standard](https://www.w3.org/TR/NOTE-datetime),
   * such as `1996-12-19`. The format does not have to be specific to an exact
   * datetime. For example, the minimum could just be the year, such as `1994`.
   * Defaults to the beginning of the year, 100 years ago from today.
   */
  @Prop({ mutable: true }) min?: string

  /**
   * The maximum datetime allowed. Value must be a date string
   * following the
   * [ISO 8601 datetime format standard](https://www.w3.org/TR/NOTE-datetime),
   * `1996-12-19`. The format does not have to be specific to an exact
   * datetime. For example, the maximum could just be the year, such as `1994`.
   * Defaults to the end of this year.
   */
  @Prop({ mutable: true }) max?: string

  /**
   * Earliest year available for selection
   */
  @Prop({ attribute: 'min-year' }) minYearProp?: number

  /**
   * Latest year available for selection
   */
  @Prop({ attribute: 'max-year' }) maxYearProp?: number

  /**
   * The date to defines where the datepicker popup starts. The prop accepts ISO 8601 date strings (YYYY-MM-DD).
   */
  @Prop() defaultDate?: string

  /**
   * Callback to determine which date in the datepicker should be selectable.
   */
  @Prop() allowedDates: BalProps.BalDateCallback | undefined = undefined

  /**
   * If `true`, it returns the string `INVALID_VALUE` within the balChange event if the input provided is not valid.
   */
  @Prop() allowInvalidValue = false

  /**
   * Set the amount of time, in milliseconds, to wait to trigger the `ionChange` event after each keystroke. This also impacts form bindings such as `ngModel` or `v-model`.
   */
  @Prop() debounce = 0

  @Watch('debounce')
  protected debounceChanged() {
    this.balChange = debounceEvent(this.balChange, this.debounce)
  }

  /**
   * If `true`, in Angular reactive forms the control will not be set invalid
   */
  @Prop({ reflect: true }) autoInvalidOff = false

  /**
   * Emitted when a keyboard input occurred.
   */
  @Event() balInput!: EventEmitter<BalEvents.BalDateInputDetail>

  /**
   * Emitted when a option got selected.
   */
  @Event() balChange!: EventEmitter<BalEvents.BalDateChangeDetail>

  /**
   * Emitted before the animation starts
   */
  @Event() balWillAnimate!: EventEmitter<BalEvents.BalDateWillAnimateDetail>

  /**
   * Emitted after the animation has finished
   */
  @Event() balDidAnimate!: EventEmitter<BalEvents.BalDateDidAnimateDetail>

  /**
   * Emitted when the input loses focus.
   */
  @Event() balBlur!: EventEmitter<BalEvents.BalDateBlurDetail>

  /**
   * Emitted when the input has focus.
   */
  @Event() balFocus!: EventEmitter<BalEvents.BalDateFocusDetail>

  /**
   * Emitted when the input has clicked.
   */
  @Event() balInputClick!: EventEmitter<BalEvents.BalDateInputClickDetail>

  /**
   * Emitted when the icon has clicked.
   */
  @Event() balIconClick!: EventEmitter<BalEvents.BalDateIconClickDetail>

  /**
   * LIFECYCLE
   * ------------------------------------------------------
   */

  hasConnected = false
  connectedCallback(): void {
    if (balBrowser.hasDocument) {
      addEventListener(document, 'keydown', this.handleKeydown)
      addEventListener(document, 'touchstart', this.handlePointerDown)
      addEventListener(document, 'mousedown', this.handlePointerDown)
      addEventListener(document, 'click', this.handleOutsideClick)
    }

    this.hasConnected = true
    this.valueChanged()
  }

  disconnectedCallback(): void {
    if (balBrowser.hasDocument) {
      removeEventListener(document, 'keydown', this.handleKeydown)
      removeEventListener(document, 'touchstart', this.handlePointerDown)
      removeEventListener(document, 'mousedown', this.handlePointerDown)
      removeEventListener(document, 'click', this.handleOutsideClick)
    }
  }

  componentWillLoad() {
    this.inheritedAttributes = inheritAttributes(this.el, ['aria-label', 'tabindex', 'title', 'data-hj-allow'])
  }

  /**
   * @internal define config for the component
   */
  @Method()
  @ListenToConfig()
  async configChanged(state: BalConfigState): Promise<void> {
    this.language = state.language
  }

  /**
   * PUBLIC METHOD
   * ------------------------------------------------------
   */

  /**
   * Opens the accordion
   */
  @Method()
  async open(): Promise<boolean> {
    return this.expand()
  }

  /**
   * Closes the accordion
   */
  @Method()
  async close(): Promise<boolean> {
    return this.collapse()
  }

  /**
   * Triggers the accordion
   */
  @Method()
  async toggle(): Promise<boolean> {
    if (this.isExpanded) {
      return this.collapse()
    } else {
      return this.expand()
    }
  }

  /**
   * Selects an option
   */
  @Method()
  async select(dateString: string) {
    const date = BalDate.fromISO(dateString)
    if (date.isValid) {
      this.value = date.toISODate()
      this.calendarValue = this.value
    }
  }

  /**
   * Sets focus on the native `input` in `bal-input`. Use this method instead of the global
   * `input.focus()`.
   */
  @Method()
  async setFocus() {
    if (this.inputEl && !this.disabled && !this.readonly) {
      await waitAfterIdleCallback()
      this.inputEl.focus()
    }
  }

  /**
   * Sets blur on the native `input` in `bal-input`. Use this method instead of the global
   * `input.blur()`.
   * @internal
   */
  @Method()
  async setBlur() {
    if (this.inputEl && !this.disabled && !this.readonly) {
      await waitAfterIdleCallback()
      this.inputEl?.setBlur()
    }
  }

  /**
   * Returns the native `<input>` element used under the hood.
   */
  @Method()
  async getInputElement(): Promise<HTMLInputElement | undefined> {
    return this.inputEl?.getInputElement()
  }

  /**
   * @internal
   */
  @Method()
  async setAriaForm(ariaForm: BalAriaForm): Promise<void> {
    this.ariaForm = { ...ariaForm }
    this.inputEl?.setAriaForm(ariaForm)
  }

  /**
   * PRIVATE METHOD
   * ------------------------------------------------------
   */

  private handleKeydown = (ev: any) => {
    this.isKeyboardMode = FOCUS_KEYS.includes(ev.key)
  }

  private handlePointerDown = () => {
    this.isKeyboardMode = false
  }

  private handleOutsideClick = (ev: UIEvent) => {
    if (this.isExpanded) {
      if (!this.el.contains(ev.target as Node)) {
        this.isExpanded = false
        this.hasFocus = false
        rIC(() => this.balBlur.emit(ev as any))
      }
    }
  }

  private handleFocus = (ev: CustomEvent<FocusEvent>) => {
    stopEventBubbling(ev)
    this.hasFocus = true
    this.balFocus.emit(ev.detail)
  }

  private handleBlur = (ev: CustomEvent<FocusEvent>) => {
    stopEventBubbling(ev)
    if (!this.isExpanded) {
      this.hasFocus = false
      rIC(() => this.balBlur.emit(ev.detail))
    }
  }

  private async expand(): Promise<boolean> {
    if (this.referenceEl && this.floatingEl) {
      const lib = await balFloatingUi.load()
      this.balWillAnimate.emit()
      this.isExpanded = true
      this.popupCleanup = lib.autoUpdate(this.referenceEl, this.floatingEl, () => {
        this.updatePosition(this.referenceEl, this.floatingEl as HTMLElement)
      })
    }

    return this.isExpanded
  }

  private async collapse(): Promise<boolean> {
    if (this.floatingEl) {
      this.balWillAnimate.emit()
      this.isExpanded = false
      if (this.popupCleanup) {
        this.popupCleanup()
      }
      this.balDidAnimate.emit()
    }
    return this.isExpanded
  }

  private async updatePosition(
    referenceEl: HTMLElement | HTMLStencilElement,
    floatingEl: HTMLElement | HTMLStencilElement,
  ) {
    const lib = await balFloatingUi.load()
    lib
      .computePosition(referenceEl, floatingEl as HTMLElement, {
        placement: 'bottom-start',
        middleware: [lib.offset(4), lib.flip({ crossAxis: false })],
      })
      .then(({ x, y }) => {
        Object.assign(floatingEl.style, {
          left: `${x}px`,
          top: `${y}px`,
        })
        this.balDidAnimate.emit()
      })
  }

  /**
   * EVENT BINDING
   * ------------------------------------------------------
   */

  private onIconClick = async (_ev: MouseEvent) => {
    if (this.triggerIcon) {
      await this.toggle()
    } else {
      await this.open()
    }
  }

  private onInputClick = async (_ev: MouseEvent) => {
    if (!this.triggerIcon) {
      await this.open()
    }
  }

  private onCalendarChange = (ev: BalEvents.BalDateCalendarChange) => {
    stopEventBubbling(ev)
    this.value = ev.detail
    this.balChange.emit(this.value)
    if (this.closeOnSelect) {
      this.close()

      this.hasFocus = false
      rIC(() => this.balBlur.emit())
    }
  }

  private onInputInput = (ev: BalEvents.BalInputDateInput) => {
    stopEventBubbling(ev)
    this.balInput.emit(ev.detail)
    if (ev.detail) {
      const date = BalDate.fromAnyFormat(ev.detail)
      if (date.isValid) {
        this.calendarValue = date.toISODate()
      }
    }
  }

  private onInputChange = (ev: BalEvents.BalInputDateChange) => {
    stopEventBubbling(ev)
    this.value = ev.detail
    this.balChange.emit(this.value)
  }

  private onKeyPress = async ({ detail }: CustomEvent<KeyboardEvent>) => {
    if (detail && detail.key) {
      if (this.isExpanded) {
        if (detail.key === 'Tab' || isEscapeKey(detail) || isSpaceKey(detail)) {
          await this.close()
        }
      } else {
        if (isSpaceKey(detail)) {
          await this.open()
        }
      }
    }
  }

  /**
   * RENDER
   * ------------------------------------------------------
   */

  render() {
    const block = BEM.block('date')
    const blockIcon = block.element('icon')
    const blockPopup = block.element('popup')

    return (
      <Host
        id={this.inputId}
        class={{
          ...block.class(),
        }}
      >
        <bal-input-group
          invalid={this.invalid}
          readonly={this.readonly}
          disabled={this.disabled}
          ref={el => (this.referenceEl = el)}
        >
          <bal-input-date
            name={this.name}
            required={this.required}
            placeholder={this.placeholder}
            value={this.value}
            min={this.min}
            max={this.max}
            invalid={this.invalid}
            readonly={this.readonly}
            disabled={this.disabled}
            allowInvalidValue={this.allowInvalidValue}
            autocomplete={this.autocomplete}
            onClick={this.onInputClick}
            onBalInput={this.onInputInput}
            onBalChange={this.onInputChange}
            onBalFocus={ev => this.handleFocus(ev)}
            onBalBlur={ev => this.handleBlur(ev)}
            onBalKeyPress={this.onKeyPress}
            ref={el => (this.inputEl = el)}
            {...this.inheritedAttributes}
          ></bal-input-date>
          {!this.freeSolo ? (
            <bal-icon
              name="date"
              role="button"
              tabindex={-1}
              class={{
                ...blockIcon.class(),
                ...blockIcon.modifier('clickable').class(!this.disabled && !this.readonly),
              }}
              is-right
              color={this.disabled || this.readonly ? 'grey' : this.invalid ? 'danger' : 'primary'}
              onClick={this.onIconClick}
              aria-label={i18nBalDate[this.language].toggleDatepicker}
              aria-haspopup="true"
              aria-expanded={ariaBooleanToString(this.isExpanded)}
            />
          ) : (
            ''
          )}
        </bal-input-group>
        <div
          role="dialog"
          class={{
            ...blockPopup.class(),
            ...blockPopup.modifier('visible').class(this.isExpanded),
          }}
          ref={el => (this.floatingEl = el)}
          aria-hidden={`${this.isExpanded !== true}`}
          aria-presented={`${this.isExpanded === true}`}
        >
          <bal-date-calendar
            value={this.calendarValue}
            min={this.min}
            max={this.max}
            minYearProp={this.minYearProp}
            maxYearProp={this.maxYearProp}
            defaultDate={this.defaultDate}
            allowedDates={this.allowedDates}
            onBalChange={this.onCalendarChange}
          ></bal-date-calendar>
        </div>
      </Host>
    )
  }
}

let dateIds = 0
