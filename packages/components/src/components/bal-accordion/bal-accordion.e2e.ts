import { E2EElement, E2EPage, EventSpy, newE2EPage } from '@stencil/core/testing'

describe('bal-accordion', () => {
  let page: E2EPage
  let balCollapseEvent: EventSpy
  let labelElement: E2EElement
  let balAccordionTriggerElement: E2EElement

  beforeEach(async () => {
    page = await newE2EPage()
    await page.setContent(`
    <bal-accordion open-label="OPEN" close-label="CLOSE">TEST CONTENT</bal-accordion>
    `)
    balCollapseEvent = await page.spyOnEvent('balCollapse')
    balAccordionTriggerElement = await page.find('bal-accordion bal-button')
    labelElement = await page.find('span.label')
  })

  it('should open accordion', async () => {
    expect(labelElement.innerText).toBe('OPEN')

    await balAccordionTriggerElement.click()

    expect(labelElement.innerText).toBe('CLOSE')
    expect(balCollapseEvent).toHaveReceivedEventTimes(1)
  })
})
