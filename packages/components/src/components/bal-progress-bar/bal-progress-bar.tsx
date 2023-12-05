import { Component, h, ComponentInterface, Host, Element, Prop, Method } from '@stencil/core'
import { BEM } from '../../utils/bem'
import { BalBreakpointObserver, BalBreakpoints, ListenToBreakpoints, balBreakpoints } from '../../utils/breakpoints'
import type { BalConfigObserver, BalConfigState } from '../../utils/config'

@Component({
  tag: 'bal-progress-bar',
  styleUrl: 'bal-progress-bar.sass',
})
export class ProgressBar implements ComponentInterface, BalConfigObserver, BalBreakpointObserver {
  @Element() el!: HTMLElement

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
   * The shape color
   */
  @Prop() background: BalProps.BalProgressBarBackground = 'white'

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
      const maxWidth = this.el.clientWidth
      const value = Math.max(0, Math.min(100, this.value))
      const lineWidth = (maxWidth / 100) * value
      this.lineEl.style.width = `${lineWidth}px`

      if (value === 100) {
        this.lineEl.classList.add('bal-progress-bar__line--full')
      } else {
        this.lineEl.classList.remove('bal-progress-bar__line--full')
      }
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
        class={{
          ...block.class(),
          ...block.modifier(`background-${this.background}`).class(),
        }}
      >
        <div
          class={{
            ...bemLineEl.class(),
            ...bemLineEl.modifier(`animated`).class(this.animated),
          }}
          ref={lineEl => (this.lineEl = lineEl)}
        ></div>
      </Host>
    )
  }
}
