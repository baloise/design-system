import type { TestInfo } from '@playwright/test'
import type { BalPage } from '../../types'

export const mount = async (page: BalPage, content: string, testInfo: TestInfo) => {
  if (page.isClosed()) {
    throw new Error('setContent unavailable: page is already closed')
  }

  const baseUrl = testInfo.project.use.baseURL

  if (baseUrl) {
    await page.route(baseUrl, route => {
      if (route.request().url() === `${baseUrl}/`) {
        /**
         * Intercepts the empty page request and returns the
         * HTML content that was passed in.
         */
        route.fulfill({
          status: 200,
          contentType: 'text/html',
          body: template(content),
        })
      } else {
        // Allow all other requests to pass through
        route.continue()
      }
    })

    await page.goto(`${baseUrl}#`)
  } else {
    throw new Error('setContent unavailable: no dev server base URL provided')
  }
}

const template = (html: string) => `
<!doctype html>
<html dir="ltr" lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=5.0" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />

    <script type="module" src="/build/baloise-design-system.esm.js"></script>
    <script nomodule src="/build/baloise-design-system.js"></script>

    <link rel="preload" href="/assets/basic.min.css" as="style" onload="this.onload=null;this.rel='stylesheet'" />
    <noscript><link rel="stylesheet" href="/assets/basic.min.css" /></noscript>
  </head>

  <body>
    <bal-app animated="false">
      <main id="root">${html}</main>
    </bal-app>
  </body>
</html>
`
