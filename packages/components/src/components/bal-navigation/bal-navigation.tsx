import { Component, h, ComponentInterface, Host, Element, State, Prop, Listen } from '@stencil/core'
import { LevelInfo, observeLevels } from './utils/level.utils'
import { BEM } from '../../utils/bem'
import { balDevice } from '../../utils/device'
import { BalScrollHandler } from '../../utils/scroll'
import { BalBreakpointObserver, BalBreakpoints, ListenToBreakpoints, balBreakpoints } from '../../utils/breakpoints'
import { balBrowser } from '../../utils/browser'

@Component({
  tag: 'bal-navigation',
  styleUrls: {
    css: 'bal-navigation.sass',
  },
})
export class Navigation implements ComponentInterface, BalBreakpointObserver {
  @Element() el!: HTMLElement

  private mutationO?: MutationObserver
  private mainNavElement?: HTMLBalNavigationMainElement
  private mainNavTabsEl?: HTMLBalTabsElement
  private previousY = 0

  private bodyScrollBlocker = new BalScrollHandler()

  @State() mainMobileHeight = ''
  @State() isMetaHidden = false
  @State() levels: LevelInfo[] = []
  @State() selectedMetaIndex = 0
  @State() selectedMainIndex = 0
  @State() isMainBodyOpen = false
  @State() selectedMetaValue? = ''
  @State() selectedMainValue? = ''
  @State() isTouch = balBreakpoints.isTouch
  @State() isDesktop = balBreakpoints.isDesktop
  /**
   * Defines if the animation should be active
   */
  @Prop() logoAnimated = true
  /**
   * Path to the logo-image
   */
  @Prop() logoPath = '/'
  /**
   * Aria label for the meta-navigation-wrapper
   */
  @Prop() ariaLabelMeta = ''
  /**
   * Aria label for the main-navigation-wrapper
   */
  @Prop() ariaLabelMain = ''
  /**
   * Defines the initially active meta-navigation-item
   */
  @Prop() metaValue?: string

  @Listen('click', { target: 'document' })
  async clickOnOutside(ev: UIEvent) {
    if (this.isDesktop) {
      if (!this.mainNavElement?.contains(ev.target as Node) && this.isMainBodyOpen) {
        this.isMainBodyOpen = false
        this.selectedMainValue = ''
      }
    }

    if (this.isTouch) {
      if (this.metaMobileActionsElement?.contains(ev.target as Node)) {
        this.isMainBodyOpen = false
      }
    }
  }

  private get metaMobileActionsElement(): HTMLElement | null {
    return this.el.querySelector('.bal-nav__metamobile__actions') as HTMLElement
  }

  private get metaDesktopEndElement(): HTMLElement | null {
    return this.el.querySelector('bal-navigation-meta-end') as HTMLElement
  }

  @ListenToBreakpoints()
  breakpointListener(breakpoints: BalBreakpoints): void {
    this.isMetaHidden = false
    this.mainMobileHeight = this.getMaxHeight()

    if (this.isTouch !== breakpoints.touch) {
      this.isMainBodyOpen = false
      this.selectedMainValue = ''
      this.isTouch = breakpoints.touch
    }

    this.isDesktop = breakpoints.desktop
  }

  @Listen('orientationchange', { target: 'window' })
  async orientationHandler() {
    this.isMainBodyOpen = false
    this.dismissPopover()
  }

  @Listen('scroll', { target: 'window', passive: false })
  handleScroll(_event: Event) {
    if (this.isDesktop && !this.bodyScrollBlocker.isDisabled() && balBrowser.hasWindow) {
      const maxScrollHeight = document.body.scrollHeight - document.body.clientHeight
      const isOnTop = 0 >= window.scrollY
      const isOverViewportTop = 0 > window.scrollY
      const isOverViewportBottom = maxScrollHeight <= window.scrollY
      const didMoveDownwards = window.scrollY > this.previousY

      this.isMetaHidden = !isOnTop && (didMoveDownwards || isOverViewportBottom || isOverViewportTop)
      this.previousY = window.scrollY
    }
  }

  async connectedCallback() {
    this.selectedMetaValue = this.metaValue
    await this.readSubLevels()
    this.updateIndexes()
    this.mutationO = observeLevels(this.el, 'bal-navigation-levels', () => this.readSubLevels())
    this.bodyScrollBlocker.connect()
  }

  disconnectedCallback() {
    if (this.mutationO) {
      this.mutationO.disconnect()
      this.mutationO = undefined
    }
    this.bodyScrollBlocker.disconnect()
    this.metaMobileActionsElement?.removeEventListener('balChange', this.listenToPopoverChangeEvent)
    this.metaDesktopEndElement?.removeEventListener('balChange', this.listenToPopoverChangeEvent)
  }

