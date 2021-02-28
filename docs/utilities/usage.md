# Usage

All the utilities are just functions.

Just import them into any of your files.

```typescript
import { balClaimNumber } from '@baloise/ui-library'

balClaimNumber('93001217169')
// returns "93/001217/16.9"
```

## Vue

The utils are a part of the Vue plugin. The plugin adds all the filters and util functions.
Follow the installtion guide of Vue. [Link to the Vue Installion](/introduction/vue)

### Filters

The filters like `balClaimNumber` can be used directly in the template.

```xml
<p>{{ '73001217169' | balClaimNumber }}</p>
```

or in the component with `this.$balUtils` or `Vue.$balUtils`.

```typescript
import Vue from 'vue'

export default Vue.extend({
  data: {
    claimNumber: '93001217169',
  },
  computed: {
    claimNumberFormatted: function () {
      return this.$balUtils.balClaimNumber(this.claimNumber)
    },
  },
})
```

## Angular

The utils are a part of the Angular module. The module declares all the filters and util functions.
Follow the installtion guide of Angular. [Link to the Angular Installion](/introduction/angular)

### Pipes

The pipes like `balClaimNumber` can be used directly in the view.

```xml
<p>{{ '73001217169' | balClaimNumber }}</p>
```
