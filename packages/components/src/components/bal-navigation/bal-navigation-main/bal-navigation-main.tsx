import { Component, h, ComponentInterface, Host, Element } from '@stencil/core'
import { BEM } from '../../../utils/bem'

@Component({
  tag: 'bal-navigation-main',
})
export class NavigationMain implements ComponentInterface {
  @Element() el!: HTMLElement

  render() {
    const mainEl = BEM.block('nav').element('main')
    return (
      <Host class={{ ...mainEl.class() }}>
        <slot name="main-head" />
        <slot name="main-body" />
      </Host>
    )
  }
}
