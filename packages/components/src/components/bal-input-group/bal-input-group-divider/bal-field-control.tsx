import { Component, h, Host } from '@stencil/core'
import { BEM } from '../../../../utils/bem'

@Component({
  tag: 'bal-input-group-divider',
  styleUrls: {
    css: 'bal-input-group-divider.sass',
  },
})
export class InputGroupDivider {
  render() {
    const block = BEM.block('input-group-divider')

    return (
      <Host
        class={{
          ...block.class(),
        }}
      >
        <div class={{ ...block.element('line').class() }}></div>
      </Host>
    )
  }
}
