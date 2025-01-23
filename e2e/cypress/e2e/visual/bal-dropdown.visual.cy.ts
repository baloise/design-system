import { testOnPlatforms } from 'support/utils'

describe('bal-dropdown', () => {
  beforeEach(() => {
    cy.visit('/components/bal-dropdown/test/bal-dropdown.visual.html')
    cy.waitForDesignSystem()
  })

  testOnPlatforms(['desktop', 'mobile'], platform => {
    it('basic', () => {
      cy.getByTestId('basic').testVisual(`dropdown-${platform}-basic-empty-closed`)
      cy.getByPlaceholder('visual-basic').click()
      cy.getByTestId('basic').testVisual(`dropdown-${platform}-basic-empty-open`)
      cy.getByTestId('basic').within(() => {
        cy.getByRole('option', { name: '1992' }).click()
      })
      cy.getByTestId('basic').testVisual(`dropdown-${platform}-basic-empty-selected`)
    })

    it('long-content', () => {
      cy.getByTestId('long-content').testVisual(`dropdown-${platform}-long-content-empty-closed`)
      cy.getByPlaceholder('visual-long-content').click()
      cy.getByTestId('long-content').testVisual(`dropdown-${platform}-long-content-empty-open`)
    })

    it('multiple', () => {
      cy.getByTestId('multiple').testVisual(`dropdown-${platform}-multiple-empty-closed`)
      cy.getByPlaceholder('visual-multiple').click()
      cy.getByTestId('multiple').testVisual(`dropdown-${platform}-multiple-empty-open`)
      cy.getByTestId('multiple').within(() => {
        cy.getByRole('option', { name: '1991' }).click()
        cy.getByRole('option', { name: '1992' }).click()
      })
      cy.getByTestId('multiple').testVisual(`dropdown-${platform}-multiple-empty-selected`)
    })

    it('multiple-chips', () => {
      cy.getByTestId('multiple-chips').testVisual(`dropdown-${platform}-multiple-chips-empty-closed`)
      cy.getByPlaceholder('visual-multiple-chips').click({ force: true })
      cy.getByTestId('multiple-chips').testVisual(`dropdown-${platform}-multiple-chips-empty-open`)
    })

    it('form-field', () => {
      cy.getByTestId('form-field').testVisual(`dropdown-${platform}-form-field-empty-closed`)
      cy.getByPlaceholder('visual-form-field').click()
      cy.getByTestId('form-field').testVisual(`dropdown-${platform}-form-field-empty-open`)
    })

    it('small-purple', () => {
      cy.getByTestId('small-purple').testVisual(`dropdown-${platform}-small-purple`)
    })
  })

  context('states', () => {
    beforeEach(() => {
      cy.platform('desktop')
    })

    it('clearable', () => {
      cy.getByTestId('clearable').testVisual(`dropdown-clearable-empty-closed`)
      cy.getByPlaceholder('visual-clearable').click()
      cy.getByTestId('multiple').testVisual(`dropdown-clearable-empty-open`)
      cy.getByTestId('clearable').within(() => {
        cy.getByRole('option', { name: '1988' }).click()
      })
      cy.getByTestId('clearable').testVisual(`dropdown-clearable-empty-selected`)
    })

    it('loading', () => {
      cy.getByTestId('loading').testVisual(`dropdown-loading-empty-closed`)
    })

    it('invalid', () => {
      cy.getByTestId('invalid').testVisual(`dropdown-invalid-empty-closed`)
    })

    it('disabled', () => {
      cy.getByTestId('disabled').testVisual(`dropdown-disabled-empty-closed`)
    })
  })
})
