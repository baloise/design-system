import { Component, h, ComponentInterface, Host, Prop } from '@stencil/core'
import { BEM } from '../../utils/bem'

@Component({
  tag: 'bal-stage',
  styleUrls: {
    css: 'bal-stage.sass',
  },
})
export class Stage implements ComponentInterface {
  /**
   * Defines content width of the stage
   */
  @Prop() containerSize: BalProps.BalStageContainer = ''

  /**
   * Defines size of the stage
   */
  @Prop() size: BalProps.BalStageSize = ''

  /**
   * Defines the background color of the stage section
   */
  @Prop() color: BalProps.BalStageColor = 'purple'

  /**
   * If true the Baloise Shape is set
   */
  @Prop() shape = false

  /**
   * Shape Variation
   */
  @Prop() shapeVariation?: BalProps.BalShapeVariation

  /**
   * Shape Rotation
   */
  @Prop() shapeRotation?: BalProps.BalShapeRotation

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
            container: true,
            [`${this.containerClass}`]: this.containerSize !== '',
          }}
        >
          <slot></slot>
          {this.shape && (
            <div class={{ container: true, [`${this.containerClass}`]: this.containerSize !== '' }}>
              <bal-shape
                color={this.color as BalProps.BalShapeColor}
                variation={this.shapeVariation}
                rotation={this.shapeRotation}
              />
            </div>
          )}
        </section>
      </Host>
    )
  }
}
