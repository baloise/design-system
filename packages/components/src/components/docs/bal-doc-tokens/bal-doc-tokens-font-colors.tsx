import { Component, h, ComponentInterface, Host, Element } from '@stencil/core'
import tokens from '@baloise/design-system-tokens/dist/tokens.docs.json'

@Component({
  tag: 'bal-doc-tokens-font-colors',
})
export class DocTokensFontColors implements ComponentInterface {
  @Element() el!: HTMLElement

  /**
   *
   * @returns
   * 'white': 'white',
      'black': 'black',
      'grey': 'grey-5',
      'primary-light': 'primary-3',
      'primary': 'primary-5',
      'primary-dark': 'primary-6', // active color
      'light-blue': 'light-blue-5', // hover color
      'success': 'success-4',
      'info': 'info-4',
      'warning': 'warning-5',
      'danger': 'danger-4',
   */

  render() {
    const typography = tokens.typography as any
    const colorMap = typography.colors as any
    const colors = Object.keys(colorMap) as any
    const values = Object.values(colorMap) as any

    const colorTokens = tokens.color as any

    return (
      <Host>
        <bal-doc-app>
          <table class="table tokens" style={{ width: '100%' }}>
            <thead>
              <tr>
                <th style={{ minWidth: '130px' }}>Example</th>
                <th>Description</th>
                <th style={{ minWidth: '200px' }}>Token</th>
              </tr>
            </thead>
            <tbody>
              {colors.map((c: string, i: number) => (
                <tr>
                  <td
                    style={{
                      verticalAlign: 'top',
                      background: c === 'white' ? 'var(--bal-color-primary)' : 'transparent',
                    }}
                  >
                    <span class={`title is-size-xxx-large has-text-${c}`}>Aa</span>
                  </td>
                  <td style={{ verticalAlign: 'top' }}>
                    <p class="is-bold is-size-large mt-none mb-x-small">
                      {c} <span class="is-size-medium">({values[i]})</span>
                    </p>
                    <p class="m-none is-size-small">{colorTokens[values[i]].description}</p>
                  </td>
                  <td style={{ verticalAlign: 'top' }}>
                    <p class="mt-none mb-x-small is-size-small py-xx-small px-x-small has-background-grey-2 has-radius-normal is-bold">
                      var(--bal-text-color-{c})
                    </p>
                    <p class="mt-none mb-x-small is-size-small py-xx-small px-x-small has-background-grey-2 has-radius-normal is-bold">
                      var(--bal-color-{values[i]})
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
