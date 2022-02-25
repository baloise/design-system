import { E2EElement, E2EPage, EventSpy, newE2EPage } from '@stencil/core/testing'

describe('bal-number-input', () => {
  let page: E2EPage
  let balChangeEvent: EventSpy
  let balInputEvent: EventSpy
  let balInputElement: E2EElement
  let nativeInputElement: E2EElement

  beforeEach(async () => {
    page = await newE2EPage()
    await page.setContent(`<bal-number-input></bal-number-input>`)
    balChangeEvent = await page.spyOnEvent('balChange')
    balInputEvent = await page.spyOnEvent('balInput')
    balInputElement = await page.find('bal-number-input')
    nativeInputElement = await balInputElement.find('input')
  })

  it('should only call balInput and no balChange, because the input has still the focus', async () => {
    expect(await nativeInputElement.getProperty('value')).toBe('')

    await nativeInputElement.focus()
    await nativeInputElement.press('.')
    await nativeInputElement.press('8')

    expect(await nativeInputElement.getProperty('value')).toBe('0.8')
    expect(balInputEvent).toHaveReceivedEvent()
    expect(balChangeEvent).not.toHaveReceivedEvent()
  })

  it('should fire balChange & balInput, because the input gets blurred', async () => {
    await nativeInputElement.focus()
    await nativeInputElement.press('.')
    await nativeInputElement.press('8')
    await nativeInputElement.press('Tab')

    expect(balInputEvent).toHaveReceivedEvent()
    expect(balChangeEvent).toHaveReceivedEventTimes(1)
  })
})
