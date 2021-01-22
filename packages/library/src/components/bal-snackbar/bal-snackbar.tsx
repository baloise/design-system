import { Component, Host, h, Prop, Method, Element, State, Event, EventEmitter } from '@stencil/core'

@Component({
  tag: 'bal-snackbar',
  styleUrl: 'bal-snackbar.scss',
  scoped: true,
  shadow: false,
})
export class Snackbar {
  snackbarId = `bal-to-${snackbarIds++}`
  timer: NodeJS.Timer
  @Element() element: HTMLElement
  @State() animationClass = 'fadeInDown'

  /**
   * The theme type of the snackbar. Given by bulma our css framework.
   */
  @Prop() type: 'primary' | 'info' | 'success' | 'warning' | 'danger' | '' = ''

  /**
   * The duration of the snackbar
   */
  @Prop() duration: number = 0

  /**
   * The subject of the snackbar header
   */
  @Prop() subject: string

  /**
   * The message of the snackbar
   */
  @Prop() message: string

  /**
   * The icon of the snackbar header
   */
  @Prop() icon: string

  /**
   * Emitted when snackbar is closed
   */
  @Event({ eventName: 'balClose' }) balClose!: EventEmitter<string>

  async componentWillLoad() {
    if (this.duration > 0) {
      await this.closeIn(this.duration)
    }
  }

  /**
   * Closes the snackbar after the given duration in ms
   */
  @Method()
  async closeIn(duration: number): Promise<void> {
    this.timer = setTimeout(() => this.close(), duration)
  }

  /**
   * Closes this snackbar
   */
  @Method()
  async close(): Promise<void> {
    clearTimeout(this.timer)
    this.animationClass = 'fadeOut'
    this.timer = setTimeout(() => {
      clearTimeout(this.timer)
      this.balClose.emit(this.snackbarId)
      this.element.remove()
    }, 150)
  }

  render() {
    return (
      <Host id={this.snackbarId}>
        <div role="alert" onClick={() => this.close()} class={`snackbar ${this.animationClass} ${this.type}`}>
          <div class="snackbar-header">
            <span class="icon-text">
              <span class="icon" style={{ display: this.icon ? '' : 'none'}}>
                <bal-icon name={this.icon} color="white" size="medium"></bal-icon>
              </span>
              <span>{this.subject}</span>
            </span>
          </div>
          <bal-text>
            <slot />
          </bal-text>
          <bal-icon name="close-thin" class="close" color="white" size="large" isRight></bal-icon>
          <bal-button type={`is-${this.type}` as any} outlined inverted>Primary</bal-button>
        </div>
      </Host>
    )
  }
}

let snackbarIds = 0
