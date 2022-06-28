## Testing

The Baloise Design System provides a collection of custom cypress commands for our components. Moreover, some basic cypress commands like `should` or `click` have been overridden to work with our components.

- [More information about the installation and usage](/components/tooling/testing.html)

```typescript
import { byTestId } from '@baloise/design-system-testing'

describe('ProductSlider', () => {
  const slider = byTestId('my-product-slider') // [data-testid="my-product-slider"]
  it('should have text', () => {
    page.open()
    cy.get(page.slider).contains('Product 1')
    cy.get(page.slider).contains('Product 3')
  })

  it('should not have scrolled', () => {
    page.open()
    cy.get('.bal-product-slider__product-container').should('not.have.attr', 'style', 'transform: translate(-360px);')
  })

  it('should have scrolled', () => {
    page.open()
    cy.get('.bal-product-slider__control-container .right').click()
    cy.get('.bal-product-slider__product-container').should('have.attr', 'style', 'transform: translate(-360px);')
  })
})
```
