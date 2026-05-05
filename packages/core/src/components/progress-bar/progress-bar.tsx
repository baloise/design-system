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
  ValidateEmptyOrOneOf,
  ValidateEmptyOrType,
  setupValidation,
} from '@utils'
import { HTMLStencilElement } from '@stencil/core/internal'
import { ListenToConfig, type DsComponentInterface, type DsConfigObserver, type DsConfigState } from '@global'
import {
  PROGRESS_BAR_BACKGROUNDS,
  PROGRESS_BAR_COLORS,
  ProgressBarBackground,
  ProgressBarColor,
} from './progress-bar.interfaces'

/**
 * Progress bar displays a visual indicator of progress or completion for a task or operation with percentage and label.
 *
 * @slot - Optional label or caption text.
 * @part line - The filled progress indicator element.
 */
@Component({
  tag: 'ds-progress-bar',
  styleUrl: 'progress-bar.host.scss',
  shadow: true,
})
export class ProgressBar implements DsComponentInterface, DsConfigObserver, DsBreakpointObserver, WindowResizeObserver {
  log!: LogInstance

  @Logger('progress-bar')
  createLogger(log: LogInstance) {
    this.log = log
  }

  @Element() el!: HTMLStencilElement

  private animated = true
  private lineEl?: HTMLDivElement
  private isTouch = initialBreakpoints.touch

  /**
   * PUBLIC PROPERTY API
   * ------------------------------------------------------
   */

  /**
   * The background color
   */
  @Prop()
  @ValidateEmptyOrOneOf(...PROGRESS_BAR_BACKGROUNDS)
  readonly background: ProgressBarBackground = 'dark'

  /**
   * The progress bar color
   */
  @Prop()
  @ValidateEmptyOrOneOf(...PROGRESS_BAR_COLORS)
  readonly color: ProgressBarColor = 'primary'

  /**
   * The value of the bar in percentage. So min is 0 and 100 would be the max value.
   */
  @Prop({ reflect: true })
  @ValidateEmptyOrType('number')
  readonly value: number = 0

  /**
   * LIFECYCLE
   * ------------------------------------------------------
   */

  connectedCallback() {
    setupValidation(this)
  }

  componentWillUpdate() {
    setupValidation(this)
  }

  componentDidRender(): void {
    this.updateProgress()
  }

  /**
   * PUBLIC LISTENERS
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

  /**
   * @internal define config for the component
   */
  @Method()
  @ListenToConfig()
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
