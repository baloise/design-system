import { Component, Element, h, Host, Listen, Method, Prop, State } from '@stencil/core'
import { HTMLStencilElement } from '@stencil/core/internal'
import {
  DsBreakpointObserver,
  DsBreakpoints,
  ListenToBreakpoints,
  Logger,
  type LogInstance,
  ValidateEmptyOrOneOf,
  ValidateEmptyOrType,
  isEscapeKey,
  setupValidation,
} from '@utils'
import {
  DsComponentInterface,
  DsConfigObserver,
  DsConfigState,
  ListenToConfig,
  defaultConfig,
  type DsLanguage,
  type DsRegion,
} from '@global'
import { POPUP_PLACEMENTS, type PopupPlacement } from '../popup/popup.interfaces'
import { i18nDsHint } from './hint.i18n'

/**
 * Hint displays contextual help via an info-circle trigger button.
 * On touch viewports (< 1024 px) it opens a ds-drawer (bottom sheet);
 * on desktop it opens a ds-popup (floating panel).
 *
 * @slot title - The hint panel heading.
 * @slot       - The hint body content.
 * @part trigger - The info-circle trigger button.
 */
@Component({
  tag: 'ds-hint',
  styleUrl: 'hint.host.scss',
  shadow: true,
})
export class Hint implements DsComponentInterface, DsConfigObserver, DsBreakpointObserver {
  private popupEl: HTMLDsPopupElement | undefined
  private drawerEl: HTMLDsDrawerElement | undefined
  private triggerButtonEl: HTMLButtonElement | undefined

  log!: LogInstance

  @Logger('hint')
  createLogger(log: LogInstance) {
    this.log = log
  }

  @Element() el!: HTMLStencilElement

  @State() isOpen = false
  @State() isTouch = false
  @State() animated = true
  @State() innerCloseLabel = 'Close'
  @State() language: DsLanguage = defaultConfig.language
  @State() region: DsRegion = defaultConfig.region

  /**
   * PUBLIC PROPERTY API
   * ------------------------------------------------------
   */

  /**
   * Preferred placement of the popup panel on desktop viewports.
   */
  @Prop()
  @ValidateEmptyOrOneOf(...POPUP_PLACEMENTS)
  readonly placement: PopupPlacement = 'right'

  /**
   * Title text displayed in the hint panel.
   * When provided, renders in the title section without needing a named slot.
   */
  @Prop()
  @ValidateEmptyOrType('string')
  readonly label: string | undefined = undefined

  /**
   * Label for the close button shown in the drawer on touch viewports.
   * When omitted the label is localised from the language config.
   */
  @Prop()
  @ValidateEmptyOrType('string')
  readonly closeLabel: string | undefined = undefined

  /**
   * Accessible label for the trigger button.
   * When omitted the label is localised from the language config.
   */
  @Prop()
  @ValidateEmptyOrType('string')
  readonly triggerLabel: string | undefined = undefined

  /**
   * LIFECYCLE
   * ------------------------------------------------------
   */

  connectedCallback(): void {
    setupValidation(this)
  }

  componentWillUpdate(): void {
    setupValidation(this)
  }

  componentDidLoad(): void {
    this.wirePopupTrigger()
  }

  componentDidUpdate(): void {
    this.wirePopupTrigger()
  }

  /**
   * PUBLIC METHODS
   * ------------------------------------------------------
   */

  /** Opens the hint panel. */
  @Method()
  async present(): Promise<void> {
    if (this.isTouch) {
      await this.drawerEl?.present()
    } else {
      await this.popupEl?.present()
    }
  }

  /** Closes the hint panel. */
  @Method()
  async dismiss(): Promise<void> {
    if (this.isTouch) {
      await this.drawerEl?.dismiss()
    } else {
      await this.popupEl?.dismiss()
    }
  }

  /** Toggles the hint panel open or closed. */
  @Method()
  async toggle(): Promise<void> {
    this.isOpen ? this.dismiss() : this.present()
  }

