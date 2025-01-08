import { Component, h, ComponentInterface, Host, Prop, Element, State } from '@stencil/core'
import { BEM } from '../../../utils/bem'
import { Attributes, inheritAttributes } from '../../../utils/attributes'
import { rOnLoad } from 'packages/core/src/utils/helpers'

@Component({
  tag: 'bal-stage-image',
})
export class StageImage implements ComponentInterface {
  private imageInheritAttributes: Attributes = {}

  @Element() el!: HTMLElement
  @State() isLargestContentfulPaintDone = false

  /**
   * set of images to be used as background image
   */
  @Prop() srcSet!: string

  /**
   * optional fallback image in case the srcSet fails
   */
  @Prop() fallback?: string

  componentDidLoad(): void {
    rOnLoad(() => {
      this.isLargestContentfulPaintDone = true
    })
  }

  componentWillLoad() {
    this.imageInheritAttributes = inheritAttributes(this.el, ['alt'])
  }

  render() {
    const block = BEM.block('stage-image')
    const imageSrc = this.fallback ? this.fallback : this.srcSet.split(',')[0]

    return (
      <Host class={{ ...block.class() }}>
        {this.isLargestContentfulPaintDone ? (
          <img src={imageSrc} srcset={this.srcSet} sizes="100vw" {...this.imageInheritAttributes} />
        ) : (
          ''
        )}
      </Host>
    )
  }
}
