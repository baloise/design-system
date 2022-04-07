import { Component, Host, h, Prop, Method, Element, State, Event, EventEmitter } from '@stencil/core'
import { Props } from '../../../props'

@Component({
  tag: 'bal-snackbar',
})
export class Snackbar {
  @Element() element!: HTMLElement

  timer!: NodeJS.Timer
  snackbarId = `bal-snackbar-${snackbarIds++}`

  @State() animationClass = 'fadeInDown'

  /**
   * The theme type of the snackbar. Given by bulma our css framework.
   */
  @Prop() color: Props.BalSnackbarColor = ''

  /**
   * The duration of the snackbar
   */
  @Prop() duration = 0

  /**
   * The subject of the snackbar header
   */
  @Prop() subject = ''

  /**
   * The message of the snackbar
   */
  @Prop() message = ''

  /**
   * The icon of the snackbar header
   */
  @Prop() icon = ''

  /**
   * Label text for the action button
   */
  @Prop() action = ''

  /**
   * @internal Handler for on close event
   */
  @Prop() closeHandler: () => void = () => void 0

  /**
   * @internal Handler for on action button click event
   */
  @Prop() actionHandler: () => void = () => void 0

  /**
   * Emitted when snackbar is closed
   */
  @Event() balClose!: EventEmitter<string>

  /**
   * Emitted when the action button is clicked
   */
  @Event() balAction!: EventEmitter<string>

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
    this.balClose.emit(this.snackbarId)
    this.element.remove()
    this.closeHandler()
  }

  onActionHandler = () => {
    this.balAction.emit(this.snackbarId)
    this.actionHandler()
  }

  get colorType() {
    if (this.color === '') {
      return ''
    }
    return `is-${this.color}`
  }

  get buttonType(): Props.BalButtonColor {
    if (this.color === '') {
      return 'info'
    }
    return this.color
  }

  render() {
    return (
      <Host id={this.snackbarId}>
        <div role="alert" class={`snackbar ${this.animationClass} ${this.colorType} p-5`}>
          <div class="snackbar-header">
            <span class="icon-text">
              <span class="icon" style={{ display: this.icon ? '' : 'none' }}>
                <bal-icon name={this.icon} color={this.color == 'primary' ? 'white' : 'primary'}></bal-icon>
              </span>
              <bal-heading level="h5" inverted={this.color == 'primary'} space="none">
                {this.subject}
              </bal-heading>
            </span>
          </div>
          <bal-text
            space={this.action === '' ? 'bottom' : 'none'}
            color={this.color == 'primary' ? 'white' : ''}
            innerHTML={this.message}
          >
            <slot />
          </bal-text>
          <bal-close class="close" size="medium" background={false} onClick={() => this.close()}></bal-close>
          <div class="snackbar-footer" style={{ display: this.action === '' ? 'none' : 'inline-flex' }}>
            <bal-button color="info" inverted={this.color == 'primary'} onClick={() => this.onActionHandler()}>
              {this.action}
            </bal-button>
          </div>
        </div>
      </Host>
    )
  }
}

let snackbarIds = 0
