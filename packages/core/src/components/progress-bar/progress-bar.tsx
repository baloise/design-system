import { Component, ComponentInterface, Element, Host, Method, Prop, h } from '@stencil/core'
import {
  Loggable,
  Logger,
  type LogInstance,
  DsBreakpointObserver,
  ListenToBreakpoints,
  DsBreakpoints,
  raf,
  WindowResizeObserver,
  ListenToWindowResize,
  initialBreakpoints,
} from '@utils'
import { HTMLStencilElement } from '@stencil/core/internal'
import type { DsConfigObserver, DsConfigState } from '@global'

@Component({
  tag: 'ds-progress-bar',
  styleUrl: 'progress-bar.host.scss',
  shadow: true,
})
export class ProgressBar
  implements ComponentInterface, Loggable, DsConfigObserver, DsBreakpointObserver, WindowResizeObserver
{
  log!: LogInstance

  @Element() el!: HTMLStencilElement

  private animated = true
  private lineEl?: HTMLDivElement
  private isTouch = initialBreakpoints.touch // need this part to improve a none side effect import

  /**
   * PUBLIC PROPERTY API
   * ------------------------------------------------------
   */

  /**
   * The value of the bar in percentage. So min is 0 and 100 would be the max value.
   */
  @Prop() readonly value: number = 0

  /**
   * The background color
   */
  @Prop() readonly background: DS.ProgressBarBackground = 'dark'

  /**
   * The progress bar color
   */
  @Prop() readonly color: DS.ProgressBarColor = 'primary'

  /**
   * LIFECYCLE
   * ------------------------------------------------------
   */

  componentDidRender(): void {
    this.updateProgress()
  }

  /**
   * LISTENERS
   * ------------------------------------------------------
   */

  @ListenToBreakpoints()
  listenToBreakpoint(_breakpoints: DsBreakpoints) {
    this.updateProgress()
  }

  @ListenToWindowResize()
  listenToWindowResize() {
    this.updateProgress()
  }

  @Logger('ds-progress-bar')
  createLogger(log: LogInstance) {
    this.log = log
  }

  @Method()
  async configChanged(state: DsConfigState) {
    this.animated = state.animated
  }

  /**
   * PRIVATE METHODS
   * ------------------------------------------------------
   */

  private updateProgress() {
    if (this.lineEl) {
      raf(() => {
        const maxWidth = this.el.clientWidth
        const value = Math.max(0, Math.min(100, this.value))
        const lineWidth = (maxWidth / 100) * value
        if (this.lineEl === undefined) return

        this.lineEl.style.width = `${lineWidth}px`

        if (value === 100) {
          this.lineEl.classList.add('is-full')
        } else {
          this.lineEl.classList.remove('is-full')
        }
      })
    }
  }

  /**
   * RENDER
   * ------------------------------------------------------
   */

  render() {
    return (
      <Host
        role="progressbar"
        aria-valuenow={this.value}
        aria-valuemin="0"
        aria-valuemax="100"
        class={{
          'is-light': this.background === 'light',
          'is-dark': this.background === 'dark',
          'is-primary': this.color === 'primary',
          'is-purple': this.color === 'purple',
          'is-yellow': this.color === 'yellow',
          'is-red': this.color === 'red',
          'is-green': this.color === 'green',
        }}
      >
        <div
          id="line"
          part="line"
          class={{
            'is-animated': this.animated,
          }}
          ref={lineEl => (this.lineEl = lineEl)}
        ></div>
      </Host>
    )
  }
}
