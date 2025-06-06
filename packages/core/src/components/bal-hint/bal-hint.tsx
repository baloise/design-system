import {
  Component,
  Host,
  h,
  Method,
  State,
  Prop,
  Element,
  FunctionalComponent,
  ComponentInterface,
} from '@stencil/core'
import { ListenToConfig, BalConfigObserver, BalConfigState } from '../../utils/config'
import { BEM } from '../../utils/bem'
import { preventDefault } from '../bal-select/utils/utils'
import { BalScrollHandler } from '../../utils/scroll'
import { ListenToBreakpoints, BalBreakpointObserver, BalBreakpoints, balBreakpoints } from '../../utils/breakpoints'
import { isEnterKey, isSpaceKey } from '../../utils/keyboard'

@Component({
  tag: 'bal-hint',
  styleUrl: 'bal-hint.sass',
})
export class Hint implements ComponentInterface, BalConfigObserver, BalBreakpointObserver {
  @Element() element!: HTMLElement

  private popupElement!: HTMLBalPopupElement
  private slotWrapperEl?: HTMLDivElement
  private hintContentEl?: HTMLDivElement

  private bodyScrollHandler = new BalScrollHandler()
  private componentId = `bal-hint-${hintIds++}`

  @State() isActive = false
  @State() innerCloseLabel = 'Close'
  @State() isMobile = balBreakpoints.isMobile
  /**
   * Text for the close button.
   */
  @Prop() closeLabel?: string

  /**
   * Disables the close button for tablet and desktop
   */
  @Prop() small = false

  connectedCallback() {
    this.bodyScrollHandler.connect()
  }

  componentDidRender() {
    this.updateContent()
  }

  disconnectedCallback() {
    this.bodyScrollHandler.disconnect()
  }

  @ListenToBreakpoints()
  breakpointListener(breakpoints: BalBreakpoints): void {
    const isCurrentMobile = breakpoints.mobile
    if (isCurrentMobile !== this.isMobile) {
      this.isActive = false
    }
    this.isMobile = isCurrentMobile
  }

  /**
   * @internal define config for the component
   */
  @Method()
  @ListenToConfig()
  async configChanged(state: BalConfigState): Promise<void> {
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
          break
      }
    }
  }

  /**
   * Toggles the hint box.
   */
  @Method()
  async toggle(): Promise<void> {
    if (this.isActive) {
      this.dismiss()
    } else {
      this.present()
    }
  }

  /**
   * Opens the hint box.
   */
  @Method()
  async present(): Promise<void> {
    if (this.popupElement) {
      this.popupElement.present()
    }
    if (this.isMobile) {
      this.bodyScrollHandler.disable()
    }
    this.isActive = true
  }

  /**
   * Closes the hint box.
   */
  @Method()
  async dismiss(): Promise<void> {
    if (this.popupElement) {
      this.popupElement.dismiss()
    }
    if (this.isMobile) {
      this.bodyScrollHandler.enable()
    }
    this.isActive = false
  }

  private onPopupChange = (ev: CustomEvent<boolean>) => {
    this.isActive = ev.detail
    preventDefault(ev)
  }

  private updateContent() {
    if (this.hintContentEl && this.slotWrapperEl) {
      this.hintContentEl.innerHTML = this.slotWrapperEl.innerHTML
    }
  }

  render() {
    const block = BEM.block('hint')
    const elIcon = block.element('icon')
    const elContent = block.element('content')
    const elButtons = elContent.element('buttons')

    const TriggerIcon: FunctionalComponent = () => {
      return (
        <bal-icon
          class={{
            ...elIcon.class(),
          }}
          bal-popup={this.componentId}
          data-testid="bal-hint-trigger"
          aria-haspopup="true"
          role="button"
          name="info-circle"
          tabindex={0}
          onKeyDown={event => {
            if (isEnterKey(event) || isSpaceKey(event)) {
              event.preventDefault()
              this.toggle()
            }
          }}
        ></bal-icon>
      )
    }

    const HintContent: FunctionalComponent = () => {
      return (
        <div
          class={{
            ...elContent.class(),
          }}
          data-testid="bal-hint-content"
        >
          <div ref={el => (this.hintContentEl = el)}></div>
          <bal-button-group
            class={{
              ...elButtons.class(),
              ...elButtons.modifier('is-hidden-desktop').class(this.small),
            }}
          >
            <bal-button data-testid="bal-hint-close" color="info" onClick={() => this.dismiss()}>
              {this.closeLabel ? this.closeLabel : this.innerCloseLabel}
            </bal-button>
          </bal-button-group>
        </div>
      )
    }

    const Popup: FunctionalComponent = () => {
      return (
        <div class={{ ...block.element('popup').class() }}>
          <TriggerIcon></TriggerIcon>
          <bal-popup
            id={this.componentId}
            placement="right"
            ref={el => (this.popupElement = el as HTMLBalPopupElement)}
            onBalChange={this.onPopupChange}
            variant={this.isMobile ? 'fullscreen' : 'popover'}
            offset={this.isMobile ? 0 : 16}
          >
            <bal-popup-content>
              <HintContent></HintContent>
            </bal-popup-content>
          </bal-popup>
        </div>
      )
    }

    return (
      <Host
        class={{
          ...block.class(),
        }}
      >
        <Popup></Popup>
        <div ref={el => (this.slotWrapperEl = el)} style={{ display: 'none' }}>
          <slot></slot>
        </div>
      </Host>
    )
  }
}

let hintIds = 0
