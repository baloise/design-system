import { Component, Element, Event, EventEmitter, h, Host, Method, Prop, State, Watch } from '@stencil/core'
import { HTMLStencilElement } from '@stencil/core/internal'
import { Logger, type LogInstance, wait, ScrollHandler, Type } from '@utils'
import { DsComponentInterface, DsConfigObserver, DsConfigState, ListenToConfig } from '@global'
import { ModalPresentDetail, ModalDismissDetail } from './modal.interfaces'

/**
 * Modal displays content in a dialog overlay using the native dialog element.
 * Supports both slot-based sub-components (ds-modal-header, ds-modal-body) and
 * direct named slots (slot="header", slot="body").
 *
 * @slot header - The modal title content. Used automatically by ds-modal-header.
 * @slot body - The modal body content. Used automatically by ds-modal-body.
 * @slot actions - Action buttons rendered right-aligned at the bottom of the modal.
 * @part dialog - The native dialog element.
 * @part close - The close button.
 * @part title - The h2 wrapping the header slot.
 * @part body - The div wrapping the body slot.
 * @part actions - The div wrapping the actions slot.
 */
@Component({
  tag: 'ds-modal',
  styleUrl: 'modal.host.scss',
  shadow: true,
})
export class Modal implements DsComponentInterface, DsConfigObserver {
  private dialogEl: HTMLDialogElement | undefined
  private scrollHandler = new ScrollHandler()

  log!: LogInstance

  @Logger('modal')
  createLogger(log: LogInstance) {
    this.log = log
  }

  @Element() el!: HTMLStencilElement

  @State() animated = true
  @State() isOpen = false
  private transitionQueue: Promise<void> = Promise.resolve()

  /**
   * PUBLIC PROPERTY API
   * ------------------------------------------------------
   */

  /**
   * If `true` the modal is open.
   */
  @Prop({ reflect: true, mutable: true })
  @Type('boolean')
  open: boolean = false

  @Watch('open')
  openChanged(newValue: boolean) {
    if (newValue) {
      this.runOpen()
    } else {
      this.runClose()
    }
  }

  /**
   * If `true`, the modal can be dismissed via Escape key, close button, and backdrop click.
   */
  @Prop()
  @Type('boolean')
  readonly closable: boolean = true

  /**
   * Width of the modal in pixels.
   */
  @Prop()
  @Type('number')
  readonly modalWidth: number = 640

  /**
   * If `true`, the modal covers the full viewport.
   */
  @Prop()
  @Type('boolean')
  readonly fullscreen: boolean = false

  /**
   * EVENTS
   * ------------------------------------------------------
   */

  /** Emitted before the modal opens. */
  @Event() dsWillPresent!: EventEmitter<ModalPresentDetail>

  /** Emitted after the modal is fully open. */
  @Event() dsDidPresent!: EventEmitter<ModalPresentDetail>

  /** Emitted before the modal closes. */
  @Event() dsWillDismiss!: EventEmitter<ModalDismissDetail>

  /** Emitted after the modal is fully closed. */
  @Event() dsDidDismiss!: EventEmitter<ModalDismissDetail>

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

  /** Opens the modal. */
  @Method()
  async present(): Promise<void> {
    this.open = true
  }

  /** Closes the modal. */
  @Method()
  async dismiss(): Promise<void> {
    this.open = false
  }

  /**
   * @internal define config for the component
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
    if (this.animated) {
      await wait(300)
    }
    this.dsDidPresent.emit()
  }

  private async doClose(): Promise<void> {
    if (!this.dialogEl?.open) return
    this.dsWillDismiss.emit()
    this.isOpen = false
    if (this.animated) {
      await wait(300)
    }
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
    // If the browser closed the dialog despite preventDefault (browser quirk),
    // re-enter the top layer so the backdrop is restored.
    if (this.open) {
      this.dialogEl?.showModal()
    }
  }

  private handleBackdropClick = (ev: MouseEvent): void => {
    if (this.closable && ev.target === this.dialogEl) {
      this.open = false
    }
  }

  /**
   * RENDER
   * ------------------------------------------------------
   */

  render() {
    return (
      <Host
        class={{
          'is-open': this.isOpen,
          'is-animated': this.animated,
          'is-fullscreen': this.fullscreen,
        }}
        style={{ '--_modal-width': `${this.modalWidth}px` }}
      >
        <dialog
          part="dialog"
          ref={el => (this.dialogEl = el as HTMLDialogElement)}
          aria-labelledby="modal-title"
          aria-describedby="modal-body"
          onClick={this.handleBackdropClick}
        >
          {this.closable && <ds-close part="close" onClick={() => (this.open = false)} />}
          <h2 id="modal-title" part="title">
            <slot name="header" />
          </h2>
          <div id="modal-body" part="body">
            <slot name="body" />
          </div>
          <div id="modal-actions" part="actions">
            <slot name="actions" />
          </div>
        </dialog>
      </Host>
    )
  }
}
