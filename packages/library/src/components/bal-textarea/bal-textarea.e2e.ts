import { newE2EPage } from '@stencil/core/testing'

describe('bal-textarea', () => {
  it('should only call balInput and no balChange, because the input has still the focus', async () => {
    const page = await newE2EPage()
    await page.setContent(`<bal-textarea></bal-textarea>`)
    const balChangeEvent = await page.spyOnEvent('balChange')
    const balInputEvent = await page.spyOnEvent('balInput')
    const balInputElement = await page.find('bal-textarea')
    const textarea = await balInputElement.find('textarea')

    let value = await textarea.getProperty('value')
    expect(value).toBe('')

    await textarea.focus()
    await textarea.press('8')

    await page.waitForChanges()
    value = await textarea.getProperty('value')
    expect(value).toBe('8')
    expect(balInputEvent).toHaveReceivedEvent()
    expect(balChangeEvent).not.toHaveReceivedEvent()
  })

  it('should fire balChange & balInput, because the input gets blured', async () => {
    const page = await newE2EPage()
    await page.setContent(`<bal-textarea></bal-textarea>`)
    const balChangeEvent = await page.spyOnEvent('balChange')
    const balInputEvent = await page.spyOnEvent('balInput')
    const balInputElement = await page.find('bal-textarea')
    const textarea = await balInputElement.find('textarea')

    let value = await textarea.getProperty('value')
    expect(value).toBe('')

    await textarea.focus()
    await textarea.press('8')
    await textarea.press('Tab')

    await page.waitForChanges()
    value = await textarea.getProperty('value')
    expect(value).toBe('8')
    expect(balInputEvent).toHaveReceivedEvent()
    expect(balChangeEvent).toHaveReceivedEvent()
  })

  it('should fire balChange and no balInput, beacuse only the value of the web component is changed', async () => {
    const page = await newE2EPage()
    await page.setContent(`<bal-textarea></bal-textarea>`)
    const balChangeEvent = await page.spyOnEvent('balChange')
    const balInputEvent = await page.spyOnEvent('balInput')
    const balInputElement = await page.find('bal-textarea')

    const value = await balInputElement.getProperty('value')
    expect(value).toBe('')

    await balInputElement.setProperty('value', '88')
    await page.waitForChanges()

    expect(balInputEvent).not.toHaveReceivedEvent()
    expect(balChangeEvent).toHaveReceivedEvent()
  })

  // it('should fire no balChange and no balInput, beacuse the field has still a focus', async () => {
  //   const page = await newE2EPage()
  //   await page.setContent(`<bal-textarea></bal-textarea>`)
  //   const balChangeEvent = await page.spyOnEvent('balChange')
  //   const balInputEvent = await page.spyOnEvent('balInput')
  //   const balInputElement = await page.find('bal-textarea')
  //   const inputElement = await balInputElement.find('textarea')

  //   const value = await balInputElement.getProperty('value')
  //   expect(value).toBe('')

  //   inputElement.focus()

  //   await balInputElement.setProperty('value', '88')
  //   await page.waitForChanges()

  //   expect(balInputEvent).not.toHaveReceivedEvent()
  //   expect(balChangeEvent).not.toHaveReceivedEvent()
  // })
  // it('should fire no balChange and no balInput, beacuse the field has still a focus', async () => {
  //   const page = await newE2EPage()
  //   await page.setContent(`<bal-input></bal-input>`)
  //   const balChangeEvent = await page.spyOnEvent('balChange')
  //   const balInputEvent = await page.spyOnEvent('balInput')
  //   const balInputElement = await page.find('bal-textarea')
  //   const inputElement = await balInputElement.find('textarea')

  //   const value = await balInputElement.getProperty('value')
  //   expect(value).toBe('')

  //   inputElement.focus()

  //   await balInputElement.setProperty('value', '88')
  //   await page.waitForChanges()

  //   await inputElement.press('Tab')
  //   await page.waitForChanges()

  //   expect(balInputEvent).not.toHaveReceivedEvent()
  //   expect(balChangeEvent).toHaveReceivedEvent()
  // })
})
