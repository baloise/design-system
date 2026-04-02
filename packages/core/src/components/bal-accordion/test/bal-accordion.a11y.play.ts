import { test } from '@baloise/ds-playwright'

test('basic', async ({ page, a11y }) => {
  await page.mount(`
    <bal-accordion summary-title>
    <div slot="summary">Details</div>
    <div slot="content" class="s-bg-1 s-height-4rem"></div>
  </bal-accordion>`)
  await a11y('bal-accordion')
})

test('open', async ({ page, a11y }) => {
  await page.mount(`
    <bal-accordion summary-title open>
    <div slot="summary">Details</div>
    <div slot="content" class="s-bg-1 s-height-4rem"></div>
  </bal-accordion>`)
  await a11y('bal-accordion')
})
