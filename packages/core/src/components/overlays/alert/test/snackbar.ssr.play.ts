import { DsSnackbar, DsToast, expect, mountSsr, test } from '@helvetia-design/playwright'
import { renderToString } from '@helvetia-design/core/hydrate'

test.describe('ssr', () => {
  test('renders and hydrates', async ({ page }, testInfo) => {
    await mountSsr(
      page,
      `<ds-snackbar heading="My Snackbar" action="Action" closable>This is a Snackbar content!</ds-snackbar>`,
      renderToString,
      testInfo,
    )

    const component = new DsSnackbar(page.locator('ds-snackbar'))
    await component.assertToBeVisible()
    await component.assertToHaveHeading('My Snackbar')
  })

  test('renders ds-toast and hydrates', async ({ page }, testInfo) => {
    await mountSsr(
      page,
      `<ds-toast heading="Saved" message="Your changes have been saved." duration="1"></ds-toast>`,
      renderToString,
      testInfo,
    )

    const toast = new DsToast(page.locator('ds-toast'))
    await toast.assertToBeVisible()
  })

  test('renders ds-alert-container and hydrates', async ({ page }, testInfo) => {
    await mountSsr(page, `<ds-alert-container></ds-alert-container>`, renderToString, testInfo)

    await expect(page.locator('ds-alert-container')).toBeAttached()
  })
})
