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
import type { DsLanguage, DsRegion } from '@global'
import { i18nDsDate } from './date.i18n'
import { getDisplayFormat } from './date.mask'

export interface DatePickerConfig {
  popupHostEl: HTMLDivElement
  shadowRoot: ShadowRoot
  language: DsLanguage
  region: DsRegion
  min: string | undefined
  max: string | undefined
  minYear: number | undefined
  maxYear: number | undefined
  defaultDate: string | undefined
  allowedDates: ((iso: string) => boolean) | undefined
  initialValue: string | null
  onSelect: (iso: string | null) => void
  onClose: () => void
}

export function checkIsWithinRange(
  iso: string,
  min: string | undefined,
  max: string | undefined,
  minYear: number | undefined,
  maxYear: number | undefined,
  allowedDates: ((iso: string) => boolean) | undefined,
): boolean {
  const dt = DateTime.fromISO(iso)
  if (!dt.isValid) return false
  const date = dt.toJSDate()
  if (minYear !== undefined && date < new Date(minYear, 0, 1)) return false
  if (maxYear !== undefined && date > new Date(maxYear, 11, 31)) return false
  if (min) {
    const minDt = DateTime.fromISO(min)
    if (minDt.isValid && date < minDt.toJSDate()) return false
  }
  if (max) {
    const maxDt = DateTime.fromISO(max)
    if (maxDt.isValid && date > maxDt.toJSDate()) return false
  }
  if (allowedDates && !allowedDates(iso)) return false
  return true
}

export class DatePickerController {
  private airDatepicker: AirDatepicker<HTMLDivElement> | undefined
  private currentViewMonth!: number
  private currentViewYear!: number
  private currentViewType: AirDatepickerViews = 'days'
  private readonly today = new Date()
  private startDate = new Date()
  private skipFocusOnNextRender = false
  private gridObserver: MutationObserver | undefined
  private navObserver: MutationObserver | undefined
  private config: DatePickerConfig

  constructor(config: DatePickerConfig) {
    this.config = config
    this.init()
  }

  /**
   * PUBLIC API
   * ------------------------------------------------------
   */

  open() {
    this.config.shadowRoot.removeEventListener('keydown', this.handleTab as EventListener, true)
    this.config.shadowRoot.addEventListener('keydown', this.handleTab as EventListener, true)
    requestAnimationFrame(() => this.enhanceAccessibility(true))
  }

  close() {
    this.config.shadowRoot.removeEventListener('keydown', this.handleTab as EventListener, true)
  }

  syncFromValue(value: string | null) {
    if (!this.airDatepicker) return
    if (!value) {
      this.airDatepicker.clear({ silent: true })
      if (this.config.defaultDate) {
        const dt = DateTime.fromISO(this.config.defaultDate)
        if (dt.isValid) this.airDatepicker.setViewDate(dt.toJSDate())
      }
      return
    }
    const dt = DateTime.fromISO(value)
    if (dt.isValid) {
      this.airDatepicker.selectDate(dt.toJSDate(), { silent: true })
    }
  }

  updateLocale(language: DsLanguage, region: DsRegion) {
    this.config = { ...this.config, language, region }
    this.airDatepicker?.update({
      locale: this.getLocale(),
      dateFormat: getDisplayFormat(region),
    })
  }

  updateMin(min: string | undefined, minYear: number | undefined) {
    this.config = { ...this.config, min, minYear }
    this.airDatepicker?.update({ minDate: this.getMinDate() })
  }

  updateMax(max: string | undefined, maxYear: number | undefined) {
    this.config = { ...this.config, max, maxYear }
    this.airDatepicker?.update({ maxDate: this.getMaxDate() })
  }

  clear(opts?: { silent: boolean }) {
    this.airDatepicker?.clear(opts)
  }

  destroy() {
    this.config.shadowRoot.removeEventListener('keydown', this.handleTab as EventListener, true)
    this.titleBtn?.removeEventListener('click', this.forceTitleClickToYear)
    this.prevBtn?.removeEventListener('click', this.handlePrevNextClick)
    this.nextBtn?.removeEventListener('click', this.handlePrevNextClick)
    const body = this.config.popupHostEl.querySelector('.air-datepicker-body--cells')
    body?.removeEventListener('keydown', this.handleGridKeydown as EventListener)
    this.gridObserver?.disconnect()
    this.navObserver?.disconnect()
    this.airDatepicker?.destroy()
    this.airDatepicker = undefined
  }

  /**
   * PRIVATE
   * ------------------------------------------------------
   */

