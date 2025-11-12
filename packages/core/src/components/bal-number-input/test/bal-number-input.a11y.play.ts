import { test } from '@baloise/ds-playwright'

test('basic', async ({ page, a11y }) => {
  await page.mount(`
    <bal-field>
      <bal-field-label required="true">Zip code</bal-field-label>
      <bal-field-control>
        <bal-number-input placeholder="8000" name="basic"></bal-number-input>
      </bal-field-control>
      <bal-field-message color="hint">Zip Code Field Message</bal-field-message>
    </bal-field>
  `)
  await a11y('bal-field')
})

test('with value', async ({ page, a11y }) => {
  await page.mount(`
    <bal-field>
      <bal-field-label required="true">Street number</bal-field-label>
      <bal-field-control>
        <bal-number-input value="20" name="with-value"></bal-number-input>
      </bal-field-control>
      <bal-field-message color="hint">Street number Field Message</bal-field-message>
    </bal-field>
  `)
  await a11y('bal-field')
})

test('invalid', async ({ page, a11y }) => {
  await page.mount(`
    <bal-field invalid>
      <bal-field-label required="true">Phone Number</bal-field-label>
      <bal-field-control>
        <bal-number-input value="+41000000000" name="invalid" invalid></bal-number-input>
      </bal-field-control>
      <bal-field-message color="hint">Phone Number Field Message</bal-field-message>
    </bal-field>
  `)
  await a11y('bal-field')
})

test('disabled', async ({ page, a11y }) => {
  await page.mount(`
    <bal-field disabled>
      <bal-field-label required="true">Age</bal-field-label>
      <bal-field-control>
        <bal-number-input value="22" name="disabled" disabled></bal-number-input>
      </bal-field-control>
      <bal-field-message color="hint">Age Field Message</bal-field-message>
    </bal-field>
  `)
  await a11y('bal-field')
})
