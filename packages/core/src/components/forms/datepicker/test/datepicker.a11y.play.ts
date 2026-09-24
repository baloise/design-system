import { DsDatepicker, test } from '@helvetia-design/playwright'

test('basic', async ({ page, a11y }) => {
  await page.mount(`<ds-datepicker label="Date of birth"></ds-datepicker>`)
  await a11y('ds-datepicker')
})

test('with value', async ({ page, a11y }) => {
  await page.mount(`<ds-datepicker label="Date of birth" value="2026-07-13"></ds-datepicker>`)
  await a11y('ds-datepicker')
})

test('disabled', async ({ page, a11y }) => {
  await page.mount(`<ds-datepicker label="Date of birth" disabled></ds-datepicker>`)
  await a11y('ds-datepicker')
})

test('invalid', async ({ page, a11y }) => {
  await page.mount(
    `<ds-datepicker label="Date of birth" invalid invalid-text="Please enter a valid date"></ds-datepicker>`,
  )
  await a11y('ds-datepicker')
})

test('inline', async ({ page, a11y }) => {
  await page.mount(`<ds-datepicker label="Date of birth" inline></ds-datepicker>`)
  await page.locator('.air-datepicker-cell.-day-:not(.-other-month-)').first().waitFor({ state: 'visible' })
  await a11y('ds-datepicker')
})

test('with picker open', async ({ page, a11y }) => {
  await page.mount(`<ds-datepicker label="Date of birth"></ds-datepicker>`)
  const date = new DsDatepicker(page.locator('ds-datepicker'))
  await date.triggerButton.click()
  await page.locator('.air-datepicker-cell.-day-:not(.-other-month-)').first().waitFor({ state: 'visible' })
  await a11y('ds-datepicker')
})
