import { test } from '@baloise/ds-playwright'

test.describe('basic', () => {
  test('basic', async ({ page, a11y }) => {
    await page.mount(`
      <bal-field>
        <bal-field-label>Basic Label</bal-field-label>
        <bal-field-control>
          <bal-radio-group value="1">
            <bal-radio name="radio-example" value="1">Label 1</bal-radio>
            <bal-radio name="radio-example" value="2">Label 2</bal-radio>
            <bal-radio name="radio-example" value="3">Label 2</bal-radio>
          </bal-radio-group>
        </bal-field-control>
        <bal-field-message>Basic Message</bal-field-message>
      </bal-field>
    `)
    await a11y('bal-field')
  })

  test('basic-label-hidden', async ({ page, a11y }) => {
    await page.mount(`
      <bal-field>
        <bal-field-label>Label Hidden</bal-field-label>
        <bal-field-control>
          <bal-radio-group value="1">
            <bal-radio name="radio-example" value="1" label-hidden>Label 1</bal-radio>
            <bal-radio name="radio-example" value="2" label-hidden>Label 2</bal-radio>
            <bal-radio name="radio-example" value="3" label-hidden>Label 2</bal-radio>
          </bal-radio-group>
        </bal-field-control>
        <bal-field-message>Label Hidden Message</bal-field-message>
      </bal-field>
    `)
    await a11y('bal-field')
  })

  test('disabled', async ({ page, a11y }) => {
    await page.mount(`
      <bal-field disabled>
        <bal-field-label>Disabled Label</bal-field-label>
        <bal-field-control>
          <bal-radio-group value="1">
            <bal-radio name="radio-example" value="1" disabled>Label 1</bal-radio>
            <bal-radio name="radio-example" value="2" disabled>Label 2</bal-radio>
            <bal-radio name="radio-example" value="3" disabled>Label 2</bal-radio>
          </bal-radio-group>
        </bal-field-control>
        <bal-field-message>Disabled Message</bal-field-message>
      </bal-field>
    `)
    await a11y('bal-field')
  })

  test('invalid', async ({ page, a11y }) => {
    await page.mount(`
        <bal-field invalid>
          <bal-field-label>Invalid Label</bal-field-label>
          <bal-field-control>
            <bal-radio-group value="1">
              <bal-radio name="radio-example" value="1" invalid>Label 1</bal-radio>
              <bal-radio name="radio-example" value="2" invalid>Label 2</bal-radio>
              <bal-radio name="radio-example" value="3" invalid>Label 2</bal-radio>
            </bal-radio-group>
          </bal-field-control>
          <bal-field-message>Invalid Message</bal-field-message>
        </bal-field>
      `)
    await a11y('bal-field')
  })
})

test.describe('select-button', () => {
  test('basic', async ({ page, a11y }) => {
    await page.mount(`
      <bal-field>
        <bal-field-label>Button Basic Label</bal-field-label>
        <bal-field-control>
          <bal-radio-group interface="button" value="yes">
            <bal-radio name="button-example" value="yes">Yes</bal-radio>
            <bal-radio name="button-example" value="no">No</bal-radio>
          </bal-radio-group>
        </bal-field-control>
        <bal-field-message>Button Basic Message</bal-field-message>
      </bal-field>
    `)
    await a11y('bal-field')
  })

  test('invalid', async ({ page, a11y }) => {
    await page.mount(`
      <bal-field invalid>
        <bal-field-label>Button Invalid Label</bal-field-label>
        <bal-field-control>
          <bal-radio-group interface="button" value="yes" invalid>
            <bal-radio name="button-example" value="yes">Yes</bal-radio>
            <bal-radio name="button-example" value="no">No</bal-radio>
          </bal-radio-group>
        </bal-field-control>
        <bal-field-message>Button Invalid Message</bal-field-message>
      </bal-field>
    `)
    await a11y('bal-field')
  })

  test('disabled', async ({ page, a11y }) => {
    await page.mount(`
      <bal-field disabled>
        <bal-field-label>Button Disabled Label</bal-field-label>
        <bal-field-control>
          <bal-radio-group interface="button" value="yes" disabled>
            <bal-radio name="button-example" value="yes">Yes</bal-radio>
            <bal-radio name="button-example" value="no">No</bal-radio>
          </bal-radio-group>
        </bal-field-control>
        <bal-field-message>Button Disabled Message</bal-field-message>
      </bal-field>
    `)
    await a11y('bal-field')
  })
})
