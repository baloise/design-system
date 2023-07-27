import { Component, h, ComponentInterface, Host } from '@stencil/core'
import { BEM } from '../../../utils/bem'

@Component({
  tag: 'bal-date',
  shadow: true,
})
export class Date implements ComponentInterface {
  /**
   * PUBLIC PROPERTY API
   * ------------------------------------------------------
   */

  /**
   * EVENT BINDING
   * ------------------------------------------------------
   */

  /**
   * RENDER
   * ------------------------------------------------------
   */

  render() {
    const block = BEM.block('date')

    return (
      <Host
        class={{
          ...block.class(),
        }}
      >
        hello world
      </Host>
    )
  }
}
