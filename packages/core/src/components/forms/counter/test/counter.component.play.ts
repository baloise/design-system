import { DsCounter, expect, test } from '@baloise/ds-playwright'

test.describe('events', () => {
  test('fires dsInput, dsChange, dsIncrease on increase click', async ({ page }) => {
    await page.mount(`<ds-counter label="Label" value="3"></ds-counter>`)
    const counter = new DsCounter(page.locator('ds-counter'))
    const inputSpy = await counter.el.spyOnEvent('dsInput')
    const changeSpy = await counter.el.spyOnEvent('dsChange')
    const increaseSpy = await counter.el.spyOnEvent('dsIncrease')
    const decreaseSpy = await counter.el.spyOnEvent('dsDecrease')

    await counter.increase()

    expect(inputSpy).toHaveReceivedEventTimes(1)
    expect(inputSpy).toHaveReceivedEventDetail(4)
    expect(changeSpy).toHaveReceivedEventTimes(1)
    expect(changeSpy).toHaveReceivedEventDetail(4)
    expect(increaseSpy).toHaveReceivedEventTimes(1)
    expect(increaseSpy).toHaveReceivedEventDetail(4)
    expect(decreaseSpy).toHaveReceivedEventTimes(0)
  })

  test('fires dsInput, dsChange, dsDecrease on decrease click', async ({ page }) => {
    await page.mount(`<ds-counter label="Label" value="3"></ds-counter>`)
    const counter = new DsCounter(page.locator('ds-counter'))
    const inputSpy = await counter.el.spyOnEvent('dsInput')
    const changeSpy = await counter.el.spyOnEvent('dsChange')
    const decreaseSpy = await counter.el.spyOnEvent('dsDecrease')
    const increaseSpy = await counter.el.spyOnEvent('dsIncrease')

    await counter.decrease()

    expect(inputSpy).toHaveReceivedEventTimes(1)
    expect(inputSpy).toHaveReceivedEventDetail(2)
    expect(changeSpy).toHaveReceivedEventTimes(1)
    expect(changeSpy).toHaveReceivedEventDetail(2)
    expect(decreaseSpy).toHaveReceivedEventTimes(1)
    expect(decreaseSpy).toHaveReceivedEventDetail(2)
    expect(increaseSpy).toHaveReceivedEventTimes(0)
  })
})

test.describe('boundaries', () => {
  test('does not emit when clicking increase at max', async ({ page }) => {
    await page.mount(`<ds-counter label="Label" value="10" min="0" max="10"></ds-counter>`)
    const counter = new DsCounter(page.locator('ds-counter'))
    const changeSpy = await counter.el.spyOnEvent('dsChange')

    await expect(counter.increaseButton).toHaveAttribute('disabled', '')
    expect(changeSpy).toHaveReceivedEventTimes(0)
    await counter.assertValue('10')
  })

  test('does not emit when clicking decrease at min', async ({ page }) => {
    await page.mount(`<ds-counter label="Label" value="0" min="0" max="10"></ds-counter>`)
    const counter = new DsCounter(page.locator('ds-counter'))
    const changeSpy = await counter.el.spyOnEvent('dsChange')

    await expect(counter.decreaseButton).toHaveAttribute('disabled', '')
    expect(changeSpy).toHaveReceivedEventTimes(0)
    await counter.assertValue('0')
  })

  test('clamps out-of-range value to max on connect', async ({ page }) => {
    await page.mount(`<ds-counter label="Label" value="42" min="0" max="10"></ds-counter>`)
    const counter = new DsCounter(page.locator('ds-counter'))

    await counter.assertValue('10')
  })

  test('clamps an out-of-range value assigned at runtime to max', async ({ page }) => {
    await page.mount(`<ds-counter label="Label" value="3" min="0" max="10"></ds-counter>`)
    const counter = new DsCounter(page.locator('ds-counter'))

    await counter.el.evaluate(el => {
      ;(el as any).value = 9999
    })
    await page.waitForChanges()

    await counter.assertValue('10')
  })
})

test.describe('empty value assigned at runtime', () => {
  // A counter can never be empty (see the `value` prop doc): unlike the out-of-range-at-mount case above,
  // this covers a framework binding writing an empty value onto an already-connected instance — e.g.
  // Angular's `FormControl.reset()`, which calls `writeValue(null)` straight through onto the `value`
  // property.
  for (const emptyValue of ['null', 'undefined', 'NaN']) {
    test(`resolves ${emptyValue} to min`, async ({ page }) => {
      await page.mount(`<ds-counter label="Label" min="2" max="10" value="5"></ds-counter>`)
      const counter = new DsCounter(page.locator('ds-counter'))

      await counter.el.evaluate((el, value) => {
        ;(el as any).value = value === 'null' ? null : value === 'undefined' ? undefined : Number.NaN
      }, emptyValue)
      await page.waitForChanges()

      await counter.assertValue('2')
    })
  }
})

