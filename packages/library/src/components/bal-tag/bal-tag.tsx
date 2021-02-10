import { Component, h, Host, Prop } from '@stencil/core'
import { ColorTypes } from '../../types/color.types'

@Component({
  tag: 'bal-tag',
  styleUrl: 'bal-tag.scss',
  scoped: true,
  shadow: false,
})
export class Tag {
  /**
   * The theme type of the tag. Given by bulma our css framework.
   */
  @Prop() color: ColorTypes | '' = ''

  render() {
    return (
      <Host>
        <span class={`tag ${this.color !== '' ? `is-${this.color}` : 'default'}`}>
          <bal-text small>
            <slot />
          </bal-text>
        </span>
      </Host>
    )
  }
}
