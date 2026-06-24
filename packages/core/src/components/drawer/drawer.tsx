import { Component, Element, Event, EventEmitter, h, Host, Method, Prop, State, Watch } from '@stencil/core'
import { HTMLStencilElement } from '@stencil/core/internal'
import { DsComponentInterface, DsConfigObserver, DsConfigState, ListenToConfig } from '@global'
import { Logger, type LogInstance, ScrollHandler, wait, OneOf, Type } from '@utils'
import { DrawerPresentDetail, DrawerDismissDetail, DRAWER_CONTAINERS, DrawerContainer } from './drawer.interfaces'

/**
 * Drawer displays a panel that slides up from the bottom of the screen.
 * Uses the native dialog element for accessible top-layer rendering, built-in focus management,
 * and Escape-key handling.
 *
 * @slot - The drawer content.
 * @part dialog - The native dialog element.
 * @part close  - The optional close button (visible when closable).
 */
@Component({
  tag: 'ds-drawer',
  styleUrl: 'drawer.host.scss',
  shadow: true,
})
export class Drawer implements DsComponentInterface, DsConfigObserver {
  private dialogEl: HTMLDialogElement | undefined
  private scrollHandler = new ScrollHandler()
  private transitionQueue: Promise<void> = Promise.resolve()

  log!: LogInstance

  @Logger('drawer')
  createLogger(log: LogInstance) {
    this.log = log
  }

  @Element() el!: HTMLStencilElement

  @State() animated = true
  @State() isOpen = false

  /**
   * PUBLIC PROPERTY API
   * ------------------------------------------------------
   */

  /**
   * If `true` the drawer is open.
   */
  @Prop({ reflect: true, mutable: true })
  @Type('boolean')
  open: boolean = false

  @Watch('open')
  openChanged(newValue: boolean) {
    newValue ? this.runOpen() : this.runClose()
  }

  /**
   * If `true`, the drawer can be dismissed via the Escape key and shows a close button.
   */
  @Prop()
  @Type('boolean')
  readonly closable: boolean = true

  /**
   * If `true`, clicking the backdrop (outside the panel) dismisses the drawer.
   */
  @Prop()
  @Type('boolean')
  readonly backdropDismiss: boolean = true

  /**
   * Accessible label for the drawer dialog (sets aria-label on the dialog element).
   */
  @Prop()
  @Type('string')
  readonly label: string = ''

  /**
   * Sets the inner content container width. Accepts `'default'`, `'fluid'`, or `'compact'`.
   * Matches the `ds-container` sizing variants.
   */
  @Prop()
  @OneOf(DRAWER_CONTAINERS)
  readonly container: DrawerContainer = 'default'

  /**
   * EVENTS
   * ------------------------------------------------------
   */

  /** Emitted before the drawer opens. */
  @Event() dsWillPresent!: EventEmitter<DrawerPresentDetail>

  /** Emitted after the drawer is fully open. */
  @Event() dsDidPresent!: EventEmitter<DrawerPresentDetail>

  /** Emitted before the drawer closes. */
  @Event() dsWillDismiss!: EventEmitter<DrawerDismissDetail>

  /** Emitted after the drawer is fully closed. */
  @Event() dsDidDismiss!: EventEmitter<DrawerDismissDetail>

  /**
   * LIFECYCLE
   * ------------------------------------------------------
   */

  connectedCallback(): void {
    this.scrollHandler.connect()
  }

  componentDidLoad(): void {
    this.dialogEl?.addEventListener('cancel', this.handleCancel)
    this.dialogEl?.addEventListener('close', this.handleNativeClose)
    if (this.open) {
      this.runOpen()
    }
  }

  disconnectedCallback(): void {
    this.dialogEl?.removeEventListener('cancel', this.handleCancel)
    this.dialogEl?.removeEventListener('close', this.handleNativeClose)
    this.scrollHandler.disconnect()
  }

  /**
   * PUBLIC METHODS
   * ------------------------------------------------------
   */

  /** Opens the drawer. */
  @Method()
  async present(): Promise<void> {
    this.open = true
  }

  /** Closes the drawer. */
  @Method()
  async dismiss(): Promise<void> {
    this.open = false
  }

  /**
   * @internal
   */
  @Method()
  @ListenToConfig()
  async configChanged(state: DsConfigState): Promise<void> {
    this.animated = state.animated
  }

  /**
   * PRIVATE METHODS
   * ------------------------------------------------------
   */

  private runOpen(): void {
    this.transitionQueue = this.transitionQueue.then(() => this.doOpen()).catch(() => undefined)
  }

  private runClose(): void {
    this.transitionQueue = this.transitionQueue.then(() => this.doClose()).catch(() => undefined)
  }

  private async doOpen(): Promise<void> {
    if (this.dialogEl?.open) return
    this.dsWillPresent.emit()
    this.dialogEl?.showModal()
    this.scrollHandler.disable()
    this.isOpen = true
    if (this.animated) await wait(300)
    this.dsDidPresent.emit()
  }

  private async doClose(): Promise<void> {
    if (!this.dialogEl?.open) return
    this.dsWillDismiss.emit()
    this.isOpen = false
    if (this.animated) await wait(300)
    this.dialogEl?.close()
    this.scrollHandler.enable()
    this.dsDidDismiss.emit()
  }

  private handleCancel = (ev: Event): void => {
    ev.preventDefault()
    if (this.closable) {
      this.open = false
    }
  }

  private handleNativeClose = (): void => {
    // Re-enter the top layer if the browser closed the dialog unexpectedly.
    if (this.open) {
      this.dialogEl?.showModal()
    }
  }

  /**
   * EVENT BINDING
   * ------------------------------------------------------
   */

  private handleBackdropClick = (ev: MouseEvent): void => {
    if (this.backdropDismiss && ev.target === this.dialogEl) {
      this.open = false
    }
  }

  private handleCloseClick = (): void => {
    this.open = false
  }

  /**
   * RENDER
   * ------------------------------------------------------
   */

  render() {
    return (
      <Host class={{ 'is-open': this.isOpen, 'is-animated': this.animated }}>
        <dialog
          part="dialog"
          ref={el => (this.dialogEl = el as HTMLDialogElement)}
          aria-label={this.label || undefined}
          onClick={this.handleBackdropClick}
        >
          <div
            class={{
              'container': true,
              'is-fluid': this.container === 'fluid',
              'is-compact': this.container === 'compact',
            }}
          >
            {this.closable && <ds-close part="close" onClick={this.handleCloseClick} />}
            <slot />
          </div>
        </dialog>
      </Host>
    )
  }
}
