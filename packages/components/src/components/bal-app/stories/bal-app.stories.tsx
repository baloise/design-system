import docs from './bal-app.docs.mdx'
import { BalComponentStory, sourceCode } from '../../../stories/utils'
import { getFramework } from '../../docs/bal-doc-stackblitz/stackblitz.util'
import {
  BalApp,
  BalFooter,
  BalNavbar,
  BalNavbarBrand,
  BalText,
  BalIcon,
} from '../../../../.storybook/vue/generated/components'

const component = BalComponentStory({
  component: BalApp,
  docs,
})

export default component.story

export const Basic = args => ({
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
Basic.args = {}
Basic.parameters = {
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
    Basic.args,
    {},
    false,
  ),
}
