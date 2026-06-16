import { Component, Element, Event, EventEmitter, h, Host, Method, Prop, State, Watch } from '@stencil/core'
import {
  DsBreakpointObserver,
  DsBreakpoints,
  ListenToBreakpoints,
  dsBreakpoints,
  Logger,
  type LogInstance,
  ValidateEmptyOrType,
  ValidateEmptyOrOneOf,
  setupValidation,
  ScrollHandler,
  FocusHandler,
  ListenToResize,
  type ResizeObserver,
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
import { HTMLStencilElement } from '@stencil/core/internal'
import { i18nDsNavbar } from './navbar.i18n'
import { NAVBAR_CONTAINERS, NavbarContainer } from './navbar.interfaces'

/**
 * Navbar provides semantic navigation with responsive sidebar menu and keyboard support.
 *
 * @slot brand - Logo or branding element (always visible)
 * @slot menu-start - Left navigation links (inline on desktop, in sidebar on mobile)
 * @slot menu-end - Right navigation links and action buttons (inline on desktop, in sidebar on mobile)
 * @part nav - The semantic navigation container
 * @part hamburger - The mobile hamburger button
 * @part sidebar - The mobile menu sidebar (aside element)
 */
@Component({
  tag: 'ds-navbar',
  styleUrl: 'navbar.host.scss',
  shadow: true,
})
export class Navbar implements DsComponentInterface, DsBreakpointObserver, DsConfigObserver, ResizeObserver {
  private navEl: HTMLElement | null = null
  private sidebarEl: HTMLElement | null = null
  private burgerButton: HTMLButtonElement | null = null
  private containerEl: HTMLDivElement | null = null

  private scrollHandler = new ScrollHandler()
  private focusHandler = new FocusHandler()
  private burgerModeThresholdWidth: number | null = null

  @State() language: DsLanguage = defaultConfig.language
  @State() region: DsRegion = defaultConfig.region

  @State() isTouch = dsBreakpoints.isTouch
  @State() isSidebarOpen = false
  @State() isOverflowing = false

  /**
   * PUBLIC PROPERTY API
   * ─────────────────────────────────────────────────────
   */

  log!: LogInstance

  @Logger('navbar')
  createLogger(log: LogInstance) {
    this.log = log
  }

  @Element() el!: HTMLStencilElement

  /**
   * If `true` the navbar will open the sidebar menu.
   */
  @Prop({ reflect: true })
  @ValidateEmptyOrType('boolean')
  readonly open: boolean = false

  /**
   * If `true` the navbar will use a light color scheme.
   */
  @Prop()
  @ValidateEmptyOrType('boolean')
  readonly light: boolean = false

  /**
   * Sets the inner content container width. Accepts `'default'`, `'fluid'`, or `'compact'`.
   * Matches the `ds-container` sizing variants.
   */
  @Prop()
  @ValidateEmptyOrOneOf(NAVBAR_CONTAINERS)
  readonly container: NavbarContainer = ''

  /**
   * Emitted when the sidebar menu starts opening
   */
  @Event() dsMenuOpenStart!: EventEmitter<void>

  /**
   * Emitted when the sidebar menu finishes opening
   */
  @Event() dsMenuOpenEnd!: EventEmitter<void>

  /**
   * Emitted when the sidebar menu starts closing
   */
  @Event() dsMenuCloseStart!: EventEmitter<void>

  /**
   * Emitted when the sidebar menu finishes closing
   */
  @Event() dsMenuCloseEnd!: EventEmitter<void>

  /**
   * LIFECYCLE
   * ─────────────────────────────────────────────────────
   */

  connectedCallback(): void {
    setupValidation(this)
    this.scrollHandler.connect()
    this.focusHandler.connect()
  }

  componentWillUpdate(): void {
    setupValidation(this)
  }

  componentDidLoad(): void {
    this.checkNavbarOverflow()
  }

  disconnectedCallback(): void {
    this.detachKeyboardListener()
    this.detachSidebarClickListener()
    this.focusHandler.disconnect()
    this.scrollHandler.disconnect()
  }

  /**
   * PUBLIC LISTENERS
   * ─────────────────────────────────────────────────────
   */

  @ListenToBreakpoints()
  listenToBreakpoint(breakpoints: DsBreakpoints): void {
    this.isTouch = breakpoints.touch
    const isSidebarMode = this.isTouch || this.isOverflowing
    if (!isSidebarMode && this.isSidebarOpen) {
      this.setIsSidebarOpen(false)
    }
  }

  /**
   * Handles changes to the `open` prop
   */
  @Watch('open')
  openChanged(newValue: boolean) {
    if (newValue) {
      this.openSidebar()
    } else {
      this.closeSidebar()
    }
  }

  /**
   * @internal Listens to config changes and updates language/region state
   */
  @Method()
  @ListenToConfig()
  async configChanged(state: DsConfigState): Promise<void> {
    this.language = state.language
    this.region = state.region
  }

  /**
   * @internal Listens to resize events and checks for content overflow
   */
  @Method()
  @ListenToResize()
  async listenToResize(): Promise<void> {
    console.log('Navbar: listenToResize()')
    this.checkNavbarOverflow()
  }

  /**
   * PUBLIC METHODS
   * ─────────────────────────────────────────────────────
   */

  /**
   * Toggles the sidebar menu open/closed state
   */
  @Method()
  async toggleSidebar(): Promise<void> {
    await this.setIsSidebarOpen(!this.isSidebarOpen)
  }

  /**
   * Opens the sidebar menu
   */
  @Method()
  async openSidebar(): Promise<void> {
    await this.setIsSidebarOpen(true)
  }

  /**
   * Closes the sidebar menu
   */
  @Method()
  async closeSidebar(): Promise<void> {
    await this.setIsSidebarOpen(false)
  }

  /**
   * EVENT HANDLERS
   * ─────────────────────────────────────────────────────
   */

  private handleHamburgerClick = (): void => {
    this.toggleSidebar()
  }

  private handleBackdropClick = (): void => {
    this.closeSidebar()
  }

  private handleDrawerClickBound = (event: MouseEvent): void => {
    this.handleDrawerClick(event)
  }

  private handleDrawerClick = (event: MouseEvent): void => {
    const target = event.target as HTMLElement
    if (target.tagName === 'A' || target.closest('a')) {
      this.closeSidebar()
    }
  }

  private handleDocumentKeyDown = (event: KeyboardEvent): void => {
    if (event.key === 'Escape' && this.isSidebarOpen) {
      event.preventDefault()
      this.closeSidebar()
    }
  }

  /**
   * PRIVATE METHODS
   * ─────────────────────────────────────────────────────
   */

  private attachKeyboardListener(): void {
    document.addEventListener('keydown', this.handleDocumentKeyDown)
  }

  private detachKeyboardListener(): void {
    document.removeEventListener('keydown', this.handleDocumentKeyDown)
  }

  private attachSidebarClickListener(): void {
    if (this.sidebarEl) {
      this.sidebarEl.addEventListener('click', this.handleDrawerClickBound)
    }
  }

  private detachSidebarClickListener(): void {
    if (this.sidebarEl) {
      this.sidebarEl.removeEventListener('click', this.handleDrawerClickBound)
    }
  }

  private checkNavbarOverflow(): void {
    if (!this.navEl) return

    if (!this.containerEl) return

    const scrollWidth = this.containerEl.scrollWidth
    const clientWidth = this.containerEl.clientWidth
    const isOverflowing = scrollWidth > clientWidth
    const hysteresisMargin = 100

    if (isOverflowing && !this.isOverflowing) {
      this.burgerModeThresholdWidth = clientWidth
      this.isOverflowing = true
      if (this.isSidebarOpen) {
        this.setIsSidebarOpen(false)
      }
    } else if (!isOverflowing && this.isOverflowing && this.burgerModeThresholdWidth) {
      if (clientWidth > this.burgerModeThresholdWidth + hysteresisMargin) {
        this.isOverflowing = false
        this.burgerModeThresholdWidth = null
      }
    }
  }

  private async setIsSidebarOpen(value: boolean): Promise<void> {
    if (value === this.isSidebarOpen) return

    const isSidebarMode = this.isTouch || this.isOverflowing

    if (value) {
      this.dsMenuOpenStart.emit()
      this.isSidebarOpen = true
      if (isSidebarMode) {
        this.attachKeyboardListener()
        this.attachSidebarClickListener()
        this.focusHandler.enable({ target: this.navEl, restoreElement: this.burgerButton })
        this.burgerButton?.focus()
        this.scrollHandler.disable()
      }
      this.dsMenuOpenEnd.emit()
    } else {
      this.dsMenuCloseStart.emit()
      if (isSidebarMode) {
        this.detachKeyboardListener()
        this.detachSidebarClickListener()
        this.focusHandler.disable()
        this.focusHandler.restoreFocus()
        this.scrollHandler.enable()
      }
      this.isSidebarOpen = false
      this.dsMenuCloseEnd.emit()
    }
  }

  /**
   * RENDER
   * ─────────────────────────────────────────────────────
   */

  render() {
    const isTouch = this.isTouch
    const isMenuOpen = this.isSidebarOpen
    const isSidebarMode = isTouch || this.isOverflowing
    const i18n = i18nDsNavbar[this.language]

    return (
      <Host
        class={{
          'is-open': isMenuOpen,
          'is-sidebar-mode': isSidebarMode,
          'is-light': this.light,
        }}
      >
        <nav
          ref={el => (this.navEl = el as HTMLElement | null)}
          id="nav"
          role="navigation"
          aria-label={i18n.mainNavigation}
        >
          <div
            id="container"
            class={{
              'is-fluid': this.container === 'fluid',
              'is-compact': this.container === 'compact',
            }}
            ref={el => (this.containerEl = el as HTMLDivElement | null)}
          >
            {/* ---------------------------------------- */}
            {/* Brand                                    */}
            {/* ---------------------------------------- */}
            <slot name="brand"></slot>
            <slot name="title"></slot>
            {/* ---------------------------------------- */}
            {/* Desktop Menu                             */}
            {/* ---------------------------------------- */}
            <div id="content">
              {!isSidebarMode && (
                <div id="menu">
                  <div id="menu-start">
                    <slot name="menu-start"></slot>
                  </div>
                  <div id="menu-end">
                    <slot name="menu-end"></slot>
                  </div>
                </div>
              )}
              {/* ---------------------------------------- */}
              {/* Actions                                  */}
              {/* ---------------------------------------- */}
              <div id="actions">
                <slot name="actions"></slot>
                {/* ---------------------------------------- */}
                {/* Hamburger Menu Button                    */}
                {/* ---------------------------------------- */}
                {isSidebarMode && (
                  <button
                    ref={el => (this.burgerButton = el as HTMLButtonElement | null)}
                    id="hamburger"
                    type="button"
                    title={isMenuOpen ? i18n.closeMenu : i18n.openMenu}
                    aria-label={isMenuOpen ? i18n.closeMenu : i18n.openMenu}
                    aria-expanded={isMenuOpen}
                    aria-controls="sidebar"
                    onClick={() => this.handleHamburgerClick()}
                  >
                    <ds-icon name={isMenuOpen ? 'close' : 'menu-bars'} size="" color="white"></ds-icon>
                  </button>
                )}
              </div>
            </div>
          </div>
          {/* ---------------------------------------- */}
          {/* Sidebar                                  */}
          {/* ---------------------------------------- */}
          {isSidebarMode && (
            <aside
              id="sidebar"
              role="dialog"
              aria-modal="true"
              aria-label={i18n.navigationMenu}
              class={{ 'is-open': isMenuOpen }}
              ref={el => (this.sidebarEl = el as HTMLElement | null)}
            >
              <div id="sidebar-backdrop" onClick={this.handleBackdropClick}></div>

              <div id="sidebar-panel" tabindex="-1">
                <div id="sidebar-content">
                  <div id="sidebar-start">
                    <slot name="menu-start"></slot>
                  </div>
                  <div id="sidebar-end">
                    <slot name="menu-end"></slot>
                  </div>
                </div>
              </div>
            </aside>
          )}
        </nav>
      </Host>
    )
  }
}
