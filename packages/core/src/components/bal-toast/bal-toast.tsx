import { Component, Host, h, Prop, Method, Element, Event, EventEmitter } from '@stencil/core'
import { BEM } from '../../utils/bem'

@Component({
  tag: 'bal-toast',
  styleUrl: 'bal-toast.sass',
})
export class Toast {
  @Element() element!: HTMLBalToastElement

  timer!: NodeJS.Timeout
  toastId = `bal-toast-${toastIds++}`

  /**
   * The theme type of the toast.
   * Color type primary is deprecated, please use info instead.
   */
  @Prop() color: BalProps.BalToastColor = ''

  /**
   * The duration of the toast in milliseconds.
   */
  @Prop() duration = 0

  /**
   * If `true` the toast has a cross icon to close the toast.
   */
  @Prop() closable = true

  /**
   * Content message
   */
  @Prop() message = ''

  /**
   * @internal Handler for on close event
   */
  @Prop() closeHandler: () => void = () => void 0

  /**
   * Emitted when toast is closed
   */
  @Event({ eventName: 'balClose' }) balClose!: EventEmitter<BalEvents.BalToastCloseDetail>

  async componentWillLoad() {
    if (this.duration > 0) {
      await this.closeIn(this.duration)
    }
  }

  /**
   * Closes the toast after the given duration in ms
   */
  @Method()
  async closeIn(duration: number): Promise<void> {
    this.timer = setTimeout(() => this.close(), duration)
  }

  /**
   * Closes this toast
   */
  @Method()
  async close(): Promise<void> {
    this.element.remove()
    clearTimeout(this.timer)
    this.balClose.emit(this.toastId)
    this.closeHandler()
  }

  render() {
    const block = BEM.block('toast')
    const innerEl = block.element('inner')
    const labelEl = block.element('label')
    const closeEl = block.element('close')

    return (
      <Host id={this.toastId} class={{ ...block.class() }}>
        <div
          role="status"
          class={{ ...innerEl.class(), ...innerEl.modifier(`color-${this.color}`).class(!!this.color) }}
        >
          <span class={{ ...labelEl.class() }} data-testid="bal-toast-label" innerHTML={this.message}>
            <slot />
          </span>
          {this.closable !== false ? (
            <bal-close
              class={{ ...closeEl.class() }}
              onClick={() => this.close()}
              inverted={false}
              data-testid="bal-toast-close"
            ></bal-close>
          ) : (
            ''
          )}
        </div>
      </Host>
    )
  }
}

let toastIds = 0
