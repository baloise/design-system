import { Component, h, ComponentInterface, Host, Element } from '@stencil/core'
import tokens from '@baloise/design-system-tokens/dist/tokens.docs.json'

@Component({
  tag: 'bal-doc-tokens-radius',
})
export class DocTokensBorderRadius implements ComponentInterface {
  @Element() el!: HTMLElement

  render() {
    const radius = tokens.radius as any
    const sizes = []
    for (const k in radius) {
      if (radius[k].deprecated !== true) {
        sizes.push({
          name: k,
          value: radius[k],
        })
      }
    }
    return (
      <Host>
        <bal-doc-app>
          <table class="table tokens" style={{ width: '100%' }}>
            <thead>
              <tr>
                <th style={{ minWidth: '120px' }}>Example</th>
                <th>Name</th>
                <th style={{ minWidth: '230px' }}>Token</th>
                <th style={{ minWidth: '80px' }}>Value</th>
              </tr>
            </thead>
            <tbody>
              {sizes.map(c => (
                <tr>
                  <td style={{ verticalAlign: 'top' }}>
                    <div
                      style={{ height: '48px', width: '80px' }}
                      class={`has-radius${`-${c.name}`} mt-x-small has-background-purple`}
                    ></div>
                  </td>
                  <td style={{ verticalAlign: 'top' }}>
                    <p class="has-text-weight-bold is-size-large mt-none mb-x-small">{c.name}</p>
                    <p class="m-none is-size-small">{c.value.description}</p>
                  </td>
                  <td style={{ verticalAlign: 'top' }}>
                    <p class="mt-none mb-x-small is-size-small py-xx-small px-x-small has-background-grey-2 has-radius-normal has-text-weight-bold has-no-wrap">
                      var(--bal-radius{`-${c.name}`})
                    </p>
                  </td>
                  <td style={{ verticalAlign: 'top' }}>
                    <p class="mt-none mb-x-small is-size-small has-text-weight-bold py-xx-small">{c.value.value}</p>
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
