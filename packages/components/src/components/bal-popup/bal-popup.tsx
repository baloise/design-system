import {
  Component,
  h,
  ComponentInterface,
  Host,
  Element,
  Prop,
  State,
  Listen,
  Watch,
  Method,
  EventEmitter,
  Event,
} from '@stencil/core'
import { isEscapeKey } from '@baloise/web-app-utils'
import { BEM } from '../../utils/bem'
import { balBrowser } from '../../utils/browser'
import { stopEventBubbling } from '../../utils/form-input'
import {
  PopupComponentInterface,
  PopupVariantRenderer,
  PopupVariant,
  PopoverVariantRenderer,
  FullscreenVariantRenderer,
  DrawerVariantRenderer,
} from './variants'
import { debounce } from '../../utils/helpers'
import { LogInstance, Loggable, Logger } from '../../utils/log'

@Component({
  tag: 'bal-popup',
  styleUrls: {
    css: 'bal-popup.sass',
  },
})
export class Popup implements ComponentInterface, PopupComponentInterface, Loggable {
  private popupId = `bal-pu-${popupIds++}`

  private isClickedOutsideOnMouseDown = false
  private isClickedOutsideOnMouseUp = false

  private popoverVariantRenderer = new PopoverVariantRenderer()
  private fullscreenVariantRenderer = new FullscreenVariantRenderer()
  private drawerVariantRenderer = new DrawerVariantRenderer()
  private lastVariant: PopupVariant = 'popover'

  @Element() el!: HTMLElement
  containerEl: HTMLDivElement | undefined
  backdropEl: HTMLDivElement | undefined
  arrowEl: HTMLDivElement | undefined

  @State() trigger?: Element
  @State() lastTrigger?: Element

  log!: LogInstance

  @Logger('bal-popup')
  createLogger(log: LogInstance) {
    this.log = log
  }

  /**
   * PUBLIC PROPERTY API
   * ------------------------------------------------------
   */

  /**
   * Label or title of the popup element
   */
  @Prop() label = ''

  /**
   *
   */
  @Prop() variant: BalProps.BalPopupVariant = 'popover'
  @Watch('variant')
  protected async variantChanged(newVariant: BalProps.BalPopupVariant, oldVariant: BalProps.BalPopupVariant) {
    if (newVariant !== oldVariant) {
      await this.getVariantRenderer(oldVariant).dismiss(this)
      if (this.presented) {
        await this.getVariantRenderer(newVariant).present(this)
      }
    }
  }

  /**
   * If set it turns a popover into a fullscreen or a drawer on touch devices
   */
  @Prop() placement: BalProps.BalPopupPlacement = 'bottom'

  /**
   * If `true`, it shows a little indicator to the trigger element.
   */
  @Prop() arrow = false

  /**
   * If `true`, a backdrop will be displayed behind the modal.
   */
  @Prop() backdrop = false

  /**
   * If `true`, the modal can be closed with the escape key or the little close button.
   */
  @Prop() closable = false

  /**
   * If `true`, the modal can be closed with the click outside of the modal
   */
  @Prop() backdropDismiss = false

  /**
   * If `true` the popup is open.
   */

  @Prop() active = false
  @Watch('active')
  protected async activeChanged(newActive: boolean, oldActive: boolean) {
    if (newActive !== oldActive && newActive !== this.presented) {
      if (newActive) {
        this.present()
      } else {
        this.dismiss()
      }
    }
  }

  /**
   * Internal active state
   */
  @State() presented = false
  private initialActive = this.active

  /**
   * Defines the width of the content
   */
  @Prop() contentWidth?: number
  @Watch('contentWidth')
  contentWidthChanged(newValue?: number, oldValue?: number) {
    if (newValue !== oldValue) {
      if (newValue === undefined) {
        this.el.style.removeProperty('--bal-popup-variant-popover-max-width')
      } else {
        this.el.style.setProperty('--bal-popup-variant-popover-max-width', `${this.contentWidth}px`)
      }
    }
  }

  /**
   * Emitted when the accordion has opened or closed
   */
  @Event() balChange!: EventEmitter<BalEvents.BalPopupChangeDetail>

  /**
   * Emitted before the animation starts
   */
  @Event() balWillAnimate!: EventEmitter<BalEvents.BalPopupWillAnimateDetail>

  /**
   * Emitted after the animation has finished
   */
  @Event() balDidAnimate!: EventEmitter<BalEvents.BalPopupDidAnimateDetail>

  /**
   * LIFECYCLE
   * ------------------------------------------------------
   */

  componentDidLoad(): void {
    this.contentWidthChanged(this.contentWidth, 0)
    if (this.initialActive === true && this.presented !== true) {
      this.present()
    }
  }

  /**
   * LISTENERS
   * ------------------------------------------------------
   */

  private debouncedGlobalClick = debounce((trigger: HTMLElement) => this.notifyGlobalClick(trigger), 10)

  notifyGlobalClick(trigger: HTMLElement) {
    this.trigger = trigger
    this.lastTrigger = this.lastTrigger === undefined ? this.trigger : this.lastTrigger
    if (this.presented && this.lastTrigger !== this.trigger) {
      this._present()
    } else {
      this.toggle()
    }
  }

  @Listen('click', { target: 'window' })
  async listenOnGlobalClick(ev: MouseEvent): Promise<void> {
    const target = ev.target as HTMLElement
    const trigger = target.closest('[bal-popup]')

    if (trigger && balBrowser.hasWindow) {
      const popupId = trigger.attributes.getNamedItem('bal-popup')?.nodeValue || ''
      if (this.el.id === popupId) {
        this.debouncedGlobalClick(trigger as HTMLElement)
      }
    }
  }

