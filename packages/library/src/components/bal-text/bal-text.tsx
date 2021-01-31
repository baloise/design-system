import { Component, h, Host, Prop } from '@stencil/core'

@Component({
  tag: 'bal-text',
  styleUrl: 'bal-text.scss',
  shadow: false,
  scoped: false,
})
export class Text {
  @Prop() small = false

  render() {
    return (
      <Host class={{ 'is-small': this.small }}>
        <slot />
      </Host>
    )
  }
}
