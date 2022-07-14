import { Component, h, ComponentInterface, Host, Element, Prop } from '@stencil/core'
import { BEM } from '../../../utils/bem'

@Component({
  tag: 'bal-navigation-main',
})
export class NavigationMain implements ComponentInterface {
  @Element() el!: HTMLElement

  @Prop() ariaLabelMain?: string = ''

  render() {
    const mainEl = BEM.block('nav').element('main')
    return (
      <Host class={{ ...mainEl.class() }}>
        <nav role="navigation" aria-label={this.ariaLabelMain}>
          <slot name="main-head" />
        </nav>
        <slot name="main-body" />
      </Host>
    )
  }
}
