import { Component, Host, h, Element, State, Event, EventEmitter, Method, Prop } from '@stencil/core'
import { BalTabOption } from './bal-tab.type'

@Component({
  tag: 'bal-tabs',
})
export class Tabs {
  @Element() element!: HTMLElement

  @State() tabsOptions: BalTabOption[] = []

  /**
   * Defines the layout of the tabs.
   */
  @Prop() interface: 'tabs' | 'steps' | 'o-steps' = 'tabs'

  /**
   * If `true` the field expands over the whole width.
   */
  @Prop() expanded = false

  /**
   * If `true` the tabs or steps can be clicked.
   */
  @Prop() clickable = true

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
  @Event({ eventName: 'balTabChange' }) tabsDidChange!: EventEmitter<BalTabOption>

  /**
   * Emitted when the action button has clicked
   */
  @Event({ eventName: 'balActionClick' }) actionHasClicked!: EventEmitter<MouseEvent>

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
   * @internal - Rerenders the tabs with their given settings
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
    if (tab.prevent) {
      event.preventDefault()
      event.stopPropagation()
    }

    if (!tab.disabled) {
      tab.navigate.emit(event)
      await this.select(tab)
    }
  }

  render() {
    if (this.interface === 'steps') {
      return this.renderSteps()
    } else if (this.interface === 'o-steps') {
      return this.renderOSteps()
    } else {
      return this.renderTabs()
    }
  }

  stepIndex(tab: BalTabOption, index: number): string {
    if (tab.failed) {
      return '!'
    }
    if (tab.done) {
      return ''
    }
    return <span style={{ marginTop: '-2px' }}>{index + 1}</span>
  }

  renderOSteps() {
    return (
      <Host
        class="bal-o-steps"
        data-value={this.tabsOptions
          .filter(t => t.active)
          .map(t => t.value)
          .join(',')}
        data-label={this.tabsOptions
          .filter(t => t.active)
          .map(t => t.label)
          .join(',')}
      >
        <div>
          <ul>
            {this.tabsOptions.map((tab, index) => (
              <li
                class={{
                  'is-active': tab.active,
                  'is-disabled': tab.disabled,
                  'is-done': tab.done,
                  'is-failed': tab.failed,
                  'is-clickable': this.clickable,
                  'data-test-tab-item': true,
                }}
                data-label={tab.label}
                data-value={tab.value}
                data-index={index}
              >
                <a onClick={(event: MouseEvent) => this.onSelectTab(event, tab)}>
                  <span class="step-index">
                    <span class="inner"></span>
                  </span>
                  <span class="step-label is-hidden-mobile">{tab.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
        <slot></slot>
      </Host>
    )
  }

  renderSteps() {
    return (
      <Host
        class="bal-steps"
        data-value={this.tabsOptions
          .filter(t => t.active)
          .map(t => t.value)
          .join(',')}
        data-label={this.tabsOptions
          .filter(t => t.active)
          .map(t => t.label)
          .join(',')}
      >
        <div class={['tabs is-fullwidth'].join(' ')}>
          <ul>
            {this.tabsOptions.map((tab, index) => (
              <li
                class={{
                  'is-active': tab.active,
                  'is-disabled': tab.disabled,
                  'is-done': tab.done,
                  'is-failed': tab.failed,
                  'data-test-tab-item': true,
                }}
                data-label={tab.label}
                data-value={tab.value}
                data-index={index}
              >
                <a onClick={(event: MouseEvent) => this.onSelectTab(event, tab)}>
                  <span class="step-index">{this.stepIndex(tab, index)}</span>
                  <span class="step-label">{tab.label}</span>
                </a>
                <span class="bubble" style={{ display: tab.hasBubble ? 'inline' : 'none' }}></span>
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
      <Host
        class="bal-tabs"
        data-value={this.tabsOptions
          .filter(t => t.active)
          .map(t => t.value)
          .join(',')}
        data-label={this.tabsOptions
          .filter(t => t.active)
          .map(t => t.label)
          .join(',')}
      >
        <div class={['tabs', this.rounded ? 'is-rounded' : '', this.expanded ? 'is-fullwidth' : ''].join(' ')}>
          <ul>
            {this.tabsOptions.map((tab, index) => (
              <li
                class={{
                  'is-active': tab.active,
                  'is-disabled': tab.disabled,
                  'data-test-tab-item': true,
                }}
                data-label={tab.label}
                data-value={tab.value}
                data-index={index}
              >
                <a
                  href={tab.href}
                  aria-current="page"
                  onClick={(event: MouseEvent) => this.onSelectTab(event, tab)}
                  style={{ display: tab.href === '' ? 'none' : '' }}
                  class={{ hidden: tab.href === '' }}
                >
                  {tab.label}
                </a>
                <a
                  aria-current="page"
                  onClick={(event: MouseEvent) => this.onSelectTab(event, tab)}
                  style={{ display: tab.href === '' ? '' : 'none' }}
                  class={{ hidden: tab.href !== '' }}
                >
                  {tab.label}
                </a>
                <span class="bubble" style={{ display: tab.hasBubble ? 'inline' : 'none' }}></span>
              </li>
            ))}
            <li class="is-right" style={{ display: this.action ? 'block' : 'none' }}>
              <bal-button class="data-test-tabs-action" onClick={e => this.actionHasClicked.emit(e)}>
                {this.actionLabel}
              </bal-button>
            </li>
          </ul>
        </div>
        <slot />
      </Host>
    )
  }
}
