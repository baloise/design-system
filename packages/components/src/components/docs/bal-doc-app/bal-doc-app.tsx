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

  balAppLoadTimer?: NodeJS.Timer

  componentDidLoad() {
    updateBalIcons(balIcons)

    clearTimeout(this.balAppLoadTimer)
    this.balAppLoadTimer = setTimeout(() => this.balAppLoad.emit(true), 0)
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
