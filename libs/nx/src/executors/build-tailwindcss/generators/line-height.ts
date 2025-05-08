import { BuildTailwindcssExecutorSchema } from '../schema'
import { getTokens, NEWLINE } from './utils'

type Token = { name: string; value: string }
type ResponsiveToken = { mobile: Token; tablet: Token; desktop: Token }
type ResponsiveTokens = { [size: string]: ResponsiveToken }

export const generateLineHeight = async (options: BuildTailwindcssExecutorSchema) => {
  const tokens = (await getTokens({ token: 'size.text.size', ...options })) as any as ResponsiveTokens

  return (
    Object.entries(tokens)
      .map(([key, token]) => {
        const className = `.text-${key}`
        const value = ['x-small', 'small', 'normal', 'medium'].includes(token.mobile.name) ? 1.5 : 1.3
        return `  ${className} {${NEWLINE}    line-height: ${value};${NEWLINE}  }`
      })
      .join(NEWLINE) +
    NEWLINE +
    NEWLINE
  )
}
