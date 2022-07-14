import { Component, h, ComponentInterface, Host, Element } from '@stencil/core'
import { BEM } from '../../../utils/bem'

@Component({
  tag: 'bal-meta-mobile-foot',
})
export class MetaMobileFoot implements ComponentInterface {
  @Element() el!: HTMLElement

  render() {
    const footEl = BEM.block('nav').element('footmobile')

    return (
      <Host class={{ ...footEl.class() }}>
        <slot></slot>
      </Host>
    )
  }
}
