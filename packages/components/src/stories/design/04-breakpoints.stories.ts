import docs from './04-breakpoints.docs.mdx'

export default {
  title: 'Design/Breakpoints',
  parameters: {
    docs: {
      page: docs,
    },
    layout: 'fullscreen',
  },
  args: {
    content: 'Container',
  },
}

export const Viewports = args => ({
  components: {},
  setup: () => ({ args }),
  template: `<div class="container has-background-blue">
    <div class="has-background-grey is-flex is-justify-content-center	is-align-items-center" style="height: 100vh">
      <h1 class="title is-size-1">{{ args.content }}</h1>
    </div>
  </div>`,
})
