import docs from './05-breakpoints.docs.mdx'

export default {
  title: 'Design/Breakpoints',
  parameters: {
    docs: {
      page: docs,
    },
    layout: 'fullscreen',
    status: {
      type: 'stable',
    },
  },
  argTypes: {
    container: {
      options: ['default', 'compact'],
      description: 'Size of the container. Use `compact` for calculators.',
      control: { type: 'radio', defaultValue: 'default' },
    },
  },
  args: {
    container: 'default',
  },
}

export const Viewports = args => ({
  components: {},
  setup: () => ({ args }),
  template: `
  <div class="has-background-black">
    <div :class="args.container === 'default' ? '' : 'is-compact'" class="container has-background-success">
      <div class="has-background-grey is-flex is-justify-content-center	is-align-items-center" style="height: 100vh">
        <h1 class="title is-size-1">container {{ args.container }}</h1>
      </div>
    </div>
  </div>`,
})
