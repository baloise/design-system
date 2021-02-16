import { newE2EPage } from '@stencil/core/testing'

describe('bal-select', () => {
  it('should fire a balChange event when selecting an option', async () => {
    const page = await newE2EPage()
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
    const balChangeEvent = await page.spyOnEvent('balChange')
    const select = await page.find('bal-select')
    const trigger = await select.find('bal-dropdown-trigger bal-input')
    const selectOption = await select.find('bal-select-option[value="1998"]')

    await trigger.click()
    await selectOption.click()

    let value = await select.getProperty('value')
    expect(value).toEqual(['1998'])
    expect(balChangeEvent).toHaveReceivedEventTimes(1)
  })

  it('should fire a balChange event when selecting multiple options', async () => {
    const page = await newE2EPage()
    await page.setContent(`
    <bal-select multiple>
      <bal-select-option value="1995" label="1995">1995</bal-select-option>
      <bal-select-option value="1996" label="1996">1996</bal-select-option>
      <bal-select-option value="1997" label="1997">1997</bal-select-option>
      <bal-select-option value="1998" label="1998">1998</bal-select-option>
      <bal-select-option value="1999" label="1999">1999</bal-select-option>
      <bal-select-option value="2000" label="2000">2000</bal-select-option>
    </bal-select>
    `)
    const balChangeEvent = await page.spyOnEvent('balChange')
    const select = await page.find('bal-select')
    const trigger = await select.find('bal-dropdown-trigger bal-input')
    const selectOptionOne = await select.find('bal-select-option[value="1998"]')
    const selectOptionTwo = await select.find('bal-select-option[value="2000"]')

    await trigger.click()
    await selectOptionOne.click()
    await selectOptionTwo.click()

    let value = await select.getProperty('value')
    expect(value).toEqual(['1998', '2000'])
    expect(balChangeEvent).toHaveReceivedEventTimes(2)
  })
})
