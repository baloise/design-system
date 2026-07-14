import { Component, Element, Event, EventEmitter, h, Listen, Method, Prop, State, Watch } from '@stencil/core'
import AirDatepicker, { AirDatepickerViews, type AirDatepickerLocale } from 'air-datepicker'
import localeDe from 'air-datepicker/locale/de'
import localeEn from 'air-datepicker/locale/en'
import localeEs from 'air-datepicker/locale/es'
import localeFi from 'air-datepicker/locale/fi'
import localeFr from 'air-datepicker/locale/fr'
import localeIt from 'air-datepicker/locale/it'
import localeNl from 'air-datepicker/locale/nl'
import localePl from 'air-datepicker/locale/pl'
import localePt from 'air-datepicker/locale/pt'
import localeSv from 'air-datepicker/locale/sv'
import { DateTime } from 'luxon'
import { DsComponentInterface } from '@global'
import {
  inheritAttributes,
  FormControlInterface,
  FormControl,
  FocusHandler,
  debounceEvent,
  Logger,
  type LogInstance,
  isEscapeKey,
  OneOf,
  Type,
} from '@utils'
import { AttachInternals, HTMLStencilElement } from '@stencil/core/internal'
import { defaultConfig, DsConfigState, DsLanguage, DsRegion, ListenToConfig } from '@global'
import { Field, FieldInterface } from '../input/field.util'
import { ClearButton } from '../input/clear-button.util'
import {
  DATE_COLORS,
  DateColor,
  DateBlurDetail,
  DateKeyPressDetail,
  DateFocusDetail,
  DateClickDetail,
  DateInputDetail,
  DateChangeDetail,
} from './date.interfaces'
import { DateMask, getDisplayFormat, isoToDisplay } from './date.mask'
import { i18nDsTriggerButton } from '../input/trigger-button.i18n'
import { i18nDsDate } from './date.i18n'

