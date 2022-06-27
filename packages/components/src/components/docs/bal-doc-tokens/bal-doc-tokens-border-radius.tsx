import { Component, h, ComponentInterface, Host, Element } from '@stencil/core'
import tokens from '@baloise/design-system-next-tokens/dist/tokens.json'

@Component({
  tag: 'bal-doc-tokens-radius',
})
export class DocTokensBorderRadius implements ComponentInterface {
  @Element() el!: HTMLElement

  render() {
    const radius = tokens.radius as any
    const sizes = []
    for (const k in radius) {
      sizes.push({
        name: k,
        value: radius[k],
      })
    }
    console.log(sizes)
    return (
      <Host>
        <bal-doc-app>
          <table class="table tokens" style={{ width: '100%' }}>
            <thead>
              <tr>
                <th style={{ minWidth: '120px' }}>Example</th>
                <th>Description</th>
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
                      class={`has-radius${c.name === 'normal' ? '' : `-${c.name}`} mt-x-small has-background-purple`}
                    ></div>
                  </td>
                  <td style={{ verticalAlign: 'top' }}>
                    <p class="is-bold is-size-large mt-0 mb-2">{c.name}</p>
                    <p class="m-0 is-size-small">{c.value.description}</p>
                  </td>
                  <td style={{ verticalAlign: 'top' }}>
                    <p class="mt-0 mb-2 is-size-small py-1 px-2 has-background-grey-2 has-radius is-bold">
                      var(--bal-radius{c.name === 'normal' ? '' : `-${c.name}`})
                    </p>
                  </td>
                  <td style={{ verticalAlign: 'top' }}>
                    <p class="mt-0 mb-2 is-size-small is-bold py-1">{c.value.value}</p>
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
