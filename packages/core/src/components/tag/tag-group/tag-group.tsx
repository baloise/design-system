import { Component, Element, h, Host } from '@stencil/core'
import { HTMLStencilElement } from '@stencil/core/internal'
import { Logger, type LogInstance } from '@utils'
import { DsComponentInterface } from '@global'

@Component({
  tag: 'ds-tag-group',
  styleUrl: 'tag-group.host.scss',
  shadow: true,
})
export class TagGroup implements DsComponentInterface {
  log!: LogInstance

  @Logger('tag-group')
  createLogger(log: LogInstance) {
    this.log = log
  }

  @Element() el!: HTMLStencilElement

  render() {
    return (
      <Host>
        <slot />
      </Host>
    )
  }
}
