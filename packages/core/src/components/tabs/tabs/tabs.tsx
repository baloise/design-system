import { Component, Element, Event, EventEmitter, h, Host, Listen, Method, Prop, State } from '@stencil/core'
import { HTMLStencilElement } from '@stencil/core/internal'
import {
  Logger,
  type LogInstance,
  stopEventBubbling,
  ValidateEmptyOrType,
  ValidateEmptyOrOneOf,
  setupValidation,
} from '@utils'
import {
  DsComponentInterface,
  DsConfigObserver,
  DsConfigState,
  DsLanguage,
  DsRegion,
  ListenToConfig,
  defaultConfig,
} from '@global'
import { TabsChangeDetail, TABS_VERTICAL_COL_SIZES, TabsVerticalColSize } from '../tabs.interfaces'
import { i18nDsTabs } from './tabs.i18n'

/**
 * Tabs coordinates ds-tab and ds-tab-panel children into an accessible tabbed interface, supporting panels and navigation variants.
 *
 * @slot - ds-tab-panel children (panels variant).
 * @slot tab - ds-tab children; managed automatically by ds-tabs.
 * @part tablist - The tablist container.
 */
@Component({
  tag: 'ds-tabs',
  styleUrl: 'tabs.host.scss',
  shadow: true,
})
export class Tabs implements DsComponentInterface, DsConfigObserver {
  log!: LogInstance

  @Logger('tabs')
  createLogger(log: LogInstance) {
    this.log = log
  }

  @Element() el!: HTMLStencilElement

  @State() language: DsLanguage = defaultConfig.language
  @State() region: DsRegion = defaultConfig.region

  /**
   * If `true`, tab buttons expand to fill the available width equally.
   */
  @Prop()
  @ValidateEmptyOrType('boolean')
  readonly fullwidth: boolean = false

  /**
   * If `true`, the component adapts for use on a dark (primary) background — all labels and the indicator become white.
   */
  @Prop()
  @ValidateEmptyOrType('boolean')
  readonly inverted: boolean = false

  /**
   * Accessible label for the navigation landmark (navigation variant only).
   */
  @Prop()
  @ValidateEmptyOrType('string')
  readonly label: string = ''

  /**
   * The `name` of the currently selected ds-tab (panels variant).
   */
  @Prop({ mutable: true, reflect: true })
  @ValidateEmptyOrType('string')
  value?: string | null

  /**
   * If `true`, the tablist is displayed vertically on the left side.
   */
  @Prop()
  @ValidateEmptyOrType('boolean')
  readonly vertical: boolean = false

  /**
   * The col size of the tablist in vertical mode.
   */
  @Prop()
  @ValidateEmptyOrOneOf(...TABS_VERTICAL_COL_SIZES)
  readonly verticalColSize: TabsVerticalColSize = 'one-third'

  /**
   * Emitted when the selected tab changes (panels variant only).
   */
  @Event() dsChange!: EventEmitter<TabsChangeDetail>

  /**
   * @internal define config for the component
   */
  @Method()
  @ListenToConfig()
  async configChanged(state: DsConfigState): Promise<void> {
    this.language = state.language
    this.region = state.region
  }

  @State() private canScrollLeft = false
  @State() private canScrollRight = false

  private tablistEl?: HTMLElement
  private indicatorEl?: HTMLElement
  private resizeObserver?: ResizeObserver

  /**
   * PUBLIC PROPERTY API — see @Prop() declarations above
   * ------------------------------------------------------
   */

  /**
   * LIFECYCLE
   * ------------------------------------------------------
   */

  connectedCallback() {
    setupValidation(this)
  }

  componentWillUpdate() {
    setupValidation(this)
  }

  componentDidLoad() {
    this.setup()
    this.initCarousel()
    requestAnimationFrame(() => this.moveIndicator(false))
  }

  componentDidUpdate() {
    this.updateChildren()
    this.checkOverflow()
    this.moveIndicator(true)
  }

  disconnectedCallback() {
    this.resizeObserver?.disconnect()
    this.tablistEl?.removeEventListener('scroll', this.checkOverflow)
  }