test.describe('decimal precision', () => {
  test('three increases of 0.1 from 0 land exactly on 0.3', async ({ page }) => {
    await page.mount(`<ds-counter label="Label" value="0" min="0" max="1" step="0.1"></ds-counter>`)
    const counter = new DsCounter(page.locator('ds-counter'))

    await counter.increase()
    await counter.increase()
    await counter.increase()

    await counter.assertValue('0.3')
  })
})

test.describe('disabled', () => {
  test('does not emit when disabled', async ({ page }) => {
    await page.mount(`<ds-counter label="Label" value="5" disabled></ds-counter>`)
    const counter = new DsCounter(page.locator('ds-counter'))
    const changeSpy = await counter.el.spyOnEvent('dsChange')

    await counter.assertToBeDisabled()
    expect(changeSpy).toHaveReceivedEventTimes(0)
  })
})

test.describe('readonly', () => {
  test('does not emit when readonly', async ({ page }) => {
    await page.mount(`<ds-counter label="Label" value="5" readonly></ds-counter>`)
    const counter = new DsCounter(page.locator('ds-counter'))
    const changeSpy = await counter.el.spyOnEvent('dsChange')

    await counter.assertToBeDisabled()
    expect(changeSpy).toHaveReceivedEventTimes(0)
  })
})

test.describe('keyboard', () => {
  test('ArrowUp increases the value', async ({ page }) => {
    await page.mount(`<ds-counter label="Label" value="3"></ds-counter>`)
    const counter = new DsCounter(page.locator('ds-counter'))
    await counter.increaseButton.evaluate(el => (el.shadowRoot?.querySelector('button') as HTMLElement)?.focus())

    await page.keyboard.press('ArrowUp')
    await page.waitForChanges()

    await counter.assertValue('4')
  })

  test('ArrowDown decreases the value', async ({ page }) => {
    await page.mount(`<ds-counter label="Label" value="3"></ds-counter>`)
    const counter = new DsCounter(page.locator('ds-counter'))
    await counter.increaseButton.evaluate(el => (el.shadowRoot?.querySelector('button') as HTMLElement)?.focus())

    await page.keyboard.press('ArrowDown')
    await page.waitForChanges()

    await counter.assertValue('2')
  })
})

test.describe('focus coalescing', () => {
  test('does not emit dsBlur when tabbing between the two buttons', async ({ page }) => {
    await page.mount(`<ds-counter label="Label" value="3"></ds-counter>`)
    const counter = new DsCounter(page.locator('ds-counter'))
    const focusSpy = await counter.el.spyOnEvent('dsFocus')
    const blurSpy = await counter.el.spyOnEvent('dsBlur')

    await counter.decreaseButton.evaluate(el => (el.shadowRoot?.querySelector('button') as HTMLElement)?.focus())
    await page.keyboard.press('Tab')
    await page.waitForChanges()

    expect(focusSpy).toHaveReceivedEventTimes(2)
    expect(blurSpy).toHaveReceivedEventTimes(0)
  })

  test('emits dsBlur once when focus leaves the widget entirely', async ({ page }) => {
    await page.mount(`
      <ds-counter label="Label" value="3"></ds-counter>
      <button data-testid="outside">Outside</button>
    `)
    const counter = new DsCounter(page.locator('ds-counter'))
    const blurSpy = await counter.el.spyOnEvent('dsBlur')

    await counter.increaseButton.evaluate(el => (el.shadowRoot?.querySelector('button') as HTMLElement)?.focus())
    await page.getByTestId('outside').focus()
    await page.waitForChanges()

    expect(blurSpy).toHaveReceivedEventTimes(1)
  })
})

test.describe('form reset', () => {
  test('resets to initial value', async ({ page }) => {
    await page.mount(`
      <form>
        <ds-counter name="quantity" label="Quantity" value="3"></ds-counter>
        <button type="reset" data-testid="reset">Reset</button>
      </form>
    `)
    const counter = new DsCounter(page.locator('ds-counter'))

    await counter.increase()
    await counter.increase()
    await counter.assertValue('5')

    await page.getByTestId('reset').click()
    await page.waitForChanges()
    await counter.assertValue('3')
  })
})
