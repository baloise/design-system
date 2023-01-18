import docs from './02-development.docs.mdx'
import { sourceCode } from '../../../stories/utils'

export default {
  title: 'Foundation/Spacing/Code',
  parameters: {
    viewMode: 'docs',
    docs: {
      page: docs,
    },
  },
}

export const Basic = args => ({
  components: {},
  setup: () => ({ args }),
  template: `<div class="has-background-grey">
    <div class="has-background-green p-large mx-medium">
      Spacings
    </div>
  </div>`,
})
Basic.args = {}
Basic.parameters = {
  ...sourceCode(
    () => ({
      template: `<div class="p-large mx-medium">Spacings</div>`,
      components: [],
    }),
    Basic.args,
    {},
  ),
  controls: { exclude: [] },
}

export const SpacingSizes = args => ({
  components: {},
  setup: () => ({ args }),
  template: `
<div class="p-xx-large has-background-primary-6 has-text-white">
  xx-large
  <div class="p-x-large has-background-primary-5">
    x-large
    <div class="p-large has-background-primary-4">
      large
      <div class="p-medium has-background-primary-3">
        medium
        <div class="p-normal has-background-purple-3">
          normal
          <div class="p-small has-background-purple-4">
            small
            <div class="p-x-small has-background-purple-5">
              x-small
              <div class="p-xx-small has-background-purple-6">
                xx-small
                <div class="p-none has-background-white has-text-primary">
                  Spacing with Paddings
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
SpacingSizes.args = {}
SpacingSizes.parameters = {
  ...sourceCode(SpacingSizes, SpacingSizes.args, {}),
  controls: { exclude: [] },
}
