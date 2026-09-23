import { test } from '@baloise/ds-playwright'

test('default', async ({ page, a11y }) => {
  await page.mount(`<ds-file-upload label="Upload"></ds-file-upload>`)
  await a11y('ds-file-upload')
})

test('with description', async ({ page, a11y }) => {
  await page.mount(`<ds-file-upload label="Upload" description="Maximum file size: 5MB"></ds-file-upload>`)
  await a11y('ds-file-upload')
})

test('with invalid text', async ({ page, a11y }) => {
  await page.mount(`<ds-file-upload label="Upload" invalid invalid-text="Error message"></ds-file-upload>`)
  await a11y('ds-file-upload')
})

test('required', async ({ page, a11y }) => {
  await page.mount(`<ds-file-upload label="Upload" required></ds-file-upload>`)
  await a11y('ds-file-upload')
})

test('disabled', async ({ page, a11y }) => {
  await page.mount(`<ds-file-upload label="Upload" disabled></ds-file-upload>`)
  await a11y('ds-file-upload')
})

test('readonly', async ({ page, a11y }) => {
  await page.mount(`<ds-file-upload label="Upload" readonly></ds-file-upload>`)
  await a11y('ds-file-upload')
})

test('loading', async ({ page, a11y }) => {
  await page.mount(`<ds-file-upload label="Upload" loading></ds-file-upload>`)
  await a11y('ds-file-upload')
})

test('without file list', async ({ page, a11y }) => {
  await page.mount(`<ds-file-upload label="Upload" has-file-list="false"></ds-file-upload>`)
  await a11y('ds-file-upload')
})

test('single file', async ({ page, a11y }) => {
  await page.mount(`<ds-file-upload label="Upload" multiple="false"></ds-file-upload>`)
  await a11y('ds-file-upload')
})

test('color success', async ({ page, a11y }) => {
  await page.mount(`<ds-file-upload label="Upload" color="success"></ds-file-upload>`)
  await a11y('ds-file-upload')
})

test('color warning', async ({ page, a11y }) => {
  await page.mount(`<ds-file-upload label="Upload" color="warning"></ds-file-upload>`)
  await a11y('ds-file-upload')
})

test('color danger', async ({ page, a11y }) => {
  await page.mount(`<ds-file-upload label="Upload" color="danger"></ds-file-upload>`)
  await a11y('ds-file-upload')
})
