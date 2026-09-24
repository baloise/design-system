import { DsSteps, mountSsr, test } from '@helvetia-design/playwright'
import { renderToString } from '@helvetia-design/core/hydrate'

const PANELS = `
  <ds-step name="a" label="Cart"></ds-step>
  <ds-step name="b" label="Shipping"></ds-step>
  <ds-step-panel for="a">Content A</ds-step-panel>
  <ds-step-panel for="b">Content B</ds-step-panel>
`

test.describe('ssr', () => {
  test('renders and hydrates', async ({ page }, testInfo) => {
    await mountSsr(page, `<ds-steps>${PANELS}</ds-steps>`, renderToString, testInfo)

    const steps = new DsSteps(page.locator('ds-steps'))
    await steps.assertStepSelected('a')
    await steps.assertPanelVisible('a')
  })
})
