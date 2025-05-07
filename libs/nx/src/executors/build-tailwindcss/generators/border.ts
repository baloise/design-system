import { BuildTailwindcssExecutorSchema } from '../schema'
import { getTokens, NEWLINE } from './utils'

export const generateBorder = async (options: BuildTailwindcssExecutorSchema) => {
  const tokens = await getTokens({ token: 'size.border.width', ...options })

  return (
    Object.entries(tokens)
      .map(([key, token]) => {
        const className = `.border-${key}`
        const variableName = `--${token.name}`
        return `  ${className} {${NEWLINE}    border-width: var(${variableName});${NEWLINE}  }`
      })
      .join(NEWLINE) +
    NEWLINE +
    NEWLINE
  )
}
