import { E2EElement, E2EPage, EventSpy, newE2EPage } from '@stencil/core/testing'

describe('bal-checkbox', () => {
  let page: E2EPage
  let clickEvent: EventSpy
  let balChangeEvent: EventSpy
  let balCheckboxElement: E2EElement
  let nativeInputElement: E2EElement
  beforeEach(async () => {
    page = await newE2EPage()
    await page.setContent(`<bal-checkbox></bal-checkbox>`)
    clickEvent = await page.spyOnEvent('click')
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
    balCheckboxElement.setAttribute('disabled', true)
    await page.waitForChanges()
    await nativeInputElement.click()

    expect(await balCheckboxElement.getProperty('checked')).toBe(false)
    expect(balChangeEvent).toHaveReceivedEventTimes(0)
  })

  it('should fire a click event', async () => {
    nativeInputElement.click()
    await page.waitForChanges()

    expect(clickEvent).toHaveReceivedEventTimes(1)
  })

  it('should not fire a click event, because the input is disabled', async () => {
    balCheckboxElement.setProperty('disabled', true)
    await page.waitForChanges()

    nativeInputElement.click()
    balCheckboxElement.click()
    await page.waitForChanges()

    expect(clickEvent).not.toHaveReceivedEvent()
  })
})
