describe('bal-label', () => {
  context('a11y', () => {
    beforeEach(() => cy.platform('desktop').pageA11y('/components/bal-label/test/bal-label.a11y.html'))

    describe('have the AA standard', () => {
      it('basic', () => {
        cy.getByTestId('basic').testA11y()
      })
      it('invalid', () => {
        cy.getByTestId('invalid').testA11y()
      })
      it('disabled', () => {
        cy.getByTestId('disabled').testA11y()
      })
      it('valid', () => {
        cy.getByTestId('valid').testA11y()
      })

      testSizesA11y(['small', 'large', 'x-large', 'xx-large', 'xxx-large'])
    })
  })
})

function testSizesA11y(sizes: BalProps.BalLabelSize[]) {
  for (let index = 0; index < sizes.length; index++) {
    const size = sizes[index]
    it(`size ${size}`, () => {
      cy.getByTestId('basic').setProperty('size', size).testA11y()
    })
  }
}
