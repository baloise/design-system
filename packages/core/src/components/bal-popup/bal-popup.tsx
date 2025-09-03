import {
  Component,
  ComponentInterface,
  Element,
  Event,
  EventEmitter,
  Host,
  Listen,
  Method,
  Prop,
  State,
  Watch,
  h,
} from '@stencil/core'
import { BEM } from '../../utils/bem'
import { balBrowser } from '../../utils/browser'
import { stopEventBubbling } from '../../utils/form-input'
import { debounce } from '../../utils/helpers'
import { isEscapeKey } from '../../utils/keyboard'
import { LogInstance, Loggable, Logger } from '../../utils/log'
import {
  DrawerVariantRenderer,
  FullscreenVariantRenderer,
  PopoverVariantRenderer,
  PopupComponentInterface,
  PopupVariant,
  PopupVariantRenderer,
} from './variants'
import { VariantRenderer } from './variants/variant.renderer'

@Component({
  tag: 'bal-popup',
  styleUrl: 'bal-popup.sass',
})
export class Popup implements ComponentInterface, PopupComponentInterface, Loggable {
  private popupId = `bal-pu-${popupIds++}`

  private isClickedOutsideOnMouseDown = false
  private isClickedOutsideOnMouseUp = false

  private popoverVariantRenderer = new VariantRenderer(new PopoverVariantRenderer())
  private fullscreenVariantRenderer = new VariantRenderer(new FullscreenVariantRenderer())
  private drawerVariantRenderer = new VariantRenderer(new DrawerVariantRenderer())
  private lastVariant: PopupVariant = 'popover'
  private lastFocus?: HTMLElement
  private lastVariantRenderer?: PopupVariantRenderer

  @Element() el!: HTMLElement
  containerEl: HTMLDivElement | undefined
  contentEl: HTMLDivElement | undefined
  backdropEl: HTMLDivElement | undefined
  arrowEl: HTMLDivElement | undefined
  innerEl: HTMLBalStackElement | undefined

  @State() activeClosable = false
  @State() activeBackdropDismiss = false
  @State() activeVariant: BalProps.BalPopupVariant = 'popover'
  @State() trigger?: Element
  @State() lastTrigger?: Element
  @State() minContainerWidth = '16.25rem'

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
   * Id of the reference element default is the trigger element.
   */
  @Prop() reference?: string

