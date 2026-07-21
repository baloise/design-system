describe('bal-divider', () => {
  context('a11y', () => {
    beforeEach(() => cy.platform('desktop').pageA11y('/components/bal-divider/test/bal-divider.cy.html'))

    describe('have the AA standard', () => {
      it('basic', () => {
        cy.getByTestId('basic').testA11y()
      })

      testColorA11y([
        'primary',
        'primary-light',
        'primary-dark',
        'grey-light',
        'grey',
        'grey-dark',
        'warning',
        'success',
        'danger',
        'danger-dark',
        'danger-darker',
        'white',
        'light-blue',
      ])
    })
  })
})

function testColorA11y(colors: BalProps.BalDividerColor[]) {
  for (let index = 0; index < colors.length; index++) {
    const color = colors[index]
    it(`color ${color}`, () => {
      cy.getByTestId('basic').setProperty('color', color).testA11y()
    })
  }
}
