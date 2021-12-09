import docs from './03-spacing.docs.mdx'

export default {
  title: 'Design/Spacing',
  parameters: {
    docs: {
      page: docs,
    },
    layout: 'fullscreen',
  },
}

export const Paddings = args => ({
  components: {},
  setup: () => ({ args }),
  template: `<div class="p-8 has-background-blue-dark">
    <div class="p-7 has-background-blue">
      <div class="p-6 has-background-hint">
        <div class="p-5 has-background-cyan">
          <div class="p-4 has-background-success">
            <div class="p-3 has-background-warning">
              <div class="p-2 has-background-danger">
                <div class="p-1 has-background-white">
                  <div class="p-0 has-background-grey">
                    Spacing
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>`,
})
