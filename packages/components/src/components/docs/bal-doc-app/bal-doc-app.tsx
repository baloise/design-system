import { Component, Host, h, Event, EventEmitter } from '@stencil/core'
import * as balIcons from '@baloise/design-system-next-icons'
import globalScript from '../../../global'
import {
  attachComponentToConfig,
  BalConfigObserver,
  BalConfigState,
  detachComponentToConfig,
  updateBalIcons,
} from '../../../config'

@Component({
  tag: 'bal-doc-app',
  scoped: false,
  shadow: false,
  styleUrl: '../../../styles/global.sass',
})
export class DocApp implements BalConfigObserver {
  didLoad = false
  didLoadIcons = false

  @Event({ bubbles: true, composed: true }) balAppLoad!: EventEmitter<boolean>

  connectedCallback() {
    globalScript()
    attachComponentToConfig(this)
  }

  disconnectedCallback() {
    detachComponentToConfig(this)
  }

  componentDidLoad() {
    updateBalIcons(balIcons)
    this.didLoad = true
    this.notify()
  }

  configChanged(state: BalConfigState): void {
    const hasIconsLoaded = Object.keys(state.icons).length > 0
    if (hasIconsLoaded) {
      this.didLoadIcons = true
    }
    this.notify()
  }

  notify() {
    if (this.didLoad && this.didLoadIcons) {
      this.balAppLoad.emit(true)
    }
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
