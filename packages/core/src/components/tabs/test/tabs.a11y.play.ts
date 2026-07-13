import { test } from '@baloise/ds-playwright'

const PANELS = `
  <ds-tab name="a">Tab A</ds-tab>
  <ds-tab name="b">Tab B</ds-tab>
  <ds-tab name="c">Tab C</ds-tab>
  <ds-tab-panel for="a">Content A</ds-tab-panel>
  <ds-tab-panel for="b">Content B</ds-tab-panel>
  <ds-tab-panel for="c">Content C</ds-tab-panel>
`

test.describe('a11y — panels variant', () => {
  test('basic', async ({ page, a11y }) => {
    await page.mount(`<ds-tabs>${PANELS}</ds-tabs>`)
    await a11y('ds-tabs')
  })

  test('preset value', async ({ page, a11y }) => {
    await page.mount(`<ds-tabs value="b">${PANELS}</ds-tabs>`)
    await a11y('ds-tabs')
  })

  test('vertical', async ({ page, a11y }) => {
    await page.mount(`<ds-tabs vertical>${PANELS}</ds-tabs>`)
    await a11y('ds-tabs')
  })

  test('fullwidth', async ({ page, a11y }) => {
    await page.mount(`<ds-tabs fullwidth>${PANELS}</ds-tabs>`)
    await a11y('ds-tabs')
  })
})

test.describe('a11y — navigation variant', () => {
  test('basic', async ({ page, a11y }) => {
    await page.mount(`
      <ds-tabs label="Page sections">
        <ds-tab name="first"><a href="/first" aria-current="page">First</a></ds-tab>
        <ds-tab name="second"><a href="/second">Second</a></ds-tab>
        <ds-tab name="third"><a href="/third">Third</a></ds-tab>
      </ds-tabs>
    `)
    await a11y('ds-tabs')
  })

  test('vertical', async ({ page, a11y }) => {
    await page.mount(`
      <ds-tabs label="Page sections" vertical>
        <ds-tab name="first"><a href="/first" aria-current="page">First</a></ds-tab>
        <ds-tab name="second"><a href="/second">Second</a></ds-tab>
      </ds-tabs>
    `)
    await a11y('ds-tabs')
  })

  test('no label', async ({ page, a11y }) => {
    await page.mount(`
      <ds-tabs>
        <ds-tab name="first"><a href="/first" aria-current="page">First</a></ds-tab>
        <ds-tab name="second"><a href="/second">Second</a></ds-tab>
      </ds-tabs>
    `)
    await a11y('ds-tabs')
  })
})
