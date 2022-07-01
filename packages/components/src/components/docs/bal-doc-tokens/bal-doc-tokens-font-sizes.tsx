import { Component, h, ComponentInterface, Host, Element } from '@stencil/core'
import tokens from '@baloise/design-system-next-tokens/dist/tokens.json'

@Component({
  tag: 'bal-doc-tokens-font-sizes',
})
export class DocTokensFontSizes implements ComponentInterface {
  @Element() el!: HTMLElement

  render() {
    const typography = tokens.typography as any
    const sizes = []
    const validSizes = [
      'xxxxx-large',
      'xxxx-large',
      'xxx-large',
      'xx-large',
      'x-large',
      'large',
      'medium',
      'normal',
      'small',
      'x-small',
    ]
    for (const k in typography.sizes) {
      if (validSizes.includes(k)) {
        sizes.push({
          name: k,
          value: typography.sizes[k],
        })
      }
    }
    return (
      <Host>
        <bal-doc-app>
          <table class="table tokens" style={{ width: '100%' }}>
            <thead>
              <tr>
                <th style={{ minWidth: '130px' }}>Example</th>
                <th>Description</th>
                <th style={{ minWidth: '200px' }}>Token</th>
                <th style={{ minWidth: '100px' }}>Mobile</th>
                <th style={{ minWidth: '100px' }}>Tablet</th>
                <th style={{ minWidth: '100px' }}>Desktop</th>
              </tr>
            </thead>
            <tbody>
              {sizes.map(c => (
                <tr>
                  <td style={{ verticalAlign: 'top' }}>
                    <span class={`title is-size-${c.name}`}>Aa</span>
                  </td>
                  <td style={{ verticalAlign: 'top' }}>
                    <p class="is-bold is-size-large mt-0 mb-2">
                      {c.name} <span class="is-size-medium">({c.value.figmaName})</span>
                    </p>
                    <p class="m-0 is-size-small">{c.value.description}</p>
                  </td>
                  <td style={{ verticalAlign: 'top' }}>
                    <p class="mt-0 mb-2 is-size-small py-1 px-2 has-background-grey-2 has-radius is-bold">
                      var(--bal-size-{c.name})
                    </p>
                    <p class="mt-0 mb-2 is-size-small py-1 px-2 has-background-grey-2 has-radius is-bold">
                      var(--bal-line-height-{c.name})
                    </p>
                  </td>
                  <td style={{ verticalAlign: 'top' }}>
                    <span class={`is-bold is-size-small`}>{c.value.mobile.fontSize}</span>
                    <br />
                    <span class={`is-size-small`}>{c.value.mobile.lineHeight}</span>
                  </td>
                  <td style={{ verticalAlign: 'top' }}>
                    <span class={`is-bold is-size-small`}>{c.value.tablet.fontSize}</span>
                    <br />
                    <span class={`is-size-small`}>{c.value.tablet.lineHeight}</span>
                  </td>
                  <td style={{ verticalAlign: 'top' }}>
                    <span class={`is-bold is-size-small`}>{c.value.desktop.fontSize}</span>
                    <br />
                    <span class={`is-size-small`}>{c.value.desktop.lineHeight}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </bal-doc-app>
      </Host>
    )
  }
}