  private init() {
    const { popupHostEl, language, region } = this.config

    this.airDatepicker = new AirDatepicker<HTMLDivElement>(popupHostEl, {
      navTitles: {
        days: `<button id="switch" aria-label="${i18nDsDate[language].switchToYearView}"><strong>MMMM yyyy</strong><ds-icon name="caret-down"></ds-icon></button>`,
        months: `<button id="switch" aria-label="${i18nDsDate[language].switchToYearView}"><strong>yyyy</strong><ds-icon name="caret-down"></ds-icon></button>`,
      },
      prevHtml:
        '<button id="previous"><ds-icon name="caret-left"></ds-icon></button><div id="previous-disabled"><ds-icon name="caret-left"></ds-icon></div>',
      nextHtml:
        '<button id="next"><ds-icon name="caret-right"></ds-icon></button><div id="next-disabled"><ds-icon name="caret-right"></ds-icon></div>',
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
      dateFormat: getDisplayFormat(region),
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
          this.config.onSelect(null)
          return
        }

        const iso = DateTime.fromJSDate(selected).toISODate()
        if (!iso) return

        // Update the aria-selected attribute on all cells to reflect the new selection
        this.getCells().forEach(c => {
          c.setAttribute('aria-selected', c.classList.contains('-selected-') ? 'true' : 'false')
        })

        this.config.onSelect(iso)
      },
      onShow: () => {
        this.enhanceAccessibility()
      },
      onRenderCell: ({ date, cellType }) => {
        if (cellType !== 'day') return {}
        const label = new Intl.DateTimeFormat(this.config.language, {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }).format(date)
        const iso = DateTime.fromJSDate(date).toISODate()
        const disabled = iso && this.config.allowedDates ? !this.config.allowedDates(iso) : false
        return { attrs: { 'aria-label': label }, disabled }
      },
    })

    this.prevBtn?.addEventListener('click', this.handlePrevNextClick)
    this.nextBtn?.addEventListener('click', this.handlePrevNextClick)

    this.syncFromValue(this.config.initialValue)
    this.setupGridObserver()
    this.setupNavObserver()
  }

  private enhanceAccessibility(focusOnDate = true) {
    const { popupHostEl } = this.config
    let body = popupHostEl.querySelector('.air-datepicker-body--cells')

    if (this.currentViewType === 'months') {
      body = popupHostEl.querySelector('.air-datepicker-body--cells.-months-')
    } else if (this.currentViewType === 'years') {
      body = popupHostEl.querySelector('.air-datepicker-body--cells.-years-')
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

    const selected = this.airDatepicker?.selectedDates[0] ?? null
    const defaultDateObj =
      !selected && this.config.defaultDate ? DateTime.fromISO(this.config.defaultDate).toJSDate() : null
    this.setActiveCell(selected ?? defaultDateObj ?? this.today, focusOnDate)
  }

  private updateNavigationButtonLabels() {
    const t = i18nDsDate[this.config.language]
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
    const { popupHostEl } = this.config

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

    return Array.from(popupHostEl.querySelectorAll(selector))
  }

  private get prevBtn() {
    return this.config.shadowRoot.querySelector<HTMLButtonElement>('[data-action="prev"] button')
  }

  private get nextBtn() {
    return this.config.shadowRoot.querySelector<HTMLButtonElement>('[data-action="next"] button')
  }

  private get titleBtn() {
    return this.config.shadowRoot.querySelector<HTMLButtonElement>('.air-datepicker-nav--title button')
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
      this.config.onClose()
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
    const nav = this.config.popupHostEl.querySelector('.air-datepicker-nav')
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
    if (typeof MutationObserver === 'undefined') return

    const grid = this.config.popupHostEl.querySelector('.air-datepicker-body--cells')
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
    if (typeof MutationObserver === 'undefined') return

    const nav = this.config.popupHostEl.querySelector('.air-datepicker-nav')
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
    return localeMap[this.config.language] ?? localeDe
  }

  private getMinDate(): Date | undefined {
    if (this.config.minYear !== undefined) return new Date(this.config.minYear, 0, 1)
    if (this.config.min) {
      const dt = DateTime.fromISO(this.config.min)
      return dt.isValid ? dt.toJSDate() : undefined
    }
    return undefined
  }

  private getMaxDate(): Date | undefined {
    if (this.config.maxYear !== undefined) return new Date(this.config.maxYear, 11, 31)
    if (this.config.max) {
      const dt = DateTime.fromISO(this.config.max)
      return dt.isValid ? dt.toJSDate() : undefined
    }
    return undefined
  }
}
