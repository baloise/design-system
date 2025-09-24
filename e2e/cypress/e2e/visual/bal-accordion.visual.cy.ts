describe('bal-accordion', () => {
  it('basic component - desktop', () => {
    cy.visit('/components/bal-accordion/test/bal-accordion.v2.visual.html').platform('desktop').waitForDesignSystem()

    cy.getByTestId('basic').waitForComponents()
    cy.getByTestId('basic').testVisual('accordion-v2-desktop')
    cy.getByTestId('basic').click()
    cy.getByTestId('basic').waitForComponents()
    cy.getByTestId('basic').testVisual('accordion-v2-desktop-open')
    cy.getByTestId('basic').click()
    cy.getByTestId('basic').waitForComponents()
    cy.getByTestId('basic').testVisual('accordion-v2-desktop-closed')
  })

  it('basic component - tablet', () => {
    cy.visit('/components/bal-accordion/test/bal-accordion.v2.visual.html').platform('tablet').waitForDesignSystem()

    cy.getByTestId('basic').waitForComponents()
    cy.getByTestId('basic').testVisual('accordion-v2-tablet')
    cy.getByTestId('basic').click()
    cy.getByTestId('basic').waitForComponents()
    cy.getByTestId('basic').testVisual('accordion-v2-tablet-open')
    cy.getByTestId('basic').click()
    cy.getByTestId('basic').waitForComponents()
    cy.getByTestId('basic').testVisual('accordion-v2-tablet-closed')
  })

  it('basic component - mobile', () => {
    cy.visit('/components/bal-accordion/test/bal-accordion.v2.visual.html').platform('mobile').waitForDesignSystem()

    cy.getByTestId('basic').waitForComponents()
    cy.getByTestId('basic').testVisual('accordion-v2-mobile')
    cy.getByTestId('basic').click()
    cy.getByTestId('basic').waitForComponents()
    cy.getByTestId('basic').testVisual('accordion-v2-mobile-open')
    cy.getByTestId('basic').click()
    cy.getByTestId('basic').waitForComponents()
    cy.getByTestId('basic').testVisual('accordion-v2-mobile-closed')
  })

  it('stack component', () => {
    cy.visit('/components/bal-accordion/test/bal-accordion.v2.stack.visual.html')
      .platform('desktop')
      .waitForDesignSystem()

    cy.getByTestId('stack').waitForComponents()
    cy.getByTestId('stack').testVisual('accordion-v2-stack-desktop')
    cy.getByTestId('stack').click()
    cy.getByTestId('stack').waitForComponents()
    cy.getByTestId('stack').testVisual('accordion-v2-stack-desktop-open')
    cy.getByTestId('stack').click()
    cy.getByTestId('stack').waitForComponents()
    cy.getByTestId('stack').testVisual('accordion-v2-stack-desktop-closed')
  })

  it('text-variant component', () => {
    cy.visit('/components/bal-accordion/test/bal-accordion.v2.text.visual.html')
      .platform('desktop')
      .waitForDesignSystem()

    cy.getByTestId('text-variant').waitForComponents()
    cy.getByTestId('text-variant').testVisual('accordion-v2-text-variant-desktop')
    cy.getByTestId('text-variant').click()
    cy.getByTestId('text-variant').waitForComponents()
    cy.getByTestId('text-variant').testVisual('accordion-v2-text-variant-desktop-open')
    cy.getByTestId('text-variant').click()
    cy.getByTestId('text-variant').waitForComponents()
    cy.getByTestId('text-variant').testVisual('accordion-v2-text-variant-desktop-closed')
  })

  it('button component', () => {
    cy.visit('/components/bal-accordion/test/bal-accordion.v2.button.visual.html')
      .platform('desktop')
      .waitForDesignSystem()

    cy.getByTestId('button').waitForComponents().testVisual('accordion-v2-button-desktop')
  })
})