  @Listen('keydown', { target: 'body' })
  async listenOnKeyDown(ev: KeyboardEvent) {
    if (this.closable && this.presented && isEscapeKey(ev)) {
      stopEventBubbling(ev)
      this.dismiss()
    }
  }

  @Listen('mousedown')
  async listenOnMouseDown(ev: MouseEvent) {
    this.isClickedOutsideOnMouseDown = this.onBackdropClick(ev)
  }

  @Listen('mouseup')
  async listenOnMouseUp(ev: MouseEvent) {
    this.isClickedOutsideOnMouseUp = this.onBackdropClick(ev)
  }

  @Listen('click')
  async listenOnComponentClick() {
    if (this.presented && this.backdropDismiss && this.isClickedOutsideOnMouseUp && this.isClickedOutsideOnMouseDown) {
      await this.dismiss()
    }
  }

  /**
   * PUBLIC METHODS
   * ------------------------------------------------------
   */

  /**
   * Opens the popup
   */
  @Method()
  async present(): Promise<void> {
    await this.resetAllVariants()
    if (await this._present()) {
      this.lastTrigger = this.trigger
      this.balChange.emit(this.presented)
    }
  }

  /**
   * Closes the popup
   */
  @Method()
  async dismiss(): Promise<void> {
    await this.resetAllVariants()
    if (await this._dismiss()) {
      this.lastTrigger = this.trigger
      this.balChange.emit(this.presented)
    }
  }

  /**
   * Triggers the popup
   */
  @Method()
  async toggle(): Promise<void> {
    if (this.presented) {
      return this.dismiss()
    } else {
      return this.present()
    }
  }

  /**
   * @internal
   */
  @Method()
  async _emitChange(): Promise<void> {
    this.balChange.emit(this.presented)
  }

  /**
   * @internal
   */
  @Method()
  async _present(): Promise<boolean> {
    return this.getVariantRenderer().present(this)
  }

  /**
   * @internal
   */
  @Method()
  async _dismiss(): Promise<boolean> {
    return this.getVariantRenderer().dismiss(this)
  }

  /**
   * GETTERS
   * ------------------------------------------------------
   */

  private getVariantRenderer(variant = this.variant): PopupVariantRenderer {
    switch (variant) {
      case 'fullscreen':
        return this.fullscreenVariantRenderer
      case 'drawer':
        return this.drawerVariantRenderer
      default:
        return this.popoverVariantRenderer
    }
  }

  /**
   * PRIVATE METHODS
   * ------------------------------------------------------
   */

  private async resetAllVariants() {
    await this.dismissAllOtherPopups()

    if (this.lastVariant !== this.variant) {
      const lastVariant = this.getVariantRenderer(this.lastVariant)
      await lastVariant.dismiss(this)
    }
    this.lastVariant = this.variant
  }

  private async dismissAllOtherPopups() {
    if (balBrowser.hasDocument) {
      const popups = Array.from(document.getElementsByTagName('bal-popup')).filter(
        el => el.id !== this.el.id && el.ariaHidden !== 'true',
      )
      for (let index = 0; index < popups.length; index++) {
        const popup = popups[index]
        await popup._dismiss()
        await popup._emitChange()
      }
    }
  }

  /**
   * EVENT BINDING
   * ------------------------------------------------------
   */

  private onBackdropClick = (ev: MouseEvent) => {
    if (this.backdropDismiss && this.presented && ev && ev.target) {
      const element = ev.target as HTMLElement
      return element.classList.contains('bal-popup__backdrop')
    }

    return false
  }

  private onCloseClick = (): void => {
    if (this.closable) {
      this.dismiss()
    }
  }

  /**
   * RENDER
   * ------------------------------------------------------
   */

  render() {
    const block = BEM.block('popup')
    const containerBlock = block.element('container')
    const arrowBlock = block.element('arrow')
    const backdropBlock = block.element('backdrop')
    const innerBlock = block.element('inner')
    const innerHeadBlock = innerBlock.element('head')
    const innerContentBlock = innerBlock.element('content')

    return (
      <Host
        class={{
          ...block.class(),
        }}
        role="dialog"
        aria-hidden={`${this.presented !== true}`}
        aria-modal={`${this.presented === true}`}
        aria-presented={`${this.presented === true}`}
        aria-labelledby={`${this.popupId}-heading`}
      >
        <div
          class={{
            ...backdropBlock.class(),
          }}
          ref={backdropEl => (this.backdropEl = backdropEl)}
        ></div>
        <div
          class={{
            ...containerBlock.class(),
            ...containerBlock.modifier(`variant-${this.variant}`).class(),
          }}
          ref={containerEl => (this.containerEl = containerEl)}
        >
          <bal-stack
            layout="vertical"
            px={this.variant === 'popover' ? 'large' : 'none'}
            py="large"
            class={{
              ...innerBlock.class(),
            }}
          >
            {this.label ? (
              <bal-stack
                space="auto"
                class={{
                  ...innerHeadBlock.class(),
                }}
              >
                <bal-heading
                  data-test="bal-popup-label"
                  level="span"
                  visual-level="large"
                  id={`${this.popupId}-heading`}
                >
                  {this.label}
                </bal-heading>
                {this.closable ? (
                  <bal-close data-test="bal-popup-close" onClick={() => this.onCloseClick()}></bal-close>
                ) : (
                  ''
                )}
              </bal-stack>
            ) : (
              ''
            )}
            <div
              class={{
                ...innerContentBlock.class(),
              }}
              data-test="bal-popup-content"
            >
              <slot></slot>
            </div>
          </bal-stack>
          <div
            class={{
              ...arrowBlock.class(),
            }}
            ref={arrowEl => (this.arrowEl = arrowEl)}
          ></div>
        </div>
      </Host>
    )
  }
}

let popupIds = 0
