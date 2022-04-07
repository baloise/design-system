import { withSourceCode } from '../utils'
import { ContactFormTemplate } from './templates/contact-form.template'
import * as Components from '../../../.storybook/vue/components'

export default {
  title: 'Design/Common Templates',
  parameters: {
    layout: 'fullscreen',
    docs: {
      page: null,
    },
    previewTabs: {
      'storybook/docs/panel': { hidden: true },
    },
  },
}

export const ContactForm = args => ({
  components: { ...Components },
  setup: () => ({ args }),
  template: ContactFormTemplate,
})
ContactForm.parameters = {
  ...withSourceCode(ContactFormTemplate),
}
