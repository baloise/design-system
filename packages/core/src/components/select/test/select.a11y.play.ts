import { test } from '@baloise/ds-playwright'

test.describe('accessibility', () => {
  test('default', async ({ page, a11y }) => {
    await page.mount(`
      <ds-select label="Label" description="Description">
        <ds-select-option value="opt1">Option 1</ds-select-option>
        <ds-select-option value="opt2">Option 2</ds-select-option>
      </ds-select>
    `)
    await a11y('ds-select')
  })

  test('with value', async ({ page, a11y }) => {
    await page.mount(`
      <ds-select label="Label" value="opt2">
        <ds-select-option value="opt1">Option 1</ds-select-option>
        <ds-select-option value="opt2">Option 2</ds-select-option>
      </ds-select>
    `)
    await a11y('ds-select')
  })

  test('disabled', async ({ page, a11y }) => {
    await page.mount(`
      <ds-select label="Label" value="opt2" disabled>
        <ds-select-option value="opt1">Option 1</ds-select-option>
        <ds-select-option value="opt2">Option 2</ds-select-option>
      </ds-select>
    `)
    await a11y('ds-select')
  })

  test('readonly', async ({ page, a11y }) => {
    await page.mount(`
      <ds-select label="Label" value="opt2" readonly>
        <ds-select-option value="opt1">Option 1</ds-select-option>
        <ds-select-option value="opt2">Option 2</ds-select-option>
      </ds-select>
    `)
    await a11y('ds-select')
  })

  test('required', async ({ page, a11y }) => {
    await page.mount(`
      <ds-select label="Label" required>
        <ds-select-option value="opt1">Option 1</ds-select-option>
        <ds-select-option value="opt2">Option 2</ds-select-option>
      </ds-select>
    `)
    await a11y('ds-select')
  })

  test('invalid', async ({ page, a11y }) => {
    await page.mount(`
      <ds-select label="Label" value="opt2" invalid invalid-text="Validation Error">
        <ds-select-option value="opt1">Option 1</ds-select-option>
        <ds-select-option value="opt2">Option 2</ds-select-option>
      </ds-select>
    `)
    await a11y('ds-select')
  })

  test('success color', async ({ page, a11y }) => {
    await page.mount(`
      <ds-select label="Label" value="opt2" color="success">
        <ds-select-option value="opt1">Option 1</ds-select-option>
        <ds-select-option value="opt2">Option 2</ds-select-option>
      </ds-select>
    `)
    await a11y('ds-select')
  })

  test('warning color', async ({ page, a11y }) => {
    await page.mount(`
      <ds-select label="Label" value="opt2" color="warning">
        <ds-select-option value="opt1">Option 1</ds-select-option>
        <ds-select-option value="opt2">Option 2</ds-select-option>
      </ds-select>
    `)
    await a11y('ds-select')
  })

  test('danger color', async ({ page, a11y }) => {
    await page.mount(`
      <ds-select label="Label" value="opt2" color="danger">
        <ds-select-option value="opt1">Option 1</ds-select-option>
        <ds-select-option value="opt2">Option 2</ds-select-option>
      </ds-select>
    `)
    await a11y('ds-select')
  })

  test('long label and description', async ({ page, a11y }) => {
    await page.mount(`
      <ds-select
        label="Select with very long label that may wrap to multiple lines"
        description="This is a longer description that provides more context about what the user should select in this dropdown field"
      >
        <ds-select-option value="opt1">Option 1</ds-select-option>
        <ds-select-option value="opt2">Option 2</ds-select-option>
      </ds-select>
    `)
    await a11y('ds-select')
  })

  test('many options', async ({ page, a11y }) => {
    const options = Array.from(
      { length: 20 },
      (_, i) => `<ds-select-option value="opt${i}">Option ${i}</ds-select-option>`,
    ).join('')
    await page.mount(`
      <ds-select label="Label with many options" description="Scroll through options">
        ${options}
      </ds-select>
    `)
    await a11y('ds-select')
  })
})
