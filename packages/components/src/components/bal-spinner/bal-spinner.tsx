import { Component, h, Host, Prop, Element, Watch } from '@stencil/core'
import Lottie from 'lottie-web/build/player/lottie_light_html'
import type { AnimationItem } from 'lottie-web/build/player/lottie_light_html'
import { SpinnerAnimationData } from './bal-spinner.animation'
import { flatten } from 'lottie-colorify'

@Component({
  tag: 'bal-spinner',
})
export class Spinner {
  animation!: AnimationItem

  @Element() el!: HTMLElement

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

  componentDidUpdate() {
    this.resetAnimation()
  }
  componentDidLoad() {
    this.resetAnimation()
  }

  disconnectedCallback() {
    this.destroyAnimation()
  }

  getColor(): string {
    return this.inverted || this.color === 'white' ? '#ffffff' : '#151f6d'
  }

  resetAnimation() {
    this.destroyAnimation()
    if (!this.deactivated) {
      this.animation = Lottie.loadAnimation({
        container: this.el,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        animationData: flatten(this.getColor(), SpinnerAnimationData(this.getColor())),
      })
    }
  }

  destroyAnimation() {
    if (this.animation && this.animation.destroy) {
      this.animation.destroy()
    }
  }

  render() {
    return <Host style={{ width: this.small ? '32px' : '64px' }}></Host>
  }
}
