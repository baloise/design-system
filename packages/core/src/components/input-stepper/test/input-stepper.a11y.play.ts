import { test } from '@baloise/ds-playwright'

test('default', async ({ page, a11y }) => {
  await page.mount(`<ds-input-stepper label="Label" description="Description"></ds-input-stepper>`)
  await a11y('ds-input-stepper')
})

test('with value', async ({ page, a11y }) => {
  await page.mount(`<ds-input-stepper label="Label" value="5"></ds-input-stepper>`)
  await a11y('ds-input-stepper')
})

test('at min', async ({ page, a11y }) => {
  await page.mount(`<ds-input-stepper label="Label" value="0" min="0" max="10"></ds-input-stepper>`)
  await a11y('ds-input-stepper')
})

test('at max', async ({ page, a11y }) => {
  await page.mount(`<ds-input-stepper label="Label" value="10" min="0" max="10"></ds-input-stepper>`)
  await a11y('ds-input-stepper')
})

test('disabled', async ({ page, a11y }) => {
  await page.mount(`<ds-input-stepper label="Label" value="5" disabled></ds-input-stepper>`)
  await a11y('ds-input-stepper')
})

test('readonly', async ({ page, a11y }) => {
  await page.mount(`<ds-input-stepper label="Label" value="5" readonly></ds-input-stepper>`)
  await a11y('ds-input-stepper')
})

test('invalid', async ({ page, a11y }) => {
  await page.mount(
    `<ds-input-stepper label="Label" value="5" invalid invalid-text="Validation Error"></ds-input-stepper>`,
  )
  await a11y('ds-input-stepper')
})

test('success', async ({ page, a11y }) => {
  await page.mount(`<ds-input-stepper label="Label" value="5" color="success"></ds-input-stepper>`)
  await a11y('ds-input-stepper')
})

test('warning', async ({ page, a11y }) => {
  await page.mount(`<ds-input-stepper label="Label" value="5" color="warning"></ds-input-stepper>`)
  await a11y('ds-input-stepper')
})

test('with min/max/step', async ({ page, a11y }) => {
  await page.mount(`<ds-input-stepper label="Label" min="0" max="10" step="1" value="5"></ds-input-stepper>`)
  await a11y('ds-input-stepper')
})
