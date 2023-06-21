import { Component, h, ComponentInterface, Host, Element, Prop, State, Watch, Listen, Method } from '@stencil/core'
import { BEM } from '../../utils/bem'
import { LogInstance, Loggable, Logger } from '../../utils/log'
import { BalMutationObserver, ListenToMutation } from '../../utils/mutation'
import { BalBreakpointObserver, BalBreakpoints, ListenToBreakpoints } from '../../utils/breakpoints'
import { BalResizeObserver, ListenToResize } from '../../utils/resize'
import { NavMetaLinkItem } from './models/bal-nav-meta-link-item'
import { NavMetaButton } from './models/bal-nav-meta-button'
import { BalScrollHandler } from '../../utils/scroll'
import { NavLinkItemObserver } from './bal-nav.types'
import {
  BalConfigObserver,
  BalConfigState,
  BalLanguage,
  BalRegion,
  ListenToConfig,
  defaultConfig,
} from '../../utils/config'
import { i18nNavBars } from './bal-nav.i18n'
import { NavMenuLinkItem } from './models/bal-nav-menu-link-item'

@Component({
  tag: 'bal-nav',
  styleUrls: {
    css: 'bal-nav.sass',
  },
})
export class NavMetaBar
  implements
    ComponentInterface,
    Loggable,
    BalResizeObserver,
    BalBreakpointObserver,
    BalMutationObserver,
    NavLinkItemObserver,
    BalConfigObserver
{
  private navId = `bal-nav-${NavIds++}`
  private bodyScrollHandler = new BalScrollHandler()
  private menuBarEl: HTMLBalNavMenuBarElement | undefined

  @Element() el!: HTMLElement

  log!: LogInstance

  @State() isTouch = false
  @State() isDesktop = false
  @State() language: BalLanguage = defaultConfig.language
  @State() region: BalRegion = defaultConfig.region
  @State() isFlyoutActive = false
  @State() activeMetaLinkValue?: string
  @State() activeMenuLinkValue?: string

  @Logger('bal-nav')
  createLogger(log: LogInstance) {
    this.log = log
  }

  /**
   * PUBLIC PROPERTY API
   * ------------------------------------------------------
   */

  /**
   * Link level structure.
   */
  @Prop() logo?: BalProps.BalNavLogoLink

  /**
   * Link level structure.
   */
  @Prop() options: BalProps.BalNavOptions = []

  @State() linkItems: NavMetaLinkItem[] = []

  @Watch('options')
  protected async optionChanged() {
    this.onOptionChange()
    this.updateTabs()
  }

  /**
   * Link level structure.
   */
  @Prop() buttons: BalProps.BalNavMetaButtons = []

  @State() metaButtons: NavMetaButton[] = []

  @Watch('buttons')
  protected async buttonChanged() {
    this.onOptionChange()
  }

  /**
   * LIFECYCLE
   * ------------------------------------------------------
   */

  connectedCallback() {
    this.bodyScrollHandler.connect()
  }

  componentWillLoad() {
    this.onOptionChange()
    this.updateTabs()
  }

  disconnectedCallback() {
    this.bodyScrollHandler.disconnect()
  }

  /**
   * LISTENERS
   * ------------------------------------------------------
   */

  @Listen('balChange')
  listenToPopupChanges(event: BalEvents.BalPopupChange) {
    const target = event.target
    if (target && target.nodeName === 'BAL-POPUP') {
      const id = target.id
      const triggers = Array.from(this.el.querySelectorAll<HTMLBalButtonElement>(`[bal-popup="${id}"]`))
      if (event.detail === true) {
        this.onPopupOpen(triggers)
      } else {
        this.onPopupClose(triggers)
      }
    }
  }

  @Listen('click', { target: 'document', passive: true })
  async clickOnOutside(ev: UIEvent) {
    if (this.isDesktop) {
      if (!this.menuBarEl?.querySelector('.container')?.contains(ev.target as Node) && this.isFlyoutActive) {
        this.isFlyoutActive = false
      }
    }
  }

  mutationObserverActive = true

  @ListenToMutation({ tags: ['bal-popup'] })
  mutationListener(): void {
    this.onOptionChange()
  }

  @ListenToBreakpoints()
  breakpointListener(breakpoints: BalBreakpoints): void {
    this.isTouch = breakpoints.touch
    this.isDesktop = breakpoints.desktop
  }

  @ListenToResize()
  resizeListener() {
    // empty
  }

  linkItemClickListener(item: any) {
    switch (item.type) {
      case 'NavMetaLinkItem':
        this.activeMetaLinkValue = item.value
        break
    }
  }

  /**
   * @internal define config for the component
   */
  @Method()
  @ListenToConfig()
  async configChanged(state: BalConfigState): Promise<void> {
    this.language = state.language
    this.region = state.region
  }

  /**
   * PRIVATE METHODS
   * ------------------------------------------------------
   */

  private updateTabs() {
    const previousActiveMetaLinkValue = this.activeMetaLinkValue
    const newActiveMetaLinkValue = this.linkItems.find(item => item.active)?.value || previousActiveMetaLinkValue
    if (previousActiveMetaLinkValue !== newActiveMetaLinkValue) {
      this.activeMetaLinkValue = newActiveMetaLinkValue
    }

    const previousActiveMenuLinkValue = this.activeMenuLinkValue
    const newActiveMenuLinkValue =
      this.activeMenuLinkItems.find(item => item.active)?.value || previousActiveMenuLinkValue
    if (previousActiveMenuLinkValue !== newActiveMenuLinkValue) {
      this.activeMenuLinkValue = newActiveMenuLinkValue
    }
  }

  /**
   * EVENT BINDING
   * ------------------------------------------------------
   */

  private onOptionChange = async () => {
    this.linkItems = this.options.map(option => new NavMetaLinkItem(option, this))
    this.metaButtons = this.buttons.map(button => new NavMetaButton(button, this))
  }

  private onTouchToggleFlyout = (_ev: MouseEvent) => {
    this.isFlyoutActive = !this.isFlyoutActive
    if (this.isFlyoutActive) {
      this.bodyScrollHandler.disable()
    } else {
      this.bodyScrollHandler.enable()
    }
  }

  private onPopupOpen = (triggers: HTMLBalButtonElement[]) => {
    triggers.forEach(trigger => {
      if (trigger.classList.contains('bal-nav__popup--desktop')) {
        trigger.inverted = false
      } else if (trigger.classList.contains('bal-nav__popup--touch-bottom')) {
        trigger.color = 'primary'
      }
    })
  }

  private onPopupClose = (triggers: HTMLBalButtonElement[]) => {
    triggers.forEach(trigger => {
      if (trigger.classList.contains('bal-nav__popup--desktop')) {
        trigger.inverted = true
      } else if (trigger.classList.contains('bal-nav__popup--touch-bottom')) {
        trigger.color = 'info'
      }
    })
  }

  private onMetaBarTabChange = (ev: BalEvents.BalTabsChange): void => {
    this.activeMetaLinkValue = ev.detail
    console.log(ev, this.activeMetaLinkValue)
  }

  private onMenuBarTabChange = (value?: string): void => {
    if (this.activeMenuLinkValue === value) {
      this.isFlyoutActive = !this.isFlyoutActive
    } else {
      this.isFlyoutActive = true
    }
    this.activeMenuLinkValue = value
  }

  /**
   * RENDER
   * ------------------------------------------------------
   */

  private get activeMenuLinkItems(): NavMenuLinkItem[] {
    const foundLinkItem = this.linkItems.find(item => item.value === this.activeMetaLinkValue)
    if (foundLinkItem) {
      return foundLinkItem.mainLinkItems
    }
    return []
  }

  private get activeMenuLinkItem(): NavMenuLinkItem | undefined {
    const foundLinkItem = this.activeMenuLinkItems.find(item => item.value === this.activeMenuLinkValue)
    return foundLinkItem ? foundLinkItem : undefined
  }

  render() {
    const block = BEM.block('nav')
    const flyoutBlock = block.element('flyout')

    return (
      <Host
        id={this.navId}
        role="navigation"
        class={{
          ...block.class(),
        }}
      >
        {/*
          Desktop Variant
          ----------------------------
        */}
        <div class="bal-nav-meta-bar-transform">
          {this.isDesktop ? (
            <bal-nav-meta-bar variant="primary" size="small" position="sticky-top">
              <bal-stack space="auto">
                {this.linkItems.length > 1 ? (
                  <bal-tabs
                    spaceless
                    inverted
                    context="meta"
                    value={this.activeMetaLinkValue}
                    onBalChange={ev => this.onMetaBarTabChange(ev)}
                  >
                    {this.linkItems.map(item => item.render())}
                  </bal-tabs>
                ) : (
                  <span></span>
                )}
                <bal-stack space="x-small" fit-content>
                  {this.metaButtons.map(button => button.renderAtMetaBar())}
                </bal-stack>
              </bal-stack>
            </bal-nav-meta-bar>
          ) : (
            ''
          )}
          {this.isDesktop ? (
            <bal-nav-menu-bar position="fixed-top" ref={menuBarEl => (this.menuBarEl = menuBarEl)}>
              <bal-stack space="auto" space-row="none" use-wrap>
                {this.renderLogo()}
                <bal-tabs context="navigation" accordion spaceless value={this.activeMenuLinkValue}>
                  {this.linkItems
                    .find(item => item.value === this.activeMetaLinkValue)
                    ?.mainLinkItems.map(item =>
                      item.render({
                        onClick: () => this.onMenuBarTabChange(item.value),
                      }),
                    )}
                </bal-tabs>
              </bal-stack>
              {this.isFlyoutActive ? (
                <bal-nav-menu-flyout>
                  <bal-nav-link
                    role="listitem"
                    variant="overview"
                    href={this.activeMenuLinkItem?.overviewLink?.href}
                    target={this.activeMenuLinkItem?.overviewLink?.target}
                  >
                    {this.activeMenuLinkItem?.overviewLink?.label}
                  </bal-nav-link>
                  {this.renderGridLinks(this.activeMenuLinkItem)}
                </bal-nav-menu-flyout>
              ) : (
                ''
              )}
            </bal-nav-menu-bar>
          ) : (
            ''
          )}
        </div>
        {/*
          Touch Variant
          ----------------------------
        */}
        {this.isTouch ? (
          <bal-nav-meta-bar variant="white" size="normal">
            <bal-stack space="auto">
              {this.renderLogo()}
              <bal-stack space="x-small" fit-content>
                {this.metaButtons.map(button => button.renderAtTouchTopMetaBar())}
                <bal-button
                  square
                  color={this.isFlyoutActive ? 'primary' : 'light'}
                  icon={this.isFlyoutActive ? 'close' : 'menu-bars'}
                  aria-label={this.isFlyoutActive ? i18nNavBars[this.language].close : i18nNavBars[this.language].open}
                  onClick={ev => this.onTouchToggleFlyout(ev)}
                ></bal-button>
              </bal-stack>
            </bal-stack>
          </bal-nav-meta-bar>
        ) : (
          ''
        )}
        {this.isTouch && this.isFlyoutActive ? (
          <div class={{ ...flyoutBlock.class() }}>
            <div class="container">
              {this.linkItems.length > 1 ? (
                <bal-list border accordion-one-level>
                  {this.linkItems.map(metaItem => (
                    <bal-list-item accordion>
                      <bal-list-item-accordion-head icon="nav-go-down" accordion-open={metaItem.active}>
                        <bal-list-item-content>
                          <bal-list-item-title visual-level="large" level="span">
                            {metaItem.label}
                          </bal-list-item-title>
                        </bal-list-item-content>
                      </bal-list-item-accordion-head>
                      <bal-list-item-accordion-body>
                        {this.renderTouchMenuAccordions(metaItem)}
                      </bal-list-item-accordion-body>
                    </bal-list-item>
                  ))}
                </bal-list>
              ) : (
                this.renderTouchMenuAccordions(this.linkItems[0])
              )}
            </div>
          </div>
        ) : (
          ''
        )}
        {this.isTouch && this.isFlyoutActive ? (
          <bal-nav-meta-bar variant="grey" size="normal">
            <bal-stack space="x-small" align="center">
              {this.metaButtons.map(button => button.renderAtTouchBottomMetaBar())}
            </bal-stack>
          </bal-nav-meta-bar>
        ) : (
          ''
        )}
        <div>
          <slot></slot>
        </div>
      </Host>
    )
  }

  renderGridLinks(linkItem?: NavMenuLinkItem) {
    if (!linkItem) {
      return ''
    }
    return (
      <bal-nav-link-grid>
        <bal-nav-link-grid-col>{linkItem.sectionLinkItems?.map(itemGroup => itemGroup.render())}</bal-nav-link-grid-col>
        <bal-nav-link-grid-col static-col>
          {linkItem.serviceLinkItems?.map(itemGroup => itemGroup.render())}
        </bal-nav-link-grid-col>
      </bal-nav-link-grid>
    )
  }

  renderTouchMenuAccordions(metaItem: NavMetaLinkItem) {
    return (
      <bal-list accordion-one-level size="small">
        {metaItem.mainLinkItems.map(menuItem =>
          menuItem.isLink ? (
            <bal-list-item sub-accordion-item href={menuItem.href} target={menuItem.target}>
              <bal-list-item-content>
                <bal-list-item-title visual-level="medium" level="span">
                  {menuItem.label}
                </bal-list-item-title>
              </bal-list-item-content>
            </bal-list-item>
          ) : (
            <bal-list-item accordion sub-accordion-item>
              <bal-list-item-accordion-head icon="nav-go-down" accordion-open={menuItem.active}>
                <bal-list-item-content>
                  <bal-list-item-title visual-level="medium" level="span">
                    {menuItem.label}
                  </bal-list-item-title>
                </bal-list-item-content>
              </bal-list-item-accordion-head>
              <bal-list-item-accordion-body>
                <div style={{ width: '100%' }}>
                  <bal-nav-link
                    role="listitem"
                    variant="overview"
                    href={this.activeMenuLinkItem?.overviewLink?.href}
                    target={this.activeMenuLinkItem?.overviewLink?.target}
                  >
                    {this.activeMenuLinkItem?.overviewLink?.label}
                  </bal-nav-link>
                  {this.renderGridLinks(menuItem)}
                </div>
              </bal-list-item-accordion-body>
            </bal-list-item>
          ),
        )}
      </bal-list>
    )
  }

  renderLogo() {
    const Link = this.logo?.href ? 'a' : this.logo?.clickable ? 'button' : 'div'
    return (
      <Link
        class="bal-nav__logo"
        aria-label={this.logo?.ariaLabel}
        title={this.logo?.htmlTitle}
        href={this.logo?.href}
        target={this.logo?.target}
      >
        <bal-logo></bal-logo>
      </Link>
    )
  }
}

let NavIds = 0
