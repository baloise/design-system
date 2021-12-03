import { htmlBeautify } from './html'

export const withSoureCode = (code: string) => ({
  docs: {
    source: {
      code: htmlBeautify(code),
    },
  },
})
