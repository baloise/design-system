import { BuildTailwindcssExecutorSchema } from '../schema'
import { getTokens, NEWLINE } from './utils'

export const generateZIndex = async (options: BuildTailwindcssExecutorSchema) => {
  const tokens = await getTokens({ token: 'size.z-index', ...options })

  return (
    Object.entries(tokens)
      .map(([key, token]) => {
        const className = `.z-index-${key}`
        const variableName = `--${token.name}`
        return `  ${className} {${NEWLINE}    z-index: var(${variableName});${NEWLINE}  }`
      })
      .join(NEWLINE) +
    NEWLINE +
    NEWLINE
  )
}
