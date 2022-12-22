import { Component, h, Host, Prop, Element, Watch, ComponentInterface } from '@stencil/core'
import type { AnimationItem } from 'lottie-web/build/player/lottie_light_html'
import { rIC } from '../../utils/helpers'
import { Loggable, Logger, LogInstance } from '../../utils/log'
import { raf } from '../../utils/helpers'

type SpinnerAnimationFunction = (el: HTMLElement, color: string) => AnimationItem

@Component({
  tag: 'bal-spinner',
  styleUrls: {
    css: 'bal-spinner.sass',
  },
})
export class Spinner implements ComponentInterface, Loggable {
  private animationItem!: AnimationItem
  private animationFunction?: SpinnerAnimationFunction
  private currentRaf: number | undefined

  log!: LogInstance

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
  @Prop() color: 'blue' | 'white' = 'blue'

  /**
   * If `true` the component is smaller
   */
  @Prop() small = false

  /**
   * LIFECYCLE
   * ------------------------------------------------------
   */

  componentDidLoad() {
    this.animate()
  }

  disconnectedCallback() {
    if (this.el && !this.el.isConnected) {
      this.destroy()
    }
  }

  /**
   * PRIVATE METHODS
   * ------------------------------------------------------
   */

  private animate = async () => {
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
        rIC(async () => {
          import('./bal-spinner.animation')
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
    return <Host style={{ width: this.small ? '32px' : '64px' }}></Host>
  }
}
