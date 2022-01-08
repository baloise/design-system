import { E2EElement, E2EPage, EventSpy, newE2EPage } from '@stencil/core/testing'

describe('bal-accordion', () => {
  let page: E2EPage
  let balCollapseEvent: EventSpy
  let balAccordionTriggerElement: E2EElement

  beforeEach(async () => {
    page = await newE2EPage()
    await page.setContent(`
    <bal-accordion open-label="OPEN" close-label="CLOSE">TEST CONTENT</bal-accordion>
    `)
    balCollapseEvent = await page.spyOnEvent('balChange')
    balAccordionTriggerElement = await page.find('bal-accordion bal-button')
  })

  it('should open accordion', async () => {
    expect(balAccordionTriggerElement.innerText).toBe('OPEN')

    await balAccordionTriggerElement.click()

    expect(balAccordionTriggerElement.innerText).toBe('CLOSE')
    expect(balCollapseEvent).toHaveReceivedEventTimes(1)
  })
})
