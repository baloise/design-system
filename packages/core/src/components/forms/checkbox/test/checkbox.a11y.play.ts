import { test } from '@baloise/ds-playwright'

test('default', async ({ page, a11y }) => {
  await page.mount(`<ds-checkbox value="on">Checkbox</ds-checkbox>`)
  await a11y('ds-checkbox')
})

test('checked', async ({ page, a11y }) => {
  await page.mount(`<ds-checkbox value="on" checked>Checkbox</ds-checkbox>`)
  await a11y('ds-checkbox')
})

test('disabled', async ({ page, a11y }) => {
  await page.mount(`<ds-checkbox value="on" disabled>Checkbox</ds-checkbox>`)
  await a11y('ds-checkbox')
})

test('invalid', async ({ page, a11y }) => {
  await page.mount(`<ds-checkbox value="on" invalid>Checkbox</ds-checkbox>`)
  await a11y('ds-checkbox')
})

test('required', async ({ page, a11y }) => {
  await page.mount(`<ds-checkbox value="on" required>Checkbox</ds-checkbox>`)
  await a11y('ds-checkbox')
})

test('label position left', async ({ page, a11y }) => {
  await page.mount(`<ds-checkbox value="on" label-position="left">Checkbox</ds-checkbox>`)
  await a11y('ds-checkbox')
})

test('group', async ({ page, a11y }) => {
  await page.mount(`
  <ds-checkbox-group control name="field" label="Label" description="Description">
    <ds-checkbox value="1">Radio 1</ds-checkbox>
    <ds-checkbox value="2">Radio 2</ds-checkbox>
  </ds-checkbox-group>`)
  await a11y('ds-checkbox-group')
})
