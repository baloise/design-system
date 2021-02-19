import { newE2EPage } from '@stencil/core/testing'

describe('bal-input', () => {
  let page
  let clickEvent
  let balChangeEvent
  let balInputEvent
  let balInputElement
  let nativeInputElement

  beforeEach(async () => {
    page = await newE2EPage()
    await page.setContent(`<bal-input></bal-input>`)
    clickEvent = await page.spyOnEvent('click')
    balChangeEvent = await page.spyOnEvent('balChange')
    balInputEvent = await page.spyOnEvent('balInput')
    balInputElement = await page.find('bal-input')
    nativeInputElement = await balInputElement.find('input')
  })
  it('should only call balInput and no balChange, because the input has still the focus', async () => {
    expect(await nativeInputElement.getProperty('value')).toBe('')

    await nativeInputElement.focus()
    await nativeInputElement.press('8')

    expect(await nativeInputElement.getProperty('value')).toBe('8')
    expect(balInputEvent).toHaveReceivedEvent()
    expect(balChangeEvent).not.toHaveReceivedEvent()
  })
  it('should fire balChange & balInput, because the input gets blured', async () => {
    await nativeInputElement.focus()
    await nativeInputElement.press('8')
    await nativeInputElement.press('Tab')

    expect(balInputEvent).toHaveReceivedEvent()
    expect(balChangeEvent).toHaveReceivedEventTimes(1)
  })
  it('should fire balChange and no balInput, beacuse only the value of the web component is changed', async () => {
    await balInputElement.setProperty('value', '88')
    await page.waitForChanges()

    expect(await nativeInputElement.getProperty('value')).toBe('88')
    expect(balInputEvent).not.toHaveReceivedEvent()
    expect(balChangeEvent).toHaveReceivedEventTimes(1)
  })

  it('should fire no balChange and no balInput, beacuse the field has still a focus', async () => {
    nativeInputElement.focus()

    await balInputElement.setProperty('value', '88')
    await page.waitForChanges()

    expect(balInputEvent).not.toHaveReceivedEvent()
    expect(balChangeEvent).not.toHaveReceivedEvent()
  })

  it('should fire no balChange and no balInput, beacuse the field has still a focus', async () => {
    nativeInputElement.focus()

    await balInputElement.setProperty('value', '88')
    await page.waitForChanges()
    await nativeInputElement.press('Tab')

    expect(balInputEvent).not.toHaveReceivedEvent()
    expect(balChangeEvent).toHaveReceivedEventTimes(1)
  })

  it('should fire a click event', async () => {
    nativeInputElement.click()
    await page.waitForChanges()

    expect(clickEvent).toHaveReceivedEventTimes(1)
  })

  it('should not fire a click event, because the input is disabled', async () => {
    await balInputElement.setProperty('disabled', true)
    await page.waitForChanges()

    nativeInputElement.click()
    balInputElement.click()
    await page.waitForChanges()

    expect(clickEvent).not.toHaveReceivedEvent()
  })
})
