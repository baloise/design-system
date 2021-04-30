import { E2EElement, E2EPage, EventSpy, newE2EPage } from '@stencil/core/testing'
import { delay } from 'lodash'

describe('bal-select', () => {
  let page: E2EPage
  let clickEvent: EventSpy
  let balChangeEvent: EventSpy
  let balInputEvent: EventSpy
  let balSelectElement: E2EElement
  let nativeInputElement: E2EElement

  beforeEach(async () => {
    page = await newE2EPage()
    await page.setContent(`<bal-select>
  <bal-select-option value="v1995" label="1995">1995</bal-select-option>
  <bal-select-option value="v1996" label="1996">1996</bal-select-option>
  <bal-select-option value="v1997" label="1997">1997</bal-select-option>
  <bal-select-option value="v1998" label="1998">1998</bal-select-option>
  <bal-select-option value="v1999" label="1999">1999</bal-select-option>
  <bal-select-option value="v2000" label="2000">2000</bal-select-option>
</bal-select>
    `)
    clickEvent = await page.spyOnEvent('click')
    balInputEvent = await page.spyOnEvent('balInput')
    balChangeEvent = await page.spyOnEvent('balChange')
    balSelectElement = await page.find('bal-select')
    nativeInputElement = await balSelectElement.find('input.input')
    await page.waitForChanges()
  })

  it('should fire a balChange event when selecting an option', async () => {
    await nativeInputElement.click()

    const selector = 'button.bal-select__option[data-value="v2000"]'
    await page.$eval(selector, (btn: any) => btn.click())

    let value = await balSelectElement.getProperty('value')
    expect(value).toEqual(['v2000'])
    expect(balChangeEvent).toHaveReceivedEventTimes(1)
  })

  it('should fire a balChange event when selecting multiple options', async () => {
    balSelectElement.setProperty('multiple', true)
    await page.waitForChanges()

    await nativeInputElement.click()
    const selector1 = 'button.bal-select__option[data-value="v1998"]'
    await page.$eval(selector1, (btn: any) => btn.click())

    const selector2 = 'button.bal-select__option[data-value="v2000"]'
    await page.$eval(selector2, (btn: any) => btn.click())

    let value = await balSelectElement.getProperty('value')
    expect(value).toEqual(['v1998', 'v2000'])
    expect(balChangeEvent).toHaveReceivedEventTimes(2)
  })

  it('should fire a click event', async () => {
    balSelectElement.click()
    await page.waitForChanges()

    expect(clickEvent).toHaveReceivedEventTimes(1)
  })

  it('should not fire a click event, because the input is disabled', async () => {
    balSelectElement.setProperty('disabled', true)
    await page.waitForChanges()

    nativeInputElement.click()
    balSelectElement.click()
    await page.waitForChanges()

    expect(clickEvent).not.toHaveReceivedEvent()
  })

  it('should fire only input event typing', async () => {
    balSelectElement.setProperty('typeahead', true)
    await page.waitForChanges()

    await nativeInputElement.click()
    await nativeInputElement.type('1')
    await nativeInputElement.type('9')
    await nativeInputElement.type('9')
    await nativeInputElement.type('8')
    await page.keyboard.down('Enter')
    await page.keyboard.press('Enter')

    let value = await balSelectElement.getProperty('value')
    expect(value).toEqual(['v1998'])
    expect(balChangeEvent).toHaveReceivedEventTimes(1)
    expect(balInputEvent).toHaveReceivedEventTimes(4)
  })
})
