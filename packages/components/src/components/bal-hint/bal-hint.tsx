import { Component, Host, h, Method, State, Prop, Element, Listen, FunctionalComponent } from '@stencil/core'
import { attachComponentToConfig, BalConfigObserver, BalConfigState, detachComponentToConfig } from '../../config'
import { isPlatform } from '../../utils/platform'
import { BEM } from '../../utils/bem'
import { preventDefault } from '../form/bal-select/utils/utils'

@Component({
  tag: 'bal-hint',
})
export class Hint implements BalConfigObserver {
  @Element() element!: HTMLElement

  private popoverElement!: HTMLBalPopoverElement

  @State() isActive = false
  @State() innerCloseLabel = 'Close'
  @State() isMobile = isPlatform('mobile')
  /**
   * Text for the close button.
   */
  @Prop() closeLabel?: string

  /**
   * Disables the close button for tablet and desktop
   */
  @Prop() small = false

  @Listen('resize', { target: 'window' })
  async resizeHandler() {
    this.isMobile = isPlatform('mobile')
  }

  connectedCallback() {
    attachComponentToConfig(this)
  }

  disconnectedCallback() {
    detachComponentToConfig(this)
  }

  configChanged(state: BalConfigState): void {
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
          this.innerCloseLabel = 'Dichtbij'
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
    console.log('toggle', this.isActive)
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
    this.isActive = false
  }

  private onPopoverChange = (event: CustomEvent<boolean>) => {
    this.isActive = event.detail
    preventDefault(event)
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
            'data-test-hint-trigger': true,
          }}
          bal-popover-trigger
          aria-haspopup="true"
          role="button"
          name="info-circle"
          size="small"
          onClick={() => this.toggle()}
        ></bal-icon>
      )
    }

    const HintContent: FunctionalComponent = () => {
      return (
        <div
          class={{
            ...elContent.class(),
            'p-5': true,
            'data-test-hint-content': true,
          }}
        >
          <div>
            <slot></slot>
          </div>
          <bal-button-group
            class={{
              ...elButtons.class(),
              ...elButtons.modifier('is-hidden-desktop').class(this.small),
            }}
          >
            <bal-button class="data-test-hint-close" color="info" onClick={() => this.dismiss()}>
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
            <HintContent>
              <slot></slot>
            </HintContent>
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
              <HintContent>
                <slot></slot>
              </HintContent>
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
        <HintElement>
          <slot></slot>
        </HintElement>
      </Host>
    )
  }
}
