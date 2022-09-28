import { Component, h, ComponentInterface, Host, Element, State, Prop, Listen } from '@stencil/core'
import { LevelInfo, observeLevels } from './utils/level.utils'
import { BEM } from '../../utils/bem'
import { isPlatform } from '../../utils/platform'
import { Events } from '../../types'
import { BodyScrollBlocker } from '../../utils/toggle-scrolling-body'
import { stopEventBubbling } from '../../helpers/form-input.helpers'

@Component({
  tag: 'bal-navigation',
})
export class Navigation implements ComponentInterface {
  @Element() el!: HTMLElement

  private mutationO?: MutationObserver
  private mainNavElement?: HTMLBalNavigationMainElement
  private previousY = 0

  private bodyScrollBlocker = BodyScrollBlocker()

  @State() mainMobileHeight = ''
  @State() isTransformed = false
  @State() levels: LevelInfo[] = []
  @State() selectedMetaIndex = 0
  @State() selectedMainIndex = 0
  @State() isMainBodyOpen = false
  @State() selectedMetaValue? = ''
  @State() selectedMainValue? = ''
  @State() isTouch = isPlatform('touch')
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
  async clickOnOutside(event: UIEvent) {
    if (isPlatform('desktop')) {
      if (!this.mainNavElement?.contains(event.target as Node) && this.isMainBodyOpen) {
        this.isMainBodyOpen = false
        this.selectedMainValue = ''
      }
    }

    if (isPlatform('touch')) {
      if (this.metaMobileActionsElement?.contains(event.target as Node)) {
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

  @Listen('resize', { target: 'window' })
  async resizeHandler() {
    this.isTransformed = false
    this.mainMobileHeight = this.getMaxHeight()
    this.isTouch = isPlatform('touch')
  }

  @Listen('orientationchange', { target: 'window' })
  async orientationHandler() {
    this.isMainBodyOpen = false
    this.dismissPopover()
  }

  @Listen('scroll', { target: 'window', passive: false })
  handleScroll(event: Event) {
    if (isPlatform('desktop') && !this.bodyScrollBlocker.isBlocked()) {
      const didMoveDownwards = window.scrollY > this.previousY
      if (this.isTransformed === false && didMoveDownwards) {
        event.preventDefault()
        event.stopPropagation()
      }

      this.isTransformed = didMoveDownwards
      this.previousY = window.scrollY
    }
  }

  async connectedCallback() {
    this.selectedMetaValue = this.metaValue
    await this.readSubLevels()
    this.updateIndexes()
    this.mutationO = observeLevels(this.el, 'bal-navigation-levels', () => this.readSubLevels())
  }

  disconnectedCallback() {
    if (this.mutationO) {
      this.mutationO.disconnect()
      this.mutationO = undefined
    }
    this.metaMobileActionsElement?.removeEventListener('balChange', this.listenToPopoverChangeEvent)
    this.metaDesktopEndElement?.removeEventListener('balChange', this.listenToPopoverChangeEvent)
  }

  componentDidLoad() {
    this.previousY = window.scrollY
    this.mainMobileHeight = this.getMaxHeight()

    this.metaMobileActionsElement?.addEventListener('balChange', this.listenToPopoverChangeEvent)
    this.metaDesktopEndElement?.addEventListener('balChange', this.listenToPopoverChangeEvent)

    this.isTouch = isPlatform('touch')
  }

  componentDidUpdate() {
    this.updateIndexes()
  }

  bodyOffset = 0

  private listenToPopoverChangeEvent = async (event: Event) => {
    const customEvent = event as Events.BalPopoverChange
    const isNavPopoverOpen = customEvent.detail

    if (isNavPopoverOpen) {
      this.bodyScrollBlocker.block()
    } else {
      this.bodyScrollBlocker.allow()
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
    return `${(window.innerHeight - 64) / 16}rem`
  }

  private dismissPopover() {
    const popoverElements = this.el.querySelectorAll('bal-popover')
    popoverElements?.forEach(popoverEl => {
      popoverEl.value = false
    })
  }

  private onBurgerButtonClick = async (): Promise<void> => {
    this.dismissPopover()
    this.isMainBodyOpen = !this.isMainBodyOpen
    if (this.isMainBodyOpen) {
      this.bodyScrollBlocker.block()
    } else {
      this.bodyScrollBlocker.allow()
    }
  }

  private closeOtherAccordionsTimer?: NodeJS.Timer

  private onAccordionClick = (event: Event) => {
    stopEventBubbling(event)
    clearTimeout(this.closeOtherAccordionsTimer)

    const target = event.target as HTMLBalListItemElement
    const isMainAccordionItem = !target.subAccordionItem

    const closeOtherAccordions = (selector: string, element: Element) => {
      const items = element.querySelectorAll(selector)
      items.forEach(item => {
        if (item !== target) {
          const accordionHeadEl = item.querySelector('bal-list-item-accordion-head')
          if (accordionHeadEl) {
            accordionHeadEl.accordionOpen = false
          }
        }
      })
    }

    if (isMainAccordionItem) {
      closeOtherAccordions('bal-list-item.bal-nav__main-mobile__main-accordion', this.el)
      this.closeOtherAccordionsTimer = setTimeout(() => {
        closeOtherAccordions('bal-list-item.is-sub-accordion-item', this.el)
      }, 300)
    } else {
      const parent = target.closest('bal-list-item.bal-nav__main-mobile__main-accordion')
      if (parent) {
        closeOtherAccordions('bal-list-item.is-sub-accordion-item', parent)
      }
    }
  }

  onMainTabChange = (event: Events.BalTabsChange) => {
    const navMainBodyEl = this.el.querySelector('.bal-nav__main__body')

    if (navMainBodyEl) {
      const hasVerticalScrollbar = navMainBodyEl.scrollHeight > navMainBodyEl.clientHeight
      const isMainNavOpen = event.detail !== ''

      if (hasVerticalScrollbar) {
        if (isMainNavOpen) {
          this.bodyScrollBlocker.block()
        } else {
          this.bodyScrollBlocker.allow()
        }
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
          'bal-nav--transformed': this.isTransformed,
        }}
      >
        <bal-navigation-meta class="is-hidden-touch" aria-label-meta={this.ariaLabelMeta}>
          <bal-navigation-meta-start>
            {hasLevels && (
              <bal-tabs interface="meta" spaceless inverted={true} value={this.selectedMetaValue}>
                {this.levels.map((meta, index) => {
                  return meta.isTabLink ? (
                    <bal-tab-item label={meta.label} value={meta.value} href={meta.link} />
                  ) : (
                    <bal-tab-item
                      label={meta.label}
                      value={meta.value}
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
                <bal-logo color="blue" animated></bal-logo>
              </a>
              <bal-tabs
                interface="navigation"
                float="right"
                fullwidth
                spaceless
                value={this.selectedMainValue}
                onBalChange={this.onMainTabChange}
              >
                {hasLevels &&
                  this.levels[this.selectedMetaIndex].subLevels?.map((main, index) => {
                    return main.isTabLink ? (
                      <bal-tab-item
                        label={main.label}
                        value={main.value}
                        href={main.link}
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
                        icon="nav-go-down"
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
                      />
                    )),
                )}
            </bal-navigation-main-body>
          )}
        </bal-navigation-main>

        <div class="bal-nav__metamobile container">
          <nav role="navigation" aria-label={this.ariaLabelMeta}>
            <a href={this.logoPath} class="bal-nav__main-mobile__logo" tabindex={-1}>
              <bal-logo color="blue" animated></bal-logo>
            </a>
            <div class="bal-nav__metamobile__actions">
              <slot name="meta-actions-mobile" />
            </div>
            <bal-button
              slot="burger"
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
          <bal-list border in-main-nav={true} size="small">
            {this.levels.map(meta => (
              <bal-list-item
                accordion
                onBalNavigate={this.onAccordionClick}
                class="bal-nav__main-mobile__main-accordion"
              >
                <bal-list-item-accordion-head icon="nav-go-down">
                  <bal-list-item-content>
                    <bal-list-item-title level="h4">{meta.label}</bal-list-item-title>
                  </bal-list-item-content>
                </bal-list-item-accordion-head>
                <bal-list-item-accordion-body class="bal-list__item__accordion-body__parent">
                  <div>
                    {meta.link && (
                      <div class="bal-nav__main-mobile__link">
                        <a href={meta.link}>{meta.linkLabel}</a>
                      </div>
                    )}
                    <bal-list border in-main-nav={true} class="pt-4" size="small">
                      {meta.subLevels?.map(main => {
                        return main.isTabLink ? (
                          <bal-list-item sub-accordion-item href={main.link} target={main.target}>
                            <bal-list-item-content>
                              <bal-list-item-title level="h5">{main.label}</bal-list-item-title>
                            </bal-list-item-content>
                          </bal-list-item>
                        ) : (
                          <bal-list-item accordion sub-accordion-item>
                            <bal-list-item-accordion-head icon="nav-go-down">
                              <bal-list-item-content>
                                <bal-list-item-title level="h5">{main.label}</bal-list-item-title>
                              </bal-list-item-content>
                            </bal-list-item-accordion-head>
                            <bal-list-item-accordion-body>
                              <bal-navigation-menu
                                link-href={main.link}
                                link-name={main.linkLabel}
                                target={main.target}
                                elements={main.subLevels}
                              />
                            </bal-list-item-accordion-body>
                          </bal-list-item>
                        )
                      })}
                    </bal-list>
                  </div>
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
