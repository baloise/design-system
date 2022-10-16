import { Component, Host, h, Event, EventEmitter } from '@stencil/core'
import * as balIcons from '@baloise/design-system-next-icons'
import globalScript from '../../../global'
import { updateBalIcons } from '../../../config'

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
    updateBalIcons(balIcons)
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
