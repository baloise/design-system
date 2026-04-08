import { Component, ComponentInterface, Element, FunctionalComponent, h, Host, Prop, State, Watch } from '@stencil/core'
import { HTMLStencilElement } from '@stencil/core/internal'
import type { AnimationItem } from 'lottie-web/build/player/lottie_light_html'
import { DsBreakpointObserver, DsBreakpoints, dsBreakpoints, ListenToBreakpoints } from '../../utils/breakpoints'
import { DsConfigObserver, DsConfigState, ListenToConfig } from '../../utils/config'
import { rOnLoad } from '../../utils/helpers'
import { Loggable, Logger, LogInstance } from '../../utils/log'
import { LogoBaloise, LogoHelvetia } from './logo.icons'
import { cssVariables } from '../../utils/css'
import { normalizeDeprecatedTShirtSize } from '../../utils/t-shirt'

type LogoAnimationFunction = (el: HTMLElement, color: string, loop?: boolean) => AnimationItem

@Component({
  tag: 'ds-logo',
  styleUrl: 'logo.host.scss',
  shadow: true,
})
export class Logo implements ComponentInterface, Loggable, DsBreakpointObserver, DsConfigObserver {
  private animationItem!: AnimationItem
  private animatedLogoElement!: HTMLDivElement
  private animationFunction?: LogoAnimationFunction

  log!: LogInstance

  @Logger('bal-logo')
  createLogger(log: LogInstance) {
    this.log = log
  }

  @Element() el!: HTMLStencilElement

  @State() isTouch = dsBreakpoints.isTouch
  @State() doesConfigAllowAnimation = true
  @State() configBrand: DS.LogoBrand = 'baloise'

  /**
   * PUBLIC PROPERTY API
   * ------------------------------------------------------
   */

  /**
   * Defines the color of the logo.
   */
  @Prop({ reflect: true }) color: DS.LogoColor = 'primary'

  /**
   * Size of the logo svg
   */
  @Prop({ mutable: true, reflect: true }) size: DS.LogoSize = ''
  @Watch('size')
  watchSize(newValue: DS.LogoSize) {
    this.size = normalizeDeprecatedTShirtSize(newValue) || ''
  }

  /**
   * Defines the brand of the logo. Default is 'baloise'.
   */
  @Prop({ reflect: true }) brand: DS.LogoBrand = ''

  /**
   * Defines if the animation should be active
   */
  @Prop({ reflect: true }) animated = false
  @Watch('animated')
  animatedWatcher() {
    if (!this.isAnimated) {
      this.destroyAnimation()
    }
  }

  /**
   * LIFECYCLE
   * ------------------------------------------------------
   */

  connectedCallback() {
    this.size = normalizeDeprecatedTShirtSize(this.size) || ''
    this.animatedWatcher()
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
   * LISTENERS
   * ------------------------------------------------------
   */

  @ListenToBreakpoints()
  breakpointListener(breakpoints: DsBreakpoints): void {
    this.isTouch = breakpoints.touch
  }

  @ListenToConfig()
  configChanged(state: DsConfigState): void {
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
