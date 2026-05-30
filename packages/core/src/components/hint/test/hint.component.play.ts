import { DsHint, expect, test } from '@baloise/ds-playwright'

test.describe('component', () => {
  test('should render ds-hint closed by default', async ({ page }) => {
    await page.mount(`
      <ds-hint>
        <ds-hint-title>Title</ds-hint-title>
        <ds-hint-text>Body content.</ds-hint-text>
      </ds-hint>
    `)
    const dsHint = new DsHint(page.locator('ds-hint'))
    await dsHint.assertToBeClosed()
  })

  test('should have aria-haspopup="dialog" on trigger', async ({ page }) => {
    await page.mount(`
      <ds-hint>
        <ds-hint-title>Title</ds-hint-title>
        <ds-hint-text>Body.</ds-hint-text>
      </ds-hint>
    `)
    const dsHint = new DsHint(page.locator('ds-hint'))
    await expect(dsHint.trigger).toHaveAttribute('aria-haspopup', 'dialog')
  })

  test('should use triggerLabel as aria-label on trigger', async ({ page }) => {
    await page.mount(`
      <ds-hint trigger-label="Learn more">
        <ds-hint-title>Title</ds-hint-title>
        <ds-hint-text>Body.</ds-hint-text>
      </ds-hint>
    `)
    const dsHint = new DsHint(page.locator('ds-hint'))
    await expect(dsHint.trigger).toHaveAttribute('aria-label', 'Learn more')
  })

  test('should open on present()', async ({ page }) => {
    await page.mount(`
      <ds-hint>
        <ds-hint-title>Title</ds-hint-title>
        <ds-hint-text>Body.</ds-hint-text>
      </ds-hint>
    `)
    const dsHint = new DsHint(page.locator('ds-hint'))
    await dsHint.assertToBeClosed()

    await page.evaluate(() => (document.querySelector('ds-hint') as any).present())

    await dsHint.assertToBeOpen()
  })

  test('should close on dismiss()', async ({ page }) => {
    await page.mount(`
      <ds-hint>
        <ds-hint-title>Title</ds-hint-title>
        <ds-hint-text>Body.</ds-hint-text>
      </ds-hint>
    `)
    const dsHint = new DsHint(page.locator('ds-hint'))
    await page.evaluate(() => (document.querySelector('ds-hint') as any).present())
    await dsHint.assertToBeOpen()

    await page.evaluate(() => (document.querySelector('ds-hint') as any).dismiss())

    await dsHint.assertToBeClosed()
  })

  test('should toggle on trigger click', async ({ page }) => {
    await page.mount(`
      <ds-hint>
        <ds-hint-title>Title</ds-hint-title>
        <ds-hint-text>Body.</ds-hint-text>
      </ds-hint>
    `)
    const dsHint = new DsHint(page.locator('ds-hint'))

    await dsHint.clickTrigger()
    await dsHint.assertToBeOpen()

    await dsHint.clickTrigger()
    await dsHint.assertToBeClosed()
  })

  test('should set aria-expanded to true when open', async ({ page }) => {
    await page.mount(`
      <ds-hint>
        <ds-hint-title>Title</ds-hint-title>
        <ds-hint-text>Body.</ds-hint-text>
      </ds-hint>
    `)
    const dsHint = new DsHint(page.locator('ds-hint'))
    await page.evaluate(() => (document.querySelector('ds-hint') as any).present())

    await expect(dsHint.trigger).toHaveAttribute('aria-expanded', 'true')
  })

  test('should assign ds-hint-title to title slot', async ({ page }) => {
    await page.mount(`
      <ds-hint>
        <ds-hint-title>My Hint Title</ds-hint-title>
        <ds-hint-text>Body.</ds-hint-text>
      </ds-hint>
    `)
    const slotValue = await page.evaluate(() => {
      return document.querySelector('ds-hint-title')?.slot
    })
    expect(slotValue).toBe('title')
  })

  test('should render title and body content in panel', async ({ page }) => {
    await page.mount(`
      <ds-hint>
        <ds-hint-title>My Title</ds-hint-title>
        <ds-hint-text>My body text.</ds-hint-text>
      </ds-hint>
    `)
    await page.evaluate(() => (document.querySelector('ds-hint') as any).present())

    const hint = page.locator('ds-hint')
    await expect(hint.locator('ds-hint-title')).toContainText('My Title')
    await expect(hint.locator('ds-hint-text')).toContainText('My body text.')
  })
})
