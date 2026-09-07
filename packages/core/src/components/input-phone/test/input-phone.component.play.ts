import { DsInputPhone, expect, test } from '@baloise/ds-playwright'

test.describe('component', () => {
  test('should fire dsInput with E.164 payload on fill', async ({ page }) => {
    await page.mount(`<ds-input-phone label="Phone number" initial-country="CH"></ds-input-phone>`)
    const phone = new DsInputPhone(page.locator('ds-input-phone'))
    const inputSpy = await phone.el.spyOnEvent('dsInput')

    await phone.fill('791234567')

    expect(inputSpy).toHaveReceivedEventTimes(1)
    expect(inputSpy).toHaveReceivedEventDetail({
      value: '+41791234567',
      country: 'CH',
      nationalNumber: '791234567',
    })
    await phone.assertNationalNumber('79 123 45 67')
  })

  test('should update the E.164 payload on every typed digit', async ({ page }) => {
    await page.mount(`<ds-input-phone label="Phone number" initial-country="CH"></ds-input-phone>`)
    const phone = new DsInputPhone(page.locator('ds-input-phone'))
    const inputSpy = await phone.el.spyOnEvent('dsInput')

    await phone.type('7912')
    await phone.assertNationalNumber('79 12')
    await phone.type('34567')

    expect(inputSpy).toHaveReceivedEventTimes(9)
    expect(inputSpy).toHaveReceivedEventDetail({
      value: '+41791234567',
      country: 'CH',
      nationalNumber: '791234567',
    })
    await phone.assertNationalNumber('79 123 45 67')
  })

  test('should remove the Swiss national prefix on blur', async ({ page }) => {
    await page.mount(`<ds-input-phone label="Phone number" initial-country="CH"></ds-input-phone>`)
    const phone = new DsInputPhone(page.locator('ds-input-phone'))
    const changeSpy = await phone.el.spyOnEvent('dsChange')

    await phone.fill('0791234567')
    await phone.assertNationalNumber('079 123 45 67')
    await phone.blur()

    expect(changeSpy).toHaveReceivedEventTimes(1)
    expect(changeSpy).toHaveReceivedEventDetail({
      value: '+41791234567',
      country: 'CH',
      nationalNumber: '791234567',
    })
    await phone.assertNationalNumber('79 123 45 67')
    await phone.assertValue('+41791234567')
  })

  test('should derive a country-specific placeholder and allow an override', async ({ page }) => {
    await page.mount(`
      <ds-input-phone data-testid="derived" label="Phone number" initial-country="CH"></ds-input-phone>
      <ds-input-phone data-testid="custom" label="Phone number" initial-country="CH" placeholder="Custom"></ds-input-phone>
    `)
    const derived = new DsInputPhone(page.getByTestId('derived'))
    const custom = new DsInputPhone(page.getByTestId('custom'))

    await expect(derived.nativeInput).toHaveAttribute('placeholder', '78 123 45 67')
    await expect(custom.nativeInput).toHaveAttribute('placeholder', 'Custom')

    await derived.selectCountry('DE')
    await expect(derived.nativeInput).toHaveAttribute('placeholder', '1512 3456789')
  })

  test('should fire dsFocus on focus and dsBlur on blur', async ({ page }) => {
    await page.mount(`<ds-input-phone label="Phone number" initial-country="CH"></ds-input-phone>`)
    const phone = new DsInputPhone(page.locator('ds-input-phone'))
    const focusSpy = await phone.el.spyOnEvent('dsFocus')
    const blurSpy = await phone.el.spyOnEvent('dsBlur')

    await phone.nativeInput.focus()
    expect(focusSpy).toHaveReceivedEventTimes(1)

    await phone.blur()
    expect(blurSpy).toHaveReceivedEventTimes(1)
  })
})

