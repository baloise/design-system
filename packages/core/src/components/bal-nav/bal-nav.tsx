import {
  Component,
  ComponentInterface,
  Element,
  Event,
  EventEmitter,
  Host,
  Listen,
  Method,
  Prop,
  State,
  Watch,
  h,
} from '@stencil/core'
import { BEM } from '../../utils/bem'
import { BalBreakpointObserver, BalBreakpoints, ListenToBreakpoints, balBreakpoints } from '../../utils/breakpoints'
import { balBrowser } from '../../utils/browser'
import {
  BalConfigObserver,
  BalConfigState,
  BalLanguage,
  BalRegion,
  ListenToConfig,
  defaultConfig,
} from '../../utils/config'
import { waitAfterIdleCallback, waitForComponent } from '../../utils/helpers'
import { LogInstance, Loggable, Logger } from '../../utils/log'
import { BalMutationObserver, ListenToMutation } from '../../utils/mutation'
import { BalScrollHandler } from '../../utils/scroll'
import { i18nNavBars } from './bal-nav.i18n'
import { NavLinkItemObserver } from './bal-nav.types'
import { NavLinkItem } from './models/bal-nav-link-item'
import { NavMenuLinkItem } from './models/bal-nav-menu-link-item'
import { NavMetaButton } from './models/bal-nav-meta-button'
import { NavMetaLinkItem } from './models/bal-nav-meta-link-item'
import { stopEventBubbling } from '../../utils/form-input'

/**
 * 1. click on tab when flyout is open on tab focuses the flyout
 * 2. when reaching last link in flyout and pressing tab, focus goes to the next element(next tab) outside the flyout
 * 3. when shift tab in tab focus goes to last link in flyout
 * 4. when shift tab the first link in flyout focus goes to active tab
 */

