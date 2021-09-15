import { Component, Host, h, State, Method, Listen, Prop, Event, EventEmitter, Element, writeTask } from '@stencil/core'
import { dismiss, prepareOverlay } from '../../helpers/overlays'
import { attachComponent, detachComponent } from '../../helpers/framework-delegate'
import { ComponentProps, ComponentRef, FrameworkDelegate, OverlayEventDetail, OverlayInterface } from './bal-modal.type'
import { deepReady } from '../../helpers/helpers'
import { getClassMap } from '../../helpers/theme'

@Component({
  tag: 'bal-modal',
  scoped: true,
  shadow: false,
})
export class Modal implements OverlayInterface {
  private usersElement?: HTMLElement
  private modalElement?: HTMLElement

  @State() presented = false

  @Element() el!: HTMLBalModalElement

  /** @internal */
  @Prop({ mutable: true }) overlayIndex!: number

  /** @internal */
  @Prop() delegate?: FrameworkDelegate

  /**
   * Defines the width of the modal body
   */
  @Prop() modalWidth = 640

  /**
   * If `true`, a backdrop will be displayed behind the modal.
   */
  @Prop() hasBackdrop = true

  /**
   * If `true`, the modal can be closed with the escape key or the little close button.
   */
  @Prop() isClosable = true

  /**
   * The component to display inside of the modal.
   */
  @Prop() component!: ComponentRef

  /**
   * The data to pass to the modal component.
   */
  @Prop() componentProps?: ComponentProps

  /**
   * Additional classes to apply for custom CSS. If multiple classes are
   * provided they should be separated by spaces.
   */
  @Prop() cssClass?: string | string[]

  /**
   * Emitted after the modal has presented.
   */
  @Event({ eventName: 'balModalDidPresent' }) didPresent!: EventEmitter<void>

  /**
   * Emitted before the modal has presented.
   */
  @Event({ eventName: 'balModalWillPresent' }) willPresent!: EventEmitter<void>

  /**
   * Emitted before the modal has dismissed.
   */
  @Event({ eventName: 'balModalWillDismiss' }) willDismiss!: EventEmitter<OverlayEventDetail>

  /**
   * Emitted after the modal has dismissed.
   */
  @Event({ eventName: 'balModalDidDismiss' }) didDismiss!: EventEmitter<OverlayEventDetail>

  connectedCallback() {
    prepareOverlay(this)
  }

  /**
   * Opens the modal.
   * @deprecated
   */
  @Method()
  async open(): Promise<void> {
    this.presented = true
  }

  /**
   * Closes the modal.
   * @deprecated
   */
  @Method()
  async close(): Promise<void> {
    this.presented = false
  }

  /**
   * Presents the modal
   */
  @Method()
  async present(): Promise<void> {
    if (this.presented) {
      return
    }

    const container = this.el.querySelector(`.modal-wrapper`)
    if (!container) {
      throw new Error('container is undefined')
    }
    const componentProps = {
      ...this.componentProps,
      modal: this.el,
    }
    this.usersElement = await attachComponent(this.delegate, container, this.component, [], componentProps)
    await deepReady(this.usersElement)

    writeTask(() => {
      if (this.modalElement) {
        this.modalElement.classList.add('is-active')
      }
    })

    if (this.presented) {
      return
    }
    this.willPresent.emit()
    this.presented = true
    this.el.focus()
    this.didPresent.emit()
  }

  /**
   * Closes the presented modal
   */
  @Method()
  async dismiss(data?: any, role?: string): Promise<boolean> {
    this.willDismiss.emit({ data, role })
    const dismissed = await dismiss(this, data, role)

    if (dismissed) {
      await detachComponent(this.delegate, this.usersElement)
    }

    this.didDismiss.emit({ data, role })
    return dismissed
  }

  @Listen('click')
  async onClickCloseButton(event: MouseEvent) {
    if (this.isClosable && this.presented && event && event.target) {
      const element = event.target as HTMLElement
      const closestBalButton = element.closest('bal-button')
      if (closestBalButton && closestBalButton.hasAttribute('modal-close')) {
        await this.dismiss(undefined, 'model-close')
      }
    }
  }

  @Listen('keyup', { target: 'body' })
  async handleKeyUp(event: KeyboardEvent) {
    const modals = Array.from(document.querySelectorAll('bal-modal')).filter(el => el.hasAttribute('aria-presented'))
    const nums = modals
      .map(el => el.overlayIndex)
      .map(num => parseInt(num as any))
      .filter(num => !Number.isNaN(num))
    const max = Math.max(...nums)

    if (this.overlayIndex === max) {
      event.preventDefault()
      event.stopPropagation()
      if (this.presented && this.isClosable) {
        if (event.key === 'Escape' || event.key === 'Esc') {
          event.preventDefault()
          await this.dismiss(undefined, 'model-escape')
        }
      }
    }
  }

  render() {
    return (
      <Host
        aria-modal="true"
        aria-presented={this.presented}
        tabindex="-1"
        class={{
          ...getClassMap(this.cssClass),
        }}
        style={{
          '--bal-width': `${this.modalWidth}px`,
        }}
      >
        <div
          ref={el => (this.modalElement = el)}
          class={{
            'modal': true,
            'is-clipped': true,
            'is-active': this.presented,
          }}
        >
          <div
            class={{
              'modal-background': true,
              'is-hidden': !this.hasBackdrop,
            }}
          ></div>
          <div class="modal-content">
            <div class="box no-border modal-card modal-wrapper">
              <slot></slot>
            </div>
          </div>
          <button
            class={{
              'modal-close': true,
              'is-large': true,
              'is-hidden': !this.isClosable,
            }}
            aria-label="close"
            onClick={() => this.dismiss(undefined, 'model-close')}
          ></button>
        </div>
      </Host>
    )
  }
}
