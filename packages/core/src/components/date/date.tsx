import { Component, Element, Event, EventEmitter, Fragment, h, Listen, Method, Prop, State, Watch } from '@stencil/core'
import { defaultConfig, DsComponentInterface, DsConfigState, DsLanguage, DsRegion, ListenToConfig } from '@global'
import {
  debounceEvent,
  FocusHandler,
  FormControl,
  FormControlInterface,
  inheritAttributes,
  isEscapeKey,
  Logger,
  type LogInstance,
  OneOf,
  Type,
  raf,
  watchInvalidTextSlot,
} from '@utils'
import { AttachInternals, HTMLStencilElement } from '@stencil/core/internal'
import { Field, FieldInterface } from '../input/field.util'
import { INPUT_AUTOCOMPLETES, InputAutocomplete } from '../input/input.interfaces'
import {
  DATE_COLORS,
  DateBlurDetail,
  DateChangeDetail,
  DateClickDetail,
  DateColor,
  DateFocusDetail,
  DateInputDetail,
  DateKeyPressDetail,
} from './date.interfaces'
import { createDateMask, DateMask, getDisplayFormat, isoToDisplay } from './date.mask'
import { checkIsWithinRange, DatePickerController } from './date.picker'
import { i18nDsTriggerButton } from '../input/trigger-button.i18n'
import { ClearButton } from '../input/clear-button.util'

/**
 * Date renders a masked date input field with an interactive calendar popup for date selection.
 *
 * @slot invalid-text - Overrides the `invalidText` prop with custom markup, shown instead of the description when `invalid` is `true`.
 * @part input - The native HTML input element.
 * @part clear - The clear button that removes the selected date.
 * @part trigger - The calendar icon button that opens the date picker popup.
 */
@Component({
  tag: 'ds-date',
  styleUrl: 'date.host.scss',
  shadow: true,
  formAssociated: true,
})
export class DsDate implements DsComponentInterface, FieldInterface, FormControlInterface<string | null> {
  private inheritedAttributes: { [k: string]: any } = {}
  private control = new FormControl(this)
  private focusHandler = new FocusHandler()
  private popupHostEl: HTMLDivElement | undefined
  private triggerEl: HTMLButtonElement | undefined
  private dateMask: DateMask | undefined
  private datePicker: DatePickerController | undefined

  private updatingFromMask = false
  dateId = `ds-date-${DateIds++}`

  log!: LogInstance
  @Logger('date')
  createLogger(log: LogInstance) {
    this.log = log
  }

  @Element() el!: HTMLStencilElement

  @State() focused = false
  @State() language: DsLanguage = defaultConfig.language
  @State() region: DsRegion = defaultConfig.region
  @State() isOpen = false
  @State() hasInvalidTextSlotContent = false

  // The native input's display text (e.g. `"01.01.200_"` mid-edit). Deliberately its own state rather
  // than derived inline in `render()` from `value` (`isoToDisplay(this.value, ...)`): IMask owns the
  // native input's DOM value during typing, and re-deriving from `value` on every render would let *any*
  // unrelated re-render (or an echoed no-op `value` change from a consumer round-tripping `dsInput` back
  // into `[value]`) stomp whatever the user is mid-typing. Kept in sync explicitly wherever the mask's
  // displayed text can change — see `initMask()`'s `onAccept`, `handleClearClick`, the picker's
  // `onSelect`, `listenToReset`, and the real-external-change branch of `valueChanged()`.
  @State() displayValue = ''

  private disconnectInvalidTextSlotWatcher?: () => void

  @Watch('isOpen')
  protected isOpenChanged(open: boolean) {
    if (open) {
      this.focusHandler.enable({ target: this.popupHostEl, restoreElement: this.triggerEl ?? null })
      this.datePicker?.open()
    } else {
      this.datePicker?.close()
      this.focusHandler.disable()
      this.focusHandler.restoreFocus(this.triggerEl)
    }
  }

  @AttachInternals() internals!: ElementInternals

  /**
   * PUBLIC PROPERTY API
   * ─────────────────────────────────────────────────────
   */

  /**
   * The value of the date input in ISO format (YYYY-MM-DD).
   */
  @Prop({ mutable: true, reflect: true })
  @Type('string')
  value: string | null = null

