import { Component, h, ComponentInterface, Host, Element, State, Prop, Listen } from '@stencil/core'
import { LevelInfo, observeLevels } from './utils/level.utils'
import { BEM } from '../../utils/bem'

@Component({
  tag: 'bal-navigation',
})
export class Navigation implements ComponentInterface {
  @Element() el!: HTMLElement
  private mutationO?: MutationObserver
  private mainNavElement?: HTMLBalNavigationMainElement
  private previousY = 0
  @State() isTransformed = false
  @State() levels: LevelInfo[] = []
  @State() selectedMetaIndex = 0
  @State() selectedMainIndex = 0
  @State() isMainBodyOpen = false
  @State() selectedMetaValue? = ''
  @State() selectedMainValue? = ''
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
  clickOnOutside(event: UIEvent) {
    if (!this.mainNavElement?.contains(event.target as Node) && this.isMainBodyOpen) {
      this.isMainBodyOpen = false
      this.selectedMainValue = ''
    }
  }

  @Listen('resize', { target: 'window' })
  async resizeHandler() {
    this.isTransformed = false
  }

  @Listen('scroll', { target: 'window', passive: true })
  handleScroll() {
    this.isTransformed = window.scrollY > this.previousY
    this.previousY = window.scrollY
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
  }

  componentDidLoad() {
    this.previousY = window.scrollY
  }

  componentDidUpdate() {
    this.updateIndexes()
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
          'bal-nav--transformed': this.isTransformed,
        }}
      >
        <bal-navigation-meta class="is-hidden-touch" aria-label-meta={this.ariaLabelMeta}>
          <bal-navigation-meta-start>
            {hasLevels && (
              <bal-tabs interface="meta" inverted={true} value={this.selectedMetaValue}>
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
          class={{ 'is-hidden-touch': true, 'is-expanded': this.isMainBodyOpen }}
          ref={el => {
            this.mainNavElement = el
          }}
          aria-label-main={this.ariaLabelMain}
        >
          <bal-navigation-main-head
            slot="main-head"
            class={{
              'is-hidden-mobile': true,
              'is-active': this.isMainBodyOpen,
            }}
          >
            <div>
              <a href={this.logoPath} class="bal-nav__main-head-logo">
                <bal-logo color="blue"></bal-logo>
              </a>
              <bal-tabs interface="navigation" value={this.selectedMainValue}>
                {hasLevels &&
                  this.levels[this.selectedMetaIndex].subLevels?.map((main, index) => {
                    return main.isTabLink ? (
                      <bal-tab-item label={main.label} value={main.value} href={main.link} />
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
                      <bal-navigation-menu link-href={main.link} link-name={main.linkLabel} target={main.target}>
                        <div slot="left" class={{ ...navigationEl.element('menu').element('white-list').class() }}>
                          {main.subLevels
                            ?.filter(subLevel => subLevel.color !== 'grey')
                            .map(block => {
                              return (
                                block && (
                                  <bal-navigation-menu-list
                                    headline={block.label}
                                    href={block.link}
                                    target={block.target}
                                  >
                                    <div slot="links">
                                      {block.subLevels?.map(item => (
                                        <bal-navigation-menu-list-item href={item.link} target={item.target}>
                                          {item.label}
                                        </bal-navigation-menu-list-item>
                                      ))}
                                    </div>
                                  </bal-navigation-menu-list>
                                )
                              )
                            })}
                        </div>
                        <div slot="right" class={{ ...navigationEl.element('menu').element('grey-list').class() }}>
                          {main.subLevels
                            ?.filter(subLevel => subLevel.color === 'grey')
                            .map(block => (
                              <bal-navigation-menu-list headline={block.label} href={block.link} color={block.color}>
                                <div slot="links">
                                  {block.subLevels?.map(item => (
                                    <bal-navigation-menu-list-item href={item.link}>
                                      {item.label}
                                    </bal-navigation-menu-list-item>
                                  ))}
                                </div>
                              </bal-navigation-menu-list>
                            ))}
                        </div>
                      </bal-navigation-menu>
                    )),
                )}
            </bal-navigation-main-body>
          )}
        </bal-navigation-main>
        <slot></slot>
      </Host>
    )
  }
}
