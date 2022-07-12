import { Component, h, ComponentInterface, Host } from '@stencil/core'
import { BEM } from '../../../utils/bem'

@Component({
  tag: 'bal-navigation-meta',
})
export class NavigationMeta implements ComponentInterface {
  render() {
    const metaEl = BEM.block('nav').element('meta')

    return (
      <Host
        class={{
          ...metaEl.class(),
        }}
      >
        <nav role="navigation" aria-label="TODO i18n meta nav">
          <slot></slot>
        </nav>
      </Host>
    )
  }
}