  @Watch('value')
  protected valueChanged() {
    // Skip when the incoming value already matches what the mask currently represents. This guards
    // against consumers that echo `dsInput` (emitted on every keystroke, `null`/`''` while the date is
    // incomplete) straight back into `[value]`: without this check, that round-trip would resync the
    // mask — and, via `displayValue`, the rendered input — to the same (often empty) value and wipe out
    // what the user is still typing. Both sides are normalized through `|| null` since consumers may
    // echo an incomplete/absent date as `''` rather than `null` (e.g. `event.detail ?? ''`).
    const currentISO = this.dateMask?.getISO() ?? null
    if (!this.updatingFromMask && (this.value || null) !== currentISO) {
      this.dateMask?.syncFromISO(this.value)
      this.datePicker?.syncFromValue(this.value)
      this.displayValue = isoToDisplay(this.value, getDisplayFormat(this.region))
    }
  }

  /**
   * The name of the control, which is submitted with the form data.
   */
  @Prop({ reflect: true })
  @Type('string')
  readonly name: string = this.dateId

  /**
   * The label of the date input, which is displayed above the field.
   */
  @Prop()
  @Type('string')
  readonly label: string = ''

  /**
   * The description of the date input, which is displayed below the field.
   */
  @Prop()
  @Type('string')
  readonly description: string = ''

  /**
   * Defines the color of the date input. The default value is `primary`.
   */
  @Prop()
  @OneOf(DATE_COLORS)
  readonly color: DateColor = 'primary'

  /**
   * If `true` the component gets an invalid style.
   */
  @Prop()
  @Type('boolean')
  readonly invalid: boolean = false

  /**
   * The text to display when the input is in an invalid state.
   */
  @Prop()
  @Type('string')
  readonly invalidText: string = ''

  /**
   * If `true`, the user must fill in a value before submitting a form.
   */
  @Prop()
  @Type('boolean')
  readonly required: boolean = true

  /**
   * If `true`, the element is not mutable, focusable, or even submitted with the form.
   */
  @Prop()
  @Type('boolean')
  readonly disabled: boolean = false

  /**
   * If `true` the element can not be mutated, meaning the user can not edit the control.
   */
  @Prop()
  @Type('boolean')
  readonly readonly: boolean = false

  /**
   * Instructional text that shows before the input has a value.
   */
  @Prop()
  @Type('string')
  readonly placeholder: string = ''

  /**
   * This Boolean attribute lets you specify that the control should have input focus when the page loads.
   */
  @Prop()
  @Type('boolean')
  readonly autofocus: boolean = false

  /**
   * Indicates whether the value of the control can be automatically completed by the browser.
   */
  @Prop()
  @OneOf(INPUT_AUTOCOMPLETES)
  readonly autocomplete: InputAutocomplete = 'off'

  /**
   * Set the amount of time, in milliseconds, to wait to trigger the `dsChange` event after each keystroke.
   */
  @Prop()
  @Type('number')
  readonly debounce: number = 0

  @Watch('debounce')
  protected debounceChanged() {
    this.dsChange = debounceEvent(this.dsChange, this.debounce)
  }

  /**
   * If `true`, in Angular reactive forms the control will not be set invalid.
   */
  @Prop({ reflect: true })
  @Type('boolean')
  readonly autoInvalidOff: boolean = false

  /**
   * If `true`, the date picker is presented inline and no input field is shown.
   */
  @Prop()
  @Type('boolean')
  readonly inline: boolean = false

  /**
   * Shows a loading indicator at the end of the input and replaces the trigger button.
   */
  @Prop()
  @Type('boolean')
  readonly loading: boolean = false

  /**
   * The minimum ISO date string allowed (YYYY-MM-DD). Dates before this are disabled in the calendar and rejected from typed input.
   */
  @Prop()
  @Type('string')
  readonly min: string | undefined = undefined

  /**
   * The maximum ISO date string allowed (YYYY-MM-DD). Dates after this are disabled in the calendar and rejected from typed input.
   */
  @Prop()
  @Type('string')
  readonly max: string | undefined = undefined

  /**
   * Earliest year available for selection. Takes precedence over `min` when both are set.
   */
  @Prop({ attribute: 'min-year' })
  @Type('number')
  readonly minYearProp: number | undefined = undefined

  /**
   * Latest year available for selection. Takes precedence over `max` when both are set.
   */
  @Prop({ attribute: 'max-year' })
  @Type('number')
  readonly maxYearProp: number | undefined = undefined

  /**
   * The ISO date string (YYYY-MM-DD) where the calendar opens when no value is set.
   * The date is not selected — only the view navigates to it.
   */
  @Prop()
  @Type('string')
  readonly defaultDate: string | undefined = undefined

