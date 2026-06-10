import { Component, Element, Event, EventEmitter, h, Host, Method, Prop, State, Watch } from '@stencil/core'
import { createFocusTrap, type FocusTrap } from 'focus-trap'
import {
  DsBreakpointObserver,
  DsBreakpoints,
  ListenToBreakpoints,
  dsBreakpoints,
  Logger,
  type LogInstance,
  ValidateEmptyOrType,
  setupValidation,
} from '@utils'
import { DsComponentInterface } from '@global'
import { HTMLStencilElement } from '@stencil/core/internal'

/**
 * TODO's:
 * - [ ] Add i18n support for menu title and aria labels (e.g. via props or slots)
 * - [ ] Add prop container like we did for footer
 * - [ ] Add support for colors/themes via CSS variables or props
 * - [ ] Add focus trap includes the hamburger button when menu is open
 * - [ ] Add animation for menu open/close
 * - [ ] add solution for tab item overflow on desktop.
 * - [ ] add example for calculators like mf

/**
 * Navbar provides semantic navigation with responsive mobile menu drawer and keyboard support.
 *
 * @slot brand - Logo, wordmark, or branding element (always visible)
 * @slot menu-start - Left navigation links (inline on desktop, in drawer on mobile)
 * @slot menu-end - Right navigation links and action buttons (inline on desktop, in drawer on mobile)
 * @part nav - The semantic navigation container
 * @part hamburger - The mobile hamburger button
 * @part drawer-menu - The mobile menu drawer (aside element)
 */
@Component({
  tag: 'ds-navbar',
  styleUrl: 'navbar.host.scss',
  shadow: true,
})
export class Navbar implements DsComponentInterface, DsBreakpointObserver {
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

  @Prop({ reflect: true })
  @ValidateEmptyOrType('boolean')
  readonly open: boolean = false

  @Event() dsMenuOpenStart!: EventEmitter<void>
  @Event() dsMenuOpenEnd!: EventEmitter<void>
  @Event() dsMenuCloseStart!: EventEmitter<void>
  @Event() dsMenuCloseEnd!: EventEmitter<void>

  /**
   * LIFECYCLE
   * ─────────────────────────────────────────────────────
   */

  connectedCallback(): void {
    setupValidation(this)
  }

  componentWillUpdate(): void {
    setupValidation(this)
  }

  disconnectedCallback(): void {
    this.detachKeyboardListener()
    this.detachDrawerClickListener()
    this.deactivateFocusTrap()
    this.setNavAriaHidden(false)
    document.body.style.overflow = ''
  }

  /**
   * PUBLIC LISTENERS
   * ─────────────────────────────────────────────────────
   */

  @ListenToBreakpoints()
  listenToBreakpoint(breakpoints: DsBreakpoints): void {
    this.isTouch = breakpoints.touch
    if (!this.isTouch && this.isMenuOpen) {
      this.setIsMenuOpen(false)
    }
  }

  @Watch('open')
  openChanged(newValue: boolean) {
    if (newValue) {
      this.openMenu()
    } else {
      this.closeMenu()
    }
  }

  /**
   * PUBLIC METHODS
   * ─────────────────────────────────────────────────────
   */

  @Method()
  async toggleMenu(): Promise<void> {
    await this.setIsMenuOpen(!this.isMenuOpen)
  }

  @Method()
  async openMenu(): Promise<void> {
    await this.setIsMenuOpen(true)
  }

  @Method()
  async closeMenu(): Promise<void> {
    await this.setIsMenuOpen(false)
  }

  /**
   * EVENT HANDLERS
   * ─────────────────────────────────────────────────────
   */

  private handleHamburgerClick = (): void => {
    this.toggleMenu()
  }

  private handleBackdropClick = (): void => {
    this.closeMenu()
  }

  private handleCloseButtonClick = (): void => {
    this.closeMenu()
  }

  private handleDrawerClickBound = (event: MouseEvent): void => {
    this.handleDrawerClick(event)
  }

  private handleDrawerClick = (event: MouseEvent): void => {
    const target = event.target as HTMLElement
    if (target.tagName === 'A' || target.closest('a')) {
      this.closeMenu()
    }
  }

  private handleDocumentKeyDown = (event: KeyboardEvent): void => {
    if (event.key === 'Escape' && this.isMenuOpen) {
      event.preventDefault()
      this.closeMenu()
    }
  }

  /**
   * PRIVATE METHODS
   * ─────────────────────────────────────────────────────
   */

  private navEl: HTMLElement | null = null
  private drawerEl: HTMLElement | null = null
  private drawerPanel: HTMLElement | null = null
  private drawerCloseButton: HTMLButtonElement | null = null
  private burgerButton: HTMLButtonElement | null = null
  private focusTrap: FocusTrap | null = null

  @State() isTouch = dsBreakpoints.isTouch
  @State() isMenuOpen = false

  private attachKeyboardListener(): void {
    document.addEventListener('keydown', this.handleDocumentKeyDown)
  }

  private detachKeyboardListener(): void {
    document.removeEventListener('keydown', this.handleDocumentKeyDown)
  }

  private attachDrawerClickListener(): void {
    if (this.drawerEl) {
      this.drawerEl.addEventListener('click', this.handleDrawerClickBound)
    }
  }

