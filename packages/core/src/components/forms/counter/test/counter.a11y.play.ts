import { test } from '@baloise/ds-playwright'

test('default', async ({ page, a11y }) => {
  await page.mount(`<ds-counter label="Label" description="Description"></ds-counter>`)
  await a11y('ds-counter')
})

test('with value', async ({ page, a11y }) => {
  await page.mount(`<ds-counter label="Label" value="5"></ds-counter>`)
  await a11y('ds-counter')
})

test('at min', async ({ page, a11y }) => {
  await page.mount(`<ds-counter label="Label" value="0" min="0" max="10"></ds-counter>`)
  await a11y('ds-counter')
})

test('at max', async ({ page, a11y }) => {
  await page.mount(`<ds-counter label="Label" value="10" min="0" max="10"></ds-counter>`)
  await a11y('ds-counter')
})

test('disabled', async ({ page, a11y }) => {
  await page.mount(`<ds-counter label="Label" value="5" disabled></ds-counter>`)
  await a11y('ds-counter')
})

test('readonly', async ({ page, a11y }) => {
  await page.mount(`<ds-counter label="Label" value="5" readonly></ds-counter>`)
  await a11y('ds-counter')
})

test('invalid', async ({ page, a11y }) => {
  await page.mount(`<ds-counter label="Label" value="5" invalid invalid-text="Validation Error"></ds-counter>`)
  await a11y('ds-counter')
})

test('success', async ({ page, a11y }) => {
  await page.mount(`<ds-counter label="Label" value="5" color="success"></ds-counter>`)
  await a11y('ds-counter')
})

test('warning', async ({ page, a11y }) => {
  await page.mount(`<ds-counter label="Label" value="5" color="warning"></ds-counter>`)
  await a11y('ds-counter')
})

test('with min/max/step', async ({ page, a11y }) => {
  await page.mount(`<ds-counter label="Label" min="0" max="10" step="1" value="5"></ds-counter>`)
  await a11y('ds-counter')
})