  /**
   * If `true`, the calendar trigger icon and popup are hidden. The component behaves as a plain masked text input with no date picker UX.
   */
  @Prop()
  @Type('boolean')
  readonly freeSolo: boolean = false

  @Watch('freeSolo')
  protected freeSoloChanged(isFree: boolean) {
    if (isFree && this.isOpen) this.isOpen = false
  }

  /**
   * Callback to determine which dates in the calendar are selectable.
   * Receives an ISO date string (YYYY-MM-DD) and should return `true` to allow the date or `false` to disable it.
   * Typed input that resolves to a disallowed date is also rejected.
   */
  @Prop()
  readonly allowedDates: ((dateString: string) => boolean) | undefined = undefined

  @Watch('min')
  @Watch('minYearProp')
  protected minChanged() {
    this.datePicker?.updateMin(this.min, this.minYearProp)
  }

  @Watch('max')
  @Watch('maxYearProp')
  protected maxChanged() {
    this.datePicker?.updateMax(this.max, this.maxYearProp)
  }

  /**
   * Emitted when the input loses focus.
   */
  @Event() dsBlur!: EventEmitter<DateBlurDetail>

  /**
   * Emitted when a keyboard key has been pressed.
   */
  @Event() dsKeyPress!: EventEmitter<DateKeyPressDetail>

  /**
   * Emitted when the input receives focus.
   */
  @Event() dsFocus!: EventEmitter<DateFocusDetail>

  /**
   * Emitted when the input is clicked.
   */
  @Event() dsClick!: EventEmitter<DateClickDetail>

  /**
   * Emitted when a keyboard input occurred (ISO value or null if incomplete).
   */
  @Event() dsInput!: EventEmitter<DateInputDetail>

  /**
   * Emitted when the date value has changed (ISO value or null).
   */
  @Event() dsChange!: EventEmitter<DateChangeDetail>

  /**
   * LIFECYCLE
   * ─────────────────────────────────────────────────────
   */

  connectedCallback() {
    this.debounceChanged()
    this.control.connectedCallback()
    this.disconnectInvalidTextSlotWatcher = watchInvalidTextSlot(this.el, hasContent => {
      this.hasInvalidTextSlotContent = hasContent
    })
  }

  componentWillLoad() {
    this.inheritedAttributes = inheritAttributes(this.el, ['aria-label', 'tabindex', 'title', 'data-hj-allow'])
    this.displayValue = isoToDisplay(this.value, getDisplayFormat(this.region))
  }

  componentDidLoad() {
    this.control.componentDidLoad()
    this.initMask()
    if (this.popupHostEl && this.el.shadowRoot) {
      this.datePicker = new DatePickerController({
        popupHostEl: this.popupHostEl,
        shadowRoot: this.el.shadowRoot,
        language: this.language,
        region: this.region,
        min: this.min,
        max: this.max,
        minYear: this.minYearProp,
        maxYear: this.maxYearProp,
        defaultDate: this.defaultDate,
        allowedDates: this.allowedDates,
        initialValue: this.value,
        onSelect: iso => {
          this.updatingFromMask = true
          this.value = iso
          this.control.inputValue = iso
          this.dateMask?.syncFromISO(iso)
          this.displayValue = isoToDisplay(iso, getDisplayFormat(this.region))
          this.dsChange.emit(iso)
          if (this.inline) this.dsBlur.emit(new FocusEvent('blur'))
          this.updatingFromMask = false
          this.isOpen = false
          this.triggerEl?.focus()
        },
        onClose: () => {
          this.isOpen = false
        },
      })
    }
  }

  disconnectedCallback() {
    this.focusHandler.disconnect()
    this.dateMask?.destroy()
    this.dateMask = undefined
    this.datePicker?.destroy()
    this.datePicker = undefined
    this.disconnectInvalidTextSlotWatcher?.()
  }

  /**
   * PUBLIC LISTENERS
   * ─────────────────────────────────────────────────────
   */

  @Listen('click', { capture: true, target: 'document' })
  listenToClick(ev: MouseEvent) {
    this.control.listenOnClick(ev)

    // Close popup on outside-click using composedPath for shadow-DOM awareness.
    if (this.isOpen) {
      const path = ev.composedPath() as EventTarget[]
      const insideCalendar = path.includes(this.popupHostEl ?? this.el)
      if (!insideCalendar) {
        raf(() => {
          this.isOpen = false
        })
      }
    }
  }

