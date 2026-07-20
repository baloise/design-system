import SlimSelect from 'slim-select'
import type { Option, Optgroup } from 'slim-select/dist/store'
import type { DsLanguage } from '@global'
import { i18nDsSelect } from './select.i18n'
import { SelectOption, SelectOptionGroup } from './select.interfaces'

export function buildSlimData(
  options: SelectOption[],
  optionGroups: SelectOptionGroup[],
  placeholder: string,
  value: string | string[] | null,
): (Partial<Option> | Partial<Optgroup>)[] {
  const selected = Array.isArray(value) ? value : value ? [value] : []
  const data: (Partial<Option> | Partial<Optgroup>)[] = []
  data.push({ text: placeholder || '', placeholder: true } as Partial<Option>)

  if (optionGroups.length > 0) {
    data.push(
      ...optionGroups.map(group => ({
        label: group.label,
        options: group.options.map(opt => ({
          text: opt.label,
          value: opt.value,
          disabled: !!opt.disabled,
          selected: selected.includes(opt.value),
        })),
      })),
    )
  } else {
    data.push(
      ...options.map(opt => ({
        text: opt.label,
        value: opt.value,
        disabled: !!opt.disabled,
        selected: selected.includes(opt.value),
      })),
    )
  }
  return data
}

export interface SelectPickerConfig {
  selectEl: HTMLSelectElement
  popupEl: HTMLDivElement
  shadowRoot: ShadowRoot
  triggerId: string
  language: DsLanguage
  placeholder: string
  searchable: boolean
  disabled: boolean
  readonly: boolean
  multiple: boolean
  clearable: boolean
  data: (Partial<Option> | Partial<Optgroup>)[]
  onChange: (selected: Option[]) => void
  onOpen: () => void
  onClose: () => void
}

const TYPEAHEAD_TIMEOUT_MS = 500

export class SelectPickerController {
  private slimSelect: SlimSelect | undefined
  private config: SelectPickerConfig
  private typeAheadBuffer = ''
  private typeAheadLastTime = 0

  constructor(config: SelectPickerConfig) {
    this.config = config
    this.init()
  }

  /**
   * PUBLIC API
   * ------------------------------------------------------
   */

  open() {
    this.slimSelect?.open()
  }

  close() {
    this.slimSelect?.close()
  }

  focus() {
    this.trigger?.focus()
  }

  blur() {
    this.trigger?.blur()
  }

  setData(data: (Partial<Option> | Partial<Optgroup>)[]) {
    this.slimSelect?.setData(data)
  }

  setSelected(value: string | string[]) {
    this.slimSelect?.setSelected(value)
  }

  setDisabled(disabled: boolean) {
    if (disabled) {
      this.slimSelect?.disable()
    } else {
      this.slimSelect?.enable()
    }
  }

  updateSearchPlaceholder(language: DsLanguage) {
    const searchInput = this.config.shadowRoot.querySelector<HTMLInputElement>('.ss-search input')
    if (searchInput) searchInput.placeholder = i18nDsSelect[language].searchPlaceholder
  }

  destroy() {
    this.slimSelect?.destroy()
    this.slimSelect = undefined
  }

  /**
   * PRIVATE
   * ------------------------------------------------------
   */

  private get trigger(): HTMLElement | null {
    return this.config.shadowRoot.querySelector<HTMLElement>('.ss-main')
  }

  private init() {
    const { selectEl, popupEl, language, searchable, placeholder, disabled, readonly, multiple, clearable, data } =
      this.config

    this.slimSelect = new SlimSelect({
      select: selectEl,
      settings: {
        contentLocation: popupEl,
        contentPosition: 'relative',
        searchHighlight: true,
        showSearch: searchable,
        focusSearch: searchable,
        searchPlaceholder: i18nDsSelect[language].searchPlaceholder,
        searchText: i18nDsSelect[language].noResults,
        placeholderText: placeholder || ' ',
        disabled: disabled || readonly,
        closeOnSelect: !multiple,
        allowDeselect: clearable,
        modal: 'off',
      },
      data,
      events: {
        afterChange: (newVal: Option[]) => this.config.onChange(newVal),
        afterOpen: () => {
          this.highlightFirstOption()
          this.config.onOpen()
        },
        afterClose: () => this.config.onClose(),
      },
    })

    this.connectLabelToTrigger()
    this.fixSearchListener()
    this.fixKeyboardOpen()
    this.fixOptionFocus()
    this.fixTypeAhead()
    this.highlightFirstOption()
  }

  // slim-select never auto-highlights an option: arrow keys are the only built-in trigger.
  // We want the first matching option highlighted whenever the list opens or a search
  // narrows the results, so keyboard users can immediately Enter/Space it. Skip it if
  // something is already highlighted (e.g. from a previous arrow-key navigation).
  private highlightFirstOption() {
    if (this.config.popupEl.querySelector('.ss-highlighted')) return
    this.slimSelect?.render.highlight('down')
  }

  // Shadow DOM event retargeting makes e.target null inside slim-select's keyup handler.
  // Intercept during capture phase (before slim-select's bubble listener), stop propagation,
  // and drive the search programmatically from the element reference instead.
  private fixSearchListener() {
    if (!this.config.searchable) return
    const searchInput = this.config.shadowRoot.querySelector<HTMLInputElement>('.ss-search input')
    if (!searchInput) return
    searchInput.addEventListener(
      'input',
      ev => {
        ev.stopImmediatePropagation()
        this.slimSelect?.search(searchInput.value ?? '')
        this.highlightFirstOption()
      },
      { capture: true },
    )
  }

