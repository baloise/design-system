import { test } from '@baloise/ds-playwright'

test('default', async ({ page, a11y }) => {
  await page.mount(`<ds-number-input label="Label" description="Description"></ds-number-input>`)
  await a11y('ds-number-input')
})

test('with placeholder', async ({ page, a11y }) => {
  await page.mount(`<ds-number-input label="Label" placeholder="0"></ds-number-input>`)
  await a11y('ds-number-input')
})

test('with value', async ({ page, a11y }) => {
  await page.mount(`<ds-number-input label="Label" value="42"></ds-number-input>`)
  await a11y('ds-number-input')
})

test('disabled', async ({ page, a11y }) => {
  await page.mount(`<ds-number-input label="Label" value="42" disabled></ds-number-input>`)
  await a11y('ds-number-input')
})

test('invalid', async ({ page, a11y }) => {
  await page.mount(
    `<ds-number-input label="Label" value="42" invalid invalid-text="Validation Error"></ds-number-input>`,
  )
  await a11y('ds-number-input')
})

test('success', async ({ page, a11y }) => {
  await page.mount(`<ds-number-input label="Label" value="42" color="success"></ds-number-input>`)
  await a11y('ds-number-input')
})

test('warning', async ({ page, a11y }) => {
  await page.mount(`<ds-number-input label="Label" value="42" color="warning"></ds-number-input>`)
  await a11y('ds-number-input')
})
