import { newE2EPage } from '@stencil/core/testing'

describe('bal-button', () => {
  it('should render a bal-button', async () => {
    const page = await newE2EPage()
    await page.setContent(`<bal-button></bal-button>`)
    const el = await page.find('bal-button')

    expect(el).not.toBeNull()
  })
  it('should send click event', async () => {
    const page = await newE2EPage()
    await page.setContent(`<bal-button></bal-button>`)

    const el = await page.find('bal-button')
    const click = await el.spyOnEvent('click')
    el.click()

    await page.waitForChanges()
    expect(el).not.toBeNull()
    expect(click).toHaveReceivedEvent()
  })
  it('should not send click event when disabled', async () => {
    const page = await newE2EPage()
    await page.setContent(`<bal-button></bal-button>`)

    const el = await page.find('bal-button')
    const click = await el.spyOnEvent('click')
    el.setProperty('disabled', true)
    el.click()

    await page.waitForChanges()
    expect(click).not.toHaveReceivedEvent()
  })
})
