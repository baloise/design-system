import {
  Component,
  h,
  ComponentInterface,
  Host,
  Element,
  Prop,
  Listen,
  State,
  FunctionalComponent,
  Watch,
} from '@stencil/core'
import { Props } from '../../types'
import { BEM } from '../../utils/bem'
import type { AnimationItem } from 'lottie-web/build/player/lottie_light_html'
import { isPlatform } from '../../utils/platform'
import { ResizeHandler } from '../../utils/resize'
import { Loggable, Logger, LogInstance } from '../../utils/log'
import { rIC } from '../../utils/helpers'

type LogoAnimationFunction = (el: HTMLElement, color: 'blue' | 'white') => AnimationItem

@Component({
  tag: 'bal-logo',
  styleUrls: {
    css: 'bal-logo.sass',
  },
})
export class Logo implements ComponentInterface, Loggable {
  private animationItem!: AnimationItem
  private animatedLogoElement!: HTMLDivElement
  private animationFunction?: LogoAnimationFunction
  private resizeWidthHandler = ResizeHandler()

  log!: LogInstance

  @Logger('bal-logo')
  createLogger(log: LogInstance) {
    this.log = log
  }

  @Element() el!: HTMLElement

  @State() logoSvg: any = ''
  @State() isTouch = isPlatform('touch')

  @Watch('isTouch')
  touchWatcher() {
    if (this.isTouch) {
      this.loadSmallSVGLogo()
    } else {
      this.loadLargeSVGLogo()
    }
  }

  /**
   * PUBLIC PROPERTY API
   * ------------------------------------------------------
   */

  /**
   * Defines the color of the logo.
   */
  @Prop() color: Props.BalLogoColor = 'blue'

  /**
   * Defines if the animation should be active
   */
  @Prop() animated = false
  @Watch('animated')
  animatedWatcher() {
    if (!this.animated) {
      this.destroyAnimation()
      this.touchWatcher()
    }
  }

  /**
   * LIFECYCLE
   * ------------------------------------------------------
   */

  connectedCallback() {
    this.animatedWatcher()
  }

  componentDidUpdate() {
    this.resetAnimation()
  }

  componentDidLoad() {
    this.resetAnimation()
    this.touchWatcher()
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

  @Listen('resize', { target: 'window' })
  async resizeHandler() {
    this.resizeWidthHandler(() => {
      this.isTouch = isPlatform('touch')
    })
  }

  /**
   * PRIVATE METHODS
   * ------------------------------------------------------
   */

  private async resetAnimation() {
    this.destroyAnimation()
    if (this.animated) {
      await this.loadAnimation()

      if (this.animationFunction) {
        this.destroyAnimation()
        this.animationItem = this.animationFunction(this.animatedLogoElement, this.color)
      }
    }
  }

  private async loadAnimation(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.animationFunction) {
        return resolve()
      } else {
        rIC(async () => {
          import('./bal-logo.animation')
            .then(module => {
              this.animationFunction = module.animate
              resolve()
            })
            .catch(reject)
        })
      }
    })
  }

  private async loadSmallSVGLogo(): Promise<void> {
    return new Promise((resolve, reject) => {
      rIC(async () => {
        import('./bal-logo.small')
          .then(module => {
            this.logoSvg = module.logo
            resolve()
          })
          .catch(reject)
      })
    })
  }

  private async loadLargeSVGLogo(): Promise<void> {
    return new Promise((resolve, reject) => {
      rIC(async () => {
        import('./bal-logo.large')
          .then(module => {
            this.logoSvg = module.logo
            resolve()
          })
          .catch(reject)
      })
    })
  }

  private destroyAnimation() {
    if (this.animated && this.animationItem && this.animationItem.destroy) {
      this.animationItem.destroy()
    }
  }

  /**
   * RENDER
   * ------------------------------------------------------
   */

  render() {
    const logoBlock = BEM.block('logo')

    const AnimatedLogo: FunctionalComponent = () => {
      return (
        <div
          style={{
            width: this.isTouch ? '100px' : '158px',
            height: this.isTouch ? '22px' : '32px',
          }}
          ref={el => (this.animatedLogoElement = el as HTMLDivElement)}
        ></div>
      )
    }

    const NonAnimatedLogo: FunctionalComponent = () => {
      return <div>{this.logoSvg}</div>
    }

    const LogoElement = this.animated ? AnimatedLogo : NonAnimatedLogo

    return (
      <Host
        class={{
          ...logoBlock.class(),
          ...logoBlock.modifier(this.color).class(),
          ...logoBlock.modifier('animated').class(this.animated),
        }}
      >
        <LogoElement></LogoElement>
      </Host>
    )
  }
}
