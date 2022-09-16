import { Component, h, ComponentInterface, Host, Prop, Watch } from '@stencil/core'
import { Props } from '../../types'
import { BEM } from '../../utils/bem'

@Component({
  tag: 'bal-stage',
})
export class Stage implements ComponentInterface {
  /**
   * Defines content width of the stage
   */
  @Prop() containerSize: Props.BalStageContainer = ''

  /**
   * Defines size of the stage
   */
  @Prop() size: Props.BalStageSize = ''

  /**
   * Defines the background color of the stage section
   */
  @Prop() color: Props.BalStageColor = 'purple'

  /**
   * If true the Baloise Shape is set
   */
  @Prop() shape = false

  /**
   * @deprecated If true the Baloise Shape is set
   */
  @Prop() hasShape = false
  @Watch('hasShape')
  hasShapeHandler() {
    console.warn('[DEPRECATED] - Please use the property shape instead')
    if (this.hasShape === true) {
      this.shape = this.hasShape
    }
  }

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

  getContainerWidth = () => {
    switch (this.containerSize) {
      case 'is-detail-page':
      case 'detail-page':
        return '680px'
      case 'is-compact':
      case 'compact':
        return '832px'
      case 'is-blog-page':
      case 'blog-page':
        return '920px'
      case 'is-fluid':
      case 'fluid':
        return '100vw'
      case 'is-wide':
      case 'wide':
      default:
        return '1400px'
    }
  }

  private get containerClass(): string {
    if (this.containerSize.includes('wide')) {
      return ''
    }

    if (this.containerSize.startsWith('is-')) {
      return this.containerSize
    }
    return `is-${this.containerSize}`
  }

  render() {
    const block = BEM.block('stage')
    const element = BEM.block('stage-content')

    return (
      <Host
        class={{
          ...block.class(),
          ...block.modifier(`is-${this.size === '' ? 'medium' : this.size}`).class(),
          ...block.modifier(`is-${this.color}`).class(!!this.color),
          ...block.modifier('has-shape').class(!!this.shape),
        }}
        style={{ '--bal-stage-container-width': this.getContainerWidth() }}
      >
        <section
          class={{
            ...element.class(),
            ...element.modifier('is-inverted').class(this.inverted),
            container: true,
            [`${this.containerClass}`]: this.containerSize !== '',
          }}
        >
          <slot></slot>
          {this.shape && (
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
