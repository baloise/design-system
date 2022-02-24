import { Component, Host, h, Element, State, Event, EventEmitter, Method, Prop, Watch } from '@stencil/core'
import { debounceEvent } from '../../helpers/helpers'
import { BalTabOption } from './bal-tab.type'
import { watchForTabs } from './utils/watch-tabs'
import { TabList } from './components/tabs'
import { OStepList } from './components/o-steps'
import { StepList } from './components/steps'

@Component({
  tag: 'bal-tabs',
})
export class Tabs {
  @Element() el!: HTMLElement

  private didInit = false
  private mutationO?: MutationObserver

  @State() tabsOptions: BalTabOption[] = []
  @State() lineWidth = 0
  @State() lineOffsetLeft = 0
  @State() isReady = false

  /**
   * Defines the layout of the tabs.
   */
  @Prop() interface: 'tabs' | 'tabs-sub' | 'steps' | 'o-steps' | 'navbar' = 'tabs'

  /**
   * If `true` the field expands over the whole width.
   */
  @Prop() expanded = false

  /**
   * If `true` the tabs or steps can be clicked.
   */
  @Prop() clickable = true

  /**
   * If `true` a action button is added to the right
   */
  @Prop() action = false

  /**
   * Label for the action button
   */
  @Prop() actionLabel = 'Action'

  /**
   * Set the amount of time, in milliseconds, to wait to trigger the `balChange` event after each keystroke. This also impacts form bindings such as `ngModel` or `v-model`.
   */
  @Prop() debounce = 0

  @Watch('debounce')
  protected debounceChanged() {
    this.balChange = debounceEvent(this.balChange, this.debounce)
  }

  @Prop({ mutable: true }) value?: string = undefined

  @Watch('value')
  protected async valueChanged(newValue?: string, oldValue?: string) {
    this.tabs.forEach(t => t.setActive(t.value === this.value))

    if (this.didInit && newValue !== oldValue) {
      this.balChange.emit(newValue)
      this.isReady = true
    }
  }

  /**
   * Emitted when the changes has finished.
   */
  @Event({ eventName: 'balChange' }) balChange!: EventEmitter<string>

  /**
   * Emitted when the action button has clicked
   */
  @Event({ eventName: 'balActionClick' }) actionHasClicked!: EventEmitter<MouseEvent>

  connectedCallback() {
    this.debounceChanged()
    this.updateTabs()

    this.mutationO = watchForTabs<HTMLBalTabItemElement>(this.el, 'bal-tab-item', () => {
      this.updateTabs()
    })
  }

  disconnectedCallback() {
    if (this.mutationO) {
      this.mutationO.disconnect()
      this.mutationO = undefined
    }
  }

  componentDidLoad() {
    this.didInit = true
    let value = this.value
    if (value === undefined || value === '') {
      const availableTabs = this.tabsOptions.filter(t => !t.disabled)
      if (availableTabs.length > 0) {
        value = availableTabs[0].value
      }
    }

    this.value = value
    this.valueChanged(value, this.value)
  }

  componentDidRender() {
    setTimeout(() => {
      if (this.interface === 'tabs' || this.interface === 'tabs-sub') {
        this.moveLine(this.getTargetElement(this.value))
      }
    }, 0)
  }

  /**
   * Go to tab with the given value
   */
  @Method()
  async select(tab: BalTabOption) {
    this.value = tab.value
  }

  private get tabs(): HTMLBalTabItemElement[] {
    return Array.from(this.el.querySelectorAll('bal-tab-item'))
  }

  private async updateTabs() {
    await Promise.all(this.tabs.map(value => value.getOptions())).then(tabsOptions => {
      this.tabsOptions = tabsOptions
    })
    const activeTabs = this.tabsOptions.filter(t => t.active)
    if (activeTabs.length > 0) {
      const firstActiveTab = activeTabs[0]
      this.value = firstActiveTab.value
    }
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

  private moveLine(element: HTMLElement) {
    if (element) {
      const listElement = element.closest('li')

      if (listElement?.clientWidth !== undefined) {
        this.lineWidth = listElement.clientWidth - 32
      }

      if (listElement?.offsetLeft !== undefined) {
        this.lineOffsetLeft = listElement.offsetLeft + 16
      }
    }
  }

  private getTargetElement(value?: string) {
    const elements = Array.from(this.el.querySelectorAll('.data-test-tab-item')) as HTMLElement[]
    return elements.filter(element => element.getAttribute('data-value') == value)[0]
  }

  private isTabActive(tab: BalTabOption): boolean {
    return tab.value === this.value
  }

  render() {
    const Tabs = this.interface === 'o-steps' ? OStepList : this.interface === 'steps' ? StepList : TabList
    return (
      <Host
        class={{
          'bal-tabs': this.interface === 'tabs' || this.interface === 'tabs-sub' || this.interface === 'navbar',
          'bal-steps': this.interface === 'steps',
          'bal-o-steps': this.interface === 'o-steps',
          'is-sub-navigation': this.interface === 'tabs-sub',
          'is-navbar-tabs': this.interface === 'navbar',
          'is-ready': this.isReady,
        }}
        data-value={this.tabsOptions
          .filter(t => this.isTabActive(t))
          .map(t => t.value)
          .join(',')}
        data-label={this.tabsOptions
          .filter(t => this.isTabActive(t))
          .map(t => t.label)
          .join(',')}
      >
        <Tabs
          value={this.value}
          tabs={this.tabsOptions}
          expanded={this.expanded}
          clickable={this.clickable}
          action={this.action}
          actionLabel={this.actionLabel}
          onActionClick={e => this.actionHasClicked.emit(e)}
          onSelectTab={(e, t) => this.onSelectTab(e, t)}
          lineWidth={this.lineWidth}
          lineOffsetLeft={this.lineOffsetLeft}
        ></Tabs>
        <slot></slot>
      </Host>
    )
  }
}
