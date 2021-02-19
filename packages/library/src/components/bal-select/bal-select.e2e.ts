import { E2EElement, E2EPage, EventSpy, newE2EPage } from '@stencil/core/testing'

describe('bal-select', () => {
  let page: E2EPage
  let clickEvent: EventSpy
  let balChangeEvent: EventSpy
  let balInputEvent: EventSpy
  let balSelectElement: E2EElement
  let nativeInputElement: E2EElement
  let triggerElement: E2EElement
  let selectOptionOne: E2EElement
  let selectOptionTwo: E2EElement

  beforeEach(async () => {
    page = await newE2EPage()
    await page.setContent(`
    <bal-select>
      <bal-select-option value="1995" label="1995">1995</bal-select-option>
      <bal-select-option value="1996" label="1996">1996</bal-select-option>
      <bal-select-option value="1997" label="1997">1997</bal-select-option>
      <bal-select-option value="1998" label="1998">1998</bal-select-option>
      <bal-select-option value="1999" label="1999">1999</bal-select-option>
      <bal-select-option value="2000" label="2000">2000</bal-select-option>
    </bal-select>
    `)
    clickEvent = await page.spyOnEvent('click')
    balChangeEvent = await page.spyOnEvent('balChange')
    balInputEvent = await page.spyOnEvent('balInput')
    balSelectElement = await page.find('bal-select')
    nativeInputElement = await balSelectElement.find('input')
    triggerElement = await balSelectElement.find('bal-dropdown-trigger bal-input')
    selectOptionOne = await balSelectElement.find('bal-select-option[value="1998"]')
    selectOptionTwo = await balSelectElement.find('bal-select-option[value="2000"]')
  })

  it('should fire a balChange event when selecting an option', async () => {
    await triggerElement.click()
    await selectOptionOne.click()

    let value = await balSelectElement.getProperty('value')
    expect(value).toEqual(['1998'])
    expect(balChangeEvent).toHaveReceivedEventTimes(1)
  })

  it('should fire a balChange event when selecting multiple options', async () => {
    await balSelectElement.setProperty('multiple', true)
    await page.waitForChanges()

    await triggerElement.click()
    await selectOptionOne.click()
    await selectOptionTwo.click()

    let value = await balSelectElement.getProperty('value')
    expect(value).toEqual(['1998', '2000'])
    expect(balChangeEvent).toHaveReceivedEventTimes(2)
  })

  it('should fire a click event', async () => {
    balSelectElement.click()
    await page.waitForChanges()

    expect(clickEvent).toHaveReceivedEventTimes(1)
  })

  it('should not fire a click event, because the input is disabled', async () => {
    await balSelectElement.setProperty('disabled', true)
    await page.waitForChanges()

    nativeInputElement.click()
    balSelectElement.click()
    await page.waitForChanges()

    expect(clickEvent).not.toHaveReceivedEvent()
  })
})
