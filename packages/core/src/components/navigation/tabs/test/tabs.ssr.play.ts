import { DsTabs, mountSsr, test } from '@baloise/ds-playwright'
import { renderToString } from '@baloise/ds-core/hydrate'

const PANELS = `
  <ds-tab name="a">Tab A</ds-tab>
  <ds-tab name="b">Tab B</ds-tab>
  <ds-tab-panel for="a">Content A</ds-tab-panel>
  <ds-tab-panel for="b">Content B</ds-tab-panel>
`

test.describe('ssr', () => {
  test('renders and hydrates', async ({ page }, testInfo) => {
    await mountSsr(page, `<ds-tabs>${PANELS}</ds-tabs>`, renderToString, testInfo)

    const tabs = new DsTabs(page.locator('ds-tabs'))
    await tabs.assertTabSelected('a')
    await tabs.assertPanelVisible('a')
  })
})
