import { Component, h, ComponentInterface, Host, Element, State, Prop } from '@stencil/core'
import { LevelInfo, observeLevels } from './utils/level.utils'

@Component({
  tag: 'bal-navigation',
})
export class Navigation implements ComponentInterface {
  @Element() el!: HTMLElement
  private mutationO?: MutationObserver

  @Prop() metaValue?: string
  @Prop() mainValue?: string

  @State() levels: LevelInfo[] = []
  @State() selectedMeta = 0
  @State() selectedMain = 0

  connectedCallback() {
    this.readSubLevels()
    this.mutationO = observeLevels(this.el, 'bal-navigation-levels', () => this.readSubLevels())
  }

  disconnectedCallback() {
    if (this.mutationO) {
      this.mutationO.disconnect()
      this.mutationO = undefined
    }
  }

  private async readSubLevels() {
    const levelEl = this.el.querySelector('bal-navigation-levels')
    console.log('levelEl', levelEl)
    const levels = await levelEl?.getLevelInfos()
    if (levels) {
      this.levels = levels
      console.log('levels', levels)
    }
  }

  render() {
    console.log('render navigation')
    return (
      <Host>
        {/* TODO: Create custom component for meta navigation desktop */}
        <div class="has-background-primary is-hidden-mobile" style={{ height: '48px' }}>
          <div class="container is-flex">
            <div class="is-flex-grow-1 has-text-white">
              <bal-tabs interface="meta" inverted value="Private">
                {this.levels.map(meta => (
                  <bal-tab-item
                    label={meta.label}
                    value={meta.label}
                    onBalNavigate={ev => meta.onClick(ev.detail)}
                  ></bal-tab-item>
                ))}
              </bal-tabs>
            </div>
            <div class="is-flex-grow-1 is-flex is-justify-content-end has-text-white py-2">
              <slot name="meta-actions" />
            </div>
          </div>
        </div>

        {/* TODO: Create custom component for main navigation desktop */}
        <div class="is-hidden-mobile container has-background-white has-radius has-shadow mt-6">
          <div class="is-flex is-align-items-center" style={{ height: '80px' }}>
            <div class="is-flex">
              <bal-logo></bal-logo>
            </div>
            <div class="is-flex-grow-1 is-flex is-justify-content-end">
              <bal-tabs interface="navbar" value="Versichern">
                {this.levels[this.selectedMeta].subLevels?.map(main => (
                  <bal-tab-item
                    label={main.label}
                    value={main.label}
                    onBalNavigate={ev => main.onClick(ev.detail)}
                  ></bal-tab-item>
                ))}
              </bal-tabs>
            </div>
          </div>
        </div>
        <div class="has-background-white has-shadow has-radius container py-4">
          {this.levels
            .filter((_, index) => index === this.selectedMeta)
            .map(meta => (
              <div class="py-4">
                {meta.subLevels
                  ?.filter((_, mainIndex) => this.selectedMain === mainIndex)
                  .map(main => (
                    <div>
                      <p>{main.linkLabel}</p>
                      <div class="columns">
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
                                <a class="is-link" onClick={ev => main.onClick(ev)}>
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
