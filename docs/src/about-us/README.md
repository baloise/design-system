# Why a Design System

"The need for `Design Systems` goes hand in hand with the need for scale, efficiency, and consistency in Design."

[Design Systems: benefits, challenges & solutions](https://uxdesign.cc/design-systems-62f648c6dccf)

<h2>Table of Contents</h2>

[[toc]]

## Problem Space

### Internal

- Big corporates have complex organisational structures (many involved stakeholders)
- Difficult collaboration between teams (IT, design, business units, marketing, sales etc.)
- Collaboration more difficult for working with distributed teams (office/country) & working with external partners

**Result:** Island solutions are build!

### External

- Brand integrity gets disturbed
- Loss of credibility
- Loss of trust

**Result:** Interrupted Customer Journey leads to less revenue

## Solution Space

Create a [Design System](https://stenciljs.com/docs/what-is-design-system) (collection of reusable components with rules, principles and constraints for the design development).

### Internal

- Standardisation leads to less frictional losses, more efficiency & easier collaboration
- Better UX-quality through consistency
- Reduce costs/errors & improve time-to-market

**Result:** Reduce costs/errors & improve time-to-market

### External

- Clear communication of the brand integrity
- More credibility
- More trust

**Result:** Optimised customer journey leads to more sales!

## Advantages

In this section we will list some key advantes of our Library, which is a part of the Baloise Design System.

### 📦 Agnostic

Perhaps the most appealing benefit of Web Components is that they give your development teams the flexibility to choose the underlying tools and frameworks - and versions of those frameworks - and tools that they prefer. As pointed out earlier, one of the great challenges of implementing a universal design system is getting all of your development teams to standardize on just one set of technologies. With Web Components, each team can use what works best for them, giving them complete freedom to use the tools they love—today and tomorrow.

[Quote from Stencil](https://stenciljs.com/docs/faq)

### 🎨 Fast style changes

Every change to the corperate style guide has to be implemented by each development team. This costs a lot of time and duplicated work. Let's imagine we have to change a color and make our buttons flat. To do that we only have to change the according [SCSS](https://sass-lang.com/) varibles.

```scss
$blue: red;
$radius: 0;
```

The changes will be released to [npm](https://www.npmjs.com/package/@baloise/design-system-components) from where our development teams can grap the new changes.
They will simply upgrade the library in there projects and get the style changes immediately.
Style changes will not change the component interface. Which means the developers has no additional adjustment to do excepting to upgrade the library.

### ⚡️ Fast Runtime

[Web Components](https://developer.mozilla.org/de/docs/Web/Web_Components) offered a solution by pushing more work to the browser for better performance. Moreover, the components get lazy loaded when they needed. To keep the initial package size of your project as small as possible.

### 🛠️ Rich Features

On top of the user interaction and style part the library provides a set of utilities.

#### Validators

The [validators](/guide/tooling/validators.html) are functions to verify the corect input data of a form field.

```typescript
import { BalValidators } from '@baloise/design-system-components'

BalValidators.isBefore('2000-01-02')('2000-01-01')
// returns true
```

#### Filters

To display the data in a format that it is more readalbe for our users we can use the [filter functions](/guide/tooling/filters.html).

```typescript
import { balCapitalize } from '@baloise/design-system-components'

balCapitalize('baloise')
// returns 'Baloise'
```

#### Utils

To help the software developers in there daily live we export some of our [utility functions](/guide/tooling/utils.html).

```typescript
import { now } from '@baloise/design-system-components'

const date = now()
// Wed Mar 10 2021 20:30:32 GMT+0100 (Central European Standard Time)
```

#### Testing

As a [E-2-E testing](/components/tooling/testing.html) tool we use [Cypress](https://www.cypress.io/). With the help of our custom and overriden commands we try to simplify writing tests.
The commands hide the complexity of the component and only serves a interface for the simulated user actions like a click.

```typescript
import { dataTestSelector } from '@baloise/design-system-testing'

describe('Button', () => {
  it('should ...', () => {
    const button = dataTestSelector('button-id')
    cy.get(button)
      .contains('Label')
      .click()
  })
})
```

## Links

- [Web Components Introduction](https://www.webcomponents.org/introduction)
- [Stencil Introduction](https://stenciljs.com/docs/introduction)
- [Stencil FAQ](https://stenciljs.com/docs/faq)
