import { DsSteps, expect, test } from '@baloise/ds-playwright'

const PANELS = `
  <ds-step name="a" label="Cart"></ds-step>
  <ds-step name="b" label="Shipping"></ds-step>
  <ds-step name="c" label="Payment"></ds-step>
  <ds-step-panel for="a">Content A</ds-step-panel>
  <ds-step-panel for="b">Content B</ds-step-panel>
  <ds-step-panel for="c">Content C</ds-step-panel>
`

test.describe('panels variant — initial state', () => {
  test('selects the first step by default', async ({ page }) => {
    await page.mount(`<ds-steps>${PANELS}</ds-steps>`)
    const steps = new DsSteps(page.locator('ds-steps'))

    await steps.assertStepSelected('a')
    await steps.assertPanelVisible('a')
    await steps.assertPanelHidden('b')
    await steps.assertPanelHidden('c')
  })

  test('respects a preset value prop', async ({ page }) => {
    await page.mount(`<ds-steps value="b">${PANELS}</ds-steps>`)
    const steps = new DsSteps(page.locator('ds-steps'))

    await steps.assertStepSelected('b')
    await steps.assertPanelHidden('a')
    await steps.assertPanelVisible('b')
  })

  test('skips disabled step when auto-selecting', async ({ page }) => {
    await page.mount(`
      <ds-steps>
        <ds-step name="a" label="Cart" disabled></ds-step>
        <ds-step name="b" label="Shipping"></ds-step>
        <ds-step name="c" label="Payment"></ds-step>
        <ds-step-panel for="a">Content A</ds-step-panel>
        <ds-step-panel for="b">Content B</ds-step-panel>
        <ds-step-panel for="c">Content C</ds-step-panel>
      </ds-steps>
    `)
    const steps = new DsSteps(page.locator('ds-steps'))

    await steps.assertStepSelected('b')
  })
})

test.describe('panels variant — interaction', () => {
  test('clicking a step shows its panel and hides the others', async ({ page }) => {
    await page.mount(`<ds-steps>${PANELS}</ds-steps>`)
    const steps = new DsSteps(page.locator('ds-steps'))

    await steps.selectStep('b')

    await steps.assertStepSelected('b')
    await steps.assertStepNotSelected('a')
    await steps.assertPanelVisible('b')
    await steps.assertPanelHidden('a')
    await steps.assertPanelHidden('c')
  })

  test('clicking the already selected step does not emit dsChange', async ({ page }) => {
    await page.mount(`<ds-steps>${PANELS}</ds-steps>`)
    const steps = new DsSteps(page.locator('ds-steps'))
    const spy = await steps.el.spyOnEvent('dsChange')

    await steps.selectStep('a')

    expect(spy).toHaveReceivedEventTimes(0)
  })

  test('clicking a disabled step does nothing', async ({ page }) => {
    await page.mount(`
      <ds-steps>
        <ds-step name="a" label="Cart"></ds-step>
        <ds-step name="b" label="Shipping" disabled></ds-step>
        <ds-step-panel for="a">Content A</ds-step-panel>
        <ds-step-panel for="b">Content B</ds-step-panel>
      </ds-steps>
    `)
    const steps = new DsSteps(page.locator('ds-steps'))
    const spy = await steps.el.spyOnEvent('dsChange')

    await steps.selectStep('b')

    expect(spy).toHaveReceivedEventTimes(0)
    await steps.assertStepSelected('a')
  })
})

test.describe('panels variant — dsChange event', () => {
  test('emits dsChange with the selected step name', async ({ page }) => {
    await page.mount(`<ds-steps>${PANELS}</ds-steps>`)
    const steps = new DsSteps(page.locator('ds-steps'))
    const spy = await steps.el.spyOnEvent('dsChange')

    await steps.selectStep('b')

    expect(spy).toHaveReceivedEventTimes(1)
    expect(spy).toHaveReceivedEventDetail({ value: 'b' })
  })

  test('emits dsChange on each step switch', async ({ page }) => {
    await page.mount(`<ds-steps>${PANELS}</ds-steps>`)
    const steps = new DsSteps(page.locator('ds-steps'))
    const spy = await steps.el.spyOnEvent('dsChange')

    await steps.selectStep('b')
    await steps.selectStep('c')

    expect(spy).toHaveReceivedEventTimes(2)
    expect(spy).toHaveReceivedEventDetail({ value: 'c' })
  })
})

test.describe('panels variant — keyboard navigation', () => {
  test('ArrowRight moves to the next step', async ({ page }) => {
    await page.mount(`<ds-steps>${PANELS}</ds-steps>`)
    const steps = new DsSteps(page.locator('ds-steps'))

    await steps.selectStep('a')
    await page.keyboard.press('ArrowRight')

    await steps.assertStepSelected('b')
  })

  test('ArrowLeft moves to the previous step', async ({ page }) => {
    await page.mount(`<ds-steps value="b">${PANELS}</ds-steps>`)
    const steps = new DsSteps(page.locator('ds-steps'))

    await steps.selectStep('b')
    await page.keyboard.press('ArrowLeft')

    await steps.assertStepSelected('a')
  })

  test('Home moves to the first step', async ({ page }) => {
    await page.mount(`<ds-steps value="c">${PANELS}</ds-steps>`)
    const steps = new DsSteps(page.locator('ds-steps'))

    await steps.selectStep('c')
    await page.keyboard.press('Home')

    await steps.assertStepSelected('a')
  })

  test('End moves to the last step', async ({ page }) => {
    await page.mount(`<ds-steps>${PANELS}</ds-steps>`)
    const steps = new DsSteps(page.locator('ds-steps'))

    await steps.selectStep('a')
    await page.keyboard.press('End')

    await steps.assertStepSelected('c')
  })

  test('ArrowRight wraps from last to first', async ({ page }) => {
    await page.mount(`<ds-steps value="c">${PANELS}</ds-steps>`)
    const steps = new DsSteps(page.locator('ds-steps'))

    await steps.selectStep('c')
    await page.keyboard.press('ArrowRight')

    await steps.assertStepSelected('a')
  })

  test('ArrowDown moves to next step in vertical mode', async ({ page }) => {
    await page.mount(`<ds-steps vertical>${PANELS}</ds-steps>`)
    const steps = new DsSteps(page.locator('ds-steps'))

    await steps.selectStep('a')
    await page.keyboard.press('ArrowDown')

    await steps.assertStepSelected('b')
  })
})

test.describe('navigation variant', () => {
  test('does not emit dsChange when links are clicked', async ({ page }) => {
    await page.mount(`
      <ds-steps label="Checkout">
        <ds-step name="first" label="Cart"><a href="/first" aria-current="step">Cart</a></ds-step>
        <ds-step name="second" label="Shipping"><a href="/second">Shipping</a></ds-step>
      </ds-steps>
    `)
    const steps = new DsSteps(page.locator('ds-steps'))
    const spy = await steps.el.spyOnEvent('dsChange')

    await steps.step('second').click()

    expect(spy).toHaveReceivedEventTimes(0)
  })

  test('marks the step with aria-current as selected', async ({ page }) => {
    await page.mount(`
      <ds-steps label="Checkout">
        <ds-step name="first" label="Cart"><a href="/first" aria-current="step">Cart</a></ds-step>
        <ds-step name="second" label="Shipping"><a href="/second">Shipping</a></ds-step>
      </ds-steps>
    `)
    const steps = new DsSteps(page.locator('ds-steps'))

    await steps.assertStepSelected('first')
    await steps.assertStepNotSelected('second')
  })
})
