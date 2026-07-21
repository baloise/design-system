import { Component, Host, h } from '@stencil/core'
import { BEM } from '../../../utils/bem'

@Component({
  tag: 'bal-hint-text',
})
export class HintText {
  render() {
    const block = BEM.block('hint')
    const elContent = block.element('content')
    const elText = elContent.element('text')
    const elTextField = elText.element('field')

    return (
      <Host
        class={{
          ...elText.class(),
        }}
      >
        <p
          class={{
            ...elTextField.class(),
          }}
        >
          <slot></slot>
        </p>
      </Host>
    )
  }
}
