import { E2EElement, E2EPage, EventSpy, newE2EPage } from '@stencil/core/testing'

describe('bal-checkbox', () => {
  let page: E2EPage
  let balChangeEvent: EventSpy
  let balCheckboxElement: E2EElement
  let nativeInputElement: E2EElement
  beforeEach(async () => {
    page = await newE2EPage()
    await page.setContent(`<bal-checkbox></bal-checkbox>`)
    balChangeEvent = await page.spyOnEvent('balChange')
    balCheckboxElement = await page.find('bal-checkbox')
    nativeInputElement = await balCheckboxElement.find('input')
  })
  it('should set the checkbos as checked', async () => {
    await nativeInputElement.click()

    expect(await balCheckboxElement.getProperty('checked')).toBe(true)
    expect(balChangeEvent).toHaveReceivedEventTimes(1)
  })

  it('should not be able to alter the checkbox, because it is disabled', async () => {
    await balCheckboxElement.setAttribute('disabled', true)
    await page.waitForChanges()
    await nativeInputElement.click()

    expect(await balCheckboxElement.getProperty('checked')).toBe(false)
    expect(balChangeEvent).toHaveReceivedEventTimes(0)
  })
})
