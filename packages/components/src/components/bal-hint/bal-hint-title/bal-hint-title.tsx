import { Component, Host, h } from '@stencil/core'
import { BEM } from '../../../utils/bem'

@Component({
  tag: 'bal-hint-title',
})
export class HintTitle {
  render() {
    const block = BEM.block('hint')
    const elContent = block.element('content')
    const elTitle = elContent.element('title')
    const elHeading = elTitle.element('heading')

    return (
      <Host
        class={{
          ...elTitle.class(),
        }}
      >
        <h3
          class={{
            ...elHeading.class(),
            'title': true,
            'is-3': true,
          }}
        >
          <span>
            <slot></slot>
          </span>
        </h3>
        {/* <bal-heading
          class={{
            ...elHeading.class(),
          }}
          level="h3"
          color="primary"
          space="bottom"
        >
          <slot></slot>
        </bal-heading> */}
      </Host>
    )
  }
}
