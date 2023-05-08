import docs from './bal-app.docs.mdx'
import { BalComponentStory, sourceCode } from '../../../stories/utils'
import { getFramework } from '../../docs/bal-doc-code-sandbox/code-sandbox.util.ts'
import {
  BalApp,
  BalFooter,
  BalNavbar,
  BalNavbarBrand,
  BalText,
  BalIcon,
} from '../../../../.storybook/vue/generated/components'

const component = BalComponentStory({
  title: 'Components/Layout/App',
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
  layout: 'fullscreen',
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

export const FormWizardDesktop = args => ({
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
  <header class="has-background-white">
    <bal-stack py="small" space="large" class="container">
      <bal-logo></bal-logo>
      <bal-content>
        <bal-heading level="h1" visual-level="h4" auto-level="h5">What happened?</bal-heading>
      </bal-content>
    </bal-stack>
    <bal-progress-bar value="75"></bal-progress-bar>
  </header>
  <main>
    <div class="has-background-green-3" style="height: 16rem"></div>
    <div class="container is-compact" style="margin-top: -12rem">
      <bal-card>
        <bal-card-title>How did the damage occur?</bal-card-title>
        <bal-card-content>Place your form content here</bal-card-content>
      </bal-card>
      <bal-stack space="auto" class="mt-medium">
        <bal-button color="text">Back</bal-button>
        <bal-button>Next</bal-button>
      </bal-stack>
    </div>
  </main>
  <bal-footer>
    <!-- Footer content -->
  </bal-footer>
  </bal-app>`,
})
FormWizardDesktop.args = {}
FormWizardDesktop.parameters = {
  layout: 'fullscreen',
  viewport: {
    defaultViewport: 'large',
  },
  ...component.sourceCode(FormWizardDesktop),
}

export const FormWizardMobile = args => ({
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
  <header class="has-background-green-3">
    <bal-stack py="small" space="large" class="container">
      <bal-content>
        <bal-heading level="h1" visual-level="h3" auto-level="h5">What happened?</bal-heading>
      </bal-content>
    </bal-stack>
    </header>
    <main>
    <div class="container my-medium pb-xxx-large">
      <bal-heading level="h5">How did the damage occur?</bal-heading>
      Place your form content here
    </div>
    <div class="has-background-white" style="position: fixed; bottom: 0; width:100%">
      <bal-progress-bar background="grey" value="75"></bal-progress-bar>
      <bal-stack py="normal" px="normal" space="auto">
        <bal-button color="info" square icon="back"></bal-button>
        <bal-button expanded>Next</bal-button>
      </bal-stack>
    </div>
  </main>
  </bal-app>`,
})
FormWizardMobile.args = {}
FormWizardMobile.parameters = {
  layout: 'fullscreen',
  viewport: {
    defaultViewport: 'small',
  },
  ...component.sourceCode(FormWizardMobile),
}
