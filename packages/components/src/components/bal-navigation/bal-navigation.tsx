import { Component, h, ComponentInterface, Host, Element, State, Prop, Listen } from '@stencil/core'
import { LevelInfo, observeLevels } from './utils/level.utils'
import { BEM } from '../../utils/bem'
import { isPlatform } from '../../utils/platform'

@Component({
  tag: 'bal-navigation',
})
export class Navigation implements ComponentInterface {
  @Element() el!: HTMLElement
  private mutationO?: MutationObserver
  private mainNavElement?: HTMLBalNavigationMainElement
  private metaNavMobileElement!: HTMLBalMetaMobileHeadElement
  private previousY = 0
  private scrolling = false
  @State() isTranslated = false
  @State() levels: LevelInfo[] = []
  @State() selectedMetaIndex = 0
  @State() selectedMainIndex = 0
  @State() isMainBodyOpen = false
  @State() isWideOrFullHd = false
  @State() selectedMetaValue?: string = ''
  @State() selectedMainValue?: string = ''
  @Prop() logoPath?: string = '/'
  @Prop() ariaLabelMeta?: string = ''
  @Prop() ariaLabelMain?: string = ''
  @Prop() metaValue?: string

  @Listen('click', { target: 'document' })
  clickOnOutside(event: UIEvent) {
    if (isPlatform('desktop')) {
      if (!this.mainNavElement?.contains(event.target as Node) && this.isMainBodyOpen) {
        this.isMainBodyOpen = false
        this.selectedMainValue = ''
      }
    }
  }

  @Listen('resize', { target: 'window' })
  async resizeHandler() {
    this.isTranslated = false
    this.isWideOrFullHd = isPlatform('widescreen') || isPlatform('fullhd')
  }

  @Listen('scroll', { target: 'window', passive: true })
  handleScroll() {
    this.scrolling = true
  }

  translateMainNav() {
    this.isTranslated = window.scrollY > this.previousY
    this.previousY = window.scrollY
  }

  async connectedCallback() {
    this.selectedMetaValue = this.metaValue
    this.isWideOrFullHd = isPlatform('widescreen') || isPlatform('fullhd')
    await this.readSubLevels()
    this.updateIndexes()
    this.mutationO = observeLevels(this.el, 'bal-navigation-levels', () => this.readSubLevels())
    if (this.isWideOrFullHd) {
      setInterval(() => {
        if (this.scrolling) {
          this.scrolling = false
          this.translateMainNav()
        }
      }, 300)
    }
  }

  disconnectedCallback() {
    if (this.mutationO) {
      this.mutationO.disconnect()
      this.mutationO = undefined
    }
  }

  componentDidUpdate() {
    this.updateIndexes()
  }

