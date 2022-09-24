import { Component, Host, h, Event, EventEmitter } from '@stencil/core'
import globalScript from '../../global'

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
      <Host role="application" class="bal-app">
        <slot></slot>
      </Host>
    )
  }
}
