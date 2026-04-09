import { Component, h, Host } from '@stencil/core'
import { Loggable, Logger, LogInstance } from '../../../utils/log'

@Component({
  tag: 'ds-tag-group',
  styleUrl: 'tag-group.host.scss',
  shadow: true,
})
export class TagGroup implements Loggable {
  log!: LogInstance

  @Logger('tag-group')
  createLogger(log: LogInstance) {
    this.log = log
  }

  render() {
    return (
      <Host>
        <slot />
      </Host>
    )
  }
}
