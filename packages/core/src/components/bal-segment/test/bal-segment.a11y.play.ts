import { test } from '@baloise/ds-playwright'

test('basic', async ({ page, a11y }) => {
  await page.mount(`
    <bal-segment value="Yes">
      <bal-segment-item value="Yes" label="Yes"></bal-segment-item>
      <bal-segment-item value="No" label="No"></bal-segment-item>
    </bal-segment>
  `)
  await a11y('bal-segment')
})
