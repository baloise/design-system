import { test } from '@baloise/ds-playwright'

test.describe('basic', () => {
  test('basic', async ({ page, a11y }) => {
    await page.mount(`
    <bal-field>
      <bal-field-label>Basic Label</bal-field-label>
      <bal-field-control>
        <bal-checkbox>Basic Label 1</bal-checkbox>
      </bal-field-control>
      <bal-field-message>Basic Message</bal-field-message>
    </bal-field>
  `)
    await a11y('bal-field')
  })

  test('group', async ({ page, a11y }) => {
    await page.mount(`
    <bal-field>
      <bal-field-label>Basic Group Label</bal-field-label>
      <bal-field-control>
        <bal-checkbox-group>
          <bal-checkbox>Basic Group 1</bal-checkbox>
          <bal-checkbox>Basic Group 2</bal-checkbox>
          <bal-checkbox>Basic Group 3</bal-checkbox>
        </bal-checkbox-group>
      </bal-field-control>
      <bal-field-message>Basic Group Message</bal-field-message>
    </bal-field>
  `)
    await a11y('bal-field')
  })

  test('checked', async ({ page, a11y }) => {
    await page.mount(`
    <bal-field>
      <bal-field-label>Checked Label</bal-field-label>
      <bal-field-control>
        <bal-checkbox-group>
          <bal-checkbox value="true">Checked</bal-checkbox>
        </bal-checkbox-group>
      </bal-field-control>
      <bal-field-message>Checked Message</bal-field-message>
    </bal-field>
  `)
    await a11y('bal-field')
  })

  test('label-hidden', async ({ page, a11y }) => {
    await page.mount(`
    <bal-field>
      <bal-field-label>Label Hidden</bal-field-label>
      <bal-field-control>
        <bal-checkbox-group>
          <bal-checkbox label-hidden>Label hidden</bal-checkbox>
        </bal-checkbox-group>
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
        <bal-checkbox-group>
          <bal-checkbox disabled>Disabled</bal-checkbox>
        </bal-checkbox-group>
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
        <bal-checkbox-group>
          <bal-checkbox invalid>Invalid</bal-checkbox>
        </bal-checkbox-group>
      </bal-field-control>
      <bal-field-message>Invalid Message</bal-field-message>
    </bal-field>
  `)
    await a11y('bal-field')
  })
})

test.describe('select-buttons', () => {
  test('basic', async ({ page, a11y }) => {
    await page.mount(`
    <bal-field>
      <bal-field-label>Basic Label</bal-field-label>
      <bal-field-control>
        <bal-checkbox interface="button">Basic Label 1</bal-checkbox>
      </bal-field-control>
      <bal-field-message>Basic Message</bal-field-message>
    </bal-field>
  `)
    await a11y('bal-field')
  })

  test('group', async ({ page, a11y }) => {
    await page.mount(`
    <bal-field>
      <bal-field-label>Basic Group Label</bal-field-label>
      <bal-field-control>
        <bal-checkbox-group interface="button">
          <bal-checkbox>Basic Group 1</bal-checkbox>
          <bal-checkbox>Basic Group 2</bal-checkbox>
          <bal-checkbox>Basic Group 3</bal-checkbox>
        </bal-checkbox-group>
      </bal-field-control>
      <bal-field-message>Basic Group Message</bal-field-message>
    </bal-field>
  `)
    await a11y('bal-field')
  })

  test('checked', async ({ page, a11y }) => {
    await page.mount(`
    <bal-field>
      <bal-field-label>Checked Label</bal-field-label>
      <bal-field-control>
        <bal-checkbox-group interface="button">
          <bal-checkbox value="true">Checked</bal-checkbox>
        </bal-checkbox-group>
      </bal-field-control>
      <bal-field-message>Checked Message</bal-field-message>
    </bal-field>
  `)
    await a11y('bal-field')
  })

  test('label-hidden', async ({ page, a11y }) => {
    await page.mount(`
    <bal-field>
      <bal-field-label>Label Hidden</bal-field-label>
      <bal-field-control>
        <bal-checkbox-group interface="button">
          <bal-checkbox label-hidden>Label hidden</bal-checkbox>
        </bal-checkbox-group>
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
        <bal-checkbox-group interface="button">
          <bal-checkbox disabled>Disabled</bal-checkbox>
        </bal-checkbox-group>
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
        <bal-checkbox-group interface="button">
          <bal-checkbox invalid>Invalid</bal-checkbox>
        </bal-checkbox-group>
      </bal-field-control>
      <bal-field-message>Invalid Message</bal-field-message>
    </bal-field>
  `)
    await a11y('bal-field')
  })
})

test.describe('switch', () => {
  test('basic', async ({ page, a11y }) => {
    await page.mount(`
    <bal-field>
      <bal-field-label>Basic Label</bal-field-label>
      <bal-field-control>
        <bal-checkbox interface="switch">Basic Label 1</bal-checkbox>
      </bal-field-control>
      <bal-field-message>Basic Message</bal-field-message>
    </bal-field>
  `)
    await a11y('bal-field')
  })

  test('group', async ({ page, a11y }) => {
    await page.mount(`
    <bal-field>
      <bal-field-label>Basic Group Label</bal-field-label>
      <bal-field-control>
        <bal-checkbox-group interface="switch">
          <bal-checkbox>Basic Group 1</bal-checkbox>
          <bal-checkbox>Basic Group 2</bal-checkbox>
          <bal-checkbox>Basic Group 3</bal-checkbox>
        </bal-checkbox-group>
      </bal-field-control>
      <bal-field-message>Basic Group Message</bal-field-message>
    </bal-field>
  `)
    await a11y('bal-field')
  })

  test('checked', async ({ page, a11y }) => {
    await page.mount(`
    <bal-field>
      <bal-field-label>Checked Label</bal-field-label>
      <bal-field-control>
        <bal-checkbox-group interface="switch">
          <bal-checkbox value="true">Checked</bal-checkbox>
        </bal-checkbox-group>
      </bal-field-control>
      <bal-field-message>Checked Message</bal-field-message>
    </bal-field>
  `)
    await a11y('bal-field')
  })

  test('label-hidden', async ({ page, a11y }) => {
    await page.mount(`
    <bal-field>
      <bal-field-label>Label Hidden</bal-field-label>
      <bal-field-control>
        <bal-checkbox-group interface="switch">
          <bal-checkbox label-hidden>Label hidden</bal-checkbox>
        </bal-checkbox-group>
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
        <bal-checkbox-group interface="switch">
          <bal-checkbox disabled>Disabled</bal-checkbox>
        </bal-checkbox-group>
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
        <bal-checkbox-group interface="switch">
          <bal-checkbox invalid>Invalid</bal-checkbox>
        </bal-checkbox-group>
      </bal-field-control>
      <bal-field-message>Invalid Message</bal-field-message>
    </bal-field>
  `)
    await a11y('bal-field')
  })
})
