# Installation

## Vue 

The utils are a part of the Vue plugin. The plugin adds all the filters and util functions.
Follow the installtion guide of Vue. [Link to the Vue Installion](/introduction/vue)

### Filters

The filters like `balClaimNumber` can be used directly in the template.

```html 
<p>{{ '73001217169' | balClaimNumber }}</p>
```

or in the component with `this.$balUtils` or `Vue.$balUtils`.

```typescript 
import Vue from 'vue'

export default Vue.extend({
  data: {
    claimNumber: '93001217169'
  },
  computed: {
    claimNumberFormatted: function() {
      return this.$balUtils.balClaimNumber(this.claimNumber)
    }
  }
})
```

## Angular

The utils are a part of the Angular module. The module declares all the filters and util functions.
Follow the installtion guide of Angular. [Link to the Vue Installion](/introduction/angular)

### Pipes

The pipes like `balClaimNumber` can be used directly in the view.

```html 
<p>{{ '73001217169' | balClaimNumber }}</p>
```

## Manual

Install the library directly from npm.

```bash
npm add @baloise/ui-library-utils
```

Than import it into any of your files and use the functions.

```typescript 
import { balClaimNumber } from '@baloise/ui-library-utils'

balClaimNumber('93001217169')
// returns "93/001217/16.9"
```
