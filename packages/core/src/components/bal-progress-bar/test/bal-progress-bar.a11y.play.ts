import { test } from '@baloise/ds-playwright'

test('basic', async ({ page, a11y }) => {
  await page.mount(`<bal-progress-bar value="50" background="grey"></bal-progress-bar>`)
  await a11y('bal-progress-bar')
})
