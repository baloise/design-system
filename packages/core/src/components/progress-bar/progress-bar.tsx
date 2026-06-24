import { Component, Element, Host, Method, Prop, State, h } from '@stencil/core'
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
  hasValue,
  OneOf,
  Type,
} from '@utils'
import { HTMLStencilElement } from '@stencil/core/internal'
import {
  ListenToConfig,
  type DsComponentInterface,
  type DsConfigObserver,
  type DsConfigState,
  type DsLanguage,
  defaultConfig,
} from '@global'
import { i18nDsProgressBar } from './progress-bar.i18n'
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

  @State() language: DsLanguage = defaultConfig.language

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
  @OneOf(PROGRESS_BAR_BACKGROUNDS)
  readonly background: ProgressBarBackground = 'dark'

  /**
   * The progress bar color
   */
  @Prop()
  @OneOf(PROGRESS_BAR_COLORS)
  readonly color: ProgressBarColor = 'primary'

  /**
   * The value of the bar in percentage. So min is 0 and 100 would be the max value.
   */
  @Prop({ reflect: true })
  @Type('number')
  readonly value: number = 0

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
    this.language = state.language
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
        aria-label={`${i18nDsProgressBar[this.language].progress}: ${this.value}%`}
        aria-valuenow={this.value}
        aria-valuemin="0"
        aria-valuemax="100"
        class={{
          'is-light': hasValue(this.background) && this.background === 'light',
          'is-dark': !hasValue(this.background) || this.background === 'dark',
          'is-primary': !hasValue(this.color) || this.color === 'primary',
          'is-purple': hasValue(this.color) && this.color === 'purple',
          'is-yellow': hasValue(this.color) && this.color === 'yellow',
          'is-red': hasValue(this.color) && this.color === 'red',
          'is-green': hasValue(this.color) && this.color === 'green',
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
