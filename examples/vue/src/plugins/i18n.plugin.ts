/**
 * Vue i18n
 * --------------------
 * Internationalization plugin for Vue.js
 *
 * https://github.com/intlify/vue-i18n-next
 * https://vue-i18n.intlify.dev/guide
 *
 */
import { createI18n } from 'vue-i18n'
import de from '../i18n/de'
import en from '../i18n/en'

export const i18n = createI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages: { de, en },
})
