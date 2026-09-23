import { DsSegment, mountSsr, test } from '@baloise/ds-playwright'
import { renderToString } from '@baloise/ds-core/hydrate'

const ITEMS = `
  <ds-segment-item value="apple" label="Apple"></ds-segment-item>
  <ds-segment-item value="strawberry" label="Strawberry"></ds-segment-item>
`

test.describe('ssr', () => {
  test('renders and hydrates', async ({ page }, testInfo) => {
    await mountSsr(page, `<ds-segment name="fruits" label="Fruits">${ITEMS}</ds-segment>`, renderToString, testInfo)

    const segment = new DsSegment(page.locator('ds-segment'))
    await segment.assertToBeVisible()
  })
})
