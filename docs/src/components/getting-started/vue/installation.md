# Installation

Before installing the Baloise Design System setup in a Vue Project, we recommend to use this starter kit [baloise/vue-starter-kit](https://github.com/baloise/vue-starter-kit) or use the [Vue CLI](https://cli.vuejs.org/guide/installation.html) with Sass and TypeScript.

To install the Baloise Design System run the following command.

```bash
npm install @baloise/design-system-components-vue ag-grid-community --save
```

:::tip
We recommend to use the [baloise/vue-starter-kit](https://github.com/baloise/vue-starter-kit), because the Design System is already integrated as well as i18n, Sass, form-validation and http-requsts.
:::

::: tip
We recommend to use **Sass** for styling in the Vue project to get access to the color variables and responsive helpers.
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

## Apply styles

To apply the Baloise Design System styles and typography follow [the instruction on the page styling documentation](/components/getting-started/angular/styles.html).

::: warning
Do not forget to apply the style, otherwise you components will not look like in this documentation ;-)
:::
