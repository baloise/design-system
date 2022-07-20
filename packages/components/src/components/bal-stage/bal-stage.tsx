import { Component, h, ComponentInterface, Host, Element, Prop, State, Listen } from '@stencil/core'
import { Props } from '../../types'
import { isPlatform } from '../../'
import { Platforms, PlatformSrcSet } from '../../types'
import { BEM } from '../../utils/bem'

@Component({
  tag: 'bal-stage',
})
export class Stage implements ComponentInterface {
  @Element() el!: HTMLElement

  @State() viewPort: Platforms = 'mobile'
  @State() imageSrc: PlatformSrcSet = {}

  /**
   * Defines content width of the stage
   */
  @Prop() containerSize: '' | 'is-fluid' | 'is-detail-page' | 'is-compact' | 'is-blog-page' | 'is-wide' = 'is-wide'

  /**
   * Defines size of the stage
   */
  @Prop() size: Props.BalStageSize = ''

  /**
   * Defines the background color of the stage section
   */
  @Prop() color: Props.BalStageColor = 'red'

  /**
   * If true the Baloise Shape is set
   */
  @Prop() hasShape = false

  /**
   * Shape Variation
   */
  @Prop() shapeVariation?: Props.BalShapeVariation

  /**
   * Shape Rotation
   */
  @Prop() shapeRotation?: Props.BalShapeRotation

  /**
   * sets text color to white for images and dark backgrounds (optional)
   */
  @Prop() inverted?: boolean = false

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
    const block = BEM.block('stage')
    const element = BEM.block('stage-content')
    return (
      <Host
        class={{
          ...block.class(),
          ...block.modifier(`is-${this.size}`).class(!!this.size),
          ...block.modifier(`is-${this.color}`).class(!!this.color && !this.images),
          ...block.modifier('has-background-image').class(!!this.images),
          ...block.modifier('has-shape').class(!!this.hasShape),
        }}
        style={{
          '--bal-background-image':
            Object.keys(this.imageSrc).length > 0 ? `url('${this.imageSrc[this.viewPort]}')` : '',
        }}
      >
        <section
          class={{
            ...element.class(),
            ...element.modifier('is-inverted').class(this.inverted === true || this.color === 'blue'),
            [`container ${this.containerSize}`]: this.containerSize !== '',
          }}
        >
          <slot></slot>
          {this.hasShape && (
            <bal-shape
              color={this.color as Props.BalShapeColor}
              variation={this.shapeVariation}
              rotation={this.shapeRotation}
            />
          )}
        </section>
      </Host>
    )
  }
}