  componentDidLoad() {
    if (balBrowser.hasWindow) {
      this.previousY = window.scrollY
    }
    this.mainMobileHeight = this.getMaxHeight()

    this.metaMobileActionsElement?.addEventListener('balChange', this.listenToPopoverChangeEvent)
    this.metaDesktopEndElement?.addEventListener('balChange', this.listenToPopoverChangeEvent)
  }

  componentDidUpdate() {
    this.updateIndexes()
  }

  bodyOffset = 0

  private listenToPopoverChangeEvent = async (ev: Event) => {
    const customEvent = ev as BalEvents.BalPopoverChange
    const isNavPopoverOpen = customEvent.detail

    if (isNavPopoverOpen) {
      this.bodyScrollBlocker.disable()
    } else {
      this.bodyScrollBlocker.enable()
    }

    if (isNavPopoverOpen) {
      this.isMainBodyOpen = false
    }
  }

  private updateIndexes() {
    if (this.levels?.length > 0) {
      const selectedMetaIndex = this.levels.findIndex(meta => meta.value === this.selectedMetaValue)
      this.selectedMetaIndex = selectedMetaIndex !== -1 ? selectedMetaIndex : 0
    }
  }

  private async readSubLevels() {
    const levelEl = this.el.querySelector('bal-navigation-levels')
    const levels = await levelEl?.getLevelInfos()
    if (levels) {
      this.levels = levels
    }
  }

  private getMaxHeight() {
    if (balBrowser.hasWindow) {
      return `${(window.innerHeight - 64) / 16}rem`
    }
    return '0'
  }

  private dismissPopover() {
    const popoverElements = this.el.querySelectorAll('bal-popover')
    popoverElements?.forEach(popoverEl => {
      popoverEl.active = false
    })
  }

  private onBurgerButtonClick = async (): Promise<void> => {
    this.dismissPopover()
    this.isMainBodyOpen = !this.isMainBodyOpen
    if (this.isMainBodyOpen) {
      this.bodyScrollBlocker.disable()
    } else {
      this.bodyScrollBlocker.enable()
    }
  }

  onMainTabChange = async (ev: BalEvents.BalTabsChange) => {
    const isMainNavOpen = ev.detail !== ''
    const option = await this.mainNavTabsEl?.getOptionByValue(ev.detail as any)
    const isLink = option?.href !== '' && option?.href !== undefined

    if (balDevice.hasTouchScreen) {
      if (isMainNavOpen) {
        this.isMetaHidden = false
        if (!isLink) {
          this.bodyScrollBlocker.disable()
        } else {
          this.bodyScrollBlocker.enable()
        }
      } else {
        this.bodyScrollBlocker.enable()
      }
    }
  }

