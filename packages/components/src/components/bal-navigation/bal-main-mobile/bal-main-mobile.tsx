import { Component, h, ComponentInterface, Host, Element } from '@stencil/core'
import { BEM } from '../../../utils/bem'

@Component({
  tag: 'bal-main-mobile',
})
export class MainMobile implements ComponentInterface {
  @Element() el!: HTMLElement

  render() {
    const mainEl = BEM.block('nav').element('mainmobile')

    return (
      <Host class={{ ...mainEl.class() }}>
        <slot></slot>
      </Host>
    )
  }
}
