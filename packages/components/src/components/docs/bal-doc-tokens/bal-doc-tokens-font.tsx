import { Component, h, ComponentInterface, Host, Element } from '@stencil/core'

@Component({
  tag: 'bal-doc-tokens-font',
})
export class DocTokensFont implements ComponentInterface {
  @Element() el!: HTMLElement

  render() {
    return (
      <Host>
        <bal-doc-app>
          <table class="table tokens" style={{ width: '100%' }}>
            <thead>
              <tr>
                <th style={{ minWidth: '220px' }}>Example</th>
                <th>Description</th>
                <th style={{ minWidth: '220px' }}>Token</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ verticalAlign: 'top' }}>
                  <span class="has-font-title is-bold has-text-color-primary is-size-medium">Bold Headline</span>
                  <br />
                  <span class="has-font-title has-text-color-primary is-size-medium">Light Headline</span>
                </td>
                <td style={{ verticalAlign: 'top' }}>
                  <p class="is-bold is-size-large mt-0 mb-2">
                    Title <span class="is-size-medium">(BaloiseCreateHeadline)</span>
                  </p>
                  <p class="m-0 is-size-small">Should only be used for headings and buttons</p>
                </td>
                <td style={{ verticalAlign: 'top' }}>
                  <p class="mt-0 mb-2 is-size-small py-1 px-2 has-background-grey-2 has-radius is-bold">
                    var(--bal-font-family-title)
                  </p>
                </td>
              </tr>
              <tr>
                <td style={{ verticalAlign: 'top' }}>
                  <span class="has-font-text is-bold has-text-color-primary is-size-medium">Bold Text</span>
                  <br />
                  <span class="has-font-text has-text-color-primary is-size-medium">Regular Text</span>
                </td>
                <td style={{ verticalAlign: 'top' }}>
                  <p class="is-bold is-size-large mt-0 mb-2">
                    Text <span class="is-size-medium">(BaloiseCreateText)</span>
                  </p>
                  <p class="m-0 is-size-small">Should only be used for body texts and form controls</p>
                </td>
                <td style={{ verticalAlign: 'top' }}>
                  <p class="mt-0 mb-2 is-size-small py-1 px-2 has-background-grey-2 has-radius is-bold">
                    var(--bal-font-family-text)
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
        </bal-doc-app>
      </Host>
    )
  }
}
