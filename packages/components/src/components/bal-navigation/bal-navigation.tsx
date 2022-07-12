import { Component, h, ComponentInterface, Host, Element, State, Prop, Watch, Listen } from '@stencil/core'
import { LevelInfo, observeLevels } from './utils/level.utils'
import { BEM } from '../../utils/bem'

@Component({
  tag: 'bal-navigation',
})
export class Navigation implements ComponentInterface {
  @Element() el!: HTMLElement
  private mutationO?: MutationObserver
  private mainNavElement!: HTMLDivElement

  @State() levels: LevelInfo[] = []
  @State() selectedMetaIndex = 0
  @State() selectedMainIndex = 0
  @State() isMainBodyOpen = false

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
    }
  }

  async connectedCallback() {
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
      this.levels = levels
    }
  }

  render() {
    const navigationEl = BEM.block('nav')
    const selectedMetaLevel = this.levels[this.selectedMetaIndex]
    const selectedMetaValue = selectedMetaLevel.value
    const selectedMainValue = selectedMetaLevel.subLevels
      ? selectedMetaLevel.subLevels[this.selectedMainIndex].value
      : ''

    return (
      <Host
        class={{
          ...navigationEl.class(),
        }}
      >
        <bal-navigation-meta class="is-hidden-touch">
          <bal-navigation-meta-start>
            <bal-tabs interface="meta" inverted value={selectedMetaValue}>
              {this.levels.map(meta => (
                // TODO: decide if we need to add the href prop: href={meta.link}
                <bal-tab-item
                  label={meta.label}
                  value={meta.value}
                  onBalNavigate={ev => {
                    meta.onClick(ev.detail)
                    this.metaValue = meta.value
                    this.isMainBodyOpen = false
                  }}
                />
              ))}
            </bal-tabs>
          </bal-navigation-meta-start>
          <bal-navigation-meta-end>
            <slot name="meta-actions" />
          </bal-navigation-meta-end>
        </bal-navigation-meta>

        {/* TODO: Create custom component for main navigation desktop */}
        <div ref={el => (this.mainNavElement = el as HTMLDivElement)}>
          <div class="is-hidden-mobile container has-background-white has-radius has-shadow">
            <div class="is-flex is-align-items-center" style={{ height: '80px' }}>
              <div class="is-flex">
                <bal-logo></bal-logo>
              </div>
              <div class="is-flex-grow-1 is-flex is-justify-content-end">
                <bal-tabs interface="navbar" value={selectedMainValue}>
                  {this.levels[this.selectedMetaIndex].subLevels?.map((main, index) => (
                    <bal-tab-item
                      label={main.label}
                      value={main.value}
                      onBalNavigate={ev => {
                        main.onClick(ev.detail)
                        this.selectedMainIndex = index
                        this.isMainBodyOpen = true
                      }}
                    ></bal-tab-item>
                  ))}
                </bal-tabs>
              </div>
            </div>
          </div>
          <div
            class={{
              'has-background-white has-shadow has-radius container py-4': true,
              'is-hidden': !this.isMainBodyOpen,
            }}
          >
            {this.levels
              .filter((_, index) => index === this.selectedMetaIndex)
              .map(meta => (
                <div class="py-4">
                  {meta.subLevels
                    ?.filter((_, mainIndex) => this.selectedMainIndex === mainIndex)
                    .map(main => (
                      <div>
                        <p>{main.linkLabel}</p>
                        <div class="columns is-multiline">
                          {main.subLevels?.map((block, _, list) => (
                            <bal-card
                              class={`column is-${list.length === 1 ? '12' : list.length === 2 ? '6' : '4'}`}
                              color={block.color || 'white'}
                              flat
                              space="small"
                            >
                              <bal-card-content class={`${block.color === 'grey' ? '' : 'px-0'}`}>
                                <h4 class="title is-size-4">{block.label}</h4>
                                {block.subLevels?.map(item => (
                                  <a
                                    class="is-link is-block py-1"
                                    onClick={ev => {
                                      main.onClick(ev)
                                      this.isMainBodyOpen = false
                                    }}
                                  >
                                    {item.label}
                                  </a>
                                ))}
                              </bal-card-content>
                            </bal-card>
                          ))}
                        </div>
                      </div>
                    ))}
                </div>
              ))}
          </div>
        </div>

        {/* <hr class="my-8" /> */}

        {/* {this.levels.map(meta => (
          <p>
            {meta.label}
            {meta.subLevels?.map(main => (
              <p class="ml-2">
                {main.label}
                {main.subLevels?.map(block => (
                  <p class="ml-2">
                    {block.label}
                    {block.subLevels?.map(item => (
                      <p class="ml-2">{item.label}</p>
                    ))}
                  </p>
                ))}
              </p>
            ))}
          </p>
        ))} */}
        <slot></slot>
      </Host>
    )
  }
}
