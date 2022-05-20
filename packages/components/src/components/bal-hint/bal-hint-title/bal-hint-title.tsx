import { Component, Host, h } from '@stencil/core'
import { BEM } from '../../../utils/bem'

@Component({
  tag: 'bal-hint-title',
})
export class HintTitle {
  render() {
    const block = BEM.block('hint-title')
    const elHeading = block.element('heading')

    return (
      <Host
        class={{
          ...block.class(),
        }}
      >
        <bal-heading
          class={{
            ...block.class(),
            ...elHeading.class(),
          }}
          level="h4"
          color="primary"
          space="bottom"
        >
          <slot></slot>
        </bal-heading>
      </Host>
    )
  }
}
