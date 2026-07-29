import { test } from '@baloise/ds-playwright'

test('default', async ({ page, a11y }) => {
  await page.mount(`<ds-input-slider label="Label" description="Description"></ds-input-slider>`)
  await a11y('ds-input-slider')
})

test('with value', async ({ page, a11y }) => {
  await page.mount(`<ds-input-slider label="Label" value="42"></ds-input-slider>`)
  await a11y('ds-input-slider')
})

test('disabled', async ({ page, a11y }) => {
  await page.mount(`<ds-input-slider label="Label" value="42" disabled></ds-input-slider>`)
  await a11y('ds-input-slider')
})

test('readonly', async ({ page, a11y }) => {
  await page.mount(`<ds-input-slider label="Label" value="42" readonly></ds-input-slider>`)
  await a11y('ds-input-slider')
})

test('invalid', async ({ page, a11y }) => {
  await page.mount(
    `<ds-input-slider label="Label" value="42" invalid invalid-text="Validation Error"></ds-input-slider>`,
  )
  await a11y('ds-input-slider')
})

test('success', async ({ page, a11y }) => {
  await page.mount(`<ds-input-slider label="Label" value="42" color="success"></ds-input-slider>`)
  await a11y('ds-input-slider')
})

test('warning', async ({ page, a11y }) => {
  await page.mount(`<ds-input-slider label="Label" value="42" color="warning"></ds-input-slider>`)
  await a11y('ds-input-slider')
})

test('with min/max/step', async ({ page, a11y }) => {
  await page.mount(`<ds-input-slider label="Label" min="0" max="10" step="1" value="5"></ds-input-slider>`)
  await a11y('ds-input-slider')
})
