# Vue

To add the Baloise UI Library to your Vue project follow this steps.

## Install

Before installing the Baloise UI Library setup the Vue Project. We recommand to use this starter kit [baloise/vue-starter-kit](https://github.com/baloise/vue-starter-kit) or use the [Vue CLI](https://cli.vuejs.org/guide/installation.html) with Sass and TypeScript.

> We recommand to use **Sass** for styling in the Vue project to get access to the color variables and responsive helpers.

```bash
npm install @baloise/ui-library --save
npm install @baloise/ui-library-vue --save
```

## Add Plugin

The `@baloise/ui-library-vue` dependency includes a the plugin `BalUiLibraryPlugin`, which loads by default the pollyfils and defines the components. Moreover, it adds the filtes and conrollers to your vue instance.

### main.ts

```typescript
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { BalUiLibraryPlugin } from '@baloise/ui-library-vue'

Vue.config.productionTip = false

Vue.use(BalUiLibraryPlugin)

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
```

## Styles

> Please follow the styling guide to add the Baloise UI Library styling. [Go to styling](introduction/styling.md)

## Types

Import the `@baloise/ui-library-vue/types` file into your `shims-vue.d.ts` file to get the type definitions.

### shims-vue.d.ts

```typescript
import '@baloise/ui-library-vue/types'
```

## Usage

Just import the bal-components and use it in your templates.

> More usage example are in our Vue example app [Link](https://github.com/baloise/ui-library/tree/master/examples/vue).

```vue
<template>
  <div id="app">
    <BalCheckbox v-model="checkbox"></BalCheckbox>
    <BalButton @click="createToast()">Create Toast</BalButton>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { BalCheckbox, BalButton } from '@baloise/ui-library-vue'

export default Vue.extend({
  components: { BalCheckbox, BalButton },
  data() {
    const checkbox = true
    return { checkbox }
  },
  methods: {
    createToast: function () {
      this.$balToast.create({
        message: 'Message',
      })
    },
  },
})
</script>
```
