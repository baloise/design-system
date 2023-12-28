describe('bal-heading', () => {
  context('a11y', () => {
    beforeEach(() => cy.platform('desktop').pageA11y('/components/bal-heading/test/bal-heading.cy.html'))

    describe('have the AA standard', () => {
      it('basic', () => {
        cy.getByTestId('basic').testA11y()
      })

      testColorA11y(['primary', 'info', 'success', 'white', 'danger', 'blue', 'warning'])
      testSizeA11y([
        'display',
        'display-2',
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'xxxxx-large',
        'xxxx-large',
        'xxx-large',
        'xx-large',
        'x-large',
        'large',
        'medium',
        'normal',
      ])
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

function testSizeA11y(levels: BalProps.BalHeadingVisualLevel[]) {
  for (let index = 0; index < levels.length; index++) {
    const level = levels[index]
    it(`levels ${level}`, () => {
      cy.getByTestId('basic').setProperty('level', level).testA11y()
    })
  }
}
