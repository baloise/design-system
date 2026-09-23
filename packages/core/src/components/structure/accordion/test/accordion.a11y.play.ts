import { test } from '@helvetia-design/playwright'

test('basic', async ({ page, a11y }) => {
  await page.mount(`
    <ds-accordion summary-title>
    <div slot="summary">Details</div>
    <div slot="content" class="s-bg-1 s-height-4rem"></div>
  </ds-accordion>`)
  await a11y('ds-accordion')
})

test('open', async ({ page, a11y }) => {
  await page.mount(`
    <ds-accordion summary-title open>
    <div slot="summary">Details</div>
    <div slot="content" class="s-bg-1 s-height-4rem"></div>
  </ds-accordion>`)
  await a11y('ds-accordion')
})
