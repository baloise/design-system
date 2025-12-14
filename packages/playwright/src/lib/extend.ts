/* eslint-disable @typescript-eslint/ban-types */
import {
  test as baseTest,
  expect,
  Locator,
  Page,
  PageAssertionsToHaveScreenshotOptions,
  PlaywrightTestArgs,
  PlaywrightTestOptions,
  PlaywrightWorkerArgs,
  PlaywrightWorkerOptions,
  TestType,
} from '@playwright/test'
import { readFileSync } from 'fs'
import { join } from 'path'
import { a11y } from './functions/a11y'
import { initPageEvents } from './page/event-spy'
import { gotoPage, locator, LocatorOptions, mount, spyOnEvent, waitForChanges } from './page/utils'
import { BalPage, BalPageOptions } from './types'

export { expect } from '@playwright/test'

/**
 * Custom screenshot assertion that waits for changes before taking the screenshot
 */
export async function expectScreenshot(
  received: Locator | Page,
  name?: string | string[],
  options?: PageAssertionsToHaveScreenshotOptions,
) {
  // Get page from received (either it's a Page or a Locator with .page())
  const page = 'page' in received ? received.page() : received
  await waitForChanges(page as BalPage)

  await expect(received).toHaveScreenshot(name as string | string[], options)
}

type CustomTestArgs = PlaywrightTestArgs &
  PlaywrightTestOptions &
  PlaywrightWorkerArgs &
  PlaywrightWorkerOptions & {
    page: BalPage
  }

type CustomFixtures = {
  page: BalPage
  a11y(componentTag: string): Promise<void>
}

async function extendPageFixture(page: BalPage): Promise<BalPage> {
  const originalGoto = page.goto.bind(page)
  const originalLocator = page.locator.bind(page)

  await page.addInitScript(() => {
    window.addEventListener('balAppReady', () => {
      ;(window as any).balAppReady = true
      ;(window as any).BaloiseDesignSystem.config.animated = false
      ;(window as any).BaloiseDesignSystem.config.logger = {
        components: [],
        event: false,
        lifecycle: false,
        render: false,
        custom: false,
      }
    })
  })

  // Overridden Playwright methods
  page.goto = (url: string, options?: BalPageOptions) => gotoPage(page, url, originalGoto, options)
  page.locator = (selector: string, options?: LocatorOptions) => locator(page, originalLocator, selector, options)

  // Custom adapter methods
  page.mount = (html: string) => baseTest.step('mount', async () => mount(page, html, test.info()))

  page.waitForChanges = (timeoutMs?: number) =>
    baseTest.step('waitForChanges', async () => waitForChanges(page, timeoutMs))

  page.spyOnEvent = (eventName: string) =>
    baseTest.step(`spyOnEvent ${eventName}`, async () => spyOnEvent(page, eventName))

  page.setupVisualTest = async (url: string, hasLCP = 'Component') => {
    // Intercept font requests and serve local fonts for consistent, fast testing
    await baseTest.step('route fonts', async () => {
      await page.route('**/*.woff2', async route => {
        const url = route.request().url()
        const fontName = url.split('/').pop()

        if (fontName) {
          try {
            // Resolve font path from workspace root (go up from packages/core to root)
            const workspaceRoot = join(process.cwd(), '..', '..')
            const fontPath = join(workspaceRoot, 'packages', 'fonts', 'assets', fontName)
            const fontBuffer = readFileSync(fontPath)

            await route.fulfill({
              status: 200,
              contentType: 'font/woff2',
              body: fontBuffer,
            })
          } catch {
            await route.continue()
          }
        } else {
          await route.continue()
        }
      })
    })

    await baseTest.step('goTo', async () => page.goto(url, { waitUntil: 'networkidle' }))
    await baseTest.step('wait for changes', async () => waitForChanges(page))

    if (hasLCP === 'Component') {
      await baseTest.step('wait for last content paint', async () => {
        await page.waitForFunction(
          () => !!document.documentElement && document.documentElement.classList.contains('lcp-ready'),
          {},
          { timeout: 5000 },
        )
      })
    }

    await baseTest.step('wait for images', async () => {
      await page.evaluate(async () => {
        const imgs = Array.from(document.images)
        await Promise.all(
          imgs.map(img => {
            if (img.complete) {
              return undefined
            }
            return new Promise(resolve => {
              img.addEventListener('load', resolve)
              img.addEventListener('error', resolve)
            })
          }),
        )
      })
    })
  }

  // Custom event behavior
  await initPageEvents(page)

  return page
}

type BalTestType = TestType<
  Omit<PlaywrightTestArgs, 'page'> & PlaywrightTestOptions & CustomFixtures,
  PlaywrightWorkerArgs & PlaywrightWorkerOptions
>

export const test: BalTestType = baseTest.extend<CustomFixtures>({
  page: async ({ page }: CustomTestArgs, use: (r: BalPage) => Promise<void>) => {
    page = await extendPageFixture(page as BalPage)
    await use(page)
  },
  a11y: async ({ page }, use) => {
    await use(async (selector: string) => {
      await a11y(page, selector)
    })
  },
})