  /**
   * Defines the variant / type of popup
   */
  @Prop() variant: BalProps.BalPopupVariant = 'popover'
  @Watch('variant')
  protected async variantChanged(newVariant: BalProps.BalPopupVariant, oldVariant: BalProps.BalPopupVariant) {
    if (newVariant !== oldVariant) {
      await this.getVariantRenderer(oldVariant).dismiss(this)

      if (this.activeVariant !== newVariant) {
        this.lastVariant = this.activeVariant
        this.activeVariant = newVariant
        await this.getVariantRenderer(this.lastVariant).dismiss(this)
      }

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
   * Offset form trigger to popup.
   */
  @Prop() offset = 0

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
   * @internal
   */
  @Prop() demo = false

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

    if (this.demo) {
      this.present()
    }
  }

  /**
   * LISTENERS
   * ------------------------------------------------------
   */

  private debouncedGlobalClick = debounce((trigger: HTMLElement) => this.notifyGlobalClick(trigger), 10)

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

  @Listen('keydown', { target: 'document' })
  async listenOnKeyDown(ev: KeyboardEvent) {
    if (this.activeClosable && this.presented && isEscapeKey(ev)) {
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
    if (
      this.presented &&
      this.activeBackdropDismiss &&
      this.isClickedOutsideOnMouseUp &&
      this.isClickedOutsideOnMouseDown
    ) {
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
  async setMinWidth(value: number): Promise<void> {
    if (this.containerEl) {
      this.containerEl.style.minWidth = `${value}px`
      this.minContainerWidth = `${value}px`
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
    if (balBrowser.hasDocument) {
      this.lastFocus = (document.activeElement as HTMLElement) || undefined
    }

    if (this.lastVariantRenderer) {
      await this.lastVariantRenderer.dismiss(this)
      this.presented = true
    }

    this.lastVariantRenderer = this.getVariantRenderer()
    const result = await this.lastVariantRenderer.present(this)

    this.focusFirstDescendant()
    return result
  }

  /**
   * @internal
   */
  @Method()
  async _dismiss(): Promise<boolean> {
    const result = await this.getVariantRenderer().dismiss(this)
    this.lastVariantRenderer = undefined

    if (this.lastFocus && this.lastFocus.focus) {
      this.lastFocus?.focus({ preventScroll: true })
    }
    return result
  }

  /**
   * GETTERS
   * ------------------------------------------------------
   */

  private getVariantRenderer(variant = this.activeVariant): PopupVariantRenderer {
    switch (variant) {
      case 'fullscreen':
        return this.fullscreenVariantRenderer
      case 'drawer':
        return this.drawerVariantRenderer
      default:
        return this.popoverVariantRenderer
    }
  }

  getValue(trigger: Element | HTMLElement, attributeName: string, componentValue: any): any {
    const attributeValue = trigger.attributes.getNamedItem(attributeName)
    return attributeValue ? attributeValue.value : componentValue
  }

  getNumberValue(trigger: Element | HTMLElement, attributeName: string, componentValue: number): number {
    const attributeValue = trigger.attributes.getNamedItem(attributeName)
    if (attributeValue) {
      return parseInt(attributeValue.value, 10) || componentValue
    }
    return componentValue
  }

  getBooleanValue(trigger: Element | HTMLElement, attributeName: string, componentValue: boolean): boolean {
    const attributeValue = trigger.attributes.getNamedItem(attributeName)
    if (attributeValue) {
      const booleanValue = attributeValue.value === '' || attributeValue.value === 'true' ? true : false
      return attributeValue ? booleanValue : componentValue
    }
    return componentValue
  }

  /**
   * PRIVATE METHODS
   * ------------------------------------------------------
   */

  private notifyGlobalClick(trigger: HTMLElement) {
    this.trigger = trigger
    this.lastTrigger = this.lastTrigger === undefined ? this.trigger : this.lastTrigger

    this.activeVariant = this.getValue(trigger, 'bal-popup-variant', this.variant)
    this.activeClosable = this.getBooleanValue(trigger, 'bal-popup-closable', this.closable)
    this.activeBackdropDismiss = this.getBooleanValue(trigger, 'bal-popup-backdrop-dismiss', this.backdropDismiss)

    // present or dismiss active variant
    if (this.presented && this.lastTrigger !== this.trigger) {
      this._present()
      this.lastTrigger = this.trigger
    } else {
      this.toggle()
    }
  }

  private async resetAllVariants() {
    await this.dismissAllOtherPopups()

    if (this.lastVariant !== this.activeVariant) {
      const lastVariant = this.getVariantRenderer(this.lastVariant)
      await lastVariant.dismiss(this)
    }
    this.lastVariant = this.activeVariant
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

  private focusFirstDescendant() {
    const contentEl = this.contentEl
    if (contentEl) {
      contentEl.focus({ preventScroll: true })
    }
  }

  /**
   * EVENT BINDING
   * ------------------------------------------------------
   */

  private onBackdropClick = (ev: MouseEvent) => {
    if (this.activeBackdropDismiss && this.presented && ev && ev.target) {
      const element = ev.target as HTMLElement
      return element.classList.contains('bal-popup__backdrop')
    }

    return false
  }

  private onCloseClick = (): void => {
    if (this.activeClosable) {
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
            ...containerBlock.modifier(`variant-${this.activeVariant}`).class(),
          }}
          ref={containerEl => (this.containerEl = containerEl)}
          style={{ minWidth: this.minContainerWidth }}
        >
          <div
            class={{
              ...arrowBlock.class(),
            }}
            ref={arrowEl => (this.arrowEl = arrowEl)}
          ></div>
          <bal-stack
            layout="vertical"
            px={this.activeVariant === 'popover' ? 'medium' : 'none'}
            py="medium"
            class={{
              ...innerBlock.class(),
            }}
            ref={innerBlock => (this.innerEl = innerBlock)}
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
                {this.activeClosable ? (
                  <bal-close data-test="bal-popup-close" tabindex={-1} onClick={() => this.onCloseClick()}></bal-close>
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
              ref={contentEl => (this.contentEl = contentEl)}
              data-test="bal-popup-content"
              tabindex="-1"
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