  @Listen('keydown', { target: 'document' })
  listenToKeyDown(ev: KeyboardEvent) {
    if (!this.isOpen) return
    if (isEscapeKey(ev)) {
      ev.stopPropagation()
      this.isOpen = false
    }
  }

  @Listen('reset', { capture: true, target: 'document' })
  listenToReset(ev: UIEvent) {
    this.control.listenOnReset(ev)
    this.datePicker?.clear({ silent: true })
    // FormControl schedules a setTimeout that writes the raw ISO value into nativeEl,
    // bypassing IMask. IMask's internal _value is already correct but the DOM is wrong.
    // We queue a fix that directly restores the display format to the DOM input.
    setTimeout(() => {
      const nativeEl = this.control.nativeEl as HTMLInputElement | undefined
      this.displayValue = isoToDisplay(this.value, getDisplayFormat(this.region))
      if (nativeEl) {
        nativeEl.value = this.displayValue
      }
      this.datePicker?.syncFromValue(this.value)
    })
  }

  /**
   * PUBLIC METHODS
   * ─────────────────────────────────────────────────────
   */

  /**
   * @internal define config for the component
   */
  @Method()
  @ListenToConfig()
  async configChanged(state: DsConfigState): Promise<void> {
    this.language = state.language
    this.region = state.region
    this.dateMask?.updateFormat(getDisplayFormat(state.region))
    this.displayValue = this.dateMask?.getDisplayText() ?? isoToDisplay(this.value, getDisplayFormat(state.region))
    this.datePicker?.updateLocale(state.language, state.region)
  }

  /**
   * Sets focus on the native `input` in `ds-date`.
   */
  @Method()
  async setFocus() {
    return this.control.setFocus()
  }

  /**
   * Sets blur on the native `input` in `ds-date`.
   * @internal
   */
  @Method()
  async setBlur() {
    return this.control.setBlur()
  }

  /**
   * Returns the native `<input>` element used under the hood.
   */
  @Method()
  async getInputElement(): Promise<HTMLInputElement> {
    return this.control.nativeEl as HTMLInputElement
  }

  /**
   * EVENT HANDLERS
   * ─────────────────────────────────────────────────────
   */

  private handleClick = (ev: MouseEvent) => {
    this.control.onClick(ev)
  }

  private handleFocus = (ev: FocusEvent) => {
    this.dateMask?.setLazy(false)
    this.control.onFocus(ev)
  }

  private handleBlur = (ev: FocusEvent) => {
    this.dateMask?.clearIfIncomplete()
    this.displayValue = this.dateMask?.getDisplayText() ?? ''
    this.dateMask?.setLazy(!this.value)
    this.control.onBlur(ev)
  }

  private handleTriggerClick = () => {
    if (this.disabled || this.readonly) return
    this.isOpen = !this.isOpen
  }

  private handleClearClick = () => {
    this.clearValue({ resetMask: true })
  }

  /**
   * PRIVATE METHODS
   * ─────────────────────────────────────────────────────
   */

  /**
   * Un-sets `value` and emits `dsChange`, like the clear button. `resetMask: false` skips re-syncing the
   * mask — used from `onAccept` where the mask is already empty, avoiding a recursive `accept` and a
   * placeholder flicker.
   */
  private clearValue({ resetMask }: { resetMask: boolean }) {
    this.updatingFromMask = true
    this.value = null
    this.control.inputValue = null
    if (resetMask) {
      this.dateMask?.syncFromISO(null)
      this.displayValue = ''
    }
    this.datePicker?.clear({ silent: true })
    this.dsChange.emit(null)
    this.updatingFromMask = false
  }