  componentDidRender() {
    this.metaNavMobileElement = this.el.querySelector('bal-meta-mobile-head') as HTMLBalMetaMobileHeadElement
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

  render() {
    const navigationEl = BEM.block('nav')
    const hasLevels = this.levels?.length > 0

    return (
      <Host
        class={{
          ...navigationEl.class(),
          'bal-nav--translated': this.isTranslated,
        }}
      >
        <bal-navigation-meta class="is-hidden-touch" aria-label-meta={this.ariaLabelMeta}>
          <bal-navigation-meta-start>
            {hasLevels && (
              <bal-tabs interface="meta" inverted={true} value={this.selectedMetaValue}>
                {this.levels.map((meta, index) => {
                  return meta.tabLink ? (
                    <bal-tab-item label={meta.label} value={meta.value} href={meta.tabLink} />
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
          class={{ 'is-hidden-touch': true, 'is-expanded': this.isMainBodyOpen }}
          ref={el => {
            this.mainNavElement = el
          }}
          aria-label-main={this.ariaLabelMain}
        >
          <bal-navigation-main-head
            slot="main-head"
            class={{
              'has-radius-large': this.isWideOrFullHd,
              'is-hidden-mobile has-background-white is-block': true,
              'is-active': this.isMainBodyOpen,
            }}
          >
            <div class="is-flex is-align-items-start is-flex-wrap-wrap is-justify-content-space-between">
              <div class="is-flex">
                <a href={this.logoPath} class="bal-nav__main-head-logo">
                  <bal-logo color="blue"></bal-logo>
                </a>
              </div>
              <div class="is-flex">
                <bal-tabs interface="header" value={this.selectedMainValue}>
                  {hasLevels &&
                    this.levels[this.selectedMetaIndex].subLevels?.map((main, index) => {
                      return main.tabLink ? (
                        <bal-tab-item label={main.label} value={main.value} href={main.tabLink} />
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
            </div>
          </bal-navigation-main-head>
          <bal-navigation-main-body
            slot="main-body"
            class={{
              'is-active': this.isMainBodyOpen,
            }}
            aria-hidden={!this.isMainBodyOpen}
          >
            {this.levels
              .filter((_, index) => index === this.selectedMetaIndex)
              .map(meta =>
                meta.subLevels
                  ?.filter((_, mainIndex) => this.selectedMainIndex === mainIndex)
                  .map(main => (
                    <bal-navigation-menu-panel link-href={main.link} link-name={main.linkLabel}>
                      <div slot="left">
                        {main.subLevels
                          ?.filter(subLevel => subLevel.color !== 'grey')
                          .map(block => {
                            return (
                              block && (
                                <bal-navigation-menu-panel-list headline={block.label} href={block.link}>
                                  <div slot="links">
                                    {block.subLevels?.map(item => (
                                      <bal-navigation-menu-panel-list-item href={item.link}>
                                        {item.label}
                                      </bal-navigation-menu-panel-list-item>
                                    ))}
                                  </div>
                                </bal-navigation-menu-panel-list>
                              )
                            )
                          })}
                      </div>
                      <div slot="right">
                        {main.subLevels
                          ?.filter(subLevel => subLevel.color === 'grey')
                          .map(block => (
                            <bal-navigation-menu-panel-list
                              headline={block.label}
                              href={block.link}
                              color={block.color}
                            >
                              <div slot="links">
                                {block.subLevels?.map(item => (
                                  <bal-navigation-menu-panel-list-item href={item.link}>
                                    {item.label}
                                  </bal-navigation-menu-panel-list-item>
                                ))}
                              </div>
                            </bal-navigation-menu-panel-list>
                          ))}
                      </div>
                    </bal-navigation-menu-panel>
                  )),
              )}
          </bal-navigation-main-body>
        </bal-navigation-main>

        <bal-meta-mobile-head>
          <a slot="logo" href={this.logoPath} class="bal-nav__main-head-logo py-4">
            <bal-logo color="blue" size="small"></bal-logo>
          </a>
          <slot name="meta-actions-mobile" />
          <bal-button
            slot="burger"
            color="light"
            square
            icon={this.isMainBodyOpen ? 'close' : 'menu-bars'}
            onClick={() => (this.isMainBodyOpen = !this.isMainBodyOpen)}
          />
        </bal-meta-mobile-head>
        <bal-main-mobile
          class={{ 'is-hidden': !this.isMainBodyOpen, 'is-active': this.isMainBodyOpen }}
          aria-hidden={!this.isMainBodyOpen}
        >
          <bal-list border main-nav-accordion size="large">
            {this.levels.map(meta => (
              <bal-list-item accordion>
                <bal-list-item-accordion-head>
                  <bal-list-item-content>
                    <bal-list-item-title>{meta.label}</bal-list-item-title>
                  </bal-list-item-content>
                </bal-list-item-accordion-head>
                <bal-list-item-accordion-body>
                  <div>
                    {meta.link && (
                      <div class="panel-link-wrapper is-block">
                        <a class="is-size-x-small panel-link is-bold" href={meta.link}>
                          {meta.linkLabel}
                        </a>
                      </div>
                    )}
                    {meta.subLevels?.map(main => (
                      <bal-list-item accordion sub-accordion-item>
                        <bal-list-item-accordion-head>
                          <bal-list-item-content>
                            <bal-list-item-title>{main.label}</bal-list-item-title>
                          </bal-list-item-content>
                        </bal-list-item-accordion-head>
                        <bal-list-item-accordion-body>
                          <bal-navigation-menu-panel link-href={main.link} link-name={main.linkLabel}>
                            <div slot="left">
                              {main.subLevels
                                ?.filter(subLevel => subLevel.color !== 'grey')
                                .map(block => (
                                  <bal-navigation-menu-panel-list headline={block.label} href={block.link}>
                                    <div slot="links">
                                      {block.subLevels?.map(item => (
                                        <bal-navigation-menu-panel-list-item href={item.link}>
                                          {item.label}
                                        </bal-navigation-menu-panel-list-item>
                                      ))}
                                    </div>
                                  </bal-navigation-menu-panel-list>
                                ))}
                            </div>
                            <div slot="right">
                              {main.subLevels
                                ?.filter(subLevel => subLevel.color === 'grey')
                                .map(block => (
                                  <bal-navigation-menu-panel-list
                                    headline={block.label}
                                    href={block.link}
                                    color={block.color}
                                  >
                                    <div slot="links">
                                      {block.subLevels?.map(item => (
                                        <bal-navigation-menu-panel-list-item href={item.link}>
                                          {item.label}
                                        </bal-navigation-menu-panel-list-item>
                                      ))}
                                    </div>
                                  </bal-navigation-menu-panel-list>
                                ))}
                            </div>
                          </bal-navigation-menu-panel>
                        </bal-list-item-accordion-body>
                      </bal-list-item>
                    ))}
                  </div>
                </bal-list-item-accordion-body>
              </bal-list-item>
            ))}
          </bal-list>
        </bal-main-mobile>
        <bal-meta-mobile-foot class={{ 'is-hidden': !this.isMainBodyOpen }}>
          <slot name="meta-mobile-foot" />
        </bal-meta-mobile-foot>
        <slot></slot>
      </Host>
    )
  }
}