/**
 * Date renders a masked date input field with an interactive calendar popup for date selection.
 *
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

  private airDatepicker: AirDatepicker<HTMLDivElement> | undefined
  private currentViewMonth!: number
  private currentViewYear!: number
  private currentViewType: AirDatepickerViews = 'days'

  private readonly today = new Date()
  private startDate = new Date()
  private skipFocusOnNextRender = false
  private gridObserver: MutationObserver | undefined
  private navObserver: MutationObserver | undefined

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

  @Watch('isOpen')
  protected isOpenChanged(open: boolean) {
    if (open) {
      this.focusHandler.enable({ target: this.popupHostEl, restoreElement: this.triggerEl ?? null })
      this.el.shadowRoot?.removeEventListener('keydown', this.handleTab as EventListener, true)
      this.el.shadowRoot?.addEventListener('keydown', this.handleTab as EventListener, true)
      requestAnimationFrame(() => this.enhanceAccessibility(true))
    } else {
      this.el.shadowRoot?.removeEventListener('keydown', this.handleTab as EventListener, true)
      this.focusHandler.disable()
      this.focusHandler.restoreFocus(this.triggerEl)
    }
  }

  @AttachInternals() internals!: ElementInternals

  /**
   * PUBLIC PROPERTY API
   * ------------------------------------------------------
   */

  /**
   * The value of the date input in ISO format (YYYY-MM-DD).
   */
  @Prop({ mutable: true, reflect: true })
  @Type('string')
  value: string | null = null

  @Watch('value')
  protected valueChanged() {
    if (!this.updatingFromMask) {
      this.dateMask?.syncFromISO(this.value)
      this.syncCalendarFromValue()
    }
  }

  /**
   * The name of the control, which is submitted with the form data.
   */
  @Prop()
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
  @Prop()
  @Type('number')
  readonly minYearProp: number | undefined = undefined

  /**
   * Latest year available for selection. Takes precedence over `max` when both are set.
   */
  @Prop()
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
    this.airDatepicker?.update({ minDate: this.getMinDate() })
  }

  @Watch('max')
  @Watch('maxYearProp')
  protected maxChanged() {
    this.airDatepicker?.update({ maxDate: this.getMaxDate() })
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
   * PUBLIC LISTENERS
   * ------------------------------------------------------
   */

  @Listen('click', { capture: true, target: 'document' })
  listenToClick(ev: MouseEvent) {
    this.control.listenOnClick(ev)

    // Close popup on outside-click using composedPath for shadow-DOM awareness.
    if (this.isOpen) {
      const path = ev.composedPath() as EventTarget[]
      const insideCalendar = path.includes(this.popupHostEl ?? this.el)
      if (!insideCalendar) {
        requestAnimationFrame(() => {
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
    this.airDatepicker?.clear({ silent: true })
    // FormControl schedules a setTimeout that writes the raw ISO value into nativeEl,
    // bypassing IMask. IMask's internal _value is already correct but the DOM is wrong.
    // We queue a fix that directly restores the display format to the DOM input.
    setTimeout(() => {
      const nativeEl = this.control.nativeEl as HTMLInputElement | undefined
      if (nativeEl) {
        nativeEl.value = isoToDisplay(this.value, getDisplayFormat(this.region))
      }
      if (this.value) this.syncCalendarFromValue()
    })
  }

  /**
   * LIFECYCLE
   * ------------------------------------------------------
   */

  connectedCallback() {
    this.debounceChanged()
    this.control.connectedCallback()
  }

  componentWillLoad() {
    this.inheritedAttributes = inheritAttributes(this.el, ['aria-label', 'tabindex', 'title', 'data-hj-allow'])
  }

  componentDidLoad() {
    this.control.componentDidLoad()
    this.initMask()
    this.initCalendar()
    this.setupGridObserver()
    this.setupNavObserver()
  }

  disconnectedCallback() {
    this.el.shadowRoot?.removeEventListener('keydown', this.handleTab as EventListener, true)
    this.titleBtn?.removeEventListener('click', this.forceTitleClickToYear)
    this.prevBtn?.removeEventListener('click', this.handlePrevNextClick)
    this.nextBtn?.removeEventListener('click', this.handlePrevNextClick)
    const body = this.popupHostEl?.querySelector('.air-datepicker-body--cells')
    body?.removeEventListener('keydown', this.handleGridKeydown as EventListener)
    this.gridObserver?.disconnect()
    this.navObserver?.disconnect()
    this.focusHandler.disconnect()
    this.dateMask?.destroy()
    this.dateMask = undefined
    this.airDatepicker?.destroy()
    this.airDatepicker = undefined
  }

  /**
   * PUBLIC METHODS
   * ------------------------------------------------------
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
    this.airDatepicker?.update({
      locale: this.getLocale(),
      dateFormat: getDisplayFormat(state.region),
    })
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
   * PRIVATE METHODS
   * ------------------------------------------------------
   */

  private initMask() {
    const inputEl = this.control.nativeEl as HTMLInputElement | undefined
    if (!inputEl) return

    this.dateMask = new DateMask(
      inputEl,
      getDisplayFormat(this.region),
      isoValue => {
        this.dsInput.emit(isoValue)
      },
      isoValue => {
        if (!this.isWithinRange(isoValue)) {
          requestAnimationFrame(() => this.dateMask?.syncFromISO(null))
          return
        }
        this.updatingFromMask = true
        this.value = isoValue
        this.control.inputValue = isoValue
        this.syncCalendarFromValue()
        this.dsChange.emit(isoValue)
        this.updatingFromMask = false
      },
    )

    if (this.value) {
      this.dateMask.syncFromISO(this.value)
      this.dateMask.setLazy(false)
    }
  }

  private initCalendar() {
    if (!this.popupHostEl || !this.el.shadowRoot) return

    if (this.airDatepicker) {
      this.airDatepicker.destroy()
      this.airDatepicker = undefined
    }

    // Render calendar inline inside popup host; we own show/hide via CSS
    this.airDatepicker = new AirDatepicker<HTMLDivElement>(this.popupHostEl, {
      navTitles: {
        days: `<button id="switch" aria-label="${i18nDsDate[this.language].switchToYearView}"><strong>MMMM yyyy</strong><ds-icon name="caret-down"></ds-icon></button>`,
        months: `<button id="switch" aria-label="${i18nDsDate[this.language].switchToYearView}"><strong>yyyy</strong><ds-icon name="caret-down"></ds-icon></button>`,
      },
      prevHtml: '<button id="previous"><ds-icon name="caret-left"></ds-icon></button>',
      nextHtml: '<button id="next"><ds-icon name="caret-right"></ds-icon></button>',
      minDate: this.getMinDate(),
      maxDate: this.getMaxDate(),
      inline: true,
      autoClose: true,
      showOtherYears: true,
      selectOtherYears: true,
      showOtherMonths: false,
      moveToOtherMonthsOnSelect: true,
      view: 'days',
      locale: this.getLocale(),
      dateFormat: getDisplayFormat(this.region),
      onChangeView: view => {
        this.currentViewType = view
        requestAnimationFrame(() => {
          this.enhanceAccessibility()
        })
      },
      onChangeViewDate: ({ month, year }) => {
        this.currentViewYear = year
        this.currentViewMonth = month
        this.updateNavigationButtonLabels()
      },
      onSelect: ({ date }) => {
        const selected = Array.isArray(date) ? date[0] : date

        // If the user clicks on the currently selected date, the datepicker will return an empty array.
        // In this case, we treat it as a "clear" action.
        if (!selected) {
          this.updatingFromMask = true
          this.value = null
          this.control.inputValue = null
          this.dateMask?.syncFromISO(null)
          this.dsChange.emit(null)
          this.updatingFromMask = false
          this.isOpen = false
          this.triggerEl?.focus()
          return
        }

        // Convert the selected date to ISO format (YYYY-MM-DD)
        const iso = DateTime.fromJSDate(selected).toISODate()

        // If the conversion fails (e.g., invalid date), we do nothing.
        if (!iso) return

        // Update the aria-selected attribute on all cells to reflect the new selection
        this.getCells().forEach(c => {
          c.setAttribute('aria-selected', c.classList.contains('-selected-') ? 'true' : 'false')
        })

        // Update the component's value and emit the change event
        this.updatingFromMask = true
        this.value = iso
        this.control.inputValue = iso
        this.dateMask?.syncFromISO(iso)
        this.dsChange.emit(iso)
        this.updatingFromMask = false

        this.isOpen = false
        this.triggerEl?.focus()
      },
      onShow: () => {
        this.enhanceAccessibility()
      },
      onRenderCell: ({ date, cellType }) => {
        if (cellType !== 'day') return {}
        const label = new Intl.DateTimeFormat(this.language, {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }).format(date)
        const iso = DateTime.fromJSDate(date).toISODate()
        const disabled = iso && this.allowedDates ? !this.allowedDates(iso) : false
        return { attrs: { 'aria-label': label }, disabled }
      },
    })

    this.prevBtn?.addEventListener('click', this.handlePrevNextClick)
    this.nextBtn?.addEventListener('click', this.handlePrevNextClick)

    this.syncCalendarFromValue()
  }

  private enhanceAccessibility(focusOnDate = true) {
    let body = this.popupHostEl?.querySelector('.air-datepicker-body--cells')

    if (this.currentViewType === 'months') {
      body = this.popupHostEl?.querySelector('.air-datepicker-body--cells.-months-')
    } else if (this.currentViewType === 'years') {
      body = this.popupHostEl?.querySelector('.air-datepicker-body--cells.-years-')
    }
    if (!body) return

    body.setAttribute('role', 'grid')

    this.getCells().forEach(c => {
      c.setAttribute('aria-selected', c.classList.contains('-selected-') ? 'true' : 'false')
      if (c.classList.contains('-current-')) {
        c.setAttribute('aria-current', 'date')
      }
    })

    body.removeEventListener('keydown', this.handleGridKeydown as EventListener)
    body.addEventListener('keydown', this.handleGridKeydown as EventListener)

    const selectedDate = this.value ? new Date(this.value + 'T00:00') : null
    this.setActiveCell(selectedDate ?? this.today, focusOnDate)
  }

  private updateNavigationButtonLabels() {
    const t = i18nDsDate[this.language]
    if (this.currentViewType === 'months') {
      this.prevBtn?.setAttribute('aria-label', t.previousYear)
      this.nextBtn?.setAttribute('aria-label', t.nextYear)
    } else if (this.currentViewType === 'years') {
      this.prevBtn?.setAttribute('aria-label', t.previousDecade)
      this.nextBtn?.setAttribute('aria-label', t.nextDecade)
    } else {
      this.prevBtn?.setAttribute('aria-label', t.previousMonth)
      this.nextBtn?.setAttribute('aria-label', t.nextMonth)
    }
  }

  private getCells(): HTMLElement[] {
    if (!this.popupHostEl) return []

    let selector = ''
    switch (this.currentViewType) {
      case 'days':
        selector = '.air-datepicker-cell.-day-'
        break
      case 'months':
        selector = '.air-datepicker-cell.-month-'
        break
      case 'years':
        selector = '.air-datepicker-cell.-year-'
        break
    }

    return Array.from(this.popupHostEl.querySelectorAll(selector))
  }

  private get prevBtn() {
    return this.el.shadowRoot?.querySelector<HTMLButtonElement>('[data-action="prev"] button')
  }

  private get nextBtn() {
    return this.el.shadowRoot?.querySelector<HTMLButtonElement>('[data-action="next"] button')
  }

  private get titleBtn() {
    return this.el.shadowRoot?.querySelector<HTMLButtonElement>('.air-datepicker-nav--title button')
  }

  private setActiveCell(date: Date, focusOnDate = true) {
    const cells = this.getCells()
    if (cells.length === 0) return

    let target: HTMLElement | undefined

    if (this.currentViewType === 'days') {
      target = cells.find(
        c =>
          Number(c.dataset['date']) === date.getDate() &&
          Number(c.dataset['month']) === date.getMonth() &&
          Number(c.dataset['year']) === date.getFullYear(),
      )
      if (!target) {
        const firstOfMonth = new Date(this.currentViewYear, this.currentViewMonth, 1)
        target = cells.find(
          c =>
            Number(c.dataset['date']) === 1 &&
            Number(c.dataset['month']) === firstOfMonth.getMonth() &&
            Number(c.dataset['year']) === firstOfMonth.getFullYear() &&
            !c.classList.contains('-other-month-'),
        )
      }
    } else if (this.currentViewType === 'months') {
      target = cells.find(
        c => Number(c.dataset['month']) === date.getMonth() && Number(c.dataset['year']) === date.getFullYear(),
      )
      if (!target) {
        target = cells.find(c => !c.classList.contains('-other-year-'))
      }
    } else {
      target = cells.find(c => Number(c.dataset['year']) === date.getFullYear())
      if (!target) {
        target = cells.find(c => !c.classList.contains('-other-decade-'))
      }
    }

    if (!target) {
      target = cells[cells.length - 1]
    }

    cells.forEach(c => (c.tabIndex = -1))
    target!.tabIndex = 0

    if (focusOnDate) {
      target!.focus()
    }

    this.startDate = new Date(
      Number(target!.dataset['year']),
      Number(target!.dataset['month']),
      Number(target!.dataset['date']),
    )
  }

  private handleGridKeydown = (e: KeyboardEvent) => {
    const key = e.key
    const current = this.startDate
    if (!current) return

    if (key === 'Enter' || key === ' ') {
      e.preventDefault()
      const activeCell = this.getCells().find(c => c.tabIndex === 0)
      if (activeCell) activeCell.click()
      return
    }

    const newDate = new Date(current)

    const move: Record<string, Partial<Record<AirDatepickerViews, () => void>>> = {
      ArrowLeft: {
        days: () => newDate.setDate(current.getDate() - 1),
        months: () => newDate.setMonth(current.getMonth() - 1),
        years: () => newDate.setFullYear(current.getFullYear() - 1),
      },
      ArrowRight: {
        days: () => newDate.setDate(current.getDate() + 1),
        months: () => newDate.setMonth(current.getMonth() + 1),
        years: () => newDate.setFullYear(current.getFullYear() + 1),
      },
      ArrowUp: {
        days: () => newDate.setDate(current.getDate() - 7),
        months: () => newDate.setMonth(current.getMonth() - 3),
        years: () => newDate.setFullYear(current.getFullYear() - 4),
      },
      ArrowDown: {
        days: () => newDate.setDate(current.getDate() + 7),
        months: () => newDate.setMonth(current.getMonth() + 3),
        years: () => newDate.setFullYear(current.getFullYear() + 4),
      },
      Home: {
        days: () => newDate.setDate(1),
        months: () => newDate.setMonth(0),
        years: () => newDate.setFullYear(current.getFullYear() - (current.getFullYear() % 10)),
      },
      End: {
        days: () => newDate.setMonth(current.getMonth() + 1, 0),
        months: () => newDate.setMonth(11),
        years: () => newDate.setFullYear(current.getFullYear() - (current.getFullYear() % 10) + 9),
      },
      PageUp: {
        days: () => newDate.setMonth(current.getMonth() - 1),
        months: () => newDate.setFullYear(current.getFullYear() - 1),
        years: () => newDate.setFullYear(current.getFullYear() - 10),
      },
      PageDown: {
        days: () => newDate.setMonth(current.getMonth() + 1),
        months: () => newDate.setFullYear(current.getFullYear() + 1),
        years: () => newDate.setFullYear(current.getFullYear() + 10),
      },
    }

    if (!move[key]?.[this.currentViewType]) return

    e.preventDefault()
    move[key][this.currentViewType]!()

    const monthChanged = current.getMonth() !== newDate.getMonth() || current.getFullYear() !== newDate.getFullYear()

    if (monthChanged) {
      this.skipFocusOnNextRender = false
      this.airDatepicker?.setViewDate(newDate)
      requestAnimationFrame(() => {
        this.setActiveCell(newDate, true)
      })
    } else {
      this.setActiveCell(newDate, true)
    }
  }

  private handleTab = (e: KeyboardEvent) => {
    if (e.key !== 'Tab' && e.key !== 'Escape') return

    if (e.key === 'Escape') {
      e.stopPropagation()
      this.isOpen = false
      return
    }

    const active = e.target as HTMLElement | null
    const activeCell = this.getCells().find(c => c.tabIndex === 0)
    const isGridCell = active?.getAttribute('role') === 'gridcell'

    // Tab cycle (forward): gridcell → titleBtn → prevBtn → nextBtn → gridcell
    // Years view skips titleBtn:  gridcell → prevBtn → nextBtn → gridcell
    // Tab cycle (backward): reverse of the above
    if (!e.shiftKey) {
      if (isGridCell) {
        e.preventDefault()
        if (this.currentViewType === 'years') {
          this.prevBtn?.focus()
        } else {
          this.titleBtn?.focus()
        }
      } else if (active === this.titleBtn) {
        e.preventDefault()
        this.prevBtn?.focus()
      } else if (active === this.prevBtn) {
        e.preventDefault()
        this.nextBtn?.focus()
      } else if (active === this.nextBtn) {
        e.preventDefault()
        activeCell?.focus()
      }
    } else {
      if (isGridCell) {
        e.preventDefault()
        this.nextBtn?.focus()
      } else if (active === this.nextBtn) {
        e.preventDefault()
        this.prevBtn?.focus()
      } else if (active === this.prevBtn) {
        e.preventDefault()
        if (this.currentViewType === 'years') {
          activeCell?.focus()
        } else {
          this.titleBtn?.focus()
        }
      } else if (active === this.titleBtn) {
        e.preventDefault()
        activeCell?.focus()
      }
    }
  }

  private handlePrevNextClick = () => {
    this.skipFocusOnNextRender = true
  }

  private reorderNavigation() {
    const nav = this.popupHostEl?.querySelector('.air-datepicker-nav')
    if (!nav) return
    const prev = nav.querySelector('[data-action="prev"]')
    const title = nav.querySelector('.air-datepicker-nav--title')
    if (!prev || !title) return
    // Guard: insertBefore always fires a mutation record even when the node is
    // already in the right position, which would re-trigger the navObserver
    // and create an infinite loop.
    if (prev.previousElementSibling === title) return
    nav.insertBefore(title, prev)
  }

  private forceTitleClickToYear = () => {
    if (this.airDatepicker) {
      this.airDatepicker.setCurrentView('years')
    }
  }

  private attachTitleBtnListener() {
    requestAnimationFrame(() => {
      if (!this.titleBtn) return
      this.titleBtn.onclick = null
      this.titleBtn.removeEventListener('click', this.forceTitleClickToYear)
      this.titleBtn.addEventListener('click', this.forceTitleClickToYear, { capture: true })
    })
  }

  private setupGridObserver() {
    if (typeof MutationObserver === 'undefined' || !this.popupHostEl) return

    const grid = this.popupHostEl.querySelector('.air-datepicker-body--cells')
    if (!grid) return

    this.gridObserver?.disconnect()

    this.gridObserver = new MutationObserver(mutations => {
      const changed = mutations.some(m => m.type === 'childList')
      if (!changed) return
      requestAnimationFrame(() => {
        this.enhanceAccessibility(!this.skipFocusOnNextRender)
        this.skipFocusOnNextRender = false
      })
    })

    this.gridObserver.observe(grid, { childList: true, subtree: false })
  }

  private setupNavObserver() {
    if (typeof MutationObserver === 'undefined' || !this.popupHostEl) return

    const nav = this.popupHostEl.querySelector('.air-datepicker-nav')
    if (!nav) return

    this.navObserver?.disconnect()

    this.updateNavigationButtonLabels()
    this.reorderNavigation()
    this.attachTitleBtnListener()

    this.navObserver = new MutationObserver(() => {
      this.updateNavigationButtonLabels()
      this.reorderNavigation()
      this.attachTitleBtnListener()
    })

    this.navObserver.observe(nav, { childList: true, subtree: true })
  }

  private getLocale(): Partial<AirDatepickerLocale> {
    const localeMap: Partial<Record<DsLanguage, Partial<AirDatepickerLocale>>> = {
      de: localeDe,
      en: localeEn,
      es: localeEs,
      fi: localeFi,
      fr: localeFr,
      it: localeIt,
      nl: localeNl,
      pl: localePl,
      pt: localePt,
      sv: localeSv,
    }
    return localeMap[this.language] ?? localeDe
  }

  private getMinDate(): Date | undefined {
    if (this.minYearProp !== undefined) return new Date(this.minYearProp, 0, 1)
    if (this.min) {
      const dt = DateTime.fromISO(this.min)
      return dt.isValid ? dt.toJSDate() : undefined
    }
    return undefined
  }

  private getMaxDate(): Date | undefined {
    if (this.maxYearProp !== undefined) return new Date(this.maxYearProp, 11, 31)
    if (this.max) {
      const dt = DateTime.fromISO(this.max)
      return dt.isValid ? dt.toJSDate() : undefined
    }
    return undefined
  }

  private isWithinRange(iso: string): boolean {
    const dt = DateTime.fromISO(iso)
    if (!dt.isValid) return false
    const date = dt.toJSDate()
    const min = this.getMinDate()
    const max = this.getMaxDate()
    if (min && date < min) return false
    if (max && date > max) return false
    if (this.allowedDates && !this.allowedDates(iso)) return false
    return true
  }

  private syncCalendarFromValue() {
    if (!this.airDatepicker) return
    if (!this.value) {
      this.airDatepicker.clear({ silent: true })
      if (this.defaultDate) {
        const dt = DateTime.fromISO(this.defaultDate)
        if (dt.isValid) this.airDatepicker.setViewDate(dt.toJSDate())
      }
      return
    }
    const dt = DateTime.fromISO(this.value)
    if (dt.isValid) {
      this.airDatepicker.selectDate(dt.toJSDate(), { silent: true })
    }
  }

  private handleClick = (ev: MouseEvent) => {
    this.control.onClick(ev)
  }

  private handleFocus = (ev: FocusEvent) => {
    this.dateMask?.setLazy(false)
    this.control.onFocus(ev)
  }

  private handleBlur = (ev: FocusEvent) => {
    this.dateMask?.clearIfIncomplete()
    this.dateMask?.setLazy(!this.value)
    this.control.onBlur(ev)
  }

  private handleTriggerClick = () => {
    if (this.disabled || this.readonly) return
    this.isOpen = !this.isOpen
  }

  private handleClearClick = () => {
    this.updatingFromMask = true
    this.value = null
    this.control.inputValue = null
    this.dateMask?.syncFromISO(null)
    this.airDatepicker?.clear({ silent: true })
    this.dsChange.emit(null)
    this.updatingFromMask = false
  }

  /**
   * RENDER
   * ------------------------------------------------------
   */

  render() {
    const displayValue = isoToDisplay(this.value, getDisplayFormat(this.region))
    const triggerLabel = i18nDsTriggerButton[this.language].openCalendar
    const chooseDateLabel = i18nDsTriggerButton[this.language].chooseDate

    return (
      <Field
        disabled={this.disabled}
        color={this.color}
        invalid={this.invalid}
        loading={this.loading}
        label={this.label}
        description={this.description}
        invalidText={this.invalidText}
        required={this.required}
        language={this.language}
        inputId="input"
      >
        <input
          id="input"
          part="input"
          name={this.name}
          type="text"
          inputMode="numeric"
          ref={inputEl => (this.control.nativeEl = inputEl)}
          aria-describedby="description"
          aria-invalid={this.invalid === true ? 'true' : 'false'}
          disabled={this.disabled}
          autofocus={this.autofocus}
          placeholder={this.placeholder || ''}
          readonly={this.readonly}
          required={this.required}
          value={displayValue}
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
            ref={el => (this.popupHostEl = el as HTMLDivElement)}
          ></div>
        )}
      </Field>
    )
  }
}

let DateIds = 0
