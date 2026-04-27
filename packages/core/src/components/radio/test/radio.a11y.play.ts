import { test } from '@baloise/ds-playwright'

test('default', async ({ page, a11y }) => {
  await page.mount(`<ds-radio value="option-1">Option 1</ds-radio>`)
  await a11y('ds-radio')
})

test('checked', async ({ page, a11y }) => {
  await page.mount(`<ds-radio value="option-1" checked>Option 1</ds-radio>`)
  await a11y('ds-radio')
})

test('disabled', async ({ page, a11y }) => {
  await page.mount(`<ds-radio value="option-1" disabled>Option 1</ds-radio>`)
  await a11y('ds-radio')
})

test('invalid', async ({ page, a11y }) => {
  await page.mount(`<ds-radio value="option-1" invalid>Option 1</ds-radio>`)
  await a11y('ds-radio')
})

test('required', async ({ page, a11y }) => {
  await page.mount(`<ds-radio value="option-1" required>Option 1</ds-radio>`)
  await a11y('ds-radio')
})

test('in group', async ({ page, a11y }) => {
  await page.mount(`
    <ds-radio-group name="options" label="Choose an option">
      <ds-radio value="a">Option A</ds-radio>
      <ds-radio value="b">Option B</ds-radio>
    </ds-radio-group>
  `)
  await a11y('ds-radio-group')
})

test('label position left', async ({ page, a11y }) => {
  await page.mount(`<ds-radio value="option-1" label-position="left">Option 1</ds-radio>`)
  await a11y('ds-radio')
})
