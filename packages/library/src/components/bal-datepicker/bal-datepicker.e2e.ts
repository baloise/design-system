import { newE2EPage } from '@stencil/core/testing'
import { format, now } from '../../utils/balDateUtil'

describe('bal-datepicker', () => {
  let page
  let balChangeEvent
  let balInputEvent
  let balDatepickerElement
  let nativeInputElement
  beforeEach(async () => {
    page = await newE2EPage()
    await page.setContent(`<bal-datepicker></bal-datepicker>`)
    balChangeEvent = await page.spyOnEvent('balChange')
    balInputEvent = await page.spyOnEvent('balInput')
    balDatepickerElement = await page.find('bal-datepicker')
    nativeInputElement = await balDatepickerElement.find('input')
  })
  it('should change value through manuall input', async () => {
    await nativeInputElement.focus()
    await nativeInputElement.press('2')
    await nativeInputElement.press('.')
    await nativeInputElement.press('2')
    await nativeInputElement.press('.')
    await nativeInputElement.press('1')
    await nativeInputElement.press('9')
    await nativeInputElement.press('8')
    await nativeInputElement.press('8')
    await nativeInputElement.press('Tab')

    expect(await nativeInputElement.getProperty('value')).toBe('02.02.1988')
    expect(balInputEvent).toHaveReceivedEventTimes(8)
    expect(balChangeEvent).toHaveReceivedEventTimes(1)
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
})
