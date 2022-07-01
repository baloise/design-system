import { Component, h, ComponentInterface, Host, Element } from '@stencil/core'
import tokens from '@baloise/design-system-next-tokens/dist/tokens.json'

@Component({
  tag: 'bal-doc-tokens-spacing',
})
export class DocTokensSpacing implements ComponentInterface {
  @Element() el!: HTMLElement

  render() {
    const spacing = tokens.spacing as any
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
      'xx-small',
      'none',
      'auto',
    ].reverse()
    for (const k in spacing) {
      if (validSizes.includes(k)) {
        sizes.push({
          name: k,
          value: spacing[k],
        })
      }
    }
    return (
      <Host>
        <bal-doc-app>
          <table class="table tokens" style={{ width: '100%' }}>
            <thead>
              <tr>
                <th style={{ minWidth: '100px' }}>Example</th>
                <th>Description</th>
                <th style={{ minWidth: '240px' }}>Token</th>
                <th style={{ minWidth: '90px' }}>Mobile</th>
                <th style={{ minWidth: '90px' }}>Tablet</th>
                <th style={{ minWidth: '90px' }}>Desktop</th>
              </tr>
            </thead>
            <tbody>
              {sizes.map(c => (
                <tr>
                  <td style={{ verticalAlign: 'top' }}>
                    <div class={`pt-${c.name} mt-x-small has-background-green`}></div>
                  </td>
                  <td style={{ verticalAlign: 'top' }}>
                    <p class="is-bold is-size-large mt-0 mb-2">
                      {c.name} <span class="is-size-medium">({c.value.legacy})</span>
                    </p>
                    <p class="m-0 is-size-small">{c.value.description}</p>
                  </td>
                  <td style={{ verticalAlign: 'top' }}>
                    <p class="mt-0 mb-2 is-size-small py-1 px-2 has-background-grey-2 has-radius is-bold">
                      var(--bal-space-{c.name})
                    </p>
                  </td>
                  <td style={{ verticalAlign: 'top' }}>
                    <span class={`is-bold is-size-small`}>{c.value.mobile}</span>
                  </td>
                  <td style={{ verticalAlign: 'top' }}>
                    <span class={`is-bold is-size-small`}>{c.value.tablet}</span>
                  </td>
                  <td style={{ verticalAlign: 'top' }}>
                    <span class={`is-bold is-size-small`}>{c.value.desktop}</span>
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
