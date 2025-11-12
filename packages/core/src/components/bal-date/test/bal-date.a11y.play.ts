import { test } from '@baloise/ds-playwright'

test('basic', async ({ page, a11y }) => {
  await page.mount(`
    <bal-field>
      <bal-field-label>Birthday</bal-field-label>
      <bal-field-control>
        <bal-date placeholder="Enter Date"></bal-date>
      </bal-field-control>
    </bal-field>
  `)
  await a11y('bal-field')
})
