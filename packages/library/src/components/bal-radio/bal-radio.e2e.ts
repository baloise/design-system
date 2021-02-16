import { E2EElement, E2EPage, EventSpy, newE2EPage } from '@stencil/core/testing'

describe('bal-radio-group', () => {
  let page: E2EPage
  let balChangeEvent: EventSpy
  let balRadioGroupElement: E2EElement
  let balRadioMale: E2EElement
  let balRadioFemale: E2EElement
  let nativeMaleInputElement: E2EElement
  let nativeFemaleInputElement: E2EElement
  beforeEach(async () => {
    page = await newE2EPage()
    await page.setContent(`
    <bal-radio-group>
      <bal-radio label="Male" name="rg-1" value="male"></bal-radio>
      <bal-radio label="Female" name="rg-1e" value="female" disabled></bal-radio>
    </bal-radio-group>
    `)
    balChangeEvent = await page.spyOnEvent('balChange')
    balRadioGroupElement = await page.find('bal-radio-group')
    balRadioMale = await balRadioGroupElement.find('bal-radio[value="male"]')
    balRadioFemale = await balRadioGroupElement.find('bal-radio[value="female"]')
    nativeMaleInputElement = await balRadioMale.find('input')
    nativeFemaleInputElement = await balRadioFemale.find('input')
  })
  it('should select male and call change event ones', async () => {
    await nativeMaleInputElement.click()

    expect(await balRadioGroupElement.getProperty('value')).toBe('male')
    expect(balChangeEvent).toHaveReceivedEventTimes(1)
  })
  it('should not be able to select the disabled option', async () => {
    await nativeMaleInputElement.click()
    await nativeFemaleInputElement.click()

    expect(await balRadioGroupElement.getProperty('value')).toBe('male')
    expect(balChangeEvent).toHaveReceivedEventTimes(1)
  })
})
