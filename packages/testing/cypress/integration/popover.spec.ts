import { app } from '../support/app'

describe('Popover', () => {
  const page = app.getPopoverPage()

  it('should open and close the popover', () => {
    page.open()
    cy.get(page.popover)
      .balPopoverIsClosed()
      .balPopoverToggle()
      .balPopoverIsOpen()
      .balPopoverToggle()
      .balPopoverIsClosed()
  })

  it('should contain trigger and menu content', () => {
    page.open()
    cy.get(page.popover)
      .balPopoverToggle()
      .balPopoverTriggerContains('Trigger')
      .balPopoverContentContains(
        'Title Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia nihil dolore nesciunt sed minus doloremque error quae excepturi molestiae molestias amet ab, explicabo dolor aperiam perferendis mollitia facilis harum vero. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia nihil dolore nesciunt sed minus doloremque error quae excepturi molestiae molestias amet ab, explicabo dolor aperiam perferendis mollitia facilis harum vero.',
      )
  })
})
