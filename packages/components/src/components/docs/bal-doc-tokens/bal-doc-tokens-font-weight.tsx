import { Component, h, ComponentInterface, Host, Element } from '@stencil/core'
import tokens from '@baloise/design-system-next-tokens/dist/tokens.docs.json'

@Component({
  tag: 'bal-doc-tokens-font-weight',
})
export class DocTokensFontWeight implements ComponentInterface {
  @Element() el!: HTMLElement

  render() {
    const typography = tokens.typography as any
    const weights = []

    for (const k in typography.weights) {
      weights.push({
        name: k,
        value: typography.weights[k],
      })
    }
    return (
      <Host>
        <bal-doc-app>
          <table class="table tokens" style={{ width: '100%' }}>
            <thead>
              <tr>
                <th style={{ minWidth: '220px' }}>Example</th>
                <th>Description</th>
                <th style={{ minWidth: '240px' }}>Token</th>
              </tr>
            </thead>
            <tbody>
              {weights.map(c => (
                <tr>
                  <td style={{ verticalAlign: 'top' }}>
                    <span class={`is-${c.name} has-font-title`}>Headline</span>
                    <br />
                    <span class={`is-${c.name} has-font-text`}>Text</span>
                  </td>
                  <td style={{ verticalAlign: 'top' }}>
                    <p class="is-bold is-size-large mt-0 mb-2">
                      {c.name} <span class="is-size-medium">({c.value})</span>
                    </p>
                    <p class="m-0 is-size-small">{c.value.description}</p>
                  </td>
                  <td style={{ verticalAlign: 'top' }}>
                    <p class="mt-0 mb-2 is-size-small py-1 px-2 has-background-grey-2 has-radius is-bold">
                      var(--bal-weight-{c.name})
                    </p>
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
