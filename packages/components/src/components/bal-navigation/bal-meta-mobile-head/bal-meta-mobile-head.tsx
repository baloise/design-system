import { Component, h, ComponentInterface, Host, Element } from '@stencil/core'
import { BEM } from '../../../utils/bem'

@Component({
  tag: 'bal-meta-mobile-head',
})
export class MetaMobileHead implements ComponentInterface {
  @Element() el!: HTMLElement

  render() {
    const metaEl = BEM.block('nav').element('metamobile')

    return (
      <Host class={{ ...metaEl.class(), 'is-hidden-desktop': true }}>
        <nav role="navigation" aria-label="TODO i18n meta nav">
          <slot name="logo" />
          <slot name="meta-mobile-actions" />
          <slot name="burger" />
        </nav>
      </Host>
    )
  }
}
