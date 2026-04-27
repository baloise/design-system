import { Component, ComponentInterface, Element, h, Host, Prop } from '@stencil/core'
import { HTMLStencilElement, Watch } from '@stencil/core/internal'
import { normalizeDeprecatedTShirtSize } from '../../utils/t-shirt'
import { Loggable, Logger, LogInstance } from '../../utils/log'

@Component({
  tag: 'ds-list',
  styleUrl: 'list.host.scss',
  shadow: true,
})
export class List implements ComponentInterface, Loggable {
  log!: LogInstance

  @Logger('list')
  createLogger(log: LogInstance) {
    this.log = log
  }

  @Element() el!: HTMLStencilElement

  @Prop() readonly ordered: boolean = false

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
