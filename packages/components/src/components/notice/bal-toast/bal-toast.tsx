import { Component, Host, h, Prop, Method, Element, Event, EventEmitter } from '@stencil/core'
import { Props } from '../../../props'

@Component({
  tag: 'bal-toast',
})
export class Toast {
  @Element() element!: HTMLBalToastElement

  timer!: NodeJS.Timer
  toastId = `bal-toast-${toastIds++}`

  /**
   * The theme type of the toast. Given by bulma our css framework.
   * Color type primary is deprecated, please use info instead.
   */
  @Prop() color: Props.BalTostColor = ''

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
  @Event({ eventName: 'balClose' }) balClose!: EventEmitter<string>

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
        <div role="alert" onClick={() => this.close()} class={`bal-toast__inner ${this.colorType} p-4`}>
          <span class="bal-toast__label" innerHTML={this.message}>
            <slot />
          </span>
          <bal-close class="bal-toast__close" size="" inverted={false}></bal-close>
        </div>
      </Host>
    )
  }
}

let toastIds = 0
