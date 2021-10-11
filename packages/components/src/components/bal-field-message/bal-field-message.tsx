import { Component, h, Host, Prop } from '@stencil/core'
import { ColorTypesExtended } from '../../types/color.types'

@Component({
  tag: 'bal-field-message',
  shadow: false,
  scoped: false,
})
export class FieldMessage {
  /**
   * @internal
   */
  @Prop() color: '' | ColorTypesExtended = ''

  render() {
    return (
      <Host
        class={{
          [`help is-${this.color}`]: true,
        }}
      >
        <slot></slot>
      </Host>
    )
  }
}
