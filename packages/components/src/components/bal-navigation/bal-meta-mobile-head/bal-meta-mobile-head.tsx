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
          <div class={{ ...metaEl.element('actions').class() }}>
            <slot name="meta-actions-mobile" />
          </div>
          <slot name="burger" />
        </nav>
      </Host>
    )
  }
}
