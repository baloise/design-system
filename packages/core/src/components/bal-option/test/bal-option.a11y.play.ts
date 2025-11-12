import { test } from '@baloise/ds-playwright'

test('basic', async ({ page, a11y }) => {
  await page.mount(`
    <bal-option value="BlackWidow" label="Black Widow">
      <b style="display: block">Black Widow</b>
      <span>S.H.I.E.L.D.</span>
    </bal-option>
    `)
  await a11y('bal-option')
})

test('focused', async ({ page, a11y }) => {
  await page.mount(`<bal-option focused value="Focused" label="Focused">Focused</bal-option>`)
  await a11y('bal-option')
})

test('selected', async ({ page, a11y }) => {
  await page.mount(`<bal-option selected value="Selected" label="Selected">Selected</bal-option>`)
  await a11y('bal-option')
})

test('invalid', async ({ page, a11y }) => {
  await page.mount(`<bal-option invalid value="Invalid" label="Invalid">Invalid</bal-option>`)
  await a11y('bal-option')
})

test('disabled', async ({ page, a11y }) => {
  await page.mount(`<bal-option disabled value="Disabled" label="Disabled">Disabled</bal-option>`)
  await a11y('bal-option')
})
