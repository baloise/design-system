import { test } from '@baloise/ds-playwright'

const ITEMS = `
  <ds-segment-item value="apple" label="Apple"></ds-segment-item>
  <ds-segment-item value="strawberry" label="Strawberry"></ds-segment-item>
  <ds-segment-item value="banana" label="Banana"></ds-segment-item>
`

test('default', async ({ page, a11y }) => {
  await page.mount(`<ds-segment name="fruits" label="Fruits">${ITEMS}</ds-segment>`)
  await a11y('ds-segment')
})

test('with value', async ({ page, a11y }) => {
  await page.mount(`<ds-segment name="fruits" label="Fruits" value="apple">${ITEMS}</ds-segment>`)
  await a11y('ds-segment')
})

test('with description', async ({ page, a11y }) => {
  await page.mount(
    `<ds-segment name="fruits" label="Fruits" value="apple" description="Choose your favorite fruit">${ITEMS}</ds-segment>`,
  )
  await a11y('ds-segment')
})

test('disabled', async ({ page, a11y }) => {
  await page.mount(`<ds-segment name="fruits" label="Fruits" value="apple" disabled>${ITEMS}</ds-segment>`)
  await a11y('ds-segment')
})

test('invalid', async ({ page, a11y }) => {
  await page.mount(
    `<ds-segment name="fruits" label="Fruits" invalid invalid-text="Please select a fruit">${ITEMS}</ds-segment>`,
  )
  await a11y('ds-segment')
})

test('required', async ({ page, a11y }) => {
  await page.mount(`<ds-segment name="fruits" label="Fruits" required>${ITEMS}</ds-segment>`)
  await a11y('ds-segment')
})

test('vertical', async ({ page, a11y }) => {
  await page.mount(`<ds-segment name="fruits" label="Fruits" value="apple" vertical>${ITEMS}</ds-segment>`)
  await a11y('ds-segment')
})
