describe('bal-accordion', () => {
  context('v1', () => {
    beforeEach(() => cy.visit('/components/bal-accordion/test/bal-accordion.visual.html').waitForDesignSystem())

    it('basic component', () => {
      cy.platform('desktop')
      cy.getByTestId('basic').compareSnapshot('accordion-desktop')
      cy.getByTestId('basic').click()
      cy.getByTestId('basic').compareSnapshot('accordion-desktop-open')
      cy.getByTestId('basic').click()
      cy.getByTestId('basic').compareSnapshot('accordion-desktop-closed')

      cy.platform('tablet')
      cy.getByTestId('basic').compareSnapshot('accordion-tablet')
      cy.getByTestId('basic').click()
      cy.getByTestId('basic').compareSnapshot('accordion-tablet-open')
      cy.getByTestId('basic').click()
      cy.getByTestId('basic').compareSnapshot('accordion-tablet-closed')

      cy.platform('mobile')
      cy.getByTestId('basic').compareSnapshot('accordion-mobile')
      cy.getByTestId('basic').click()
      cy.getByTestId('basic').compareSnapshot('accordion-mobile-open')
      cy.getByTestId('basic').click()
      cy.getByTestId('basic').compareSnapshot('accordion-mobile-closed')
    })

    it('with card', () => {
      cy.platform('desktop')
      cy.getByTestId('with-card').compareSnapshot('accordion-with-card')
      cy.getByTestId('with-card').click()
      cy.getByTestId('with-card').compareSnapshot('accordion-with-card-open')
      cy.getByTestId('with-card').click()
      cy.getByTestId('with-card').compareSnapshot('accordion-with-card-closed')
    })
  })

  context('v2', () => {
    beforeEach(() => cy.visit('/components/bal-accordion/test/bal-accordion.v2.visual.html').waitForDesignSystem())

    it('basic component', () => {
      cy.platform('desktop')
      cy.getByTestId('basic').compareSnapshot('accordion-v2-desktop')
      cy.getByTestId('basic').click()
      cy.getByTestId('basic').compareSnapshot('accordion-v2-desktop-open')
      cy.getByTestId('basic').click()
      cy.getByTestId('basic').compareSnapshot('accordion-v2-desktop-closed')

      cy.platform('tablet')
      cy.getByTestId('basic').compareSnapshot('accordion-v2-tablet')
      cy.getByTestId('basic').click()
      cy.getByTestId('basic').compareSnapshot('accordion-v2-tablet-open')
      cy.getByTestId('basic').click()
      cy.getByTestId('basic').compareSnapshot('accordion-v2-tablet-closed')

      cy.platform('mobile')
      cy.getByTestId('basic').compareSnapshot('accordion-v2-mobile')
      cy.getByTestId('basic').click()
      cy.getByTestId('basic').compareSnapshot('accordion-v2-mobile-open')
      cy.getByTestId('basic').click()
      cy.getByTestId('basic').compareSnapshot('accordion-v2-mobile-closed')
    })

    it('stack component', () => {
      cy.platform('desktop')
      cy.getByTestId('stack').compareSnapshot('accordion-v2-stack-desktop')
      cy.getByTestId('stack').click()
      cy.getByTestId('stack').compareSnapshot('accordion-v2-stack-desktop-open')
      cy.getByTestId('stack').click()
      cy.getByTestId('stack').compareSnapshot('accordion-v2-stack-desktop-closed')
    })

    it('button component', () => {
      cy.platform('desktop')
      cy.getByTestId('button').compareSnapshot('accordion-v2-button-desktop')
    })
  })
})
