import { Component, h, ComponentInterface, Host } from '@stencil/core'
import { BEM } from '../../../utils/bem'

@Component({
  tag: 'bal-main-mobile',
})
export class MainMobile implements ComponentInterface {
  render() {
    const mainEl = BEM.block('nav').element('mainmobile')

    return (
      <Host class={{ ...mainEl.class(), 'is-hidden-desktop': true }}>
        <slot></slot>
      </Host>
    )
  }
}
