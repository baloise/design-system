import { withSoureCode } from '../utils'
import docs from './06-page-layout.docs.mdx'
import { ExternalCaluclatorTemplate } from './layouts/external-caluclator.template'
import { ExternalPortalTemplate } from './layouts/external-portal.template'
import { InternalFormAppTemplate } from './layouts/internal-form'
import { InternalWideAppTemplate } from './layouts/internal-wide'
import * as Components from '../../../.storybook/vue/components'

export default {
  title: 'Design/Page Layout',
  parameters: {
    docs: {
      page: docs,
    },
    layout: 'fullscreen',
  },
}

export const ExternalCalculator = args => ({
  components: { ...Components },
  setup: () => ({ args }),
  template: ExternalCaluclatorTemplate,
})
ExternalCalculator.parameters = {
  ...withSoureCode(ExternalCaluclatorTemplate),
}

export const ExternalPortalApp = args => ({
  components: { ...Components },
  setup: () => ({ args }),
  template: ExternalPortalTemplate,
})
ExternalPortalApp.parameters = {
  ...withSoureCode(ExternalPortalTemplate),
}

export const InternalFormApp = args => ({
  components: { ...Components },
  setup: () => ({ args }),
  template: InternalFormAppTemplate,
})
InternalFormApp.parameters = {
  ...withSoureCode(InternalFormAppTemplate),
}

export const InternalWideApp = args => ({
  components: { ...Components },
  setup: () => ({ args }),
  template: InternalWideAppTemplate,
})
InternalWideApp.parameters = {
  ...withSoureCode(InternalWideAppTemplate),
}
