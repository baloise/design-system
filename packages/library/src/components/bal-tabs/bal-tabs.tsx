import { Component, Host, h, Element, State, Event, EventEmitter, Method, Prop } from '@stencil/core'
import { BalTabOption } from './bal-tab.type'

@Component({
  tag: 'bal-tabs',
  styleUrl: 'bal-tabs.scss',
  scoped: true,
  shadow: false,
})
export class Tabs {
  @Element() element!: HTMLElement

  @State() tabsOptions: BalTabOption[] = []

  /**
   * Defines the layout of the tabs.
   */
  @Prop() interface: 'tabs' | 'steps' = 'tabs'

  /**
   * If `true` the field expands over the whole width.
   */
  @Prop() expanded = false

  /**
   * If you want the rounded tab style.
   */
  @Prop() rounded = false

  /**
   * If `true` a acation button is added to the right
   */
  @Prop() action = false

  /**
   * Label for the action button
   */
  @Prop() actionLabel = ''

  /**
   * Emitted when the changes has finished.
   */
  @Event({ eventName: 'balTabChange' }) tabsDidChange: EventEmitter<BalTabOption>

  /**
   * Emitted when the action button has clicked
   */
  @Event({ eventName: 'balActionClick' }) actionHasClicked: EventEmitter<MouseEvent>

  /**
   * Go to tab with the given value
   */
  @Method()
  async select(tab: BalTabOption) {
    this.tabs.forEach(t => t.setActive(t.value === tab.value))
    this.sync()
    this.tabsDidChange.emit(tab)
  }

  /**
   * *Internal* - Rerenders the tabs with their given settings
   */
  @Method()
  async sync() {
    Promise.all(this.tabs.map(value => value.getOptions())).then(tabsOptions => {
      this.tabsOptions = tabsOptions
    })
  }

  componentWillLoad() {
    this.sync()
  }

  private get tabs(): HTMLBalTabItemElement[] {
    return Array.from(this.element.querySelectorAll('bal-tab-item'))
  }

  private async onSelectTab(event: MouseEvent, tab: BalTabOption) {
    if (!tab.disabled) {
      tab.navigate.emit(event)
      await this.select(tab)
      this.tabsDidChange.emit(tab)
    }
  }

  render() {
    if (this.interface === 'steps') {
      return this.renderSteps()
    } else {
      return this.renderTabs()
    }
  }

  renderSteps() {
    return (
      <Host class="bal-steps">
        <div class={['tabs is-fullwidth'].join(' ')}>
          <ul>
            {this.tabsOptions.map((tab, index) => (
              <li
                class={{
                  'is-active': tab.active,
                  'is-disabled': tab.disabled,
                  'is-done': tab.done,
                  'is-failed': tab.failed,
                }}>
                <a onClick={(event: MouseEvent) => this.onSelectTab(event, tab)}>
                  <span class="step-index">
                    <bal-text>{index + 1}</bal-text>
                  </span>
                  <span class="step-label">
                    <bal-text>{tab.label}</bal-text>
                  </span>
                </a>
                <span class="bubble" style={!tab.hasBubble && { display: 'none' }}></span>
              </li>
            ))}
          </ul>
        </div>
        <slot />
      </Host>
    )
  }

  renderTabs() {
    return (
      <Host class="bal-tabs">
        <div class={['tabs', this.rounded ? 'is-rounded' : '', this.expanded ? 'is-fullwidth' : ''].join(' ')}>
          <ul>
            {this.tabsOptions.map(tab => (
              <li class={[tab.active ? 'is-active' : '', tab.disabled ? 'is-disabled' : ''].join(' ')}>
                <a
                  href={tab.href}
                  aria-current="page"
                  onClick={(event: MouseEvent) => this.onSelectTab(event, tab)}
                  style={{ display: tab.href === '' ? 'none' : '' }}
                  class={{ hidden: tab.href === '' }}>
                  <bal-text>{tab.label}</bal-text>
                </a>
                <a
                  aria-current="page"
                  onClick={(event: MouseEvent) => this.onSelectTab(event, tab)}
                  style={{ display: tab.href === '' ? '' : 'none' }}
                  class={{ hidden: tab.href !== '' }}>
                  <bal-text>{tab.label}</bal-text>
                </a>
                <span class="bubble" style={!tab.hasBubble && { display: 'none' }}></span>
              </li>
            ))}
            <li class="is-right" style={{ display: this.action ? 'block' : 'none' }}>
              <bal-button onClick={e => this.actionHasClicked.emit(e)}>{this.actionLabel}</bal-button>
            </li>
          </ul>
        </div>
        <slot />
      </Host>
    )
  }
}
