import { Component, Host, h, Event, EventEmitter, Prop } from '@stencil/core'
import { BalMode } from '../../types'
import { isBrowser } from '../../utils/browser'
import { initStyleMode } from '../../utils/config'

@Component({
  tag: 'bal-app',
})
export class App {
  /**
   * Mode defines how the styles are loaded. With `css` each component loads his own styles
   * and with `sass` the component styles needs to be imported with the file `global.components.sass`.
   */
  @Prop({ reflect: true }) mode: BalMode = 'css'

  /**
   * @internal Tells if the component has been loaded and is ready to be shown.
   */
  @Prop({ reflect: true }) ready = false

  /**
   * @internal Fired if the component has been loaded and is ready to be shown.
   */
  @Event({ bubbles: true, composed: true }) balAppLoad!: EventEmitter<boolean>

  connectedCallback() {
    initStyleMode(this.mode)
  }

  componentDidLoad() {
    this.balAppLoad.emit(true)
    this.ready = true
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
