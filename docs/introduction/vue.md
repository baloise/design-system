# Vue

## Install

After creating a project with vue-cli or custom-made (usually Webpack) install the following libraries.

```bash
npm install @baloise/ui-library --save
npm install @baloise/ui-library-vue --save
```

## Add Plugin

Import the `ui-library.css` file into your `main.ts` file to get the global style classes. Moreover, import the `BalUiLibraryPlugin`, which loads by default the pollyfils and defines the components.

```typescript
// main.ts
import 'babel-polyfill'
import '@baloise/ui-library/dist/ui-library/ui-library.css'

import Vue from 'vue'
import App from './App.vue'
import { BalUiLibraryPlugin } from '@baloise/ui-library-vue'

Vue.config.productionTip = false

Vue.use(BalUiLibraryPlugin, {
  defineCustomElements: true,
})

new Vue({
  render: h => h(App),
}).$mount('#app')
```

## Usage

Just import the bal-components and use it in your templates.

```vue
<template>
  <div id="app">
    <BalCheckbox v-model="checkbox"></BalCheckbox>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { BalCheckbox } from '@baloise/ui-library-vue'

export default Vue.extend({
  name: 'App',
  components: { BalCheckbox },
  data() {
    const checkbox = true
    return { checkbox }
  },
})
</script>
```

## Configure styling

Instead of importing the `ui-library.css` file add the `ui-library.scss` file to your main `.scss` file. With that you get access to the scss variables like colors or breakpoints.

```scss
@import 'node_modules/@baloise/ui-library/src/styles/ui-library.scss';
```

> Use the variables of the UI-Library for your own project components by using the `ui-library.utilities.scss` file.

```scss
@import 'node_modules/@baloise/ui-library/src/styles/ui-library.utilities.scss';
```
