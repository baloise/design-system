import { test } from '@baloise/ds-playwright'

const PANELS = `
  <ds-step name="a" label="Cart"></ds-step>
  <ds-step name="b" label="Shipping"></ds-step>
  <ds-step name="c" label="Payment"></ds-step>
  <ds-step-panel for="a">Content A</ds-step-panel>
  <ds-step-panel for="b">Content B</ds-step-panel>
  <ds-step-panel for="c">Content C</ds-step-panel>
`

test.describe('a11y — panels variant', () => {
  test('basic', async ({ page, a11y }) => {
    await page.mount(`<ds-steps>${PANELS}</ds-steps>`)
    await a11y('ds-steps')
  })

  test('preset value', async ({ page, a11y }) => {
    await page.mount(`<ds-steps value="b">${PANELS}</ds-steps>`)
    await a11y('ds-steps')
  })

  test('vertical', async ({ page, a11y }) => {
    await page.mount(`<ds-steps vertical>${PANELS}</ds-steps>`)
    await a11y('ds-steps')
  })

  test('with done and invalid steps', async ({ page, a11y }) => {
    await page.mount(`
      <ds-steps value="c">
        <ds-step name="a" label="Cart" done></ds-step>
        <ds-step name="b" label="Shipping" invalid></ds-step>
        <ds-step name="c" label="Payment"></ds-step>
        <ds-step-panel for="a">Content A</ds-step-panel>
        <ds-step-panel for="b">Content B</ds-step-panel>
        <ds-step-panel for="c">Content C</ds-step-panel>
      </ds-steps>
    `)
    await a11y('ds-steps')
  })

  test('with disabled step', async ({ page, a11y }) => {
    await page.mount(`
      <ds-steps>
        <ds-step name="a" label="Cart"></ds-step>
        <ds-step name="b" label="Shipping" disabled></ds-step>
        <ds-step name="c" label="Payment"></ds-step>
        <ds-step-panel for="a">Content A</ds-step-panel>
        <ds-step-panel for="b">Content B</ds-step-panel>
        <ds-step-panel for="c">Content C</ds-step-panel>
      </ds-steps>
    `)
    await a11y('ds-steps')
  })
})

test.describe('a11y — navigation variant', () => {
  test('basic', async ({ page, a11y }) => {
    await page.mount(`
      <ds-steps label="Checkout steps">
        <ds-step name="first" label="Cart"><a href="/first" aria-current="step">Cart</a></ds-step>
        <ds-step name="second" label="Shipping"><a href="/second">Shipping</a></ds-step>
        <ds-step name="third" label="Payment"><a href="/third">Payment</a></ds-step>
      </ds-steps>
    `)
    await a11y('ds-steps')
  })

  test('vertical', async ({ page, a11y }) => {
    await page.mount(`
      <ds-steps label="Checkout steps" vertical>
        <ds-step name="first" label="Cart"><a href="/first" aria-current="step">Cart</a></ds-step>
        <ds-step name="second" label="Shipping"><a href="/second">Shipping</a></ds-step>
      </ds-steps>
    `)
    await a11y('ds-steps')
  })
})
