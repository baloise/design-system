import { Component, h, Host } from '@stencil/core'
import { BEM } from '../../../utils/bem'

@Component({
  tag: 'bal-navigation-meta-start',
})
export class NavigationMetaStart {
  render() {
    const metaStartEl = BEM.block('nav').element('meta').element('start')

    return (
      <Host
        class={{
          ...metaStartEl.class(),
        }}
      >
        <slot></slot>
      </Host>
    )
  }
}
