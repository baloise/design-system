describe('bal-input-group', () => {
  beforeEach(() => cy.visit('/components/bal-input-group/test/bal-input-group.visual.html').waitForDesignSystem())

  it('basic component', () => {
    cy.platform('desktop')
    cy.getByTestId('basic').testVisual('input-group-basic')
    cy.getByTestId('basic-disabled').testVisual('input-group-basic-disabled')
    cy.getByTestId('basic-invalid').testVisual('input-group-basic-invalid')

    cy.platform('mobile')
    cy.getByTestId('basic').testVisual('input-group-basic-mobile')
    cy.getByTestId('basic-disabled').testVisual('input-group-basic-disabled-mobile')
    cy.getByTestId('basic-invalid').testVisual('input-group-basic-invalid-mobile')
  })

  it('icon component', () => {
    cy.platform('desktop')
    cy.getByTestId('icon').testVisual('input-group-icon')
    cy.getByTestId('icon-disabled').testVisual('input-group-icon-disabled')
    cy.getByTestId('icon-invalid').testVisual('input-group-icon-invalid')

    cy.platform('mobile')
    cy.getByTestId('icon').testVisual('input-group-icon-mobile')
    cy.getByTestId('icon-disabled').testVisual('input-group-icon-disabled-mobile')
    cy.getByTestId('icon-invalid').testVisual('input-group-icon-invalid-mobile')
  })

  it('phone component', () => {
    cy.platform('desktop')
    cy.getByTestId('phone').testVisual('input-group-phone')
    cy.getByTestId('phone-disabled').testVisual('input-group-phone-disabled')
    cy.getByTestId('phone-invalid').testVisual('input-group-phone-invalid')
    cy.getByTestId('divider').testVisual('input-group-divider')
    cy.getByTestId('divider-disabled').testVisual('input-group-divider-disabled')
    cy.getByTestId('divider-invalid').testVisual('input-group-divider-invalid')
    cy.getByTestId('divider-field').testVisual('input-group-divider-field')

    cy.platform('mobile')
    cy.getByTestId('phone').testVisual('input-group-phone')
    cy.getByTestId('phone-disabled').testVisual('input-group-phone-disabled')
    cy.getByTestId('phone-invalid').testVisual('input-group-phone-invalid')
    cy.getByTestId('divider').testVisual('input-group-divider-mobile')
    cy.getByTestId('divider-disabled').testVisual('input-group-divider-disabled-mobile')
    cy.getByTestId('divider-invalid').testVisual('input-group-divider-invalid-mobile')
    cy.getByTestId('divider-field').testVisual('input-group-divider-field-mobile')
  })

  it('tags component', () => {
    cy.platform('desktop')
    cy.getByTestId('tags').testVisual('input-group-tags')
    cy.getByTestId('tags-disabled').testVisual('input-group-tags-disabled')
    cy.getByTestId('tags-invalid').testVisual('input-group-tags-invalid')

    cy.platform('mobile')
    cy.getByTestId('tags').testVisual('input-group-tags-mobile')
    cy.getByTestId('tags-disabled').testVisual('input-group-tags-disabled-mobile')
    cy.getByTestId('tags-invalid').testVisual('input-group-tags-invalid-mobile')
  })
})
