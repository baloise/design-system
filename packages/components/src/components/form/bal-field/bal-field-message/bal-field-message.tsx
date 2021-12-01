import { Component, h, Host, Prop } from '@stencil/core'
import { ColorTypesExtended } from '../../../../types/color.types'

@Component({
  tag: 'bal-field-message',
  shadow: false,
  scoped: false,
})
export class FieldMessage {
  /**
   * Defines the color of the message.
   */
  @Prop() color: '' | ColorTypesExtended = ''

  /**
   * If `true` the component takes the whole width
   */
  @Prop() expanded: boolean = false

  render() {
    return (
      <Host
        class={{
          'is-expanded': this.expanded,
          [`help is-${this.color}`]: true,
        }}
      >
        <slot></slot>
      </Host>
    )
  }
}
