import { Component, Host, h, Prop, Method, Element, EventEmitter, Event } from '@stencil/core'
import { balBrowser } from '../../utils/browser'
import { balDevice } from '../../utils/device'
import { updateBalAnimated } from '../../utils/config'
import { debounce, rIC, rOnLoad } from '../../utils/helpers'
import { Loggable, Logger, LogInstance } from '../../utils/log'
import { startFocusVisible } from '../../utils/focus-visible'

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

  /**
   * Emitted when app is ready and painted.
   */
  @Event() balAppReady!: EventEmitter<void>

  connectedCallback() {
    if (this.animated === false) {
      updateBalAnimated(this.animated)
    }

    if (balBrowser.hasWindow) {
      window.addEventListener('resize', this.debouncedNotify)
      this.debouncedNotify()
    }
  }

  componentDidLoad() {
    rIC(() => {
      this.ready = true
      startFocusVisible()
    })

    rOnLoad(() => {
      if (balBrowser.hasDocument && balBrowser.hasWindow) {
        const doc = document.documentElement
        doc.classList.add('lcp-ready')
        this.balAppReady.emit()
      }
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