  render() {
    const navigationEl = BEM.block('nav')
    const hasLevels = this.levels?.length > 0

    return (
      <Host
        class={{
          ...navigationEl.class(),
          'bal-nav--transformed': this.isMetaHidden,
        }}
      >
        <bal-navigation-meta class="is-hidden-touch" aria-label-meta={this.ariaLabelMeta}>
          <bal-navigation-meta-start>
            {hasLevels && (
              <bal-tabs spaceless inverted context="meta" value={this.selectedMetaValue}>
                {this.levels.map((meta, index) => {
                  return meta.isTabLink ? (
                    <bal-tab-item
                      label={meta.label}
                      value={meta.value}
                      href={meta.link}
                      target={meta.target}
                      {...meta.trackingData}
                    />
                  ) : (
                    <bal-tab-item
                      label={meta.label}
                      value={meta.value}
                      {...meta.trackingData}
                      onBalNavigate={ev => {
                        meta.onClick(ev.detail)
                        this.selectedMetaValue = meta.value
                        this.selectedMetaIndex = index
                        this.isMainBodyOpen = false
                        this.selectedMainValue = ''
                      }}
                    />
                  )
                })}
              </bal-tabs>
            )}
          </bal-navigation-meta-start>
          <bal-navigation-meta-end>{this.levels && <slot name="meta-actions" />}</bal-navigation-meta-end>
        </bal-navigation-meta>

        <bal-navigation-main
          class={{
            'is-hidden-touch': true,
            'container': true,
            'bal-nav__main--expanded': this.isMainBodyOpen,
          }}
          ref={el => {
            this.mainNavElement = el
          }}
          aria-label-main={this.ariaLabelMain}
        >
          <bal-navigation-main-head
            slot="main-head"
            class={{
              'is-hidden-mobile': true,
              'bal-nav__main__head--active': this.isMainBodyOpen,
            }}
          >
            <div>
              <a href={this.logoPath} class="bal-nav__main-head-logo" tabindex={-1}>
                <bal-logo color="blue" animated={this.logoAnimated && !this.isTouch}></bal-logo>
              </a>
              <bal-tabs
                accordion
                spaceless
                context="navigation"
                value={this.selectedMainValue}
                onBalChange={event => this.onMainTabChange(event as any)}
                ref={el => {
                  this.mainNavTabsEl = el
                }}
              >
                {hasLevels &&
                  this.levels[this.selectedMetaIndex].subLevels?.map((main, index) => {
                    return main.isTabLink ? (
                      <bal-tab-item
                        label={main.label}
                        value={main.value}
                        href={main.link}
                        target={main.target}
                        onBalNavigate={ev => {
                          main.onClick(ev.detail)
                          this.selectedMainIndex = index
                          this.isMainBodyOpen = false
                          this.selectedMainValue = main.value
                        }}
                      />
                    ) : (
                      <bal-tab-item
                        label={main.label}
                        value={main.value}
                        {...main.trackingData}
                        onBalNavigate={ev => {
                          main.onClick(ev.detail)
                          this.selectedMainIndex = index
                          this.isMainBodyOpen = !(ev.target.value === this.selectedMainValue)
                          this.selectedMainValue = ev.target.value === this.selectedMainValue ? '' : main.value
                        }}
                      />
                    )
                  })}
              </bal-tabs>
            </div>
          </bal-navigation-main-head>
          {this.isMainBodyOpen && (
            <bal-navigation-main-body slot="main-body">
              {this.levels
                .filter((_, index) => index === this.selectedMetaIndex)
                .map(meta =>
                  meta.subLevels
                    ?.filter((_, mainIndex) => this.selectedMainIndex === mainIndex)
                    .map(main => (
                      <bal-navigation-menu
                        link-href={main.link}
                        link-name={main.linkLabel}
                        target={main.target}
                        elements={main.subLevels}
                        tracking={main.trackingData}
                      />
                    )),
                )}
            </bal-navigation-main-body>
          )}
        </bal-navigation-main>

        <div class="bal-nav__metamobile container">
          <nav role="navigation" aria-label={this.ariaLabelMeta}>
            <a href={this.logoPath} class="bal-nav__main-mobile__logo" tabindex={-1}>
              <bal-logo color="blue" animated={this.logoAnimated && this.isTouch}></bal-logo>
            </a>
            <div class="bal-nav__metamobile__actions">
              <slot name="meta-actions-mobile" />
            </div>
            <bal-button
              slot="burger"
              data-testid="navigation-burger"
              color={this.isMainBodyOpen ? 'primary' : 'light'}
              square={true}
              icon={this.isMainBodyOpen ? 'close' : 'menu-bars'}
              onClick={() => this.onBurgerButtonClick()}
            />
          </nav>
        </div>
        <div
          class="bal-nav__main-mobile container"
          style={{
            '--bal-nav-main-mobile-height': this.mainMobileHeight,
            'display': this.isMainBodyOpen && this.isTouch ? 'block' : 'none',
          }}
        >
          <bal-list border accordion-one-level size="small" class="bal-nav__main__list">
            {this.levels.map(meta => (
              <bal-list-item accordion class="bal-nav__main-mobile__main-accordion">
                <bal-list-item-accordion-head icon="nav-go-down">
                  <bal-list-item-content>
                    <bal-list-item-title level="large">{meta.label}</bal-list-item-title>
                  </bal-list-item-content>
                </bal-list-item-accordion-head>
                <bal-list-item-accordion-body class="bal-list__item__accordion-body__parent">
                  {meta.link && (
                    <div class="bal-nav__main-mobile__link">
                      <a href={meta.link} {...meta.trackingData}>
                        {meta.linkLabel}
                      </a>
                    </div>
                  )}
                  <bal-list accordion-one-level size="small">
                    {meta.subLevels?.map(main => {
                      return main.isTabLink ? (
                        <bal-list-item sub-accordion-item href={main.link} target={main.target}>
                          <bal-list-item-content>
                            <bal-list-item-title level="medium">{main.label}</bal-list-item-title>
                          </bal-list-item-content>
                        </bal-list-item>
                      ) : (
                        <bal-list-item accordion sub-accordion-item>
                          <bal-list-item-accordion-head icon="nav-go-down">
                            <bal-list-item-content>
                              <bal-list-item-title level="medium">{main.label}</bal-list-item-title>
                            </bal-list-item-content>
                          </bal-list-item-accordion-head>
                          <bal-list-item-accordion-body>
                            <bal-navigation-menu
                              link-href={main.link}
                              link-name={main.linkLabel}
                              target={main.target}
                              elements={main.subLevels}
                              tracking={main.trackingData}
                            />
                          </bal-list-item-accordion-body>
                        </bal-list-item>
                      )
                    })}
                  </bal-list>
                </bal-list-item-accordion-body>
              </bal-list-item>
            ))}
          </bal-list>
        </div>
        <div
          class="bal-nav__foot-mobile"
          style={{
            display: this.isMainBodyOpen && this.isTouch ? 'block' : 'none',
          }}
        >
          <slot name="meta-mobile-foot" />
        </div>
        <slot></slot>
      </Host>
    )
  }
}
