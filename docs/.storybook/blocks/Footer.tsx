import React from 'react'
import { navigate } from '@storybook/addon-links'

export const Footer = ({ children }) => {
  return (
    <section className="sb-unstyled">
      <hr />
      {children}
      <section className="mt-xx-large pt-normal has-border-top-light">
        <p className="mb-small">
          If you experience any issues while using a component, please head over to the{' '}
          <a
            className="sbdocs-a"
            onClick={() => {
              navigate({ title: 'Support' })
            }}
          >
            Support page
          </a>{' '}
          for more guidelines and help.
        </p>
        <p>This page is open source. Noticed a typo? Or something unclear?</p>
        <a className="is-link sbdocs-a" target="_blank" href={'https://github.com/baloise/design-system'}>
          Improve this page on GitHub
        </a>
      </section>
    </section>
  )
}
