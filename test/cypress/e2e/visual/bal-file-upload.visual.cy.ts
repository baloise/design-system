describe('bal-file-upload', () => {
  beforeEach(() => cy.visit('/components/form/bal-file-upload/test/bal-file-upload.visual.html').waitForDesignSystem())

  it('basic component', () => {
    cy.platform('desktop')
    cy.getByTestId('basic').compareSnapshot('file-upload-basic-desktop')
    cy.getByTestId('disabled').compareSnapshot('file-upload-disabled-desktop')
    cy.getByTestId('invalid').compareSnapshot('file-upload-invalid-desktop')
    cy.getByTestId('readonly').compareSnapshot('file-upload-readonly-desktop')

    cy.platform('tablet')
    cy.getByTestId('basic').compareSnapshot('file-upload-basic-tablet')
    cy.getByTestId('disabled').compareSnapshot('file-upload-disabled-tablet')
    cy.getByTestId('invalid').compareSnapshot('file-upload-invalid-tablet')
    cy.getByTestId('readonly').compareSnapshot('file-upload-readonly-tablet')

    cy.platform('mobile')
    cy.getByTestId('basic').compareSnapshot('file-upload-basic-mobile')
    cy.getByTestId('disabled').compareSnapshot('file-upload-disabled-mobile')
    cy.getByTestId('invalid').compareSnapshot('file-upload-invalid-mobile')
    cy.getByTestId('readonly').compareSnapshot('file-upload-readonly-mobile')
  })
})
