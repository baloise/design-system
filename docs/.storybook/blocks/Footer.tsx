import React from 'react'
import { navigate } from '@storybook/addon-links'

export const Footer = ({ children }) => {
  return (
    <section className="sb-unstyled mt-2xl">
      <hr />
      {children}
      <section className="mt-xl pt-normal border-top-light">
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
        <p className="mb-xx-small">This page is open source. Noticed a typo? Or something unclear?</p>
        <a className="link" target="_blank" href={'https://github.com/baloise/design-system'}>
          Improve this page on GitHub
        </a>
        <div className="flex gap-small pt-small mt-large border-top-grey-light">
          <span className="flex-1 is-bold">© 2026 Helvetia Baloise Holding AG</span>
          <a
            className="link"
            href="https://www.helvetia-baloise.com/corporate/hb/en/home/about-us/contact/imprint.html"
            target="_blank"
          >
            Imprint and contact
          </a>{' '}
          <a
            className="link"
            href="https://www.helvetia-baloise.com/corporate/hb/en/home/about-us/contact/legal-notice.html"
            target="_blank"
          >
            Legal notice
          </a>
          <a
            className="link"
            href="https://www.helvetia-baloise.com/corporate/hb/en/home/about-us/contact/accessibility-statement.html"
            target="_blank"
          >
            Accessibility statement
          </a>
          <a
            className="link"
            href="https://www.helvetia-baloise.com/corporate/hb/en/home/about-us/contact/privacy.html"
            target="_blank"
          >
            Privacy policy
          </a>
        </div>
      </section>
    </section>
  )
}
