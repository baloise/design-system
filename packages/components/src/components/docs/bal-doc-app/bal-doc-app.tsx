import { Component, Host, h, Event, EventEmitter } from '@stencil/core'
import * as balIcons from '@baloise/design-system-next-icons'
import globalScript from '../../../global'
import {
  attachComponentToConfig,
  BalConfigObserver,
  BalConfigState,
  detachComponentToConfig,
  updateBalIcons,
} from '../../../utils/config'
import { isBrowser } from '../../../utils/browser'

@Component({
  tag: 'bal-doc-app',
  styleUrl: '../../../styles/global.sass',
})
export class DocApp implements BalConfigObserver {
  didLoad = false
  didLoadIcons = false

  @Event({ bubbles: true, composed: true }) balAppLoad!: EventEmitter<boolean>

  connectedCallback() {
    globalScript()
    attachComponentToConfig(this)
    updateBalIcons(balIcons)
  }

  disconnectedCallback() {
    detachComponentToConfig(this)
  }

  componentDidLoad() {
    this.didLoad = true
    this.notify()
  }

  componentDidRender() {
    this.notify()
  }

  configChanged(state: BalConfigState): void {
    const hasIconsLoaded = Object.keys(state.icons).length > 0
    if (hasIconsLoaded) {
      this.didLoadIcons = true
    }
    this.notify()
  }

  notifyTimer?: NodeJS.Timer

  notify() {
    clearTimeout(this.notifyTimer)

    this.notifyTimer = setTimeout(() => {
      if (this.didLoad && this.didLoadIcons) {
        this.balAppLoad.emit(true)
      }
    }, 0)
  }

  render() {
    return (
      <Host role="application">
        <main
          class={{
            'bal-app': true,
            'bal-app--safari': isBrowser('Safari'),
            'bal-app--touch': isBrowser('touch'),
          }}
        >
          <slot></slot>
        </main>
      </Host>
    )
  }
}
