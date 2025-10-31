import { Component, ComponentInterface, Element, Host, Method, Prop, h } from '@stencil/core'
import { BEM } from '../../utils/bem'
import { BalBreakpointObserver, BalBreakpoints, ListenToBreakpoints, balBreakpoints } from '../../utils/breakpoints'
import type { BalConfigObserver, BalConfigState } from '../../utils/config'
import { raf } from '../../utils/helpers'
import { BalWindowResizeObserver, ListenToWindowResize } from '../../utils/resize'
import { HTMLStencilElement } from '@stencil/core/internal'

@Component({
  tag: 'bal-progress-bar',
  styleUrl: 'bal-progress-bar.sass',
})
export class ProgressBar
  implements ComponentInterface, BalConfigObserver, BalBreakpointObserver, BalWindowResizeObserver
{
  @Element() el!: HTMLStencilElement

  private animated = true
  private lineEl?: HTMLDivElement
  private isTouch = balBreakpoints.isTouch // need this part to improve a none side effect import

  /**
   * PUBLIC PROPERTY API
   * ------------------------------------------------------
   */

  /**
   * The value of the bar in percentage. So min is 0 and 100 would be the max value.
   */
  @Prop() value = 0

  /**
   * The background color
   */
  @Prop() background: BalProps.BalProgressBarBackground = 'white'

  /**
   * The progress bar color
   */
  @Prop() color: BalProps.BalProgressBarColor = 'primary'

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
  breakpointListener(_breakpoints: BalBreakpoints) {
    this.updateProgress()
  }

  @ListenToWindowResize()
  windowResizeListener() {
    this.updateProgress()
  }

  @Method()
  async configChanged(state: BalConfigState) {
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
        this.lineEl.style.width = `${lineWidth}px`

        if (value === 100) {
          this.lineEl.classList.add('bal-progress-bar__line--full')
        } else {
          this.lineEl.classList.remove('bal-progress-bar__line--full')
        }
      })
    }
  }

  /**
   * RENDER
   * ------------------------------------------------------
   */

  render() {
    const block = BEM.block('progress-bar')
    const bemLineEl = block.element('line')

    return (
      <Host
        aria-hidden="true"
        class={{
          ...block.class(),
          ...block.modifier(`background-${this.background}-of-${this.color}`).class(),
        }}
      >
        <div
          class={{
            ...bemLineEl.class(),
            ...bemLineEl.modifier(`color-${this.color}`).class(),
            ...bemLineEl.modifier(`animated`).class(this.animated),
          }}
          ref={lineEl => (this.lineEl = lineEl)}
        ></div>
      </Host>
    )
  }
}
