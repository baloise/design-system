import { Component, Host, h, Prop, Method, Element, Event, EventEmitter } from '@stencil/core'

@Component({
  tag: 'bal-toast',
  styleUrl: 'bal-toast.sass',
})
export class Toast {
  @Element() element!: HTMLBalToastElement

  timer!: NodeJS.Timer
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

  get colorType() {
    if (this.color === '') {
      return ''
    }
    return `bal-toast__inner--is-${this.color}`
  }

  render() {
    return (
      <Host id={this.toastId} class="bal-toast">
        <div role="alert" onClick={() => this.close()} class={`bal-toast__inner ${this.colorType}`}>
          <span class="bal-toast__label" innerHTML={this.message} data-testid="bal-toast-label">
            <slot />
          </span>
          <bal-close class="bal-toast__close" inverted={false} data-testid="bal-toast-close"></bal-close>
        </div>
      </Host>
    )
  }
}

let toastIds = 0
