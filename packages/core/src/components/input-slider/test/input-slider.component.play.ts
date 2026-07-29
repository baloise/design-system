import { DsInputSlider, expect, test } from '@baloise/ds-playwright'

test.describe('component', () => {
  test('should fire dsInput with numeric value on fill', async ({ page }) => {
    await page.mount(`<ds-input-slider label="Label"></ds-input-slider>`)
    const slider = new DsInputSlider(page.locator('ds-input-slider'))
    const inputSpy = await slider.el.spyOnEvent('dsInput')

    await slider.fill('42')

    expect(inputSpy).toHaveReceivedEventTimes(1)
    expect(inputSpy).toHaveReceivedEventDetail(42)
  })

  test('should fire dsChange with numeric value on fill', async ({ page }) => {
    await page.mount(`<ds-input-slider label="Label"></ds-input-slider>`)
    const slider = new DsInputSlider(page.locator('ds-input-slider'))
    const changeSpy = await slider.el.spyOnEvent('dsChange')

    await slider.fill('75')

    expect(changeSpy).toHaveReceivedEventTimes(1)
    expect(changeSpy).toHaveReceivedEventDetail(75)
  })

  test('should fire dsFocus on focus and dsBlur on blur', async ({ page }) => {
    await page.mount(`<ds-input-slider label="Label"></ds-input-slider>`)
    const slider = new DsInputSlider(page.locator('ds-input-slider'))
    const focusSpy = await slider.el.spyOnEvent('dsFocus')
    const blurSpy = await slider.el.spyOnEvent('dsBlur')

    await slider.handle.focus()
    expect(focusSpy).toHaveReceivedEventTimes(1)

    await slider.blur()
    expect(blurSpy).toHaveReceivedEventTimes(1)
  })

  test('should fire dsClick on click', async ({ page }) => {
    await page.mount(`<ds-input-slider label="Label"></ds-input-slider>`)
    const slider = new DsInputSlider(page.locator('ds-input-slider'))
    const clickSpy = await slider.el.spyOnEvent('dsClick')

    await slider.handle.click()

    expect(clickSpy).toHaveReceivedEventTimes(1)
  })
})

test.describe('min/max/step', () => {
  test('defaults to min when value is unset', async ({ page }) => {
    await page.mount(`<ds-input-slider label="Label" min="10" max="50"></ds-input-slider>`)
    const slider = new DsInputSlider(page.locator('ds-input-slider'))

    await slider.assertValue('10')
  })

  test('clamps an out-of-range value to max', async ({ page }) => {
    await page.mount(`<ds-input-slider label="Label" min="0" max="10" value="42"></ds-input-slider>`)
    const slider = new DsInputSlider(page.locator('ds-input-slider'))

    await slider.assertValue('10')
  })
})

test.describe('disabled', () => {
  test('slider should be disabled', async ({ page }) => {
    await page.mount(`<ds-input-slider label="Label" value="42" disabled></ds-input-slider>`)
    const slider = new DsInputSlider(page.locator('ds-input-slider'))
    const inputSpy = await slider.el.spyOnEvent('dsInput')

    await slider.assertToBeDisabled()
    expect(inputSpy).toHaveReceivedEventTimes(0)
  })
})

test.describe('readonly', () => {
  test('slider should be disabled', async ({ page }) => {
    await page.mount(`<ds-input-slider label="Label" value="42" readonly></ds-input-slider>`)
    const slider = new DsInputSlider(page.locator('ds-input-slider'))
    const inputSpy = await slider.el.spyOnEvent('dsInput')

    await slider.assertToBeDisabled()
    expect(inputSpy).toHaveReceivedEventTimes(0)
  })
})

test.describe('form reset', () => {
  test('should reset to initial value', async ({ page }) => {
    await page.mount(`
      <form>
        <ds-input-slider name="volume" label="Volume" value="30"></ds-input-slider>
        <button type="reset" data-testid="reset">Reset</button>
      </form>
    `)
    const slider = new DsInputSlider(page.locator('ds-input-slider'))
    const changeSpy = await slider.el.spyOnEvent('dsChange')

    await slider.fill('90')
    expect(changeSpy).toHaveReceivedEventTimes(1)
    expect(changeSpy).toHaveReceivedEventDetail(90)

    await page.getByTestId('reset').click()
    await page.waitForChanges()
    await slider.assertValue('30')
  })
})
