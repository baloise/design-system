import React from 'react'
import { navigate } from '@storybook/addon-links'

export const Footer = ({ children }) => {
  return (
    <section className="sb-unstyled">
      <hr />
      {children}
      <section className="mt-xx-large pt-normal border-top-light">
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
          <span className="flex-1 is-bold">© 2023 Baloise Insurance Ltd</span>
          <a className="link" href="https://www.baloise.ch/en/about-us/information/site-notice.html" target="_blank">
            Site notice
          </a>
          <a className="link" href="https://www.baloise.ch/en/about-us/information/legal-notice.html" target="_blank">
            Legal notice
          </a>
          <a className="link" href="https://www.baloise.ch/en/about-us/information/privacy-policy.html" target="_blank">
            Privacy policy
          </a>
          <a className="link" href="https://www.baloise.ch/en/about-us/information/cookie-policy.html" target="_blank">
            Cookie policy
          </a>
        </div>
      </section>
    </section>
  )
}