test.describe('country picker', () => {
  test('should fire dsCountryChange when a country is selected', async ({ page }) => {
    await page.mount(`<ds-input-phone label="Phone number" countries="CH,DE,FR" initial-country="CH"></ds-input-phone>`)
    const phone = new DsInputPhone(page.locator('ds-input-phone'))
    const countrySpy = await phone.el.spyOnEvent('dsCountryChange')

    await phone.selectCountry('DE')

    expect(countrySpy).toHaveReceivedEventTimes(1)
    expect(countrySpy).toHaveReceivedEventDetail({ country: 'DE' })
    await phone.assertClosed()
  })

  test('should keep typed digits when switching country', async ({ page }) => {
    await page.mount(`<ds-input-phone label="Phone number" countries="CH,DE" initial-country="CH"></ds-input-phone>`)
    const phone = new DsInputPhone(page.locator('ds-input-phone'))

    await phone.fill('791234567')
    await phone.selectCountry('DE')

    await phone.assertNationalNumber('791 234567')
  })

  test('should restrict picker options to the countries allow-list', async ({ page }) => {
    await page.mount(`<ds-input-phone label="Phone number" countries="CH,DE"></ds-input-phone>`)
    const phone = new DsInputPhone(page.locator('ds-input-phone'))

    await phone.open()
    await phone.assertOpen()
    await expect(phone.option('CH')).toBeVisible()
    await expect(phone.option('DE')).toBeVisible()
    await expect(phone.option('FR')).toHaveCount(0)
  })

  test('should support keyboard selection and restore trigger focus on Escape', async ({ page }) => {
    await page.mount(`<ds-input-phone label="Phone number" countries="CH,DE,FR" initial-country="CH"></ds-input-phone>`)
    const phone = new DsInputPhone(page.locator('ds-input-phone'))
    const countrySpy = await phone.el.spyOnEvent('dsCountryChange')

    await phone.trigger.focus()
    await phone.trigger.press('Enter')
    await phone.assertOpen()
    await expect(phone.filter).toBeFocused()

    await phone.filter.fill('FR')
    await phone.filter.press('Enter')
    expect(countrySpy).toHaveReceivedEventDetail({ country: 'FR' })
    await phone.assertClosed()
    await expect(phone.trigger).toBeFocused()

    await phone.trigger.press('Space')
    await phone.assertOpen()
    await phone.filter.press('Escape')
    await phone.assertClosed()
    await expect(phone.trigger).toBeFocused()
  })

  test('should not draw nested browser outlines around the keyboard-focused segments', async ({ page }) => {
    await page.mount(`<ds-input-phone label="Phone number" initial-country="CH"></ds-input-phone>`)
    const phone = new DsInputPhone(page.locator('ds-input-phone'))

    await phone.trigger.focus()
    await phone.trigger.press('Tab')
    await phone.nativeInput.press('Shift+Tab')

    await expect(phone.trigger).toBeFocused()
    expect(await phone.trigger.evaluate(element => element.matches(':focus-visible'))).toBe(true)
    await expect(phone.trigger).toHaveCSS('outline-style', 'none')

    await phone.trigger.press('Tab')
    await expect(phone.nativeInput).toBeFocused()
    expect(await phone.nativeInput.evaluate(element => element.matches(':focus-visible'))).toBe(true)
    await expect(phone.nativeInput).toHaveCSS('outline-style', 'none')
  })

  test('should warn and fall back when country is outside the allow-list', async ({ page }) => {
    const warnings: string[] = []
    page.on('console', message => {
      if (message.type() === 'warning') warnings.push(message.text())
    })

    await page.mount(`<ds-input-phone label="Phone number" countries="CH,DE" country="US"></ds-input-phone>`)
    const phone = new DsInputPhone(page.locator('ds-input-phone'))

    await expect.poll(() => phone.el.evaluate(el => (el as HTMLDsInputPhoneElement).country)).toBe('CH')
    expect(warnings).toContain('[ds-input-phone] `country` "US" is not in `countries`. Falling back to "CH".')
  })
})

