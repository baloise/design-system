import { Component, h, ComponentInterface, Host, Element } from '@stencil/core'
import tokens from '@baloise/design-system-tokens/dist/tokens.docs.json'

@Component({
  tag: 'bal-doc-tokens-containers',
})
export class DocTokensContainers implements ComponentInterface {
  @Element() el!: HTMLElement

  render() {
    const container = tokens.container as any
    const sizes = []
    for (const k in container.size) {
      sizes.push({
        name: k,
        value: container.size[k],
      })
    }
    return (
      <Host>
        <bal-doc-app>
          <table class="table tokens" style={{ width: '100%' }}>
            <thead>
              <tr>
                <th>Description</th>
                <th style={{ minWidth: '200px' }}>Token / CSS class</th>
                <th style={{ minWidth: '100px' }}>Value</th>
              </tr>
            </thead>
            <tbody>
              {sizes.map(c => (
                <tr>
                  <td style={{ verticalAlign: 'top' }}>
                    <p class="has-text-weight-bold is-size-large mt-none mb-x-small">{c.name}</p>
                  </td>
                  <td style={{ verticalAlign: 'top' }}>
                    <p class="mt-none mb-x-small is-size-small py-xx-small px-x-small has-background-grey-2 has-radius-normal has-text-weight-bold">
                      var(--bal-container-size-{c.name})
                    </p>
                    <p class="mt-none mb-x-small is-size-small py-xx-small px-x-small has-background-grey-2 has-radius-normal has-text-weight-bold">
                      container{c.name !== 'normal' ? ` is-${c.name}` : ''}
                    </p>
                  </td>
                  <td style={{ verticalAlign: 'top' }}>
                    <p class={`has-text-weight-bold is-size-small py-xx-small`}>{c.value}</p>
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
