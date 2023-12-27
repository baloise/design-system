describe('bal-text', () => {
  context('a11y', () => {
    beforeEach(() => cy.platform('desktop').pageA11y('/components/bal-text/test/bal-text.cy.html'))

    describe('have the AA standard', () => {
      it('basic', () => {
        cy.getByTestId('basic').testA11y()
      })

      testColorA11y([
        'light-blue',
        'blue-dark',
        'blue-light',
        'primary-light',
        'white',
        'black',
        'grey',
        'primary',
        'blue',
        'info',
        'success',
        'danger',
        'warning',
      ])

      testSizeA11y(['block', 'lead', 'small'])
    })
  })
})

function testColorA11y(colors: BalProps.BalTextColor[]) {
  for (let index = 0; index < colors.length; index++) {
    const color = colors[index]
    it(`color ${color}`, () => {
      cy.getByTestId('basic').setProperty('color', color).testA11y()
    })
  }
}

function testSizeA11y(sizes: BalProps.BalTextSize[]) {
  for (let index = 0; index < sizes.length; index++) {
    const size = sizes[index]
    it(`sizes ${size}`, () => {
      cy.getByTestId('basic').setProperty('sizes', size).testA11y()
    })
  }
}
