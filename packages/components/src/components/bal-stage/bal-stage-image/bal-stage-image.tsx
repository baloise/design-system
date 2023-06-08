import { Component, h, ComponentInterface, Host, Prop, Element } from '@stencil/core'
import { BEM } from '../../../utils/bem'
import { Attributes } from '../../../interfaces'
import { inheritAttributes } from '../../../utils/attributes'

@Component({
  tag: 'bal-stage-image',
})
export class StageImage implements ComponentInterface {
  private imageInheritAttributes: Attributes = {}

  @Element() el!: HTMLElement

  /**
   * set of images to be used as background image
   */
  @Prop() srcSet!: string

  /**
   * optional fallback image in case the srcSet fails
   */
  @Prop() fallback?: string

  componentWillLoad() {
    this.imageInheritAttributes = inheritAttributes(this.el, ['alt'])
  }

  render() {
    const block = BEM.block('stage-image')

    return (
      <Host class={{ ...block.class() }}>
        <img
          loading="lazy"
          src={this.fallback ? this.fallback : this.srcSet.split(',')[0]}
          srcset={this.srcSet}
          sizes="100vw"
          {...this.imageInheritAttributes}
        />
      </Host>
    )
  }
}
