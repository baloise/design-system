import { DsInputStepper, expect, test } from '@baloise/ds-playwright'

test.describe('events', () => {
  test('fires dsInput, dsChange, dsIncrease on increase click', async ({ page }) => {
    await page.mount(`<ds-input-stepper label="Label" value="3"></ds-input-stepper>`)
    const stepper = new DsInputStepper(page.locator('ds-input-stepper'))
    const inputSpy = await stepper.el.spyOnEvent('dsInput')
    const changeSpy = await stepper.el.spyOnEvent('dsChange')
    const increaseSpy = await stepper.el.spyOnEvent('dsIncrease')
    const decreaseSpy = await stepper.el.spyOnEvent('dsDecrease')

    await stepper.increase()

    expect(inputSpy).toHaveReceivedEventTimes(1)
    expect(inputSpy).toHaveReceivedEventDetail(4)
    expect(changeSpy).toHaveReceivedEventTimes(1)
    expect(changeSpy).toHaveReceivedEventDetail(4)
    expect(increaseSpy).toHaveReceivedEventTimes(1)
    expect(increaseSpy).toHaveReceivedEventDetail(4)
    expect(decreaseSpy).toHaveReceivedEventTimes(0)
  })

  test('fires dsInput, dsChange, dsDecrease on decrease click', async ({ page }) => {
    await page.mount(`<ds-input-stepper label="Label" value="3"></ds-input-stepper>`)
    const stepper = new DsInputStepper(page.locator('ds-input-stepper'))
    const inputSpy = await stepper.el.spyOnEvent('dsInput')
    const changeSpy = await stepper.el.spyOnEvent('dsChange')
    const decreaseSpy = await stepper.el.spyOnEvent('dsDecrease')
    const increaseSpy = await stepper.el.spyOnEvent('dsIncrease')

    await stepper.decrease()

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
    await page.mount(`<ds-input-stepper label="Label" value="10" min="0" max="10"></ds-input-stepper>`)
    const stepper = new DsInputStepper(page.locator('ds-input-stepper'))
    const changeSpy = await stepper.el.spyOnEvent('dsChange')

    await expect(stepper.increaseButton).toHaveAttribute('disabled', '')
    expect(changeSpy).toHaveReceivedEventTimes(0)
    await stepper.assertValue('10')
  })

  test('does not emit when clicking decrease at min', async ({ page }) => {
    await page.mount(`<ds-input-stepper label="Label" value="0" min="0" max="10"></ds-input-stepper>`)
    const stepper = new DsInputStepper(page.locator('ds-input-stepper'))
    const changeSpy = await stepper.el.spyOnEvent('dsChange')

    await expect(stepper.decreaseButton).toHaveAttribute('disabled', '')
    expect(changeSpy).toHaveReceivedEventTimes(0)
    await stepper.assertValue('0')
  })

  test('clamps out-of-range value to max on connect', async ({ page }) => {
    await page.mount(`<ds-input-stepper label="Label" value="42" min="0" max="10"></ds-input-stepper>`)
    const stepper = new DsInputStepper(page.locator('ds-input-stepper'))

    await stepper.assertValue('10')
  })
})

test.describe('decimal precision', () => {
  test('three increases of 0.1 from 0 land exactly on 0.3', async ({ page }) => {
    await page.mount(`<ds-input-stepper label="Label" value="0" min="0" max="1" step="0.1"></ds-input-stepper>`)
    const stepper = new DsInputStepper(page.locator('ds-input-stepper'))

    await stepper.increase()
    await stepper.increase()
    await stepper.increase()

    await stepper.assertValue('0.3')
  })
})

test.describe('disabled', () => {
  test('does not emit when disabled', async ({ page }) => {
    await page.mount(`<ds-input-stepper label="Label" value="5" disabled></ds-input-stepper>`)
    const stepper = new DsInputStepper(page.locator('ds-input-stepper'))
    const changeSpy = await stepper.el.spyOnEvent('dsChange')

    await stepper.assertToBeDisabled()
    expect(changeSpy).toHaveReceivedEventTimes(0)
  })
})

test.describe('readonly', () => {
  test('does not emit when readonly', async ({ page }) => {
    await page.mount(`<ds-input-stepper label="Label" value="5" readonly></ds-input-stepper>`)
    const stepper = new DsInputStepper(page.locator('ds-input-stepper'))
    const changeSpy = await stepper.el.spyOnEvent('dsChange')

    await stepper.assertToBeDisabled()
    expect(changeSpy).toHaveReceivedEventTimes(0)
  })
})

test.describe('keyboard', () => {
  test('ArrowUp increases the value', async ({ page }) => {
    await page.mount(`<ds-input-stepper label="Label" value="3"></ds-input-stepper>`)
    const stepper = new DsInputStepper(page.locator('ds-input-stepper'))
    await stepper.increaseButton.focus()

    await page.keyboard.press('ArrowUp')
    await page.waitForChanges()

    await stepper.assertValue('4')
  })

  test('ArrowDown decreases the value', async ({ page }) => {
    await page.mount(`<ds-input-stepper label="Label" value="3"></ds-input-stepper>`)
    const stepper = new DsInputStepper(page.locator('ds-input-stepper'))
    await stepper.increaseButton.focus()

    await page.keyboard.press('ArrowDown')
    await page.waitForChanges()

    await stepper.assertValue('2')
  })
})

test.describe('focus coalescing', () => {
  test('does not emit dsBlur when tabbing between the two buttons', async ({ page }) => {
    await page.mount(`<ds-input-stepper label="Label" value="3"></ds-input-stepper>`)
    const stepper = new DsInputStepper(page.locator('ds-input-stepper'))
    const focusSpy = await stepper.el.spyOnEvent('dsFocus')
    const blurSpy = await stepper.el.spyOnEvent('dsBlur')

    await stepper.decreaseButton.focus()
    await stepper.increaseButton.focus()
    await page.waitForChanges()

    expect(focusSpy).toHaveReceivedEventTimes(1)
    expect(blurSpy).toHaveReceivedEventTimes(0)
  })

  test('emits dsBlur once when focus leaves the widget entirely', async ({ page }) => {
    await page.mount(`
      <ds-input-stepper label="Label" value="3"></ds-input-stepper>
      <button data-testid="outside">Outside</button>
    `)
    const stepper = new DsInputStepper(page.locator('ds-input-stepper'))
    const blurSpy = await stepper.el.spyOnEvent('dsBlur')

    await stepper.increaseButton.focus()
    await page.getByTestId('outside').focus()
    await page.waitForChanges()

    expect(blurSpy).toHaveReceivedEventTimes(1)
  })
})

test.describe('form reset', () => {
  test('resets to initial value', async ({ page }) => {
    await page.mount(`
      <form>
        <ds-input-stepper name="quantity" label="Quantity" value="3"></ds-input-stepper>
        <button type="reset" data-testid="reset">Reset</button>
      </form>
    `)
    const stepper = new DsInputStepper(page.locator('ds-input-stepper'))

    await stepper.increase()
    await stepper.increase()
    await stepper.assertValue('5')

    await page.getByTestId('reset').click()
    await page.waitForChanges()
    await stepper.assertValue('3')
  })
})
