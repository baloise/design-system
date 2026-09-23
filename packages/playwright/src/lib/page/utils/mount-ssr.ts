import type { TestInfo } from '@playwright/test'
import type { Readable } from 'node:stream'
import type { DsPage } from '../../types'
import { template } from './mount'
import { waitForChanges } from './wait-for-changes'

/**
 * Matches `renderToString`'s overloaded signature from `@baloise/ds-core/hydrate` (not imported
 * directly here — see the package doc comment on why) closely enough for TS to accept the real
 * function as an argument. `mountSsr` only ever calls it with the 2-arg, non-streaming overload.
 */
export type RenderToString = (
  html: string,
  options?: Record<string, unknown>,
  asStream?: boolean,
) =>
  | Promise<{
      html: string | null
      hydratedCount: number
      diagnostics: { level: string; messageText: string }[]
    }>
  | Readable

/**
 * SSR twin of `mount()`. Renders `content` server-side via the injected `renderToString`
 * (from `@baloise/ds-core/hydrate`), serves the resulting markup to a real page using the same
 * route-interception trick as `mount()`, then lets the client-side bundle hydrate it — so tests can
 * use the same page-object infrastructure as `.component.play.ts` post-hydration.
 */
export const mountSsr = async (page: DsPage, content: string, renderToString: RenderToString, testInfo: TestInfo) => {
  if (page.isClosed()) {
    throw new Error('mountSsr unavailable: page is already closed')
  }

  const baseUrl = testInfo.project.use.baseURL
  if (!baseUrl) {
    throw new Error('mountSsr unavailable: no dev server base URL provided')
  }

  const rendered = await renderToString(template(content), {
    fullDocument: true,
    url: `${baseUrl}/`,
    serializeShadowRoot: 'declarative-shadow-dom',
  })
  if (!('diagnostics' in rendered)) {
    throw new Error('mountSsr: renderToString unexpectedly returned a stream')
  }
  const result = rendered

  const errors = result.diagnostics.filter(d => d.level === 'error')
  if (errors.length) {
    throw new Error(`mountSsr: SSR render failed:\n${errors.map(e => e.messageText).join('\n\n')}`)
  }
  // `shadowrootmode` alone isn't a reliable "SSR actually happened" signal — some components
  // (e.g. ds-content, ds-stack, ds-root) render light DOM only. `hydratedCount` reflects every
  // component Stencil actually rendered server-side, regardless of shadow DOM usage.
  if (!result.hydratedCount) {
    throw new Error('mountSsr: hydratedCount is 0 — no component rendered server-side')
  }

  const consoleErrors: string[] = []
  page.on('console', m => {
    if (m.type() === 'error') consoleErrors.push(m.text())
  })
  page.on('pageerror', e => consoleErrors.push(e.message))

  await page.route(baseUrl + '**', route => {
    const url = route.request().url()
    if (url === `${baseUrl}/` || url === `${baseUrl}/#` || url === `${baseUrl}#` || url === baseUrl) {
      route.fulfill({ status: 200, contentType: 'text/html', body: result.html! })
    } else {
      route.continue()
    }
  })

  await page.goto(`${baseUrl}#`, { waitUntil: 'domcontentloaded' })
  await waitForChanges(page)

  if (consoleErrors.length) {
    throw new Error(`mountSsr: console errors during hydration:\n${consoleErrors.join('\n')}`)
  }

  // `c-id` is Stencil's SSR-only serialization marker: present on every server-rendered node,
  // stripped once the client successfully adopts that node during hydration. A leftover `c-id`
  // after hydration means the client re-rendered fresh content instead of adopting the
  // server-rendered markup — the "duplicate shadow content" class of hydration-mismatch bug,
  // which throws no error and is otherwise invisible to the checks above.
  const leftoverCIds = await page.evaluate(() => {
    const countIn = (root: Document | ShadowRoot): number => {
      let count = root.querySelectorAll('[c-id]').length
      for (const el of root.querySelectorAll('*')) {
        if (el.shadowRoot) count += countIn(el.shadowRoot)
      }
      return count
    }
    return countIn(document)
  })
  if (leftoverCIds > 0) {
    throw new Error(
      `mountSsr: ${leftoverCIds} leftover c-id attribute(s) after hydration — the client re-rendered ` +
        'instead of adopting the server-rendered markup, duplicating content',
    )
  }
}
