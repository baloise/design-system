import { Component, h, ComponentInterface, Host, Element } from '@stencil/core'
import tokens from '@baloise/design-system-next-tokens/dist/tokens.json'

@Component({
  tag: 'bal-doc-tokens-breakpoints',
})
export class DocTokensBreakpoints implements ComponentInterface {
  @Element() el!: HTMLElement

  render() {
    const breakpoint = tokens.breakpoint as any
    const sizes = []
    for (const k in breakpoint) {
      sizes.push({
        name: k,
        value: breakpoint[k],
      })
    }
    return (
      <Host>
        <bal-doc-app>
          <table class="table tokens" style={{ width: '100%' }}>
            <thead>
              <tr>
                <th>Description</th>
                <th style={{ minWidth: '200px' }}>Token</th>
                <th style={{ minWidth: '100px' }}>Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ verticalAlign: 'top' }}>
                  <p class="is-bold is-size-large mt-0 mb-2">mobile</p>
                </td>
                <td style={{ verticalAlign: 'top' }}></td>
                <td style={{ verticalAlign: 'top' }}>
                  <span class={`is-bold is-size-small`}>0px</span>
                </td>
              </tr>
              {sizes.map(c => (
                <tr>
                  <td style={{ verticalAlign: 'top' }}>
                    <p class="is-bold is-size-large mt-0 mb-2">{c.name}</p>
                  </td>
                  <td style={{ verticalAlign: 'top' }}>
                    <p class="mt-0 mb-2 is-size-small py-1 px-2 has-background-grey-2 has-radius is-bold">
                      var(--bal-{c.name})
                    </p>
                  </td>
                  <td style={{ verticalAlign: 'top' }}>
                    <p class={`is-bold is-size-small py-1`}>{c.value}</p>
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
