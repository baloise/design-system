import { test } from '@baloise/ds-playwright'

test('a11y', async ({ page, a11y }) => {
  await page.mount('<bal-tag>Tag</bal-tag>')
  await a11y('bal-tag')
})
