import { DsDate, test } from '@baloise/ds-playwright'

test('basic', async ({ page, a11y }) => {
  await page.mount(`<ds-date label="Date of birth"></ds-date>`)
  await a11y('ds-date')
})

test('with value', async ({ page, a11y }) => {
  await page.mount(`<ds-date label="Date of birth" value="2026-07-13"></ds-date>`)
  await a11y('ds-date')
})

test('disabled', async ({ page, a11y }) => {
  await page.mount(`<ds-date label="Date of birth" disabled></ds-date>`)
  await a11y('ds-date')
})

test('invalid', async ({ page, a11y }) => {
  await page.mount(`<ds-date label="Date of birth" invalid invalid-text="Please enter a valid date"></ds-date>`)
  await a11y('ds-date')
})

test('with picker open', async ({ page, a11y }) => {
  await page.mount(`<ds-date label="Date of birth"></ds-date>`)
  const date = new DsDate(page.locator('ds-date'))
  await date.triggerButton.click()
  await page.locator('.air-datepicker-cell.-day-:not(.-other-month-)').first().waitFor({ state: 'visible' })
  await a11y('ds-date')
})
