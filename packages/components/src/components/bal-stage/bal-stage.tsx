import { Component, h, ComponentInterface, Host, Element, Prop, State, Listen } from '@stencil/core'
import { Props } from '../../types'
import { isPlatform } from '../../'
import { Platforms, PlatformSrcSet } from '../../types'

@Component({
  tag: 'bal-stage',
})
export class Stage implements ComponentInterface {
  @Element() el!: HTMLElement

  @State() viewPort: Platforms = 'mobile'
  @State() imageSrc: PlatformSrcSet = {}

  /**
   * Defines the background color of the stage section
   */
  @Prop() color: Props.BalStageColor = 'red'

  /**
   * If true the Baloise Shape is set
   */
  @Prop() hasShape = false

  /**
   * sets text color to white for images and dark backgrounds (optional)
   */
  @Prop() inverted: undefined | boolean = undefined

  /**
   * src-set string for the css background-image
   */
  @Prop() images?: string

  setImageSrc() {
    const images = this.images?.split(',')
    let srcObj = {}
    images?.forEach(image => {
      const string = image.trim()
      const key = string.substring(string.indexOf(' ') + 1)
      const value = string.substring(0, string.indexOf(' '))
      srcObj = { ...srcObj, ...{ [key]: value } }
    })
    this.imageSrc = srcObj
    this.viewPort = 'mobile'
  }

  getImageSrc() {
    if (isPlatform('mobile') && 'mobile' in this.imageSrc) {
      this.viewPort = 'mobile'
    } else if (isPlatform('tablet') && 'tablet' in this.imageSrc) {
      this.viewPort = 'tablet'
    } else if (isPlatform('desktop') && 'desktop' in this.imageSrc) {
      this.viewPort = 'desktop'
    }
  }

  @Listen('resize', { target: 'window' })
  async resizeHandler() {
    if (this.images) {
      this.getImageSrc()
    }
  }

  componentDidLoad() {
    if (this.images) {
      this.setImageSrc()
      this.getImageSrc()
    }
  }

  render() {
    return (
      <Host
        class={{
          'bal-stage': true,
          'has-background-image': !!this.images,
          'has-shape': this.hasShape,
        }}
        style={this.imageSrc ? { '--bal-background-image': `url('${this.imageSrc[this.viewPort]}')` } : {}}
      >
        <section
          class={{
            'bal-stage-content': true,
            [`bal-stage-content--is-${this.color}`]: this.color && !this.images,
            'bal-stage-content--is-inverted': this.inverted === true || this.color === 'blue',
          }}
        >
          <slot></slot>
        </section>
        {this.hasShape && (
          <div class="bal-stage-shape container">
            <div>Shape Placeholder</div>
          </div>
        )}
      </Host>
    )
  }
}
