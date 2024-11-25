import { E2EPage, test } from '@stencil/playwright'
import { expect, Page } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright' // 1

const mount = async (page: Page & E2EPage, html: string) => page.setContent(`<bal-doc-app>${html}</bal-doc-app>`)

test('has title by url', async ({ page }) => {
  await page.goto('/components/bal-tag/test/bal-tag.cy.html')
  const component = await page.locator('bal-tag')

  await expect(component).toHaveText(`My tag`)
})

test('has title', async ({ page }) => {
  //   await page.goto('/components/bal-tag/test/bal-tag.cy.html')
  await mount(page, `<bal-tag>My tag</my-tag>`)

  const component = await page.locator('bal-tag')

  await expect(component).toHaveText(`My tag`)
})

test('has event', async ({ page }) => {
  await mount(page, `<bal-tag closable>My tag</my-tag>`)
  const balCloseClick = await page.spyOnEvent('balCloseClick')

  const component = await page.locator('bal-tag')
  const button = component.getByTestId('bal-close')
  button.click()
  await page.waitForChanges()

  await expect(balCloseClick).toHaveReceivedEvent()
})

test('visual', async ({ page }) => {
  await mount(page, `<bal-tag>My tag</my-tag>`)

  const component = await page.locator('bal-tag')
  await expect(component).toHaveScreenshot()
})

test('a11y', async ({ page }) => {
  await page.goto('/components/bal-tag/test/bal-tag.a11y.html')

  const accessibilityScanResults = await new AxeBuilder({ page }).analyze() // 4

  expect(accessibilityScanResults.violations).toEqual([])
})
