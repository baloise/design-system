import { Component, h, ComponentInterface, Host, Element, Prop } from '@stencil/core'
import tokens from '@baloise/design-system-tokens/dist/tokens.docs.json'

@Component({
  tag: 'bal-doc-tokens-border-colors',
})
export class DocTokensBorderColors implements ComponentInterface {
  @Element() el!: HTMLElement
  @Prop() overview = false

  render() {
    const border = tokens.border
    const colors = Object.keys(border.colors)
    const values = Object.values(border.colors)

    const descriptions: any = {
      'primary': 'Use for focused or selected state.',
      'grey': 'Default border color for inactive state.',
      'grey-dark': 'Use for disabled state.',
      'warning': 'Use for warning/hint state.',
      'success': 'Use for valid state.',
      'danger': 'Use for invalid state.',
      'white': 'Default color on dark backgrounds.',
      'primary-light': 'Disabled or secondary color on dark backgrounds.',
    }

    const isInverted = (v: string) => (['white', 'primary-light'].includes(v) ? 'primary' : '')

    return (
      <Host>
        <bal-doc-app>
          <table class="table tokens" style={{ width: '100%' }}>
            <thead>
              <tr>
                <th style={{ width: '120px' }}>Example</th>
                <th>Name</th>
                <th>Description</th>
                {this.overview ? '' : <th style={{ minWidth: '200px' }}>Token</th>}
                {this.overview ? '' : <th style={{ minWidth: '100px' }}>value</th>}
              </tr>
            </thead>
            <tbody>
              {colors.map((c, i) => (
                <tr>
                  <td style={{ verticalAlign: 'middle' }} class={`has-background-${isInverted(c)}`}>
                    <div class={`has-border-${c} has-radius-normal`} style={{ width: '24px', height: '24px' }}></div>
                  </td>
                  <td style={{ verticalAlign: 'middle' }}>
                    <p class="has-text-weight-bold is-size-large m-none">{c}</p>
                  </td>
                  <td style={{ verticalAlign: 'middle' }}>
                    <p class="m-none is-size-small">{descriptions[c]}</p>
                  </td>
                  {this.overview ? (
                    ''
                  ) : (
                    <td style={{ verticalAlign: 'middle' }}>
                      <p class="mt-none mb-x-small is-size-small py-xx-small px-x-small has-background-grey-2 has-radius-normal has-text-weight-bold has-no-wrap">
                        var(--bal-color-border-{c})
                      </p>
                    </td>
                  )}
                  {this.overview ? (
                    ''
                  ) : (
                    <td style={{ verticalAlign: 'middle' }}>
                      <p class={`mt-none mb-x-small is-size-small has-text-weight-bold py-xx-small`}>{values[i]}</p>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </bal-doc-app>
      </Host>
    )
  }
}
