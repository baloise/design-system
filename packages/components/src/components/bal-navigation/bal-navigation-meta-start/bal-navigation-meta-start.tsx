import { Component, h, Host } from '@stencil/core'
import { BEM } from '../../../../../../../../../../Downloads/design-system-feat-bal-main-navigation/packages/components/src/utils/bem'

@Component({
  tag: 'bal-navigation-meta-start',
  scoped: false,
  shadow: false,
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
