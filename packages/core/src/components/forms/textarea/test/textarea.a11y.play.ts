import { test } from '@baloise/ds-playwright'

test('default', async ({ page, a11y }) => {
  await page.mount(`<ds-textarea label="Label" description="Description"></ds-textarea>`)
  await a11y('ds-textarea')
})

test('with placeholder', async ({ page, a11y }) => {
  await page.mount(`<ds-textarea label="Label" placeholder="Placeholder"></ds-textarea>`)
  await a11y('ds-textarea')
})

test('with value', async ({ page, a11y }) => {
  await page.mount(`<ds-textarea label="Label" value="Value"></ds-textarea>`)
  await a11y('ds-textarea')
})

test('disabled', async ({ page, a11y }) => {
  await page.mount(`<ds-textarea label="Label" value="Value" disabled></ds-textarea>`)
  await a11y('ds-textarea')
})

test('invalid', async ({ page, a11y }) => {
  await page.mount(`<ds-textarea label="Label" value="Value" invalid invalid-text="Validation Error"></ds-textarea>`)
  await a11y('ds-textarea')
})

test('success', async ({ page, a11y }) => {
  await page.mount(`<ds-textarea label="Label" value="Value" color="success"></ds-textarea>`)
  await a11y('ds-textarea')
})

test('warning', async ({ page, a11y }) => {
  await page.mount(`<ds-textarea label="Label" value="Value" color="warning"></ds-textarea>`)
  await a11y('ds-textarea')
})
