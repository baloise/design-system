import { Component, h, ComponentInterface, Host } from '@stencil/core'
import { BEM } from '../../../utils/bem'

@Component({
  tag: 'bal-meta-mobile-foot',
})
export class MetaMobileFoot implements ComponentInterface {
  render() {
    const footEl = BEM.block('nav').element('footmobile')

    return (
      <Host class={{ ...footEl.class(), 'is-hidden-desktop': true }}>
        <slot></slot>
      </Host>
    )
  }
}
