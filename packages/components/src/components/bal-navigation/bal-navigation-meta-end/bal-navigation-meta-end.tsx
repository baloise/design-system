import { Component, h, Host } from '@stencil/core'
import { BEM } from '../../../utils/bem'

@Component({
  tag: 'bal-navigation-meta-end',
})
export class NavigationMetaEnd {
  render() {
    const metaEndEl = BEM.block('nav').element('meta').element('end')

    return (
      <Host
        class={{
          ...metaEndEl.class(),
        }}
      >
        <slot></slot>
      </Host>
    )
  }
}
