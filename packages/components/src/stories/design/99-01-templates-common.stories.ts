import { withSourceCode } from '../utils'
import { ContactFormTemplate } from './templates/contact-form.template'
import * as Components from '../../../.storybook/vue/components'

export default {
  title: 'Design/Common Templates',
  parameters: {
    docs: {
      page: null,
    },
    layout: 'fullscreen',
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
