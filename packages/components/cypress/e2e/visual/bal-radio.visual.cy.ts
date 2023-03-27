describe('bal-radio', () => {
  beforeEach(() => cy.visit('/components/form/bal-radio/test/bal-radio.visual.html').waitForDesignSystem())

  testRadio('basic')
  testRadio('select-button')

  function testRadio(interface: 'basic' | 'select-button') {
    it(`${interface} component`, () => {
      cy.platform('desktop')
      cy.getByTestId(`${interface}`).compareSnapshot(`${interface}`, 0.0)

      cy.platform('mobile')
      cy.getByTestId(`${interface}`).compareSnapshot(`${interface}-mobile`, 0.0)
    })
    it(`${interface} disabled`, () => {
      cy.platform('desktop')
      cy.getByTestId(`${interface}-disabled`).compareSnapshot(`${interface}-disabled`, 0.0)

      cy.platform('mobile')
      cy.getByTestId(`${interface}-disabled`).compareSnapshot(`${interface}-disabled-mobile`, 0.0)
    })
    it(`${interface} invalid`, () => {
      cy.platform('desktop')
      cy.getByTestId(`${interface}-invalid`).compareSnapshot(`${interface}-invalid`, 0.0)

      cy.platform('mobile')
      cy.getByTestId(`${interface}-invalid`).compareSnapshot(`${interface}-invalid-mobile`, 0.0)
    })
    it(`${interface} field`, () => {
      cy.platform('desktop')
      cy.getByTestId(`${interface}-field`).compareSnapshot(`${interface}-field`, 0.0)

      cy.platform('mobile')
      cy.getByTestId(`${interface}-field`).compareSnapshot(`${interface}-field-mobile`, 0.0)
    })
    it(`${interface} vertical`, () => {
      cy.platform('desktop')
      cy.getByTestId(`${interface}-vertical`).compareSnapshot(`${interface}-vertical`, 0.0)

      cy.platform('mobile')
      cy.getByTestId(`${interface}-vertical`).compareSnapshot(`${interface}-vertical-mobile`, 0.0)
    })
    it(`${interface} vertical-on-mobile`, () => {
      cy.platform('desktop')
      cy.getByTestId(`${interface}-vertical-on-mobile`).compareSnapshot(`${interface}-vertical-on-mobile`, 0.0)

      cy.platform('mobile')
      cy.getByTestId(`${interface}-vertical-on-mobile`).compareSnapshot(`${interface}-vertical-on-mobile-mobile`, 0.0)
    })
    it(`${interface} expanded`, () => {
      cy.platform('desktop')
      cy.getByTestId(`${interface}-expanded`).compareSnapshot(`${interface}-expanded`, 0.0)

      cy.platform('mobile')
      cy.getByTestId(`${interface}-expanded`).compareSnapshot(`${interface}-expanded-mobile`, 0.0)
    })
  }
})
