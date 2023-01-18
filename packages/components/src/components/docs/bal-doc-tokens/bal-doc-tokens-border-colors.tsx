import { Component, h, ComponentInterface, Host, Element } from '@stencil/core'
import tokens from '@baloise/design-system-tokens/dist/tokens.docs.json'

@Component({
  tag: 'bal-doc-tokens-border-colors',
})
export class DocTokensBorderColors implements ComponentInterface {
  @Element() el!: HTMLElement

  render() {
    const border = tokens.border
    const colors = Object.keys(border.colors)
    const values = Object.values(border.colors)

    return (
      <Host>
        <bal-doc-app>
          <table class="table tokens" style={{ width: '100%' }}>
            <thead>
              <tr>
                <th style={{ minWidth: '130px' }}>Example</th>
                <th>Name</th>
                <th style={{ minWidth: '200px' }}>Token</th>
                <th style={{ minWidth: '100px' }}>value</th>
              </tr>
            </thead>
            <tbody>
              {colors.map((c, i) => (
                <tr>
                  <td style={{ verticalAlign: 'top' }}>
                    <div class={`has-border-${c}`} style={{ width: '24px', height: '24px' }}></div>
                  </td>
                  <td style={{ verticalAlign: 'top' }}>
                    <p class="is-bold is-size-large m-none">{c}</p>
                  </td>
                  <td style={{ verticalAlign: 'top' }}>
                    <p class="mt-none mb-x-small is-size-small py-xx-small px-x-small has-background-grey-2 has-radius-normal is-bold">
                      var(--bal-color-border-{c})
                    </p>
                  </td>
                  <td style={{ verticalAlign: 'top' }}>
                    <p class={`mt-none mb-x-small is-size-small is-bold py-xx-small`}>{values[i]}</p>
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