  /**
   * PROPERTY VALIDATION
   * ------------------------------------------------------
   */

  // Validation is handled by @Validate decorators via setupValidation(this)

  /**
   * PUBLIC LISTENERS
   * ------------------------------------------------------
   */

  @Listen('dsTabSelect')
  listenToDsTabSelect(ev: CustomEvent<{ name: string }>) {
    stopEventBubbling(ev)
    this.activateTab(ev.detail.name)
  }

  /**
   * PRIVATE METHODS
   * ------------------------------------------------------
   */

  private getTabs(): HTMLDsTabElement[] {
    return Array.from(this.el.querySelectorAll<HTMLDsTabElement>(':scope > ds-tab'))
  }

  private getPanels(): HTMLDsTabPanelElement[] {
    return Array.from(this.el.querySelectorAll<HTMLDsTabPanelElement>(':scope > ds-tab-panel'))
  }

  private isNavigation(): boolean {
    return this.getPanels().length === 0
  }

  private setup() {
    const tabs = this.getTabs()
    const panels = this.getPanels()
    const isNav = this.isNavigation()

    tabs.forEach(tab => {
      // Place ds-tab into the named tablist slot
      tab.slot = 'tab'
      tab.navigation = isNav

      if (!isNav && tab.name) {
        if (!tab.id) tab.id = `ds-tab-${tabIds++}`
        const panel = panels.find(p => p.for === tab.name)
        if (panel) {
          if (!panel.id) panel.id = `ds-tab-panel-${tabIds++}`
          tab.setAttribute('aria-controls', panel.id)
          panel.setAttribute('aria-labelledby', tab.id)
        }
      }
    })

    if (!isNav && !this.value) {
      const first = tabs[0]
      if (first) this.value = first.name
    }

    this.updateChildren()
  }

  private updateChildren() {
    const isNav = this.isNavigation()

    this.getTabs().forEach(tab => {
      tab.navigation = isNav
      tab.fullwidth = this.fullwidth
      tab.inverted = this.inverted
      tab.selected = isNav ? !!tab.querySelector('[aria-current]') : tab.name === this.value
      tab.vertical = this.vertical
    })

    this.getPanels().forEach(panel => {
      panel.selected = panel.for === this.value
    })
  }

  private activateTab(name: string) {
    if (name === this.value) return
    this.value = name
    this.dsChange.emit({ value: name })
    this.focusSelectedTab()
  }

