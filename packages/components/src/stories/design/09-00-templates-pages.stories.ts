import { withSoureCode } from '../utils'
import { ExternalCaluclatorTemplate } from './templates/external-caluclator.template'
import { ExternalPortalTemplate } from './templates/external-portal.template'
import { InternalFormAppTemplate } from './templates/internal-form.template'
import { InternalWideAppTemplate } from './templates/internal-wide.template'
import * as Components from '../../../.storybook/vue/components'

export default {
  title: 'Design/Page Templates',
  parameters: {
    docs: {
      page: null,
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
