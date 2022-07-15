import { Component, h, ComponentInterface, Host, Element, Prop } from '@stencil/core'
import { BEM } from '../../../utils/bem'

@Component({
  tag: 'bal-stage-back-link',
})
export class StageBackLink implements ComponentInterface {
  @Element() el!: HTMLElement

  /**
   * Specifies the URL of the page the link goes to
   */
  @Prop() href!: string

  render() {
    const block = BEM.block('stage-back-link')

    return (
      <Host class={{ ...block.class() }}>
        <a href={this.href}>
          <bal-icon class="mr-2" name="caret-left" size="xsmall"></bal-icon>
          <slot></slot>
        </a>
      </Host>
    )
  }
}