  private focusSelectedTab() {
    const selected = this.getTabs().find(t => t.name === this.value)
    if (!selected) return
    selected.focus()
    selected.scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: 'smooth' })
  }

  private initCarousel() {
    if (this.vertical || !this.tablistEl) return
    this.tablistEl.addEventListener('scroll', this.checkOverflow, { passive: true })
    this.resizeObserver = new ResizeObserver(this.checkOverflow)
    this.resizeObserver.observe(this.tablistEl)
    this.checkOverflow()
  }

  private checkOverflow = () => {
    const el = this.tablistEl
    if (!el) return
    this.canScrollLeft = el.scrollLeft > 0
    this.canScrollRight = el.scrollLeft + el.clientWidth < el.scrollWidth - 1
  }

  private moveIndicator(animate: boolean) {
    const indicator = this.indicatorEl
    const tablist = this.tablistEl
    if (!indicator || !tablist || this.isNavigation()) return

    const selected = this.getTabs().find(t => t.name === this.value)
    if (!selected) {
      indicator.style[this.vertical ? 'height' : 'width'] = '0px'
      return
    }

    // offsetLeft/offsetTop of slotted elements is relative to the shadow host, not
    // #tablist. Use getBoundingClientRect() to get the position relative to #tablist's
    // visible area, then add scroll offset to convert to the scrollable coordinate space.
    const tablistRect = tablist.getBoundingClientRect()
    const selectedRect = selected.getBoundingClientRect()

    if (!animate) indicator.style.transition = 'none'

    if (this.vertical) {
      const top = selectedRect.top - tablistRect.top + tablist.scrollTop
      indicator.style.height = `${selectedRect.height}px`
      indicator.style.transform = `translateY(${top}px)`
    } else {
      const left = selectedRect.left - tablistRect.left + tablist.scrollLeft
      indicator.style.width = `${selectedRect.width}px`
      indicator.style.transform = `translateX(${left}px)`
    }

    if (!animate) {
      void indicator.offsetWidth // force reflow so transition:none takes effect
      indicator.style.transition = ''
    }
  }

  private scrollPrev = () => {
    const el = this.tablistEl
    if (el) el.scrollBy({ left: -(el.clientWidth / 2), behavior: 'smooth' })
  }

  private scrollNext = () => {
    const el = this.tablistEl
    if (el) el.scrollBy({ left: el.clientWidth / 2, behavior: 'smooth' })
  }

  private handleKeyDown = (ev: KeyboardEvent) => {
    if (this.isNavigation()) return
    const focusable = this.getTabs()
    const currentIndex = focusable.findIndex(t => t.name === this.value)

    const isForward = this.vertical ? ev.key === 'ArrowDown' : ev.key === 'ArrowRight'
    const isBackward = this.vertical ? ev.key === 'ArrowUp' : ev.key === 'ArrowLeft'

    if (ev.key === 'Home') {
      ev.preventDefault()
      this.activateTab(focusable[0]?.name)
    } else if (ev.key === 'End') {
      ev.preventDefault()
      this.activateTab(focusable[focusable.length - 1]?.name)
    } else if (isForward) {
      ev.preventDefault()
      this.activateTab(focusable[(currentIndex + 1) % focusable.length]?.name)
    } else if (isBackward) {
      ev.preventDefault()
      this.activateTab(focusable[(currentIndex - 1 + focusable.length) % focusable.length]?.name)
    }
  }

  private handleSlotChange = () => {
    this.setup()
  }

  /**
   * RENDER
   * ------------------------------------------------------
   */

  render() {
    const isNav = this.isNavigation()

    const tablistDiv = (
      <div
        id="tablist"
        part="tablist"
        role={isNav ? undefined : 'tablist'}
        aria-orientation={!isNav && this.vertical ? 'vertical' : undefined}
        onKeyDown={this.handleKeyDown}
        ref={el => {
          this.tablistEl = el as HTMLElement
        }}
      >
        <slot name="tab" onSlotchange={this.handleSlotChange} />
        <div
          class="indicator"
          aria-hidden="true"
          ref={el => {
            this.indicatorEl = el as HTMLElement
          }}
        />
      </div>
    )

    const i18n = i18nDsTabs[this.language]

    const tablistContainer = this.vertical ? (
      tablistDiv
    ) : (
      <div class="tablist-outer">
        <button
          class="scroll-btn scroll-btn--prev"
          aria-label={i18n.scrollLeft}
          aria-hidden="true"
          tabIndex={-1}
          onClick={this.scrollPrev}
        >
          <ds-icon name="caret-left" size="sm" />
        </button>
        {tablistDiv}
        <button
          class="scroll-btn scroll-btn--next"
          aria-label={i18n.scrollRight}
          aria-hidden="true"
          tabIndex={-1}
          onClick={this.scrollNext}
        >
          <ds-icon name="caret-right" size="sm" />
        </button>
      </div>
    )

    return (
      <Host
        class={{
          'is-fullwidth': this.fullwidth,
          'is-inverted': this.inverted,
          'is-vertical': this.vertical,
          [`is-col-${this.verticalColSize}`]: this.vertical,
          'is-navigation': isNav,
          'has-overflow': this.canScrollLeft || this.canScrollRight,
          'can-scroll-left': this.canScrollLeft,
          'can-scroll-right': this.canScrollRight,
        }}
      >
        {isNav ? <nav aria-label={this.label || undefined}>{tablistContainer}</nav> : tablistContainer}
        <slot onSlotchange={this.handleSlotChange} />
      </Host>
    )
  }
}

let tabIds = 0
