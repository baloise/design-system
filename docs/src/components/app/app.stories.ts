import type { JSX } from '@baloise/ds-core'
import type { Meta } from '@storybook/html-vite'
import { StoryFactory, withComponentControls, withContent, withDefaultContent, withRender } from '../../utils'

type Args = JSX.BalApp & { content: string }

const meta: Meta<Args> = {
  title: 'Components/App',
  args: {
    ...withDefaultContent(),
  },
  argTypes: {
    ...withContent(),
    ...withComponentControls({ tag: 'ds-app' }),
  },
  ...withRender(
    () => `<ds-app class="has-sticky-footer">
  <header>
    <ds-navbar>
      <ds-navbar-brand>App Title</ds-navbar-brand>
    </ds-navbar>
  </header>
  <main>
    <div class="container my-large">
      <h1 class="title">Hello World!</h1>
      <!-- Page content -->
    </div>
  </main>
  <ds-footer>
    <!-- Footer content -->
  </ds-footer>
  </ds-app>`,
  ),
}

export default meta

/**
 * STORIES
 * ------------------------------------------------------
 */

const Story = StoryFactory<Args>(meta)

export const Basic = Story()
Basic.storyName = '🧩 Basic'

export const FormWizard = Story({
  ...withRender(
    () => `<ds-app class="has-sticky-footer">
    <header class="bg-white">
      <ds-stack py="small" space="large" class="container">
        <ds-logo></ds-logo>
        <ds-content>
          <ds-heading level="h1" visual-level="h4" auto-level="h5">What happened?</ds-heading>
        </ds-content>
      </ds-stack>
      <ds-progress-bar value="75"></ds-progress-bar>
    </header>
    <main>
      <div class="bg-green" style="height: 16rem"></div>
      <div class="container is-compact" style="margin-top: -12rem">
        <ds-card>
          <ds-card-title>How did the damage occur?</ds-card-title>
          <ds-card-content>
            <ds-field>
              <ds-field-label>Label</ds-field-label>
              <ds-field-control>
                <ds-input></ds-input>
              </ds-field-control>
            </ds-field>
            Place your form content here
          </ds-card-content>
        </ds-card>
        <ds-stack space="auto" class="mt-medium">
          <ds-button color="text">Back</ds-button>
          <ds-button>Next</ds-button>
        </ds-stack>
      </div>
    </main>
    <ds-footer>
      <!-- Footer content -->
    </ds-footer>
    </ds-app>`,
  ),
})
FormWizard.storyName = '🧩 Form Wizard'

export const FormWizardMobile = Story({
  ...withRender(
    () => `<ds-app class="has-sticky-footer">
    <header class="bg-green">
      <ds-stack py="small" space="large" class="container">
        <ds-content>
          <ds-heading level="h1" visual-level="h3" auto-level="h5">What happened?</ds-heading>
        </ds-content>
      </ds-stack>
      </header>
      <main>
      <div class="container my-medium pb-xxx-large">
        <ds-heading level="h5">How did the damage occur?</ds-heading>
        Place your form content here
      </div>
      <div class="bg-white" style="position: fixed; bottom: 0; width:100%">
        <ds-progress-bar background="grey" value="75"></ds-progress-bar>
        <ds-stack py="normal" px="normal" space="auto">
          <ds-button color="secondary" square icon="back"></ds-button>
          <ds-button wide>Next</ds-button>
        </ds-stack>
      </div>
    </main>
    </ds-app>`,
  ),
})
FormWizardMobile.storyName = '🧩 Form Wizard Mobile'
