import { test } from '@baloise/ds-playwright'

test('basic', async ({ page, a11y }) => {
  await page.mount(`
    <bal-field>
      <bal-field-label>Firstname</bal-field-label>
      <bal-field-control>
        <bal-input placeholder="Basic"></bal-input>
      </bal-field-control>
      <bal-field-message color="hint">Field Message</bal-field-message>
    </bal-field>
  `)
  await a11y('bal-field')
})

test('disabled', async ({ page, a11y }) => {
  await page.mount(`
    <bal-field disabled>
      <bal-field-label>Firstname</bal-field-label>
      <bal-field-control>
        <bal-input placeholder="Basic"></bal-input>
      </bal-field-control>
      <bal-field-message color="hint">Field Message</bal-field-message>
    </bal-field>
  `)
  await a11y('bal-field')
})

test('invalid', async ({ page, a11y }) => {
  await page.mount(`
    <bal-field invalid>
      <bal-field-label>Firstname</bal-field-label>
      <bal-field-control>
        <bal-input placeholder="Basic"></bal-input>
      </bal-field-control>
      <bal-field-message color="hint">Field Message</bal-field-message>
    </bal-field>
  `)
  await a11y('bal-field')
})

test('horizontal', async ({ page, a11y }) => {
  await page.mount(`
    <bal-field horizontal>
      <bal-field-label>Firstname</bal-field-label>
      <bal-field-control>
        <bal-input placeholder="Basic"></bal-input>
      </bal-field-control>
      <bal-field-message color="hint">Field Message</bal-field-message>
    </bal-field>
  `)
  await a11y('bal-field')
})
