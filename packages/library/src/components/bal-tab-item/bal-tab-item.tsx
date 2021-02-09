import { Component, Host, h, Prop, Method, State, Watch, Element, EventEmitter, Event } from '@stencil/core'
import { BalTabOption } from '../bal-tabs/bal-tab.type'

@Component({
  tag: 'bal-tab-item',
  styleUrl: 'bal-tab-item.scss',
  scoped: true,
  shadow: false,
})
export class TabItem {
  @Element() element!: HTMLElement

  @State() isContentHidden = true

  /**
   * This is the key of the tab.
   */
  @Prop() value: string = ''

  /**
   * Label for the tab.
   */
  @Prop() label: string = ''

  /**
   * Link to path.
   */
  @Prop() href: string = ''

  /**
   * If `true` a small red bubble is added to the tab.
   */
  @Prop() bubble: boolean = false

  /**
   * If `true` the tab is disabled.
   */
  @Prop() disabled: boolean = false

  /**
   * If `true` the step is marked as done.
   */
  @Prop() done = false

  /**
   * If `true` the step is marked as failed.
   */
  @Prop() failed = false

  /**
   * Tell's if the tab is active and the content is visible.
   */
  @Prop() active: boolean = false

  /**
   * Emitted when the link element has clicked
   */
  @Event({ eventName: 'balNavigate' }) balNavigate: EventEmitter<MouseEvent>

  @Watch('active')
  activatedHandler(newActive: boolean) {
    this.isContentHidden = !newActive
  }

  @Watch('active')
  @Watch('value')
  @Watch('bubble')
  @Watch('disabled')
  @Watch('label')
  @Watch('done')
  @Watch('failed')
  informParent() {
    if (this.parent) {
      this.parent.sync()
    }
  }

  /**
   * Options of the tab like label, value etc.
   */
  @Method()
  async getOptions(): Promise<BalTabOption> {
    return this.options
  }

  /**
   * Sets the tab active.
   */
  @Method()
  async setActive(active: boolean): Promise<void> {
    this.active = active
  }

  get options() {
    return {
      value: this.value,
      label: this.label,
      active: this.active,
      href: this.href,
      disabled: this.disabled,
      done: this.done,
      failed: this.failed,
      hasBubble: this.bubble,
      navigate: this.balNavigate,
    }
  }

  get parent(): HTMLBalTabsElement {
    return this.element.closest('bal-tabs')
  }

  componentWillLoad() {
    this.isContentHidden = !this.active
  }

  render() {
    return (
      <Host>
        <div style={this.isContentHidden && { display: 'none' }}>
          <slot />
        </div>
      </Host>
    )
  }
}
