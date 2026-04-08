import { Component, ComponentInterface, Element, h, Host, Prop } from '@stencil/core'
import { HTMLStencilElement, Watch } from '@stencil/core/internal'
import { normalizeDeprecatedTShirtSize } from '../../utils/t-shirt'

@Component({
  tag: 'bal-list',
  styleUrl: 'list.host.scss',
  shadow: true,
})
export class List implements ComponentInterface {
  @Element() el!: HTMLStencilElement

  @Prop() ordered = false

  render() {
    const ListTag = this.ordered ? 'ol' : 'ul'

    return (
      <Host>
        <ListTag id="list" part="list">
          <slot></slot>
        </ListTag>
      </Host>
    )
  }
}
