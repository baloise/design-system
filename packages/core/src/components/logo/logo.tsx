import { Component, Element, h, Host, Method, Prop, State, Watch } from '@stencil/core'
import { HTMLStencilElement } from '@stencil/core/internal'
import type { AnimationItem } from 'lottie-web/build/player/lottie_light_html'
import {
  DsBreakpointObserver,
  DsBreakpoints,
  dsBreakpoints,
  ListenToBreakpoints,
  rOnLoad,
  normalizeDeprecatedTShirtSize,
  Logger,
  type LogInstance,
  ValidateEmptyOrOneOf,
  ValidateEmptyOrType,
  setupValidation,
} from '@utils'
import { DsComponentInterface, DsConfigObserver, DsConfigState, ListenToConfig } from '@global'
import { LogoBaloise, LogoHelvetia } from './logo.icons'
import { LOGO_BRANDS, LOGO_COLORS, LOGO_SIZES, LogoBrand, LogoColor, LogoSize } from './logo.interfaces'

type LogoAnimationFunction = (el: HTMLElement, color: string, loop?: boolean) => AnimationItem

/**
 * Logo displays animated Baloise or Helvetia brand logos with customizable color, size, and responsive sizing.
 *
 * @slot - Optional label or caption text.
 * @part animated - The animated logo container element.
 */
@Component({
  tag: 'ds-logo',
  styleUrl: 'logo.host.scss',
  shadow: true,
})
export class Logo implements DsComponentInterface, DsBreakpointObserver, DsConfigObserver {
  log!: LogInstance

  @Logger('logo')
  createLogger(log: LogInstance) {
    this.log = log
  }

  @Element() el!: HTMLStencilElement

  @State() isTouch = dsBreakpoints.isTouch
  @State() doesConfigAllowAnimation = true
  @State() configBrand: LogoBrand = 'baloise'

  private animationItem!: AnimationItem
  private animatedLogoElement!: HTMLDivElement
  private animationFunction?: LogoAnimationFunction

  /**
   * PUBLIC PROPERTY API
   * ------------------------------------------------------
   */

  /**
   * Defines if the animation should be active
   */
  @Prop()
  @ValidateEmptyOrType('boolean')
  readonly animated: boolean = false
  @Watch('animated')
  animatedChanged() {
    if (!this.isAnimated) {
      this.destroyAnimation()
    }
  }

  /**
   * Defines the brand of the logo. Default is 'baloise'.
   */
  @Prop()
  @ValidateEmptyOrOneOf(...LOGO_BRANDS)
  readonly brand: LogoBrand = ''

  /**
   * Defines the color of the logo.
   */
  @Prop()
  @ValidateEmptyOrOneOf(...LOGO_COLORS)
  readonly color: LogoColor = 'primary'

  /**
   * Size of the logo svg
   */
  @Prop({ mutable: true })
  @ValidateEmptyOrOneOf(...LOGO_SIZES)
  size: LogoSize = ''
  @Watch('size')
  sizeChanged(newValue: LogoSize) {
    this.size = normalizeDeprecatedTShirtSize(newValue) || ''
  }

  /**
   * LIFECYCLE
   * ------------------------------------------------------
   */

  connectedCallback() {
    setupValidation(this)
    this.size = normalizeDeprecatedTShirtSize(this.size) || ''
    this.animatedChanged()
  }

  componentWillUpdate() {
    setupValidation(this)
  }

  componentDidUpdate() {
    this.resetAnimation()
  }

  componentDidLoad() {
    this.resetAnimation()
  }

  disconnectedCallback() {
    if (this.el && !this.el.isConnected) {
      this.destroyAnimation()
    }
  }

  /**
   * PUBLIC LISTENERS
   * ------------------------------------------------------
   */

  @ListenToBreakpoints()
  listenToBreakpoint(breakpoints: DsBreakpoints): void {
    this.isTouch = breakpoints.touch
  }

  /**
   * @internal define config for the component
   */
  @Method()
  @ListenToConfig()
  async configChanged(state: DsConfigState): Promise<void> {
    this.doesConfigAllowAnimation = state.animated
    this.configBrand = state.brand
  }

  /**
   * PRIVATE METHODS
   * ------------------------------------------------------
   */

  private get isAnimated() {
    return this.doesConfigAllowAnimation && this.animated
  }

  private async resetAnimation() {
    this.destroyAnimation()
    if (this.animated) {
      await this.loadAnimation()

      if (this.animationFunction) {
        this.destroyAnimation()

        this.animationItem = this.animationFunction(this.animatedLogoElement, this.getColor(), false)
      }
    }
  }

  private async loadAnimation(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.animationFunction) {
        return resolve()
      } else {
        rOnLoad(async () => {
          import(/* @vite-ignore */ './logo.animation')
            .then(module => {
              this.animationFunction = module.animate
              resolve()
            })
            .catch(reject)
        })
      }
    })
  }

  private destroyAnimation() {
    if (this.animated && this.animationItem && this.animationItem.destroy) {
      this.animationItem.destroy()
    }
    if (this.animatedLogoElement) {
      this.animatedLogoElement.innerHTML = ''
    }
  }

  private getColor() {
    return this.color === 'white' ? '#ffffff' : '#151f6d'
  }

  private getHeight() {
    if (this.size === 'sm') {
      return 22
    }

    if (this.size === 'lg') {
      return this.isTouch ? 32 : 48
    }

    return this.isTouch ? 22 : 32
  }

  /**
   * RENDER
   * ------------------------------------------------------
   */

  render() {
    const LogoElement =
      this.brand === 'helvetia' || (this.brand === '' && this.configBrand === 'helvetia') ? (
        <LogoHelvetia onlyText={this.animated} height={this.getHeight()} />
      ) : (
        <LogoBaloise onlyText={this.animated} height={this.getHeight()} />
      )

    return (
      <Host>
        <div
          id="animated"
          part="animated"
          ref={el => (this.animatedLogoElement = el as HTMLDivElement)}
          aria-hidden="true"
          style={{
            display: this.isAnimated ? 'block' : 'none',
            width: this.getHeight() + 'px',
            height: this.getHeight() + 'px',
          }}
        ></div>
        {LogoElement}
      </Host>
    )
  }
}
