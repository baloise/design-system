describe('bal-popover', () => {
  before(() => {
    cy.platform('desktop').page('/components/bal-popover/test/bal-popover.cy.html')
  })

  it('should open and close the popover', () => {
    cy.getByTestId('popover')
      .balPopoverIsClosed()
      .balPopoverToggle()
      .balPopoverIsOpen()
      .balPopoverToggle()
      .balPopoverIsClosed()
  })

  it('should contain trigger and menu content', () => {
    cy.getByTestId('popover')
      .balPopoverToggle()
      .balPopoverTriggerContains('Trigger')
      .balPopoverContentContains(
        'Title Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia nihil dolore nesciunt sed minus doloremque error quae excepturi molestiae molestias amet ab, explicabo dolor aperiam perferendis mollitia facilis harum vero. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia nihil dolore nesciunt sed minus doloremque error quae excepturi molestiae molestias amet ab, explicabo dolor aperiam perferendis mollitia facilis harum vero.',
      )
  })
})
