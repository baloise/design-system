import React from 'react'
import tokens from '@baloise/design-system-tokens/dist/tokens.docs.json'

export const TokensFontFamily = ({ overview }) => {
  return (
    <table class="sb-unstyled my-x-large table tokens" style={{ width: '100%' }}>
      <thead>
        <tr>
          <th style={{ minWidth: '220px' }}>Example</th>
          <th>Description</th>
          <th style={{ minWidth: '240px' }}>Token</th>
        </tr>
      </thead>
      <tbody>
          <tr>
            <td style={{ verticalAlign: 'top' }}>
              <span class={`has-font-title has-text-weight-bold has-text-primary`}>Title</span>
            </td>
            <td style={{ verticalAlign: 'top' }}>
              <p class="has-text-weight-bold is-size-large mt-none mb-x-small">
                Title
              </p>
              <span class="is-size-small">BaloiseCreateHeadline, Arial, sans-serif</span>
            </td>
            <td style={{ verticalAlign: 'top' }}>
              <p class="mt-none mb-x-small is-size-small py-xx-small px-x-small has-background-grey-2 has-radius-normal has-text-weight-bold">
                var(--bal-font-family-title)
              </p>
            </td>
          </tr>
          <tr>
            <td style={{ verticalAlign: 'top' }}>
              <span class={`has-font-text has-text-primary`}>Text</span>
            </td>
            <td style={{ verticalAlign: 'top' }}>
              <p class="has-text-weight-bold is-size-large mt-none mb-none">
                Text
              </p>
              <span class="is-size-small">BaloiseCreateText, Arial, sans-serif</span>
            </td>
            <td style={{ verticalAlign: 'top' }}>
              <p class="mt-none mb-x-small is-size-small py-xx-small px-x-small has-background-grey-2 has-radius-normal has-text-weight-bold">
                var(--bal-font-family-text)
              </p>
            </td>
          </tr>
      </tbody>
    </table>
  )
}
