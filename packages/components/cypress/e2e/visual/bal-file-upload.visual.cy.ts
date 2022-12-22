describe('bal-file-upload', () => {
  beforeEach(() => cy.page('/components/form/bal-file-upload/test/bal-file-upload.visual.html'))

  it('basic component', () => {
    cy.platform('desktop')
    cy.getByTestId('basic').compareSnapshot('file-upload-basic-desktop', 0.0)
    cy.getByTestId('disabled').compareSnapshot('file-upload-disabled-desktop', 0.0)
    cy.getByTestId('invalid').compareSnapshot('file-upload-invalid-desktop', 0.0)
    cy.getByTestId('readonly').compareSnapshot('file-upload-readonly-desktop', 0.0)

    cy.platform('tablet')
    cy.getByTestId('basic').compareSnapshot('file-upload-basic-tablet', 0.0)
    cy.getByTestId('disabled').compareSnapshot('file-upload-disabled-tablet', 0.0)
    cy.getByTestId('invalid').compareSnapshot('file-upload-invalid-tablet', 0.0)
    cy.getByTestId('readonly').compareSnapshot('file-upload-readonly-tablet', 0.0)

    cy.platform('mobile')
    cy.getByTestId('basic').compareSnapshot('file-upload-basic-mobile', 0.0)
    cy.getByTestId('disabled').compareSnapshot('file-upload-disabled-mobile', 0.0)
    cy.getByTestId('invalid').compareSnapshot('file-upload-invalid-mobile', 0.0)
    cy.getByTestId('readonly').compareSnapshot('file-upload-readonly-mobile', 0.0)
  })
})
