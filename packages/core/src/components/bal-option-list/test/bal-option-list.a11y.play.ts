import { test } from '@baloise/ds-playwright'

test('basic', async ({ page, a11y }) => {
  await page.mount(`
    <section>
      <bal-label id="label">Year list</bal-label>
      <bal-option-list id="list" multiple labelledby="label">
        <bal-option value="v1991" label="1991">1991</bal-option>
        <bal-option value="v1992" label="1992">1992</bal-option>
        <bal-option value="v1993" label="1993">1993</bal-option>
        <bal-option value="v1994" label="1994">1994</bal-option>
      </bal-option-list>
    </section>
  `)
  await a11y('section')
})
