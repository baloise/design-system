import {
  Component,
  Host,
  h,
  Element,
  State,
  Event,
  EventEmitter,
  Method,
  Prop,
  Watch,
  ComponentInterface,
} from '@stencil/core'
import { areArraysEqual } from '../../utils/array'
import {
  debounce,
  debounceEvent,
  deepReady,
  hasParent,
  isChildOfEventTarget,
  isDescendant,
  raf,
  rLCP,
  transitionEndAsync,
  waitAfterFramePaint,
} from '../../utils/helpers'
import { BalTabOption } from './bal-tab.type'
import { BalConfigObserver, BalConfigState, ListenToConfig } from '../../utils/config'
import { BEM } from '../../utils/bem'
import { Loggable, Logger, LogInstance } from '../../utils/log'
import { newBalTabOption } from './bal-tab.util'
import { stopEventBubbling } from '../../utils/form-input'
import { TabSelect } from './components/tab-select'
import { getComputedPadding, Padding } from '../../utils/style'
import { BalBreakpointObserver, BalBreakpoints, ListenToBreakpoints, balBreakpoints } from '../../utils/breakpoints'
import { BalMutationObserver, ListenToMutation } from '../../utils/mutation'
import { AccordionState } from '../../interfaces'
import { BalResizeObserver, ListenToResize } from '../../utils/resize'
import { TabNav } from './components/tab-nav'
import { toKebabCase } from '../../utils/string'
import { ListenTo } from '../../utils/listen'

