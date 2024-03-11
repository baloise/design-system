describe('bal-radio', () => {
  beforeEach(() => cy.visit('/components/bal-radio/test/bal-radio.visual.html').waitForDesignSystem())

  testRadio('basic')
  testRadio('select-button')

  function testRadio(interface: 'basic' | 'select-button') {
    it(`${interface} component`, () => {
      cy.platform('desktop')
      cy.getByTestId(`${interface}`).testVisual(`${interface}`)

      cy.platform('mobile')
      cy.getByTestId(`${interface}`).testVisual(`${interface}-mobile`)
    })
    it(`${interface} disabled`, () => {
      cy.platform('desktop')
      cy.getByTestId(`${interface}-disabled`).testVisual(`${interface}-disabled`)

      cy.platform('mobile')
      cy.getByTestId(`${interface}-disabled`).testVisual(`${interface}-disabled-mobile`)
    })
    it(`${interface} invalid`, () => {
      cy.platform('desktop')
      cy.getByTestId(`${interface}-invalid`).testVisual(`${interface}-invalid`)

      cy.platform('mobile')
      cy.getByTestId(`${interface}-invalid`).testVisual(`${interface}-invalid-mobile`)
    })
    it(`${interface} field`, () => {
      cy.platform('desktop')
      cy.getByTestId(`${interface}-field`).testVisual(`${interface}-field`)

      cy.platform('mobile')
      cy.getByTestId(`${interface}-field`).testVisual(`${interface}-field-mobile`)
    })
    it(`${interface} vertical`, () => {
      cy.platform('desktop')
      cy.getByTestId(`${interface}-vertical`).testVisual(`${interface}-vertical`)

      cy.platform('mobile')
      cy.getByTestId(`${interface}-vertical`).testVisual(`${interface}-vertical-mobile`)
    })
    it(`${interface} vertical-on-mobile`, () => {
      cy.platform('desktop')
      cy.getByTestId(`${interface}-vertical-on-mobile`).testVisual(`${interface}-vertical-on-mobile`)

      cy.platform('mobile')
      cy.getByTestId(`${interface}-vertical-on-mobile`).testVisual(`${interface}-vertical-on-mobile-mobile`)
    })
    it(`${interface} expanded`, () => {
      cy.platform('desktop')
      cy.getByTestId(`${interface}-expanded`).testVisual(`${interface}-expanded`)

      cy.platform('mobile')
      cy.getByTestId(`${interface}-expanded`).testVisual(`${interface}-expanded-mobile`)
    })
  }
})
