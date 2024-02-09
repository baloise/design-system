describe('bal-file-upload', () => {
  beforeEach(() => cy.visit('/components/bal-file-upload/test/bal-file-upload.visual.html').waitForDesignSystem())

  it('basic component', () => {
    cy.platform('desktop')
    cy.getByTestId('basic').testVisual('file-upload-basic-desktop')
    cy.getByTestId('disabled').testVisual('file-upload-disabled-desktop')
    cy.getByTestId('invalid').testVisual('file-upload-invalid-desktop')
    cy.getByTestId('readonly').testVisual('file-upload-readonly-desktop')

    cy.platform('tablet')
    cy.getByTestId('basic').testVisual('file-upload-basic-tablet')
    cy.getByTestId('disabled').testVisual('file-upload-disabled-tablet')
    cy.getByTestId('invalid').testVisual('file-upload-invalid-tablet')
    cy.getByTestId('readonly').testVisual('file-upload-readonly-tablet')

    cy.platform('mobile')
    cy.getByTestId('basic').testVisual('file-upload-basic-mobile')
    cy.getByTestId('disabled').testVisual('file-upload-disabled-mobile')
    cy.getByTestId('invalid').testVisual('file-upload-invalid-mobile')
    cy.getByTestId('readonly').testVisual('file-upload-readonly-mobile')
  })
})