  /**
   * @internal
   */
  @Method()
  @ListenToConfig()
  async configChanged(state: DsConfigState): Promise<void> {
    this.animated = state.animated
    this.language = state.language
    this.region = state.region
    if (!this.closeLabel) {
      switch (state.language) {
        case 'de':
          this.innerCloseLabel = 'Schliessen'
          break
        case 'fr':
          this.innerCloseLabel = 'Fermer'
          break
        case 'it':
          this.innerCloseLabel = 'Chiudere'
          break
        case 'nl':
          this.innerCloseLabel = 'Sluiten'
          break
        default:
          this.innerCloseLabel = 'Close'
      }
    }
  }

  /**
   * PRIVATE METHODS
   * ------------------------------------------------------
   */

  @ListenToBreakpoints()
  listenToBreakpoint(breakpoints: DsBreakpoints): void {
    const wasTouch = this.isTouch
    this.isTouch = breakpoints.touch
    if (wasTouch !== this.isTouch) {
      this.isOpen = false
    }
  }

  private wirePopupTrigger(): void {
    if (!this.isTouch && this.popupEl && this.triggerButtonEl) {
      this.popupEl.trigger = this.triggerButtonEl
    }
  }

  private hasTitle(): boolean {
    const titleSlot = this.el.querySelector('[slot="title"]')
    return titleSlot !== null && (titleSlot.textContent?.trim().length ?? 0) > 0
  }

  /**
   * EVENT BINDING
   * ------------------------------------------------------
   */

  @Listen('keydown', { target: 'document' })
  listenToKeyDown(ev: KeyboardEvent): void {
    if (!this.isOpen || this.isTouch) return
    if (isEscapeKey(ev)) {
      ev.stopPropagation()
      this.dismiss()
    }
  }

  private handleTriggerClick = (): void => {
    this.toggle()
  }

  private handleWillPresent = (): void => {
    this.isOpen = true
  }

  private handleWillDismiss = (): void => {
    this.isOpen = false
  }

  private handleCloseClick = (): void => {
    this.dismiss()
  }

  /**
   * RENDER
   * ------------------------------------------------------
   */

  render() {
    const closeLabel = this.closeLabel || this.innerCloseLabel
    const triggerLabel = this.triggerLabel || i18nDsHint[this.language].triggerLabel

    return (
      <Host>
        <button
          part="trigger"
          type="button"
          aria-expanded={String(this.isOpen)}
          aria-haspopup="dialog"
          aria-label={triggerLabel}
          ref={el => (this.triggerButtonEl = el as HTMLButtonElement)}
          onClick={this.handleTriggerClick}
        >
          <ds-icon name="info-circle" aria-hidden="true" />
        </button>
        {this.isTouch ? (
          <ds-drawer
            ref={el => (this.drawerEl = el as HTMLDsDrawerElement)}
            closable={false}
            backdropDismiss
            onDsWillPresent={this.handleWillPresent}
            onDsWillDismiss={this.handleWillDismiss}
          >
            <div class="hint-content">
              {(this.label || this.hasTitle()) && (
                <div class="hint-header">
                  <div class="hint-title">{this.label || <slot name="title" />}</div>
                </div>
              )}
              <div class="hint-body">
                <slot />
              </div>
            </div>
            <ds-button color="primary" class="hint-close-btn" onClick={this.handleCloseClick}>
              {closeLabel}
            </ds-button>
          </ds-drawer>
        ) : (
          <ds-popup
            ref={el => (this.popupEl = el as HTMLDsPopupElement)}
            closable={false}
            placement={this.placement}
            backdropDismiss
            role="dialog"
            onDsWillPresent={this.handleWillPresent}
            onDsWillDismiss={this.handleWillDismiss}
          >
            <div class="hint-content">
              {(this.label || this.hasTitle()) && (
                <div class="hint-header">
                  <div class="hint-title">{this.label || <slot name="title" />}</div>
                  <ds-close onClick={this.handleCloseClick} />
                </div>
              )}
              <div class="hint-body">
                <slot />
              </div>
            </div>
          </ds-popup>
        )}
      </Host>
    )
  }
}
