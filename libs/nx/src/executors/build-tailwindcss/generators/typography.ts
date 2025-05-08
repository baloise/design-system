import { BuildTailwindcssExecutorSchema } from '../schema'
import { getTokens, NEWLINE } from './utils'

type Token = { name: string; value: string }
type ResponsiveToken = { mobile: Token; tablet: Token; desktop: Token }
type ResponsiveTokens = { [size: string]: ResponsiveToken }

export const generateTypography = async (options: BuildTailwindcssExecutorSchema) => {
  const tokens = (await getTokens({ token: 'size.text.size', ...options })) as any as ResponsiveTokens

  return (
    Object.entries(tokens)
      .map(([key, token]) => {
        const className = `.text-${key}`
        return `  ${className} {${NEWLINE}    @apply text-(--${token.mobile.name}) tablet:text-(--${token.tablet.name}) desktop:text-(--${token.desktop.name});${NEWLINE}  }`
      })
      .join(NEWLINE) +
    NEWLINE +
    NEWLINE
  )
}
