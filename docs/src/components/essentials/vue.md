# Vue

<img style="width: 128px;" src="https://vuejs.org/images/logo.png" data-origin="https://vuejs.org/images/logo.png" alt="Vue">

`@baloise/ui-libary-vue` combines the core Baloise Design System experience with the tooling and APIs that are tailored to Vue Developers.

## Install

Before installing the Baloise Design System setup in a Vue Project, we recommand to use this starter kit [baloise/vue-starter-kit](https://github.com/baloise/vue-starter-kit) or use the [Vue CLI](https://cli.vuejs.org/guide/installation.html) with Sass and TypeScript.

To install the Baloise Design System run the following command.

```bash
npm install @baloise/design-system-components-vue ag-grid-community --save
```

:::tip
We recommand to use the [baloise/vue-starter-kit](https://github.com/baloise/vue-starter-kit), because the Design System is already integrated as well as i18n, Sass, form-validation and http-requsts.
:::

::: tip
We recommand to use **Sass** for styling in the Vue project to get access to the color variables and responsive helpers.
:::

## Add Plugin

The `@baloise/design-system-components-vue` dependency includes the plugin `BaloiseDesignSystem`, which loads by default the polyfils and defines the components. Moreover, it adds the filtes and conrollers to your vue instance.

### main.ts

```typescript{4,8}
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { BaloiseDesignSystem } from '@baloise/design-system-components-vue'

Vue.config.productionTip = false

Vue.use(BaloiseDesignSystem)

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
```

:::tip
To use the Baloise Design System with [ViteJs](https://vitejs.dev/) add the following config:

```typescript
Vue.use(BaloiseDesignSystem, { useVite: true })
```

:::

## Styles

To apply the Baloise Design System styles and typography follow the instruction on the page [styling documentation](/components/essentials/styles.html).

## Usage

All the Baloise Design System components are registered globally, so just use them in your template like the `BalButton`.

::: tip
More usage examples are in our Vue Starter Kit app [Link](https://github.com/baloise/vue-starter-kit/blob/vue-next/src/app/pages/Home.vue).
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
import { BalCheckbox, BalButton } from '@baloise/design-system-components-vue'

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
