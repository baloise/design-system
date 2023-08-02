import {
  Component,
  h,
  ComponentInterface,
  Host,
  Prop,
  Method,
  State,
  Listen,
  Element,
  Event,
  EventEmitter,
  Watch,
} from '@stencil/core'
import { BEM } from '../../../utils/bem'
import { LogInstance, Loggable, Logger } from '../../../utils/log'
import { autoUpdate, computePosition, flip, shift, offset } from '@floating-ui/dom'
import { BalDate } from '../../../utils/date'
import { inheritAttributes } from '../../../utils/attributes'
import { stopEventBubbling } from '../../../utils/form-input'
import { isSpaceKey } from '@baloise/web-app-utils'

@Component({
  tag: 'bal-date',
  styleUrl: 'bal-date.sass',
  shadow: true,
})
export class Date implements ComponentInterface, Loggable {
  private inputId = `bal-da-${dateIds++}`
  private inheritedAttributes: { [k: string]: any } = {}
  private popupCleanup?: () => void
  private referenceEl: HTMLElement | undefined
  private floatingEl: HTMLDivElement | undefined

  @Element() el!: HTMLElement

  @State() private isExpanded = false

  @State() private calendarValue: string | undefined

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
   * If `true` there will be on trigger icon visible
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
  @Prop({ attribute: 'allowed-dates' }) allowedDates: BalProps.BalDateCallback | undefined = undefined

  /**
   * Listen when the popover opens or closes. Returns the current value.
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
   * @internal - Use this to close unused popovers.
   */
  @Event() balPopoverPrepare!: EventEmitter<string>

  /**
   * LIFECYCLE
   * ------------------------------------------------------
   */

  connectedCallback(): void {
    this.valueChanged()
  }

  componentWillLoad() {
    this.inheritedAttributes = inheritAttributes(this.el, ['aria-label', 'tabindex', 'title'])
  }

  /**
   * LISTENERS
   * ------------------------------------------------------
   */

  @Listen('keydown', { target: 'window' })
  async listenToKeydown(ev: KeyboardEvent) {
    if (this.isExpanded && (ev.key === 'Escape' || ev.key === 'Esc')) {
      ev.preventDefault()
      await this.dismiss()
    }
  }

  @Listen('keyup', { target: 'window' })
  async listenOnKeyup(ev: KeyboardEvent) {
    // dismiss popup when focus next form control
    if (ev.key === 'Tab' && !this.el.contains(document.activeElement) && this.isExpanded) {
      await this.dismiss()
    }
  }

  @Listen('click', { target: 'document' })
  async listenOnclick(ev: UIEvent) {
    // when clicked outside dismiss popup
    if (this.isExpanded && !this.el.contains(ev.target as Node)) {
      await this.dismiss()
    }
  }

  @Listen('balPopoverPrepare', { target: 'body' })
  async listenOnPopoverPrepare(ev: CustomEvent<string>) {
    // dismiss this popover, because another will open
    if (this.inputId !== ev.detail) {
      await this.dismiss()
    }
  }

  /**
   * PUBLIC METHOD
   * ------------------------------------------------------
   */

  /**
   * Opens the accordion
   */
  @Method()
  async present(): Promise<boolean> {
    return this.expand()
  }

  /**
   * Closes the accordion
   */
  @Method()
  async dismiss(): Promise<boolean> {
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
   * PRIVATE METHOD
   * ------------------------------------------------------
   */

  private async expand(): Promise<boolean> {
    if (this.referenceEl && this.floatingEl) {
      this.balPopoverPrepare.emit(this.inputId)
      this.balWillAnimate.emit()
      this.isExpanded = true
      this.popupCleanup = autoUpdate(this.referenceEl, this.floatingEl, () => {
        this.updatePosition(this.referenceEl as HTMLElement, this.floatingEl as HTMLElement)
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

  private updatePosition(referenceEl: HTMLElement, floatingEl: HTMLElement) {
    computePosition(referenceEl, floatingEl, {
      placement: 'bottom-start',
      middleware: [flip(), shift({ padding: 8 }), offset(4)],
    }).then(({ x, y }) => {
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
      await this.present()
    }
  }

  private onInputClick = async (_ev: MouseEvent) => {
    if (!this.triggerIcon) {
      await this.present()
    }
  }

  private onCalendarChange = ({ detail }: BalEvents.BalDateCalendarChange) => {
    this.value = detail
    this.balChange.emit(this.value)
    if (this.closeOnSelect) {
      this.dismiss()
    }
  }

  private onInputInput = ({ detail }: BalEvents.BalInputDateInput) => {
    if (detail) {
      const date = BalDate.fromAnyFormat(detail)
      if (date.isValid) {
        this.calendarValue = date.toISODate()
      }
    }
  }

  private onInputChange = ({ detail }: BalEvents.BalInputDateChange) => {
    this.value = detail
    this.balChange.emit(this.value)
  }

  private onInputFocus = (ev: CustomEvent<FocusEvent>) => {
    stopEventBubbling(ev)
    this.balFocus.emit(ev.detail)
  }

  private onInputBlur = (ev: CustomEvent<FocusEvent>) => {
    stopEventBubbling(ev)
    this.balFocus.emit(ev.detail)
  }

  // onKeyPress: ((event: BalInputDateCustomEvent<KeyboardEvent>) => void) | undefined

  private onKeyPress = async ({ detail }: CustomEvent<KeyboardEvent>) => {
    if (isSpaceKey(detail) && !this.triggerIcon) {
      if (this.isExpanded) {
        await this.dismiss()
      } else {
        await this.present()
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
            required={this.required}
            placeholder={this.placeholder}
            value={this.value}
            invalid={this.invalid}
            readonly={this.readonly}
            disabled={this.disabled}
            onClick={this.onInputClick}
            onBalInput={this.onInputInput}
            onBalChange={this.onInputChange}
            onBalFocus={this.onInputFocus}
            onBalBlur={this.onInputBlur}
            onBalKeyPress={this.onKeyPress}
            {...this.inheritedAttributes}
          ></bal-input-date>
          {!this.freeSolo ? (
            <bal-icon
              name="date"
              class={{
                ...blockIcon.class(),
                ...blockIcon.modifier('clickable').class(!this.disabled && !this.readonly),
              }}
              is-right
              color={this.disabled || this.readonly ? 'grey' : this.invalid ? 'danger' : 'primary'}
              onClick={this.onIconClick}
              aria-haspopup="true"
              aria-expanded={this.isExpanded ? 'true' : 'false'}
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
