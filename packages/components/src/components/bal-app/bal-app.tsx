import { Component, Host, h, Prop, Method, Element } from '@stencil/core'
import { balBrowser } from '../../utils/browser'
import { balDevice } from '../../utils/device'
import { updateBalAnimated } from '../../utils/config'
import { debounce, rIC } from '../../utils/helpers'
import { Loggable, Logger, LogInstance } from '../../utils/log'

@Component({
  tag: 'bal-app',
  styleUrl: 'bal-app.sass',
})
export class App implements Loggable {
  private focusVisible?: any
  private debouncedNotify = debounce(() => this.notifyResize(), 100)

  @Element() el?: HTMLElement

  log!: LogInstance

  @Logger('bal-app')
  createLogger(log: LogInstance) {
    this.log = log
  }

  /**
   * Disables all animation inside the bal-app. Can be used for simplify e2e testing.
   */
  @Prop({ reflect: true }) animated = true

  /**
   * @internal Is `true` when DS components are ready to be shown.
   */
  @Prop({ reflect: true, mutable: true }) ready = false

  connectedCallback() {
    updateBalAnimated(this.animated)

    if (balBrowser.hasWindow) {
      window.addEventListener('resize', this.debouncedNotify)
      this.debouncedNotify()
    }
  }

  componentDidLoad() {
    rIC(async () => {
      this.ready = true
      import('../../utils/focus-visible').then(module => (this.focusVisible = module.startFocusVisible()))
    })
  }

  disconnectedCallback() {
    if (balBrowser.hasWindow) {
      window.removeEventListener('resize', this.debouncedNotify)
    }
  }

  @Method()
  async setFocus(elements: HTMLElement[]) {
    if (this.focusVisible) {
      this.focusVisible.setFocus(elements)
    }
  }

  notifyResize = async () => {
    if (balBrowser.hasDocument && balBrowser.hasWindow) {
      const doc = document.documentElement
      doc.style.setProperty('--bal-app-height', `${window.innerHeight}px`)
    }
  }

  render() {
    return (
      <Host
        role="application"
        class={{
          'bal-app': true,
          'bal-app--safari': balBrowser.isSafari,
          'bal-app--touch': balDevice.hasTouchScreen,
        }}
      >
        <slot></slot>
      </Host>
    )
  }
}
