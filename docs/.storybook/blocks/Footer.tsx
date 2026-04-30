import React, { useMemo } from 'react'
import { navigate } from '@storybook/addon-links'

const getGitHubEditUrl = () => {
  try {
    // Get the story ID from the URL (e.g., "welcome--documentation" or "components-containment-accordion--documentation")
    const params = new URLSearchParams(window.location.search)
    const storyId = params.get('id') || ''

    if (!storyId) {
      return 'https://github.com/baloise/design-system'
    }

    // Remove the story variant suffix (--documentation, --page, etc.)
    const cleanId = storyId.replace(/--\w+$/, '')

    // Map for main pages
    const pageMapping: Record<string, string> = {
      welcome: 'docs/stories/welcome.stories.mdx',
      changelog: 'CHANGELOG.md',
      support: 'docs/stories/support.mdx',
      why: 'docs/stories/why.mdx',
    }

    // Check if it's a main page
    if (pageMapping[cleanId]) {
      return `https://github.com/baloise/design-system/blob/main/${pageMapping[cleanId]}`
    }

    // Parse component stories: components-category-component--variant
    // e.g., "components-containment-accordion" -> docs/stories/components/accordion/accordion.mdx
    if (cleanId.startsWith('components-')) {
      const parts = cleanId.replace('components-', '').split('-')
      if (parts.length >= 2) {
        const componentName = parts[parts.length - 1]
        return `https://github.com/baloise/design-system/blob/main/docs/stories/components/${componentName}/${componentName}.mdx`
      }
    }

    // Parse other section pages: section-pagename or section-page-name
    const sections = ['foundation', 'development', 'tokens', 'utilities', 'css']
    for (const section of sections) {
      if (cleanId.startsWith(section + '-')) {
        const pageName = cleanId.replace(section + '-', '')
        return `https://github.com/baloise/design-system/blob/main/docs/stories/${section}/${pageName}.stories.mdx`
      }
    }

    // Default fallback
    return 'https://github.com/baloise/design-system'
  } catch (error) {
    // Fallback if any error occurs
    return 'https://github.com/baloise/design-system'
  }
}

export const Footer = ({ children }) => {
  const githubEditUrl = useMemo(() => getGitHubEditUrl(), [])
  return (
    <section className="sb-unstyled mt-2xl">
      {children}
      <section style={{ marginLeft: 'calc(-50vw + 50%)', marginRight: 'calc(-50vw + 50%)', marginTop: '2rem' }}>
        <div className="bg-grey-2" style={{ paddingTop: '4rem', paddingBottom: '2rem' }}>
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
