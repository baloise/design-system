import { Component, h, Host, Prop, Element, Watch, ComponentInterface } from '@stencil/core'
import type { AnimationItem } from 'lottie-web/build/player/lottie_light_html'
import { rIC } from '../../utils/helpers'
import { Loggable, Logger, LogInstance } from '../../utils/log'

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
  deactivatedWatcher() {
    if (this.deactivated) {
      this.destroyAnimation()
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
   * PRIVATE METHODS
   * ------------------------------------------------------
   */

  private async resetAnimation() {
    this.destroyAnimation()
    if (!this.deactivated) {
      await this.loadAnimation()

      if (this.animationFunction) {
        this.animationFunction(this.el, this.getColor())
      }
    }
  }

  private async loadAnimation(): Promise<void> {
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

  private destroyAnimation() {
    if (this.animationItem && this.animationItem.destroy) {
      this.animationItem.destroy()
    }
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
