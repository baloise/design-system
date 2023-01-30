import { Component, h, ComponentInterface, Host, Element } from '@stencil/core'
import tokens from '@baloise/design-system-tokens/dist/tokens.docs.json'

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
                    <p class="has-text-weight-bold is-size-large mt-none mb-x-small">
                      {c.name} <span class="is-size-medium">({c.value.legacy})</span>
                    </p>
                    <p class="m-none is-size-small">{c.value.description}</p>
                  </td>
                  <td style={{ verticalAlign: 'top' }}>
                    <p class="mt-none mb-x-small is-size-small py-xx-small px-x-small has-background-grey-2 has-radius-normal has-text-weight-bold">
                      var(--bal-space-{c.name})
                    </p>
                  </td>
                  <td style={{ verticalAlign: 'top' }}>
                    <span class={`has-text-weight-bold is-size-small`}>{c.value.mobile}</span>
                  </td>
                  <td style={{ verticalAlign: 'top' }}>
                    <span class={`has-text-weight-bold is-size-small`}>{c.value.tablet}</span>
                  </td>
                  <td style={{ verticalAlign: 'top' }}>
                    <span class={`has-text-weight-bold is-size-small`}>{c.value.desktop}</span>
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
