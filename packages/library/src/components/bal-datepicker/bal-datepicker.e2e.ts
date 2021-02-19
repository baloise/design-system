import { E2EElement, E2EPage, EventSpy, newE2EPage } from '@stencil/core/testing'
import { format, now } from '../../utils/balDateUtil'

describe('bal-datepicker', () => {
  let page: E2EPage
  let clickEvent: EventSpy
  let balChangeEvent: EventSpy
  let balInputEvent: EventSpy
  let balDatepickerElement: E2EElement
  let nativeInputElement: E2EElement
  beforeEach(async () => {
    page = await newE2EPage()
    await page.setContent(`<bal-datepicker></bal-datepicker>`)
    clickEvent = await page.spyOnEvent('click')
    balChangeEvent = await page.spyOnEvent('balChange')
    balInputEvent = await page.spyOnEvent('balInput')
    balDatepickerElement = await page.find('bal-datepicker')
    nativeInputElement = await balDatepickerElement.find('input')
  })
  it('should change value through manuall input', async () => {
    await nativeInputElement.focus()
    await nativeInputElement.press('2')
    await nativeInputElement.press('.')
    await nativeInputElement.press('4')
    await nativeInputElement.press('.')
    await nativeInputElement.press('1')
    await nativeInputElement.press('9')
    await nativeInputElement.press('8')
    await nativeInputElement.press('8')
    await nativeInputElement.press('Tab')

    expect(await nativeInputElement.getProperty('value')).toBe('02.04.1988')
    expect(balInputEvent).toHaveReceivedEventTimes(8)
    expect(balChangeEvent).toHaveReceivedEventTimes(1)
    expect(balChangeEvent).toHaveReceivedEventDetail('1988-04-02T00:00:00.000Z')
  })
  it('should select the date of today', async () => {
    await nativeInputElement.click()
    const todayCellElement = await page.find('.is-today')
    todayCellElement.click()
    await page.waitForChanges()

    expect(await nativeInputElement.getProperty('value')).toBe(format(now()))
    expect(balInputEvent).toHaveReceivedEventTimes(0)
    expect(balChangeEvent).toHaveReceivedEventTimes(1)
  })
  it('should fire balChange when the empty is set to nothing', async () => {
    balDatepickerElement.setProperty('value', '')
    await page.waitForChanges()

    expect(await nativeInputElement.getProperty('value')).toBe('')
    expect(balInputEvent).toHaveReceivedEventTimes(0)
    expect(balChangeEvent).toHaveReceivedEventTimes(1)
  })
  it('should return an empty string, because of a invalid date', async () => {
    await nativeInputElement.focus()
    await nativeInputElement.press('2')
    await nativeInputElement.press('.')
    await nativeInputElement.press('2')
    await nativeInputElement.press('.')
    await nativeInputElement.press('1')
    await nativeInputElement.press('Tab')

    expect(await nativeInputElement.getProperty('value')).toBe('')
    expect(balChangeEvent).toHaveReceivedEventTimes(0)
  })
  it('should parse the short date into the correct format', async () => {
    await nativeInputElement.focus()
    await nativeInputElement.press('2')
    await nativeInputElement.press('.')
    await nativeInputElement.press('4')
    await nativeInputElement.press('.')
    await nativeInputElement.press('2')
    await nativeInputElement.press('1')
    await nativeInputElement.press('Tab')

    expect(await nativeInputElement.getProperty('value')).toBe('02.04.2021')
    expect(balChangeEvent).toHaveReceivedEventTimes(1)
    expect(balChangeEvent).toHaveReceivedEventDetail('2021-04-02T00:00:00.000Z')
  })

  it('should fire a click event', async () => {
    balDatepickerElement.click()
    await page.waitForChanges()

    expect(clickEvent).toHaveReceivedEventTimes(1)
  })

  it('should not fire a click event, because the input is disabled', async () => {
    balDatepickerElement.setProperty('disabled', true)
    await page.waitForChanges()

    nativeInputElement.click()
    balDatepickerElement.click()
    await page.waitForChanges()

    expect(clickEvent).not.toHaveReceivedEvent()
  })
})
