describe('bal-input-group', () => {
  beforeEach(() => cy.visit('/components/form/bal-input-group/test/bal-input-group.visual.html').waitForDesignSystem())

  it('basic component', () => {
    cy.platform('desktop')
    cy.getByTestId('basic').compareSnapshot('input-group-basic')
    cy.getByTestId('basic-disabled').compareSnapshot('input-group-basic-disabled')
    cy.getByTestId('basic-invalid').compareSnapshot('input-group-basic-invalid')

    cy.platform('mobile')
    cy.getByTestId('basic').compareSnapshot('input-group-basic-mobile')
    cy.getByTestId('basic-disabled').compareSnapshot('input-group-basic-disabled-mobile')
    cy.getByTestId('basic-invalid').compareSnapshot('input-group-basic-invalid-mobile')
  })

  it('icon component', () => {
    cy.platform('desktop')
    cy.getByTestId('icon').compareSnapshot('input-group-icon')
    cy.getByTestId('icon-disabled').compareSnapshot('input-group-icon-disabled')
    cy.getByTestId('icon-invalid').compareSnapshot('input-group-icon-invalid')

    cy.platform('mobile')
    cy.getByTestId('icon').compareSnapshot('input-group-icon-mobile')
    cy.getByTestId('icon-disabled').compareSnapshot('input-group-icon-disabled-mobile')
    cy.getByTestId('icon-invalid').compareSnapshot('input-group-icon-invalid-mobile')
  })

  it('phone component', () => {
    cy.platform('desktop')
    cy.getByTestId('phone').compareSnapshot('input-group-phone')
    cy.getByTestId('phone-disabled').compareSnapshot('input-group-phone-disabled')
    cy.getByTestId('phone-invalid').compareSnapshot('input-group-phone-invalid')

    cy.platform('mobile')
    cy.getByTestId('phone').compareSnapshot('input-group-phone-mobile')
    cy.getByTestId('phone-disabled').compareSnapshot('input-group-phone-disabled-mobile')
    cy.getByTestId('phone-invalid').compareSnapshot('input-group-phone-invalid-mobile')
  })

  it('tags component', () => {
    cy.platform('desktop')
    cy.getByTestId('tags').compareSnapshot('input-group-tags')
    cy.getByTestId('tags-disabled').compareSnapshot('input-group-tags-disabled')
    cy.getByTestId('tags-invalid').compareSnapshot('input-group-tags-invalid')

    cy.platform('mobile')
    cy.getByTestId('tags').compareSnapshot('input-group-tags-mobile')
    cy.getByTestId('tags-disabled').compareSnapshot('input-group-tags-disabled-mobile')
    cy.getByTestId('tags-invalid').compareSnapshot('input-group-tags-invalid-mobile')
  })
})
