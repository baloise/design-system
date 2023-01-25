import { Component, h, ComponentInterface, Host, Element } from '@stencil/core'
import tokens from '@baloise/design-system-tokens/dist/tokens.docs.json'

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
                    <span class={`is-${c.name} has-font-title has-text-primary`}>Headline</span>
                    <br />
                    <span class={`is-${c.name} is-family-text has-text-primary`}>Text</span>
                  </td>
                  <td style={{ verticalAlign: 'top' }}>
                    <p class="has-text-weight-bold is-size-large mt-none mb-x-small">
                      {c.name} <span class="is-size-medium">({c.value})</span>
                    </p>
                    <p class="m-none is-size-small">{c.value.description}</p>
                  </td>
                  <td style={{ verticalAlign: 'top' }}>
                    <p class="mt-none mb-x-small is-size-small py-xx-small px-x-small has-background-grey-2 has-radius-normal has-text-weight-bold">
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
