import { app } from '../support/app'

describe('Dropdown', () => {
  let page = app.getDropdownPage()

  it('should open and close the dropdown', () => {
    page.open()
    cy.get(page.dropdown)
      .balDropdownIsClosed()
      .balDropdownToggle()
      .balDropdownIsOpen()
      .balDropdownToggle()
      .balDropdownIsClosed()
  })

  it('should contain trigger and menu content', () => {
    page.open()
    cy.get(page.dropdown)
      .balDropdownToggle()
      .balDropdownTriggerContains('Trigger')
      .balDropdownMenuContains(
        'Title Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia nihil dolore nesciunt sed minus doloremque error quae excepturi molestiae molestias amet ab, explicabo dolor aperiam perferendis mollitia facilis harum vero. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia nihil dolore nesciunt sed minus doloremque error quae excepturi molestiae molestias amet ab, explicabo dolor aperiam perferendis mollitia facilis harum vero.',
      )
  })
})
