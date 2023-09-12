---
'@baloise/design-system-testing': minor
---

The testing library now offers support for importing files on a per-file basis.

```typescript
/**
 * Here are the component-specific commands along with some helper functions.
 * 
 * cy.waitForDesignSystem()
 * cy.getByTestId('my-button')
 */
import '@baloise/design-system-testing/src/add-custom-commands'

/**
 * Presenting the refined Cypress basic commands, including optimized 'type' 
 * interactions for seamless functionality with web components
 */
import '@baloise/design-system-testing/src/add-override-commands'

/**
 * This is a collection of selectors tailored to locate the precise 
 * inner element of a component.
 * 
 * cy.get(selectors.button.label)
 */
import { selectors } from '@baloise/design-system-testing/src/selectors'
```