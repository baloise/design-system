import type { JSX } from '@baloise/ds-core'
import type { Meta } from '@storybook/html-vite'
import { props, StoryFactory, withComponentControls, withContent, withDefaultContent, withRender } from '../../../utils'

type Args = JSX.DsSnackbar & { content: string }

const tag = 'ds-snackbar'

const meta: Meta<Args> = {
  title: 'Components/Feedback/Snackbar',
  args: {
    ...withDefaultContent(),
  },
  argTypes: {
    ...withContent(),
    ...withComponentControls({ tag }),
  },
  ...withRender(({ content, ...args }) => `<ds-snackbar ${props(args)}>${content}</ds-snackbar>`),
}

export default meta

/**
 * STORIES
 * ––––––––––––––––––––––––––––––––––––––––––––––––––––––
 */

const Story = StoryFactory<Args>(meta)

export const Basic = Story({
  ...withRender(
    () => `<div class="flex gap-small flex-direction-column">
  <ds-snackbar> Your changes have been saved. </ds-snackbar>
  <ds-snackbar message="Your changes have been saved."></ds-snackbar>
</div>`,
  ),
})
Basic.storyName = '🧩 Basic'

export const Variants = Story({
  ...withRender(
    () => `<div class="flex gap-small flex-direction-column">
  <ds-snackbar closable>
    <b>Closable</b> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore repellat tenetur mollitia,
    reprehenderit odit inventore? Autem ipsum aliquid quas voluptatem, nesciunt vero quisquam dignissimos
    reiciendis ratione illum? Earum, ipsa a!
  </ds-snackbar>
  <ds-snackbar>
    <b>Action</b> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore repellat tenetur mollitia,
    reprehenderit odit inventore? Autem ipsum aliquid quas voluptatem, nesciunt vero quisquam dignissimos
    reiciendis ratione illum? Earum, ipsa a!
    <ds-button slot="action">Okay</ds-button>
  </ds-snackbar>
  <ds-snackbar closable>
    <b>Closable + Action</b> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore repellat tenetur
    mollitia, reprehenderit odit inventore? Autem ipsum aliquid quas voluptatem, nesciunt vero quisquam
    dignissimos reiciendis ratione illum? Earum, ipsa a!
    <ds-button slot="action">Okay</ds-button>
  </ds-snackbar>
  <ds-snackbar heading="Heading">
    <b>Heading</b> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore repellat tenetur mollitia,
    reprehenderit odit inventore? Autem ipsum aliquid quas voluptatem, nesciunt vero quisquam dignissimos
    reiciendis ratione illum? Earum, ipsa a!
  </ds-snackbar>
  <ds-snackbar heading="Heading" closable>
    <b>Heading + Closable</b> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore repellat tenetur
    mollitia, reprehenderit odit inventore? Autem ipsum aliquid quas voluptatem, nesciunt vero quisquam
    dignissimos reiciendis ratione illum? Earum, ipsa a!
  </ds-snackbar>
  <ds-snackbar heading="Heading">
    <b>Heading + Action</b> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore repellat tenetur
    mollitia, reprehenderit odit inventore? Autem ipsum aliquid quas voluptatem, nesciunt vero quisquam
    dignissimos reiciendis ratione illum? Earum, ipsa a!
    <ds-button slot="action">Okay</ds-button>
  </ds-snackbar>
  <ds-snackbar heading="Heading" closable>
    <b>Heading + Closable + Action</b> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore
    repellat tenetur mollitia, reprehenderit odit inventore? Autem ipsum aliquid quas voluptatem, nesciunt vero
    quisquam dignissimos reiciendis ratione illum? Earum, ipsa a!
    <ds-button slot="action">Okay</ds-button>
  </ds-snackbar>
</div>`,
  ),
})
Variants.storyName = '🧩 Variants'

export const VariantsWithBrandIcon = Story({
  ...withRender(
    () => `<div class="flex gap-small flex-direction-column">
  <ds-snackbar class="brand-icon" closable>
    <b>Closable</b> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore repellat tenetur mollitia,
    reprehenderit odit inventore? Autem ipsum aliquid quas voluptatem, nesciunt vero quisquam dignissimos
    reiciendis ratione illum? Earum, ipsa a!
  </ds-snackbar>
  <ds-snackbar class="brand-icon">
    <b>Action</b> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore repellat tenetur mollitia,
    reprehenderit odit inventore? Autem ipsum aliquid quas voluptatem, nesciunt vero quisquam dignissimos
    reiciendis ratione illum? Earum, ipsa a!
    <ds-button-group slot="action">
      <ds-button>Okay</ds-button>
      <ds-button color="secondary">Cancel</ds-button>
    </ds-button-group>
  </ds-snackbar>
  <ds-snackbar class="brand-icon" closable>
    <b>Closable + Action</b> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore repellat tenetur
    mollitia, reprehenderit odit inventore? Autem ipsum aliquid quas voluptatem, nesciunt vero quisquam
    dignissimos reiciendis ratione illum? Earum, ipsa a!
    <ds-button-group slot="action">
      <ds-button>Okay</ds-button>
      <ds-button color="secondary">Cancel</ds-button>
    </ds-button-group>
  </ds-snackbar>
  <ds-snackbar class="brand-icon" heading="Heading">
    <b>Heading + Action</b> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore repellat tenetur
    mollitia, reprehenderit odit inventore? Autem ipsum aliquid quas voluptatem, nesciunt vero quisquam
    dignissimos reiciendis ratione illum? Earum, ipsa a!
    <ds-button-group slot="action">
      <ds-button>Okay</ds-button>
      <ds-button color="secondary">Cancel</ds-button>
    </ds-button-group>
  </ds-snackbar>
  <ds-snackbar class="brand-icon" heading="Heading" closable>
    <b>Heading + Closable + Action</b> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore
    repellat tenetur mollitia, reprehenderit odit inventore? Autem ipsum aliquid quas voluptatem, nesciunt vero
    quisquam dignissimos reiciendis ratione illum? Earum, ipsa a!
    <ds-button-group slot="action">
      <ds-button>Okay</ds-button>
      <ds-button color="secondary">Cancel</ds-button>
    </ds-button-group>
  </ds-snackbar>
</div>`,
  ),
})
VariantsWithBrandIcon.storyName = '🧩 Variants With Brand Icon'

export const Colors = Story({
  ...withRender(
    () => `<div class="flex gap-small flex-direction-column">
  <ds-snackbar heading="Default"> Your changes have been saved. </ds-snackbar>
  <ds-snackbar color="info" heading="Information"> Your changes have been saved. </ds-snackbar>
  <ds-snackbar color="success" heading="Success"> Your changes have been saved. </ds-snackbar>
  <ds-snackbar color="warning" heading="Warning"> Your changes have been saved. </ds-snackbar>
  <ds-snackbar color="danger" heading="Danger"> Your changes have been saved. </ds-snackbar>
</div>`,
  ),
})
Colors.storyName = '🧩 Colors'
