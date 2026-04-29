import { DsComponentInterface } from '@global'
import { Component, Element, h, Host, Prop } from '@stencil/core'
import { HTMLStencilElement } from '@stencil/core/internal'
import { Logger, type LogInstance } from '@utils'

@Component({
  tag: 'ds-list',
  styleUrl: 'list.host.scss',
  shadow: true,
})
export class List implements DsComponentInterface {
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
