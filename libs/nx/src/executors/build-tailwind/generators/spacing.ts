import { BuildTailwindExecutorSchema } from '../schema'
import { getTokens, NEWLINE } from './utils'

type Token = { name: string; value: string }
type SpacingTokens = { [key: string]: { [breakpoint: string]: Token } }

const PADDINGS = ['p', 'px', 'py', 'pt', 'pr', 'pb', 'pl']
const MARGINS = ['m', 'mx', 'my', 'mt', 'mr', 'mb', 'ml']

export const generateSpacing = async (options: BuildTailwindExecutorSchema) => {
  const tokens = (await getTokens({ token: 'size.space', ...options })) as any as SpacingTokens

  const paddings = PADDINGS.map(prefix => generateSpacingWithPrefix(prefix, tokens)).join(NEWLINE)
  const margins = MARGINS.map(prefix => generateSpacingWithPrefix(prefix, tokens)).join(NEWLINE)
  const gaps = generateSpacingWithPrefix('gap', tokens)

  return [paddings, margins, gaps].join(NEWLINE + NEWLINE) + NEWLINE + NEWLINE
}

const generateSpacingWithPrefix = (prefix, tokens) => {
  return Object.entries(tokens)
    .map(([sizeKey, group]) => {
      const classParts = Object.entries(group).map(
        ([breakpoint, token]) => `${getBreakPointPrefix(breakpoint)}${prefix}-(--${token.name})`,
      )

      return `@utility ${prefix}-${sizeKey} {
  @apply ${classParts.join(' ')};
}`
    })
    .join(NEWLINE)
}

const getBreakPointPrefix = (breakpoint: string): string => (breakpoint !== 'mobile' ? breakpoint + ':' : '')
