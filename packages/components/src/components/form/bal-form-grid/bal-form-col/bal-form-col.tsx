import { Component, h, ComponentInterface, Host, Element, Prop } from '@stencil/core'
import { Props } from '../../../../types'

@Component({
  tag: 'bal-form-col',
})
export class FormCol implements ComponentInterface {
  @Element() el!: HTMLElement

  @Prop() size: Props.BalFormColSize = 'fullwidth'

  render() {
    return (
      <Host
        class={{
          'column': true,
          'py-0': true,
          'is-12': this.size === 'fullwidth' || this.size === undefined,
          'is-6': this.size === 'half',
          'is-4': this.size === 'one-third',
          'is-8': this.size === 'two-thirds',
          'is-3': this.size === 'one-quarter',
          'is-9': this.size === 'three-quarters',
        }}
      >
        <slot></slot>
      </Host>
    )
  }
}
