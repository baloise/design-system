import { test } from '@baloise/ds-playwright'

test('default', async ({ page, a11y }) => {
  await page.mount(`<ds-input label="Label" description="Description"></ds-input>`)
  await a11y('ds-input')
})

test('with placeholder', async ({ page, a11y }) => {
  await page.mount(`<ds-input label="Label" placeholder="Placeholder"></ds-input>`)
  await a11y('ds-input')
})

test('with value', async ({ page, a11y }) => {
  await page.mount(`<ds-input label="Label" value="Value"></ds-input>`)
  await a11y('ds-input')
})

test('disabled', async ({ page, a11y }) => {
  await page.mount(`<ds-input label="Label" value="Value" disabled></ds-input>`)
  await a11y('ds-input')
})

test('invalid', async ({ page, a11y }) => {
  await page.mount(`<ds-input label="Label" value="Value" invalid invalid-text="Validation Error"></ds-input>`)
  await a11y('ds-input')
})

test('success', async ({ page, a11y }) => {
  await page.mount(`<ds-input label="Label" value="Value" color="success"></ds-input>`)
  await a11y('ds-input')
})

test('warning', async ({ page, a11y }) => {
  await page.mount(`<ds-input label="Label" value="Value" color="warning"></ds-input>`)
  await a11y('ds-input')
})
