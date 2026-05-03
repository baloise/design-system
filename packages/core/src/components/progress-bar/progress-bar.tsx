import { Component, Element, Host, Method, Prop, h } from '@stencil/core'
import {
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
import type { DsComponentInterface, DsConfigObserver, DsConfigState } from '@global'
import { ProgressBarBackground, ProgressBarColor } from './progress-bar.interfaces'

/**
 * Progress bar displays a visual indicator of progress or completion for a task or operation with percentage and label.
 *
 * @slot - Optional label or caption text.
 * @part progress-bar - The progress bar container element.
 * @part indicator - The filled progress indicator element.
 */
@Component({
  tag: 'ds-progress-bar',
  styleUrl: 'progress-bar.host.scss',
  shadow: true,
})
export class ProgressBar implements DsComponentInterface, DsConfigObserver, DsBreakpointObserver, WindowResizeObserver {
  private animated = true
  private lineEl?: HTMLDivElement
  private isTouch = initialBreakpoints.touch // need this part to improve a none side effect import

  @Element() el!: HTMLStencilElement

  log!: LogInstance

  @Logger('progress-bar')
  createLogger(log: LogInstance) {
    this.log = log
  }

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
  @Prop() readonly background: ProgressBarBackground = 'dark'

  /**
   * The progress bar color
   */
  @Prop() readonly color: ProgressBarColor = 'primary'

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
