describe('css-display.visual', () => {
  beforeEach(() => cy.visit('/test/css-display.visual.html').platform('desktop'))

  it('basic', () => {
    cy.platform('desktop')
    cy.getByTestId('display-block').compareSnapshot('css-display-block-desktop')
    cy.getByTestId('display-flex').compareSnapshot('css-display-flex-desktop')
    cy.getByTestId('display-inline').compareSnapshot('css-display-inline-desktop')
    cy.getByTestId('display-inline-block').compareSnapshot('css-display-inline-block-desktop')
    cy.getByTestId('display-inline-flex').compareSnapshot('css-display-inline-flex-desktop')
    cy.getByTestId('hidden').compareSnapshot('css-display-hidden-desktop')

    cy.platform('tablet')
    cy.getByTestId('display-block').compareSnapshot('css-display-block-tablet')
    cy.getByTestId('display-flex').compareSnapshot('css-display-flex-tablet')
    cy.getByTestId('display-inline').compareSnapshot('css-display-inline-tablet')
    cy.getByTestId('display-inline-block').compareSnapshot('css-display-inline-block-tablet')
    cy.getByTestId('display-inline-flex').compareSnapshot('css-display-inline-flex-tablet')
    cy.getByTestId('hidden').compareSnapshot('css-display-hidden-tablet')

    cy.platform('mobile')
    cy.getByTestId('display-block').compareSnapshot('css-display-block-mobile')
    cy.getByTestId('display-flex').compareSnapshot('css-display-flex-mobile')
    cy.getByTestId('display-inline').compareSnapshot('css-display-inline-mobile')
    cy.getByTestId('display-inline-block').compareSnapshot('css-display-inline-block-mobile')
    cy.getByTestId('display-inline-flex').compareSnapshot('css-display-inline-flex-mobile')
    cy.getByTestId('hidden').compareSnapshot('css-display-hidden-mobile')
  })
})
