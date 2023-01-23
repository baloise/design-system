import docs from './02-development.docs.mdx'
import { sourceCode } from '../../../stories/utils'
import {
  BalApp,
  BalFooter,
  BalNavbar,
  BalNavbarBrand,
  BalText,
  BalIcon,
} from '../../../../.storybook/vue/generated/components'
import { getFramework } from '../../../components/docs/bal-doc-stackblitz/stackblitz.util'

export default {
  title: 'Foundation/Layout/Development',
  parameters: {
    docs: {
      page: docs,
    },
  },
}

export const BasicLayout = args => ({
  components: {
    BalApp,
    BalFooter,
    BalNavbar,
    BalNavbarBrand,
    BalText,
    BalIcon,
  },
  setup: () => ({ args }),
  template: `<bal-app class="has-sticky-footer">
  <header>
    <bal-navbar>
      <bal-navbar-brand>App Title</bal-navbar-brand>
    </bal-navbar>
  </header>
  <main>
    <div class="container my-large">
      <h1 class="title">Hello World!</h1>
      <!-- Page content -->
    </div>
  </main>
  <bal-footer>
    <!-- Footer content -->
  </bal-footer>
  </bal-app>`,
})
BasicLayout.args = {}
BasicLayout.parameters = {
  ...sourceCode(
    () => {
      const framework = getFramework()

      let template = `<bal-app class="has-sticky-footer">
      <header>
        <bal-navbar>
          <bal-navbar-brand>App Title</bal-navbar-brand>
        </bal-navbar>
      </header>
      <main>
        <div class="container my-large">
          <h1 class="title">Hello World!</h1>
          <!-- Page content -->
        </div>
      </main>
      <bal-footer>
        <!-- Footer content -->
      </bal-footer>
      </bal-app>`

      if (framework === 'react') {
        template = `import './App.scss'
import {
  useBaloiseDesignSystem,
  BalApp,
  BalFooter,
  BalNavbar,
  BalNavbarBrand,
} from '@baloise/design-system-components-react'

function App() {
  useBaloiseDesignSystem()

  return (
    <BalApp className="has-sticky-footer">
      <header>
        <BalNavbar>
          <BalNavbarBrand>App Title</BalNavbarBrand>
        </BalNavbar>
      </header>
      <main className="container my-large">
        <h1 class="title">Hello World!</h1>
      </main>
      <BalFooter></BalFooter>
    </BalApp>
  )
}

export default App`
      }

      if (framework === 'vue') {
        template = `
<script setup lang="ts>
import {
  BalApp,
  BalFooter,
  BalNavbar,
  BalNavbarBrand,
} from '@baloise/design-system-components-vue'
</script>
<template>
  <BalApp className="has-sticky-footer">
    <header>
      <BalNavbar>
        <BalNavbarBrand>App Title</BalNavbarBrand>
      </BalNavbar>
    </header>
    <main className="container my-large">
      <h1 class="title">Hello World!</h1>
    </main>
    <BalFooter></BalFooter>
  </BalApp>
</template>`
      }

      return {
        template,
        components: [],
      }
    },
    BasicLayout.args,
    {},
    false,
  ),
}

export const Flexbox = args => ({
  components: {},
  setup: () => ({ args }),
  template: `<div className="has-background-blue is-flex is-justify-content-center is-align-items-center p-small">
  <div className="has-background-danger p-small"></div>
</div>`,
})
Flexbox.args = {}
Flexbox.parameters = {
  ...sourceCode(
    () => ({
      template: `<div class="is-flex is-justify-content-center is-align-items-center">
      <div>Centered</div>
    </div>`,
      components: [],
    }),
    Flexbox.args,
    {},
  ),
  controls: { exclude: [] },
}

export const FlexboxGap = args => ({
  components: {},
  setup: () => ({ args }),
  template: `<div className="has-background-danger is-flex fg-medium">
  <div className="has-background-blue is-flex-grow-1 p-small"></div>
  <div className="has-background-blue is-flex-grow-1 p-small"></div>
  <div className="has-background-blue is-flex-grow-1 p-small"></div>
</div>
<div className="has-background-danger is-flex fg-xx-large mt-small">
  <div className="has-background-blue is-flex-grow-1 p-small"></div>
  <div className="has-background-blue is-flex-grow-1 p-small"></div>
  <div className="has-background-blue is-flex-grow-1 p-small"></div>
</div>`,
})
FlexboxGap.args = {}
FlexboxGap.parameters = {
  ...sourceCode(
    () => ({
      template: `<div class="is-flex fg-medium">
      <div class="is-flex-grow-1">1</div>
      <div class="is-flex-grow-1">2</div>
      <div class="is-flex-grow-1">3</div>
    </div>
    <div class="is-flex fg-xx-large">
      <div class="is-flex-grow-1">1</div>
      <div class="is-flex-grow-1">2</div>
      <div class="is-flex-grow-1">3</div>
    </div>`,
      components: [],
    }),
    FlexboxGap.args,
    {},
  ),
  controls: { exclude: [] },
}
