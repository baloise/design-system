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

@Component({
  tag: 'bal-hint',
  styleUrl: 'bal-hint.sass',
})
export class Hint implements ComponentInterface, BalConfigObserver, BalBreakpointObserver {
  @Element() element!: HTMLElement

  private popoverElement!: HTMLBalPopoverElement
  private slotWrapperEl?: HTMLDivElement
  private hintContentEl?: HTMLDivElement

  private bodyScrollHandler = new BalScrollHandler()

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
    if (this.popoverElement) {
      this.popoverElement.present()
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
    if (this.popoverElement) {
      this.popoverElement.dismiss()
    }
    if (this.isMobile) {
      this.bodyScrollHandler.enable()
    }
    this.isActive = false
  }

  private onPopoverChange = (ev: CustomEvent<boolean>) => {
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

    const padding = this.isMobile ? 0 : 8
    const offsetY = this.isMobile ? 0 : 16

    const TriggerIcon: FunctionalComponent = () => {
      return (
        <bal-icon
          class={{
            ...elIcon.class(),
          }}
          data-testid="bal-hint-trigger"
          bal-popover-trigger
          aria-haspopup="true"
          role="button"
          name="info-circle"
          tabindex={0}
          onClick={() => this.toggle()}
          onKeyDown={(event) => (event.key === ' ' || event.key === 'Enter') && this.toggle()}
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

    const MobileOverlay: FunctionalComponent = () => {
      const elOverlay = block.element('overlay')
      return (
        <div
          class={{
            ...elOverlay.class(),
          }}
        >
          <TriggerIcon></TriggerIcon>
          <div
            class={{
              ...elOverlay.element('content').class(),
              ...elOverlay.element('content').modifier('active').class(this.isActive),
            }}
          >
            <HintContent></HintContent>
          </div>
        </div>
      )
    }

    const Popover: FunctionalComponent = () => {
      return (
        <div class={{ ...block.element('popover').class() }}>
          <bal-popover
            hint
            position="right"
            offsetX={0}
            offsetY={offsetY}
            padding={padding}
            ref={el => (this.popoverElement = el as HTMLBalPopoverElement)}
            onBalChange={this.onPopoverChange}
          >
            <TriggerIcon></TriggerIcon>
            <bal-popover-content color="grey">
              <HintContent></HintContent>
            </bal-popover-content>
          </bal-popover>
        </div>
      )
    }

    const HintElement = this.isMobile ? MobileOverlay : Popover

    return (
      <Host
        class={{
          ...block.class(),
        }}
      >
        <HintElement></HintElement>

        <div ref={el => (this.slotWrapperEl = el)} style={{ display: 'none' }}>
          <slot></slot>
        </div>
      </Host>
    )
  }
}
