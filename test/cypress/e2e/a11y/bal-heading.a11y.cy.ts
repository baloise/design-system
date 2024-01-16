describe('bal-heading', () => {
  context('a11y', () => {
    beforeEach(() => cy.platform('desktop').pageA11y('/components/bal-heading/test/bal-heading.a11y.html'))

    describe('have the AA standard', () => {
      it('basic', () => {
        cy.getByTestId('basic').testA11y()
      })

      it('sizes', () => {
        cy.getByTestId('display').testA11y()
        cy.getByTestId('display-2').testA11y()
        cy.getByTestId('h1').testA11y()
        cy.getByTestId('h2').testA11y()
        cy.getByTestId('h3').testA11y()
        cy.getByTestId('h4').testA11y()
        cy.getByTestId('h5').testA11y()

        cy.getByTestId('xxxxx-large').testA11y()
        cy.getByTestId('xxxx-large').testA11y()
        cy.getByTestId('xxx-large').testA11y()
        cy.getByTestId('xx-large').testA11y()
        cy.getByTestId('x-large').testA11y()
        cy.getByTestId('large').testA11y()
        cy.getByTestId('medium').testA11y()
        cy.getByTestId('normal').testA11y()
      })

      testColorA11y(['primary', 'info', 'success', 'white', 'danger', 'blue', 'warning'])
    })
  })
})

function testColorA11y(colors: BalProps.BalHeadingColor[]) {
  for (let index = 0; index < colors.length; index++) {
    const color = colors[index]
    it(`color ${color}`, () => {
      cy.getByTestId('basic').setProperty('color', color).testA11y()
    })
  }
}