test.describe('paste', () => {
  test('should switch country from a pasted international number without dsCountryChange', async ({ page }) => {
    await page.mount(`<ds-input-phone label="Phone number" countries="CH,DE,FR" initial-country="CH"></ds-input-phone>`)
    const phone = new DsInputPhone(page.locator('ds-input-phone'))
    const countrySpy = await phone.el.spyOnEvent('dsCountryChange')
    const inputSpy = await phone.el.spyOnEvent('dsInput')

    await phone.paste('+33612345678')

    expect(countrySpy).toHaveReceivedEventTimes(0)
    expect(inputSpy).toHaveReceivedEventTimes(1)
    expect(inputSpy).toHaveReceivedEventDetail({
      value: '+33612345678',
      country: 'FR',
      nationalNumber: '612345678',
    })
  })
})

test.describe('international calling code input', () => {
  test('should keep the caret after a leading plus', async ({ page }) => {
    await page.mount(`<ds-input-phone label="Phone number" initial-country="CH"></ds-input-phone>`)
    const phone = new DsInputPhone(page.locator('ds-input-phone'))

    await phone.type('+')

    await phone.assertNationalNumber('+')
    await expect.poll(() => phone.nativeInput.evaluate(input => (input as HTMLInputElement).selectionStart)).toBe(1)
  })

  test('should switch country and remove a typed + calling code from the number field', async ({ page }) => {
    await page.mount(`<ds-input-phone label="Phone number" countries="CH,DE" initial-country="DE"></ds-input-phone>`)
    const phone = new DsInputPhone(page.locator('ds-input-phone'))
    const countrySpy = await phone.el.spyOnEvent('dsCountryChange')

    await phone.fill('+41795012122')

    expect(countrySpy).toHaveReceivedEventTimes(0)
    await expect.poll(() => phone.el.evaluate(el => (el as HTMLDsInputPhoneElement).country)).toBe('CH')
    await phone.assertNationalNumber('79 501 21 22')
    await phone.assertValue('+41795012122')
  })

  test('should switch country and remove a typed 00 calling code from the number field', async ({ page }) => {
    await page.mount(`<ds-input-phone label="Phone number" countries="CH,DE" initial-country="DE"></ds-input-phone>`)
    const phone = new DsInputPhone(page.locator('ds-input-phone'))

    await phone.fill('0041795012122')

    await expect.poll(() => phone.el.evaluate(el => (el as HTMLDsInputPhoneElement).country)).toBe('CH')
    await phone.assertNationalNumber('79 501 21 22')
    await phone.assertValue('+41795012122')
  })
})

test.describe('disabled', () => {
  test('trigger and number field should be disabled', async ({ page }) => {
    await page.mount(`<ds-input-phone label="Phone number" initial-country="CH" disabled></ds-input-phone>`)
    const phone = new DsInputPhone(page.locator('ds-input-phone'))
    const inputSpy = await phone.el.spyOnEvent('dsInput')

    await phone.assertToBeDisabled()
    expect(inputSpy).toHaveReceivedEventTimes(0)
  })
})

test.describe('readonly', () => {
  test('picker should be disabled while the number field stays usable', async ({ page }) => {
    await page.mount(
      `<ds-input-phone label="Phone number" initial-country="CH" value="+41791234567" readonly></ds-input-phone>`,
    )
    const phone = new DsInputPhone(page.locator('ds-input-phone'))

    await phone.assertPickerDisabled()
    await expect(phone.nativeInput).toBeEnabled()
    await phone.assertNationalNumber('79 123 45 67')
  })
})

test.describe('form reset', () => {
  test('should reset to the initial E.164 value', async ({ page }) => {
    await page.mount(`
      <form>
        <ds-input-phone name="phone" label="Phone number" initial-country="CH" value="+41791234567"></ds-input-phone>
        <button type="reset" data-testid="reset">Reset</button>
      </form>
    `)
    const phone = new DsInputPhone(page.locator('ds-input-phone'))

    await phone.fill('791111111')
    await phone.blur()
    await phone.assertValue('+41791111111')

    await page.getByTestId('reset').click()
    await page.waitForChanges()
    await phone.assertValue('+41791234567')
    await phone.assertNationalNumber('79 123 45 67')
  })
})
