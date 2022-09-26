import { Component, Host, h, Event, EventEmitter } from '@stencil/core'
import globalScript from '../../../global'

@Component({
  tag: 'bal-doc-app',
  scoped: false,
  shadow: false,
  styleUrl: '../../../styles/global.sass',
})
export class DocApp {
  @Event({ bubbles: true, composed: true }) balAppLoad!: EventEmitter<boolean>

  connectedCallback() {
    globalScript()
  }

  componentDidLoad() {
    this.balAppLoad.emit(true)
  }

  render() {
    return (
      <Host role="application">
        <main class="bal-app">
          <slot></slot>
        </main>
      </Host>
    )
  }
}
