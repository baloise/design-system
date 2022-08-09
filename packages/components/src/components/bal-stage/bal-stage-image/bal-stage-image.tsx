import { Component, h, ComponentInterface, Host, Prop } from '@stencil/core'
import { BEM } from '../../../utils/bem'

@Component({
  tag: 'bal-stage-image',
})
export class StageImage implements ComponentInterface {
  /**
   * set of images to be used as background image
   */
  @Prop() srcSet!: string

  /**
   * optional fallback image in case the srcSet fails
   */
  @Prop() fallback?: string

  render() {
    const block = BEM.block('stage-image')

    return (
      <Host class={{ ...block.class() }}>
        <img src={this.fallback ? this.fallback : this.srcSet.split(',')[0]} srcset={this.srcSet} sizes="100vw" />
      </Host>
    )
  }
}
