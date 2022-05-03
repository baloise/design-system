import { Component, h, Host, Prop, Element, getAssetPath, Watch } from '@stencil/core'
import Lottie from 'lottie-web/build/player/lottie_light_html'
import type { AnimationItem } from 'lottie-web/build/player/lottie_light_html'
import { flatten } from 'lottie-colorify'
import { getSpinnerAnimationData, spinnerContent } from './request'

@Component({
  tag: 'bal-spinner',
  assetsDirs: ['assets'],
})
export class Spinner {
  @Element() el!: HTMLElement

  animationData: any

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

  connectedCallback() {
    this.loadAnimation()
  }

  componentDidUpdate() {
    this.resetAnimation()
  }
  componentDidLoad() {
    this.resetAnimation()
  }

  @Watch('color')
  async loadAnimation() {
    const isStorybook = document.getElementsByTagName('bal-doc-app').length > 0
    let url = ''
    if (!isStorybook) {
      url = getAssetPath('./assets/animation.json')
    } else {
      url = `${location.origin}/build/assets/animation.json`
    }
    await getSpinnerAnimationData(url)
    this.animationData = spinnerContent.get(url)
    this.resetAnimation()
  }

  getColor(): string {
    if (this.inverted || this.color === 'white') {
      return '#ffffff'
    }

    return '#151f6d'
  }

  resetAnimation() {
    if (this.animationData) {
      if (this.animation) {
        this.animation.destroy()
      }
      this.animation = Lottie.loadAnimation({
        container: this.el,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        animationData: flatten(this.getColor(), this.animationData),
      })
    }
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
