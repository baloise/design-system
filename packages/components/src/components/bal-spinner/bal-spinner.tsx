import { Component, h, Host, Prop, Element } from '@stencil/core'
import Lottie from 'lottie-web'
import type { AnimationItem, AnimationDirection } from 'lottie-web'
import { SpinnerAnimationData } from './bal-spinner.animation'

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
  @Prop() color: 'blue' | 'white' | 'grey' = 'blue'

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

    if (this.color === 'grey') {
      return '#a4a4a4'
    }

    return '#151f6d'
  }

  resetAnimation() {
    if (this.animation) {
      this.animation.destroy()
    }
    let direction: AnimationDirection = 1
    this.animation = Lottie.loadAnimation({
      container: this.el,
      renderer: 'svg',
      loop: false,
      autoplay: true,
      animationData: SpinnerAnimationData(this.getColor()),
    })
    this.animation.setSpeed(0.75)
    this.animation.addEventListener('complete', () => {
      direction = (direction * -1) as AnimationDirection
      this.animation.setDirection(direction)
      this.animation.play()
    })
  }

  disconnectedCallback() {
    this.animation.destroy()
  }

  render() {
    return <Host style={{ width: this.small ? '32px' : '64px' }}></Host>
  }
}
