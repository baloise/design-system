describe('bal-form', () => {
  beforeEach(() => {
    cy.visit('/test/form-arialabelledby.html')
    cy.waitForDesignSystem()
  })

  context('checkbox', () => {
    it('should link label and input with aria-labelledby attribute', () => {
      cy.getByTestId('checkbox-basic')
        .find('bal-checkbox > input')
        .invoke('attr', 'aria-labelledby')
        .then(result => {
          cy.getByTestId('checkbox-basic').find('bal-checkbox > label').invoke('attr', 'id').should('eq', result)
        })
    })

    it('should link label and input with for attribute', () => {
      cy.getByTestId('checkbox-basic')
        .find('bal-checkbox > label')
        .invoke('attr', 'for')
        .then(result => {
          cy.getByTestId('checkbox-basic').find('bal-checkbox > input').invoke('attr', 'id').should('eq', result)
        })
    })
  })

  context('radio', () => {
    it('should link label and input with aria-labelledby attribute', () => {
      function shouldHaveLabelledBy(index: number) {
        cy.getByTestId('radio-basic')
          .find('bal-radio-group')
          .find('bal-radio')
          .eq(index)
          .find('input')
          .invoke('attr', 'aria-labelledby')
          .then(result => {
            cy.getByTestId('radio-basic')
              .find('bal-radio-group bal-radio')
              .eq(index)
              .find('label')
              .invoke('attr', 'id')
              .should('eq', result)
          })
      }

      shouldHaveLabelledBy(0)
      shouldHaveLabelledBy(1)
      shouldHaveLabelledBy(2)
    })

    it('should link label and input with for attribute', () => {
      function shouldHaveFor(index: number) {
        cy.getByTestId('radio-basic')
          .find('bal-radio-group')
          .find('bal-radio')
          .eq(index)
          .find('label')
          .invoke('attr', 'for')
          .then(result => {
            cy.getByTestId('radio-basic')
              .find('bal-radio-group bal-radio')
              .eq(index)
              .find('input')
              .invoke('attr', 'id')
              .should('eq', result)
          })
      }

      shouldHaveFor(0)
      shouldHaveFor(1)
      shouldHaveFor(2)
    })
  })

  context('field checkbox', () => {
    it('should link label and input with aria-labelledby attribute', () => {
      cy.getByTestId('form-checkbox')
        .find('bal-checkbox > input')
        .invoke('attr', 'aria-labelledby')
        .then(result => {
          cy.getByTestId('form-checkbox')
            .find('bal-checkbox > label')
            .invoke('attr', 'id')
            .should('be.oneOf', result.split(' '))
          cy.getByTestId('form-checkbox')
            .find('bal-field-label > bal-label > label')
            .invoke('attr', 'id')
            .should('be.oneOf', result.split(' '))
        })
    })

    it('should link label and input with for attribute', () => {
      cy.getByTestId('form-checkbox')
        .find('bal-checkbox > input')
        .invoke('attr', 'id')
        .then(result => {
          cy.getByTestId('form-checkbox')
            .find('bal-checkbox > label')
            .invoke('attr', 'for')
            .should('be.oneOf', result.split(' '))
          cy.getByTestId('form-checkbox')
            .find('bal-field-label > bal-label > label')
            .invoke('attr', 'for')
            .should('be.oneOf', result.split(' '))
        })
    })
  })

  context('field radio', () => {
    it('should link label and input with aria-labelledby attribute', () => {
      function shouldHaveLabelledBy(index: number) {
        cy.getByTestId('form-radio')
          .find('bal-radio > input')
          .eq(index)
          .invoke('attr', 'aria-labelledby')
          .then(result => {
            cy.getByTestId('form-radio')
              .find('bal-radio > label')
              .eq(index)
              .invoke('attr', 'id')
              .should('be.oneOf', result.split(' '))
            cy.getByTestId('form-radio')
              .find('bal-field-label > bal-label > label')
              .invoke('attr', 'id')
              .should('be.oneOf', result.split(' '))
          })
      }

      shouldHaveLabelledBy(0)
      shouldHaveLabelledBy(1)
      shouldHaveLabelledBy(2)
    })

    it('should link label and input with for attribute', () => {
      function shouldHaveFor(index: number) {
        cy.getByTestId('form-radio')
          .find('bal-radio > input')
          .eq(index)
          .invoke('attr', 'id')
          .then(result => {
            cy.getByTestId('form-radio')
              .find('bal-radio > label')
              .eq(index)
              .invoke('attr', 'for')
              .should('be.oneOf', result.split(' '))
            if (index === 0) {
              cy.getByTestId('form-radio')
                .find('bal-field-label > bal-label > label')
                .invoke('attr', 'for')
                .should('be.oneOf', result.split(' '))
            }
          })
      }

      shouldHaveFor(0)
      shouldHaveFor(1)
      shouldHaveFor(2)
    })
  })
})
