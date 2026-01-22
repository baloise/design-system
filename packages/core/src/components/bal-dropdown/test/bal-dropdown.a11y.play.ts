import { test, waitForChanges } from '@baloise/ds-playwright'

test('basic', async ({ page, a11y }) => {
  await page.mount(`
      <bal-field>
        <bal-field-label>Year</bal-field-label>
        <bal-field-control>
          <bal-dropdown value="v1988">
            <bal-option value="v1988" label="1988">1988</bal-option>
            <bal-option value="v1989" label="1989">1989</bal-option>
            <bal-option value="v1990" label="1990">1990</bal-option>
            <bal-option value="v1991" label="1991">1991</bal-option>
            <bal-option value="v1992" label="1992">1992</bal-option>
          </bal-dropdown>
        </bal-field-control>
      </bal-field>
    `)
  await a11y('bal-field')
})

test('selected', async ({ page, a11y }) => {
  await page.mount(`
      <bal-field>
        <bal-field-label>Year</bal-field-label>
        <bal-field-control>
          <bal-dropdown value="v1988" placeholder="Select Year">
            <bal-option value="v1988" label="1988">1988</bal-option>
            <bal-option value="v1989" label="1989">1989</bal-option>
            <bal-option value="v1990" label="1990">1990</bal-option>
            <bal-option value="v1991" label="1991">1991</bal-option>
            <bal-option value="v1992" label="1992">1992</bal-option>
          </bal-dropdown>
        </bal-field-control>
      </bal-field>
    `)

  const inputEl = page.locator('input[placeholder="Select Year"]')
  await inputEl.click()
  const optionEl = page.getByRole('option', { name: '1990' })
  await optionEl.click()
  await waitForChanges(page)
  await a11y('bal-field')
})
