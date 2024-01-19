describe('bal-tag', () => {
  context('a11y', () => {
    beforeEach(() => cy.platform('desktop').pageA11y('/components/bal-icon/test/bal-icon.a11y.html'))

    describe('have the AA standard', () => {
      it('basic', () => {
        cy.getByTestId('basic').testA11y()
      })

      testColorA11y([
        'blue',
        'light-blue',
        'success',
        'success-dark',
        'success-darker',
        'danger',
        'danger-dark',
        'danger-darker',
        'warning',
        'warning-dark',
        'warning-darker',
        'white',
        'grey',
        'grey-light',
        'primary',
        'primary-light',
        'primary-dark',
      ])

      testSizeA11y(['xsmall', 'x-small', 'small', 'medium', 'large', 'x-large', 'xx-large'])
    })
  })
})

function testColorA11y(colors: BalProps.BalIconColor[]) {
  for (let index = 0; index < colors.length; index++) {
    const color = colors[index]
    it(`color ${color}`, () => {
      cy.getByTestId('basic').setProperty('color', color).testA11y()
    })
  }
}

function testSizeA11y(sizes: BalProps.BalIconSize[]) {
  for (let index = 0; index < sizes.length; index++) {
    const size = sizes[index]
    it(`size ${size}`, () => {
      cy.getByTestId('basic').setProperty('size', size).testA11y()
    })
  }
}
