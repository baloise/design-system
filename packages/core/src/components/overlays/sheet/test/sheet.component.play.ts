import { DsSheet, expect, test } from '@baloise/ds-playwright'

test.describe('component', () => {
  test('should render default slot content', async ({ page }) => {
    await page.mount(`
      <ds-sheet style="position: relative">Sheet content</ds-sheet>
    `)

    const dsSheet = new DsSheet(page.locator('ds-sheet'))

    await dsSheet.assertToBeVisible()
    await dsSheet.assertToContainText('Sheet content')
  })

  test('should default to the default container width', async ({ page }) => {
    await page.mount(`
      <ds-sheet style="position: relative">Sheet content</ds-sheet>
    `)

    const dsSheet = new DsSheet(page.locator('ds-sheet'))

    await dsSheet.assertToBeDefaultContainer()
  })

  test('should render a default background color', async ({ page }) => {
    await page.mount(`
      <ds-sheet style="position: relative">Sheet content</ds-sheet>
    `)

    const dsSheet = new DsSheet(page.locator('ds-sheet'))

    await expect(dsSheet.container).toHaveCSS('background-color', 'rgb(255, 255, 255)')
  })

  test('should render a default box shadow', async ({ page }) => {
    await page.mount(`
      <ds-sheet style="position: relative">Sheet content</ds-sheet>
    `)

    const dsSheet = new DsSheet(page.locator('ds-sheet'))
    const shadow = await dsSheet.container.evaluate(el => getComputedStyle(el).boxShadow)

    expect(shadow).not.toBe('none')
  })

  test('should render a default border radius', async ({ page }) => {
    await page.mount(`
      <ds-sheet style="position: relative">Sheet content</ds-sheet>
    `)

    const dsSheet = new DsSheet(page.locator('ds-sheet'))
    const radius = await dsSheet.container.evaluate(el => getComputedStyle(el).borderRadius)

    expect(radius).not.toBe('0px')
  })

  test('should default to the tokenized bottom position', async ({ page }) => {
    await page.mount(`
      <ds-sheet>Sheet content</ds-sheet>
    `)

    const dsSheet = new DsSheet(page.locator('ds-sheet'))

    await expect(dsSheet.el).toHaveCSS('bottom', '8px')
  })

  test('should apply the fluid container width', async ({ page }) => {
    await page.mount(`
      <ds-sheet style="position: relative" container-size="fluid">Sheet content</ds-sheet>
    `)

    const dsSheet = new DsSheet(page.locator('ds-sheet'))

    await dsSheet.assertToBeFluidContainer()
  })

  test('should apply the compact container width', async ({ page }) => {
    await page.mount(`
      <ds-sheet style="position: relative" container-size="compact">Sheet content</ds-sheet>
    `)

    const dsSheet = new DsSheet(page.locator('ds-sheet'))

    await dsSheet.assertToBeCompactContainer()
  })
})
