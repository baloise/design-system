import type { Page } from '@playwright/test'
import type { BalPageOptions } from '../../types'

/**
 * This is an extended version of Playwright's `page.goto` method. In addition to performing
 * the normal `page.goto` work, this code also automatically waits for the Stencil components
 * to be hydrated before proceeding with the test.
 */
export const gotoPage = async (page: Page, url: string, originalFn: typeof page.goto, options?: BalPageOptions) => {
  // Navigate first
  const response = await originalFn.call(page, url, options)

  // Wait for Stencil hydration (all components)
  await page.evaluate(async () => {
    const elements = Array.from(document.querySelectorAll('*'))
    const readyPromises: Promise<any>[] = []
    for (const el of elements) {
      if (typeof (el as any).componentOnReady === 'function') {
        readyPromises.push((el as any).componentOnReady())
      }
    }
    await Promise.all(readyPromises)
  })

  // Wait for global app ready flag (if used in your app)
  // await page.waitForFunction(() => (window as any).balAppReady === true, { timeout: 4750 })

  // Wait for fonts
  await page.evaluate(() => document.fonts.ready)

  return response
}
