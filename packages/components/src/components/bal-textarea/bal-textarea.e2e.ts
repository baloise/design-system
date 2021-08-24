import { E2EElement, E2EPage, EventSpy, newE2EPage } from '@stencil/core/testing'

describe('bal-textarea', () => {
  let page: E2EPage
  let clickEvent: EventSpy
  let balChangeEvent: EventSpy
  let balInputEvent: EventSpy
  let balInputElement: E2EElement
  let nativeTextareaElement: E2EElement

  beforeEach(async () => {
    page = await newE2EPage()
    await page.setContent(`<bal-textarea></bal-textarea>`)
    clickEvent = await page.spyOnEvent('click')
    balChangeEvent = await page.spyOnEvent('balChange')
    balInputEvent = await page.spyOnEvent('balInput')
    balInputElement = await page.find('bal-textarea')
    nativeTextareaElement = await balInputElement.find('textarea')
  })

  it('should only call balInput and no balChange, because the input has still the focus', async () => {
    expect(await nativeTextareaElement.getProperty('value')).toBe('')

    await nativeTextareaElement.focus()
    await nativeTextareaElement.press('8')

    expect(await nativeTextareaElement.getProperty('value')).toBe('8')
    expect(balInputEvent).toHaveReceivedEvent()
    expect(balChangeEvent).not.toHaveReceivedEvent()
  })

  it('should fire balChange & balInput, because the input gets blured', async () => {
    await nativeTextareaElement.focus()
    await nativeTextareaElement.press('8')
    await nativeTextareaElement.press('Tab')

    expect(await nativeTextareaElement.getProperty('value')).toBe('8')
    expect(balInputEvent).toHaveReceivedEvent()
    expect(balChangeEvent).toHaveReceivedEventTimes(1)
  })

  it('should fire balChange and no balInput, beacuse only the value of the web component is changed', async () => {
    balInputElement.setProperty('value', '88')
    await page.waitForChanges()

    expect(balInputEvent).not.toHaveReceivedEvent()
    expect(balChangeEvent).toHaveReceivedEventTimes(1)
  })

  it('should fire no balChange and no balInput, beacuse the field has still a focus', async () => {
    nativeTextareaElement.focus()

    balInputElement.setProperty('value', '88')
    await page.waitForChanges()

    expect(balInputEvent).not.toHaveReceivedEvent()
    expect(balChangeEvent).not.toHaveReceivedEvent()
  })

  it('should fire no balChange and no balInput, beacuse the field has still a focus', async () => {
    nativeTextareaElement.focus()

    balInputElement.setProperty('value', '88')
    await page.waitForChanges()
    await nativeTextareaElement.press('Tab')

    expect(balInputEvent).not.toHaveReceivedEvent()
    expect(balChangeEvent).toHaveReceivedEventTimes(1)
  })

  it('should fire a click event', async () => {
    nativeTextareaElement.click()
    await page.waitForChanges()

    expect(clickEvent).toHaveReceivedEventTimes(1)
  })

  it('should not fire a click event, because the input is disabled', async () => {
    balInputElement.setProperty('disabled', true)
    await page.waitForChanges()

    nativeTextareaElement.click()
    balInputElement.click()
    await page.waitForChanges()

    expect(clickEvent).not.toHaveReceivedEvent()
  })
})
