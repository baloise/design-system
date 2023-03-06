describe.skip('bal-tag', () => {
  context('a11y', () => {
    beforeEach(() => cy.platform('desktop').pageA11y('/components/bal-tag/test/bal-tag.cy.html'))

    describe('have the AA standard', () => {
      it('basic', () => {
        cy.getByTestId('tag').testA11y()
      })

      testColorA11y(['primary', 'grey', 'info', 'success', 'warning', 'danger', 'purple', 'green', 'red', 'yellow'])

      describe('light version', () => {
        before(() => cy.getByTestId('tag').setProperty('light', true))
        testColorA11y(['primary', 'grey', 'info', 'success', 'warning', 'danger', 'purple', 'green', 'red', 'yellow'])
      })
    })
  })
})

function testColorA11y(colors: BalProps.BalTagColor[]) {
  for (let index = 0; index < colors.length; index++) {
    const color = colors[index]
    it(`color ${color}`, () => {
      cy.getByTestId('tag').setProperty('color', color).testA11y()
    })
  }
}
