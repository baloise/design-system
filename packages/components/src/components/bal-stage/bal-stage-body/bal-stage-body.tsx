import { Component, h, ComponentInterface, Host, Element } from '@stencil/core'
import { BEM } from '../../../utils/bem'
@Component({
  tag: 'bal-stage-body',
})
export class StageBody implements ComponentInterface {
  @Element() el!: HTMLElement

  render() {
    const block = BEM.block('stage-body')

    return (
      <Host class={{ ...block.class() }}>
        <slot></slot>
      </Host>
    )
  }
}
