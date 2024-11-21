import { Component, h, Host, Prop, Element, Watch, ComponentInterface, State } from '@stencil/core'
import type { AnimationItem } from 'lottie-web/build/player/lottie_light_html'
import { rLCP } from '../../utils/helpers'
import { Loggable, Logger, LogInstance } from '../../utils/log'
import { raf } from '../../utils/helpers'
import { BEM } from '../../utils/bem'
import { BalConfigObserver, BalConfigState, ListenToConfig, defaultConfig } from '../../utils/config'

type SpinnerAnimationFunction = (el: HTMLElement, color: string) => AnimationItem

@Component({
  tag: 'bal-spinner',
  styleUrl: 'bal-spinner.sass',
})
export class Spinner implements ComponentInterface, Loggable, BalConfigObserver {
  private animationItem!: AnimationItem
  private animationFunction?: SpinnerAnimationFunction
  private currentRaf: number | undefined

  log!: LogInstance

  @State() animated = defaultConfig.animated

  @Logger('bal-spinner')
  createLogger(log: LogInstance) {
    this.log = log
  }

  @Element() el!: HTMLElement

  /**
   * PUBLIC PROPERTY API
   * ------------------------------------------------------
   */

  /**
   * If `true` the component can be used on dark background
   */
  @Prop() inverted = false

  /**
   * If `true` the component will not add the spinner animation svg
   */
  @Prop() deactivated = false
  @Watch('deactivated')
  deactivatedWatcher(newValue: boolean, oldValue: boolean) {
    if (newValue !== oldValue) {
      if (this.deactivated) {
        this.destroy()
      } else {
        this.animate()
      }
    }
  }

  /**
   * Defines the color of the spinner.
   */
  @Prop() color: BalProps.BalSpinnerColor = 'blue'

  /**
   * If `true` the component is smaller
   */
  @Prop() small = false

  /**
   * Defines the look of the spinner
   */
  @Prop() variation: BalProps.BalSpinnerVariation = 'logo'
  @Watch('variation')
  variationWatcher(newValue: BalProps.BalSpinnerVariation, oldValue: BalProps.BalSpinnerVariation) {
    if (newValue !== oldValue) {
      if (this.variation === 'circle') {
        this.destroy()
      } else {
        this.animate()
      }
    }
  }

  /**
   * LIFECYCLE
   * ------------------------------------------------------
   */

  componentDidLoad() {
    if (this.variation === 'logo') {
      this.animate()
    } else {
      this.destroy()
    }
  }

  disconnectedCallback() {
    if (this.el && !this.el.isConnected) {
      this.destroy()
    }
  }

  /**
   * LISTENERS
   * ------------------------------------------------------
   */

  @ListenToConfig()
  configChanged(state: BalConfigState): void {
    this.animated = state.animated
    if (state.animated === false) {
      this.destroy()
    }
  }

  /**
   * PRIVATE METHODS
   * ------------------------------------------------------
   */

  private animate = async () => {
    if (!this.animated) {
      this.destroy()
      return
    }

    await this.load()

    if (this.currentRaf !== undefined) {
      cancelAnimationFrame(this.currentRaf)
    }

    if (this.shouldAnimate()) {
      this.destroy()
      this.currentRaf = raf(async () => {
        if (this.animationFunction) {
          this.animationFunction(this.el, this.getColor())
        }
      })
    }
  }

  private destroy = () => {
    if (this.animationItem && this.animationItem.destroy) {
      this.animationItem.destroy()
    }
    this.el.innerHTML = ''
  }

  private shouldAnimate = () => {
    if (this.variation !== 'logo') {
      return false
    }

    if (typeof (window as any) === 'undefined') {
      return false
    }

    if (this.animationFunction === undefined) {
      return false
    }

    return !this.deactivated
  }

  private load = async (): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (this.animationFunction) {
        return resolve()
      } else {
        rLCP(async () => {
          import(/* @vite-ignore */ './bal-spinner.animation')
            .then(module => {
              this.animationFunction = module.animate
              resolve()
            })
            .catch(reject)
        })
      }
    })
  }

  /**
   * GETTERS
   * ------------------------------------------------------
   */

  private getColor(): string {
    return this.inverted || this.color === 'white' ? '#ffffff' : '#151f6d'
  }

  /**
   * RENDER
   * ------------------------------------------------------
   */

  render() {
    const block = BEM.block('spinner')

    return (
      <Host
        class={{
          ...block.class(),
          ...block.modifier('circle').class(this.variation === 'circle'),
          ...block.modifier('small').class(this.small),
          ...block.modifier('animated').class(this.animated),
        }}
        role="progressbar"
        aria-hidden="true"
      ></Host>
    )
  }
}
