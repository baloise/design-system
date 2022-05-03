import { Component, h, ComponentInterface, Host, Element, Prop } from '@stencil/core'

export type BannerStatusContext = 'rebranded' | 'css' | 'a11y' | 'visual' | 'usage' | 'shadow'

@Component({
  tag: 'bal-doc-banner-status',
})
export class DocBannerStatus implements ComponentInterface {
  @Element() el!: HTMLElement

  myContexts: Map<BannerStatusContext, { label: string; tooltip: string }> = new Map([
    [
      'rebranded',
      {
        label: 'Rebranded',
        tooltip: 'The component has adopt the new styles successfully',
      },
    ],
    [
      'css',
      {
        label: 'CSS Variables + BEM',
        tooltip: 'The component supports CSS variables and styles are structure with BEM',
      },
    ],
    [
      'a11y',
      {
        label: 'a11y',
        tooltip: 'The component fulfills the AA accessibility standard',
      },
    ],
    [
      'visual',
      {
        label: 'Visual Test',
        tooltip: 'The component has a running visual test',
      },
    ],
    [
      'usage',
      {
        label: 'Usage Doc',
        tooltip: 'The component has a usage documentation',
      },
    ],
    [
      'shadow',
      {
        label: 'Shadow DOM',
        tooltip: 'The component uses shadow DOM',
      },
    ],
  ])

  @Prop() context: BannerStatusContext[] = []

  render() {
    const tags: { label: string; tooltip: string; color: 'success' | 'grey' }[] = []
    this.myContexts.forEach((value, key) => {
      tags.push({
        label: value.label,
        tooltip: value.tooltip,
        color: this.context.includes(key) ? 'success' : 'grey',
      })
    })

    return (
      <Host>
        <bal-tag-group>
          {tags.map(t => (
            <bal-tag size="small" color={t.color} title={t.tooltip}>
              {t.color === 'success' ? <bal-icon inverted inline size="small" name="check"></bal-icon> : ''}
              {t.label}
            </bal-tag>
          ))}
        </bal-tag-group>
      </Host>
    )
  }
}
