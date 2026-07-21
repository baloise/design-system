describe('bal-shape', () => {
  context('a11y', () => {
    beforeEach(() => cy.platform('desktop').pageA11y('/components/bal-shape/test/bal-shape.cy.html'))

    describe('have the AA standard', () => {
      it('basic', () => {
        cy.getByTestId('basic').testA11y()
      })

      testColorA11y(['green', 'green-light', 'red', 'red-light', 'purple', 'purple-light', 'yellow', 'yellow-light'])
    })
  })
})

function testColorA11y(colors: BalProps.BalShapeColor[]) {
  for (let index = 0; index < colors.length; index++) {
    const color = colors[index]
    it(`color ${color}`, () => {
      cy.getByTestId('basic').setProperty('color', color).testA11y()
    })
  }
}
