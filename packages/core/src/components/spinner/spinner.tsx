import { Component, ComponentInterface, Element, h, Host, Prop, State, Watch } from '@stencil/core'
import { HTMLStencilElement } from '@stencil/core/internal'
import type { AnimationItem } from 'lottie-web/build/player/lottie_light_html'
import { BalConfigObserver, BalConfigState, defaultConfig, ListenToConfig } from '../../utils/config'
import { raf, rOnLoad } from '../../utils/helpers'
import { Loggable, Logger, LogInstance } from '../../utils/log'

type SpinnerAnimationFunction = (el: HTMLElement, color: string) => AnimationItem

@Component({
  tag: 'bal-spinner',
  styleUrl: 'bal-spinner.host.scss',
  shadow: true,
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

  @Element() el!: HTMLStencilElement
  innerEl: HTMLDivElement | undefined

  /**
   * PUBLIC PROPERTY API
   * ------------------------------------------------------
   */

  /**
   * If `true` the component can be used on dark background
   */
  @Prop({ reflect: true }) inverted = false

  /**
   * If `true` the component will not add the spinner animation svg
   */
  @Prop({ reflect: true }) deactivated = false
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
  @Prop({ reflect: true }) color: BalProps.BalSpinnerColor = 'blue'

  /**
   * @Deprecated
   * Use size="sm" instead. If `true` the component is smaller
   */
  @Prop() small = false
  @Watch('small')
  watchSize(newValue: boolean, oldValue: boolean) {
    if (newValue !== oldValue && newValue === true) {
      this.size = 'sm'
    }
  }

  /**
   * Defines the size of the spinner. If `sm` the spinner is smaller.
   */
  @Prop({ reflect: true, mutable: true }) size: BalProps.BalSpinnerSize = ''

  /**
   * Defines the look of the spinner
   */
  @Prop({ reflect: true }) variation: BalProps.BalSpinnerVariation = 'logo'
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

  connectedCallback(): void {
    this.watchSize(this.small, false)
  }

  componentDidLoad() {
    if (this.variation === 'logo') {
      this.animate()
    } else {
      this.destroy()
    }
  }

  disconnectedCallback() {
    if (this.el && this.innerEl && !this.el.isConnected) {
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
        if (this.animationFunction && this.innerEl) {
          this.animationFunction(this.innerEl, this.getColor())
        }
      })
    }
  }

  private destroy = () => {
    if (this.animationItem && this.animationItem.destroy) {
      this.animationItem.destroy()
    }
    this.innerEl!.innerHTML = ''
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
        rOnLoad(async () => {
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
    // Prefer a CSS custom property override if present on the host
    try {
      const cssVar = this.el ? getComputedStyle(this.el).getPropertyValue('--spinner-color').trim() : ''
      if (cssVar) {
        return cssVar
      }
    } catch {
      // Ignore errors, e.g. if getComputedStyle is not available
    }

    // Fallback to component props
    return this.inverted || this.color === 'white' ? '#ffffff' : '#151f6d'
  }

  /**
   * RENDER
   * ------------------------------------------------------
   */

  render() {
    return (
      <Host
        role="progressbar"
        aria-hidden="true"
        class={{
          ['is-animated']: this.animated,
        }}
      >
        <div id="inner" part="inner" ref={el => (this.innerEl = el)}></div>
      </Host>
    )
  }
}
