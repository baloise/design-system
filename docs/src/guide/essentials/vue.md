# Vue

<img style="width: 128px;" src="https://vuejs.org/images/logo.png" data-origin="https://vuejs.org/images/logo.png" alt="Vue">

`@baloise/ui-libary-vue` combines the core Ionic Framework experience with the tooling and APIs that are tailored to Vue Developers.

## Install

Before installing the Baloise UI Library setup the Vue Project. We recommand to use this starter kit [baloise/vue-starter-kit](https://github.com/baloise/vue-starter-kit) or use the [Vue CLI](https://cli.vuejs.org/guide/installation.html) with Sass and TypeScript.

```bash
npm install @baloise/ui-library --save
npm install @baloise/ui-library-vue --save
```

::: tip
We recommand to use **Sass** for styling in the Vue project to get access to the color variables and responsive helpers.
:::

::: tip
If you need to support IE11 use the Vue.js 2.x.x library `@baloise/ui-library-vue-2` instead.
:::

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

Go to the [styling documentation](/guide/styles/installation.html) and add the fonts and styles.

## Vue 2.x.x

### Types

Import the `@baloise/ui-library-vue-2/types` file into your `shims-vue.d.ts` file to get the type definitions.

### shims-vue.d.ts

```typescript
import '@baloise/ui-library-vue-2/types'
```

## Usage

Just import the bal-components and use it in your templates.

::: tip
More usage example are in our Vue example app [Link](https://github.com/baloise/ui-library/tree/master/examples/vue).
:::

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
    createToast: function() {
      this.$balToast.create({
        message: 'Message',
      })
    },
  },
})
</script>
```
