import { Component, Host, h, Event, EventEmitter, Prop, Method } from '@stencil/core'
import { isBrowser } from '../../utils/browser'
import { BalMode, initStyleMode, updateBalAnimated } from '../../utils/config'
import { rIC } from '../../utils/helpers'
import { Loggable, Logger, LogInstance } from '../../utils/log'

@Component({
  tag: 'bal-app',
  styleUrls: {
    css: 'bal-app.sass',
  },
})
export class App implements Loggable {
  private focusVisible?: any
  log!: LogInstance

  @Logger('bal-app')
  createLogger(log: LogInstance) {
    this.log = log
  }

  /**
   * @deprecated Mode defines how the styles are loaded. With `css` each component loads his own styles
   * and with `sass` the component styles needs to be imported with the file `components.sass`.
   */
  @Prop({ reflect: true }) mode: BalMode = 'css'

  /**
   * Disables all animation inside the bal-app. Can be used for simplify e2e testing.
   */
  @Prop({ reflect: true }) animated = true

  /**
   * @internal Is `true` when DS components are ready to be shown.
   */
  @Prop({ reflect: true, mutable: true }) ready = false

  /**
   * @internal
   * Tells if the components are ready
   */
  @Event({ bubbles: true, composed: true }) balAppLoad!: EventEmitter<boolean>

  connectedCallback() {
    initStyleMode(this.mode)
    updateBalAnimated(this.animated)
  }

  componentDidLoad() {
    rIC(async () => {
      this.balAppLoad.emit(true)
      this.ready = true
      import('../../utils/focus-visible').then(module => (this.focusVisible = module.startFocusVisible()))
    })
  }

  @Method()
  async setFocus(elements: HTMLElement[]) {
    if (this.focusVisible) {
      this.focusVisible.setFocus(elements)
    }
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
