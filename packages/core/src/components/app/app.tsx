import { Component, Element, Event, EventEmitter, h, Host, Method, Prop } from '@stencil/core'
import { HTMLStencilElement } from '@stencil/core/internal'
import { dsBrowser, dsDevice, debounce, rIC, rOnLoad, Logger, type LogInstance } from '@utils'
import { DsComponentInterface, updateDsAnimated, updateDsLogger } from '@global'
import { startFocusVisible } from './app.focus.util'

@Component({
  tag: 'ds-app',
  styleUrl: 'app.scss',
})
export class App implements DsComponentInterface {
  private focusVisible?: any
  private debouncedNotify = debounce(() => this.notifyResize(), 100)

  @Element() el!: HTMLStencilElement

  log!: LogInstance

  @Logger('app')
  createLogger(log: LogInstance) {
    this.log = log
  }

  /**
   * Disables all animation inside the ds-app. Can be used for simplify e2e testing.
   */
  @Prop({ reflect: true }) readonly animated: boolean = true

  /**
   * @internal Is `true` when DS components are ready to be shown.
   */
  @Prop({ reflect: true, mutable: true }) ready = false

  /**
   * @internal Comma separated list of components to log.
   */
  @Prop({ reflect: true }) readonly logger: string = ''

  /**
   * Emitted when app is ready and painted.
   */
  @Event() dsAppReady!: EventEmitter<void>

  connectedCallback() {
    if (this.animated === false) {
      updateDsAnimated(this.animated)
    }

    if (this.logger) {
      updateDsLogger(this.logger.split(',').map(log => log.trim()))
    }

    if (dsBrowser.hasWindow) {
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
      if (dsBrowser.hasDocument && dsBrowser.hasWindow) {
        const doc = document.documentElement
        doc.classList.add('lcp-ready')
        this.dsAppReady.emit()
      }
    })
  }

  disconnectedCallback() {
    if (dsBrowser.hasWindow) {
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
    if (dsBrowser.hasDocument && dsBrowser.hasWindow) {
      const doc = document.documentElement
      doc.style.setProperty('--ds-app-height', `${window.innerHeight}px`)
    }
  }

  render() {
    return (
      <Host
        class={{
          'ds-app': true,
          'ds-app--safari': dsBrowser.isSafari,
          'ds-app--touch': dsDevice.hasTouchScreen,
        }}
      >
        <slot></slot>
      </Host>
    )
  }
}
