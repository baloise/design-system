import { test } from '@baloise/ds-playwright'

test('default', async ({ page, a11y }) => {
  await page.mount(`<ds-data>
    <ds-data-item>
      <ds-data-label>Label</ds-data-label>
      <ds-data-value>Value</ds-data-value>
    </ds-data-item>
  </ds-data>`)
  await a11y('ds-data')
})

test('required label', async ({ page, a11y }) => {
  await page.mount(`<ds-data>
    <ds-data-item>
      <ds-data-label required>Required Field</ds-data-label>
      <ds-data-value>Value</ds-data-value>
    </ds-data-item>
  </ds-data>`)
  await a11y('ds-data')
})

test('disabled', async ({ page, a11y }) => {
  await page.mount(`<ds-data>
    <ds-data-item disabled>
      <ds-data-label>Disabled Field</ds-data-label>
      <ds-data-value>Disabled Value</ds-data-value>
    </ds-data-item>
  </ds-data>`)
  await a11y('ds-data')
})
