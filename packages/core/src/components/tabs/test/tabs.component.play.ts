import { DsTabs, expect, test } from '@baloise/ds-playwright'

const PANELS = `
  <ds-tab name="a">Tab A</ds-tab>
  <ds-tab name="b">Tab B</ds-tab>
  <ds-tab name="c">Tab C</ds-tab>
  <ds-tab-panel for="a">Content A</ds-tab-panel>
  <ds-tab-panel for="b">Content B</ds-tab-panel>
  <ds-tab-panel for="c">Content C</ds-tab-panel>
`

test.describe('panels variant — initial state', () => {
  test('selects the first tab by default', async ({ page }) => {
    await page.mount(`<ds-tabs>${PANELS}</ds-tabs>`)
    const tabs = new DsTabs(page.locator('ds-tabs'))

    await tabs.assertTabSelected('a')
    await tabs.assertPanelVisible('a')
    await tabs.assertPanelHidden('b')
    await tabs.assertPanelHidden('c')
  })

  test('respects a preset value prop', async ({ page }) => {
    await page.mount(`<ds-tabs value="b">${PANELS}</ds-tabs>`)
    const tabs = new DsTabs(page.locator('ds-tabs'))

    await tabs.assertTabSelected('b')
    await tabs.assertPanelHidden('a')
    await tabs.assertPanelVisible('b')
  })
})

test.describe('panels variant — interaction', () => {
  test('clicking a tab shows its panel and hides the others', async ({ page }) => {
    await page.mount(`<ds-tabs>${PANELS}</ds-tabs>`)
    const tabs = new DsTabs(page.locator('ds-tabs'))

    await tabs.selectTab('b')

    await tabs.assertTabSelected('b')
    await tabs.assertTabNotSelected('a')
    await tabs.assertPanelVisible('b')
    await tabs.assertPanelHidden('a')
    await tabs.assertPanelHidden('c')
  })

  test('clicking the already selected tab does not emit dsChange', async ({ page }) => {
    await page.mount(`<ds-tabs>${PANELS}</ds-tabs>`)
    const tabs = new DsTabs(page.locator('ds-tabs'))
    const spy = await tabs.el.spyOnEvent('dsChange')

    await tabs.selectTab('a')

    expect(spy).toHaveReceivedEventTimes(0)
  })
})

test.describe('panels variant — dsChange event', () => {
  test('emits dsChange with the selected tab name', async ({ page }) => {
    await page.mount(`<ds-tabs>${PANELS}</ds-tabs>`)
    const tabs = new DsTabs(page.locator('ds-tabs'))
    const spy = await tabs.el.spyOnEvent('dsChange')

    await tabs.selectTab('b')

    expect(spy).toHaveReceivedEventTimes(1)
    expect(spy).toHaveReceivedEventDetail({ value: 'b' })
  })

  test('emits dsChange on each tab switch', async ({ page }) => {
    await page.mount(`<ds-tabs>${PANELS}</ds-tabs>`)
    const tabs = new DsTabs(page.locator('ds-tabs'))
    const spy = await tabs.el.spyOnEvent('dsChange')

    await tabs.selectTab('b')
    await tabs.selectTab('c')

    expect(spy).toHaveReceivedEventTimes(2)
    expect(spy).toHaveReceivedEventDetail({ value: 'c' })
  })
})

test.describe('panels variant — keyboard navigation', () => {
  test('ArrowRight moves to the next tab', async ({ page }) => {
    await page.mount(`<ds-tabs>${PANELS}</ds-tabs>`)
    const tabs = new DsTabs(page.locator('ds-tabs'))

    await tabs.selectTab('a')
    await page.keyboard.press('ArrowRight')

    await tabs.assertTabSelected('b')
  })

  test('ArrowLeft moves to the previous tab', async ({ page }) => {
    await page.mount(`<ds-tabs value="b">${PANELS}</ds-tabs>`)
    const tabs = new DsTabs(page.locator('ds-tabs'))

    await tabs.selectTab('b')
    await page.keyboard.press('ArrowLeft')

    await tabs.assertTabSelected('a')
  })

  test('Home moves to the first tab', async ({ page }) => {
    await page.mount(`<ds-tabs value="c">${PANELS}</ds-tabs>`)
    const tabs = new DsTabs(page.locator('ds-tabs'))

    await tabs.selectTab('c')
    await page.keyboard.press('Home')

    await tabs.assertTabSelected('a')
  })

  test('End moves to the last tab', async ({ page }) => {
    await page.mount(`<ds-tabs>${PANELS}</ds-tabs>`)
    const tabs = new DsTabs(page.locator('ds-tabs'))

    await tabs.selectTab('a')
    await page.keyboard.press('End')

    await tabs.assertTabSelected('c')
  })

  test('ArrowRight wraps from last to first', async ({ page }) => {
    await page.mount(`<ds-tabs value="c">${PANELS}</ds-tabs>`)
    const tabs = new DsTabs(page.locator('ds-tabs'))

    await tabs.selectTab('c')
    await page.keyboard.press('ArrowRight')

    await tabs.assertTabSelected('a')
  })
})

test.describe('navigation variant', () => {
  test('does not emit dsChange when links are clicked', async ({ page }) => {
    await page.mount(`
      <ds-tabs label="Sections">
        <ds-tab name="first"><a href="/first" aria-current="page">First</a></ds-tab>
        <ds-tab name="second"><a href="/second">Second</a></ds-tab>
      </ds-tabs>
    `)
    const tabs = new DsTabs(page.locator('ds-tabs'))
    const spy = await tabs.el.spyOnEvent('dsChange')

    await tabs.tab('second').click()

    expect(spy).toHaveReceivedEventTimes(0)
  })

  test('marks the tab with aria-current as selected', async ({ page }) => {
    await page.mount(`
      <ds-tabs label="Sections">
        <ds-tab name="first"><a href="/first" aria-current="page">First</a></ds-tab>
        <ds-tab name="second"><a href="/second">Second</a></ds-tab>
      </ds-tabs>
    `)
    const tabs = new DsTabs(page.locator('ds-tabs'))

    await tabs.assertTabSelected('first')
    await tabs.assertTabNotSelected('second')
  })
})
