import type { JSX } from '@baloise/design-system-components'
import type { Meta } from '@storybook/html'
import { props, withRender, withContent, withDefaultContent, withComponentControls, StoryFactory } from '../../utils'

type Args = JSX.BalApp & { content: string }

const meta: Meta<Args> = {
  title: 'Components/Layout/App',
  args: {
    ...withDefaultContent(),
  },
  argTypes: {
    ...withContent(),
    ...withComponentControls({ tag: 'bal-app' }),
  },
  ...withRender(
    () => `<bal-app class="sticky-footer">
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
  ),
}

export default meta

/**
 * STORIES
 * ------------------------------------------------------
 */

const Story = StoryFactory<Args>(meta)

export const Basic = Story()

export const FormWizard = Story({
  ...withRender(
    () => `<bal-app class="sticky-footer">
    <header class="bg-white">
      <bal-stack py="small" space="large" class="container">
        <bal-logo></bal-logo>
        <bal-content>
          <bal-heading level="h1" visual-level="h4" auto-level="h5">What happened?</bal-heading>
        </bal-content>
      </bal-stack>
      <bal-progress-bar value="75"></bal-progress-bar>
    </header>
    <main>
      <div class="bg-green" style="height: 16rem"></div>
      <div class="container is-compact" style="margin-top: -12rem">
        <bal-card>
          <bal-card-title>How did the damage occur?</bal-card-title>
          <bal-card-content>
            <bal-field>
              <bal-field-label>Label</bal-field-label>
              <bal-field-control>
                <bal-input></bal-input>
              </bal-field-control>
            </bal-field>
            Place your form content here
          </bal-card-content>
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
  ),
})

export const FormWizardMobile = Story({
  ...withRender(
    () => `<bal-app class="sticky-footer">
    <header class="bg-green">
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
      <div class="bg-white" style="position: fixed; bottom: 0; width:100%">
        <bal-progress-bar background="grey" value="75"></bal-progress-bar>
        <bal-stack py="normal" px="normal" space="auto">
          <bal-button color="info" square icon="back"></bal-button>
          <bal-button expanded>Next</bal-button>
        </bal-stack>
      </div>
    </main>
    </bal-app>`,
  ),
})
