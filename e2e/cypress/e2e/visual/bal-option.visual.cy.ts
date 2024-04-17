describe('bal-option', () => {
  describe('basic', () => {
    beforeEach(() => cy.visit('/components/bal-option/test/bal-option.visual.html').waitForDesignSystem())

    it('basic component', () => {
      cy.getByTestId('basic').testVisual('option-basic')
    })

    it('listbox', () => {
      cy.getByTestId('listbox').testVisual('option-listbox')
    })

    it('listbox-with-checkboxes', () => {
      cy.getByTestId('listbox-checkbox').testVisual('option-listbox-checkbox')
    })
  })
})
