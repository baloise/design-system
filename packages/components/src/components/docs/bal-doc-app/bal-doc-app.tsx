import { Component, Host, h, Event, EventEmitter, Prop } from '@stencil/core'
import globalScript from '../../../global'
import { BalMode } from '../../../types'
import { initStyleMode } from '../../../utils/config'
import { isBrowser } from '../../../utils/browser'

@Component({
  tag: 'bal-doc-app',
  styleUrl: '../../../styles/global.all.sass',
})
export class DocApp {
  /**
   * Mode defines how the styles are loaded. With `css` each component loads his own styles
   * and with `sass` the component styles needs to be imported with the file `global.components.sass`.
   */
  @Prop() mode: BalMode = 'all'

  @Event({ bubbles: true, composed: true }) balAppLoad!: EventEmitter<boolean>

  connectedCallback() {
    globalScript()
    initStyleMode(this.mode)
  }

  componentDidLoad() {
    this.balAppLoad.emit(true)
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
