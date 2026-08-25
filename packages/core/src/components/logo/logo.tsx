import { Component, Element, h, Host, Method, Prop, State, Watch } from '@stencil/core'
import { HTMLStencilElement } from '@stencil/core/internal'
import type { AnimationItem } from 'lottie-web/build/player/lottie_light_html'
import {
  DsComponentLogoColorInverted,
  DsComponentLogoColorPrimary,
  DsComponentLogoSizeBaseDesktop,
  DsComponentLogoSizeBaseMobile,
  DsComponentLogoSizeLgDesktop,
  DsComponentLogoSizeLgMobile,
  DsComponentLogoSizeSmDesktop,
  DsComponentLogoSizeSmMobile,
} from '@baloise/ds-tokens'
import {
  DsBreakpointObserver,
  DsBreakpoints,
  dsBreakpoints,
  ListenToBreakpoints,
  rOnLoad,
  normalizeDeprecatedTShirtSize,
  hasValue,
  Logger,
  type LogInstance,
  OneOf,
  Type,
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
   * ─────────────────────────────────────────────────────
   */

  /**
   * Defines if the animation should be active
   */
  @Prop()
  @Type('boolean')
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
  @OneOf(LOGO_BRANDS)
  readonly brand?: LogoBrand

  /**
   * Defines the color of the logo.
   */
  @Prop()
  @OneOf(LOGO_COLORS)
  readonly color: LogoColor = 'primary'

  /**
   * Size of the logo svg
   */
  @Prop()
  @OneOf(LOGO_SIZES)
  readonly size?: LogoSize

  /**
   * LIFECYCLE
   * ─────────────────────────────────────────────────────
   */

  connectedCallback() {
    this.animatedChanged()
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
   * ─────────────────────────────────────────────────────
   */

  @ListenToBreakpoints()
  listenToBreakpoint(breakpoints: DsBreakpoints): void {
    this.isTouch = breakpoints.touch
  }

  /**
   * PUBLIC METHODS
   * ─────────────────────────────────────────────────────
   */

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
   * ─────────────────────────────────────────────────────
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
    return this.color === 'inverted' ? DsComponentLogoColorInverted : DsComponentLogoColorPrimary
  }

  private getHeight() {
    if (this.size === 'sm') {
      return this.isTouch ? DsComponentLogoSizeSmMobile : DsComponentLogoSizeSmDesktop
    }

    if (this.size === 'lg') {
      return this.isTouch ? DsComponentLogoSizeLgMobile : DsComponentLogoSizeLgDesktop
    }

    return this.isTouch ? DsComponentLogoSizeBaseMobile : DsComponentLogoSizeBaseDesktop
  }

  /**
   * RENDER
   * ─────────────────────────────────────────────────────
   */

  render() {
    const size = normalizeDeprecatedTShirtSize(this.size) || ''
    const LogoElement =
      this.brand === 'helvetia' || (!hasValue(this.brand) && this.configBrand === 'helvetia') ? (
        <LogoHelvetia onlyText={this.animated} height={this.getHeight()} />
      ) : (
        <LogoBaloise onlyText={this.animated} height={this.getHeight()} />
      )

    return (
      <Host
        class={{
          'is-animated': this.isAnimated,
          'is-inverted': this.color === 'inverted',
          'is-sm': size === 'sm',
          'is-lg': size === 'lg',
        }}
      >
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
