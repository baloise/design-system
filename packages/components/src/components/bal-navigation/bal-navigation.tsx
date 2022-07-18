import { Component, h, ComponentInterface, Host, Element, State, Prop, Watch, Listen } from '@stencil/core'
import { LevelInfo, observeLevels } from './utils/level.utils'
import { BEM } from '../../utils/bem'
import { isPlatform } from '../../utils/platform'

@Component({
  tag: 'bal-navigation',
})
export class Navigation implements ComponentInterface {
  @Element() el!: HTMLElement
  private mutationO?: MutationObserver
  private mainNavElement!: HTMLBalNavigationMainElement
  private previousY = 0
  private scrolling = false
  @State() isTranslated = false
  @State() levels: LevelInfo[] = []
  @State() selectedMetaIndex = 0
  @State() selectedMainIndex = 0
  @State() isMainBodyOpen = false
  @State() isWideOrFullHd = false
  @State() selectedMainValue?: string = ''

  @Prop() logoPath?: string = '/'
  @Prop() ariaLabelMeta?: string = ''
  @Prop() ariaLabelMain?: string = ''

  @Prop() metaValue?: string
  @Watch('metaValue')
  metaValueHandler() {
    this.updateIndexes()
  }

  @Prop() mainValue?: string
  @Watch('mainValue')
  mainValueHandler() {
    this.updateIndexes()
  }

  @Listen('click', { target: 'document' })
  clickOnOutside(event: UIEvent) {
    if (!this.mainNavElement.contains(event.target as Node) && this.isMainBodyOpen) {
      this.isMainBodyOpen = false
      this.selectedMainValue = ''
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
    this.isWideOrFullHd = isPlatform('widescreen') || isPlatform('fullhd')
    //await this.readSubLevels()
    await this.readSubLevels().then(() => this.updateIndexes())
    //this.updateIndexes()
    this.mutationO = observeLevels(this.el, 'bal-navigation-levels', async () => await this.readSubLevels())
    setInterval(() => {
      if (this.scrolling) {
        this.scrolling = false
        this.translateMainNav()
      }
    }, 300)
  }

  componentWillLoad() {
    console.log('this.levels WILL LOAD', this.levels)
  }

  disconnectedCallback() {
    if (this.mutationO) {
      this.mutationO.disconnect()
      this.mutationO = undefined
    }
  }

  componentDidRender() {
    this.mainNavElement = this.el.querySelector('bal-navigation-main') as HTMLBalNavigationMainElement
  }

  private updateIndexes() {
    if (this.levels && this.levels.length > 0) {
      const selectedMetaIndex = this.levels.findIndex(meta => meta.value === this.metaValue)
      this.selectedMetaIndex = selectedMetaIndex !== -1 ? selectedMetaIndex : 0

      const selectedMainIndex =
        this.levels[this.selectedMetaIndex].subLevels?.findIndex(main => main.value === this.mainValue) || 0
      this.selectedMainIndex = selectedMainIndex !== -1 ? selectedMainIndex : 0
    }
  }

  private async readSubLevels() {
    const levelEl = this.el.querySelector('bal-navigation-levels')
    const levels = await levelEl?.getLevelInfos()
    if (levels) {
      console.log('LEVELS new', levels)
      this.levels = levels
    }
    console.log('THIS.LEVELS', this.levels)
    console.log('THIS.LEVELS[0]', this.levels[0])
  }

  render() {
    console.log('render this.levels', this.levels)
    console.log('render selectedMetaIndex', this.selectedMetaIndex)
    console.log('render selectedMetaLevel', this.levels[this.selectedMetaIndex])
    const navigationEl = BEM.block('nav')
    const selectedMetaLevel = this.levels[this.selectedMetaIndex]
    const selectedMetaValue = selectedMetaLevel.value

    return (
      <Host
        class={{
          ...navigationEl.class(),
          'bal-nav--translated': this.isTranslated,
        }}
      >
        <bal-navigation-meta class="is-hidden-touch" aria-label-meta={this.ariaLabelMeta}>
          <bal-navigation-meta-start>
            <bal-tabs interface="meta" inverted={true} value={selectedMetaValue}>
              {this.levels.map((meta, index) =>
                meta.tabLink ? (
                  <bal-tab-item label={meta.label} value={meta.value} href={meta.tabLink} />
                ) : (
                  <bal-tab-item
                    label={meta.label}
                    value={meta.value}
                    onBalNavigate={ev => {
                      meta.onClick(ev.detail)
                      this.selectedMetaIndex = index
                      this.metaValue = meta.value
                      this.isMainBodyOpen = false
                      this.selectedMainValue = ''
                    }}
                  />
                ),
              )}
            </bal-tabs>
          </bal-navigation-meta-start>
          <bal-navigation-meta-end>
            <slot name="meta-actions" />
          </bal-navigation-meta-end>
        </bal-navigation-meta>

        <bal-navigation-main
          class={{ 'is-hidden-touch': true, 'is-expanded': this.isMainBodyOpen }}
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
                  {selectedMetaLevel.subLevels?.map((main, index) =>
                    main.tabLink ? (
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
                    ),
                  )}
                </bal-tabs>
              </div>
            </div>
          </bal-navigation-main-head>
          <bal-navigation-main-body
            slot="main-body"
            class={{
              'is-active': this.isMainBodyOpen,
            }}
            aria-hidden={this.isMainBodyOpen ? 'false' : 'true'}
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
                  )),
              )}
          </bal-navigation-main-body>
        </bal-navigation-main>
        <slot></slot>
      </Host>
    )
  }
}
