describe('bal-input-group', () => {
  beforeEach(() => cy.page('/components/form/bal-input-group/test/bal-input-group.visual.html'))

  it('basic component', () => {
    cy.platform('desktop')
    cy.getByTestId('basic').compareSnapshot('input-group-basic', 0.0)
    cy.getByTestId('basic-disabled').compareSnapshot('input-group-basic-disabled', 0.0)
    cy.getByTestId('basic-invalid').compareSnapshot('input-group-basic-invalid', 0.0)

    cy.platform('mobile')
    cy.getByTestId('basic').compareSnapshot('input-group-basic-mobile', 0.0)
    cy.getByTestId('basic-disabled').compareSnapshot('input-group-basic-disabled-mobile', 0.0)
    cy.getByTestId('basic-invalid').compareSnapshot('input-group-basic-invalid-mobile', 0.0)
  })

  it('icon component', () => {
    cy.platform('desktop')
    cy.getByTestId('icon').compareSnapshot('input-group-icon', 0.0)
    cy.getByTestId('icon-disabled').compareSnapshot('input-group-icon-disabled', 0.0)
    cy.getByTestId('icon-invalid').compareSnapshot('input-group-icon-invalid', 0.0)

    cy.platform('mobile')
    cy.getByTestId('icon').compareSnapshot('input-group-icon-mobile', 0.0)
    cy.getByTestId('icon-disabled').compareSnapshot('input-group-icon-disabled-mobile', 0.0)
    cy.getByTestId('icon-invalid').compareSnapshot('input-group-icon-invalid-mobile', 0.0)
  })

  it('phone component', () => {
    cy.platform('desktop')
    cy.getByTestId('phone').compareSnapshot('input-group-phone', 0.0)
    cy.getByTestId('phone-disabled').compareSnapshot('input-group-phone-disabled', 0.0)
    cy.getByTestId('phone-invalid').compareSnapshot('input-group-phone-invalid', 0.0)

    cy.platform('mobile')
    cy.getByTestId('phone').compareSnapshot('input-group-phone-mobile', 0.0)
    cy.getByTestId('phone-disabled').compareSnapshot('input-group-phone-disabled-mobile', 0.0)
    cy.getByTestId('phone-invalid').compareSnapshot('input-group-phone-invalid-mobile', 0.0)
  })

  it('tags component', () => {
    cy.platform('desktop')
    cy.getByTestId('tags').compareSnapshot('input-group-tags', 0.0)
    cy.getByTestId('tags-disabled').compareSnapshot('input-group-tags-disabled', 0.0)
    cy.getByTestId('tags-invalid').compareSnapshot('input-group-tags-invalid', 0.0)

    cy.platform('mobile')
    cy.getByTestId('tags').compareSnapshot('input-group-tags-mobile', 0.0)
    cy.getByTestId('tags-disabled').compareSnapshot('input-group-tags-disabled-mobile', 0.0)
    cy.getByTestId('tags-invalid').compareSnapshot('input-group-tags-invalid-mobile', 0.0)
  })
})