  // SlimSelect's Space/Enter listener uses document.activeElement to find its trigger,
  // but Shadow DOM retargeting returns the host element instead of .ss-main after a
  // programmatic focus() call — so Space stops working after the first selection.
  // We intercept keydown on the trigger directly to reopen the dropdown ourselves.
  private fixKeyboardOpen() {
    const trigger = this.trigger
    if (!trigger) return
    trigger.addEventListener('keydown', ev => {
      const target = ev.target as HTMLElement
      if (
        (ev.key === ' ' || ev.key === 'Enter') &&
        target === trigger &&
        !target.classList.contains('ss-value-delete') &&
        !trigger.classList.contains('ss-open')
      ) {
        ev.preventDefault()
        this.slimSelect?.open()
      }
    })
  }

  // Options are plain non-focusable divs, so a mouse click's mousedown phase makes the
  // browser blur .ss-main by default (before slim-select's own click handler ever runs).
  // Arrow-key navigation is wired to .ss-main's keydown, so once it loses focus keyboard
  // navigation silently breaks — and for multiple selects (closeOnSelect: false) slim-select
  // never re-focuses .ss-main afterwards, since it only does so on close. Prevent the browser's
  // default focus-shift at the source so .ss-main simply never loses focus during option clicks.
  private fixOptionFocus() {
    this.config.popupEl.addEventListener(
      'mousedown',
      ev => {
        const target = ev.target as HTMLElement
        if (target.closest('.ss-option')) ev.preventDefault()
      },
      { capture: true },
    )
  }

  // Non-searchable selects have no way to jump to an option by typing, unlike a native
  // <select> which supports "hidden" keyboard search: typing a letter jumps to the first
  // option starting with it, and repeating the same letter cycles through matches. We
  // replicate that here — highlighting the match while open, or selecting it directly
  // when closed — since slim-select itself doesn't offer this for non-searchable mode.
  private fixTypeAhead() {
    if (this.config.searchable) return
    const trigger = this.trigger
    if (!trigger) return
    trigger.addEventListener('keydown', ev => this.handleTypeAhead(ev))
  }

  private handleTypeAhead(ev: KeyboardEvent) {
    const key = ev.key
    if (key.length !== 1 || key === ' ' || ev.ctrlKey || ev.metaKey || ev.altKey) return

    const render = this.slimSelect?.render
    if (!render) return

    const now = Date.now()
    const withinTimeout = now - this.typeAheadLastTime <= TYPEAHEAD_TIMEOUT_MS
    this.typeAheadLastTime = now

    const isRepeat = withinTimeout && this.typeAheadBuffer.length > 0 && [...this.typeAheadBuffer].every(c => c === key)
    this.typeAheadBuffer = withinTimeout ? this.typeAheadBuffer + key : key

    const options = render.getOptions(true, true, true)
    if (options.length === 0) return

    const highlightedClass = render.classes.getFirst('highlighted')
    const highlighted = this.config.popupEl.querySelector<HTMLDivElement>(`.${highlightedClass}`)
    const startIndex = highlighted ? options.indexOf(highlighted) : -1

    const match = isRepeat
      ? this.findNextTypeAheadMatch(options, key, startIndex)
      : options.find(o => this.optionText(o).startsWith(this.typeAheadBuffer.toLowerCase()))
    if (!match) return

    ev.preventDefault()
    const isOpen = render.content.main.classList.contains(render.classes.getFirst('contentOpen'))
    if (isOpen) {
      this.setHighlightedOption(match)
    } else {
      match.click()
    }
  }

  private findNextTypeAheadMatch(
    options: HTMLDivElement[],
    char: string,
    startIndex: number,
  ): HTMLDivElement | undefined {
    const lower = char.toLowerCase()
    const matches = options.filter(o => this.optionText(o).startsWith(lower))
    if (matches.length === 0) return undefined
    return matches.find(o => options.indexOf(o) > startIndex) ?? matches[0]
  }

  private optionText(option: HTMLDivElement): string {
    return (option.textContent ?? '').trim().toLowerCase()
  }

  private setHighlightedOption(target: HTMLDivElement) {
    const render = this.slimSelect?.render
    if (!render) return
    const highlightedClass = render.classes.highlighted
    const current = this.config.popupEl.querySelector<HTMLElement>(`.${render.classes.getFirst('highlighted')}`)
    if (current && current !== target) render.removeClasses(current, highlightedClass)
    render.addClasses(target, highlightedClass)
    render.ensureElementInView(render.content.list, target)
    if (target.id) render.main.main.setAttribute('aria-activedescendant', target.id)
  }

  private connectLabelToTrigger() {
    const ssMain = this.trigger
    if (ssMain) {
      ssMain.id = this.config.triggerId
      ssMain.setAttribute('aria-labelledby', 'label')
      ssMain.removeAttribute('aria-label')
    }

    // <label for="..."> only focuses native labelable elements; .ss-main is a div,
    // so the browser ignores the for/id link. Wire it manually.
    const label = this.config.shadowRoot.querySelector<HTMLLabelElement>('label')
    if (label && ssMain) {
      label.addEventListener('click', ev => {
        ev.preventDefault()
        ssMain.focus()
      })
    }
  }
}
