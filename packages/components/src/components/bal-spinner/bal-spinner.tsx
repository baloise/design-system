import { Component, h, Host, Prop, Element } from '@stencil/core'
import Lottie from 'lottie-web/build/player/lottie_light_html'
import type { AnimationItem } from 'lottie-web/build/player/lottie_light_html'
import { SpinnerAnimationData } from './bal-spinner.animation'
import { flatten } from 'lottie-colorify'

@Component({
  tag: 'bal-spinner',
})
export class Spinner {
  @Element() el!: HTMLElement

  /**
   * If `true` the component can be used on dark background
   */
  @Prop() inverted = false

  /**
   * Defines the color of the spinner.
   */
  @Prop() color: 'blue' | 'white' = 'blue'

  /**
   * If `true` the component is smaller
   */
  @Prop() small = false

  animation!: AnimationItem

  componentDidUpdate() {
    this.resetAnimation()
  }
  componentDidLoad() {
    this.resetAnimation()
  }

  getColor(): string {
    if (this.inverted || this.color === 'white') {
      return '#ffffff'
    }

    return '#151f6d'
  }

  resetAnimation() {
    if (this.animation) {
      this.animation.destroy()
    }
    this.animation = Lottie.loadAnimation({
      container: this.el,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: flatten(this.getColor(), SpinnerAnimationData(this.getColor())),
    })
  }

  disconnectedCallback() {
    if (this.animation && this.animation.destroy) {
      this.animation.destroy()
    }
  }

  render() {
    return <Host style={{ width: this.small ? '32px' : '64px' }}></Host>
  }
}
