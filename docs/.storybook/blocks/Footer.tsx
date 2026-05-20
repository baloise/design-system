import React, { useMemo } from 'react'
import { navigate } from '@storybook/addon-links'
import storyPathsMap from '../story-paths.json'

export const Footer = ({ children }) => {
  const githubEditUrl = useMemo(() => {
    try {
      // Get the story ID from the URL (e.g., "welcome--documentation" or "foundation-colors--documentation")
      const params = new URLSearchParams(window.location.search)
      const storyId = params.get('id') || ''

      if (!storyId) {
        return 'https://github.com/baloise/design-system'
      }

      // Remove the story variant suffix (--documentation, --page, etc.)
      const cleanId = storyId.replace(/--\w+$/, '')

      // Look up the file path from the mapping
      const sourceFile = storyPathsMap[cleanId]

      if (!sourceFile) {
        console.warn(`[Footer] Story ID not found in mapping: ${cleanId}`)
        return 'https://github.com/baloise/design-system'
      }

      return `https://github.com/baloise/design-system/blob/next/docs/src/${sourceFile}`
    } catch (err) {
      console.warn('[Footer] Error generating GitHub URL:', err.message)
      return 'https://github.com/baloise/design-system'
    }
  }, [])
  return (
    <section className="sb-unstyled mt-4xl">
      {children}
      <section
        className="bg-grey-2"
        style={{
          marginLeft: 'calc(-50vw + 50%)',
          marginRight: 'calc(-50vw + 50%)',
          marginTop: '2rem',
          paddingLeft: '3rem',
          paddingRight: '3rem',
        }}
      >
        <div style={{ paddingTop: '4rem', paddingBottom: '2rem' }}>
          <div className="container" style={{ maxWidth: '1000px', paddingLeft: '0', paddingRight: '0' }}>
            <div className="mb-large">
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
              <p className="mb-medium">This page is open source. Noticed a typo? Or something unclear?</p>
              <div className="flex gap-normal flex-wrap">
                <a className="link" target="_blank" href={githubEditUrl} style={{ width: 'auto' }}>
                  Edit this page on GitHub
                </a>
                {/* <a
                  className="button is-secondary"
                  target="_blank"
                  href={'https://github.com/baloise/design-system/issues/new?template=bug_report.yml'}
                  style={{ width: 'auto' }}
                >
                  Create Issue
                </a> */}
              </div>
            </div>

            <hr className="divider" />

            <div style={{ paddingTop: '1.5rem' }}>
              <div className="flex gap-medium justify-content-space-between align-items-center mb-medium flex-wrap">
                <div>
                  <p className="mb-xx-small is-bold">© 2026 Helvetia Baloise Holding AG</p>
                  <p className="text-small" style={{ opacity: 0.7, margin: 0 }}>
                    Created with accessibility and simplicity in mind
                  </p>
                </div>
                <div className="flex gap-small flex-wrap">
                  <a
                    className="link"
                    href="https://www.helvetia-baloise.com/corporate/hb/en/home/about-us/contact/imprint.html"
                    target="_blank"
                  >
                    Imprint
                  </a>
                  <span style={{ opacity: 0.3 }}>•</span>
                  <a
                    className="link"
                    href="https://www.helvetia-baloise.com/corporate/hb/en/home/about-us/contact/legal-notice.html"
                    target="_blank"
                  >
                    Legal notice
                  </a>
                  <span style={{ opacity: 0.3 }}>•</span>
                  <a
                    className="link"
                    href="https://www.helvetia-baloise.com/corporate/hb/en/home/about-us/contact/accessibility-statement.html"
                    target="_blank"
                  >
                    Accessibility
                  </a>
                  <span style={{ opacity: 0.3 }}>•</span>
                  <a
                    className="link"
                    href="https://www.helvetia-baloise.com/corporate/hb/en/home/about-us/contact/privacy.html"
                    target="_blank"
                  >
                    Privacy
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
  )
}