  private initMask() {
    const inputEl = this.control.nativeEl as HTMLInputElement | undefined
    if (!inputEl) return

    this.dateMask = createDateMask({
      inputEl,
      format: getDisplayFormat(this.region),
      initialValue: this.value,
      onAccept: (isoValue, event) => {
        // Mirror the mask's own live (possibly incomplete) display text into state so a re-render
        // triggered by anything else while the user is mid-edit reflects what's actually in the input
        // rather than snapping back to the last committed `value`. See `displayValue`'s declaration.
        this.displayValue = this.dateMask?.getDisplayText() ?? ''

        // Keep FormControl's own bookkeeping of "what's currently in the field" in sync with the mask's
        // live ISO (or `null` while incomplete). Without this, deleting part of a complete date (e.g. just
        // the year) leaves `control.inputValue` stuck on the last *complete* ISO — `isEmpty()` below only
        // catches a fully-cleared field, not a partially-edited one — so blur's `setValue(inputValue)`
        // (see `FormControl.onBlur`) would resurrect that stale date instead of committing the clear.
        this.control.inputValue = isoValue

        // Field fully cleared by backspace/DEL rather than the clear button — treat it as a clear too.
        // Gated on `event`, which IMask only supplies for a real keystroke: any of our own internal mask
        // resets (out-of-range revert, `clearIfIncomplete` on blur, locale/format changes, ...) fire this
        // same `accept` with `event` `undefined`, so they can never be mistaken for the user clearing the
        // field — no need to thread `updatingFromMask` through every place that touches the mask.
        if (event && this.value !== null && this.dateMask?.isEmpty()) {
          this.clearValue({ resetMask: false })
        }

        this.dsInput.emit(isoValue)
      },
      onComplete: isoValue => {
        if (!checkIsWithinRange(isoValue, this.min, this.max, this.minYearProp, this.maxYearProp, this.allowedDates)) {
          // Reject the typed date and blank the mask display — a revert, not a clear, so `value`/`dsChange`
          // are left untouched. Safe to leave `updatingFromMask` alone: the reset happens outside any
          // input event, so `onAccept` sees `event === undefined` and skips its own-clear check.
          this.control.inputValue = this.value
          raf(() => this.dateMask?.syncFromISO(null))
          return
        }
        this.updatingFromMask = true
        this.value = isoValue
        this.control.inputValue = isoValue
        this.datePicker?.syncFromValue(isoValue)
        this.dsChange.emit(isoValue)
        this.updatingFromMask = false
      },
    })
  }

  /**
   * RENDER
   * ─────────────────────────────────────────────────────
   */

  render() {
    const triggerLabel = i18nDsTriggerButton[this.language].openCalendar
    const chooseDateLabel = i18nDsTriggerButton[this.language].chooseDate
    const isInvalid = this.invalid || this.hasInvalidTextSlotContent

    return (
      <Field
        cssClasses={{ 'is-inline': this.inline }}
        disabled={this.disabled}
        color={this.color}
        invalid={isInvalid}
        loading={this.loading}
        label={this.label}
        description={this.description}
        invalidText={this.invalidText}
        required={this.required}
        language={this.language}
        inputId="input"
      >
        {this.inline && (
          <div
            id="inline"
            role="group"
            aria-label={chooseDateLabel}
            ref={el => (this.popupHostEl = el as HTMLDivElement)}
          ></div>
        )}
        {!this.inline && (
          <Fragment>
            <input
              id="input"
              part="input"
              name={this.name}
              type="text"
              inputMode="numeric"
              ref={inputEl => (this.control.nativeEl = inputEl)}
              aria-describedby="description"
              aria-invalid={isInvalid ? 'true' : 'false'}
              disabled={this.disabled}
              autofocus={this.autofocus}
              autocomplete={this.autocomplete}
              placeholder={this.placeholder || ''}
              readonly={this.readonly}
              required={this.required}
              value={this.displayValue}
              onClick={ev => this.handleClick(ev)}
              onFocus={ev => this.handleFocus(ev)}
              onBlur={ev => this.handleBlur(ev)}
              onKeyPress={ev => this.dsKeyPress.emit(ev)}
              {...this.inheritedAttributes}
            />
            <ClearButton
              value={this.value}
              disabled={this.disabled}
              readonly={this.readonly}
              language={this.language}
              onClick={this.handleClearClick}
            />
            {!this.freeSolo && !this.disabled && !this.readonly && (
              <button
                id="trigger"
                part="trigger"
                type="button"
                ref={el => (this.triggerEl = el as HTMLButtonElement)}
                aria-label={triggerLabel}
                title={triggerLabel}
                aria-haspopup="dialog"
                aria-expanded={this.isOpen ? 'true' : 'false'}
                aria-controls="popup"
                onClick={this.handleTriggerClick}
              >
                <ds-icon name="date"></ds-icon>
              </button>
            )}
            {/* ---------------------------------------- */}
            {/* Calendar popup host                      */}
            {/* ---------------------------------------- */}
            {!this.freeSolo && (
              <div
                id="popup"
                role="dialog"
                aria-modal="true"
                aria-label={chooseDateLabel}
                aria-hidden={this.isOpen ? 'false' : 'true'}
                inert={this.isOpen ? undefined : true}
                ref={el => (this.popupHostEl = el as HTMLDivElement)}
              ></div>
            )}
          </Fragment>
        )}
      </Field>
    )
  }
}

let DateIds = 0