@Component({
  tag: 'bal-tabs',
  styleUrl: 'bal-tabs.sass',
})
export class Tabs
  implements
    ComponentInterface,
    Loggable,
    BalConfigObserver,
    BalMutationObserver,
    BalBreakpointObserver,
    BalResizeObserver
{
  private contentEl: HTMLDivElement | undefined
  private contentElWrapper: HTMLDivElement | undefined

  private tabsId = `bal-tabs-${TabsIds++}`
  private currentRaf: number | undefined

  @Element() el!: HTMLElement

  @State() isAccordionOpen = false
  @State() accordionState: AccordionState = AccordionState.Collapsed

  @State() isNavbarOpen = false
  @State() inNavbar = false
  @State() inNavbarLight = false

  @State() isLargestContentfulPaintDone = false
  @State() isMobile = balBreakpoints.isMobile
  @State() isTablet = balBreakpoints.isTablet

  @State() store: BalTabOption[] = []
  @State() animated = true

  log!: LogInstance

  @Logger('bal-tabs')
  createLogger(log: LogInstance) {
    this.log = log
  }

  /**
   * PUBLIC PROPERTY API
   * ------------------------------------------------------
   */

  /**
   * @deprecated Defines the layout of the tabs. Right only works from the breakpoint
   * high-definition and beyond.
   */
  @Prop() float: BalProps.BalTabsFloat = 'left'

  /**
   * If `true` the tabs is a block element and uses 100% of the width
   */
  @Prop() fullwidth = false

  /**
   * If `true` the tab items can be open and closed
   */
  @Prop() accordion = false

  /**
   * If `true` the tabs have a carousel if they need more space than provided.
   */
  @Prop() overflow = true

  /**
   * Tabs can be passed as a property or through HTML markup.
   */
  @Prop() options: BalTabOption[] = []

  @Watch('options')
  protected async optionChanged() {
    this.onOptionChange()
    this.mutationObserverActive = this.options === undefined
  }

  /**
   * Defines the layout of the tabs.
   */
  @Prop() context?: BalProps.BalTabsContext

  /**
   * Defines the layout of the tabs.
   */
  @Prop() iconPosition: BalProps.BalTabsIconPosition = 'horizontal'

  /**
   * Defines the aria label of the nav element
   */
  @Prop() ariaNavLabel = ''

  /**
   * If `true` the field expands over the whole width.
   */
  @Prop() expanded = false

  /**
   * If `true` the tabs container does not have a padding left or right.
   */
  @Prop() spaceless = false

  /**
   * If `true` the tabs or tabs can be clicked.
   */
  @Prop() clickable = true

  /**
   * If `true` a light border is shown for the tabs.
   */
  @Prop() border = false

  /**
   * If `true` the tabs can be uses on dark background
   */
  @Prop() inverted = false

  /**
   * If `true` the tabs selected line is optional
   */
  @Prop() optionalTabSelection = false

  /**
   * Set the amount of time, in milliseconds, to wait to trigger the `balChange` event after each keystroke. This also impacts form bindings such as `ngModel` or `v-model`.
   */
  @Prop() debounce = 0

  @Watch('debounce')
  protected debounceChanged() {
    this.balChange = debounceEvent(this.balChange, this.debounce)
  }

  /**
   * If `true` tabs are align vertically.
   */
  @Prop() vertical: BalProps.BalTabsVertical = false

  /**
   * The col size of the tabs on vertical mode.
   */
  @Prop() verticalColSize: BalProps.BalTabsColSize = 'one-third'

  /**
   * If `true` the tabs are shown as a select component on mobile
   */
  @Prop() selectOnMobile = false

  @Prop({ mutable: true }) value?: string = undefined

  /**
   * If `true` then  isTabList becomes true even if there is a link in the list.
   */
  @Prop() handleAsTabList = false

  @Watch('value')
  protected async valueChanged(newValue?: string, oldValue?: string) {
    if (newValue !== oldValue) {
      this.onOptionChange()
    }
  }

  /**
   * Emitted when the changes has finished.
   */
  @Event() balChange!: EventEmitter<BalEvents.BalTabsChangeDetail>

  /**
   * Emitted before the animation starts
   */
  @Event() balWillAnimate!: EventEmitter<BalEvents.BalTabsWillAnimateDetail>

  /**
   * Emitted after the animation has finished
   */
  @Event() balDidAnimate!: EventEmitter<BalEvents.BalTabsDidAnimateDetail>

  /**
   * LIFECYCLE
   * ------------------------------------------------------
   */

  connectedCallback() {
    this.inNavbar = hasParent('bal-navbar', this.el)
    if (this.inNavbar) {
      const parentNavbar = this.el.closest('bal-navbar')
      if (parentNavbar) {
        this.inNavbarLight = parentNavbar.light
      }
    }
    this.debounceChanged()
    this.mutationObserverActive = this.options === undefined || this.options.length < 1

    if (this.accordion) {
      const inNavMenuBar = hasParent('bal-nav-menu-bar', this.el)
      if (inNavMenuBar) {
        this.isAccordionOpen = false
      } else {
        const isAccordionOpen = this.value !== undefined && this.value.length > 0
        if (isAccordionOpen) {
          this.expandAccordion(true)
        } else {
          this.collapseAccordion(true)
        }
      }
    }
  }

  componentDidLoad() {
    rLCP(() => {
      this.onOptionChange()
      this.isLargestContentfulPaintDone = true
    })
  }

  /**
   * LISTENERS
   * ------------------------------------------------------
   */

  mutationObserverActive = true

  @ListenToMutation({ tags: ['bal-tabs', 'bal-tab-item'] })
  mutationListener(): void {
    this.onOptionChange()
  }

  @ListenToBreakpoints()
  breakpointListener(breakpoints: BalBreakpoints): void {
    this.isMobile = breakpoints.mobile
    this.isTablet = breakpoints.tablet
    this.animateLine()
  }

  @ListenToResize()
  resizeListener() {
    this.animateLine()
  }

  @ListenTo('balWillAnimate', { target: 'window' })
  listenToWillAnimate(ev: UIEvent) {
    isChildOfEventTarget(ev, this.el, () => this.animateLine())
  }

  @ListenTo('balDidAnimate', { target: 'window' })
  listenToDidAnimate(ev: UIEvent) {
    isChildOfEventTarget(ev, this.el, () => this.animateLine())
    this.isUsedInNavbar(ev)
  }

  @ListenTo('keydown')
  listenToKeyDown(ev: KeyboardEvent) {
    if (this.isTabList) {
      if (this.vertical !== false) {
        if (ev.code === 'ArrowDown') {
          this.tabListSelectNext(ev)
        } else if (ev.code === 'ArrowUp') {
          this.tabListSelectPrevious(ev)
        }
      } else {
        if (ev.code === 'ArrowRight') {
          this.tabListSelectNext(ev)
        } else if (ev.code === 'ArrowLeft') {
          this.tabListSelectPrevious(ev)
        }
      }
    }
  }

  isUsedInNavbar(ev: UIEvent) {
    const target = ev.target as HTMLElement
    const parentNavbar = target.closest('bal-navbar')
    const isNavbarOpen = ev.target as any | false
    if (parentNavbar && isDescendant(parentNavbar, this.el)) {
      this.isNavbarOpen = isNavbarOpen
    }
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
  async configChanged(state: BalConfigState) {
    this.animated = state.animated
  }

  /**
   * Go to tab with the given value
   */
  @Method()
  async select(tab: BalTabOption) {
    this.value = tab.value
  }

  /**
   * Find the options properties by its value
   */
  @Method()
  async getOptionByValue(value: string) {
    const options = this.store
    return options.find(option => option.value === value)
  }

  /**
   * @internal
   * Rerenders the line to mark the active tab.
   */
  @Method()
  async renderLine() {
    this.animateLine()
  }

  /**
   * @internal
   * Closes the accordion
   */
  @Method()
  async closeAccordion() {
    if (this.isAccordionOpen) {
      this.collapseAccordion()
    }
  }

  /**
   * PRIVATE METHODS
   * ------------------------------------------------------
   */

  /**
   * Tells if the component acts as a tab or link list.
   * If only one link is in the list and handleAsTabList has been set to false it will be a link list
   */
  private get isTabList(): boolean {
    return this.store.filter(tab => !!tab.href).length === 0 || this.handleAsTabList
  }

  private get items(): HTMLBalTabItemElement[] {
    return Array.from(this.el.querySelectorAll(`#${this.tabsId} > bal-tab-item`))
  }

  private getOptions = () => {
    if (this.options.length > 0) {
      return [...this.options.map(newBalTabOption)]
    } else {
      return Promise.all(this.items.map(value => value.getOptions()))
    }
  }

  private updateStore = (newStore: BalTabOption[]) => {
    if (!areArraysEqual(this.store, newStore)) {
      this.store = newStore
    } else if (!this.optionalTabSelection && !this.accordion && this.value === undefined && this.store.length > 0) {
      const firstTab = this.store[0]
      this.value = firstTab.value
    }
  }

  private setActiveItem = () => {
    const activeTabs = this.store.filter(t => t.active)
    if (activeTabs.length > 0) {
      const firstActiveTab = activeTabs[0]
      this.value = firstActiveTab.value
    }
  }

  private setActiveContent = () => {
    if (this.options.length === 0) {
      this.items.forEach(item => item.setActive(this.isTabActive(item)))
    }
  }

  private isTabActive(tab: BalTabOption): boolean {
    return tab.value === this.value
  }

  private isTabVisible(tab: BalTabOption): boolean {
    return !tab.hidden
  }

  private parseVertical(): boolean {
    if ((this.vertical as any) === 'true' || (this.vertical as any) === '') {
      return true
    }
    if ((this.vertical as any) === 'false' || (this.vertical as any) === undefined) {
      return false
    }
    if (this.vertical === 'mobile') {
      return this.isMobile
    }

    if (this.vertical === 'tablet') {
      return this.isTablet || this.isMobile
    }

    return this.vertical
  }

  private isVertical(): boolean {
    const isVertical = this.parseVertical()
    const isMobile = this.isMobile
    const isTablet = this.isTablet
    const isTouch = isMobile || isTablet

    return isVertical || (isTouch && this.inNavbar)
  }

  private getTargetElement(value?: string) {
    const selector = `[data-tabs="${this.tabsId}"]`
    const elements = Array.from(this.el.querySelectorAll(selector)) as HTMLElement[]
    return elements.filter(element => element.getAttribute('data-value') == value)[0]
  }

  private getLineElement(): HTMLElement | null {
    return this.el.querySelector(`#${this.tabsId}-line`)
  }

  private getBorderElement(): HTMLElement | null {
    return this.el.querySelector(`#${this.tabsId}-border`)
  }

  private getCarouselElement(): HTMLElement | null {
    return this.el.querySelector(`#${this.tabsId}-carousel`)
  }

  private getLineSize = (element: HTMLElement, padding: Padding) => {
    if (element) {
      const isVertical = this.isVertical()

      if (isVertical) {
        return element.clientHeight
      } else {
        const clientWidth = element.clientWidth

        if (this.expanded) {
          return clientWidth
        }

        const paddingX = padding.left + padding.right
        return clientWidth - paddingX
      }
    }
    return 0
  }

  private getOffset = (element: HTMLElement, padding: Padding) => {
    const isVertical = this.isVertical()

    if (isVertical) {
      if (element.offsetTop) {
        return element.offsetTop
      }
    } else {
      if (element.offsetLeft) {
        if (this.expanded) {
          return element.offsetLeft
        }

        return element.offsetLeft + padding.left
      }

      const carouselItem = element.closest('bal-carousel-item')
      if (carouselItem) {
        if (this.expanded) {
          return carouselItem.offsetLeft
        }
        return carouselItem.offsetLeft + padding.left
      }
    }

    return 0
  }

  private animateLine = async () => {
    if (!this.shouldAnimate()) {
      return
    }

    if (this.currentRaf !== undefined) {
      cancelAnimationFrame(this.currentRaf)
    }

    raf(async () => {
      await deepReady(this.el, true)

      this.currentRaf = raf(async () => {
        const target = this.getTargetElement(this.value)
        if (!target) {
          return
        }

        if (target.getAttribute('target') === '_blank') {
          return
        }

        const padding = getComputedPadding(target)
        const size = this.getLineSize(target, padding)
        const offset = this.getOffset(target, padding)

        const lineElement = this.getLineElement()
        if (lineElement) {
          const isVertical = this.isVertical()
          this.balWillAnimate.emit(this.value)
          const waitForTransition = transitionEndAsync(lineElement, 300)

          if (isVertical) {
            lineElement.style.setProperty('transform', `translateY(${offset}px)`)
            lineElement.style.setProperty('min-height', `${size}px`)
            lineElement.style.setProperty('height', `${size}px`)
            lineElement.style.removeProperty('min-width')
            lineElement.style.removeProperty('width')
          } else {
            lineElement.style.setProperty('transform', `translateX(${offset}px)`)
            lineElement.style.setProperty('min-width', `${size}px`)
            lineElement.style.setProperty('width', `${size}px`)
            lineElement.style.removeProperty('min-height')
            lineElement.style.removeProperty('height')

            const borderElement = this.getBorderElement()
            const carouselElement = this.getCarouselElement()
            if (borderElement && carouselElement) {
              const containerMaxWidth = carouselElement.clientWidth
              borderElement.style.setProperty('width', `${containerMaxWidth}px`)
            }

            await waitForTransition
            this.balDidAnimate.emit(this.value)
          }
        }
      })
    })
  }

  private toggleAccordionState = (initialUpdate = false) => {
    if (this.accordion) {
      if (this.isAccordionOpen) {
        this.collapseAccordion(initialUpdate)
      } else {
        this.expandAccordion(initialUpdate)
      }
    }
  }

  private expandAccordion = (initialUpdate = false) => {
    this.isAccordionOpen = true

    const { contentEl, contentElWrapper } = this
    if (initialUpdate || contentEl === undefined || contentElWrapper === undefined) {
      this.accordionState = AccordionState.Expanded
      return
    }

    if (this.accordionState === AccordionState.Expanded) {
      return
    }

    if (this.currentRaf !== undefined) {
      cancelAnimationFrame(this.currentRaf)
    }

    if (this.shouldAnimate()) {
      raf(() => {
        this.accordionState = AccordionState.Expanding

        this.currentRaf = raf(async () => {
          const contentHeight = contentElWrapper.offsetHeight
          const waitForTransition = transitionEndAsync(contentEl, 300)
          contentEl.style.setProperty('max-height', `${contentHeight}px`)
          this.balWillAnimate.emit(this.value)

          await waitForTransition

          this.accordionState = AccordionState.Expanded
          contentEl.style.removeProperty('max-height')
          this.balDidAnimate.emit(this.value)
        })
      })
    } else {
      this.accordionState = AccordionState.Expanded
      this.balWillAnimate.emit(this.value)
      this.balDidAnimate.emit(this.value)
    }
  }

  private collapseAccordion = (initialUpdate = false) => {
    this.isAccordionOpen = false

    const { contentEl } = this
    if (initialUpdate || contentEl === undefined) {
      this.accordionState = AccordionState.Collapsed
      return
    }

    if (this.accordionState === AccordionState.Collapsed) {
      return
    }

    if (this.currentRaf !== undefined) {
      cancelAnimationFrame(this.currentRaf)
    }

    if (this.shouldAnimate()) {
      this.currentRaf = raf(async () => {
        const contentHeight = contentEl.offsetHeight
        contentEl.style.setProperty('max-height', `${contentHeight}px`)

        raf(async () => {
          const waitForTransition = transitionEndAsync(contentEl, 300)
          this.accordionState = AccordionState.Collapsing
          this.balWillAnimate.emit(this.value)

          await waitForTransition

          this.accordionState = AccordionState.Collapsed
          contentEl.style.removeProperty('max-height')
          this.balDidAnimate.emit(this.value)
        })
      })
    } else {
      this.accordionState = AccordionState.Collapsed
      this.balWillAnimate.emit(this.value)
      this.balDidAnimate.emit(this.value)
    }
  }

  private shouldAnimate = () => {
    if (typeof (window as any) === 'undefined') {
      return false
    }

    return this.animated
  }

  /**
   * PRIVATE Tab Navigation with Arrow Keys
   * ------------------------------------------------------
   */

  private findNextTab(previous = false): BalTabOption | undefined {
    const indexOfActive = this.store.findIndex(t => this.isTabActive(t))
    let tabs = this.store.map((tab, index) => ({
      index,
      visible: !tab.hidden && !tab.disabled,
    }))

    if (previous) {
      tabs = tabs.reverse()
    }

    const visibleTabs = tabs.filter(t => t.visible).map(t => t.index)

    const findNextTabReducer = (acc: number, index: number) => {
      // found a new higher index need to break out
      if (acc > indexOfActive) {
        return acc
      }

      if (index <= acc) {
        return acc
      } else {
        return index
      }
    }

    const findPreviousTabReducer = (acc: number, index: number) => {
      // found a new lower index need to break out
      if (acc < indexOfActive) {
        return acc
      }

      if (index >= acc) {
        return acc
      } else {
        return index
      }
    }

    const reducer = previous ? findPreviousTabReducer : findNextTabReducer
    const nextIndex = visibleTabs.reduce((acc, value) => reducer(acc, value), indexOfActive)

    return this.store[nextIndex]
  }

  private findPreviousTab(): BalTabOption | undefined {
    return this.findNextTab(true)
  }

  private tabListSelectNext(ev: KeyboardEvent) {
    const nextTab = this.findNextTab()

    if (nextTab) {
      this.onSelectTab(ev, nextTab)
    }
  }

  private tabListSelectPrevious(ev: KeyboardEvent) {
    const previousTab = this.findPreviousTab()

    if (previousTab) {
      this.onSelectTab(ev, previousTab)
    }
  }

  async focus(tab: BalTabOption) {
    await waitAfterFramePaint()
    const hasKeyboardFocus = this.el.querySelector<HTMLButtonElement | HTMLAnchorElement>(`button.bal-focused, a.bal-focused`) !== null

    if (hasKeyboardFocus) {
      const tabEl = this.el.querySelector<HTMLButtonElement>(`#${this.tabsId}-button-${toKebabCase(tab.value)}`)
      if (tabEl) {
        tabEl.focus({ preventScroll: true })
      }
    }
  }

  /**
   * EVENT BINDING
   * ------------------------------------------------------
   */

  private onOptionChange = debounce(() => this.onOptionChangeInternal(), 100)

  private onOptionChangeInternal = async () => {
    if (this.isLargestContentfulPaintDone) {
      try {
        const options = await this.getOptions()
        this.updateStore(options)
        this.setActiveItem()
        this.setActiveContent()
        this.animateLine()
      } catch (e) {
        console.warn('[WARN] - Could not read tab options')
      }
    }
  }

  private onSelectTab = async (ev: Event, tab: BalTabOption) => {
    if (tab.prevent || tab.disabled || !this.clickable) {
      stopEventBubbling(ev)
    }

    if (!tab.disabled && this.clickable) {
      if (this.accordion) {
        if (tab.value === this.value) {
          this.toggleAccordionState()
        } else {
          this.expandAccordion()
        }
      }

      if (tab.navigate) {
        tab.navigate.emit(ev)
      }

      if (tab.value !== this.value) {
        this.balChange.emit(tab.value)
        await this.select(tab)
        await this.focus(tab)
      }
    }
  }

  /**
   * RENDER
   * ------------------------------------------------------
   */

  render() {
    const block = BEM.block('tabs')

    const isMobile = this.isMobile
    const isTablet = this.isTablet
    const isTouch = isMobile || isTablet

    const isInverted = (this.inNavbar && !isTouch && !this.inNavbarLight) || (!this.inNavbar && this.inverted)
    const isVertical = this.isVertical()
    const hasCarousel = this.isLargestContentfulPaintDone && !isVertical && this.overflow && !this.expanded

    const isSelect = this.isLargestContentfulPaintDone && isMobile && this.selectOnMobile

    const tabs = this.store.map(tab => ({ ...tab, active: tab.value === this.value }))

    const expanded = this.accordionState === AccordionState.Expanded || this.accordionState === AccordionState.Expanding
    const contentPart = expanded ? 'content expanded' : 'content'

    const valueExists = this.value !== undefined && !!this.store.find(o => o.value === this.value)

    const isLinkList = !this.isTabList

    return (
      <Host
        class={{
          ...block.class(),
          ...block.modifier('navbar').class(this.inNavbar),
          ...block.modifier('vertical').class(isVertical),
          ...block.modifier('fullwidth').class(this.expanded || this.fullwidth),
          ...block.modifier('accordion').class(this.accordion),
          ...block.modifier('animated').class(this.animated),
          ...block.modifier('expanding').class(this.accordionState === AccordionState.Expanding),
          ...block.modifier('expanded').class(this.accordionState === AccordionState.Expanded),
          ...block.modifier('collapsing').class(this.accordionState === AccordionState.Collapsing),
          ...block.modifier('collapsed').class(this.accordionState === AccordionState.Collapsed),
        }}
        data-value={this.store
          .filter(t => this.isTabActive(t))
          .map(t => t.value)
          .join(',')}
        data-label={this.store
          .filter(t => this.isTabActive(t))
          .map(t => t.label)
          .join(',')}
      >
        {isSelect ? (
          <TabSelect value={this.value} items={tabs} onSelectTab={this.onSelectTab}></TabSelect>
        ) : (
          <TabNav
            items={tabs}
            isLinkList={isLinkList}
            tabsId={this.tabsId}
            clickable={this.clickable}
            accordion={this.accordion}
            isAccordionOpen={this.isAccordionOpen}
            lineActive={valueExists}
            inverted={isInverted}
            animated={this.animated}
            context={this.context}
            border={this.border}
            spaceless={this.spaceless}
            expanded={this.expanded}
            isMobile={isMobile}
            isTouch={isTouch}
            isVertical={isVertical}
            inNavbar={this.inNavbar}
            hasCarousel={hasCarousel}
            iconPosition={this.iconPosition}
            verticalColSize={this.verticalColSize}
            ariaNavLabel={this.ariaNavLabel}
            onSelectTab={this.onSelectTab}
          ></TabNav>
        )}
        <div
          part={contentPart}
          ref={contentEl => (this.contentEl = contentEl)}
          class={{
            ...block.element('tabs').element('content').class(),
          }}
        >
          <div
            id={this.tabsId}
            class={{
              ...block.element('tabs').element('content').element('wrapper').class(),
            }}
            ref={contentElWrapper => (this.contentElWrapper = contentElWrapper)}
          >
            <slot></slot>
          </div>
        </div>
      </Host>
    )
  }
}

let TabsIds = 0
