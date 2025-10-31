import { Component, ComponentInterface, Element, h, Host, Prop, State } from '@stencil/core'
import { HTMLStencilElement } from '@stencil/core/internal'
import { rOnLoad } from 'packages/core/src/utils/helpers'
import { Attributes, inheritAttributes } from '../../../utils/attributes'
import { BEM } from '../../../utils/bem'

@Component({
  tag: 'bal-stage-image',
})
export class StageImage implements ComponentInterface {
  private imageInheritAttributes: Attributes = {}

  @Element() el!: HTMLStencilElement
  @State() isOnLoadEventDone = false

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
      this.isOnLoadEventDone = true
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
        {this.isOnLoadEventDone ? (
          <img src={imageSrc} srcset={this.srcSet} sizes="100vw" {...this.imageInheritAttributes} />
        ) : (
          ''
        )}
      </Host>
    )
  }
}