@Component({
  tag: 'bal-nav',
  styleUrl: 'bal-nav.sass',
})
export class Nav
  implements
    ComponentInterface,
    Loggable,
    BalBreakpointObserver,
    BalMutationObserver,
    NavLinkItemObserver,
    BalConfigObserver
{
  private navId = `bal-nav-${NavIds++}`
  private bodyScrollHandler = new BalScrollHandler()
  private menuBarEl: HTMLBalNavMenuBarElement | undefined
  private metaBarEl: HTMLBalNavMetaBarElement | undefined

  @Element() el!: HTMLElement

  log!: LogInstance

  @State() isTouch = balBreakpoints.isTouch
  @State() isDesktop = balBreakpoints.isDesktop
  @State() language: BalLanguage = defaultConfig.language
  @State() region: BalRegion = defaultConfig.region
  @State() isFlyoutActive = false
  private hasRenderedWithFlyoutActive = false
  @State() activeMetaLinkValue?: string
  @State() activeMenuLinkValue?: string // only for desktop tab view

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
    this.onMetaButtonChange()
  }

  /**
   * Emitted when a nav link item is clicked. This event can be used to
   * add data tracking
   */
  @Event() balNavItemClick!: EventEmitter<BalEvents.BalNavItemClickDetail>

  /**
   * LIFECYCLE
   * ------------------------------------------------------
   */

  connectedCallback() {
    this.bodyScrollHandler.connect()
  }

  componentWillLoad() {
    this.onOptionChange()
    this.onMetaButtonChange()
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
        const isTouchMetaTopButtonClicked = triggers.some(triggerEl =>
          triggerEl.classList.contains('bal-nav__popup--touch-top'),
        )
        if (isTouchMetaTopButtonClicked) {
          this.closeFlyout()
        }
      } else {
        this.onPopupClose(triggers)
      }
    }
  }

  @Listen('click', { target: 'document', passive: true })
  async clickOnOutside(ev: UIEvent) {
    if (this.isDesktop) {
      if (this.hasRenderedWithFlyoutActive) {
        const targetIsInMetaBar = this.metaBarEl
          ?.querySelector('.bal-nav-meta-bar__container')
          ?.contains(ev.target as Node)
        const targetIsInMenuBar = this.menuBarEl
          ?.querySelector('.bal-nav-menu-bar__container')
          ?.contains(ev.target as Node)

        if (!targetIsInMetaBar && !targetIsInMenuBar) {
          this.closeFlyout()
          const tabs = this.menuBarEl?.querySelector('.bal-tabs') as HTMLBalTabsElement
          tabs.closeAccordion()
        }
      }
    }
  }

  mutationObserverActive = true

  @ListenToMutation({ tags: ['bal-popup'], waitAfterFramePrint: true })
  mutationListener(): void {
    this.onMetaButtonChange()
  }

  @ListenToBreakpoints()
  breakpointListener(breakpoints: BalBreakpoints): void {
    if (this.isTouch !== breakpoints.touch) {
      this.isTouch = breakpoints.touch
      this.isDesktop = breakpoints.desktop
      this.closeAllPopups()
      this.closeFlyout()
    }

    if (this.isTouch) {
      this.updateTabs()
    }
  }

  linkItemClickListener(item?: NavLinkItem) {
    if (item && item.toJson) {
      this.balNavItemClick.emit(item.toJson())
    }
  }

  accordionClickListener(item?: NavLinkItem) {
    if (this.isTouch && item) {
      this.updateActiveItem(item)
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
   * GETTERS
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

  /**
   * PRIVATE METHODS
   * ------------------------------------------------------
   */

  private toggleFlyout() {
    if (this.isFlyoutActive) {
      this.closeFlyout()
    } else {
      this.openFlyout()
    }
  }

  private closeFlyout() {
    this.isFlyoutActive = false
  }

  private openFlyout() {
    this.isFlyoutActive = true
  }

  private async updateActiveItem(item: NavLinkItem) {
    if ('NavMetaLinkItem' === item.type) {
      this.activeMetaLinkValue = this.activeMetaLinkValue === item.value ? undefined : item.value
      this.activeMenuLinkValue = undefined
    }
    if ('NavMenuLinkItem' === item.type) {
      this.activeMenuLinkValue = this.activeMenuLinkValue === item.value ? undefined : item.value
    }

    await waitForComponent(this.el)
    await waitAfterIdleCallback()

    const elementToScroll = this.el.querySelector(`#${item.id}`)
    if (elementToScroll) {
      elementToScroll.scrollIntoView({
        behavior: 'smooth',
      })

      // location.href = '#'
      // location.href = `#${item.id}`
    }
  }

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

  private closeAllPopups() {
    const popups = Array.from(this.el.querySelectorAll('bal-popup'))
    popups.forEach(popup => popup.dismiss())
  }

  /**
   * EVENT BINDING
   * ------------------------------------------------------
   */

  private onOptionChange = async () => {
    this.activeMetaLinkValue = undefined
    this.activeMenuLinkValue = undefined
    this.linkItems = this.options.map(option => new NavMetaLinkItem(option, this))
  }

  private onMetaButtonChange = async () => {
    this.metaButtons = this.buttons.map(button => new NavMetaButton(button, this))
  }

  private onTouchToggleFlyout = (_ev: MouseEvent) => {
    this.closeAllPopups()
    this.toggleFlyout()

    if (balBrowser.hasWindow && window.scrollY > 0) {
      window.scrollTo(0, 0)
    }

    if (this.isFlyoutActive) {
      this.bodyScrollHandler.disable()
    } else {
      this.bodyScrollHandler.enable()
    }
  }

  private onPopupOpen = (triggers: HTMLBalButtonElement[]) => {
    if (this.isTouch) {
      if (balBrowser.hasWindow && window.scrollY > 0) {
        window.scrollTo(0, 0)
      }
    }

    triggers.forEach(trigger => {
      if (trigger.classList.contains('bal-nav__popup--desktop')) {
        trigger.inverted = false
      } else if (trigger.classList.contains('bal-nav__popup--touch-bottom')) {
        trigger.color = 'primary'
      } else if (trigger.classList.contains('bal-nav__popup--touch-top')) {
        trigger.color = 'primary'
      }
    })

    this.bodyScrollHandler.disable()
  }

  private onPopupClose = (triggers: HTMLBalButtonElement[]) => {
    if (!this.isFlyoutActive) {
      this.bodyScrollHandler.enable()
    }
    triggers.forEach(trigger => {
      if (trigger.classList.contains('bal-nav__popup--desktop')) {
        trigger.inverted = true
      } else if (trigger.classList.contains('bal-nav__popup--touch-bottom')) {
        trigger.color = 'info'
      } else if (trigger.classList.contains('bal-nav__popup--touch-top')) {
        trigger.color = 'light'
      }
    })
  }

  private onMetaBarTabChange = (ev: BalEvents.BalTabsChange): void => {
    if (ev.detail !== this.activeMetaLinkValue) {
      this.activeMetaLinkValue = ev.detail
      const activeMetaItem = this.linkItems.find(item => item.value === this.activeMetaLinkValue)
      if (activeMetaItem && activeMetaItem.mainLinkItems.length > 0) {
        this.activeMenuLinkValue = activeMetaItem.mainLinkItems[0].value
      }
    }
  }

  private onMenuBarTabChange = (value?: string): void => {
    if (this.activeMenuLinkValue === value) {
      this.toggleFlyout()
    } else {
      this.openFlyout()
    }
    this.activeMenuLinkValue = value
  }

  /**
   * RENDER
   * ------------------------------------------------------
   */

  render() {
    const block = BEM.block('nav')
    const flyoutBlock = block.element('flyout')

    this.hasRenderedWithFlyoutActive = this.isFlyoutActive

    return (
      <Host
        id={this.navId}
        class={{
          ...block.class(),
        }}
      >
        {/*
          Desktop Variant
          ----------------------------
        */}
        <div
          class={{
            'bal-nav-meta-bar-transform': true,
            'bal-nav-meta-bar-transform-touch': this.isTouch,
          }}
        >
          {this.isDesktop ? (
            <bal-nav-meta-bar
              variant="primary"
              size="small"
              position="sticky-top"
              ref={metaBarEl => (this.metaBarEl = metaBarEl)}
            >
              <bal-stack space="auto">
                {this.linkItems.length > 1 ? (
                  <bal-tabs
                    inverted
                    context="meta"
                    value={this.activeMetaLinkValue}
                    aria-label={i18nNavBars[this.language].mainNavigation}
                    onBalChange={ev => this.onMetaBarTabChange(ev)}
                  >
                    {this.linkItems.map(item =>
                      item.render({
                        flyoutId: `${this.navId}-menu-flyout`,
                      }),
                    )}
                  </bal-tabs>
                ) : (
                  <span></span>
                )}
                <bal-stack id="bal-nav__meta-buttons" space="x-small" fit-content>
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
                <bal-tabs
                  context="navigation"
                  accordion
                  value={this.activeMenuLinkValue}
                  aria-label={i18nNavBars[this.language].navigation}
                >
                  {this.linkItems
                    .find(item => item.value === this.activeMetaLinkValue)
                    ?.mainLinkItems.map((item, index) =>
                      item.render({
                        flyoutId: `${this.navId}-menu-flyout`,
                        onClick: () => this.onMenuBarTabChange(item.value),
                        onTabPress: (ev: KeyboardEvent) => {
                          console.log('onTabPress', item, this.activeMenuLinkItem)
                          if (this.isFlyoutActive) {
                            const links = this.linkItems.find(
                              item => item.value === this.activeMetaLinkValue,
                            )?.mainLinkItems

                            const sourceItem = item
                            const indexOfSourceItem = links?.findIndex(link => link.value === sourceItem.value)
                            let indexOfTargetItem = ev.shiftKey ? indexOfSourceItem - 1 : indexOfSourceItem + 1
                            if (indexOfTargetItem < 0) {
                              indexOfTargetItem = 0
                            }
                            const targetItem = links?.[indexOfTargetItem]

                            if (indexOfSourceItem === indexOfTargetItem + 1) {
                              console.log('forward focus on flyout')
                              const flyout = this.el.querySelector(`#${this.navId}-menu-flyout`)
                              if (flyout) {
                                ;(flyout as HTMLBalNavMenuFlyoutElement).focus()
                              }
                            }

                            if (indexOfSourceItem === indexOfTargetItem - 1) {
                              console.log('backward focus on flyout')
                              const flyout = this.el.querySelector(`#${this.navId}-menu-flyout`)
                              if (flyout) {
                                ;(flyout as HTMLBalNavMenuFlyoutElement).focus()
                              }
                            }
                          }
                        },
                      }),
                    )}
                </bal-tabs>
              </bal-stack>
              {this.isFlyoutActive ? (
                <bal-nav-menu-flyout
                  navId={this.navId}
                  aria-label={i18nNavBars[this.language].subNavigation}
                  onBalFocusOut={(ev: BalEvents.BalNavFlyoutFocusOut) => {
                    stopEventBubbling(ev.detail)
                    const links = this.linkItems.find(item => item.value === this.activeMetaLinkValue)?.mainLinkItems

                    const sourceItem = this.activeMenuLinkItem
                    const indexOfSourceItem = links?.findIndex(link => link.value === sourceItem.value)

                    const indexOfTargetItem = indexOfSourceItem + 1
                    if (indexOfTargetItem >= links?.length) {
                      return
                    }

                    console.log('forward focus out of flyout')
                    const targetItem = links?.[indexOfTargetItem]
                    debugger
                    if (targetItem) {
                      // targetItem.setFocus()
                    }
                  }}
                >
                  <bal-nav-link
                    role="listitem"
                    variant="overview"
                    href={this.activeMenuLinkItem?.overviewLink?.href}
                    target={this.activeMenuLinkItem?.overviewLink?.target}
                    onClick={() => this.linkItemClickListener(this.activeMenuLinkItem?.overviewLink)}
                  >
                    {this.activeMenuLinkItem?.overviewLink?.label}{' '}
                    {this.activeMenuLinkItem?.overviewLink?.label ? '➞' : ''}
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
          <div>
            <slot></slot>
          </div>
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
        {this.isTouch ? (
          <div class={{ ...flyoutBlock.class(), ...flyoutBlock.modifier('visible').class(this.isFlyoutActive) }}>
            <nav class={{ ...flyoutBlock.element('container').class() }}>
              <ul
                class={{
                  ...block.element('mobile-meta-list').class(),
                }}
              >
                {this.linkItems.map(item =>
                  item.renderTouch({
                    activeMetaLinkValue: this.activeMetaLinkValue,
                    activeMenuLinkValue: this.activeMenuLinkValue,
                  }),
                )}
              </ul>
            </nav>
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
      <bal-list accordion-one-level class="pt-xxx-small pb-normal">
        {metaItem.mainLinkItems.map(menuItem =>
          menuItem.isLink ? (
            <bal-list-item key={menuItem.label} sub-accordion-item href={menuItem.href} target={menuItem.target}>
              <bal-list-item-content>
                <bal-list-item-title visual-level="medium" level="span">
                  {menuItem.label}
                </bal-list-item-title>
              </bal-list-item-content>
            </bal-list-item>
          ) : (
            <bal-list-item key={menuItem.label} accordion sub-accordion-item>
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
                    href={menuItem.overviewLink?.href}
                    target={menuItem.overviewLink?.target}
                    onClick={() => this.linkItemClickListener(menuItem.overviewLink)}
                  >
                    {menuItem.overviewLink?.label}
                  </bal-nav-link>
                  <div class="pt-normal">{this.renderGridLinks(menuItem)}</div>
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
        onClick={() =>
          this.balNavItemClick.emit({
            value: 'logo',
            label: 'Logo',
            href: this.logo?.href,
            target: this.logo?.target,
          })
        }
      >
        <bal-logo animated></bal-logo>
      </Link>
    )
  }
}

let NavIds = 0
