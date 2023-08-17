describe('bal-radio', () => {
  beforeEach(() => cy.visit('/components/form/bal-radio/test/bal-radio.visual.html').waitForDesignSystem())

  testRadio('basic')
  testRadio('select-button')

  function testRadio(interface: 'basic' | 'select-button') {
    it(`${interface} component`, () => {
      cy.platform('desktop')
      cy.getByTestId(`${interface}`).compareSnapshot(`${interface}`)

      cy.platform('mobile')
      cy.getByTestId(`${interface}`).compareSnapshot(`${interface}-mobile`)
    })
    it(`${interface} disabled`, () => {
      cy.platform('desktop')
      cy.getByTestId(`${interface}-disabled`).compareSnapshot(`${interface}-disabled`)

      cy.platform('mobile')
      cy.getByTestId(`${interface}-disabled`).compareSnapshot(`${interface}-disabled-mobile`)
    })
    it(`${interface} invalid`, () => {
      cy.platform('desktop')
      cy.getByTestId(`${interface}-invalid`).compareSnapshot(`${interface}-invalid`)

      cy.platform('mobile')
      cy.getByTestId(`${interface}-invalid`).compareSnapshot(`${interface}-invalid-mobile`)
    })
    it(`${interface} field`, () => {
      cy.platform('desktop')
      cy.getByTestId(`${interface}-field`).compareSnapshot(`${interface}-field`)

      cy.platform('mobile')
      cy.getByTestId(`${interface}-field`).compareSnapshot(`${interface}-field-mobile`)
    })
    it(`${interface} vertical`, () => {
      cy.platform('desktop')
      cy.getByTestId(`${interface}-vertical`).compareSnapshot(`${interface}-vertical`)

      cy.platform('mobile')
      cy.getByTestId(`${interface}-vertical`).compareSnapshot(`${interface}-vertical-mobile`)
    })
    it(`${interface} vertical-on-mobile`, () => {
      cy.platform('desktop')
      cy.getByTestId(`${interface}-vertical-on-mobile`).compareSnapshot(`${interface}-vertical-on-mobile`)

      cy.platform('mobile')
      cy.getByTestId(`${interface}-vertical-on-mobile`).compareSnapshot(`${interface}-vertical-on-mobile-mobile`)
    })
    it(`${interface} expanded`, () => {
      cy.platform('desktop')
      cy.getByTestId(`${interface}-expanded`).compareSnapshot(`${interface}-expanded`)

      cy.platform('mobile')
      cy.getByTestId(`${interface}-expanded`).compareSnapshot(`${interface}-expanded-mobile`)
    })
  }
})
