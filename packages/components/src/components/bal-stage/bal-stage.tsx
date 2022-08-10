import { Component, h, ComponentInterface, Host, Prop } from '@stencil/core'
import { Props } from '../../types'
import { BEM } from '../../utils/bem'

@Component({
  tag: 'bal-stage',
})
export class Stage implements ComponentInterface {
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

  getContainerWidth = () => {
    switch (this.containerSize) {
      case 'is-fluid':
        return '100%'
      case 'is-detail-page':
        return '680px'
      case 'is-compact':
        return '832px'
      case 'is-blog-page':
        return '920px'
      case 'is-wide':
        return '1400px'
      default:
        return '100vw'
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
          ...block.modifier(`is-${this.color}`).class(!!this.color),
          ...block.modifier('has-shape').class(!!this.hasShape),
        }}
        style={{ '--bal-stage-container-width': this.getContainerWidth() }}
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
