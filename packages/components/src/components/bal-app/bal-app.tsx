import { Component, Host, h, Event, EventEmitter } from '@stencil/core'
import globalScript from '../../global'
import { isBrowser } from '../../utils/browser'

@Component({
  tag: 'bal-app',
})
export class App {
  @Event({ bubbles: true, composed: true }) balAppLoad!: EventEmitter<boolean>

  connectedCallback() {
    globalScript()
  }

  componentDidLoad() {
    this.balAppLoad.emit(true)
  }

  render() {
    return (
      <Host
        role="application"
        class={{
          'bal-app': true,
          'bal-app--safari': isBrowser('Safari'),
          'bal-app--touch': isBrowser('touch'),
        }}
      >
        <slot></slot>
      </Host>
    )
  }
}
