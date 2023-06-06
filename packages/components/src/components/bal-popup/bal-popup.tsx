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
import type { BalBreakpointObserver, BalBreakpoints } from '../../interfaces'
import { BEM } from '../../utils/bem'
import { balBrowser } from '../../utils/browser'
import { ListenToBreakpoints } from '../../utils/breakpoints'
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
export class Popup implements ComponentInterface, BalBreakpointObserver, PopupComponentInterface, Loggable {
  private popupId = `bal-pu-${popupIds++}`

  private isClickedOutsideOnMouseDown = false
  private isClickedOutsideOnMouseUp = false

  private popoverVariantRenderer = new PopoverVariantRenderer()
  private fullscreenVariantRenderer = new FullscreenVariantRenderer()
  private drawerVariantRenderer = new DrawerVariantRenderer()
  private lastVariant: PopupVariant = 'popover'

  @Element() el!: HTMLElement
  containerEl: HTMLDivElement | undefined
  arrowEl: HTMLDivElement | undefined

  @State() isTouch = false
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
   * If set it turns a popover into a fullscreen or a drawer on touch devices
   */
  @Prop() touchPosition?: 'top' | 'bottom'

  /**
   * If `true`, it shows a little indicator to the trigger element.
   */
  @Prop() arrow = false

  /**
   * If `true`, a backdrop will be displayed behind the modal.
   */
  @Prop() backdrop = false

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
  @Prop() contentWidth = 440
  @Watch('contentWidth')
  contentWidthChanged(newValue: number, oldValue: number) {
    if (newValue !== oldValue) {
      this.el.style.setProperty('--bal-popup-variant-popover-max-width', `${this.contentWidth}px`)
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

  @Listen('click', { target: 'body' })
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
    if (this.presented && isEscapeKey(ev)) {
      stopEventBubbling(ev)
      this.dismiss()
    }
  }

  @Listen('mousedown')
  async listenOnMouseDown(ev: MouseEvent) {
    this.isClickedOutsideOnMouseDown = this.isClickedOutside(ev)
  }

  @Listen('mouseup')
  async listenOnMouseUp(ev: MouseEvent) {
    this.isClickedOutsideOnMouseUp = this.isClickedOutside(ev)
  }

  @Listen('click')
  async listenOnComponentClick() {
    if (this.presented && this.backdropDismiss && this.isClickedOutsideOnMouseUp && this.isClickedOutsideOnMouseDown) {
      await this.dismiss()
    }
  }

  @ListenToBreakpoints()
  breakpointListener(breakpoints: BalBreakpoints): void {
    this.isTouch = breakpoints.touch
    if (this.presented) {
      this._present()
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

  private get variant(): PopupVariant {
    return !this.isTouch ? 'popover' : this.touchPosition === 'bottom' ? 'drawer' : 'fullscreen'
  }

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

  private isClickedOutside(ev: MouseEvent) {
    if (this.presented && ev && ev.target && this.backdropDismiss) {
      const element = ev.target as HTMLElement
      return element.classList.contains('bal-popup__backdrop')
    }

    return false
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
            ...backdropBlock.modifier('active').class(this.presented && this.backdrop && this.variant !== 'fullscreen'),
          }}
        ></div>
        <div
          class={{
            ...arrowBlock.class(),
            ...arrowBlock.modifier('active').class(this.presented && this.arrow && this.variant === 'popover'),
          }}
          ref={arrowEl => (this.arrowEl = arrowEl)}
        ></div>
        <div
          class={{
            ...containerBlock.class(),
            ...containerBlock.modifier('active').class(this.presented),
            ...containerBlock.modifier(`variant-${this.variant}`).class(this.presented),
          }}
          ref={containerEl => (this.containerEl = containerEl)}
        >
          <bal-stack
            layout="vertical"
            px="large"
            py="large"
            class={{
              ...innerBlock.class(),
            }}
          >
            <bal-stack
              space="auto"
              class={{
                ...innerHeadBlock.class(),
              }}
            >
              <bal-heading level="span" visual-level="large" id={`${this.popupId}-heading`}>
                {this.label}
              </bal-heading>
              <bal-close onClick={() => this.dismiss()}></bal-close>
            </bal-stack>
            <div
              class={{
                ...innerContentBlock.class(),
              }}
            >
              <slot></slot>
            </div>
          </bal-stack>
        </div>
      </Host>
    )
  }
}

let popupIds = 0
