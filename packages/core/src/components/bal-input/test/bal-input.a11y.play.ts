import { test } from '@baloise/ds-playwright'

test('basic', async ({ page, a11y }) => {
  await page.mount(`
    <bal-field>
      <bal-field-label required="true">Firstname</bal-field-label>
      <bal-field-control>
        <bal-input placeholder="Enter your firstname" name="basic"></bal-input>
      </bal-field-control>
      <bal-field-message color="hint">Firstname Field Message</bal-field-message>
    </bal-field>
  `)
  await a11y('bal-field')
})

test('with-value', async ({ page, a11y }) => {
  await page.mount(`
    <bal-field>
      <bal-field-label required="true">Lastname</bal-field-label>
      <bal-field-control>
        <bal-input value="Doe" name="with-value"></bal-input>
      </bal-field-control>
      <bal-field-message color="hint">Lastname Field Message</bal-field-message>
    </bal-field>
  `)
  await a11y('bal-field')
})

test('invalid', async ({ page, a11y }) => {
  await page.mount(`
    <bal-field>
      <bal-field-label required="true">Phone Number</bal-field-label>
      <bal-field-control>
        <bal-input value="+41000000000" name="invalid" invalid></bal-input>
      </bal-field-control>
      <bal-field-message color="hint">Phone Number Field Message</bal-field-message>
    </bal-field>
  `)
  await a11y('bal-field')
})

test('disabled', async ({ page, a11y }) => {
  await page.mount(`
    <bal-field>
      <bal-field-label required="true">Address</bal-field-label>
      <bal-field-control>
        <bal-input value="Obstgartenstrasse" name="disabled" disabled></bal-input>
      </bal-field-control>
      <bal-field-message color="hint">Address Field Message</bal-field-message>
    </bal-field>
  `)
  await a11y('bal-field')
})
