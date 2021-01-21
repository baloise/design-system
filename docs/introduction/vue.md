# Vue

> Do not forget to configure fonts and styling. [Go to styling](introduction/styling.md)

## Install

After creating a project with [Vue CLI](https://cli.vuejs.org/guide/installation.html) or custom-made (usually Webpack) install the following libraries with npm.

```bash
npm install @baloise/ui-library --save
npm install @baloise/ui-library-vue --save
```

## Add Plugin

The `@baloise/ui-library-vue` dependency includes a the plugin `BalUiLibraryPlugin`, which loads by default the pollyfils and defines the components. Moreover, it adds the filtes and conrollers to your vue instance.

Import the `ui-library.css` file into your `main.ts` file to get the global style classes.

```typescript
// main.ts
import 'babel-polyfill'
import '@baloise/ui-library/dist/ui-library/ui-library.css'

import Vue from 'vue'
import App from './App.vue'
import { BalUiLibraryPlugin } from '@baloise/ui-library-vue'

Vue.config.productionTip = false

Vue.use(BalUiLibraryPlugin)

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
