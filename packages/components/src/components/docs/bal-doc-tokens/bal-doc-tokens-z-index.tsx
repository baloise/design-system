import { Component, h, ComponentInterface, Host, Element } from '@stencil/core'
import tokens from '@baloise/design-system-tokens/dist/tokens.docs.json'

@Component({
  tag: 'bal-doc-tokens-z-index',
})
export class DocTokensZIndex implements ComponentInterface {
  @Element() el!: HTMLElement

  render() {
    const zIndex = tokens.zIndex as any
    const zIndexTokens = []
    for (const k in zIndex) {
      zIndexTokens.push({
        name: k,
        description: zIndex[k].description,
        value: zIndex[k].value,
      })
    }
    return (
      <Host>
        <bal-doc-app>
          <table class="table tokens" style={{ width: '100%' }}>
            <thead>
              <tr>
                <th>Description</th>
                <th style={{ minWidth: '220px' }}>Token</th>
                <th style={{ minWidth: '230px' }}>Value</th>
              </tr>
            </thead>
            <tbody>
              {zIndexTokens.map(c => (
                <tr>
                  <td style={{ verticalAlign: 'top' }}>
                    <p class="has-text-weight-bold is-size-large mt-none mb-x-small">{c.name}</p>
                    <p class="m-none is-size-small">{c.description}</p>
                  </td>
                  <td style={{ verticalAlign: 'top' }}>
                    <p class="mt-none mb-x-small is-size-small py-xx-small px-x-small has-background-grey-2 has-radius-normal has-text-weight-bold has-no-wrap">
                      var(--bal-z-index{`-${c.name}`})
                    </p>
                  </td>
                  <td style={{ verticalAlign: 'top' }}>
                    <p class="mt-none mb-x-small is-size-small has-text-weight-bold py-xx-small">{c.value}</p>
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
