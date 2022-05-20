import { Component, Host, h } from '@stencil/core'
import { BEM } from '../../../utils/bem'

@Component({
  tag: 'bal-hint-text',
})
export class HintText {
  render() {
    const block = BEM.block('hint-text')
    const elContent = block.element('content')

    return (
      <Host
        class={{
          ...block.class(),
        }}
      >
        <p
          class={{
            ...elContent.class(),
          }}
        >
          <slot></slot>
        </p>
      </Host>
    )
  }
}
