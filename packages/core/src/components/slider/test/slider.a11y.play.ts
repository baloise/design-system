import { test } from '@baloise/ds-playwright'

test('default', async ({ page, a11y }) => {
  await page.mount(`<ds-slider label="Label" description="Description"></ds-slider>`)
  await a11y('ds-slider')
})

test('with value', async ({ page, a11y }) => {
  await page.mount(`<ds-slider label="Label" value="42"></ds-slider>`)
  await a11y('ds-slider')
})

test('disabled', async ({ page, a11y }) => {
  await page.mount(`<ds-slider label="Label" value="42" disabled></ds-slider>`)
  await a11y('ds-slider')
})

test('readonly', async ({ page, a11y }) => {
  await page.mount(`<ds-slider label="Label" value="42" readonly></ds-slider>`)
  await a11y('ds-slider')
})

test('invalid', async ({ page, a11y }) => {
  await page.mount(`<ds-slider label="Label" value="42" invalid invalid-text="Validation Error"></ds-slider>`)
  await a11y('ds-slider')
})

test('success', async ({ page, a11y }) => {
  await page.mount(`<ds-slider label="Label" value="42" color="success"></ds-slider>`)
  await a11y('ds-slider')
})

test('warning', async ({ page, a11y }) => {
  await page.mount(`<ds-slider label="Label" value="42" color="warning"></ds-slider>`)
  await a11y('ds-slider')
})

test('with min/max/step', async ({ page, a11y }) => {
  await page.mount(`<ds-slider label="Label" min="0" max="10" step="1" value="5"></ds-slider>`)
  await a11y('ds-slider')
})