  private detachDrawerClickListener(): void {
    if (this.drawerEl) {
      this.drawerEl.removeEventListener('click', this.handleDrawerClickBound)
    }
  }

  private initializeFocusTrap(): void {
    if (!this.drawerPanel) return

    this.focusTrap = createFocusTrap(this.drawerPanel, {
      escapeDeactivates: false,
      fallbackFocus: this.drawerPanel,
    })
    this.focusTrap.activate()

    // Move focus to close button after trap is activated
    if (this.drawerCloseButton) {
      this.drawerCloseButton.focus()
    }
  }

  private deactivateFocusTrap(): void {
    if (this.focusTrap) {
      this.focusTrap.deactivate()
      this.focusTrap = null
    }
  }

  private setNavAriaHidden(hidden: boolean): void {
    if (this.navEl) {
      if (hidden) {
        this.navEl.setAttribute('aria-hidden', 'true')
      } else {
        this.navEl.removeAttribute('aria-hidden')
      }
    }
  }

  private restoreFocus(): void {
    if (this.burgerButton) {
      this.burgerButton.focus()
    }
  }

  private async setIsMenuOpen(value: boolean): Promise<void> {
    if (value === this.isMenuOpen) return

    if (value) {
      this.dsMenuOpenStart.emit()
      this.isMenuOpen = true
      if (this.isTouch && this.drawerEl) {
        this.burgerButton = this.el.shadowRoot?.querySelector('.hamburger') ?? null
        this.drawerCloseButton = this.el.shadowRoot?.querySelector('.drawer-close') ?? null
        this.navEl = this.el.shadowRoot?.querySelector('#nav') ?? null
        this.drawerEl.classList.add('is-open')
        this.setNavAriaHidden(true)
        this.attachKeyboardListener()
        this.attachDrawerClickListener()
        this.initializeFocusTrap()
        document.body.style.overflow = 'hidden'
      }
      this.dsMenuOpenEnd.emit()
    } else {
      this.dsMenuCloseStart.emit()
      if (this.isTouch && this.drawerEl) {
        this.drawerEl.classList.remove('is-open')
        this.setNavAriaHidden(false)
        this.detachKeyboardListener()
        this.detachDrawerClickListener()
        this.deactivateFocusTrap()
        document.body.style.overflow = ''
        this.restoreFocus()
      }
      this.isMenuOpen = false
      this.dsMenuCloseEnd.emit()
    }
  }

  /**
   * RENDER
   * ─────────────────────────────────────────────────────
   */

  render() {
    const isTouch = this.isTouch
    const isMenuOpen = this.isMenuOpen

    return (
      <Host>
        <nav
          ref={el => (this.navEl = el as HTMLElement | null)}
          id="nav"
          role="navigation"
          aria-label="Main navigation"
        >
          {/* ---------------------------------------- */}
          {/* Brand                                    */}
          {/* ---------------------------------------- */}
          <slot name="brand"></slot>
          <slot name="title"></slot>

          {/* ---------------------------------------- */}
          {/* Hamburger Menu Button                    */}
          {/* ---------------------------------------- */}
          {isTouch && (
            <button
              class="hamburger"
              aria-label="Open navigation menu"
              aria-expanded={isMenuOpen}
              aria-controls="drawer-menu"
              type="button"
              onClick={this.handleHamburgerClick}
            >
              <svg
                class="hamburger__icon"
                aria-hidden="true"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                fill="currentColor"
              >
                {isMenuOpen ? (
                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
                ) : (
                  <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
                )}
              </svg>
            </button>
          )}

          {/* ---------------------------------------- */}
          {/* Mobile Menu Side Drawer                  */}
          {/* ---------------------------------------- */}
          {isTouch && (
            <aside
              ref={el => (this.drawerEl = el as HTMLElement | null)}
              id="drawer-menu"
              role="dialog"
              aria-modal="true"
              aria-labelledby="drawer-title"
              class={{ 'is-open': isMenuOpen }}
            >
              <div class="drawer-backdrop" onClick={this.handleBackdropClick}></div>

              <div ref={el => (this.drawerPanel = el as HTMLElement | null)} class="drawer-panel" tabindex="-1">
                <div class="drawer-header">
                  <h2 id="drawer-title" class="drawer-title">
                    Menu
                  </h2>
                  <button
                    ref={el => (this.drawerCloseButton = el as HTMLButtonElement | null)}
                    type="button"
                    class="drawer-close"
                    aria-label="Close menu"
                    onClick={this.handleCloseButtonClick}
                  >
                    ×
                  </button>
                </div>

                <div class="drawer-content">
                  <slot name="menu-start"></slot>
                  <slot name="menu-end"></slot>
                </div>
              </div>
            </aside>
          )}

          {/* ---------------------------------------- */}
          {/* Desktop Menu                             */}
          {/* ---------------------------------------- */}
          {!isTouch && (
            <div id="menu">
              <div id="menu-start">
                <slot name="menu-start"></slot>
              </div>
              <div id="menu-end">
                <slot name="menu-end"></slot>
              </div>
            </div>
          )}
        </nav>
      </Host>
    )
  }
}
