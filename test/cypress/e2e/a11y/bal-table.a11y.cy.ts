describe('bal-table', () => {
  context('a11y', () => {
    beforeEach(() => cy.platform('desktop').pageA11y('/components/bal-table/test/bal-table.cy.html'))

    describe('have the AA standard', () => {
      it('basic', () => {
        cy.getByTestId('basic').testA11y()
      })

      // testColorA11y(['blue', 'purple', 'green', 'red', 'yellow'])
    })
  })
})

// function testColorA11y(colors: BalProps.BalStageColor[]) {
//   for (let index = 0; index < colors.length; index++) {
//     const color = colors[index]
//     it(`color ${color}`, () => {
//       cy.getByTestId('basic').setProperty('color', color).testA11y()
//     })
//   }
// }
