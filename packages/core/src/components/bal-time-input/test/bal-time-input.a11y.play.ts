import { test } from '@baloise/ds-playwright'

test('basic', async ({ page, a11y }) => {
  await page.mount(`
    <bal-field>
      <bal-field-label required="true">CET</bal-field-label>
      <bal-field-control>
        <bal-time-input></bal-time-input>
      </bal-field-control>
      <bal-field-message color="hint">CET Field Message</bal-field-message>
    </bal-field>
    `)
  await a11y('bal-field')
})

test('with-value', async ({ page, a11y }) => {
  await page.mount(`
    <bal-field>
      <bal-field-label required="true">CST</bal-field-label>
      <bal-field-control>
        <bal-time-input value="01:00"></bal-time-input>
      </bal-field-control>
      <bal-field-message color="hint">CST Field Message</bal-field-message>
    </bal-field>
    `)
  await a11y('bal-field')
})

test('disabled', async ({ page, a11y }) => {
  await page.mount(`
    <bal-field disabled>
      <bal-field-label required="true">US</bal-field-label>
      <bal-field-control>
        <bal-time-input disabled></bal-time-input>
      </bal-field-control>
      <bal-field-message color="hint">US Field Message</bal-field-message>
    </bal-field>
    `)
  await a11y('bal-field')
})

test('invalid', async ({ page, a11y }) => {
  await page.mount(`
      <bal-field invalid>
        <bal-field-label required="true">GMT</bal-field-label>
        <bal-field-control>
          <bal-time-input invalid></bal-time-input>
        </bal-field-control>
        <bal-field-message color="hint">GMT Field Message</bal-field-message>
      </bal-field>
    `)
  await a11y('bal-field')
})
