describe('bal-logo', () => {
  context('a11y', () => {
    beforeEach(() => cy.platform('desktop').pageA11y('/components/bal-logo/test/bal-logo.cy.html'))

    describe('have the AA standard', () => {
      it('basic', () => {
        cy.getByTestId('basic').testA11y()
      })

      testColorA11y(['blue', 'white'])
      testSizeA11y(['small'])
    })
  })
})

function testColorA11y(colors: BalProps.BalLogoColor[]) {
  for (let index = 0; index < colors.length; index++) {
    const color = colors[index]
    it(`color ${color}`, () => {
      cy.getByTestId('basic').setProperty('color', color).testA11y()
    })
  }
}

function testSizeA11y(sizes: BalProps.BalLogoSize[]) {
  for (let index = 0; index < sizes.length; index++) {
    const size = sizes[index]
    it(`size ${size}`, () => {
      cy.getByTestId('basic').setProperty('size', size).testA11y()
    })
  }
}
